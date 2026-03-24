'use client';

import {useEffect, useState} from 'react';
import {MainLayoutComponent} from '@identity/main-layout';
import {Box} from '@ui/layout';
import {Text} from '@ui/text';
import {RatingList} from './list';
import {RatingSearch} from './search';
import {RatingTitle} from './title';
import type {RatingRowModel} from './types';

const API_URL = process.env.NEXT_PUBLIC_API_URL ?? 'http://localhost:4000';

type BackendRatingRow = {
  place: number;
  userId: string;
  email: string;
  firstName?: string | null;
  lastName?: string | null;
  city?: string | null;
  totalScore: number;
  reserveForecastScore: number;
};

type BackendRatingsPayload =
  | BackendRatingRow[]
  | {
      items?: BackendRatingRow[];
      rows?: BackendRatingRow[];
    };

function buildFullName(row: {
  firstName?: string | null;
  lastName?: string | null;
  email: string;
}) {
  const fullName = [row.firstName, row.lastName].filter(Boolean).join(' ').trim();
  return fullName || row.email;
}

function normalizeRatingsPayload(payload: BackendRatingsPayload): BackendRatingRow[] {
  if (Array.isArray(payload)) {
    return payload;
  }

  if (payload && Array.isArray(payload.items)) {
    return payload.items;
  }

  if (payload && Array.isArray(payload.rows)) {
    return payload.rows;
  }

  return [];
}

function mapRatingsRows(rows: BackendRatingRow[]): RatingRowModel[] {
  return rows.map((row) => ({
    id: row.userId,
    place: row.place,
    fullName: buildFullName(row),
    score: row.totalScore,
  }));
}

async function fetchRatings(searchQuery: string) {
  const params = new URLSearchParams();
  params.set('limit', '100');

  const normalizedQuery = searchQuery.trim();
  if (normalizedQuery) {
    params.set('search', normalizedQuery);
  }

  const response = await fetch(`${API_URL}/ratings?${params.toString()}`, {
    method: 'GET',
    cache: 'no-store',
    credentials: 'include',
    headers: {
      Accept: 'application/json',
    },
  });

  if (!response.ok) {
    throw new Error('Не удалось загрузить рейтинг');
  }

  const payload = (await response.json().catch(() => [])) as BackendRatingsPayload;
  return mapRatingsRows(normalizeRatingsPayload(payload));
}

export function RatingComponent() {
  const [searchQuery, setSearchQuery] = useState('');
  const [rows, setRows] = useState<RatingRowModel[]>([]);
  const [loading, setLoading] = useState(true);
  const [pageError, setPageError] = useState<string | null>(null);

  useEffect(() => {
    let cancelled = false;

    const timeoutId = window.setTimeout(async () => {
      try {
        setLoading(true);
        setPageError(null);

        const nextRows = await fetchRatings(searchQuery);

        if (!cancelled) {
          setRows(nextRows);
        }
      } catch (error) {
        if (!cancelled) {
          setPageError(
            error instanceof Error ? error.message : 'Не удалось загрузить рейтинг',
          );
          setRows([]);
        }
      } finally {
        if (!cancelled) {
          setLoading(false);
        }
      }
    }, 250);

    return () => {
      cancelled = true;
      window.clearTimeout(timeoutId);
    };
  }, [searchQuery]);

  return (
    <MainLayoutComponent>
      <Box
        as="main"
        direction="column"
        width="$full"
        gap={14}
        paddingTop={26}
        paddingBottom={22}
      >
        <RatingTitle />
        <RatingSearch value={searchQuery} onChange={setSearchQuery} />

        <Box width="$full" justifyContent="center">
          <Box width="$full" maxWidth={894}>
            {pageError ? (
              <Text color="danger" fontSize={14}>
                {pageError}
              </Text>
            ) : loading ? (
              <Text font="footerText" fontSize={15}>
                Загрузка рейтинга...
              </Text>
            ) : rows.length === 0 ? (
              <Text font="footerText" fontSize={15}>
                Ничего не найдено
              </Text>
            ) : (
              <RatingList rows={rows} />
            )}
          </Box>
        </Box>
      </Box>
    </MainLayoutComponent>
  );
}
