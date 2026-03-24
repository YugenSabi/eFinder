import { Box } from '@ui/layout';
import { Text } from '@ui/text';
import type { EventDetailsView } from '../types';

type EventRewardsSectionProps = {
  rewards: EventDetailsView['event']['rewards'];
};

export function EventRewardsSectionComponent({
  rewards,
}: EventRewardsSectionProps) {
  return (
    <Box direction="column" gap={12} padding={24} surface="card">
      <Text as="h2" font="headerNav" fontSize={24}>
        Призы
      </Text>
      {rewards.length > 0 ? (
        rewards.map((reward) => (
          <Text key={reward.id} as="span">
            • {reward.title} (+{reward.points})
          </Text>
        ))
      ) : (
        <Text as="span">Призы пока не добавлены</Text>
      )}
    </Box>
  );
}
