type KratosUiNode = {
  attributes?: {
    name?: string;
    type?: string;
    value?: string;
  };
};

type KratosFlow = {
  id: string;
  ui?: {
    nodes?: KratosUiNode[];
    messages?: Array<{text?: string}>;
  };
  continue_with?: Array<{
    action?: string;
    flow?: {
      id?: string;
    };
    redirect_browser_to?: string;
  }>;
};

type FlowType = 'login' | 'registration' | 'verification';

const DEFAULT_KRATOS_PUBLIC_URL = 'http://localhost:4433';
const DEFAULT_API_URL = 'http://localhost:4000';

export function getKratosPublicUrl() {
  return process.env.NEXT_PUBLIC_KRATOS_PUBLIC_URL ?? DEFAULT_KRATOS_PUBLIC_URL;
}

export function getApiUrl() {
  return process.env.NEXT_PUBLIC_API_URL ?? DEFAULT_API_URL;
}

export function startBrowserFlow(flowType: FlowType) {
  window.location.assign(`${getKratosPublicUrl()}/self-service/${flowType}/browser`);
}

export async function getBrowserFlow(flowType: FlowType, flowId: string) {
  const response = await fetch(
    `${getKratosPublicUrl()}/self-service/${flowType}/flows?id=${encodeURIComponent(flowId)}`,
    {
      method: 'GET',
      cache: 'no-store',
      credentials: 'include',
      headers: {
        Accept: 'application/json',
      },
    },
  );

  const payload = (await response.json().catch(() => null)) as KratosFlow | null;

  if (!response.ok || !payload) {
    throw new Error(resolveKratosError(payload) ?? 'Не удалось получить auth flow');
  }

  return payload;
}

export function getCsrfToken(flow: KratosFlow) {
  const node = flow.ui?.nodes?.find(
    (item) => item.attributes?.name === 'csrf_token' && item.attributes?.type === 'hidden',
  );

  return node?.attributes?.value;
}

export async function submitLoginFlow(params: {
  flowId: string;
  csrfToken?: string;
  email: string;
  password: string;
}) {
  return submitBrowserFlow('login', params.flowId, {
    method: 'password',
    csrf_token: params.csrfToken,
    identifier: params.email,
    password: params.password,
  });
}

export async function submitRegistrationFlow(params: {
  flowId: string;
  csrfToken?: string;
  email: string;
  firstName: string;
  lastName: string;
  password: string;
}) {
  return submitBrowserFlow('registration', params.flowId, {
    method: 'password',
    csrf_token: params.csrfToken,
    password: params.password,
    traits: {
      email: params.email,
      first_name: params.firstName,
      last_name: params.lastName,
    },
  });
}

export function getVerificationConfirmPath(payload: unknown) {
  if (!payload || typeof payload !== 'object') {
    return null;
  }

  const continueWith =
    'continue_with' in payload && Array.isArray(payload.continue_with)
      ? payload.continue_with
      : [];

  for (const item of continueWith) {
    if (!item || typeof item !== 'object') {
      continue;
    }

    if (
      'action' in item &&
      item.action === 'show_verification_ui' &&
      'flow' in item &&
      item.flow &&
      typeof item.flow === 'object' &&
      'id' in item.flow &&
      typeof item.flow.id === 'string'
    ) {
      return `/auth/confirm?flow=${encodeURIComponent(item.flow.id)}`;
    }

    if (
      'redirect_browser_to' in item &&
      typeof item.redirect_browser_to === 'string'
    ) {
      try {
        const redirectUrl = new URL(
          item.redirect_browser_to,
          window.location.origin,
        );
        const flow = redirectUrl.searchParams.get('flow');

        if (flow) {
          return `/auth/confirm?flow=${encodeURIComponent(flow)}`;
        }
      } catch {
        return null;
      }
    }
  }

  return null;
}

export async function syncCurrentUser() {
  const response = await fetch(`${getApiUrl()}/auth/me`, {
    method: 'GET',
    cache: 'no-store',
    credentials: 'include',
    headers: {
      Accept: 'application/json',
    },
  });

  if (!response.ok) {
    throw new Error('Не удалось синхронизировать пользователя');
  }

  return response.json();
}

export async function getCurrentUser(): Promise<AuthUser> {
  const response = await fetch(`${getApiUrl()}/auth/me`, {
    method: 'GET',
    cache: 'no-store',
    credentials: 'include',
    headers: {
      Accept: 'application/json',
    },
  });

  if (response.status === 401) {
    return null;
  }

  if (!response.ok) {
    throw new Error('Не удалось получить текущего пользователя');
  }

  return response.json() as Promise<AuthUser>;
}

