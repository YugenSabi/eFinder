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
      <Box as="main" direction="column" gap={24} width="$full" paddingTop={32} paddingBottom={40}>
        <OrganizationSummarySectionComponent organization={organization} />
        <OrganizationLinksSectionComponent organization={organization} />
        <OrganizationRewardsSectionComponent organization={organization} />
        <OrganizationEventsSectionComponent events={events} />
      </Box>
    </MainLayoutComponent>
  );
}
