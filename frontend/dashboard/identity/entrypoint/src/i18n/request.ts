import {getRequestConfig} from 'next-intl/server';

export default getRequestConfig(async () => {
  const locale = process.env.NEXT_PUBLIC_LOCALE || 'en';
  const messages = (await import(`../../locales/${locale}.json`)).default;

  return {
    locale,
    messages,
  };
});
