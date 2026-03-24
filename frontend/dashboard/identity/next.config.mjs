import createNextIntlPlugin from 'next-intl/plugin';

const withNextIntl = createNextIntlPlugin('./entrypoint/src/i18n/request.ts');

const nextConfig = {
  transpilePackages: [
  "@identity/activity",
  "@identity/rating",
  "@identity/main-layout",
  "@identity/registration",
  "@identity/login",
  "@identity/events",
  "@identity/home",
  "@ui/theme",
  "@ui/layout",
  "@ui/text",
  "@ui/button",
  "@ui/input",
  "@ui/icons",
  "@ui/toast"
],
};

export default withNextIntl(nextConfig);
