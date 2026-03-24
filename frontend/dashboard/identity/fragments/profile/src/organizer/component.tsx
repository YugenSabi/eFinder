'use client';

import { useRouter } from 'next/navigation';
import { useTranslations } from 'next-intl';
import { RoleProfileCard } from '../shared/role-profile-card';

type OrganizerProfileComponentProps = {
  loggingOut: boolean;
  onLogout: () => void | Promise<void>;
};

export function OrganizerProfileComponent({
  loggingOut,
  onLogout,
}: OrganizerProfileComponentProps) {
  const t = useTranslations('Auth.profile');
  const router = useRouter();

  return (
    <RoleProfileCard
      title={t('title')}
      roleLabel={t('roles.ORGANIZER')}
      actionLabel={t('actions.eventManagement')}
      onAction={() => router.push('/profile/event-management')}
      logoutLabel={t('logout')}
      logoutLoadingLabel={t('logoutLoading')}
      loggingOut={loggingOut}
      onLogout={onLogout}
    />
  );
}
