'use client';

import { useRouter } from 'next/navigation';
import { useTranslations } from 'next-intl';
import { RoleProfileCard } from '../shared/role-profile-card';

type ObserverProfileComponentProps = {
  loggingOut: boolean;
  onLogout: () => void | Promise<void>;
};

export function ObserverProfileComponent({
  loggingOut,
  onLogout,
}: ObserverProfileComponentProps) {
  const t = useTranslations('Auth.profile');
  const router = useRouter();

  return (
    <RoleProfileCard
      title={t('title')}
      roleLabel={t('roles.OBSERVER')}
      actionLabel={t('actions.reserveInspector')}
      onAction={() => router.push('/profile/reserve-inspector')}
      logoutLabel={t('logout')}
      logoutLoadingLabel={t('logoutLoading')}
      loggingOut={loggingOut}
      onLogout={onLogout}
    />
  );
}
