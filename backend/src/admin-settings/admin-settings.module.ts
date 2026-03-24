import { Module } from '@nestjs/common';
import {AuthModule} from '../auth/auth.module';
import {PrismaModule} from '../prisma/prisma.module';
import { AdminSettingsService } from './admin-settings.service';
import { AdminSettingsController } from './admin-settings.controller';

@Module({
  imports: [PrismaModule, AuthModule],
  controllers: [AdminSettingsController],
  providers: [AdminSettingsService],
})
export class AdminSettingsModule {}
