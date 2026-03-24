import type { AdminUser, AdminPageData } from './types';

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

export async function getAdminPageData(): Promise<AdminPageData> {
  const [users, organizerRequests] = await Promise.all([
    apiFetch<AdminUser[]>('/users'),
    apiFetch<AdminUser[]>('/organizers/candidates'),
  ]);

  return {
    users,
    organizerRequests,
  };
}

export function updateUserRole(userId: string, role: string) {
  return apiFetch(`/users/${userId}/role`, {
    method: 'PATCH',
    body: JSON.stringify({
      role,
    }),
  });
}

export function updateOrganizerRequest(userId: string, status: string) {
  return apiFetch(`/organizers/${userId}`, {
    method: 'PATCH',
    body: JSON.stringify({
      status,
    }),
  });
}
