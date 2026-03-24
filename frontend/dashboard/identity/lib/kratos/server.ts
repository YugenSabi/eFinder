import {cookies} from 'next/headers';

type CurrentUser = {
  id: string;
  email: string;
  isVerified: boolean;
  firstName?: string | null;
  lastName?: string | null;
  role?: string;
};

const DEFAULT_API_URL = 'http://localhost:4000';

function getApiUrl() {
  return process.env.NEXT_PUBLIC_API_URL ?? DEFAULT_API_URL;
}

export async function getServerCurrentUser(): Promise<CurrentUser | null> {
  const cookieStore = await cookies();
  const cookieHeader = cookieStore.toString();

  if (!cookieHeader) {
    return null;
  }

  const response = await fetch(`${getApiUrl()}/auth/me`, {
    method: 'GET',
    cache: 'no-store',
    headers: {
      Accept: 'application/json',
      Cookie: cookieHeader,
    },
  });

  if (response.status === 401 || !response.ok) {
    return null;
  }

  return response.json() as Promise<CurrentUser>;
}
