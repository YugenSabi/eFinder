import { useRouter } from 'next/navigation';
import { Button } from '@ui/button';
import { Box } from '@ui/layout';
import { Text } from '@ui/text';
import type { ActivityEvent } from '../model';

export function ActivityEventCard({ event }: { event: ActivityEvent }) {
  const router = useRouter();

  return (
    <Box gap={10} alignItems="flex-start" width="$full" style={{ flexWrap: 'nowrap', boxShadow: '-3px 3px 3px rgba(0, 0, 0, 0.25)' }} backgroundColor={"cardBg"} padding={10} borderRadius={20} marginBottom={5} marginLeft={5}>
      <Box
        width={170}
        minWidth={170}
        height={170}
        borderRadius={20}
        backgroundColor="cardBg"
        justifyContent="center"
        alignItems="center"
        overflow="hidden"
        style={{ flex: '0 0 120px' }}
      >
        {event.imageUrl ? (
          <img
            src={event.imageUrl}
            alt={event.title}
            style={{ width: '100%', height: '100%', objectFit: 'cover' }}
          />
        ) : (
          <Text font="headerNav" fontSize={18} color="secondaryText">
            Image
          </Text>
        )}
      </Box>

      <Box direction="column" gap={8} style={{ flex: '1 1 auto', minWidth: 0 }}>
        <Text font="headerNav" fontSize={16}>
          {event.title}
        </Text>

        <Box gap={6} style={{ flexWrap: 'wrap' }}>
          {event.tags.map((tag) => (
            <Box
              key={tag}
              minWidth={44}
              height={18}
              paddingLeft={10}
              paddingRight={10}
              borderRadius={999}
              justifyContent="center"
              alignItems="center"
              style={{ backgroundColor: '#A5A5A5' }}
            >
              <Text font="headerNav" fontSize={8} color="surface">
                {tag}
              </Text>
            </Box>
          ))}
        </Box>

        <Box style={{ alignSelf: 'flex-start' }}>
            <Button
                label="Подробнее"
                size="md"
                bg="contrastColor"
                textColor="surface"
                font="headerNav"
                fontSize={10}
                style={{height: 25, padding: '10px', borderRadius: '7px'}}
                onClick={() => router.push(`/events/${event.id}`)}
            />
        </Box>
      </Box>
    </Box>
  );
}
