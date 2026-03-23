'use client';

import {useState} from 'react';
import {useRouter} from 'next/navigation';
import {useTranslations} from 'next-intl';
import {MainLayoutComponent} from '@identity/main-layout';
import {Button} from '@ui/button';
import {Box} from '@ui/layout';
import {Text} from '@ui/text';
import {useAuth} from '../../../lib/auth/context';
import {logoutCurrentUser} from '../../../lib/kratos';

export function ProfileComponent() {
  const t = useTranslations('Auth.profile');
  const router = useRouter();
  const {currentUser, setCurrentUser} = useAuth();
  const [loggingOut, setLoggingOut] = useState(false);

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
              onClick={async () => {
                try {
                  setLoggingOut(true);
                  setCurrentUser(null);
                  await logoutCurrentUser();
                } finally {
                  setLoggingOut(false);
                }
              }}
            />
          </Box>
        </Box>
      </MainLayoutComponent>
    );
  }

  return (
    <MainLayoutComponent>
      <Box as="main" width="$full" justifyContent="center" alignItems="center" paddingTop={48} paddingBottom={48}>
        <Box direction="column" width="$full" maxWidth={520} gap={16} padding={32} surface="card">
          <Text as="h1" font="headerNav" fontSize={38}>
            {t('title')}
          </Text>
          <Text as="p">{t('success')}</Text>
          <Text as="span">{t('email')}: {currentUser.email}</Text>
          <Text as="span">{t('statusVerified')}</Text>
          <Button
            label={loggingOut ? t('logoutLoading') : t('logout')}
            variant="secondary"
            font="headerNav"
            onClick={async () => {
              try {
                setLoggingOut(true);
                setCurrentUser(null);
                await logoutCurrentUser();
              } finally {
                setLoggingOut(false);
              }
            }}
          />
        </Box>
      </Box>
    </MainLayoutComponent>
  );
}
