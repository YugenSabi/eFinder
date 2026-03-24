'use client';

import { useRouter } from 'next/navigation';
import { Button } from '@ui/button';
import { Box } from '@ui/layout';
import { Text } from '@ui/text';
import type { OrganizationProfileView } from '../types';

type OrganizationEventsSectionProps = Pick<OrganizationProfileView, 'events'>;

export function OrganizationEventsSectionComponent({
  events,
}: OrganizationEventsSectionProps) {
  const router = useRouter();

  return (
    <Box direction="column" gap={12} padding={24} surface="card">
      <Text as="h2" font="headerNav" fontSize={24}>
        Все мероприятия
      </Text>
      {events.length > 0 ? (
        events.map((event) => (
          <Box
            key={event.id}
            gap={14}
            padding={16}
            borderRadius={20}
            backgroundColor="background"
            alignItems="center"
          >
            <Box
              width={96}
              minWidth={96}
              height={96}
              borderRadius={16}
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
                <Text font="headerNav" fontSize={14}>
                  {event.title}
                </Text>
              )}
            </Box>
            <Box direction="column" gap={6} flexGrow={1}>
              <Text as="span" font="headerNav" fontSize={18}>
                {event.title}
              </Text>
              <Text as="span" color="secondaryText">
                {(event.city ?? 'Онлайн')} · {new Date(event.startsAt).toLocaleDateString('ru-RU')}
              </Text>
            </Box>
            <Button
              label="Открыть"
              variant="secondary"
              font="headerNav"
              onClick={() => router.push(`/events/${event.id}`)}
            />
          </Box>
        ))
      ) : (
        <Text as="span">Мероприятий пока нет</Text>
      )}
    </Box>
  );
}
