import { Button } from '@ui/button';
import { Box } from '@ui/layout';
import { Text } from '@ui/text';
import type { EventDetailsView } from '../types';

type EventHeroSectionProps = {
  event: EventDetailsView['event'];
  myStatus: string | null;
  message: string | null;
  registering: boolean;
  onRegister: () => void | Promise<void>;
};

export function EventHeroSectionComponent({
  event,
  myStatus,
  message,
  registering,
  onRegister,
}: EventHeroSectionProps) {
  return (
    <Box gap={20} alignItems="stretch" wrap="wrap">
      <Box
        width={340}
        minWidth={320}
        height={260}
        borderRadius={24}
        backgroundColor="cardBg"
        overflow="hidden"
        justifyContent="center"
        alignItems="center"
      >
        {event.imageUrl ? (
          <img
            src={event.imageUrl}
            alt={event.title}
            style={{ width: '100%', height: '100%', objectFit: 'cover' }}
          />
        ) : (
          <Text font="headerNav" fontSize={24}>
            {event.title}
          </Text>
        )}
      </Box>

      <Box direction="column" gap={12} flexGrow={1}>
        <Text as="h1" font="headerNav" fontSize={36}>
          {event.title}
        </Text>
        <Text as="p">{event.description}</Text>
        <Text as="span">
          {event.city ?? 'Онлайн'} · {new Date(event.startsAt).toLocaleString('ru-RU')}
        </Text>
        <Text as="span">
          {event.direction} · {event.difficulty}
        </Text>
        <Button
          label={
            myStatus
              ? `Статус заявки: ${myStatus}`
              : registering
                ? 'Отправляем заявку...'
                : 'Зарегистрироваться'
          }
          bg="contrastColor"
          font="headerNav"
          disabled={registering || Boolean(myStatus)}
          onClick={onRegister}
        />
        {message ? <Text as="span">{message}</Text> : null}
      </Box>
    </Box>
  );
}
