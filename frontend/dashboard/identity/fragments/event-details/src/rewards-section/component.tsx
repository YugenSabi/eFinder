import {Box} from '@ui/layout';
import {Text} from '@ui/text';
import type {EventDetailsView} from '../types';

type EventRewardsSectionProps = {
  rewards: EventDetailsView['event']['rewards'];
};

export function EventRewardsSectionComponent({
  rewards,
}: EventRewardsSectionProps) {
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
        Призы
      </Text>

      {rewards.length > 0 ? (
        <Box direction="column" gap={10}>
          {rewards.map((reward, index) => (
            <Box
              key={reward.id}
              justifyContent="space-between"
              alignItems="center"
              gap={14}
              padding={14}
              borderRadius={18}
              backgroundColor="cardBg"
              style={{boxShadow: '-2px 2px 4px rgba(0, 0, 0, 0.12)'}}
            >
              <Box
                minWidth={40}
                height={40}
                borderRadius={10}
                backgroundColor="background"
                justifyContent="center"
                alignItems="center"
              >
                <Text font="headerNav" fontSize={18}>
                  {index + 1}
                </Text>
              </Box>

              <Box direction="column" gap={4} flexGrow={1} style={{minWidth: 0}}>
                <Text font="headerNav" fontSize={18}>
                  {reward.title}
                </Text>
                {reward.description ? (
                  <Text font="footerText" fontSize={14} style={{lineHeight: 1.35}}>
                    {reward.description}
                  </Text>
                ) : null}
              </Box>

              <Box
                minWidth={84}
                height={40}
                borderRadius={10}
                backgroundColor="background"
                justifyContent="center"
                alignItems="center"
              >
                <Text font="headerNav" fontSize={18}>
                  +{reward.points}
                </Text>
              </Box>
            </Box>
          ))}
        </Box>
      ) : (
        <Text font="footerText" fontSize={15}>
          Призы пока не добавлены
        </Text>
      )}
    </Box>
  );
}
