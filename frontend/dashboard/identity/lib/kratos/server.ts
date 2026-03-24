import {cookies} from 'next/headers';
import type { AuthUser } from '../auth/types';

const DEFAULT_API_URL = 'http://localhost:4000';
const DEFAULT_KRATOS_PUBLIC_URL = 'http://localhost:4433';

function getApiUrl() {
  return process.env.NEXT_PUBLIC_API_URL ?? DEFAULT_API_URL;
}

function getKratosPublicUrl() {
  return process.env.NEXT_PUBLIC_KRATOS_PUBLIC_URL ?? DEFAULT_KRATOS_PUBLIC_URL;
}

export async function getServerCurrentUser(): Promise<AuthUser> {
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

  return response.json() as Promise<AuthUser>;
}

export function getBrowserFlowRedirectUrl(
  flowType: 'login' | 'registration' | 'verification',
  returnPath: string,
) {
  const appUrl = process.env.NEXT_PUBLIC_APP_URL ?? 'http://localhost:3000';
  const returnTo = new URL(returnPath, appUrl);

  return `${getKratosPublicUrl()}/self-service/${flowType}/browser?return_to=${encodeURIComponent(returnTo.toString())}`;
}
