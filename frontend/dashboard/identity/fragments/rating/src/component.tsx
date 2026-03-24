'use client';

import { useState } from 'react';
import { MainLayoutComponent } from '@identity/main-layout';
import { Box } from '@ui/layout';
import { ratingRows } from './model';
import { RatingList } from './list';
import { RatingSearch } from './search';
import { RatingTitle } from './title';

export function RatingComponent() {
  const [searchQuery, setSearchQuery] = useState('');

  const normalizedQuery = searchQuery.trim().toLowerCase();
  const filteredRows = ratingRows.filter((row) => {
    if (!normalizedQuery) return true;

    return `${row.place} ${row.fullName} ${row.score}`.toLowerCase().includes(normalizedQuery);
  });

  return (
    <MainLayoutComponent>
      <Box as="main" direction="column" width="$full" gap={14} paddingTop={26} paddingBottom={22}>
        <RatingTitle />
        <RatingSearch value={searchQuery} onChange={setSearchQuery} />

        <Box width="$full" justifyContent="center">
          <Box width="$full" maxWidth={894}>
            <RatingList rows={filteredRows} />
          </Box>
        </Box>
      </Box>
    </MainLayoutComponent>
  );
}
