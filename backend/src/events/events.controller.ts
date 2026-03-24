import {
  Patch,
  Controller,
  Get,
  Post,
  Body,
  Param,
  Query,
  Req,
} from '@nestjs/common';
import {ApiTags} from '@nestjs/swagger';
import type {Request} from 'express';
import {AuthService} from '../auth/auth.service';
import { EventsService } from './events.service';
import { CompleteEventDto } from './dto/complete-event.dto';
import { CreateEventDto } from './dto/create-event.dto';

@ApiTags('events')
@Controller('events')
export class EventsController {
  constructor(
    private readonly eventsService: EventsService,
    private readonly authService: AuthService,
  ) {}

  @Post()
  async create(@Req() request: Request, @Body() createEventDto: CreateEventDto) {
    const currentUser = await this.authService.getAuthenticatedUser(request);

    return this.eventsService.create(currentUser, createEventDto);
  }

  @Get('organizer/mine')
  async findMine(@Req() request: Request, @Query('search') search?: string) {
    const currentUser = await this.authService.getAuthenticatedUser(request);

    return this.eventsService.findMine(currentUser, search);
  }

  @Get(':id/participants')
  async findParticipants(@Req() request: Request, @Param('id') id: string) {
    const currentUser = await this.authService.getAuthenticatedUser(request);

    return this.eventsService.findParticipants(currentUser, id);
  }

  @Patch(':id/complete')
  async complete(
    @Req() request: Request,
    @Param('id') id: string,
    @Body() completeEventDto: CompleteEventDto,
  ) {
    const currentUser = await this.authService.getAuthenticatedUser(request);

    return this.eventsService.complete(currentUser, id, completeEventDto);
  }

  @Get()
  findAll(@Query('search') search?: string) {
    return this.eventsService.findAll(search);
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.eventsService.findOne(id);
  }
}
