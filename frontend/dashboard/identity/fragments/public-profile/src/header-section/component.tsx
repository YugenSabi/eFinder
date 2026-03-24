'use client';

import { Box } from '@ui/layout';
import { Text } from '@ui/text';
import type { PublicProfileView } from '../types';

type PublicProfileHeaderSectionProps = PublicProfileView;

export function PublicProfileHeaderSectionComponent({
  user,
}: PublicProfileHeaderSectionProps) {
  const fullName =
    [user.firstName, user.lastName].filter(Boolean).join(' ').trim() || user.email;

  return (
    <Box gap={20} wrap="wrap">
      <Box
        width={220}
        height={220}
        borderRadius={24}
        backgroundColor="cardBg"
        overflow="hidden"
        justifyContent="center"
        alignItems="center"
      >
        {user.avatarUrl ? (
          <img
            src={user.avatarUrl}
            alt={fullName}
            style={{ width: '100%', height: '100%', objectFit: 'cover' }}
          />
        ) : (
          <Text font="headerNav" fontSize={44}>
            {fullName[0]}
          </Text>
        )}
      </Box>
      <Box direction="column" gap={8}>
        <Text as="h1" font="headerNav" fontSize={36}>
          {fullName}
        </Text>
        <Text as="span">{user.headline || 'Без описания'}</Text>
        <Text as="span">{user.city || 'Город не указан'}</Text>
        <Text as="span">Баллы: {user.participantProfile?.totalScore ?? 0}</Text>
        <Text as="span">
          Место в рейтинге: {user.participantProfile?.currentRank ?? 'Нет данных'}
        </Text>
      </Box>
    </Box>
  );
}
