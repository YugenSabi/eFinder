import {Box} from '@ui/layout';
import {Text} from '@ui/text';
import type {AuthUser, ProfileRatingRow} from '../../../../../lib/auth/types';

type ProfileOverviewSectionProps = {
  currentUser: NonNullable<AuthUser>;
};

function buildPersonalInfo(currentUser: NonNullable<AuthUser>) {
  return [
    currentUser.age !== null && currentUser.age !== undefined
      ? `${currentUser.age} лет`
      : null,
    currentUser.school ?? null,
    currentUser.city ?? null,
  ].filter(Boolean) as string[];
}

function buildLinks(currentUser: NonNullable<AuthUser>) {
  return [
    currentUser.githubUrl ? `GitHub: ${currentUser.githubUrl}` : null,
    currentUser.telegram ? `Telegram: ${currentUser.telegram}` : null,
    currentUser.behanceUrl ? `Behance: ${currentUser.behanceUrl}` : null,
    currentUser.vkUrl ? `VK: ${currentUser.vkUrl}` : null,
  ].filter(Boolean) as string[];
}

function RatingRow({item}: {item: ProfileRatingRow}) {
  return (
    <Box
      alignItems="center"
      justifyContent="space-between"
      padding={8}
      borderRadius={16}
      backgroundColor="cardBg"
      gap={12}
      style={{boxShadow: '-3px 3px 3px rgba(0, 0, 0, 0.25)'}}
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
        <Text font={item.highlight ? 'headerNav' : 'footerText'} fontSize={16}>
          {item.name}
        </Text>
      </Box>
      <Box
        minWidth={72}
        height={36}
        justifyContent="center"
        alignItems="center"
        borderRadius={10}
        backgroundColor="surface"
      >
        <Text font="headerNav" fontSize={16}>
          {item.score}
        </Text>
      </Box>
    </Box>
  );
}

export function ProfileOverviewSection({
  currentUser,
}: ProfileOverviewSectionProps) {
  const firstName = currentUser.firstName ?? '';
  const lastName = currentUser.lastName ?? '';
  const fullName = `${firstName} ${lastName}`.trim() || currentUser.email;
  const personalInfo = buildPersonalInfo(currentUser);
  const links = buildLinks(currentUser);
  const rating = currentUser.rating ?? [];

  return (
    <Box gap={14} alignItems="stretch" style={{flexWrap: 'wrap'}}>
      <Box
        width={320}
        minWidth={320}
        height={320}
        minHeight={320}
        border="1.5px solid #000000"
        borderRadius={24}
        backgroundColor="surface"
        justifyContent="center"
        alignItems="center"
        overflow="hidden"
      >
        {currentUser.avatarUrl ? (
          <img
            src={currentUser.avatarUrl}
            alt={fullName}
            style={{width: '100%', height: '100%', objectFit: 'cover'}}
          />
        ) : (
          <Text font="headerNav" fontSize={54}>
            {(firstName[0] ?? fullName[0] ?? '').toUpperCase()}
            {(lastName[0] ?? '').toUpperCase()}
          </Text>
        )}
      </Box>

      <Box
        flexGrow={1}
        direction="column"
        gap={18}
        padding={14}
        borderRadius={24}
        backgroundColor="cardBg"
        style={{minWidth: 360, boxShadow: '-3px 3px 3px rgba(0, 0, 0, 0.25)'}}
      >
        <Box
          gap={18}
          justifyContent="space-between"
          alignItems="stretch"
          style={{flexWrap: 'wrap'}}
        >
          <Box direction="column" gap={8} style={{flex: '1 1 340px'}}>
            <Text font="headerNav" fontSize={18}>
              {fullName}
            </Text>

            {currentUser.headline ? (
              <Text font="footerText" fontSize={13}>
                {currentUser.headline}
              </Text>
            ) : null}

            {currentUser.participantProfile?.portfolioSummary ? (
              <Text font="footerText" fontSize={13}>
                {currentUser.participantProfile.portfolioSummary}
              </Text>
            ) : null}

            <Box gap={24} style={{flexWrap: 'wrap'}}>
              <Box direction="column" gap={8} style={{flex: '1 1 200px'}}>
                <Text font="headerNav" fontSize={14}>
                  Личная информация:
                </Text>
                {personalInfo.length > 0 ? (
                  personalInfo.map((item) => (
                    <Text key={item} font="footerText" fontSize={13}>
                      • {item}
                    </Text>
                  ))
                ) : (
                  <Text font="footerText" fontSize={13}>
                    Данные пока не заполнены
                  </Text>
                )}
              </Box>

              <Box direction="column" gap={8} style={{flex: '1 1 220px'}}>
                <Text font="headerNav" fontSize={14}>
                  Ссылки:
                </Text>
                {links.length > 0 ? (
                  links.map((item) => (
                    <Text key={item} font="footerText" fontSize={13}>
                      • {item}
                    </Text>
                  ))
                ) : (
                  <Text font="footerText" fontSize={13}>
                    Ссылки пока не добавлены
                  </Text>
                )}
              </Box>
            </Box>

            <Box direction="column" gap={6}>
              <Text font="headerNav" fontSize={14}>
                Баллов для кадрового резерва:
                {' '}
                {currentUser.participantProfile?.reserveForecastScore ?? 0}
              </Text>
              <Text font="footerText" fontSize={13}>
                Почта:
                {' '}
                {currentUser.email}
              </Text>
              {currentUser.participantProfile?.currentRank ? (
                <Text font="footerText" fontSize={13}>
                  Место в рейтинге:
                  {' '}
                  {currentUser.participantProfile.currentRank}
                </Text>
              ) : null}
            </Box>
          </Box>

          <Box
            direction="column"
            gap={10}
            padding={10}
            borderRadius={20}
            style={{flex: '1 1 360px', minWidth: 320}}
          >
            <Text font="headerNav" fontSize={18}>
              Текущий рейтинг в общем зачете
            </Text>
            {rating.length === 0 ? (
              <Text font="footerText" fontSize={13}>
                Пока нет данных по рейтингу
              </Text>
            ) : (
              rating.map((item) => <RatingRow key={item.place} item={item} />)
            )}
          </Box>
        </Box>
      </Box>
    </Box>
  );
}
