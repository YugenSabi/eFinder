import type { Metadata } from 'next';
import {NextIntlClientProvider} from 'next-intl';
import {getMessages, getLocale} from 'next-intl/server';
import type { ReactNode } from 'react';
import './globals.css';

export const metadata: Metadata = {
  title: 'Frontend',
  description: 'Generated modular frontend workspace',
};

export default async function RootLayout({ children }: { children: ReactNode }) {
  const locale = await getLocale();
  const messages = await getMessages();

  return (
    <html lang={locale}>
      <body>
        <NextIntlClientProvider locale={locale} messages={messages}>
          {children}
        </NextIntlClientProvider>
      </body>
    </html>
  );
}
