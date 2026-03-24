import type { AuthUser } from '../../../lib/auth/context';

export type RatingRow = {
  place: number;
  name: string;
  score: number;
  highlight?: boolean;
};

export type AchievementRow = {
  rank: number;
  title: string;
  score: string;
};

export type StatPoint = {
  label: string;
  value: number;
};

export type ProfileViewModel = {
  firstName: string;
  lastName: string;
  fullName: string;
  roleLine: string;
  personalInfo: string[];
  links: string[];
  reserveScore: number;
  rating: RatingRow[];
  achievements: AchievementRow[];
  stats: StatPoint[];
};

export function buildMockProfile(
  currentUser: NonNullable<AuthUser>,
): ProfileViewModel {
  const firstName = currentUser.firstName ?? 'Алексей';
  const lastName = currentUser.lastName ?? 'Несатый';
  const fullName = `${firstName} ${lastName}`.trim();

  return {
    firstName,
    lastName,
    fullName,
    roleLine:
      'IT 10 y.o. talent / C++ reverse engineer. Google, Microsoft, JetBrains worker',
    personalInfo: ['10 лет', 'Школа N998', currentUser.email, 'Москва'],
    links: [
      'Github: linus',
      'Telegram: @pavelDurob',
      'Behance: /efinder',
      'VK: vk.com/efinder',
    ],
    reserveScore: 104,
    rating: [
      { place: 6, name: 'Василий Беляев', score: 865},
      { place: 7, name: fullName, score: 834 },
      { place: 8, name: 'Егор Лебедев', score: 803 },
    ],
    achievements: [
      { rank: 1, title: 'Хакатон Кибер Рывок', score: '+122' },
      { rank: 2, title: 'Олимпиада по анализу данных', score: '+118' },
      { rank: 3, title: 'Городской кейс-чемпионат', score: '+96' },
      { rank: 4, title: 'IT Sprint: Security Track', score: '+122' },
      { rank: 5, title: 'Архитектурный интенсив', score: '+77' },
    ],
    stats: [
      { label: 'IT', value: 82 },
      { label: 'Media', value: 54 },
      { label: 'Social', value: 68 },
      { label: 'Edu', value: 94 },
      { label: 'Vol', value: 72 },
    ],
  };
}
