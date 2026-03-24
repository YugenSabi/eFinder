'use client';

import {Box} from '@ui/layout';
import {Text} from '@ui/text';
import type {PublicProfileView} from '../types';

type PublicProfileHeaderSectionProps = PublicProfileView;

function buildPersonalInfo(user: PublicProfileView['user']) {
  return [
    user.age !== null && user.age !== undefined ? `${user.age} лет` : null,
    user.school ?? null,
    user.city ?? null,
  ].filter(Boolean) as string[];
}

function buildLinks(user: PublicProfileView['user']) {
  return [
    user.githubUrl ? `GitHub: ${user.githubUrl}` : null,
    user.telegram ? `Telegram: ${user.telegram}` : null,
    user.behanceUrl ? `Behance: ${user.behanceUrl}` : null,
    user.vkUrl ? `VK: ${user.vkUrl}` : null,
  ].filter(Boolean) as string[];
}

export function PublicProfileHeaderSectionComponent({
  user,
}: PublicProfileHeaderSectionProps) {
  const fullName =
    [user.firstName, user.lastName].filter(Boolean).join(' ').trim() ||
    user.email;
  const personalInfo = buildPersonalInfo(user);
  const links = buildLinks(user);

  return (
    <Box gap={14} alignItems="stretch" style={{flexWrap: 'wrap'}}>
      <Box
        width={260}
        minWidth={260}
        height={260}
        minHeight={260}
        border="1.5px solid #000000"
        borderRadius={24}
        backgroundColor="surface"
        overflow="hidden"
        justifyContent="center"
        alignItems="center"
      >
        {user.avatarUrl ? (
          <img
            src={user.avatarUrl}
            alt={fullName}
            style={{width: '100%', height: '100%', objectFit: 'cover'}}
          />
        ) : (
          <Text font="headerNav" fontSize={44}>
            {fullName[0]}
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

            {user.headline ? (
              <Text font="footerText" fontSize={13}>
                {user.headline}
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
          </Box>

          <Box
            direction="column"
            gap={10}
            padding={10}
            borderRadius={20}
            style={{flex: '1 1 320px', minWidth: 280}}
          >
            <Text font="headerNav" fontSize={18}>
              Профиль участника
            </Text>
            <Box
              alignItems="center"
              justifyContent="space-between"
              padding={10}
              borderRadius={16}
              backgroundColor="cardBg"
              gap={12}
              style={{boxShadow: '-3px 3px 3px rgba(0, 0, 0, 0.25)'}}
            >
              <Text font="footerText" fontSize={15}>
                Почта
              </Text>
              <Text font="headerNav" fontSize={15}>
                {user.email}
              </Text>
            </Box>
            <Box
              alignItems="center"
              justifyContent="space-between"
              padding={8}
              borderRadius={16}
              backgroundColor="cardBg"
              gap={12}
              style={{boxShadow: '-3px 3px 3px rgba(0, 0, 0, 0.25)'}}
            >
              <Text font="footerText" fontSize={15}>
                Всего баллов
              </Text>
              <Text font="headerNav" fontSize={15}>
                {user.participantProfile?.totalScore ?? 0}
              </Text>
            </Box>
            <Box
              alignItems="center"
              justifyContent="space-between"
              padding={8}
              borderRadius={16}
              backgroundColor="cardBg"
              gap={12}
              style={{boxShadow: '-3px 3px 3px rgba(0, 0, 0, 0.25)'}}
            >
              <Text font="footerText" fontSize={15}>
                Место в рейтинге
              </Text>
              <Text font="headerNav" fontSize={15}>
                {user.participantProfile?.currentRank ?? 'Нет данных'}
              </Text>
            </Box>
            <Box
              alignItems="center"
              justifyContent="space-between"
              padding={8}
              borderRadius={16}
              backgroundColor="cardBg"
              gap={12}
              style={{boxShadow: '-3px 3px 3px rgba(0, 0, 0, 0.25)'}}
            >
              <Text font="footerText" fontSize={15}>
                Баллов для кадрового резерва
              </Text>
              <Text font="headerNav" fontSize={15}>
                {user.participantProfile?.reserveForecastScore ?? 0}
              </Text>
            </Box>
          </Box>
        </Box>
      </Box>
    </Box>
  );
}
