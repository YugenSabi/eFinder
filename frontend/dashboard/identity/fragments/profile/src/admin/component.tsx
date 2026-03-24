'use client';

import { useRouter } from 'next/navigation';
import { useTranslations } from 'next-intl';
import { RoleProfileCard } from '../shared/role-profile-card';

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
    <RoleProfileCard
      title={t('title')}
      roleLabel={t('roles.ADMIN')}
      actionLabel={t('actions.accessControl')}
      onAction={() => router.push('/profile/access-control')}
      logoutLabel={t('logout')}
      logoutLoadingLabel={t('logoutLoading')}
      loggingOut={loggingOut}
      onLogout={onLogout}
    />
  );
}
