import { Box } from '@ui/layout';
import { Text } from '@ui/text';

export function OrganizerRewardsSection({ rewards }: { rewards: string[] }) {
  return (
    <Box direction="column" gap={10} style={{ flex: '1 1 520px', minWidth: 380 }}>
      <Box justifyContent="center" alignItems="center">
        <Text font="headerNav" fontSize={32}>
          Список призов
        </Text>
      </Box>
      <Box
        direction="column"
        gap={10}
        padding={10}
        borderRadius={20}
        backgroundColor="cardBg"
        style={{ boxShadow: '-3px 3px 3px rgba(0, 0, 0, 0.25)' }}
      >
        {rewards.map((reward) => (
          <Box
            key={reward}
            justifyContent="center"
            alignItems="center"
            padding={16}
            height={70}
            borderRadius={16}
            backgroundColor="cardBg"
          >
            <Text font="headerNav" fontSize={16}>
              {reward}
            </Text>
          </Box>
        ))}
      </Box>
    </Box>
  );
}
