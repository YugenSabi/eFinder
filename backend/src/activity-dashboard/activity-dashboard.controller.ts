import { Controller, Get } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { ActivityDashboardService } from './activity-dashboard.service';

@ApiTags('activity-dashboard')
@Controller('activity-dashboard')
export class ActivityDashboardController {
  constructor(
    private readonly activityDashboardService: ActivityDashboardService,
  ) {}

  @Get('feed')
  getFeed() {
    return this.activityDashboardService.getFeed();
  }

  @Get('trends')
  getTrends() {
    return this.activityDashboardService.getTrends();
  }

  @Get('tags')
  getTags() {
    return this.activityDashboardService.getPopularTags();
  }
}
