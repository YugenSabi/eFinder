import type { ReactNode } from 'react';
import { notFound } from 'next/navigation';
import { EventDetailsComponent } from '../../../fragments/event-details/src';

const API_URL = process.env.NEXT_PUBLIC_API_URL ?? 'http://localhost:4000';

type EventDetailsPageProps = {
  params: Promise<{
    id: string;
  }>;
};

export default async function EventDetailsPage({
  params,
}: EventDetailsPageProps): Promise<ReactNode> {
  const { id } = await params;
  const response = await fetch(`${API_URL}/events/${id}`, {
    cache: 'no-store',
  });

  if (!response.ok) {
    notFound();
  }

  const event = await response.json();

  return <EventDetailsComponent event={event} />;
}
