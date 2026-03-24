import {Box} from '@ui/layout';
import {Text} from '@ui/text';
import type {OrganizationProfileView} from '../types';

type OrganizationLinksSectionProps = Pick<OrganizationProfileView, 'organization'>;

export function OrganizationLinksSectionComponent({
  organization,
}: OrganizationLinksSectionProps) {
  const organizerProfile = organization.organizerProfile;
  const links = [
    organizerProfile?.websiteUrl ? `Сайт: ${organizerProfile.websiteUrl}` : null,
    organizerProfile?.telegram ? `Telegram: ${organizerProfile.telegram}` : null,
    organizerProfile?.vkUrl ? `VK: ${organizerProfile.vkUrl}` : null,
  ].filter(Boolean) as string[];

  return (
    <Box
      direction="column"
      gap={12}
      padding={20}
      borderRadius={24}
      backgroundColor="cardBg"
      style={{boxShadow: '-3px 3px 3px rgba(0, 0, 0, 0.25)'}}
    >
      <Text font="headerNav" fontSize={24}>
        Ссылки
      </Text>
      {links.length > 0 ? (
        links.map((item) => (
          <Text key={item} font="footerText" fontSize={14}>
            • {item}
          </Text>
        ))
      ) : (
        <Text font="footerText" fontSize={14}>
          Ссылки пока не добавлены
        </Text>
      )}
    </Box>
  );
}
