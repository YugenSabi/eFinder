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
    <Box direction="column" gap={16} padding={24} surface="card">
      <Text as="h2" font="headerNav" fontSize={24}>
        {t('title')}
      </Text>
      {users.length === 0 ? (
        <Text as="span">{t('empty')}</Text>
      ) : (
        <Box direction="column" gap={12}>
          {users.map((user) => (
            <Box key={user.id} direction="column" gap={10} padding={16} border="1px solid #e8d7c0" borderRadius={18}>
              <Text as="span" font="headerNav" fontSize={18}>
                {user.organizerProfile?.organizationName || user.email}
              </Text>
              <Text as="span" color="secondaryText">
                {user.email}
              </Text>
              <Box gap={8}>
                <Button
                  label={t('approve')}
                  bg="contrastColor"
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
