import {Button} from '@ui/button';
import {Box} from '@ui/layout';
import {Text} from '@ui/text';
import type {EventDetailsView} from '../types';

type EventOrganizerSectionProps = {
  organizer: EventDetailsView['event']['organizer'];
  onOpenProfile: () => void;
};

export function EventOrganizerSectionComponent({
  organizer,
  onOpenProfile,
}: EventOrganizerSectionProps) {
  const organizerName =
    organizer.organizerProfile?.organizationName ||
    [organizer.firstName, organizer.lastName].filter(Boolean).join(' ').trim() ||
    organizer.email;

  return (
    <Box
      direction="column"
      gap={14}
      padding={20}
      borderRadius={24}
      backgroundColor="background"
      style={{boxShadow: '-3px 3px 6px rgba(0, 0, 0, 0.18)'}}
    >
      <Text font="headerNav" fontSize={28}>
        Организатор
      </Text>

      <Box direction="column" gap={8}>
        <Text font="headerNav" fontSize={20}>
          {organizerName}
        </Text>
        <Text font="footerText" fontSize={15}>
          {organizer.email}
        </Text>
      </Box>

      <Button
        label="Перейти в профиль"
        bg="contrastColor"
        font="headerNav"
        onClick={onOpenProfile}
      />
    </Box>
  );
}
