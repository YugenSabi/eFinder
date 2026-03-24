export type OrganizerUser = {
  id: string;
  email: string;
  firstName?: string | null;
  lastName?: string | null;
  city?: string | null;
  role?: string;
};

export type PendingParticipation = {
  id: string;
  status: string;
  participant: {
    id: string;
    email: string;
    firstName?: string | null;
    lastName?: string | null;
  };
  event: {
    id: string;
    title: string;
  };
};

export type EventFormPayload = {
  title: string;
  description: string;
  city: string;
  direction: string;
  difficulty: string;
  startsAt: string;
  endsAt: string;
  basePoints: string;
  rewardSummary: string;
  organizerId: string;
  imageUrl: string;
};
