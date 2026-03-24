import {
  ForbiddenException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import {
  ParticipationStatus,
  UserRole,
  type User,
} from '@prisma/client';
import { PrismaService } from '../prisma/prisma.service';
import { ListObserverParticipantsDto } from './dto/list-observer-participants.dto';

@Injectable()
export class ReserveInspectorService {
  constructor(private readonly prismaService: PrismaService) {}

  async listParticipants(
    currentUser: User,
    query: ListObserverParticipantsDto,
  ) {
    this.assertObserver(currentUser);

    const favoriteParticipantIds = await this.getFavoriteParticipantIds(currentUser.id);
    const participants = await this.prismaService.user.findMany({
      where: {
        role: UserRole.PARTICIPANT,
        isVerified: true,
        ...(query.search
          ? {
              OR: [
                {
                  firstName: {
                    contains: query.search,
                    mode: 'insensitive',
                  },
                },
                {
                  lastName: {
                    contains: query.search,
                    mode: 'insensitive',
                  },
                },
                {
                  email: {
                    contains: query.search,
                    mode: 'insensitive',
                  },
                },
                {
                  city: {
                    contains: query.search,
                    mode: 'insensitive',
                  },
                },
                {
                  school: {
                    contains: query.search,
                    mode: 'insensitive',
                  },
                },
                {
                  headline: {
                    contains: query.search,
                    mode: 'insensitive',
                  },
                },
              ],
            }
          : {}),
      },
      orderBy: {
        createdAt: 'desc',
      },
      include: {
        participantProfile: true,
        participations: {
          where: {
            status: ParticipationStatus.VERIFIED,
          },
          select: {
            scoreAwarded: true,
          },
        },
      },
    });

    return participants
      .map((participant) => {
        const eventsCount = participant.participations.length;
        const totalScore = participant.participations.reduce(
          (sum, participation) => sum + participation.scoreAwarded,
          0,
        );
        const averageScore = eventsCount > 0 ? totalScore / eventsCount : 0;

        return {
          id: participant.id,
          email: participant.email,
          firstName: participant.firstName,
          lastName: participant.lastName,
          city: participant.city,
          age: participant.age,
          eventsCount,
          averageScore,
          totalScore: participant.participantProfile?.totalScore ?? totalScore,
          isFavorite: favoriteParticipantIds.has(participant.id),
        };
      })
      .filter((participant) => {
        if (query.city && participant.city !== query.city) {
          return false;
        }

        if (query.ageFrom !== undefined && (participant.age ?? -1) < query.ageFrom) {
          return false;
        }

        if (query.ageTo !== undefined && (participant.age ?? Number.MAX_SAFE_INTEGER) > query.ageTo) {
          return false;
        }

        if (query.eventsFrom !== undefined && participant.eventsCount < query.eventsFrom) {
          return false;
        }

        if (query.eventsTo !== undefined && participant.eventsCount > query.eventsTo) {
          return false;
        }

        if (
          query.averageScoreFrom !== undefined &&
          participant.averageScore < query.averageScoreFrom
        ) {
          return false;
        }

        if (
          query.averageScoreTo !== undefined &&
          participant.averageScore > query.averageScoreTo
        ) {
          return false;
        }

        if (query.favoritesOnly && !participant.isFavorite) {
          return false;
        }

        return true;
      });
  }

  async addFavorite(currentUser: User, participantId: string) {
    this.assertObserver(currentUser);
    await this.ensureParticipant(participantId);

    return this.prismaService.observerFavorite.upsert({
      where: {
        observerId_participantId: {
          observerId: currentUser.id,
          participantId,
        },
      },
      update: {},
      create: {
        observerId: currentUser.id,
        participantId,
      },
    });
  }

  async removeFavorite(currentUser: User, participantId: string) {
    this.assertObserver(currentUser);

    await this.prismaService.observerFavorite.deleteMany({
      where: {
        observerId: currentUser.id,
        participantId,
      },
    });

    return {
      success: true,
    };
  }

  private assertObserver(currentUser: User) {
    if (currentUser.role !== UserRole.OBSERVER) {
      throw new ForbiddenException('Only observer can access reserve inspector');
    }
  }

  private async ensureParticipant(participantId: string) {
    const participant = await this.prismaService.user.findUnique({
      where: {
        id: participantId,
      },
    });

    if (!participant || participant.role !== UserRole.PARTICIPANT) {
      throw new NotFoundException('Participant not found');
    }
  }

  private async getFavoriteParticipantIds(observerId: string) {
    const favorites = await this.prismaService.observerFavorite.findMany({
      where: {
        observerId,
      },
      select: {
        participantId: true,
      },
    });

    return new Set(favorites.map((favorite) => favorite.participantId));
  }
}
