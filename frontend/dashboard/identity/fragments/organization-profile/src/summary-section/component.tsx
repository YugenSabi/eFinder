import { Box } from '@ui/layout';
import { Text } from '@ui/text';
import type { OrganizationProfileView } from '../types';

type OrganizationSummarySectionProps = Pick<OrganizationProfileView, 'organization'>;

export function OrganizationSummarySectionComponent({
  organization,
}: OrganizationSummarySectionProps) {
  const organizerProfile = organization.organizerProfile;

  return (
    <>
      <Box direction="column" gap={10}>
        <Text as="h1" font="headerNav" fontSize={36}>
          {organizerProfile?.organizationName || 'Организация'}
        </Text>
        {organizerProfile?.logoUrl ? (
          <Box width={220} height={220} borderRadius={24} overflow="hidden">
            <img
              src={organizerProfile.logoUrl}
              alt={organizerProfile.organizationName || 'Организация'}
              style={{ width: '100%', height: '100%', objectFit: 'cover' }}
            />
          </Box>
        ) : null}
      </Box>

      <Box direction="column" gap={12} padding={24} surface="card">
        <Text as="h2" font="headerNav" fontSize={24}>
          Описание
        </Text>
        <Text as="p">{organizerProfile?.description || 'Описание пока не заполнено'}</Text>
        <Text as="span">Рейтинг: {organizerProfile?.trustScore ?? 0}</Text>
        <Text as="span">Проведено мероприятий: {organizerProfile?.totalEvents ?? 0}</Text>
        <Text as="span">
          Место в рейтинге: {organizerProfile?.organizationRank ?? 'Нет данных'}
        </Text>
      </Box>
    </>
  );
}
