import {
  ForbiddenException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import {
  EventStatus,
  OrganizerProfileStatus,
  ParticipationStatus,
  UserRole,
  type User,
} from '@prisma/client';
import {PrismaService} from '../prisma/prisma.service';
import { CompleteEventDto } from './dto/complete-event.dto';
import { CreateEventDto } from './dto/create-event.dto';

@Injectable()
export class EventsService {
  constructor(private readonly prismaService: PrismaService) {}

  async create(currentUser: User, createEventDto: CreateEventDto) {
    this.assertCanManageEvents(currentUser);

    const organizerId = currentUser.id;
    const organizer = await this.prismaService.user.findUnique({
      where: {id: organizerId},
    });

    if (!organizer) {
      throw new NotFoundException('Organizer not found');
    }

    const organizerProfile = await this.prismaService.organizerProfile.findUnique({
      where: { userId: organizerId },
    });

    if (!organizerProfile || organizerProfile.status !== OrganizerProfileStatus.APPROVED) {
      throw new ForbiddenException('Organizer account is not approved');
    }

    const scoreWeight = await this.prismaService.eventScoreWeight.findUnique({
      where: {
        direction_difficulty: {
          direction: createEventDto.direction,
          difficulty: createEventDto.difficulty,
        },
      },
    });

    const difficultyFactor =
      createEventDto.difficultyFactor ?? scoreWeight?.weight ?? 1;

    const event = await this.prismaService.event.create({
      data: {
        title: createEventDto.title,
        description: createEventDto.description,
        city: createEventDto.city,
        direction: createEventDto.direction,
        difficulty: createEventDto.difficulty,
        status: EventStatus.ACTIVE,
        startsAt: new Date(createEventDto.startsAt),
        endsAt: createEventDto.endsAt
          ? new Date(createEventDto.endsAt)
          : null,
        organizerId,
        basePoints: createEventDto.basePoints,
        difficultyFactor,
        rewardSummary: createEventDto.rewardSummary,
        imageUrl: createEventDto.imageUrl,
        rewards: createEventDto.rewards?.length
          ? {
              create: createEventDto.rewards.map((reward) => ({
                place: reward.place,
                title: reward.title,
                description: reward.description,
                additionalInfo: reward.additionalInfo,
                platformPoints: reward.platformPoints ?? reward.points,
                points: reward.points,
              })),
            }
          : undefined,
      },
      include: {
        organizer: true,
        rewards: true,
      },
    });

    if (organizer.role === UserRole.ORGANIZER) {
      await this.prismaService.organizerProfile.update({
        where: {userId: organizerId},
        data: {
          totalEvents: {
            increment: 1,
          },
        },
      });
    }

    return event;
  }

  async findMine(currentUser: User, search?: string) {
    this.assertCanManageEvents(currentUser);

    return this.prismaService.event.findMany({
      where: {
        organizerId: currentUser.id,
        ...(search
          ? {
              OR: [
                {
                  title: {
                    contains: search,
                    mode: 'insensitive',
                  },
                },
                {
                  description: {
                    contains: search,
                    mode: 'insensitive',
                  },
                },
                {
                  city: {
                    contains: search,
                    mode: 'insensitive',
                  },
                },
              ],
            }
          : {}),
      },
      orderBy: {
        startsAt: 'desc',
      },
      include: {
        rewards: {
          orderBy: {
            place: 'asc',
          },
        },
        participations: {
          include: {
            participant: true,
          },
          orderBy: {
            createdAt: 'desc',
          },
        },
      },
    });
  }

  async findParticipants(currentUser: User, eventId: string) {
    this.assertCanManageEvents(currentUser);

    const event = await this.ensureOwnedEvent(currentUser.id, eventId);

    return this.prismaService.participation.findMany({
      where: {
        eventId: event.id,
      },
      include: {
        participant: true,
      },
      orderBy: {
        createdAt: 'desc',
      },
    });
  }

  async complete(currentUser: User, eventId: string, completeEventDto: CompleteEventDto) {
    this.assertCanManageEvents(currentUser);

    const event = await this.prismaService.event.findUnique({
      where: { id: eventId },
      include: {
        rewards: true,
        participations: true,
      },
    });

    if (!event) {
      throw new NotFoundException('Event not found');
    }

    if (event.organizerId !== currentUser.id) {
      throw new ForbiddenException('Event does not belong to current organizer');
    }

    const uniquePlaces = new Set(completeEventDto.winners.map((winner) => winner.place));
    const uniqueParticipants = new Set(
      completeEventDto.winners.map((winner) => winner.participantId),
    );

    if (
      uniquePlaces.size !== completeEventDto.winners.length ||
      uniqueParticipants.size !== completeEventDto.winners.length
    ) {
      throw new ForbiddenException('Winner places and participants must be unique');
    }

    const rewardsByPlace = new Map(event.rewards.map((reward) => [reward.place, reward]));
    const participationsByParticipantId = new Map(
      event.participations.map((participation) => [participation.participantId, participation]),
    );

    for (const winner of completeEventDto.winners) {
      if (!rewardsByPlace.has(winner.place)) {
        throw new NotFoundException(`Reward for place ${winner.place} not found`);
      }

      if (!participationsByParticipantId.has(winner.participantId)) {
        throw new NotFoundException('Winner is not registered for this event');
      }
    }

    return this.prismaService.$transaction(async (transaction) => {
      for (const winner of completeEventDto.winners) {
        const reward = rewardsByPlace.get(winner.place)!;
        const participation = participationsByParticipantId.get(winner.participantId)!;

        await transaction.participation.update({
          where: { id: participation.id },
          data: {
            status: ParticipationStatus.VERIFIED,
            place: winner.place,
            scoreAwarded: reward.platformPoints,
            verifiedAt: new Date(),
          },
        });

        await transaction.participantProfile.upsert({
          where: {
            userId: winner.participantId,
          },
          update: {
            totalScore: {
              increment: reward.platformPoints,
            },
            reserveForecastScore: {
              increment: reward.platformPoints,
            },
          },
          create: {
            userId: winner.participantId,
            totalScore: reward.platformPoints,
            reserveForecastScore: reward.platformPoints,
          },
        });
      }

      return transaction.event.update({
        where: { id: eventId },
        data: {
          status: EventStatus.COMPLETED,
          completedAt: new Date(),
        },
        include: {
          organizer: {
            include: {
              organizerProfile: true,
            },
          },
          rewards: {
            orderBy: {
              place: 'asc',
            },
          },
          participations: {
            include: {
              participant: true,
            },
            orderBy: {
              createdAt: 'desc',
            },
          },
        },
      });
    });
  }

  findAll(search?: string) {
    return this.prismaService.event.findMany({
      where: search
        ? {
            OR: [
              {
                title: {
                  contains: search,
                  mode: 'insensitive',
                },
              },
              {
                description: {
                  contains: search,
                  mode: 'insensitive',
                },
              },
              {
                city: {
                  contains: search,
                  mode: 'insensitive',
                },
              },
              {
                organizer: {
                  firstName: {
                    contains: search,
                    mode: 'insensitive',
                  },
                },
              },
              {
                organizer: {
                  lastName: {
                    contains: search,
                    mode: 'insensitive',
                  },
                },
              },
              {
                organizer: {
                  email: {
                    contains: search,
                    mode: 'insensitive',
                  },
                },
              },
              {
                organizer: {
                  organizerProfile: {
                    organizationName: {
                      contains: search,
                      mode: 'insensitive',
                    },
                  },
                },
              },
            ],
          }
        : undefined,
      orderBy: {
        startsAt: 'desc',
      },
      select: {
        id: true,
        title: true,
        description: true,
        city: true,
        direction: true,
        difficulty: true,
        startsAt: true,
        imageUrl: true,
        organizer: {
          select: {
            id: true,
            firstName: true,
            lastName: true,
            email: true,
            organizerProfile: {
              select: {
                organizationName: true,
              },
            },
          },
        },
      },
    });
  }

  findOne(id: string) {
    return this.prismaService.event.findUniqueOrThrow({
      where: {id},
      select: {
        id: true,
        title: true,
        description: true,
        city: true,
        direction: true,
        difficulty: true,
        startsAt: true,
        imageUrl: true,
        organizer: {
          select: {
            id: true,
            firstName: true,
            lastName: true,
            email: true,
            organizerProfile: {
              select: {
                organizationName: true,
              },
            },
          },
        },
        rewards: {
          select: {
            id: true,
            title: true,
            description: true,
            points: true,
          },
        },
        participations: {
          select: {
            id: true,
            status: true,
            participant: {
              select: {
                id: true,
              },
            },
          },
          orderBy: {
            createdAt: 'desc',
          },
        },
      },
    });
  }

  private assertCanManageEvents(currentUser: User) {
    if (currentUser.role !== UserRole.ORGANIZER) {
      throw new ForbiddenException('Only organizer can manage events');
    }
  }

  private async ensureOwnedEvent(organizerId: string, eventId: string) {
    const event = await this.prismaService.event.findUnique({
      where: { id: eventId },
    });

    if (!event) {
      throw new NotFoundException('Event not found');
    }

    if (event.organizerId !== organizerId) {
      throw new ForbiddenException('Event does not belong to current organizer');
    }

    return event;
  }
}
