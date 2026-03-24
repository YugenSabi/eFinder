'use client';

import { useTranslations } from 'next-intl';
import { Button } from '@ui/button';
import { Box } from '@ui/layout';
import { Text } from '@ui/text';
import type { ObserverParticipant } from '../types';

function formatName(
  firstName?: string | null,
  lastName?: string | null,
  email?: string,
) {
  const fullName = [firstName, lastName].filter(Boolean).join(' ').trim();

  return fullName || email || 'Участник';
}

type ObserverParticipantCardProps = {
  participant: ObserverParticipant;
  loading: boolean;
  onToggleFavorite: (participant: ObserverParticipant) => void;
};

export function ObserverParticipantCard({
  participant,
  loading,
  onToggleFavorite,
}: ObserverParticipantCardProps) {
  const t = useTranslations('Observer');

  return (
    <Box key={participant.id} direction="column" gap={8} padding={18} surface="card">
      <Text as="span" font="headerNav" fontSize={20}>
        {formatName(
          participant.firstName,
          participant.lastName,
          participant.email,
        )}
      </Text>
      <Text as="span" color="secondaryText">
        {participant.email}
      </Text>
      <Text as="span" color="secondaryText">
        {t('card.city')}: {participant.city ?? t('card.noValue')}
      </Text>
      <Text as="span" color="secondaryText">
        {t('card.age')}: {participant.age ?? t('card.noValue')}
      </Text>
      <Text as="span" color="secondaryText">
        {t('card.eventsCount')}: {participant.eventsCount}
      </Text>
      <Text as="span" color="secondaryText">
        {t('card.averageScore')}: {participant.averageScore.toFixed(1)}
      </Text>
      <Text as="span" color="secondaryText">
        {t('card.totalScore')}: {participant.totalScore}
      </Text>
      <Button
        label={
          loading
            ? t('card.updatingFavorite')
            : participant.isFavorite
              ? t('card.removeFavorite')
              : t('card.addFavorite')
        }
        variant={participant.isFavorite ? 'primary' : 'secondary'}
        font="headerNav"
        disabled={loading}
        onClick={() => onToggleFavorite(participant)}
      />
    </Box>
  );
}
