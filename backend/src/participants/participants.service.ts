import { Injectable } from '@nestjs/common';
import { UserRole } from '@prisma/client';
import { PrismaService } from '../prisma/prisma.service';

@Injectable()
export class ParticipantsService {
  constructor(private readonly prismaService: PrismaService) {}

  findAll(search?: string) {
    return this.prismaService.user.findMany({
      where: {
        role: {
          in: [UserRole.PARTICIPANT, UserRole.ADMIN, UserRole.OBSERVER],
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
              ],
            }
          : {}),
      },
      include: {
        participantProfile: true,
      },
      orderBy: {
        createdAt: 'desc',
      },
    });
  }

  findOne(id: string) {
    return this.prismaService.user.findUniqueOrThrow({
      where: { id },
      include: {
        participantProfile: true,
        participations: {
          include: {
            event: true,
          },
          orderBy: {
            createdAt: 'desc',
          },
        },
      },
    });
  }
}
