import { Box } from '@ui/layout';
import { Text } from '@ui/text';
import type { OrganizerProfileViewModel } from '../model';

function TrustStars() {
  return (
    <svg width="90" height="16" viewBox="0 0 90 16" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
      {Array.from({ length: 5 }, (_, index) => (
        <path
          key={index}
          d={`M${8.91749 + index * 17} 0H${6.91749 + index * 17}L${5.4304 + index * 17} 4.57681L${0.618034 + index * 17} 4.57682L${index * 17} 6.47893L${3.89329 + index * 17} 9.30756L${2.40621 + index * 17} 13.8843L${4.02425 + index * 17} 15.0599L${7.9175 + index * 17} 12.2313L${11.8108 + index * 17} 15.0599L${13.4288 + index * 17} 13.8843L${11.9417 + index * 17} 9.30754L${15.835 + index * 17} 6.47892L${15.2169 + index * 17} 4.57681H${10.4046 + index * 17}L${8.91749 + index * 17} 0Z`}
          fill="#FFF958"
        />
      ))}
    </svg>
  );
}

export function OrganizerOverviewSection({
  profile,
}: {
  profile: OrganizerProfileViewModel;
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
      />
      <Box
        flexGrow={1}
        direction="column"
        gap={18}
        padding={18}
        borderRadius={28}
        backgroundColor="cardBg"
        style={{ minWidth: 360, boxShadow: '-3px 3px 3px rgba(0, 0, 0, 0.25)' }}
      >
        <Box gap={22} justifyContent="space-between" alignItems="stretch" style={{ flexWrap: 'wrap' }}>
          <Box direction="column" gap={10} style={{ flex: '1 1 320px' }}>
            <Text font="headerNav" fontSize={20}>
              {profile.companyName}
            </Text>
            <Text font="footerText" fontSize={15}>
              {profile.description}
            </Text>
            <Box gap={24} style={{ flexWrap: 'wrap' }}>
              <Box direction="column" gap={8} style={{ flex: '1 1 180px' }}>
                <Text font="headerNav" fontSize={15}>
                  Ссылки:
                </Text>
                {profile.links.map((item) => (
                  <Text key={item} font="footerText" fontSize={15}>
                    - {item}
                  </Text>
                ))}
              </Box>
              <Box direction="column" gap={8} style={{ flex: '1 1 180px' }}>
                <Text font="headerNav" fontSize={15}>
                  Рейтинг доверия:
                </Text>
                <Box alignItems="center" gap={8}>
                  <TrustStars />
                  <Text font="headerNav" fontSize={16}>
                    {profile.trustRating.toFixed(2)}
                  </Text>
                </Box>
              </Box>
            </Box>
            <Text font="headerNav" fontSize={15}>
              Количество проведенных мероприятий: {profile.completedEventsCount}
            </Text>
          </Box>

          <Box direction="column" gap={10} style={{ flex: '1 1 360px', minWidth: 320 }}>
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
                backgroundColor={'cardBg'}
                gap={12}
                style={{ boxShadow: '-3px 3px 3px rgba(0, 0, 0, 0.25)' }}
              >
                <Box
                  width={36}
                  height={36}
                  justifyContent="center"
                  alignItems="center"
                  borderRadius={10}
                  backgroundColor="cardBg"
                >
                  <Text font="headerNav" fontSize={16}>
                    {item.place}
                  </Text>
                </Box>
                <Box flexGrow={1} justifyContent="center" alignItems="center">
                  <Text font={item.highlight ? 'headerNav' : 'footerText'} fontSize={16}>
                    {item.name}
                  </Text>
                </Box>
                <Box
                  minWidth={74}
                  height={36}
                  justifyContent="center"
                  alignItems="center"
                  borderRadius={10}
                  backgroundColor="cardBg"
                >
                  <Text font="headerNav" fontSize={18}>
                    {item.score.toFixed(2)}
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
