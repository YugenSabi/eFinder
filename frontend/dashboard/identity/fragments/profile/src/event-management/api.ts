import type { EventFormPayload } from './types';
import type { PendingParticipation } from './types';

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

export function createEvent(payload: EventFormPayload) {
  return apiFetch<{ id: string }>('/events', {
    method: 'POST',
    body: JSON.stringify({
      title: payload.title,
      description: payload.description,
      city: payload.city || undefined,
      direction: payload.direction,
      difficulty: payload.difficulty,
      startsAt: new Date(payload.startsAt).toISOString(),
      endsAt: payload.endsAt ? new Date(payload.endsAt).toISOString() : undefined,
      basePoints: Number(payload.basePoints),
      rewardSummary: payload.rewardSummary || undefined,
      organizerId: payload.organizerId || undefined,
      imageUrl: payload.imageUrl || undefined,
    }),
  });
}

export function getPendingParticipations() {
  return apiFetch<PendingParticipation[]>('/participations/organizer/pending');
}

export function reviewParticipation(participationId: string, status: string) {
  return apiFetch(`/participations/${participationId}`, {
    method: 'PATCH',
    body: JSON.stringify({ status }),
  });
}
