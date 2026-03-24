import { Module } from '@nestjs/common';
import { PrismaModule } from '../prisma/prisma.module';
import { ParticipantsService } from './participants.service';
import { ParticipantsController } from './participants.controller';

@Module({
  imports: [PrismaModule],
  controllers: [ParticipantsController],
  providers: [ParticipantsService],
})
export class ParticipantsModule {}
