'use client';

import { useEffect, useMemo, useState } from 'react';
import { Box } from '@ui/layout';
import { Text } from '@ui/text';
import { MainLayoutComponent } from '@identity/main-layout';
import { CardComponent, type EventCardModel } from './card/component';
import { getEvents, type EventApiItem } from './api';
import { EventsSearchComponent } from './search/component';

export function EventsComponent() {
  const [searchQuery, setSearchQuery] = useState('');
  const [events, setEvents] = useState<EventApiItem[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    getEvents()
      .then(setEvents)
      .finally(() => setLoading(false));
  }, []);

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

  const normalizedQuery = searchQuery.trim().toLowerCase();
  const filteredEvents = eventCards.filter((event) => {
    if (!normalizedQuery) return true;

    return [event.title, event.description, ...event.tags]
      .join(' ')
      .toLowerCase()
      .includes(normalizedQuery);
  });

  return (
    <MainLayoutComponent>
      <Box as="main" direction="column" width="$full" gap={18} paddingTop={18} paddingBottom={36}>
        <EventsSearchComponent value={searchQuery} onChange={setSearchQuery} />
        {loading ? <Text as="span">Загружаем мероприятия...</Text> : null}

        <Box
          width="$full"
          display="grid"
          style={{
            gridTemplateColumns: 'repeat(3, minmax(0, 1fr))',
            columnGap: '10px',
            rowGap: '10px',
          }}
        >
          {filteredEvents.map((event) => (
            <Box key={event.id} width="$full">
              <CardComponent event={event} />
            </Box>
          ))}
        </Box>
      </Box>
    </MainLayoutComponent>
  );
}
