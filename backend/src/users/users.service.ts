import { Injectable } from '@nestjs/common';
import {
  EventDirection,
  OrganizerProfileStatus,
  ParticipationStatus,
  UserRole,
} from '@prisma/client';
import { PrismaService } from '../prisma/prisma.service';
import { KratosWhoAmIResponse } from '../kratos/kratos.types';
import { UpdateMeDto } from '../auth/dto/update-me.dto';
import { RequestOrganizerAccessDto } from '../organizers/dto/request-organizer-access.dto';
import { UpdateOrganizerProfileDto } from '../organizers/dto/update-organizer-profile.dto';

@Injectable()
export class UsersService {
  constructor(private readonly prismaService: PrismaService) {}

  async syncFromKratosIdentity(identity: KratosWhoAmIResponse['identity']) {
    const email = identity.traits?.email;

    if (!email) {
      throw new Error('Kratos identity does not include email');
    }

    const isVerified = this.resolveVerified(identity, email);
    const existingUser = await this.prismaService.user.findUnique({
      where: { kratosIdentityId: identity.id },
    });

    const user = existingUser
      ? await this.prismaService.user.update({
          where: { id: existingUser.id },
          data: {
            email,
            isVerified,
            firstName: existingUser.firstName ?? identity.traits?.first_name ?? null,
            lastName: existingUser.lastName ?? identity.traits?.last_name ?? null,
            city: existingUser.city ?? identity.traits?.city ?? null,
          },
          include: {
            organizerProfile: true,
            participantProfile: true,
          },
        })
      : await this.prismaService.user.create({
          data: {
            kratosIdentityId: identity.id,
            email,
            isVerified,
            firstName: identity.traits?.first_name ?? null,
            lastName: identity.traits?.last_name ?? null,
            city: identity.traits?.city ?? null,
            role: UserRole.PARTICIPANT,
            participantProfile: {
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

  async getProfileView(userId: string) {
    const user = await this.prismaService.user.findUniqueOrThrow({
      where: { id: userId },
      include: {
        organizerProfile: true,
        participantProfile: true,
        createdEvents: true,
        participations: {
          where: {
            status: ParticipationStatus.VERIFIED,
          },
          include: {
            event: true,
          },
          orderBy: {
            verifiedAt: 'desc',
          },
        },
      },
    });

    const achievements = [...user.participations]
      .sort((left, right) => right.scoreAwarded - left.scoreAwarded)
      .slice(0, 5)
      .map((participation, index) => ({
        rank: index + 1,
        title: participation.event.title,
        score: participation.scoreAwarded,
      }));

    const directionScores = new Map<EventDirection, number>();
    for (const direction of Object.values(EventDirection)) {
      directionScores.set(direction, 0);
    }

    for (const participation of user.participations) {
      const currentScore = directionScores.get(participation.event.direction) ?? 0;
      directionScores.set(
        participation.event.direction,
        currentScore + participation.scoreAwarded,
      );
    }

    const stats = Object.values(EventDirection).map((direction) => ({
      label: direction,
      value: directionScores.get(direction) ?? 0,
    }));

    const leaderboardUsers = await this.prismaService.user.findMany({
      where: {
        role: {
          in: [UserRole.ADMIN, UserRole.OBSERVER, UserRole.PARTICIPANT],
        },
        participantProfile: {
          isNot: null,
        },
      },
      include: {
        participantProfile: true,
      },
    });

    const leaderboard = leaderboardUsers
      .map((participant) => ({
        id: participant.id,
        name:
          [participant.firstName, participant.lastName].filter(Boolean).join(' ').trim() ||
          participant.email,
        score: participant.participantProfile?.totalScore ?? 0,
      }))
      .sort((left, right) => right.score - left.score);

    const currentIndex = leaderboard.findIndex((item) => item.id === user.id);
    const sliceStart =
      currentIndex <= 0 ? 0 : Math.max(0, Math.min(currentIndex - 1, leaderboard.length - 3));
    const rating = leaderboard.slice(sliceStart, sliceStart + 3).map((item, index) => ({
      place: sliceStart + index + 1,
      name: item.name,
      score: item.score,
      highlight: item.id === user.id,
    }));

    const currentRank =
      user.participantProfile?.currentRank ??
      (currentIndex >= 0 ? currentIndex + 1 : null);

    const organizerProfiles = await this.prismaService.organizerProfile.findMany({
      where: {
        status: OrganizerProfileStatus.APPROVED,
      },
      orderBy: [{ totalEvents: 'desc' }, { trustScore: 'desc' }],
    });

    const organizerRank = organizerProfiles.findIndex(
      (item) => item.userId === user.id,
    );

    const recentEvents = [...user.createdEvents]
      .sort(
        (left, right) =>
          new Date(right.createdAt).getTime() - new Date(left.createdAt).getTime(),
      )
      .slice(0, 5)
      .map((event) => ({
        id: event.id,
        title: event.title,
        city: event.city,
        startsAt: event.startsAt,
        imageUrl: event.imageUrl,
      }));

    return {
      id: user.id,
      kratosIdentityId: user.kratosIdentityId,
      email: user.email,
      isVerified: user.isVerified,
      firstName: user.firstName,
      lastName: user.lastName,
      city: user.city,
      age: user.age,
      headline: user.headline,
      school: user.school,
      telegram: user.telegram,
      githubUrl: user.githubUrl,
      behanceUrl: user.behanceUrl,
      vkUrl: user.vkUrl,
      avatarUrl: user.avatarUrl,
      role: user.role,
      createdAt: user.createdAt,
      updatedAt: user.updatedAt,
      organizerProfile: user.organizerProfile
        ? {
            organizationName: user.organizerProfile.organizationName,
            description: user.organizerProfile.bio,
            websiteUrl: user.organizerProfile.websiteUrl,
            telegram: user.organizerProfile.telegram,
            vkUrl: user.organizerProfile.vkUrl,
            logoUrl: user.organizerProfile.logoUrl,
            status: user.organizerProfile.status,
            trustScore: user.organizerProfile.trustScore,
            totalEvents: user.organizerProfile.totalEvents,
            organizationRank:
              user.organizerProfile.organizationRank ??
              (organizerRank >= 0 ? organizerRank + 1 : null),
            commonRewardTypes: user.organizerProfile.commonRewardTypes,
            recentEvents,
          }
        : null,
      participantProfile: {
        totalScore: user.participantProfile?.totalScore ?? 0,
        currentRank,
        reserveForecastScore:
          user.participantProfile?.reserveForecastScore ?? 0,
        portfolioSummary: user.participantProfile?.portfolioSummary ?? null,
      },
      achievements,
      stats,
      rating,
    };
  }

  async updateProfile(userId: string, updateMeDto: UpdateMeDto) {
    const userData = {
      firstName: this.normalizeOptionalString(updateMeDto.firstName),
      lastName: this.normalizeOptionalString(updateMeDto.lastName),
      age:
        updateMeDto.age === undefined
          ? undefined
          : updateMeDto.age === null
            ? null
            : updateMeDto.age,
      city: this.normalizeOptionalString(updateMeDto.city),
      headline: this.normalizeOptionalString(updateMeDto.headline),
      school: this.normalizeOptionalString(updateMeDto.school),
      telegram: this.normalizeOptionalString(updateMeDto.telegram),
      githubUrl: this.normalizeOptionalString(updateMeDto.githubUrl),
      behanceUrl: this.normalizeOptionalString(updateMeDto.behanceUrl),
      vkUrl: this.normalizeOptionalString(updateMeDto.vkUrl),
      avatarUrl: this.normalizeOptionalString(updateMeDto.avatarUrl),
    };

    await this.prismaService.user.update({
      where: { id: userId },
      data: userData,
    });

    await this.prismaService.participantProfile.upsert({
      where: { userId },
      update: {
        portfolioSummary: this.normalizeOptionalString(
          updateMeDto.portfolioSummary,
        ),
      },
      create: {
        userId,
        portfolioSummary: this.normalizeOptionalString(
          updateMeDto.portfolioSummary,
        ),
      },
    });

    return this.getProfileView(userId);
  }

  findById(userId: string) {
    return this.prismaService.user.findUniqueOrThrow({
      where: { id: userId },
      include: {
        organizerProfile: true,
        participantProfile: true,
        createdEvents: true,
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
        createdEvents: true,
      },
    });
  }

  listOrganizerCandidates() {
    return this.prismaService.user.findMany({
      where: {
        organizerProfile: {
          is: {
            status: OrganizerProfileStatus.PENDING,
          },
        },
      },
      orderBy: {
        createdAt: 'desc',
      },
      include: {
        organizerProfile: true,
        participantProfile: true,
        createdEvents: true,
      },
    });
  }

  listApprovedOrganizers() {
    return this.prismaService.user.findMany({
      where: {
        organizerProfile: {
          is: {
            status: OrganizerProfileStatus.APPROVED,
          },
        },
      },
      orderBy: {
        createdAt: 'desc',
      },
      include: {
        organizerProfile: true,
        participantProfile: true,
        createdEvents: true,
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

  async requestOrganizerAccess(
    userId: string,
    requestOrganizerAccessDto: RequestOrganizerAccessDto,
  ) {
    return this.prismaService.organizerProfile.upsert({
      where: { userId },
      update: {
        organizationName: this.normalizeOptionalString(
          requestOrganizerAccessDto.organizationName,
        ),
        bio: this.normalizeOptionalString(requestOrganizerAccessDto.bio),
        websiteUrl: this.normalizeOptionalString(
          requestOrganizerAccessDto.websiteUrl,
        ),
        telegram: this.normalizeOptionalString(requestOrganizerAccessDto.telegram),
        vkUrl: this.normalizeOptionalString(requestOrganizerAccessDto.vkUrl),
        logoUrl: this.normalizeOptionalString(requestOrganizerAccessDto.logoUrl),
        status: OrganizerProfileStatus.PENDING,
      },
      create: {
        userId,
        organizationName: this.normalizeOptionalString(
          requestOrganizerAccessDto.organizationName,
        ),
        bio: this.normalizeOptionalString(requestOrganizerAccessDto.bio),
        websiteUrl: this.normalizeOptionalString(
          requestOrganizerAccessDto.websiteUrl,
        ),
        telegram: this.normalizeOptionalString(requestOrganizerAccessDto.telegram),
        vkUrl: this.normalizeOptionalString(requestOrganizerAccessDto.vkUrl),
        logoUrl: this.normalizeOptionalString(requestOrganizerAccessDto.logoUrl),
        status: OrganizerProfileStatus.PENDING,
        commonRewardTypes: [],
      },
    });
  }

  async updateOrganizerProfile(
    userId: string,
    updateOrganizerProfileDto: UpdateOrganizerProfileDto,
  ) {
    await this.prismaService.organizerProfile.upsert({
      where: { userId },
      update: {
        organizationName: this.normalizeOptionalString(
          updateOrganizerProfileDto.organizationName,
        ),
        bio: this.normalizeOptionalString(updateOrganizerProfileDto.bio),
        websiteUrl: this.normalizeOptionalString(
          updateOrganizerProfileDto.websiteUrl,
        ),
        telegram: this.normalizeOptionalString(updateOrganizerProfileDto.telegram),
        vkUrl: this.normalizeOptionalString(updateOrganizerProfileDto.vkUrl),
        logoUrl: this.normalizeOptionalString(updateOrganizerProfileDto.logoUrl),
      },
      create: {
        userId,
        organizationName: this.normalizeOptionalString(
          updateOrganizerProfileDto.organizationName,
        ),
        bio: this.normalizeOptionalString(updateOrganizerProfileDto.bio),
        websiteUrl: this.normalizeOptionalString(
          updateOrganizerProfileDto.websiteUrl,
        ),
        telegram: this.normalizeOptionalString(updateOrganizerProfileDto.telegram),
        vkUrl: this.normalizeOptionalString(updateOrganizerProfileDto.vkUrl),
        logoUrl: this.normalizeOptionalString(updateOrganizerProfileDto.logoUrl),
        commonRewardTypes: [],
      },
    });

    return this.getProfileView(userId);
  }

  async approveOrganizerRequest(userId: string) {
    await this.prismaService.organizerProfile.upsert({
      where: { userId },
      update: {
        status: OrganizerProfileStatus.APPROVED,
      },
      create: {
        userId,
        status: OrganizerProfileStatus.APPROVED,
        commonRewardTypes: [],
      },
    });

    return this.updateUserRole(userId, UserRole.ORGANIZER);
  }

  async rejectOrganizerRequest(userId: string) {
    await this.prismaService.organizerProfile.upsert({
      where: { userId },
      update: {
        status: OrganizerProfileStatus.REJECTED,
      },
      create: {
        userId,
        status: OrganizerProfileStatus.REJECTED,
        commonRewardTypes: [],
      },
    });

    return this.updateUserRole(userId, UserRole.PARTICIPANT);
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
        update: {
          status: OrganizerProfileStatus.APPROVED,
        },
        create: {
          userId,
          status: OrganizerProfileStatus.APPROVED,
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

  private normalizeOptionalString(value?: string | null) {
    if (value === undefined) {
      return undefined;
    }

    if (value === null) {
      return null;
    }

    const normalized = value.trim();
    return normalized.length > 0 ? normalized : null;
  }
}
