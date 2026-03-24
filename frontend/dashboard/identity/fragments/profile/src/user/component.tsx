'use client';

import { Button } from '@ui/button';
import { Box } from '@ui/layout';
import { buildMockProfile } from './model';
import { ProfileAchievementsSection } from './achievements-section';
import { ProfileOverviewSection } from './overview-section';
import { ProfileStatsSection } from './stats-section';

type UserProfileComponentProps = {
  currentUser: {
    id: string;
    email: string;
    isVerified: boolean;
    firstName?: string | null;
    lastName?: string | null;
    role?: string;
  };
  logoutLabel: string;
  logoutLoadingLabel: string;
  loggingOut: boolean;
  onLogout: () => void | Promise<void>;
};

export function UserProfileComponent({
  currentUser,
  logoutLabel,
  logoutLoadingLabel,
  loggingOut,
  onLogout,
}: UserProfileComponentProps) {
  const profile = buildMockProfile(currentUser);

  return (
    <Box as="main" direction="column" width="$full" gap={28} paddingTop={34} paddingBottom={40}>
      <ProfileOverviewSection profile={profile} />

      <Box gap={18} alignItems="stretch" flexWrap="wrap">
        <ProfileAchievementsSection achievements={profile.achievements} />
        <ProfileStatsSection stats={profile.stats} />
      </Box>

      <Box justifyContent="flex-end">
        <Button
          label={loggingOut ? logoutLoadingLabel : logoutLabel}
          variant="secondary"
          font="headerNav"
          onClick={onLogout}
        />
      </Box>
    </Box>
  );
}
