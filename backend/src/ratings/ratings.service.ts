import { Injectable } from '@nestjs/common';
import { UserRole } from '@prisma/client';
import { PrismaService } from '../prisma/prisma.service';

@Injectable()
export class RatingsService {
  constructor(private readonly prismaService: PrismaService) {}

  async findAll(limit = 100, search?: string) {
    const normalizedLimit = Number.isFinite(limit) && limit > 0 ? limit : 100;

    const users = await this.prismaService.user.findMany({
      where: {
        role: {
          in: [UserRole.ADMIN, UserRole.OBSERVER, UserRole.PARTICIPANT],
        },
        participantProfile: {
          isNot: null,
        },
        ...(search
          ? {
              OR: [
                {
                  firstName: {
                    contains: search,
                    mode: 'insensitive',
                  },
                },
                {
                  lastName: {
                    contains: search,
                    mode: 'insensitive',
                  },
                },
                {
                  email: {
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
                  school: {
                    contains: search,
                    mode: 'insensitive',
                  },
                },
              ],
            }
          : {}),
      },
      include: {
        participantProfile: true,
      },
    });

    return users
      .sort(
        (left, right) =>
          (right.participantProfile?.totalScore ?? 0) -
          (left.participantProfile?.totalScore ?? 0),
      )
      .slice(0, normalizedLimit)
      .map((user, index) => ({
      place: index + 1,
      userId: user.id,
      email: user.email,
      firstName: user.firstName,
      lastName: user.lastName,
      city: user.city,
      totalScore: user.participantProfile?.totalScore ?? 0,
      reserveForecastScore: user.participantProfile?.reserveForecastScore ?? 0,
      }));
  }
}
