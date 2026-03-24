'use client';

import {NextIntlClientProvider} from 'next-intl';
import type {PropsWithChildren} from 'react';
import {AuthProvider, type AuthUser} from '../lib/auth/context';

type AppProvidersProps = PropsWithChildren<{
  locale: string;
  messages: Record<string, unknown>;
  initialUser: AuthUser;
}>;

export function AppProviders({
  children,
  locale,
  messages,
  initialUser,
}: AppProvidersProps) {
  return (
    <NextIntlClientProvider locale={locale} messages={messages}>
      <AuthProvider initialUser={initialUser}>{children}</AuthProvider>
    </NextIntlClientProvider>
  );
}
