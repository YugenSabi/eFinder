import {
  ForbiddenException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import {
  UserRole,
  type User,
} from '@prisma/client';
import {PrismaService} from '../prisma/prisma.service';
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
        startsAt: new Date(createEventDto.startsAt),
        endsAt: createEventDto.endsAt
          ? new Date(createEventDto.endsAt)
          : null,
        organizerId,
        basePoints: createEventDto.basePoints,
        difficultyFactor,
        rewardSummary: createEventDto.rewardSummary,
        rewards: createEventDto.rewards?.length
          ? {
              create: createEventDto.rewards.map((reward) => ({
                title: reward.title,
                description: reward.description,
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

  findAll() {
    return this.prismaService.event.findMany({
      orderBy: {
        startsAt: 'desc',
      },
      include: {
        organizer: true,
        rewards: true,
      },
    });
  }

  findOne(id: string) {
    return this.prismaService.event.findUniqueOrThrow({
      where: {id},
      include: {
        organizer: true,
        rewards: true,
      },
    });
  }

  private assertCanManageEvents(currentUser: User) {
    if (currentUser.role !== UserRole.ORGANIZER) {
      throw new ForbiddenException('Only organizer can manage events');
    }
  }
}
