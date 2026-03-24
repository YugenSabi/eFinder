export type AdminUser = {
  id: string;
  email: string;
  firstName?: string | null;
  lastName?: string | null;
  city?: string | null;
  age?: number | null;
  role?: string;
};

export type AdminPageData = {
  users: AdminUser[];
};
