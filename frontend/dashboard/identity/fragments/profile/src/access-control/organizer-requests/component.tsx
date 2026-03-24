'use client';

import { useState } from 'react';
import { useTranslations } from 'next-intl';
import { Button } from '@ui/button';
import { Box } from '@ui/layout';
import { Text } from '@ui/text';
import type { AdminUser } from '../types';

type OrganizerRequestsSectionProps = {
  users: AdminUser[];
  onReview: (userId: string, status: string) => Promise<void>;
  onError: (message: string | null) => void;
};

export function OrganizerRequestsSectionComponent({
  users,
  onReview,
  onError,
}: OrganizerRequestsSectionProps) {
  const t = useTranslations('Admin.organizerRequests');
  const [updatingUserId, setUpdatingUserId] = useState<string | null>(null);

  return (
    <Box
      direction="column"
      gap={16}
      padding={20}
      borderRadius={24}
      backgroundColor="cardBg"
      style={{ flex: '1 1 420px', minWidth: 360, boxShadow: '-3px 3px 3px rgba(0, 0, 0, 0.25)' }}
    >
      <Text font="headerNav" fontSize={26}>
        {t('title')}
      </Text>

      {users.length === 0 ? (
        <Text font="footerText" fontSize={15}>
          {t('empty')}
        </Text>
      ) : (
        <Box direction="column" gap={12}>
          {users.map((user) => (
            <Box
              key={user.id}
              direction="column"
              gap={10}
              padding={14}
              borderRadius={18}
              backgroundColor="background"
            >
              <Text font="headerNav" fontSize={18}>
                {user.organizerProfile?.organizationName || user.email}
              </Text>
              <Text font="footerText" fontSize={14} color="secondaryText">
                {user.email}
              </Text>
              <Text font="footerText" fontSize={14}>
                Статус заявки: {user.organizerProfile?.status ?? 'PENDING'}
              </Text>
              <Box gap={8} wrap="wrap">
                <Button
                  label={t('approve')}
                  bg="contrastColor"
                  borderColor="contrastColor"
                  font="headerNav"
                  disabled={updatingUserId === user.id}
                  onClick={async () => {
                    setUpdatingUserId(user.id);
                    onError(null);
                    try {
                      await onReview(user.id, 'APPROVED');
                    } catch (error) {
                      onError(error instanceof Error ? error.message : t('error'));
                    } finally {
                      setUpdatingUserId(null);
                    }
                  }}
                />
                <Button
                  label={t('reject')}
                  variant="secondary"
                  font="headerNav"
                  textColor="contrastColor"
                  borderColor="contrastColor"
                  disabled={updatingUserId === user.id}
                  onClick={async () => {
                    setUpdatingUserId(user.id);
                    onError(null);
                    try {
                      await onReview(user.id, 'REJECTED');
                    } catch (error) {
                      onError(error instanceof Error ? error.message : t('error'));
                    } finally {
                      setUpdatingUserId(null);
                    }
                  }}
                />
              </Box>
            </Box>
          ))}
        </Box>
      )}
    </Box>
  );
}
