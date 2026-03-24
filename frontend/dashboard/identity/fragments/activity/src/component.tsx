import {MainLayoutComponent} from '@identity/main-layout';
import {Box} from '@ui/layout';
import {Text} from '@ui/text';
import {ActivityChart} from './activity-chart';
import {PopularTagsSection} from './popular-tags-section';
import {RecentEventsCarousel} from './recent-events-carousel';
import type {ActivityEvent, ActivityPoint} from './model';

const API_URL = process.env.NEXT_PUBLIC_API_URL ?? 'http://localhost:4000';

type BackendEvent = {
  id: string;
  title: string;
  city?: string | null;
  direction: string;
  startsAt: string;
  imageUrl?: string | null;
};

function formatEventDate(value: string) {
  return new Intl.DateTimeFormat('ru-RU', {
    day: '2-digit',
    month: '2-digit',
    year: 'numeric',
    timeZone: 'Europe/Moscow',
  }).format(new Date(value));
}

function startOfWeek(date: Date) {
  const result = new Date(date);
  const day = result.getDay();
  const diff = day === 0 ? -6 : 1 - day;
  result.setDate(result.getDate() + diff);
  result.setHours(0, 0, 0, 0);
  return result;
}

function buildRecentEvents(events: BackendEvent[]): ActivityEvent[] {
  return events.slice(0, 8).map((event) => ({
    id: event.id,
    title: event.title,
    imageUrl: event.imageUrl ?? undefined,
    occurredAt: event.startsAt,
    tags: [
      event.city || 'Онлайн',
      formatEventDate(event.startsAt),
      event.direction,
    ],
  }));
}

function buildPopularTags(events: BackendEvent[]): string[] {
  const counts = new Map<string, number>();

  for (const event of events) {
    const tags = [event.direction, event.city || 'Онлайн'];

    for (const tag of tags) {
      counts.set(tag, (counts.get(tag) ?? 0) + 1);
    }
  }

  return [...counts.entries()]
    .sort((left, right) => right[1] - left[1])
    .slice(0, 6)
    .map(([tag]) => tag);
}

function buildActivitySeries(events: BackendEvent[]): ActivityPoint[] {
  const formatter = new Intl.DateTimeFormat('ru-RU', {
    day: 'numeric',
    month: 'short',
    timeZone: 'Europe/Moscow',
  });
  const weeks: Date[] = [];
  const firstWeekStart = new Date('2026-03-23T00:00:00+03:00');

  for (let index = 0; index < 8; index += 1) {
    const weekStart = new Date(firstWeekStart);
    weekStart.setDate(firstWeekStart.getDate() + index * 7);
    weeks.push(weekStart);
  }

  return weeks.map((weekStart) => {
    const nextWeek = new Date(weekStart);
    nextWeek.setDate(weekStart.getDate() + 7);

    const value = events.filter((event) => {
      const startsAt = new Date(event.startsAt);
      return startsAt >= weekStart && startsAt < nextWeek;
    }).length;

    return {
      label: formatter.format(weekStart),
      value,
    };
  });
}

async function getEvents(): Promise<BackendEvent[]> {
  const response = await fetch(`${API_URL}/events`, {
    cache: 'no-store',
  });

  if (!response.ok) {
    return [];
  }

  return (await response.json().catch(() => [])) as BackendEvent[];
}

export async function ActivityComponent() {
  const events = await getEvents();
  const recentEvents = buildRecentEvents(events);
  const popularTags = buildPopularTags(events);
  const activitySeries = buildActivitySeries(events);

  return (
    <MainLayoutComponent>
      <Box
        as="main"
        direction="column"
        width="$full"
        gap={34}
        paddingTop={24}
        paddingBottom={30}
      >
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
