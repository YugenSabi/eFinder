'use client';

import {Box} from '@ui/layout';
import {Text} from '@ui/text';
import type {PublicProfileView} from '../types';

type PublicProfileAchievementsSectionProps = Pick<
  PublicProfileView['user'],
  'participations'
>;

export function PublicProfileAchievementsSectionComponent({
  participations,
}: PublicProfileAchievementsSectionProps) {
  const achievements = [...participations]
    .sort((left, right) => right.scoreAwarded - left.scoreAwarded)
    .slice(0, 5);

  return (
    <Box direction="column" gap={12} style={{flex: '1 1 520px', minWidth: 380}}>
      <Box justifyContent="center" alignItems="center">
        <Text font="headerNav" fontSize={32}>
          Портфолио достижений
        </Text>
      </Box>
      <Box
        direction="column"
        gap={10}
        padding={10}
        borderRadius={18}
        backgroundColor="cardBg"
        style={{boxShadow: '-3px 3px 3px rgba(0, 0, 0, 0.25)'}}
      >
        {achievements.length === 0 ? (
          <Text font="footerText" fontSize={15}>
            Пока нет подтвержденных достижений
          </Text>
        ) : (
          achievements.map((item, index) => (
            <Box
              key={item.id}
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
                  {index + 1}
                </Text>
              </Box>
              <Box flexGrow={1} justifyContent="center" alignItems="center">
                <Text font="headerNav" fontSize={16}>
                  {item.event.title}
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
                  +{item.scoreAwarded}
                </Text>
              </Box>
            </Box>
          ))
        )}
      </Box>
    </Box>
  );
}
