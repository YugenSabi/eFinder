'use client';

import { MainLayoutComponent } from '@identity/main-layout';
import { Box } from '@ui/layout';
import { Text } from '@ui/text';
import { PublicProfileEventsSectionComponent } from './events-section/component';
import { PublicProfileHeaderSectionComponent } from './header-section/component';
import type { PublicProfileView } from './types';

type PublicProfileComponentProps = PublicProfileView;

export function PublicProfileComponent({ user }: PublicProfileComponentProps) {

  return (
    <MainLayoutComponent>
      <Box as="main" direction="column" gap={24} width="$full" paddingTop={32} paddingBottom={40}>
        <PublicProfileHeaderSectionComponent user={user} />
        <Box direction="column" gap={12} padding={24} surface="card">
          <Text as="h2" font="headerNav" fontSize={24}>
            Описание
          </Text>
          <Text as="p">
            {user.participantProfile?.portfolioSummary || 'Описание пока не заполнено'}
          </Text>
        </Box>
        <PublicProfileEventsSectionComponent participations={user.participations} />
      </Box>
    </MainLayoutComponent>
  );
}
