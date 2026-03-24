export type ObserverParticipant = {
  id: string;
  email: string;
  firstName?: string | null;
  lastName?: string | null;
  city?: string | null;
  age?: number | null;
  eventsCount: number;
  averageScore: number;
  totalScore: number;
  isFavorite: boolean;
};

export type ObserverFilters = {
  city: string;
  ageFrom: string;
  ageTo: string;
  eventsFrom: string;
  eventsTo: string;
  averageScoreFrom: string;
  averageScoreTo: string;
  favoritesOnly: boolean;
};
