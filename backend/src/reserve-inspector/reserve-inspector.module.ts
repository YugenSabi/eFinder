import { Module } from '@nestjs/common';
import { AuthModule } from '../auth/auth.module';
import { PrismaModule } from '../prisma/prisma.module';
import { ReserveInspectorService } from './reserve-inspector.service';
import { ReserveInspectorController } from './reserve-inspector.controller';

@Module({
  imports: [AuthModule, PrismaModule],
  controllers: [ReserveInspectorController],
  providers: [ReserveInspectorService],
})
export class ReserveInspectorModule {}
