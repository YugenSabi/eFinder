'use client';

import { useTranslations } from 'next-intl';
import { Box } from '@ui/layout';
import { Text } from '@ui/text';
import type { ObserverParticipant } from '../types';
import { ObserverParticipantCard } from './card';

type ObserverParticipantsListComponentProps = {
  participants: ObserverParticipant[];
  favoriteActionId: string | null;
  onToggleFavorite: (participant: ObserverParticipant) => void;
};

export function ObserverParticipantsListComponent({
  participants,
  favoriteActionId,
  onToggleFavorite,
}: ObserverParticipantsListComponentProps) {
  const t = useTranslations('Observer');

  if (participants.length === 0) {
    return (
      <Text as="span" color="secondaryText">
        {t('empty')}
      </Text>
    );
  }

  return (
    <Box direction="column" gap={12}>
      {participants.map((participant) => (
        <ObserverParticipantCard
          key={participant.id}
          participant={participant}
          loading={favoriteActionId === participant.id}
          onToggleFavorite={onToggleFavorite}
        />
      ))}
    </Box>
  );
}
