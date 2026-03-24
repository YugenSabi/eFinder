'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { useTranslations } from 'next-intl';
import { MainLayoutComponent } from '@identity/main-layout';
import { Button } from '@ui/button';
import { Box } from '@ui/layout';
import { Text } from '@ui/text';
import { useAuth } from '../../../lib/auth/context';
import { logoutCurrentUser } from '../../../lib/kratos';
import { OrganizerProfileComponent } from './organizer/component';
import { UserProfileComponent } from './user/component';

export function ProfileComponent() {
  const t = useTranslations('Auth.profile');
  const router = useRouter();
  const { currentUser, setCurrentUser, isAuthResolved } = useAuth();
  const [loggingOut, setLoggingOut] = useState(false);

  if (!isAuthResolved) {
    return (
      <MainLayoutComponent>
        <Box as="main" width="$full" justifyContent="center" alignItems="center" paddingTop={48} paddingBottom={48}>
          <Text as="span">{t('title')}</Text>
        </Box>
      </MainLayoutComponent>
    );
  }

  if (!currentUser) {
    return (
      <MainLayoutComponent>
        <Box as="main" width="$full" justifyContent="center" alignItems="center" paddingTop={48} paddingBottom={48}>
          <Box direction="column" width="$full" maxWidth={520} gap={16} padding={32} surface="card">
            <Text as="h1" font="headerNav" fontSize={38}>
              {t('title')}
            </Text>
            <Button
              label={t('goToLogin')}
              bg="contrastColor"
              font="headerNav"
              onClick={() => router.push('/auth/login')}
            />
          </Box>
        </Box>
      </MainLayoutComponent>
    );
  }

  const logout = async () => {
    try {
      setLoggingOut(true);
      setCurrentUser(null);
      await logoutCurrentUser();
    } finally {
      setLoggingOut(false);
    }
  };

  if (!currentUser.isVerified) {
    return (
      <MainLayoutComponent>
        <Box as="main" width="$full" justifyContent="center" alignItems="center" paddingTop={48} paddingBottom={48}>
          <Box direction="column" width="$full" maxWidth={520} gap={16} padding={32} surface="card">
            <Text as="h1" font="headerNav" fontSize={38}>
              {t('blockedTitle')}
            </Text>
            <Text as="p">{t('blockedDescription')}</Text>
            <Button
              label={t('goToConfirm')}
              bg="contrastColor"
              font="headerNav"
              onClick={() => router.push('/auth/confirm')}
            />
            <Button
              label={loggingOut ? t('logoutLoading') : t('logout')}
              variant="secondary"
              font="headerNav"
              onClick={logout}
            />
          </Box>
        </Box>
      </MainLayoutComponent>
    );
  }

  const shouldShowOrganizerProfile =
    currentUser.role === 'ORGANIZER' ||
    (
      currentUser.role === 'PARTICIPANT' &&
      Boolean(currentUser.organizerProfile)
    );

  return (
    <MainLayoutComponent>
      {shouldShowOrganizerProfile ? (
        <OrganizerProfileComponent loggingOut={loggingOut} onLogout={logout} />
      ) : null}
      {!shouldShowOrganizerProfile ? (
        <UserProfileComponent
          currentUser={currentUser}
          logoutLabel={t('logout')}
          logoutLoadingLabel={t('logoutLoading')}
          loggingOut={loggingOut}
          onLogout={logout}
          onProfileUpdated={setCurrentUser}
          actionLabel={
            currentUser.role === 'ADMIN'
              ? t('actions.accessControl')
              : currentUser.role === 'OBSERVER'
                ? t('actions.reserveInspector')
                : undefined
          }
          onAction={
            currentUser.role === 'ADMIN'
              ? () => router.push('/profile/access-control')
              : currentUser.role === 'OBSERVER'
                ? () => router.push('/profile/reserve-inspector')
                : undefined
          }
        />
      ) : null}
    </MainLayoutComponent>
  );
}
