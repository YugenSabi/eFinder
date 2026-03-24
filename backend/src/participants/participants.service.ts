import { Injectable } from '@nestjs/common';
import { UserRole } from '@prisma/client';
import { PrismaService } from '../prisma/prisma.service';

@Injectable()
export class ParticipantsService {
  constructor(private readonly prismaService: PrismaService) {}

  findAll() {
    return this.prismaService.user.findMany({
      where: {
        role: {
          in: [UserRole.PARTICIPANT, UserRole.ADMIN, UserRole.OBSERVER],
        },
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
