import { Module } from '@nestjs/common';
import { ReserveInspectorService } from './reserve-inspector.service';
import { ReserveInspectorController } from './reserve-inspector.controller';

@Module({
  controllers: [ReserveInspectorController],
  providers: [ReserveInspectorService],
})
export class ReserveInspectorModule {}
