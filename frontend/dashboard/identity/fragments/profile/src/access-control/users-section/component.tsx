'use client';

import { useState } from 'react';
import { useTranslations } from 'next-intl';
import { Button } from '@ui/button';
import { Box } from '@ui/layout';
import { Text } from '@ui/text';
import type { AdminUser } from '../types';

const AVAILABLE_ROLES = ['ADMIN', 'ORGANIZER', 'PARTICIPANT', 'OBSERVER'] as const;

type UsersSectionProps = {
  users: AdminUser[];
  onChangeRole: (userId: string, role: string) => Promise<void>;
  onError: (message: string | null) => void;
};

function formatUserName(user: AdminUser) {
  const fullName = [user.firstName, user.lastName].filter(Boolean).join(' ').trim();

  return fullName || user.email;
}

export function UsersSectionComponent({
  users,
  onChangeRole,
  onError,
}: UsersSectionProps) {
  const t = useTranslations('Admin');
  const [updatingUserId, setUpdatingUserId] = useState<string | null>(null);

  return (
    <Box direction="column" gap={16} padding={24} surface="card">
      <Text as="h2" font="headerNav" fontSize={24}>
        {t('users.title')}
      </Text>
      <Box direction="column" gap={12}>
        {users.map((user) => (
          <Box
            key={user.id}
            direction="column"
            gap={10}
            padding={16}
            border="1px solid #e8d7c0"
            borderRadius={18}
          >
            <Text as="span" font="headerNav" fontSize={18}>
              {formatUserName(user)}
            </Text>
            <Text as="span" color="secondaryText">
              {user.email}
            </Text>
            <Text as="span" color="secondaryText">
              {t('users.currentRole')}: {user.role ?? 'PARTICIPANT'}
            </Text>
            <Box gap={8} wrap="wrap">
              {AVAILABLE_ROLES.map((role) => (
                <Button
                  key={`${user.id}-${role}`}
                  label={role}
                  variant={user.role === role ? 'primary' : 'secondary'}
                  font="headerNav"
                  disabled={updatingUserId === user.id}
                  onClick={async () => {
                    setUpdatingUserId(user.id);
                    onError(null);

                    try {
                      await onChangeRole(user.id, role);
                    } catch (error) {
                      onError(
                        error instanceof Error ? error.message : t('users.error'),
                      );
                    } finally {
                      setUpdatingUserId(null);
                    }
                  }}
                />
              ))}
            </Box>
          </Box>
        ))}
      </Box>
    </Box>
  );
}
