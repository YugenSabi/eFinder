import {
  Body,
  Controller,
  Get,
  Patch,
  Param,
  Post,
  Query,
  Req,
} from '@nestjs/common';
import {ApiTags} from '@nestjs/swagger';
import type {Request} from 'express';
import {AuthService} from '../auth/auth.service';
import { RequestOrganizerAccessDto } from './dto/request-organizer-access.dto';
import { OrganizersService } from './organizers.service';
import { UpdateOrganizerDto } from './dto/update-organizer.dto';
import { UpdateOrganizerProfileDto } from './dto/update-organizer-profile.dto';

@ApiTags('organizers')
@Controller('organizers')
export class OrganizersController {
  constructor(
    private readonly organizersService: OrganizersService,
    private readonly authService: AuthService,
  ) {}

  @Post('request')
  async requestAccess(
    @Req() request: Request,
    @Body() requestOrganizerAccessDto: RequestOrganizerAccessDto,
  ) {
    const currentUser = await this.authService.getAuthenticatedUser(request);

    return this.organizersService.requestAccess(
      currentUser,
      requestOrganizerAccessDto,
    );
  }

  @Get('candidates')
  async findAll(@Req() request: Request, @Query('search') search?: string) {
    const currentUser = await this.authService.getAuthenticatedUser(request);

    return this.organizersService.findAll(currentUser, search);
  }

  @Get('approved')
  async findApproved(@Req() request: Request, @Query('search') search?: string) {
    const currentUser = await this.authService.getAuthenticatedUser(request);

    return this.organizersService.findApproved(currentUser, search);
  }

  @Get(':id/profile')
  findPublicProfile(@Param('id') id: string) {
    return this.organizersService.findPublicProfile(id);
  }

  @Patch('me')
  async updateOwnProfile(
    @Req() request: Request,
    @Body() updateOrganizerProfileDto: UpdateOrganizerProfileDto,
  ) {
    const currentUser = await this.authService.getAuthenticatedUser(request);

    return this.organizersService.updateOwnProfile(
      currentUser,
      updateOrganizerProfileDto,
    );
  }

  @Patch(':id')
  async update(
    @Req() request: Request,
    @Param('id') id: string,
    @Body() updateOrganizerDto: UpdateOrganizerDto,
  ) {
    const currentUser = await this.authService.getAuthenticatedUser(request);

    return this.organizersService.update(currentUser, id, updateOrganizerDto);
  }
}
