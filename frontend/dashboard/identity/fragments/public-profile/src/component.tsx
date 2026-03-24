'use client';

import {MainLayoutComponent} from '@identity/main-layout';
import {Box} from '@ui/layout';
import {Text} from '@ui/text';
import {PublicProfileAchievementsSectionComponent} from './achievements-section/component';
import {PublicProfileEventsSectionComponent} from './events-section/component';
import {PublicProfileHeaderSectionComponent} from './header-section/component';
import {PublicProfileStatsSectionComponent} from './stats-section/component';
import type {PublicProfileView} from './types';

type PublicProfileComponentProps = PublicProfileView;

export function PublicProfileComponent({user}: PublicProfileComponentProps) {
  return (
    <MainLayoutComponent>
      <Box
        as="main"
        direction="column"
        gap={24}
        width="$full"
        paddingTop={34}
        paddingBottom={40}
      >
        <PublicProfileHeaderSectionComponent user={user} />

        <Box
          direction="column"
          gap={12}
          padding={18}
          borderRadius={24}
          backgroundColor="cardBg"
          style={{boxShadow: '-3px 3px 3px rgba(0, 0, 0, 0.25)'}}
        >
          <Text font="headerNav" fontSize={28}>
            Описание
          </Text>
          <Text font="footerText" fontSize={15}>
            {user.participantProfile?.portfolioSummary ||
              'Описание пока не заполнено'}
          </Text>
        </Box>

        <Box gap={18} alignItems="stretch" flexWrap="wrap">
          <PublicProfileAchievementsSectionComponent
            participations={user.participations}
          />
          <PublicProfileStatsSectionComponent participations={user.participations} />
        </Box>

        <PublicProfileEventsSectionComponent participations={user.participations} />
      </Box>
    </MainLayoutComponent>
  );
}
