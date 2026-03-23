import { Injectable } from '@nestjs/common';
import { UserRole } from '@prisma/client';
import { PrismaService } from '../prisma/prisma.service';
import { KratosWhoAmIResponse } from '../kratos/kratos.types';

const KRATOS_ROLE_TO_USER_ROLE: Record<string, UserRole> = {
  admin: UserRole.ADMIN,
  moderator: UserRole.MODERATOR,
  observer: UserRole.OBSERVER,
  organizer: UserRole.ORGANIZER,
  participant: UserRole.PARTICIPANT,
};

@Injectable()
export class UsersService {
  constructor(private readonly prismaService: PrismaService) {}

  async syncFromKratosIdentity(identity: KratosWhoAmIResponse['identity']) {
    const email = identity.traits?.email;

    if (!email) {
      throw new Error('Kratos identity does not include email');
    }

    const role = this.resolveRole(identity.traits?.role);
    const isVerified = this.resolveVerified(identity, email);
    const user = await this.prismaService.user.upsert({
      where: { kratosIdentityId: identity.id },
      update: {
        email,
        isVerified,
        firstName: identity.traits?.first_name ?? null,
        lastName: identity.traits?.last_name ?? null,
        city: identity.traits?.city ?? null,
        role,
      },
      create: {
        kratosIdentityId: identity.id,
        email,
        isVerified,
        firstName: identity.traits?.first_name ?? null,
        lastName: identity.traits?.last_name ?? null,
        city: identity.traits?.city ?? null,
        role,
        organizerProfile:
          role === UserRole.ORGANIZER
            ? {
                create: {
                  commonRewardTypes: [],
                },
              }
            : undefined,
        participantProfile:
          role === UserRole.PARTICIPANT || role === UserRole.OBSERVER
            ? {
                create: {},
              }
            : undefined,
      },
      include: {
        organizerProfile: true,
        participantProfile: true,
      },
    });

    await this.ensureRoleProfiles(user.id, role);

    return this.prismaService.user.findUniqueOrThrow({
      where: { id: user.id },
      include: {
        organizerProfile: true,
        participantProfile: true,
      },
    });
  }

  private resolveRole(role?: string): UserRole {
    if (!role) {
      return UserRole.PARTICIPANT;
    }

    return KRATOS_ROLE_TO_USER_ROLE[role] ?? UserRole.PARTICIPANT;
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
