import {
  Controller,
  Get,
  Patch,
  Param,
  Body,
  Req,
} from '@nestjs/common';
import {ApiTags} from '@nestjs/swagger';
import type {Request} from 'express';
import {AuthService} from '../auth/auth.service';
import { OrganizersService } from './organizers.service';
import { UpdateOrganizerDto } from './dto/update-organizer.dto';

@ApiTags('organizers')
@Controller('organizers')
export class OrganizersController {
  constructor(
    private readonly organizersService: OrganizersService,
    private readonly authService: AuthService,
  ) {}

  @Get('candidates')
  async findAll(@Req() request: Request) {
    const currentUser = await this.authService.getAuthenticatedUser(request);

    return this.organizersService.findAll(currentUser);
  }

  @Get('approved')
  async findApproved(@Req() request: Request) {
    const currentUser = await this.authService.getAuthenticatedUser(request);

    return this.organizersService.findApproved(currentUser);
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
