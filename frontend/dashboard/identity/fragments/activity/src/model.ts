export type ActivityEvent = {
  id: string;
  title: string;
  tags: string[];
  imageUrl?: string;
  occurredAt: string;
};

export type ActivityPoint = {
  label: string;
  value: number;
};

export const recentEvents: ActivityEvent[] = [
  { id: '1', title: 'Название мероприятия', tags: ['Тверь', '18 февраля'], occurredAt: '2026-02-18' },
  { id: '2', title: 'Название мероприятия', tags: ['Москва', '12 февраля'], occurredAt: '2026-02-12' },
  { id: '3', title: 'Название мероприятия', tags: ['IT', '10 февраля'], occurredAt: '2026-02-10' },
  { id: '4', title: 'Название мероприятия', tags: ['AI', '08 февраля'], occurredAt: '2026-02-08' },
  { id: '5', title: 'Название мероприятия', tags: ['Онлайн', '03 февраля'], occurredAt: '2026-02-03' },
  { id: '6', title: 'Название мероприятия', tags: ['Офлайн', '28 января'], occurredAt: '2026-01-28' },
];

export const popularTags = ['IT', 'AI', 'Москва', 'Санкт-Петербург', 'Онлайн', 'Офлайн'];

export const activitySeries: ActivityPoint[] = [
  { label: '23 мар', value: 0 },
  { label: '30 мар', value: 100 },
  { label: '6 апр', value: 114 },
  { label: '13 апр', value: 120 },
  { label: '20 апр', value: 130 },
  { label: '27 апр', value: 124 },
  { label: '4 май', value: 118 },
  { label: '11 май', value: 145 },
  { label: '18 май', value: 170 },
];
