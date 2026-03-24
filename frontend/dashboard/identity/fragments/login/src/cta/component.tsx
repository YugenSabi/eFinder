'use client';

import {useRouter} from 'next/navigation';
import {useTranslations} from 'next-intl';
import {Button} from '@ui/button';
import {Box} from '@ui/layout';
import {Text} from '@ui/text';

export function CtaComponent() {
  const t = useTranslations('Auth.login.cta');
  const router = useRouter();

  return (
    <Box alignItems="center" justifyContent="center" gap={6}>
      <Text as="span" color="secondaryText" fontSize={13}>
        {t('text')}
      </Text>
      <Button
        label={t('action')}
        variant="ghost"
        font="headerNav"
        fontSize={13}
        textColor="secondaryText"
        onClick={() => router.push('/auth/registration')}
      />
    </Box>
  );
}
