export type ProfileRatingRow = {
  place: number;
  name: string;
  score: number;
  highlight?: boolean;
};

export type ProfileAchievement = {
  rank: number;
  title: string;
  score: number;
};

export type ProfileStat = {
  label: string;
  value: number;
};

export type ParticipantProfileState = {
  totalScore: number;
  currentRank?: number | null;
  reserveForecastScore: number;
  portfolioSummary?: string | null;
};

export type OrganizerRecentEvent = {
  id: string;
  title: string;
  city?: string | null;
  startsAt: string;
  imageUrl?: string | null;
};

export type OrganizerProfileState = {
  organizationName?: string | null;
  description?: string | null;
  websiteUrl?: string | null;
  telegram?: string | null;
  vkUrl?: string | null;
  logoUrl?: string | null;
  status?: 'PENDING' | 'APPROVED' | 'REJECTED';
  trustScore: number;
  totalEvents: number;
  organizationRank?: number | null;
  commonRewardTypes: string[];
  recentEvents: OrganizerRecentEvent[];
};

export type AuthUser = {
  id: string;
  email: string;
  isVerified: boolean;
  firstName?: string | null;
  lastName?: string | null;
  age?: number | null;
  city?: string | null;
  headline?: string | null;
  school?: string | null;
  telegram?: string | null;
  githubUrl?: string | null;
  behanceUrl?: string | null;
  vkUrl?: string | null;
  avatarUrl?: string | null;
  role?: string;
  organizerProfile?: OrganizerProfileState | null;
  participantProfile?: ParticipantProfileState | null;
  achievements?: ProfileAchievement[];
  stats?: ProfileStat[];
  rating?: ProfileRatingRow[];
} | null;
