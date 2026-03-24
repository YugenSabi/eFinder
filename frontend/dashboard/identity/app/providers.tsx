'use client';

import {NextIntlClientProvider} from 'next-intl';
import type {PropsWithChildren} from 'react';
import {AuthProvider} from '../lib/auth/context';
import type {AuthUser} from '../lib/auth/types';

type AppProvidersProps = PropsWithChildren<{
  locale: string;
  messages: Record<string, unknown>;
  initialUser: AuthUser;
  timeZone: string;
}>;

export function AppProviders({
  children,
  locale,
  messages,
  initialUser,
  timeZone,
}: AppProvidersProps) {
  return (
    <NextIntlClientProvider locale={locale} messages={messages} timeZone={timeZone}>
      <AuthProvider initialUser={initialUser}>{children}</AuthProvider>
    </NextIntlClientProvider>
  );
}
