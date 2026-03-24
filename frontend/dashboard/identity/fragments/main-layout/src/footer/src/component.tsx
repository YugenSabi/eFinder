import { Box } from '@ui/layout';
import { Text } from '@ui/text';
import { useTranslations } from 'next-intl';

export function MainFooter() {
  const t = useTranslations('MainLayout.footer');

  return (
    <Box
      position="relative"
      zIndex={1}
      direction="column"
      alignItems="center"
      justifyContent="center"
      marginTop="auto"
      height={50}
      borderTop="1px solid #447EAD"
      backgroundColor="surface"
    >
      <Box direction="column" alignItems="center" justifyContent="center">
        <Text
          as="span"
          color="primaryText"
          font="footerText"
          fontSize={16}
          lineHeight={2.2}
        >
          {t('copyright')}
        </Text>
        <Box position="relative" top={-8}>
          <Text
            as="span"
            color="mutedText"
            font="footerText"
            fontSize={11}
            lineHeight={1.5}
          >
            {t('poweredBy')}
          </Text>
        </Box>
      </Box>
    </Box>
  );
}
