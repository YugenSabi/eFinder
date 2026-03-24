import {
  Controller,
  Get,
  Delete,
  Param,
  Post,
  Query,
  Req,
} from '@nestjs/common';
import type { Request } from 'express';
import { AuthService } from '../auth/auth.service';
import { ListObserverParticipantsDto } from './dto/list-observer-participants.dto';
import { ReserveInspectorService } from './reserve-inspector.service';

@Controller('reserve-inspector')
export class ReserveInspectorController {
  constructor(
    private readonly reserveInspectorService: ReserveInspectorService,
    private readonly authService: AuthService,
  ) {}

  @Get('participants')
  async listParticipants(
    @Req() request: Request,
    @Query() query: ListObserverParticipantsDto,
  ) {
    const currentUser = await this.authService.getAuthenticatedUser(request);

    return this.reserveInspectorService.listParticipants(currentUser, query);
  }

  @Post('favorites/:participantId')
  async addFavorite(
    @Req() request: Request,
    @Param('participantId') participantId: string,
  ) {
    const currentUser = await this.authService.getAuthenticatedUser(request);

    return this.reserveInspectorService.addFavorite(currentUser, participantId);
  }

  @Delete('favorites/:participantId')
  async removeFavorite(
    @Req() request: Request,
    @Param('participantId') participantId: string,
  ) {
    const currentUser = await this.authService.getAuthenticatedUser(request);

    return this.reserveInspectorService.removeFavorite(currentUser, participantId);
  }
}
