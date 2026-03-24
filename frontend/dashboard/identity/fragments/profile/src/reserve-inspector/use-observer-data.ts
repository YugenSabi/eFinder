'use client';

import { useCallback, useEffect, useState } from 'react';
import { addFavorite, getParticipants, removeFavorite } from './api';
import type { ObserverFilters, ObserverParticipant } from './types';

const INITIAL_FILTERS: ObserverFilters = {
  city: '',
  ageFrom: '',
  ageTo: '',
  eventsFrom: '',
  eventsTo: '',
  averageScoreFrom: '',
  averageScoreTo: '',
  favoritesOnly: false,
};

export function useObserverData(enabled: boolean) {
  const [loading, setLoading] = useState(enabled);
  const [error, setError] = useState<string | null>(null);
  const [participants, setParticipants] = useState<ObserverParticipant[]>([]);
  const [filters, setFilters] = useState<ObserverFilters>(INITIAL_FILTERS);
  const [favoriteActionId, setFavoriteActionId] = useState<string | null>(null);

  const load = useCallback(async (nextFilters: ObserverFilters) => {
    if (!enabled) {
      setLoading(false);
      return;
    }

    setLoading(true);
    setError(null);

    try {
      const nextParticipants = await getParticipants(nextFilters);
      setParticipants(nextParticipants);
    } catch (nextError) {
      setError(nextError instanceof Error ? nextError.message : 'Request failed');
    } finally {
      setLoading(false);
    }
  }, [enabled]);

  useEffect(() => {
    void load(filters);
  }, [filters, load]);

  const toggleFavorite = useCallback(async (participant: ObserverParticipant) => {
    setFavoriteActionId(participant.id);
    setError(null);

    try {
      if (participant.isFavorite) {
        await removeFavorite(participant.id);
      } else {
        await addFavorite(participant.id);
      }

      setParticipants((current) =>
        current.map((item) =>
          item.id === participant.id
            ? { ...item, isFavorite: !item.isFavorite }
            : item,
        ),
      );
    } catch (nextError) {
      setError(nextError instanceof Error ? nextError.message : 'Request failed');
    } finally {
      setFavoriteActionId(null);
    }
  }, []);

  return {
    loading,
    error,
    participants,
    filters,
    favoriteActionId,
    setFilters,
    toggleFavorite,
  };
}
