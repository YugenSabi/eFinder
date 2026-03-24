import { Box } from '@ui/layout';
import { Text } from '@ui/text';
import type { ProfileViewModel } from '../model';

export function ProfileOverviewSection({
  profile,
}: {
  profile: ProfileViewModel;
}) {
  return (
    <Box gap={14} alignItems="stretch" style={{ flexWrap: 'wrap' }}>
      <Box
        width={290}
        minWidth={290}
        height={290}
        minHeight={290}
        border="1.5px solid #000000"
        borderRadius={28}
        backgroundColor="surface"
        justifyContent="center"
        alignItems="center"
      >
        <Text font="headerNav" fontSize={54}>
          {profile.firstName[0]}
          {profile.lastName[0]}
        </Text>
      </Box>
      <Box
        flexGrow={1}
        direction="column"
        gap={22}
        padding={18}
        borderRadius={28}
        backgroundColor="cardBg"
        shadow="soft"
        style={{ minWidth: 360, boxShadow: '-3px 3px 3px rgba(0, 0, 0, 0.25)' }}
      >
        <Box gap={22} justifyContent="space-between" alignItems="stretch" style={{ flexWrap: 'wrap' }}>
          <Box direction="column" gap={10} style={{ flex: '1 1 340px' }}>
            <Text font="headerNav" fontSize={20}>
              {profile.fullName}
            </Text>
            <Text font="footerText" fontSize={15}>
              {profile.roleLine}
            </Text>
            <Box gap={24} style={{ flexWrap: 'wrap' }}>
              <Box direction="column" gap={8} style={{ flex: '1 1 200px' }}>
                <Text font="headerNav" fontSize={15}>
                  Личная информация:
                </Text>
                {profile.personalInfo.map((item) => (
                  <Text key={item} font="footerText" fontSize={15}>
                    - {item}
                  </Text>
                ))}
              </Box>
              <Box direction="column" gap={8} style={{ flex: '1 1 220px' }}>
                <Text font="headerNav" fontSize={15}>
                  Ссылки
                </Text>
                {profile.links.map((item) => (
                  <Text key={item} font="footerText" fontSize={15}>
                    - {item}
                  </Text>
                ))}
              </Box>
            </Box>
            <Text font="headerNav" fontSize={15}>
              Баллов для кадрового резерва: {profile.reserveScore}
            </Text>
          </Box>
          <Box
            direction="column"
            gap={10}
            padding={14}
            borderRadius={24}
            style={{ flex: '1 1 360px', minWidth: 320 }}
          >
            <Text font="headerNav" fontSize={20}>
              Текущий рейтинг в общем зачете
            </Text>
            {profile.rating.map((item) => (
              <Box
                key={item.place}
                alignItems="center"
                justifyContent="space-between"
                padding={8}
                borderRadius={18}
                backgroundColor={item.highlight ? 'background' : 'cardBg'}
                border={item.highlight ? '1px solid rgba(68, 126, 173, 0.45)' : undefined}
                gap={12}
                style={{ boxShadow: '-3px 3px 3px rgba(0, 0, 0, 0.25)' }}
              >
                <Box
                  width={36}
                  height={36}
                  justifyContent="center"
                  alignItems="center"
                  borderRadius={10}
                  backgroundColor="surface"
                >
                  <Text font="headerNav" fontSize={16}>
                    {item.place}
                  </Text>
                </Box>
                <Box flexGrow={1} justifyContent="center" alignItems="center">
                  <Text font="headerNav" fontSize={16}>
                    {item.name}
                  </Text>
                </Box>
                <Box
                  minWidth={74}
                  height={36}
                  justifyContent="center"
                  alignItems="center"
                  borderRadius={10}
                  backgroundColor="surface"
                >
                  <Text font="headerNav" fontSize={18}>
                    {item.score}
                  </Text>
                </Box>
              </Box>
            ))}
          </Box>
        </Box>
      </Box>
    </Box>
  );
}
