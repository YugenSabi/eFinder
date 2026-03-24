import type { ReactNode } from 'react';
import { OrganizationProfileComponent } from '../../../fragments/organization-profile/src';

const API_URL = process.env.NEXT_PUBLIC_API_URL ?? 'http://localhost:4000';

type OrganizationProfilePageProps = {
  params: Promise<{
    id: string;
  }>;
};

export default async function OrganizationProfilePage({
  params,
}: OrganizationProfilePageProps): Promise<ReactNode> {
  const { id } = await params;
  const [profileResponse, eventsResponse] = await Promise.all([
    fetch(`${API_URL}/organizers/${id}/profile`, {
      cache: 'no-store',
    }),
    fetch(`${API_URL}/events`, {
      cache: 'no-store',
    }),
  ]);

  const organization = await profileResponse.json();
  const events = (await eventsResponse.json()).filter(
    (event: { organizer: { id: string } }) => event.organizer.id === id,
  );

  return <OrganizationProfileComponent organization={organization} events={events} />;
}
