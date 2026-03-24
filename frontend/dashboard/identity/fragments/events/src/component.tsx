'use client';

import {useEffect, useMemo, useState} from 'react';
import {Box} from '@ui/layout';
import {Text} from '@ui/text';
import {MainLayoutComponent} from '@identity/main-layout';
import {CardComponent, type EventCardModel} from './card/component';
import {getEvents, type EventApiItem} from './api';
import {EventsSearchComponent} from './search/component';

export function EventsComponent() {
  const [searchQuery, setSearchQuery] = useState('');
  const [events, setEvents] = useState<EventApiItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [pageError, setPageError] = useState<string | null>(null);

  useEffect(() => {
    let cancelled = false;

    const timeoutId = window.setTimeout(async () => {
      try {
        setLoading(true);
        setPageError(null);

        const nextEvents = await getEvents(searchQuery);

        if (!cancelled) {
          setEvents(nextEvents);
        }
      } catch (error) {
        if (!cancelled) {
          setEvents([]);
          setPageError(
            error instanceof Error ? error.message : 'Не удалось загрузить мероприятия',
          );
        }
      } finally {
        if (!cancelled) {
          setLoading(false);
        }
      }
    }, 250);

    return () => {
      cancelled = true;
      window.clearTimeout(timeoutId);
    };
  }, [searchQuery]);

  const eventCards = useMemo<EventCardModel[]>(
    () =>
      events.map((event) => ({
        id: event.id,
        title: event.title,
        description: event.description,
        tags: [
          event.city ?? 'Онлайн',
          new Date(event.startsAt).toLocaleDateString('ru-RU'),
          event.direction,
          event.difficulty,
        ],
        imageLabel: event.organizer.organizerProfile?.organizationName ?? 'Event',
        imageUrl: event.imageUrl ?? undefined,
      })),
    [events],
  );

  return (
    <MainLayoutComponent>
      <Box as="main" direction="column" width="$full" gap={18} paddingTop={18} paddingBottom={36}>
        <EventsSearchComponent value={searchQuery} onChange={setSearchQuery} />

        {pageError ? <Text color="danger">{pageError}</Text> : null}
        {loading ? <Text>Загружаем мероприятия...</Text> : null}
        {!loading && !pageError && eventCards.length === 0 ? <Text>Ничего не найдено</Text> : null}

        <Box
          width="$full"
          display="grid"
          style={{
            gridTemplateColumns: 'repeat(3, minmax(0, 1fr))',
            columnGap: '10px',
            rowGap: '10px',
          }}
        >
          {eventCards.map((event) => (
            <Box key={event.id} width="$full">
              <CardComponent event={event} />
            </Box>
          ))}
        </Box>
      </Box>
    </MainLayoutComponent>
  );
}
