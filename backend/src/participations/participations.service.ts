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
import { CreateParticipationDto } from './dto/create-participation.dto';
import { ReviewParticipationDto } from './dto/review-participation.dto';

@Injectable()
export class ParticipationsService {
  constructor(private readonly prismaService: PrismaService) {}

  async create(currentUser: User, createParticipationDto: CreateParticipationDto) {
    const event = await this.prismaService.event.findUnique({
      where: { id: createParticipationDto.eventId },
    });

    if (!event) {
      throw new NotFoundException('Event not found');
    }

    return this.prismaService.participation.upsert({
      where: {
        eventId_participantId: {
          eventId: createParticipationDto.eventId,
          participantId: currentUser.id,
        },
      },
      update: {
        status: ParticipationStatus.REGISTERED,
      },
      create: {
        eventId: createParticipationDto.eventId,
        participantId: currentUser.id,
        status: ParticipationStatus.REGISTERED,
      },
    });
  }

  async findPendingForOrganizer(currentUser: User) {
    if (currentUser.role !== UserRole.ORGANIZER) {
      throw new ForbiddenException('Only organizer can review participation requests');
    }

    return this.prismaService.participation.findMany({
      where: {
        status: ParticipationStatus.REGISTERED,
        event: {
          organizerId: currentUser.id,
        },
      },
      include: {
        event: true,
        participant: true,
      },
      orderBy: {
        createdAt: 'desc',
      },
    });
  }

  async findMyStatus(currentUser: User, eventId: string) {
    return this.prismaService.participation.findUnique({
      where: {
        eventId_participantId: {
          eventId,
          participantId: currentUser.id,
        },
      },
    });
  }

  async update(
    currentUser: User,
    participationId: string,
    reviewParticipationDto: ReviewParticipationDto,
  ) {
    if (currentUser.role !== UserRole.ORGANIZER) {
      throw new ForbiddenException('Only organizer can review participation requests');
    }

    const participation = await this.prismaService.participation.findUnique({
      where: { id: participationId },
      include: {
        event: true,
      },
    });

    if (!participation) {
      throw new NotFoundException('Participation not found');
    }

    if (participation.event.organizerId !== currentUser.id) {
      throw new ForbiddenException('Event does not belong to current organizer');
    }

    return this.prismaService.participation.update({
      where: { id: participationId },
      data: {
        status: reviewParticipationDto.status,
        organizerComment: reviewParticipationDto.organizerComment,
        verifiedAt:
          reviewParticipationDto.status === ParticipationStatus.VERIFIED
            ? new Date()
            : null,
      },
      include: {
        event: true,
        participant: true,
      },
    });
  }
}
