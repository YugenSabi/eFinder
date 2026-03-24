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
  const rewards = payload.rewards
    .map((reward) => ({
      place: reward.place,
      title: reward.title.trim(),
      description: reward.description.trim() || undefined,
      additionalInfo: reward.additionalInfo.trim() || undefined,
      platformPoints: reward.platformPoints ? Number(reward.platformPoints) : undefined,
      points: reward.points ? Number(reward.points) : 0,
    }))
    .filter((reward) => reward.title.length > 0);

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
      difficultyFactor: payload.difficultyFactor
        ? Number(payload.difficultyFactor)
        : undefined,
      rewardSummary: payload.rewardSummary || undefined,
      organizerId: payload.organizerId || undefined,
      imageUrl: payload.imageUrl || undefined,
      rewards: rewards.length > 0 ? rewards : undefined,
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
