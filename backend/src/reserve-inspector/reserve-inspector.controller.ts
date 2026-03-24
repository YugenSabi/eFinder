import {
  Controller,
  Get,
  Delete,
  Param,
  Post,
  Query,
  Req,
  Res,
} from '@nestjs/common';
import type { Request, Response } from 'express';
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

  @Get('participants/:participantId/report')
  async downloadParticipantReport(
    @Req() request: Request,
    @Res() response: Response,
    @Param('participantId') participantId: string,
  ) {
    const currentUser = await this.authService.getAuthenticatedUser(request);
    const report = await this.reserveInspectorService.buildParticipantReportPdf(
      currentUser,
      participantId,
    );

    response.status(200);
    response.setHeader('Content-Type', 'application/pdf');
    response.setHeader('Content-Length', String(report.buffer.length));
    response.setHeader(
      'Content-Disposition',
      `attachment; filename="${report.fileName}"`,
    );
    response.end(report.buffer);
  }
}
