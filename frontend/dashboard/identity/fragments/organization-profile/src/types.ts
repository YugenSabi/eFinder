export type OrganizationProfileView = {
  organization: {
    id: string;
    organizerProfile?: {
      organizationName?: string | null;
      description?: string | null;
      websiteUrl?: string | null;
      telegram?: string | null;
      vkUrl?: string | null;
      logoUrl?: string | null;
      trustScore: number;
      totalEvents: number;
      organizationRank?: number | null;
      commonRewardTypes: string[];
    } | null;
  };
  events: Array<{
    id: string;
    title: string;
    city?: string | null;
    startsAt: string;
    imageUrl?: string | null;
  }>;
};
