'use client';

import type { ChangeEvent } from 'react';
import { useTranslations } from 'next-intl';
import { Button } from '@ui/button';
import { Input } from '@ui/input';
import { FilterIcon } from '@ui/icons';
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
    <Box
      direction="column"
      gap={16}
      padding={24}
      surface="card"
      radius="xl"
      style={{ boxShadow: '-3px 3px 10px rgba(0, 0, 0, 0.12)' }}
    >
      <Text as="h2" font="headerNav" fontSize={24}>
        {t('filters.title')}
      </Text>

      <Box width="$full" justifyContent="center" alignItems="center" gap={18}>
        <Box
          width="$full"
          maxWidth={1150}
          height={55}
          borderRadius={20}
          backgroundColor="cardBg"
          paddingLeft={14}
          paddingRight={14}
          alignItems="center"
          gap={12}
          style={{ boxShadow: '0 2px 3px rgba(0, 0, 0, 0.18)' }}
        >
          <svg width="26" height="26" viewBox="0 0 24 24" fill="none" aria-hidden="true">
            <circle cx="11" cy="11" r="7" stroke="#1D1A16" strokeWidth="2.5" />
            <path d="M16.5 16.5L21 21" stroke="#1D1A16" strokeWidth="2.5" strokeLinecap="round" />
          </svg>

          <input
            value={filters.search}
            onChange={(event: ChangeEvent<HTMLInputElement>) => {
              setFilters((current) => ({ ...current, search: event.target.value }));
            }}
            placeholder="Поиск по имени, фамилии или почте"
            aria-label="Поиск по имени, фамилии или почте"
            style={{
              width: '100%',
              height: '100%',
              border: 'none',
              outline: 'none',
              background: 'transparent',
              fontFamily: 'var(--font-geologica), Georgia, serif',
              fontSize: '18px',
              color: '#1D1A16',
            }}
          />
        </Box>

        <Box width={34} height={34} justifyContent="center" alignItems="center">
          <FilterIcon />
        </Box>
      </Box>

      <Input
        label={t('filters.city')}
        value={filters.city}
        onChange={(event) => {
          const value = event.currentTarget.value;
          setFilters((current) => ({ ...current, city: value }));
        }}
      />

      <Box gap={12} wrap="wrap">
        <Input
          label={t('filters.ageFrom')}
          type="number"
          value={filters.ageFrom}
          onChange={(event) => {
            const value = event.currentTarget.value;
            setFilters((current) => ({ ...current, ageFrom: value }));
          }}
        />
        <Input
          label={t('filters.ageTo')}
          type="number"
          value={filters.ageTo}
          onChange={(event) => {
            const value = event.currentTarget.value;
            setFilters((current) => ({ ...current, ageTo: value }));
          }}
        />
      </Box>

      <Box gap={12} wrap="wrap">
        <Input
          label={t('filters.eventsFrom')}
          type="number"
          value={filters.eventsFrom}
          onChange={(event) => {
            const value = event.currentTarget.value;
            setFilters((current) => ({ ...current, eventsFrom: value }));
          }}
        />
        <Input
          label={t('filters.eventsTo')}
          type="number"
          value={filters.eventsTo}
          onChange={(event) => {
            const value = event.currentTarget.value;
            setFilters((current) => ({ ...current, eventsTo: value }));
          }}
        />
      </Box>

      <Box gap={12} wrap="wrap">
        <Input
          label={t('filters.averageScoreFrom')}
          type="number"
          value={filters.averageScoreFrom}
          onChange={(event) => {
            const value = event.currentTarget.value;
            setFilters((current) => ({
              ...current,
              averageScoreFrom: value,
            }));
          }}
        />
        <Input
          label={t('filters.averageScoreTo')}
          type="number"
          value={filters.averageScoreTo}
          onChange={(event) => {
            const value = event.currentTarget.value;
            setFilters((current) => ({
              ...current,
              averageScoreTo: value,
            }));
          }}
        />
      </Box>

      <Button
        label={filters.favoritesOnly ? t('filters.showAll') : t('filters.showFavorites')}
        variant="secondary"
        font="headerNav"
        textColor="contrastColor"
        borderColor="contrastColor"
        style={{ alignSelf: 'flex-start' }}
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
