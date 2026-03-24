import { Module } from '@nestjs/common';
import { ActivityDashboardService } from './activity-dashboard.service';
import { ActivityDashboardController } from './activity-dashboard.controller';

@Module({
  providers: [ActivityDashboardService],
  controllers: [ActivityDashboardController],
})
export class ActivityDashboardModule {}
