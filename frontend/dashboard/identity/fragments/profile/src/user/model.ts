import type {
  AuthUser,
  ProfileAchievement,
  ProfileRatingRow,
  ProfileStat,
} from '../../../../lib/auth/types';

export type RatingRow = {
  place: number;
  name: string;
  score: number;
  highlight?: boolean;
};

export type AchievementRow = {
  rank: number;
  title: string;
  score: number;
};

export type StatPoint = {
  label: string;
  value: number;
};

export type ProfileViewModel = {
  avatarUrl?: string | null;
  firstName: string;
  lastName: string;
  fullName: string;
  roleLine: string;
  description: string;
  personalInfo: string[];
  links: string[];
  reserveScore: number;
  rating: RatingRow[];
  achievements: AchievementRow[];
  stats: StatPoint[];
};

export function buildProfileViewModel(
  currentUser: NonNullable<AuthUser>,
): ProfileViewModel {
  const firstName = currentUser.firstName ?? '';
  const lastName = currentUser.lastName ?? '';
  const fullName = `${firstName} ${lastName}`.trim();
  const achievements = (currentUser.achievements ?? []).map(
    (item: ProfileAchievement) => ({
      rank: item.rank,
      title: item.title,
      score: item.score,
    }),
  );
  const rating = (currentUser.rating ?? []).map((item: ProfileRatingRow) => ({
    place: item.place,
    name: item.name,
    score: item.score,
    highlight: item.highlight,
  }));
  const stats = (currentUser.stats ?? []).map((item: ProfileStat) => ({
    label: item.label,
    value: item.value,
  }));
  const personalInfo = [
    currentUser.age !== null && currentUser.age !== undefined
      ? `${currentUser.age} лет`
      : null,
    currentUser.school ?? null,
    currentUser.email,
    currentUser.city ?? null,
  ].filter(Boolean) as string[];
  const links = [
    currentUser.telegram ? `Telegram: ${currentUser.telegram}` : null,
    currentUser.githubUrl ? `Github: ${currentUser.githubUrl}` : null,
    currentUser.behanceUrl ? `Behance: ${currentUser.behanceUrl}` : null,
    currentUser.vkUrl ? `VK: ${currentUser.vkUrl}` : null,
  ].filter(Boolean) as string[];

  return {
    avatarUrl: currentUser.avatarUrl ?? null,
    firstName,
    lastName,
    fullName: fullName || currentUser.email,
    roleLine: currentUser.headline ?? '',
    description: currentUser.participantProfile?.portfolioSummary ?? '',
    personalInfo,
    links,
    reserveScore: currentUser.participantProfile?.reserveForecastScore ?? 0,
    rating,
    achievements,
    stats,
  };
}
