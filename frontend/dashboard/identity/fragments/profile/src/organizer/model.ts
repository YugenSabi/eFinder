import type { AuthUser } from '../../../../lib/auth/context';

export type OrganizerRatingRow = {
  place: number;
  name: string;
  score: number;
  highlight?: boolean;
};

export type OrganizerEvent = {
  id: string;
  title: string;
  description: string;
  tags: string[];
};

export type OrganizerProfileViewModel = {
  companyName: string;
  description: string;
  links: string[];
  trustRating: number;
  completedEventsCount: number;
  rating: OrganizerRatingRow[];
  rewards: string[];
  recentEvents: OrganizerEvent[];
};

export function buildMockOrganizerProfile(
  currentUser: NonNullable<AuthUser>,
): OrganizerProfileViewModel {
  const companyName = currentUser.firstName ? currentUser.firstName.toUpperCase() : 'АЛЬФА-БАНК';

  return {
    companyName,
    description: 'Описание организатора',
    links: ['alpha-bank.ru', `support@${currentUser.email.split('@')[1] ?? 'alphabank.ru'}`],
    trustRating: 4.87,
    completedEventsCount: 230,
    rating: [
      { place: 6, name: 'Aviasales', score: 4.98 },
      { place: 7, name: companyName, score: 4.87, highlight: true },
      { place: 8, name: 'Яндекс', score: 2.76 },
    ],
    rewards: [
      'Денежный приз',
      'Мерч компании',
      'Стажировка',
      'Баллы при поступлении',
      'Приглашение на работу',
    ],
    recentEvents: [
      {
        id: '1',
        title: 'Название мероприятия',
        description:
          'Описание мероприятия как заглушка для будущего бекенда. Здесь будет короткая выжимка о событии и формате участия.',
        tags: ['Тверь', '18 февраля', 'IT', 'AI'],
      },
      {
        id: '2',
        title: 'Название мероприятия',
        description:
          'Описание мероприятия как заглушка для будущего бекенда. Здесь будет короткая выжимка о событии и формате участия.',
        tags: ['Тверь', '18 февраля', 'IT', 'AI'],
      },
      {
        id: '3',
        title: 'Название мероприятия',
        description:
          'Описание мероприятия как заглушка для будущего бекенда. Здесь будет короткая выжимка о событии и формате участия.',
        tags: ['Москва', '24 марта', 'IT', 'Офлайн'],
      },
    ],
  };
}
