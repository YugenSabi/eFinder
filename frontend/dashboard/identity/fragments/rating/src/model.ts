export type RatingRow = {
  id: string;
  place: number;
  fullName: string;
  score: number;
};

export const ratingRows: RatingRow[] = [
  { id: '1', place: 1, fullName: 'Василий Беляев', score: 834 },
  { id: '2', place: 2, fullName: 'Алексей Несатый', score: 821 },
  { id: '3', place: 3, fullName: 'Егор Лебедев', score: 806 },
  { id: '4', place: 4, fullName: 'Мария Соколова', score: 799 },
  { id: '5', place: 5, fullName: 'Анна Миронова', score: 786 },
  { id: '6', place: 6, fullName: 'Илья Титов', score: 774 },
  { id: '7', place: 7, fullName: 'Василий Беляев', score: 834 },
  { id: '8', place: 8, fullName: 'Василий Беляев', score: 834 },
];
