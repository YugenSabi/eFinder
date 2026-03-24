import { MainLayoutComponent } from '@identity/main-layout';
import { Box } from '@ui/layout';
import { Text } from '@ui/text';
import { ActivityChart } from './components/activity-chart';
import { PopularTagsSection } from './components/popular-tags-section';
import { RecentEventsCarousel } from './components/recent-events-carousel';
import { activitySeries, popularTags, recentEvents } from './model';

export function ActivityComponent() {
  return (
    <MainLayoutComponent>
      <Box as="main" direction="column" width="$full" gap={34} paddingTop={24} paddingBottom={30}>
        <Box direction="column" gap={14}>
          <Text font="headerNav" fontSize={20}>
            Последние события
          </Text>
          <RecentEventsCarousel events={recentEvents} />
        </Box>
        <PopularTagsSection tags={popularTags} />
        <ActivityChart points={activitySeries} />
      </Box>
    </MainLayoutComponent>
  );
}
