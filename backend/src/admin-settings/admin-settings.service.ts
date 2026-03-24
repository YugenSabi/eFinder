import {ForbiddenException, Injectable} from '@nestjs/common';
import {type User, UserRole} from '@prisma/client';
import {PrismaService} from '../prisma/prisma.service';
import { CreateAdminSettingDto } from './dto/create-admin-setting.dto';

@Injectable()
export class AdminSettingsService {
  constructor(private readonly prismaService: PrismaService) {}

  findAll() {
    return this.prismaService.eventScoreWeight.findMany({
      orderBy: [{direction: 'asc'}, {difficulty: 'asc'}],
    });
  }

  async replace(currentUser: User, createAdminSettingDto: CreateAdminSettingDto) {
    this.assertCanManageSettings(currentUser);

    await this.prismaService.$transaction([
      this.prismaService.eventScoreWeight.deleteMany(),
      ...createAdminSettingDto.items.map((item) =>
        this.prismaService.eventScoreWeight.create({
          data: {
            direction: item.direction,
            difficulty: item.difficulty,
            weight: item.weight,
          },
        }),
      ),
    ]);

    return this.findAll();
  }

  private assertCanManageSettings(currentUser: User) {
    if (currentUser.role !== UserRole.ADMIN) {
      throw new ForbiddenException('Only admin can manage score settings');
    }
  }
}
