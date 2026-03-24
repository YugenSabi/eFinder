export type AdminUser = {
  id: string;
  email: string;
  firstName?: string | null;
  lastName?: string | null;
  city?: string | null;
  age?: number | null;
  role?: string;
  organizerProfile?: {
    organizationName?: string | null;
    status?: 'PENDING' | 'APPROVED' | 'REJECTED';
  } | null;
};

export type AdminPageData = {
  users: AdminUser[];
  organizerRequests: AdminUser[];
};
