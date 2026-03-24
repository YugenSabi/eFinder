'use client';

import { useRouter } from 'next/navigation';
import { useTranslations } from 'next-intl';
import { MainLayoutComponent } from '@identity/main-layout';
import { Box } from '@ui/layout';
import { Text } from '@ui/text';
import { useAuth } from '../../../../lib/auth/context';
import { ObserverFiltersComponent } from './filters';
import { ObserverParticipantsListComponent } from './participants-list';
import { ObserverCenteredCard } from './shared/centered-card';
import { useObserverData } from './use-observer-data';

export function ObserverComponent() {
  const t = useTranslations('Observer');
  const router = useRouter();
  const { currentUser, isAuthResolved } = useAuth();
  const {
    loading,
    error,
    participants,
    filters,
    favoriteActionId,
    setFilters,
    toggleFavorite,
  } = useObserverData(Boolean(currentUser && currentUser.role === 'OBSERVER'));

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
        <ObserverCenteredCard
          title={t('title')}
          description={t('loginRequired')}
          actionLabel={t('goToLogin')}
          onAction={() => router.push('/auth/login')}
        />
      </MainLayoutComponent>
    );
  }

  if (currentUser.role !== 'OBSERVER') {
    return (
      <MainLayoutComponent>
        <ObserverCenteredCard
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
      <Box as="main" direction="column" width="$full" gap={20} paddingTop={48} paddingBottom={48}>
        <Box direction="column" gap={8}>
          <Text as="h1" font="headerNav" fontSize={38}>
            {t('title')}
          </Text>
          <Text as="p" color="secondaryText">
            {t('description')}
          </Text>
        </Box>

        <ObserverFiltersComponent filters={filters} setFilters={setFilters} />

        {error ? (
          <Text as="span" color="danger" fontSize={14}>
            {error}
          </Text>
        ) : null}

        {loading ? (
          <Text as="span">{t('loading')}</Text>
        ) : (
          <ObserverParticipantsListComponent
            participants={participants}
            favoriteActionId={favoriteActionId}
            onToggleFavorite={(participant) => void toggleFavorite(participant)}
          />
        )}
      </Box>
    </MainLayoutComponent>
  );
}
