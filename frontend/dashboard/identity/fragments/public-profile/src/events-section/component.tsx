'use client';

import { useRouter } from 'next/navigation';
import { Button } from '@ui/button';
import { Box } from '@ui/layout';
import { Text } from '@ui/text';
import type { PublicProfileView } from '../types';

type PublicProfileEventsSectionProps = Pick<PublicProfileView['user'], 'participations'>;

export function PublicProfileEventsSectionComponent({
  participations,
}: PublicProfileEventsSectionProps) {
  const router = useRouter();

  return (
    <Box direction="column" gap={12} padding={24} surface="card">
      <Text as="h2" font="headerNav" fontSize={24}>
        Мероприятия
      </Text>
      {participations.length > 0 ? (
        participations.map((item) => (
          <Box
            key={item.id}
            justifyContent="space-between"
            alignItems="center"
            gap={12}
            padding={12}
            borderRadius={16}
            backgroundColor="background"
          >
            <Text as="span">{item.event.title}</Text>
            <Button
              label="Открыть"
              variant="secondary"
              font="headerNav"
              onClick={() => router.push(`/events/${item.event.id}`)}
            />
          </Box>
        ))
      ) : (
        <Text as="span">Пока нет мероприятий</Text>
      )}
    </Box>
  );
}
