export type PublicProfileView = {
  user: {
    id: string;
    email: string;
    firstName?: string | null;
    lastName?: string | null;
    headline?: string | null;
    city?: string | null;
    avatarUrl?: string | null;
    participantProfile?: {
      portfolioSummary?: string | null;
      totalScore: number;
      currentRank?: number | null;
    } | null;
    participations: Array<{
      id: string;
      event: {
        id: string;
        title: string;
      };
    }>;
  };
};
