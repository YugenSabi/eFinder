import localFont from 'next/font/local';
import type { Metadata } from 'next';
import {getMessages, getLocale} from 'next-intl/server';
import type { ReactNode } from 'react';
import {AppProviders} from './providers';
import {getServerCurrentUser} from '../lib/kratos/server';
import './globals.css';

const underratedFont = localFont({
  src: './fonts/UNDERRATED-UltraBold-Personal-Use.otf',
  variable: '--font-underrated',
  display: 'swap',
});

const geologicaFont = localFont({
  src: './fonts/Geologica-Regular.ttf',
  variable: '--font-geologica',
  display: 'swap',
});

const delaGothicOneFont = localFont({
  src: './fonts/DelaGothicOne-Regular.ttf',
  variable: '--font-dela-gothic-one',
  display: 'swap',
});

export const metadata: Metadata = {
  title: 'Frontend',
  description: 'Generated modular frontend workspace',
};

export default async function RootLayout({ children }: { children: ReactNode }) {
  const locale = await getLocale();
  const messages = await getMessages();
  const currentUser = await getServerCurrentUser();

  return (
    <html lang={locale} suppressHydrationWarning>
      <body className={`${underratedFont.variable} ${geologicaFont.variable} ${delaGothicOneFont.variable}`}>
        <AppProviders locale={locale} messages={messages} initialUser={currentUser}>
          {children}
        </AppProviders>
      </body>
    </html>
  );
}
