import type { ObserverFilters, ObserverParticipant } from './types';

const API_URL = process.env.NEXT_PUBLIC_API_URL ?? 'http://localhost:4000';

async function apiFetch<T>(path: string, init?: RequestInit) {
  const response = await fetch(`${API_URL}${path}`, {
    ...init,
    credentials: 'include',
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
      ...(init?.headers ?? {}),
    },
  });

  const payload = await response.json().catch(() => null);

  if (!response.ok) {
    const message =
      payload && typeof payload === 'object' && 'message' in payload
        ? String(payload.message)
        : 'Request failed';

    throw new Error(message);
  }

  return payload as T;
}

export function getParticipants(filters: ObserverFilters) {
  const searchParams = new URLSearchParams();

  if (filters.search) searchParams.set('search', filters.search);
  if (filters.city) searchParams.set('city', filters.city);
  if (filters.ageFrom) searchParams.set('ageFrom', filters.ageFrom);
  if (filters.ageTo) searchParams.set('ageTo', filters.ageTo);
  if (filters.eventsFrom) searchParams.set('eventsFrom', filters.eventsFrom);
  if (filters.eventsTo) searchParams.set('eventsTo', filters.eventsTo);
  if (filters.averageScoreFrom) {
    searchParams.set('averageScoreFrom', filters.averageScoreFrom);
  }
  if (filters.averageScoreTo) {
    searchParams.set('averageScoreTo', filters.averageScoreTo);
  }
  if (filters.favoritesOnly) searchParams.set('favoritesOnly', 'true');

  const query = searchParams.toString();

  return apiFetch<ObserverParticipant[]>(
    `/reserve-inspector/participants${query ? `?${query}` : ''}`,
  );
}

export function addFavorite(participantId: string) {
  return apiFetch(`/reserve-inspector/favorites/${participantId}`, {
    method: 'POST',
  });
}

export function removeFavorite(participantId: string) {
  return apiFetch(`/reserve-inspector/favorites/${participantId}`, {
    method: 'DELETE',
  });
}

export async function downloadParticipantReport(participantId: string) {
  const response = await fetch(
    `${API_URL}/reserve-inspector/participants/${participantId}/report`,
    {
      credentials: 'include',
      cache: 'no-store',
      headers: {
        Accept: 'application/pdf',
      },
    },
  );

  if (!response.ok) {
    throw new Error('Не удалось скачать отчет');
  }

  const buffer = await response.arrayBuffer();
  const blob = new Blob([buffer], { type: 'application/pdf' });
  const header = response.headers.get('Content-Disposition') ?? '';
  const fileNameMatch = /filename=\"?([^"]+)\"?/i.exec(header);
  const fileName = fileNameMatch?.[1] ?? `participant-report-${participantId}.pdf`;

  return { blob, fileName };
}
