import { Box } from '@ui/layout';
import { Text } from '@ui/text';
import type { AchievementRow } from './model';

export function ProfileAchievementsSection({
  achievements,
}: {
  achievements: AchievementRow[];
}) {
  return (
    <Box direction="column" gap={12} style={{ flex: '1 1 520px', minWidth: 380 }}>
      <Box justifyContent="center" alignItems="center">
        <Text as="h2" font="headerNav" fontSize={32}>
          Портфолио достижений
        </Text>
      </Box>
      <Box
        direction="column"
        gap={10}
        padding={10}
        borderRadius={18}
        backgroundColor="cardBg"
        style={{ boxShadow: '-3px 3px 3px rgba(0, 0, 0, 0.25)' }}
      >
        {achievements.length === 0 ? (
          <Text font="footerText" fontSize={15}>
            Пока нет подтвержденных достижений
          </Text>
        ) : (
          achievements.map((item, index) => (
            <Box
              key={`${item.title}-${index}`}
              alignItems="center"
              justifyContent="space-between"
              padding={12}
              borderRadius={16}
              backgroundColor="cardBg"
              gap={12}
            >
              <Box
                width={42}
                height={42}
                justifyContent="center"
                alignItems="center"
                borderRadius={12}
                backgroundColor="surface"
              >
                <Text font="headerNav" fontSize={16}>
                  {item.rank}
                </Text>
              </Box>
              <Box flexGrow={1} justifyContent="center" alignItems="center">
                <Text font="headerNav" fontSize={16}>
                  {item.title}
                </Text>
              </Box>
              <Box
                minWidth={70}
                height={42}
                justifyContent="center"
                alignItems="center"
                borderRadius={12}
                backgroundColor="surface"
              >
                <Text font="headerNav" fontSize={16}>
                  +{item.score}
                </Text>
              </Box>
            </Box>
          ))
        )}
      </Box>
    </Box>
  );
}
