import {Box} from '@ui/layout';
import {Text} from '@ui/text';
import type {OrganizationProfileView} from '../types';

type OrganizationSummarySectionProps = Pick<OrganizationProfileView, 'organization'>;

export function OrganizationSummarySectionComponent({
  organization,
}: OrganizationSummarySectionProps) {
  const organizerProfile = organization.organizerProfile;
  const organizationName = organizerProfile?.organizationName || 'Организация';
  const description = organizerProfile?.description || 'Описание пока не заполнено';

  return (
    <Box gap={14} alignItems="stretch" style={{flexWrap: 'wrap'}}>
      <Box
        width={320}
        minWidth={320}
        height={320}
        minHeight={320}
        border="1.5px solid #000000"
        borderRadius={24}
        backgroundColor="surface"
        justifyContent="center"
        alignItems="center"
        overflow="hidden"
      >
        {organizerProfile?.logoUrl ? (
          <img
            src={organizerProfile.logoUrl}
            alt={organizationName}
            style={{width: '100%', height: '100%', objectFit: 'cover'}}
          />
        ) : (
          <Text font="headerNav" fontSize={28}>
            {organizationName}
          </Text>
        )}
      </Box>

      <Box
        flexGrow={1}
        direction="column"
        gap={18}
        padding={14}
        borderRadius={24}
        backgroundColor="cardBg"
        style={{minWidth: 360, boxShadow: '-3px 3px 3px rgba(0, 0, 0, 0.25)'}}
      >
        <Text font="headerNav" fontSize={18}>
          {organizationName}
        </Text>
        <Text font="footerText" fontSize={13}>
          {description}
        </Text>
        <Box direction="column" gap={8}>
          <Text font="headerNav" fontSize={14}>
            Данные организации:
          </Text>
          <Text font="footerText" fontSize={13}>
            • Рейтинг доверия: {organizerProfile?.trustScore?.toFixed(2) ?? '0.00'}
          </Text>
          <Text font="footerText" fontSize={13}>
            • Проведено мероприятий: {organizerProfile?.totalEvents ?? 0}
          </Text>
          <Text font="footerText" fontSize={13}>
            • Место в рейтинге: {organizerProfile?.organizationRank ?? 'нет данных'}
          </Text>
        </Box>
      </Box>
    </Box>
  );
}
