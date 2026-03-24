import { Button } from '@ui/button';
import { Box } from '@ui/layout';
import { Text } from '@ui/text';
import type { OrganizerEvent } from '../../model';

export function OrganizerRecentEventCard({ event }: { event: OrganizerEvent }) {
  return (
    <Box gap={10} alignItems="flex-start" width="$full" style={{ flexWrap: 'nowrap' }}>
      <Box
        width={187}
        minWidth={187}
        height={187}
        borderRadius={20}
        backgroundColor="cardBg"
      />
      <Box direction="column" gap={8} style={{ flex: '1 1 auto' }}>
        <Text font="headerNav" fontSize={16}>
          {event.title}
        </Text>
        <Box
          style={{
            lineHeight: 1.35,
            display: '-webkit-box',
            WebkitLineClamp: 5,
            WebkitBoxOrient: 'vertical',
            overflow: 'hidden',
          }}
        >
          <Text font="footerText" fontSize={11}>
            {event.description}
          </Text>
        </Box>
        <Box gap={6} style={{ flexWrap: 'wrap' }}>
          {event.tags.map((tag) => (
            <Box
              key={tag}
              minWidth={44}
              height={18}
              paddingLeft={10}
              paddingRight={10}
              justifyContent="center"
              alignItems="center"
              borderRadius={999}
              style={{ backgroundColor: '#A5A5A5' }}
            >
              <Text font="headerNav" fontSize={8} color="surface">
                {tag}
              </Text>
            </Box>
          ))}
        </Box>
        <Button
          label="Подробнее"
          bg="contrastColor"
          textColor="surface"
          font="headerNav"
          fontSize={11}
          style={{
            width: 95,
            height: 25,
            padding: 10,
            borderRadius: 10,
          }}
        />
      </Box>
    </Box>
  );
}
