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

  let response: Response;

  try {
    response = await fetch(`${getApiUrl()}/auth/me`, {
      method: 'GET',
      cache: 'no-store',
      headers: {
        Accept: 'application/json',
        Cookie: cookieHeader,
      },
    });
  } catch {
    return null;
  }

  if (response.status === 401 || !response.ok) {
    return null;
  }

  return response.json() as Promise<AuthUser>;
}

export function getBrowserFlowRedirectUrl(
  flowType: 'login' | 'registration' | 'verification',
  _returnPath: string,
) {
  return `${getKratosPublicUrl()}/self-service/${flowType}/browser`;
}
