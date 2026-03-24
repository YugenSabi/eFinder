import {Button} from '@ui/button';
import {Box} from '@ui/layout';
import {Text} from '@ui/text';
import type {EventDetailsView} from '../types';

type EventHeroSectionProps = {
  event: EventDetailsView['event'];
  myStatus: string | null;
  isOwner: boolean;
  message: string | null;
  registering: boolean;
  onRegister: () => void | Promise<void>;
};

function formatDate(value: string) {
  return new Intl.DateTimeFormat('ru-RU', {
    day: '2-digit',
    month: '2-digit',
    year: 'numeric',
    hour: '2-digit',
    minute: '2-digit',
    timeZone: 'Europe/Moscow',
  }).format(new Date(value));
}

function formatParticipationStatus(status: string) {
  switch (status) {
    case 'REGISTERED':
      return 'Отправлена';
    case 'VERIFIED':
      return 'Подтверждена';
    case 'REJECTED':
      return 'Отклонена';
    default:
      return status;
  }
}

function MetaChip({label}: {label: string}) {
  return (
    <Box
      paddingLeft={12}
      paddingRight={12}
      height={28}
      borderRadius={999}
      backgroundColor="cardBg"
      alignItems="center"
      justifyContent="center"
      style={{boxShadow: '-2px 2px 3px rgba(0, 0, 0, 0.12)'}}
    >
      <Text font="headerNav" fontSize={10}>
        {label}
      </Text>
    </Box>
  );
}

export function EventHeroSectionComponent({
  event,
  myStatus,
  isOwner,
  message,
  registering,
  onRegister,
}: EventHeroSectionProps) {
  const chips = [
    event.city ?? 'Онлайн',
    formatDate(event.startsAt),
    event.direction,
    event.difficulty,
  ];

  return (
    <Box
      width="$full"
      padding={20}
      borderRadius={28}
      backgroundColor="background"
      alignItems="stretch"
      gap={20}
      style={{boxShadow: '-3px 3px 6px rgba(0, 0, 0, 0.18)'}}
    >
      <Box
        width={320}
        minWidth={280}
        height={320}
        borderRadius={28}
        backgroundColor="cardBg"
        overflow="hidden"
        justifyContent="center"
        alignItems="center"
        style={{border: '1px solid #1E1B18'}}
      >
        {event.imageUrl ? (
          <img
            src={event.imageUrl}
            alt={event.title}
            style={{width: '100%', height: '100%', objectFit: 'cover'}}
          />
        ) : (
          <Box paddingLeft={20} paddingRight={20} alignItems="center">
            <Text font="headerNav" fontSize={28}>
              {event.title}
            </Text>
          </Box>
        )}
      </Box>

      <Box direction="column" gap={14} flexGrow={1} style={{minWidth: 0}}>
        <Text font="headerNav" fontSize={34}>
          {event.title}
        </Text>

        <Text font="footerText" fontSize={15} style={{lineHeight: 1.45}}>
          {event.description}
        </Text>

        <Box gap={8} wrap="wrap">
          {chips.map((chip) => (
            <MetaChip key={chip} label={chip} />
          ))}
        </Box>

        <Box direction="column" gap={6}>
          <Text font="headerNav" fontSize={14}>
            Уже зарегистрировались: {event.participations.length}
          </Text>
          {myStatus ? (
            <Text font="headerNav" fontSize={14}>
              Статус вашей заявки: {formatParticipationStatus(myStatus)}
            </Text>
          ) : null}
        </Box>

        <Box direction="column" gap={8} alignItems="flex-start">
          <Button
            label={
              registering
                ? 'Отправляем заявку...'
                : isOwner
                  ? 'Нельзя зарегистрироваться на своё мероприятие'
                : myStatus
                  ? 'Вы уже зарегистрированы'
                  : 'Зарегистрироваться'
            }
            bg="contrastColor"
            font="headerNav"
            disabled={registering || Boolean(myStatus) || isOwner}
            onClick={onRegister}
          />
          {message ? (
            <Text color="danger" font="headerNav" fontSize={14}>
              {message}
            </Text>
          ) : null}
        </Box>
      </Box>
    </Box>
  );
}
