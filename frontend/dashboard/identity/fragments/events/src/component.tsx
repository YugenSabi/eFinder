'use client';

import { useState } from 'react';
import { Box } from '@ui/layout';
import { MainLayoutComponent } from '@identity/main-layout';
import { CardComponent, type EventCardModel } from './card/component';
import { EventsSearchComponent } from './search/component';

const mockEvents: EventCardModel[] = Array.from({ length: 9 }, (_, index) => ({
  id: `event-${index + 1}`,
  title: 'Название мероприятия',
  description:
    'Описание мероприятия как заглушка для будущего бекенда. Здесь будет короткая выжимка о событии, формате участия и причинах обратить на него внимание.',
  tags: ['Тверь', '18 февраля', 'IT', 'AI'],
  imageLabel: 'Image',
}));

export function EventsComponent() {
  const [searchQuery, setSearchQuery] = useState('');

  const normalizedQuery = searchQuery.trim().toLowerCase();
  const filteredEvents = mockEvents.filter((event) => {
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
