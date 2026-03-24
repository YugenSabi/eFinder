'use client';

import {useRouter} from 'next/navigation';
import {useTranslations} from 'next-intl';
import {Button} from '@ui/button';
import {Box} from '@ui/layout';
import {Text} from '@ui/text';

type AdminProfileComponentProps = {
  loggingOut: boolean;
  onLogout: () => void | Promise<void>;
};

export function AdminProfileComponent({
  loggingOut,
  onLogout,
}: AdminProfileComponentProps) {
  const t = useTranslations('Auth.profile');
  const router = useRouter();

  return (
    <Box
      as="main"
      direction="column"
      width="$full"
      gap={24}
      paddingTop={34}
      paddingBottom={40}
    >
      <Box gap={14} alignItems="stretch" style={{flexWrap: 'wrap'}}>
        <Box
          width={152}
          minWidth={152}
          height={184}
          minHeight={184}
          border="1.5px solid #000000"
          borderRadius={24}
          backgroundColor="surface"
          justifyContent="center"
          alignItems="center"
        >
          <Text font="headerNav" fontSize={48}>
            AD
          </Text>
        </Box>

        <Box
          flexGrow={1}
          direction="column"
          gap={18}
          padding={18}
          borderRadius={24}
          backgroundColor="cardBg"
          style={{minWidth: 360, boxShadow: '-3px 3px 3px rgba(0, 0, 0, 0.25)'}}
        >
          <Text font="headerNav" fontSize={24}>
            {t('title')}
          </Text>
          <Text font="footerText" fontSize={15}>
            {t('roles.ADMIN')}
          </Text>
          <Text font="footerText" fontSize={15}>
            Управляйте ролями пользователей, заявками организаторов и доступом к
            основным разделам платформы.
          </Text>

          <Box gap={12} wrap="wrap">
            <Button
              label={t('actions.accessControl')}
              bg="contrastColor"
              font="headerNav"
              onClick={() => router.push('/profile/access-control')}
            />
            <Button
              label={loggingOut ? t('logoutLoading') : t('logout')}
              variant="secondary"
              font="headerNav"
              onClick={onLogout}
            />
          </Box>
        </Box>
      </Box>
    </Box>
  );
}
