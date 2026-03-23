import localFont from 'next/font/local';
import type { Metadata } from 'next';
import {NextIntlClientProvider} from 'next-intl';
import {getMessages, getLocale} from 'next-intl/server';
import type { ReactNode } from 'react';
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

  return (
    <html lang={locale}>
      <body className={`${underratedFont.variable} ${geologicaFont.variable} ${delaGothicOneFont.variable}`}>
        <NextIntlClientProvider locale={locale} messages={messages}>
          {children}
        </NextIntlClientProvider>
      </body>
    </html>
  );
}
