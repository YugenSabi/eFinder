import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Req,
} from '@nestjs/common';
import {ApiTags} from '@nestjs/swagger';
import type {Request} from 'express';
import {AuthService} from '../auth/auth.service';
import { EventsService } from './events.service';
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

  @Get()
  findAll() {
    return this.eventsService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.eventsService.findOne(id);
  }
}
