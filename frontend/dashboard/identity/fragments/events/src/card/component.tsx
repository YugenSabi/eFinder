import { Box } from '@ui/layout';
import { Text } from '@ui/text';
import { EventCardButton } from './button';
import { EventCardTags } from './tags';

export type EventCardModel = {
  id: string;
  title: string;
  description: string;
  tags: string[];
  imageLabel?: string;
  imageUrl?: string;
};

type CardComponentProps = {
  event: EventCardModel;
};

export function CardComponent({ event }: CardComponentProps) {
  return (
    <Box gap={10} alignItems="flex-start" style={{ flexWrap: 'nowrap' }}>
      <Box
        width={220}
        minWidth={220}
        height={220}
        borderRadius={20}
        backgroundColor="cardBg"
        justifyContent="center"
        alignItems="center"
        overflow="hidden"
        style={{ flex: '0 0 164px' }}
      >
        {event.imageUrl ? (
          <img
            src={event.imageUrl}
            alt={event.title}
            style={{ width: '100%', height: '100%', objectFit: 'cover' }}
          />
        ) : (
          <Text font="headerNav" fontSize={22} color="secondaryText">
            {event.imageLabel ?? 'Image'}
          </Text>
        )}
      </Box>

      <Box direction="column" gap={8} style={{ flex: '1 1 auto', minWidth: 0 }}>
        <Text font="headerNav" fontSize={18}>
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

        <EventCardTags tags={event.tags} />

        <EventCardButton />
      </Box>
    </Box>
  );
}
