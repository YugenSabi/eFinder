import { Box } from '@ui/layout';
import { Text } from '@ui/text';
import type { ActivityEvent } from '../model';

export function ActivityEventCard({ event }: { event: ActivityEvent }) {
  return (
    <Box direction="column" gap={8} width="$full">
      <Box width="$full" height={120} borderRadius={16} backgroundColor="cardBg" overflow="hidden">
        {event.imageUrl ? (
          <img
            src={event.imageUrl}
            alt={event.title}
            style={{ width: '100%', height: '100%', objectFit: 'cover' }}
          />
        ) : null}
      </Box>

      <Text font="headerNav" fontSize={14}>
        {event.title}
      </Text>

      <Box gap={6} style={{ flexWrap: 'wrap' }}>
        {event.tags.map((tag) => (
          <Box
            key={tag}
            height={15}
            paddingLeft={10}
            paddingRight={10}
            borderRadius={20}
            justifyContent="center"
            alignItems="center"
            style={{ backgroundColor: '#A5A5A5' }}
          >
            <Text font="headerNav" fontSize={7} color="surface">
              {tag}
            </Text>
          </Box>
        ))}
      </Box>
    </Box>
  );
}
