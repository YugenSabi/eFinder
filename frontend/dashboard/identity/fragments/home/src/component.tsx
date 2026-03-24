import { MainLayoutComponent } from '@identity/main-layout';
import { Button } from '@ui/button';
import { SparkIcon } from '@ui/icons';
import { Input } from '@ui/input';
import { Box } from '@ui/layout';
import { Text } from '@ui/text';
import { useTranslations } from 'next-intl';

export function HomeComponent() {
  const t = useTranslations('HomePage');

  return (
    <MainLayoutComponent>
      <Box
        as="main"
        direction="column"
        width="$full"
        flexGrow={1}
        gap={18}
        alignItems="center"
        justifyContent="center"
        padding={24}
      >
        <Box
          direction="column"
          gap={16}
          width="100%"
          maxWidth={560}
          padding={32}
          surface="card"
        >
          <Box gap={8} alignItems="center">
            <SparkIcon />
            <Text as="span" tone="eyebrow">
              {t('eyebrow')}
            </Text>
          </Box>
          <Text as="h1" tone="title">
            {t('title')}
          </Text>
          <Text as="p">{t('description')}</Text>
          <Input
            label={t('firstField')}
            placeholder={t('firstFieldPlaceholder')}
          />
          <Box gap={12}>
            <Button label={t('primaryAction')} />
            <Button label={t('secondaryAction')} variant="secondary" />
          </Box>
        </Box>
      </Box>
    </MainLayoutComponent>
  );
}
