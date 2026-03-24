'use client';

import { useMemo, useState } from 'react';
import { Box } from '@ui/layout';
import { Text } from '@ui/text';
import type { ActivityEvent } from '../model';
import { ActivityEventCard } from '../activity-event-card';

const PAGE_SIZE = 4;

export function RecentEventsCarousel({ events }: { events: ActivityEvent[] }) {
  const sortedEvents = useMemo(
    () => [...events].sort((a, b) => new Date(b.occurredAt).getTime() - new Date(a.occurredAt).getTime()),
    [events],
  );
  const maxIndex = Math.max(0, sortedEvents.length - PAGE_SIZE);
  const [startIndex, setStartIndex] = useState(0);

  return (
    <Box width="$full" alignItems="center" gap={10}>
      <Box
        width={40}
        height={40}
        border="1.5px solid #0C0310"
        borderRadius={20}
        justifyContent="center"
        alignItems="center"
        cursor={startIndex === 0 ? 'default' : 'pointer'}
        opacity={startIndex === 0 ? 0.45 : 1}
        style={{ flexShrink: 0 }}
        onClick={() => {
          if (startIndex > 0) setStartIndex((value) => value - 1);
        }}
      >
        <Text font="headerNav" fontSize={15}>
          {'<'}
        </Text>
      </Box>

      <Box width="$full" overflow="hidden">
        <Box
          width="$full"
          style={{
            display: 'grid',
            gridAutoFlow: 'column',
            gridAutoColumns: 'calc((100% - 24px) / 4)',
            columnGap: '8px',
            transform: `translateX(calc(${startIndex} * -1 * (((100% - 24px) / 4) + 8px)))`,
            transition: 'transform 320ms ease',
            willChange: 'transform',
          }}
        >
          {sortedEvents.map((event) => (
            <ActivityEventCard key={event.id} event={event} />
          ))}
        </Box>
      </Box>

      <Box
        width={40}
        height={40}
        border="1.5px solid #0C0310"
        borderRadius={20}
        justifyContent="center"
        alignItems="center"
        cursor={startIndex >= maxIndex ? 'default' : 'pointer'}
        opacity={startIndex >= maxIndex ? 0.45 : 1}
        style={{ flexShrink: 0 }}
        onClick={() => {
          if (startIndex < maxIndex) setStartIndex((value) => value + 1);
        }}
      >
        <Text font="headerNav" fontSize={12}>
          {'>'}
        </Text>
      </Box>
    </Box>
  );
}
