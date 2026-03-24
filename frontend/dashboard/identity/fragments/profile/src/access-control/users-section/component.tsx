'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { useTranslations } from 'next-intl';
import { Button } from '@ui/button';
import { Box } from '@ui/layout';
import { Text } from '@ui/text';
import { useAuth } from '../../../../../lib/auth/context';
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
  const router = useRouter();
  const { currentUser } = useAuth();
  const [updatingUserId, setUpdatingUserId] = useState<string | null>(null);

  return (
    <Box
      direction="column"
      gap={16}
      padding={20}
      borderRadius={24}
      backgroundColor="cardBg"
      style={{ boxShadow: '-3px 3px 3px rgba(0, 0, 0, 0.25)' }}
    >
      <Text font="headerNav" fontSize={26}>
        {t('users.title')}
      </Text>

      <Box direction="column" gap={12}>
        {users.map((user) => (
          <Box
            key={user.id}
            direction="column"
            gap={12}
            padding={16}
            borderRadius={18}
            backgroundColor="background"
          >
            <Text font="headerNav" fontSize={18}>
              {formatUserName(user)}
            </Text>

            <Text font="footerText" fontSize={14} color="secondaryText">
              {user.email}
            </Text>

            <Box
              width="fit-content"
              paddingLeft={12}
              paddingRight={12}
              paddingTop={8}
              paddingBottom={8}
              borderRadius={999}
              backgroundColor="cardBg"
            >
              <Text font="footerText" fontSize={14} color="secondaryText">
                {t('users.currentRole')}: {user.role ?? 'PARTICIPANT'}
              </Text>
            </Box>

            <Box gap={8} wrap="wrap">
              <Button
                label="Профиль"
                variant="secondary"
                font="headerNav"
                textColor="contrastColor"
                borderColor="contrastColor"
                onClick={() =>
                  router.push(
                    user.role === 'ORGANIZER'
                      ? `/organizations/${user.id}`
                      : `/members/${user.id}`,
                  )
                }
              />
            </Box>

            <Box gap={8} wrap="wrap">
              {AVAILABLE_ROLES.map((role) => {
                const isCurrentRole = (user.role ?? 'PARTICIPANT') === role;
                const isSelfAdminDowngrade =
                  currentUser?.id === user.id &&
                  (user.role ?? 'PARTICIPANT') === 'ADMIN' &&
                  role !== 'ADMIN';

                return (
                  <Button
                    key={`${user.id}-${role}`}
                    label={role}
                    variant={isCurrentRole ? 'primary' : 'secondary'}
                    font="headerNav"
                    bg={isCurrentRole ? 'contrastColor' : undefined}
                    borderColor="contrastColor"
                    textColor={isCurrentRole ? 'primaryBackground' : 'contrastColor'}
                    style={{
                      padding: '10px 16px',
                    }}
                    disabled={updatingUserId === user.id || isSelfAdminDowngrade}
                    onClick={async () => {
                      if (isSelfAdminDowngrade) {
                        onError('Нельзя снять роль администратора с самого себя');
                        return;
                      }

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
                );
              })}
            </Box>
          </Box>
        ))}
      </Box>
    </Box>
  );
}
