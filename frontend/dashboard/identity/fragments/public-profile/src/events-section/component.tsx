'use client';

import {useRouter} from 'next/navigation';
import {Button} from '@ui/button';
import {Box} from '@ui/layout';
import {Text} from '@ui/text';
import type {PublicProfileView} from '../types';

type PublicProfileEventsSectionProps = Pick<
  PublicProfileView['user'],
  'participations'
>;

export function PublicProfileEventsSectionComponent({
  participations,
}: PublicProfileEventsSectionProps) {
  const router = useRouter();

  return (
    <Box
      direction="column"
      gap={12}
      padding={18}
      borderRadius={24}
      backgroundColor="cardBg"
      style={{boxShadow: '-3px 3px 3px rgba(0, 0, 0, 0.25)'}}
    >
      <Text font="headerNav" fontSize={28}>
        Последние мероприятия
      </Text>

      {participations.length > 0 ? (
        <Box direction="column" gap={10}>
          {participations.map((item) => (
            <Box
              key={item.id}
              alignItems="center"
              justifyContent="space-between"
              gap={12}
              padding={12}
              borderRadius={16}
              backgroundColor="background"
            >
              <Box direction="column" gap={4}>
                <Text font="headerNav" fontSize={16}>
                  {item.event.title}
                </Text>
                <Text font="footerText" fontSize={13} color="secondaryText">
                  {item.event.city ?? 'Город не указан'}
                </Text>
              </Box>
              <Button
                label="Подробнее"
                variant="secondary"
                font="headerNav"
                onClick={() => router.push(`/events/${item.event.id}`)}
              />
            </Box>
          ))}
        </Box>
      ) : (
        <Text font="footerText" fontSize={15}>
          Пока нет мероприятий
        </Text>
      )}
    </Box>
  );
}
