import { Button } from '@ui/button';
import { Box } from '@ui/layout';
import { Text } from '@ui/text';
import type { EventDetailsView } from '../types';

type EventOrganizerSectionProps = {
  organizer: EventDetailsView['event']['organizer'];
  onOpenProfile: () => void;
};

export function EventOrganizerSectionComponent({
  organizer,
  onOpenProfile,
}: EventOrganizerSectionProps) {
  return (
    <Box direction="column" gap={12} padding={24} surface="card">
      <Text as="h2" font="headerNav" fontSize={24}>
        Организатор
      </Text>
      <Text as="span">
        {organizer.organizerProfile?.organizationName ||
          [organizer.firstName, organizer.lastName].filter(Boolean).join(' ') ||
          organizer.email}
      </Text>
      <Button
        label="Перейти в профиль"
        variant="secondary"
        font="headerNav"
        onClick={onOpenProfile}
      />
    </Box>
  );
}
