'use client';

import { useRouter } from 'next/navigation';
import { useTranslations } from 'next-intl';
import { MainLayoutComponent } from '@identity/main-layout';
import { Button } from '@ui/button';
import { Box } from '@ui/layout';
import { Text } from '@ui/text';
import { useAuth } from '../../../../lib/auth/context';
import { CreateEventSectionComponent } from './create-event';

export function OrganizerDashboardComponent() {
  const t = useTranslations('OrganizerDashboard');
  const router = useRouter();
  const { currentUser, isAuthResolved } = useAuth();

  if (!isAuthResolved) {
    return (
      <MainLayoutComponent>
        <Box as="main" width="$full" justifyContent="center" alignItems="center" paddingTop={48} paddingBottom={48}>
          <Text as="span">{t('loading')}</Text>
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
            <Text as="p">{t('loginRequired')}</Text>
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

  if (currentUser.role !== 'ORGANIZER') {
    return (
      <MainLayoutComponent>
        <Box as="main" width="$full" justifyContent="center" alignItems="center" paddingTop={48} paddingBottom={48}>
          <Box direction="column" width="$full" maxWidth={520} gap={16} padding={32} surface="card">
            <Text as="h1" font="headerNav" fontSize={38}>
              {t('title')}
            </Text>
            <Text as="p">{t('forbidden')}</Text>
            <Button
              label={t('goHome')}
              bg="contrastColor"
              font="headerNav"
              onClick={() => router.push('/profile')}
            />
          </Box>
        </Box>
      </MainLayoutComponent>
    );
  }

  return (
    <MainLayoutComponent>
      <Box as="main" direction="column" gap={20} width="$full" paddingTop={48} paddingBottom={48}>
        <Box direction="column" gap={8}>
          <Text as="h1" font="headerNav" fontSize={38}>
            {t('title')}
          </Text>
          <Text as="p" color="secondaryText">
            {t('description')}
          </Text>
        </Box>
        <CreateEventSectionComponent
          organizers={[
            {
              id: currentUser.id,
              email: currentUser.email,
              firstName: currentUser.firstName,
              lastName: currentUser.lastName,
              role: currentUser.role,
            },
          ]}
        />
      </Box>
    </MainLayoutComponent>
  );
}
