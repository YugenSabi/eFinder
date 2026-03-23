import { Injectable } from '@nestjs/common';

@Injectable()
export class ActivityDashboardService {
  getFeed() {
    return { items: [] };
  }

  getTrends() {
    return { points: [] };
  }

  getPopularTags() {
    return { tags: [] };
  }
}
