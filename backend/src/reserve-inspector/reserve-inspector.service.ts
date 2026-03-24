import {
  ForbiddenException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { existsSync } from 'node:fs';
import PDFDocument = require('pdfkit');
import {
  EventDirection,
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

  async buildParticipantReportPdf(currentUser: User, participantId: string) {
    this.assertObserver(currentUser);

    const participant = await this.prismaService.user.findUnique({
      where: {
        id: participantId,
      },
      include: {
        participantProfile: true,
        participations: {
          include: {
            event: {
              include: {
                organizer: {
                  include: {
                    organizerProfile: true,
                  },
                },
              },
            },
          },
          orderBy: {
            createdAt: 'desc',
          },
        },
      },
    });

    if (!participant || participant.role !== UserRole.PARTICIPANT) {
      throw new NotFoundException('Participant not found');
    }

    const verifiedParticipations = participant.participations.filter(
      (participation) => participation.status === ParticipationStatus.VERIFIED,
    );
    const totalScore =
      participant.participantProfile?.totalScore ??
      verifiedParticipations.reduce(
        (sum, participation) => sum + participation.scoreAwarded,
        0,
      );
    const averageScore =
      verifiedParticipations.length > 0
        ? totalScore / verifiedParticipations.length
        : 0;
    const directionTotals = new Map<EventDirection, number>();

    for (const direction of Object.values(EventDirection)) {
      directionTotals.set(direction, 0);
    }

    for (const participation of verifiedParticipations) {
      directionTotals.set(
        participation.event.direction,
        (directionTotals.get(participation.event.direction) ?? 0) +
          participation.scoreAwarded,
      );
    }

    const reportLines = [
      'Participant report',
      '',
      `Generated at: ${this.formatDateTime(new Date())}`,
      '',
      'Profile',
      `Name: ${this.buildDisplayName(participant)}`,
      `Email: ${participant.email}`,
      `City: ${participant.city ?? '-'}`,
      `Age: ${participant.age ?? '-'}`,
      `School: ${participant.school ?? '-'}`,
      `Headline: ${participant.headline ?? '-'}`,
      '',
      'Summary',
      `Role: ${participant.role}`,
      `Verified account: ${participant.isVerified ? 'yes' : 'no'}`,
      `Verified events: ${verifiedParticipations.length}`,
      `All event applications: ${participant.participations.length}`,
      `Total score: ${totalScore}`,
      `Average score: ${averageScore.toFixed(2)}`,
      `Current rank: ${participant.participantProfile?.currentRank ?? '-'}`,
      `Reserve forecast score: ${
        participant.participantProfile?.reserveForecastScore ?? 0
      }`,
      '',
      'Scores by direction',
      ...Object.values(EventDirection).map(
        (direction) => `${direction}: ${directionTotals.get(direction) ?? 0}`,
      ),
      '',
      'Event history',
      ...(participant.participations.length > 0
        ? participant.participations.flatMap((participation, index) => {
            const organizerName =
              participation.event.organizer.organizerProfile?.organizationName ??
              this.buildDisplayName(participation.event.organizer);

            return [
              `${index + 1}. ${participation.event.title}`,
              `   Status: ${participation.status}`,
              `   Score awarded: ${participation.scoreAwarded}`,
              `   Place: ${participation.place ?? '-'}`,
              `   Direction: ${participation.event.direction}`,
              `   City: ${participation.event.city ?? '-'}`,
              `   Starts at: ${this.formatDateTime(participation.event.startsAt)}`,
              `   Organizer: ${organizerName}`,
              `   Comment: ${participation.organizerComment ?? '-'}`,
            ];
          })
        : ['No event applications yet']),
    ];

    const participantNameForFile = this
      .sanitizeAsciiFileName(this.buildDisplayName(participant))
      .toLowerCase();

    return {
      fileName: `participant-report-${participantNameForFile || participant.id}.pdf`,
      buffer: await this.buildPdfDocument(reportLines),
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

  private buildDisplayName(
    user: Pick<User, 'firstName' | 'lastName' | 'email'>,
  ) {
    return [user.firstName, user.lastName].filter(Boolean).join(' ').trim() || user.email;
  }

  private formatDateTime(value: Date) {
    return new Intl.DateTimeFormat('ru-RU', {
      dateStyle: 'medium',
      timeStyle: 'short',
      timeZone: 'Europe/Moscow',
    }).format(value);
  }

  private sanitizeAsciiFileName(value: string) {
    return value
      .normalize('NFKD')
      .replace(/[^\x20-\x7E]/g, '')
      .replace(/[^a-zA-Z0-9_-]+/g, '-')
      .replace(/-+/g, '-')
      .replace(/^-|-$/g, '');
  }

  private buildPdfDocument(lines: string[]) {
    return new Promise<Buffer>((resolve, reject) => {
      const chunks: Buffer[] = [];
      const document = new PDFDocument({
        size: 'A4',
        margin: 40,
        info: {
          Title: 'Participant report',
          Author: 'eFinder backend',
        },
      });

      const fontPath = this.resolveReportFontPath();

      if (fontPath) {
        document.registerFont('ReportFont', fontPath);
        document.font('ReportFont');
      } else {
        document.font('Helvetica');
      }
      document.fontSize(11);

      document.on('data', (chunk: Buffer) => {
        chunks.push(chunk);
      });
      document.on('end', () => {
        resolve(Buffer.concat(chunks));
      });
      document.on('error', reject);

      for (const line of lines) {
        if (line === '') {
          document.moveDown(0.4);
          continue;
        }

        if (/^(Profile|Summary|Scores by direction|Event history)$/.test(line)) {
          document.font(fontPath ? 'ReportFont' : 'Helvetica').fontSize(13).text(line);
          document.moveDown(0.2);
          document.font(fontPath ? 'ReportFont' : 'Helvetica').fontSize(11);
          continue;
        }

        document.text(line, {
          width: 515,
        });
      }

      document.end();
    });
  }

  private resolveReportFontPath() {
    const candidatePaths = process.platform === 'win32'
      ? [
          'C:\\Windows\\Fonts\\arial.ttf',
          'C:\\Windows\\Fonts\\ARIAL.TTF',
          'C:\\Windows\\Fonts\\calibri.ttf',
        ]
      : process.platform === 'darwin'
        ? [
            '/System/Library/Fonts/Supplemental/Arial Unicode.ttf',
            '/System/Library/Fonts/Supplemental/Arial.ttf',
            '/Library/Fonts/Arial.ttf',
          ]
        : [
            '/usr/share/fonts/truetype/dejavu/DejaVuSans.ttf',
            '/usr/share/fonts/truetype/liberation2/LiberationSans-Regular.ttf',
            '/usr/share/fonts/truetype/freefont/FreeSans.ttf',
          ];

    return candidatePaths.find((path) => existsSync(path));
  }
}
