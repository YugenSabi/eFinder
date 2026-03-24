'use client';

import {useRouter} from 'next/navigation';
import {Button} from '@ui/button';
import {BellIcon, UserIcon} from '@ui/icons';
import {Box} from '@ui/layout';
import {useAuth} from '../../../../../lib/auth/context';
import {useTranslations} from 'next-intl';
import {HEADER_HEIGHT_PX} from './constants';

export function MainHeader() {
  const t = useTranslations('MainLayout.header');
  const router = useRouter();
  const {currentUser, isAuthResolved} = useAuth();

  return (
    <Box
      position="fixed"
      top={16}
      left={40}
      right={40}
      zIndex={2}
      alignItems="center"
      justifyContent="space-between"
      height={HEADER_HEIGHT_PX}
      padding={24}
      gap={10}
      backgroundColor="contrastColor"
      borderRadius={40}
    >
      <Box
        position="relative"
        zIndex={1}
        paddingLeft={16}
        paddingRight={16}
        paddingBottom={24}
        paddingTop={24}
      >
        <Button
          label={t('brand')}
          variant="ghost"
          textColor="surface"
          font="headerBrand"
          fontSize={30}
          size="sm"
          onClick={() => router.push('/')}
        />
      </Box>
      <Box
        position="absolute"
        left={0}
        right={0}
        zIndex={0}
        justifyContent="center"
        alignItems="center"
        gap={12}
      >
        <Button
          label={t('events')}
          variant="ghost"
          textColor="surface"
          font="headerNav"
          fontSize={16}
          size="sm"
          onClick={() => router.push('/events')}
        />
        <Button
          label={t('activity')}
          variant="ghost"
          textColor="surface"
          font="headerNav"
          fontSize={16}
          size="sm"
          onClick={() => router.push('/activity')}
        />
        <Button
          label={t('rating')}
          variant="ghost"
          textColor="surface"
          font="headerNav"
          fontSize={16}
          size="sm"
          onClick={() => router.push('/rating')}
        />
      </Box>
      <Box position="relative" zIndex={1} gap={12} alignItems="center">
        <BellIcon />
        {!isAuthResolved ? (
          <Box width={40} height={40} />
        ) : currentUser ? (
          <Box cursor="pointer" onClick={() => router.push('/profile')}>
            <UserIcon />
          </Box>
        ) : (
          <Button
            label={t('login')}
            variant="ghost"
            textColor="surface"
            font="headerNav"
            fontSize={16}
            size="sm"
            onClick={() => router.push('/auth/login')}
          />
        )}
      </Box>
    </Box>
  );
}
