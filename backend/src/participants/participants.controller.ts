import {
  Controller,
  Get,
  Param,
  Query,
} from '@nestjs/common';
import { ParticipantsService } from './participants.service';

@Controller('participants')
export class ParticipantsController {
  constructor(private readonly participantsService: ParticipantsService) {}

  @Get()
  findAll(@Query('search') search?: string) {
    return this.participantsService.findAll(search);
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.participantsService.findOne(id);
  }
}
