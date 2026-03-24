import { Box } from '@ui/layout';
import { Text } from '@ui/text';
import type { OrganizerEvent } from '../model';
import { OrganizerRecentEventCard } from './event-card';

export function OrganizerRecentEventsSection({ events }: { events: OrganizerEvent[] }) {
  return (
    <Box direction="column" gap={12} style={{ flex: '1 1 520px', minWidth: 380 }}>
      <Box justifyContent="center" alignItems="center">
        <Text font="headerNav" fontSize={32}>
          Последние мероприятия
        </Text>
      </Box>
      <Box
        direction="column"
        gap={14}
        padding={10}
        borderRadius={18}
        backgroundColor="cardBg"
        overflow="auto"
        style={{
          boxShadow: '-3px 3px 3px rgba(0, 0, 0, 0.25)',
          maxHeight: events.length > 2 ? 410 : undefined,
        }}
      >
        {events.map((event) => (
          <OrganizerRecentEventCard key={event.id} event={event} />
        ))}
      </Box>
    </Box>
  );
}
