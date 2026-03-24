import {
  Controller,
  Get,
  Body,
  Put,
  Req,
} from '@nestjs/common';
import {ApiTags} from '@nestjs/swagger';
import type {Request} from 'express';
import {AuthService} from '../auth/auth.service';
import { AdminSettingsService } from './admin-settings.service';
import { CreateAdminSettingDto } from './dto/create-admin-setting.dto';

@ApiTags('admin-settings')
@Controller('admin-settings')
export class AdminSettingsController {
  constructor(
    private readonly adminSettingsService: AdminSettingsService,
    private readonly authService: AuthService,
  ) {}

  @Get()
  findAll() {
    return this.adminSettingsService.findAll();
  }

  @Put()
  async replace(
    @Req() request: Request,
    @Body() createAdminSettingDto: CreateAdminSettingDto,
  ) {
    const currentUser = await this.authService.getAuthenticatedUser(request);

    return this.adminSettingsService.replace(currentUser, createAdminSettingDto);
  }
}
