'use client';

import {NextIntlClientProvider} from 'next-intl';
import type {PropsWithChildren} from 'react';
import {AuthProvider} from '../lib/auth/context';
import type {AuthUser} from '../lib/auth/types';

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
