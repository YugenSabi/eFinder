'use client';

import { useTranslations } from 'next-intl';
import { Button } from '@ui/button';
import { Input } from '@ui/input';
import { Box } from '@ui/layout';
import { Text } from '@ui/text';
import type { ObserverFilters } from '../types';

type ObserverFiltersComponentProps = {
  filters: ObserverFilters;
  setFilters: React.Dispatch<React.SetStateAction<ObserverFilters>>;
};

export function ObserverFiltersComponent({
  filters,
  setFilters,
}: ObserverFiltersComponentProps) {
  const t = useTranslations('Observer');

  return (
    <Box direction="column" gap={12} padding={24} surface="card">
      <Text as="h2" font="headerNav" fontSize={24}>
        {t('filters.title')}
      </Text>
      <Input
        label={t('filters.city')}
        value={filters.city}
        onChange={(event) =>
          setFilters((current) => ({ ...current, city: event.currentTarget.value }))
        }
      />
      <Box gap={12} wrap="wrap">
        <Input
          label={t('filters.ageFrom')}
          type="number"
          value={filters.ageFrom}
          onChange={(event) =>
            setFilters((current) => ({ ...current, ageFrom: event.currentTarget.value }))
          }
        />
        <Input
          label={t('filters.ageTo')}
          type="number"
          value={filters.ageTo}
          onChange={(event) =>
            setFilters((current) => ({ ...current, ageTo: event.currentTarget.value }))
          }
        />
      </Box>
      <Box gap={12} wrap="wrap">
        <Input
          label={t('filters.eventsFrom')}
          type="number"
          value={filters.eventsFrom}
          onChange={(event) =>
            setFilters((current) => ({ ...current, eventsFrom: event.currentTarget.value }))
          }
        />
        <Input
          label={t('filters.eventsTo')}
          type="number"
          value={filters.eventsTo}
          onChange={(event) =>
            setFilters((current) => ({ ...current, eventsTo: event.currentTarget.value }))
          }
        />
      </Box>
      <Box gap={12} wrap="wrap">
        <Input
          label={t('filters.averageScoreFrom')}
          type="number"
          value={filters.averageScoreFrom}
          onChange={(event) =>
            setFilters((current) => ({
              ...current,
              averageScoreFrom: event.currentTarget.value,
            }))
          }
        />
        <Input
          label={t('filters.averageScoreTo')}
          type="number"
          value={filters.averageScoreTo}
          onChange={(event) =>
            setFilters((current) => ({
              ...current,
              averageScoreTo: event.currentTarget.value,
            }))
          }
        />
      </Box>
      <Button
        label={filters.favoritesOnly ? t('filters.showAll') : t('filters.showFavorites')}
        variant="secondary"
        font="headerNav"
        onClick={() =>
          setFilters((current) => ({
            ...current,
            favoritesOnly: !current.favoritesOnly,
          }))
        }
      />
    </Box>
  );
}
