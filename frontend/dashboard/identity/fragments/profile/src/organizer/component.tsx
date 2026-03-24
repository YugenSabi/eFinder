'use client';

import { useRouter } from 'next/navigation';
import { Button } from '@ui/button';
import { Box } from '@ui/layout';
import type { AuthUser } from '../../../../lib/auth/context';
import { buildMockOrganizerProfile } from './model';
import { OrganizerOverviewSection } from './overview-section';
import { OrganizerRecentEventsSection } from './recent-events-section';
import { OrganizerRewardsSection } from './rewards-section';

type OrganizerProfileComponentProps = {
  currentUser: NonNullable<AuthUser>;
};

export function OrganizerProfileComponent({
  currentUser,
}: OrganizerProfileComponentProps) {
  const router = useRouter();
  const profile = buildMockOrganizerProfile(currentUser);

  return (
    <Box as="main" direction="column" width="$full" gap={28} paddingTop={34} paddingBottom={40}>
      <OrganizerOverviewSection profile={profile} />

      <Box gap={18} alignItems="stretch" flexWrap="wrap">
        <OrganizerRewardsSection rewards={profile.rewards} />
        <OrganizerRecentEventsSection events={profile.recentEvents} />
      </Box>

      <Box justifyContent="flex-end" gap={12}>
        <Button
          label="Редактировать"
          bg="contrastColor"
          textColor="surface"
          font="headerNav"
          onClick={() => router.push('/profile/settings')}
        />
        <Button
          label="Управление мероприятиями"
          variant="secondary"
          font="headerNav"
          onClick={() => router.push('/profile/event-management')}
        />
      </Box>
    </Box>
  );
}
