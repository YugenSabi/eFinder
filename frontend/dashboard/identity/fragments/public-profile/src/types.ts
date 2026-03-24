export type PublicProfileView = {
  user: {
    id: string;
    email: string;
    firstName?: string | null;
    lastName?: string | null;
    age?: number | null;
    school?: string | null;
    headline?: string | null;
    city?: string | null;
    avatarUrl?: string | null;
    telegram?: string | null;
    githubUrl?: string | null;
    behanceUrl?: string | null;
    vkUrl?: string | null;
    participantProfile?: {
      portfolioSummary?: string | null;
      totalScore: number;
      currentRank?: number | null;
      reserveForecastScore?: number | null;
    } | null;
    participations: Array<{
      id: string;
      scoreAwarded: number;
      event: {
        id: string;
        title: string;
        city?: string | null;
        direction: string;
      };
    }>;
  };
};
