'use client';

import {useRouter} from 'next/navigation';
import {Box} from '@ui/layout';
import type {AuthUser} from '../../../../lib/auth/types';
import {ProfileActionsSection} from './actions-section';
import {ProfileAchievementsSection} from './achievements-section';
import {ProfileOverviewSection} from './overview-section';
import {ProfileStatsSection} from './stats-section';

type UserProfileComponentProps = {
  currentUser: NonNullable<AuthUser>;
  logoutLabel: string;
  logoutLoadingLabel: string;
  loggingOut: boolean;
  onLogout: () => void | Promise<void>;
  actionLabel?: string;
  onAction?: () => void;
};

export function UserProfileComponent({
  currentUser,
  logoutLabel,
  logoutLoadingLabel,
  loggingOut,
  onLogout,
  actionLabel,
  onAction,
}: UserProfileComponentProps) {
  const router = useRouter();

  return (
    <Box
      as="main"
      direction="column"
      width="$full"
      gap={28}
      paddingTop={34}
      paddingBottom={40}
    >
      <ProfileOverviewSection currentUser={currentUser} />

      <Box gap={18} alignItems="stretch" flexWrap="wrap">
        <ProfileAchievementsSection
          achievements={currentUser.achievements ?? []}
        />
        <ProfileStatsSection stats={currentUser.stats ?? []} />
      </Box>

      <ProfileActionsSection
        editLabel="Редактировать"
        actionLabel={actionLabel}
        logoutLabel={logoutLabel}
        logoutLoadingLabel={logoutLoadingLabel}
        loggingOut={loggingOut}
        onEdit={() => router.push('/profile/settings')}
        onAction={onAction}
        onLogout={onLogout}
      />
    </Box>
  );
}
