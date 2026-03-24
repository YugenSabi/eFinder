import { Box } from '@ui/layout';
import { Text } from '@ui/text';
import type { OrganizationProfileView } from '../types';

type OrganizationLinksSectionProps = Pick<OrganizationProfileView, 'organization'>;

export function OrganizationLinksSectionComponent({
  organization,
}: OrganizationLinksSectionProps) {
  const organizerProfile = organization.organizerProfile;

  return (
    <Box direction="column" gap={12} padding={24} surface="card">
      <Text as="h2" font="headerNav" fontSize={24}>
        Ссылки
      </Text>
      <Text as="span">{organizerProfile?.websiteUrl || 'Сайт не указан'}</Text>
      <Text as="span">{organizerProfile?.telegram || 'Telegram не указан'}</Text>
      <Text as="span">{organizerProfile?.vkUrl || 'VK не указан'}</Text>
    </Box>
  );
}
