import {Box} from '@ui/layout';
import {Text} from '@ui/text';
import type {OrganizationProfileView} from '../types';

type OrganizationRewardsSectionProps = Pick<OrganizationProfileView, 'organization'>;

export function OrganizationRewardsSectionComponent({
  organization,
}: OrganizationRewardsSectionProps) {
  const organizerProfile = organization.organizerProfile;

  return (
    <Box
      direction="column"
      gap={14}
      padding={16}
      borderRadius={24}
      backgroundColor="cardBg"
      style={{flex: '1 1 420px', minWidth: 320, boxShadow: '-3px 3px 3px rgba(0, 0, 0, 0.25)'}}
    >
      <Text font="headerNav" fontSize={24} style={{textAlign: 'center'}}>
        Список призов
      </Text>
      {organizerProfile?.commonRewardTypes?.length ? (
        organizerProfile.commonRewardTypes.map((reward) => (
          <Box
            key={reward}
            padding={18}
            borderRadius={16}
            backgroundColor="background"
            justifyContent="center"
            alignItems="center"
          >
            <Text font="headerNav" fontSize={18}>
              {reward}
            </Text>
          </Box>
        ))
      ) : (
        <Box
          padding={18}
          borderRadius={16}
          backgroundColor="background"
          justifyContent="center"
          alignItems="center"
        >
          <Text font="footerText" fontSize={14}>
            Призы пока не добавлены
          </Text>
        </Box>
      )}
    </Box>
  );
}
