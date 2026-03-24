'use client';

import { MainLayoutComponent } from '@identity/main-layout';
import { Box } from '@ui/layout';
import { OrganizationEventsSectionComponent } from './events-section/component';
import { OrganizationLinksSectionComponent } from './links-section/component';
import { OrganizationRewardsSectionComponent } from './rewards-section/component';
import { OrganizationSummarySectionComponent } from './summary-section/component';
import type { OrganizationProfileView } from './types';

export function OrganizationProfileComponent({
  organization,
  events,
}: OrganizationProfileView) {
  return (
    <MainLayoutComponent>
      <Box as="main" direction="column" gap={28} width="$full" paddingTop={34} paddingBottom={40}>
        <OrganizationSummarySectionComponent organization={organization} />
        <Box gap={18} alignItems="stretch" flexWrap="wrap">
          <OrganizationRewardsSectionComponent organization={organization} />
          <OrganizationEventsSectionComponent events={events} />
        </Box>
        <OrganizationLinksSectionComponent organization={organization} />
      </Box>
    </MainLayoutComponent>
  );
}
