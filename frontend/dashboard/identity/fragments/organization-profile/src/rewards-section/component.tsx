import { Box } from '@ui/layout';
import { Text } from '@ui/text';
import type { OrganizationProfileView } from '../types';

type OrganizationRewardsSectionProps = Pick<OrganizationProfileView, 'organization'>;

export function OrganizationRewardsSectionComponent({
  organization,
}: OrganizationRewardsSectionProps) {
  const organizerProfile = organization.organizerProfile;

  return (
    <Box direction="column" gap={12} padding={24} surface="card">
      <Text as="h2" font="headerNav" fontSize={24}>
        Частые призы
      </Text>
      {organizerProfile?.commonRewardTypes?.length ? (
        organizerProfile.commonRewardTypes.map((reward) => (
          <Text key={reward} as="span">
            • {reward}
          </Text>
        ))
      ) : (
        <Text as="span">Пока нет данных</Text>
      )}
    </Box>
  );
}
