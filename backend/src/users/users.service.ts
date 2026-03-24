import { Injectable } from '@nestjs/common';
import { UserRole } from '@prisma/client';
import { PrismaService } from '../prisma/prisma.service';
import { KratosWhoAmIResponse } from '../kratos/kratos.types';

@Injectable()
export class UsersService {
  constructor(private readonly prismaService: PrismaService) {}

  async syncFromKratosIdentity(identity: KratosWhoAmIResponse['identity']) {
    const email = identity.traits?.email;

    if (!email) {
      throw new Error('Kratos identity does not include email');
    }

    const isVerified = this.resolveVerified(identity, email);
    const user = await this.prismaService.user.upsert({
      where: { kratosIdentityId: identity.id },
      update: {
        email,
        isVerified,
        firstName: identity.traits?.first_name ?? null,
        lastName: identity.traits?.last_name ?? null,
        city: identity.traits?.city ?? null,
      },
      create: {
        kratosIdentityId: identity.id,
        email,
        isVerified,
        firstName: identity.traits?.first_name ?? null,
        lastName: identity.traits?.last_name ?? null,
        city: identity.traits?.city ?? null,
        role: UserRole.PARTICIPANT,
        participantProfile:
          {
            create: {},
          },
      },
      include: {
        organizerProfile: true,
        participantProfile: true,
      },
    });

    await this.ensureRoleProfiles(user.id, user.role);

    return this.prismaService.user.findUniqueOrThrow({
      where: { id: user.id },
      include: {
        organizerProfile: true,
        participantProfile: true,
      },
    });
  }

  findById(userId: string) {
    return this.prismaService.user.findUniqueOrThrow({
      where: { id: userId },
      include: {
        organizerProfile: true,
        participantProfile: true,
      },
    });
  }

  listAll() {
    return this.prismaService.user.findMany({
      orderBy: {
        createdAt: 'desc',
      },
      include: {
        organizerProfile: true,
        participantProfile: true,
      },
    });
  }

  listOrganizerCandidates() {
    return this.prismaService.user.findMany({
      where: {
        isVerified: true,
        role: {
          in: [UserRole.PARTICIPANT, UserRole.OBSERVER],
        },
      },
      orderBy: {
        createdAt: 'desc',
      },
      include: {
        organizerProfile: true,
        participantProfile: true,
      },
    });
  }

  listApprovedOrganizers() {
    return this.prismaService.user.findMany({
      where: {
        isVerified: true,
        role: UserRole.ORGANIZER,
      },
      orderBy: {
        createdAt: 'desc',
      },
      include: {
        organizerProfile: true,
        participantProfile: true,
      },
    });
  }

  async updateUserRole(userId: string, role: UserRole) {
    const user = await this.prismaService.user.update({
      where: { id: userId },
      data: { role },
      include: {
        organizerProfile: true,
        participantProfile: true,
      },
    });

    await this.ensureRoleProfiles(userId, role);

    return this.findById(userId);
  }

  private resolveVerified(
    identity: KratosWhoAmIResponse['identity'],
    email: string,
  ) {
    return (
      identity.verifiable_addresses?.some(
        (address) => address.value === email && address.verified === true,
      ) ?? false
    );
  }

  private async ensureRoleProfiles(userId: string, role: UserRole) {
    if (role === UserRole.ORGANIZER) {
      await this.prismaService.organizerProfile.upsert({
        where: { userId },
        update: {},
        create: {
          userId,
          commonRewardTypes: [],
        },
      });
      return;
    }

    await this.prismaService.participantProfile.upsert({
      where: { userId },
      update: {},
      create: {
        userId,
      },
    });
  }
}
