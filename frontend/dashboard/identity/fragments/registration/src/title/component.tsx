'use client';

import { ReactNode } from 'react';
import { Box } from '@ui/layout';
import { Text } from '@ui/text';
import { useTranslations } from 'next-intl';

export const TitleComponent = (): ReactNode => {
    const t = useTranslations('Auth.registration');

    return (
        <Box alignItems="flex-start" width="$full" paddingBottom={10} paddingTop={10}>
            <Text font="headerNav" fontSize={38} >
                {t('title')}
            </Text>
        </Box>
    );
};
