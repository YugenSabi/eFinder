'use client';

import { useRouter } from 'next/navigation';
import { useTranslations } from 'next-intl';
import { MainLayoutComponent } from '@identity/main-layout';
import { Box } from '@ui/layout';
import { Text } from '@ui/text';
import { useAuth } from '../../../../lib/auth/context';
import { CenteredCardComponent } from './centered-card';
import { OrganizerRequestsSectionComponent } from './organizer-requests';
import { UsersSectionComponent } from './users-section';
import { useAdminData } from './use-admin-data';

export function AdminComponent() {
  const t = useTranslations('Admin');
  const router = useRouter();
  const { currentUser, isAuthResolved } = useAuth();
  const {
    loading,
    pageError,
    users,
    organizerRequests,
    setPageError,
    changeUserRole,
    reviewOrganizerRequest,
  } = useAdminData(Boolean(currentUser && currentUser.role === 'ADMIN'));

  if (!isAuthResolved) {
    return (
      <MainLayoutComponent>
        <CenteredCardComponent
          title={t('title')}
          description={t('loading')}
          actionLabel={t('goHome')}
          onAction={() => router.push('/')}
        />
      </MainLayoutComponent>
    );
  }

  if (!currentUser) {
    return (
      <MainLayoutComponent>
        <CenteredCardComponent
          title={t('title')}
          description={t('loginRequired')}
          actionLabel={t('goToLogin')}
          onAction={() => router.push('/auth/login')}
        />
      </MainLayoutComponent>
    );
  }

  if (currentUser.role !== 'ADMIN') {
    return (
      <MainLayoutComponent>
        <CenteredCardComponent
          title={t('title')}
          description={t('forbidden')}
          actionLabel={t('goHome')}
          onAction={() => router.push('/')}
        />
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

        {pageError ? (
          <Text as="span" color="danger" fontSize={14}>
            {pageError}
          </Text>
        ) : null}

        {loading ? (
          <Text as="span">{t('loading')}</Text>
        ) : (
          <Box direction="column" gap={20}>
            <OrganizerRequestsSectionComponent
              users={organizerRequests}
              onReview={reviewOrganizerRequest}
              onError={setPageError}
            />
            <UsersSectionComponent
              users={users}
              onChangeRole={changeUserRole}
              onError={setPageError}
            />
          </Box>
        )}
      </Box>
    </MainLayoutComponent>
  );
}
