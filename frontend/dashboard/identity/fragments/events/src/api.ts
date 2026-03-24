const API_URL = process.env.NEXT_PUBLIC_API_URL ?? 'http://localhost:4000';

async function apiFetch<T>(path: string) {
  const response = await fetch(`${API_URL}${path}`, {
    credentials: 'include',
    headers: {
      Accept: 'application/json',
    },
    cache: 'no-store',
  });

  if (!response.ok) {
    throw new Error('Request failed');
  }

  return response.json() as Promise<T>;
}

export type EventApiItem = {
  id: string;
  title: string;
  description: string;
  city?: string | null;
  direction: string;
  difficulty: string;
  startsAt: string;
  imageUrl?: string | null;
  organizer: {
    id: string;
    firstName?: string | null;
    lastName?: string | null;
    email: string;
    organizerProfile?: {
      organizationName?: string | null;
    } | null;
  };
};

export function getEvents() {
  return apiFetch<EventApiItem[]>('/events');
}
