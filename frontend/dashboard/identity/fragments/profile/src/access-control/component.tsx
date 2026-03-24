'use client';

import {useRouter} from 'next/navigation';
import {useTranslations} from 'next-intl';
import {MainLayoutComponent} from '@identity/main-layout';
import {Box} from '@ui/layout';
import {Text} from '@ui/text';
import {useAuth} from '../../../../lib/auth/context';
import {CenteredCardComponent} from './centered-card';
import {OrganizerRequestsSectionComponent} from './organizer-requests';
import {UsersSectionComponent} from './users-section';
import {useAdminData} from './use-admin-data';

export function AdminComponent() {
  const t = useTranslations('Admin');
  const router = useRouter();
  const {currentUser, isAuthResolved} = useAuth();
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
      <Box
        as="main"
        direction="column"
        gap={20}
        width="$full"
        paddingTop={34}
        paddingBottom={40}
      >
        <Box
          direction="column"
          gap={16}
          padding={20}
          borderRadius={24}
          backgroundColor="cardBg"
          style={{boxShadow: '-3px 3px 3px rgba(0, 0, 0, 0.25)'}}
        >
          <Text font="headerNav" fontSize={38}>
            {t('title')}
          </Text>
          <Text font="footerText" fontSize={15} color="secondaryText">
            {t('description')}
          </Text>
          <Box gap={12} wrap="wrap">
            <Box
              direction="column"
              gap={4}
              padding={14}
              borderRadius={18}
              backgroundColor="background"
              style={{minWidth: 180}}
            >
              <Text font="headerNav" fontSize={16}>
                Пользователей
              </Text>
              <Text font="headerNav" fontSize={28}>
                {users.length}
              </Text>
            </Box>
            <Box
              direction="column"
              gap={4}
              padding={14}
              borderRadius={18}
              backgroundColor="background"
              style={{minWidth: 180}}
            >
              <Text font="headerNav" fontSize={16}>
                Заявок организаторов
              </Text>
              <Text font="headerNav" fontSize={28}>
                {organizerRequests.length}
              </Text>
            </Box>
          </Box>
        </Box>

        {pageError ? (
          <Text color="danger" fontSize={14}>
            {pageError}
          </Text>
        ) : null}

        {loading ? (
          <Text font="footerText" fontSize={15}>
            {t('loading')}
          </Text>
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
