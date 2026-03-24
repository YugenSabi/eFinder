'use client';

import {useRouter} from 'next/navigation';
import {Box} from '@ui/layout';
import {Text} from '@ui/text';
import type {OrganizationProfileView} from '../types';

type OrganizationEventsSectionProps = Pick<OrganizationProfileView, 'events'>;

export function OrganizationEventsSectionComponent({
  events,
}: OrganizationEventsSectionProps) {
  const router = useRouter();

  return (
    <Box
      direction="column"
      gap={14}
      padding={16}
      borderRadius={24}
      backgroundColor="cardBg"
      style={{flex: '1 1 520px', minWidth: 360, boxShadow: '-3px 3px 3px rgba(0, 0, 0, 0.25)'}}
    >
      <Text font="headerNav" fontSize={24} style={{textAlign: 'center'}}>
        Последние мероприятия
      </Text>
      {events.length > 0 ? (
        events.map((event) => (
          <Box
            key={event.id}
            gap={14}
            padding={14}
            borderRadius={18}
            backgroundColor="background"
            alignItems="stretch"
          >
            <Box
              width={148}
              minWidth={148}
              height={148}
              borderRadius={18}
              backgroundColor="cardBg"
              overflow="hidden"
              justifyContent="center"
              alignItems="center"
            >
              {event.imageUrl ? (
                <img
                  src={event.imageUrl}
                  alt={event.title}
                  style={{width: '100%', height: '100%', objectFit: 'cover'}}
                />
              ) : (
                <Text font="headerNav" fontSize={16}>
                  eFinder
                </Text>
              )}
            </Box>
            <Box direction="column" gap={8} flexGrow={1} style={{minWidth: 0}}>
              <Text font="headerNav" fontSize={18}>
                {event.title}
              </Text>
              <Text font="footerText" fontSize={13}>
                {(event.city ?? 'Онлайн')} • {new Date(event.startsAt).toLocaleDateString('ru-RU')}
              </Text>
              <Box alignItems="flex-start">
                <Box
                  as="button"
                  type="button"
                  onClick={() => router.push(`/events/${event.id}`)}
                  height={28}
                  borderRadius={12}
                  backgroundColor="contrastColor"
                  justifyContent="center"
                  alignItems="center"
                  style={{border: 'none', cursor: 'pointer', padding: '0 10px'}}
                >
                  <Text font="headerNav" fontSize={10} color="surface">
                    Подробнее
                  </Text>
                </Box>
              </Box>
            </Box>
          </Box>
        ))
      ) : (
        <Box
          padding={18}
          borderRadius={16}
          backgroundColor="background"
          justifyContent="center"
          alignItems="center"
        >
          <Text font="footerText" fontSize={14}>
            Мероприятий пока нет
          </Text>
        </Box>
      )}
    </Box>
  );
}
