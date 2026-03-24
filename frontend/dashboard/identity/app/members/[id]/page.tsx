import type { ReactNode } from 'react';
import { PublicProfileComponent } from '../../../fragments/public-profile/src';

const API_URL = process.env.NEXT_PUBLIC_API_URL ?? 'http://localhost:4000';

type PublicProfilePageProps = {
  params: Promise<{
    id: string;
  }>;
};

export default async function PublicProfilePage({
  params,
}: PublicProfilePageProps): Promise<ReactNode> {
  const { id } = await params;
  const response = await fetch(`${API_URL}/participants/${id}`, {
    cache: 'no-store',
  });
  const user = await response.json();

  return <PublicProfileComponent user={user} />;
}