export async function updateCurrentUserProfile(payload: {
  firstName: string;
  lastName: string;
  age: number | null;
  city: string;
  headline: string;
  school: string;
  telegram: string;
  githubUrl: string;
  behanceUrl: string;
  vkUrl: string;
  avatarUrl: string;
  portfolioSummary: string;
}) {
  const response = await fetch(`${getApiUrl()}/auth/me`, {
    method: 'PATCH',
    cache: 'no-store',
    credentials: 'include',
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(payload),
  });

  const data = await response.json().catch(() => null);

  if (!response.ok) {
    const message =
      data && typeof data === 'object' && 'message' in data
        ? String(data.message)
        : 'Не удалось сохранить профиль';

    throw new Error(message);
  }

  return data as NonNullable<AuthUser>;
}

export async function requestOrganizerAccess(payload: {
  organizationName: string;
  bio: string;
  websiteUrl: string;
  telegram: string;
  vkUrl: string;
  logoUrl: string;
}) {
  const response = await fetch(`${getApiUrl()}/organizers/request`, {
    method: 'POST',
    cache: 'no-store',
    credentials: 'include',
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(payload),
  });

  const data = await response.json().catch(() => null);

  if (!response.ok) {
    const message =
      data && typeof data === 'object' && 'message' in data
        ? String(data.message)
        : 'Не удалось отправить заявку организатора';

    throw new Error(message);
  }

  return data;
}

export async function updateOrganizerProfile(payload: {
  organizationName: string;
  bio: string;
  websiteUrl: string;
  telegram: string;
  vkUrl: string;
  logoUrl: string;
}) {
  const response = await fetch(`${getApiUrl()}/organizers/me`, {
    method: 'PATCH',
    cache: 'no-store',
    credentials: 'include',
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(payload),
  });

  const data = await response.json().catch(() => null);

  if (!response.ok) {
    const message =
      data && typeof data === 'object' && 'message' in data
        ? String(data.message)
        : 'Не удалось сохранить данные организации';

    throw new Error(message);
  }

  return data as NonNullable<AuthUser>;
}

export async function submitVerificationFlow(params: {
  flowId: string;
  csrfToken?: string;
  code: string;
  email?: string;
}) {
  return submitBrowserFlow('verification', params.flowId, {
    method: 'code',
    csrf_token: params.csrfToken,
    code: params.code,
    email: params.email,
  });
}

export async function resendVerificationCode(params: {
  flowId: string;
  csrfToken?: string;
  email?: string;
}): Promise<KratosFlow> {
  return submitBrowserFlow('verification', params.flowId, {
    method: 'code',
    csrf_token: params.csrfToken,
    email: params.email,
  }) as Promise<KratosFlow>;
}

export async function logoutCurrentUser() {
  const response = await fetch(`${getKratosPublicUrl()}/self-service/logout/browser`, {
    method: 'GET',
    credentials: 'include',
    headers: {
      Accept: 'application/json',
    },
  });

  const payload = (await response.json().catch(() => null)) as {logout_url?: string} | null;
  const logoutUrl = payload?.logout_url ?? `${getKratosPublicUrl()}/self-service/logout/browser`;

  window.location.assign(logoutUrl);
}

async function submitBrowserFlow(
  flowType: FlowType,
  flowId: string,
  body: Record<string, unknown>,
) {
  const response = await fetch(
    `${getKratosPublicUrl()}/self-service/${flowType}?flow=${encodeURIComponent(flowId)}`,
    {
      method: 'POST',
      credentials: 'include',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(body),
    },
  );

  const payload = (await response.json().catch(() => null)) as KratosFlow | Record<string, unknown> | null;

  if (!response.ok) {
    throw new Error(resolveKratosError(payload) ?? 'Не удалось отправить auth flow');
  }

  return payload;
}

function resolveKratosError(payload: unknown) {
  if (!payload || typeof payload !== 'object') {
    return null;
  }

  const ui = 'ui' in payload ? payload.ui : null;

  if (ui && typeof ui === 'object' && 'messages' in ui && Array.isArray(ui.messages)) {
    const message = ui.messages.find(
      (item): item is {text?: string} => typeof item === 'object' && item !== null,
    );

    if (message?.text) {
      return message.text;
    }
  }

  if ('error' in payload && typeof payload.error === 'object' && payload.error !== null) {
    const error = payload.error as {message?: string};
    return error.message ?? null;
  }

  return null;
}
import type { AuthUser } from '../auth/types';
