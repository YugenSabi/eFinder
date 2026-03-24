import {
  Body,
  Controller,
  Get,
  Post,
  Patch,
  Param,
  Req,
} from '@nestjs/common';
import type { Request } from 'express';
import { AuthService } from '../auth/auth.service';
import { ParticipationsService } from './participations.service';
import { CreateParticipationDto } from './dto/create-participation.dto';
import { ReviewParticipationDto } from './dto/review-participation.dto';

@Controller('participations')
export class ParticipationsController {
  constructor(
    private readonly participationsService: ParticipationsService,
    private readonly authService: AuthService,
  ) {}

  @Post()
  async create(
    @Req() request: Request,
    @Body() createParticipationDto: CreateParticipationDto,
  ) {
    const currentUser = await this.authService.getAuthenticatedUser(request);

    return this.participationsService.create(currentUser, createParticipationDto);
  }

  @Get('organizer/pending')
  async findPending(@Req() request: Request) {
    const currentUser = await this.authService.getAuthenticatedUser(request);

    return this.participationsService.findPendingForOrganizer(currentUser);
  }

  @Get('event/:eventId/me')
  async findMyStatus(@Req() request: Request, @Param('eventId') eventId: string) {
    const currentUser = await this.authService.getAuthenticatedUser(request);

    return this.participationsService.findMyStatus(currentUser, eventId);
  }

  @Patch(':id')
  async update(
    @Req() request: Request,
    @Param('id') id: string,
    @Body() reviewParticipationDto: ReviewParticipationDto,
  ) {
    const currentUser = await this.authService.getAuthenticatedUser(request);

    return this.participationsService.update(currentUser, id, reviewParticipationDto);
  }
}
