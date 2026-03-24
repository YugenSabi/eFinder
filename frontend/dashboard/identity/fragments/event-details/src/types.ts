export type EventDetailsView = {
  event: {
    id: string;
    title: string;
    description: string;
    city?: string | null;
    direction: string;
    difficulty: string;
    startsAt: string;
    imageUrl?: string | null;
    organizer: {
      id: string;
      firstName?: string | null;
      lastName?: string | null;
      email: string;
      organizerProfile?: {
        organizationName?: string | null;
      } | null;
    };
    rewards: Array<{
      id: string;
      title: string;
      description?: string | null;
      points: number;
    }>;
    participations: Array<{
      id: string;
      status: string;
      participant: {
        id: string;
      };
    }>;
  };
};
