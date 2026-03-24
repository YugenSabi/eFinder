'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { MainLayoutComponent } from '@identity/main-layout';
import { Box } from '@ui/layout';
import { useAuth } from '../../../lib/auth/context';
import { EventHeroSectionComponent } from './hero-section/component';
import { EventOrganizerSectionComponent } from './organizer-section/component';
import { EventRewardsSectionComponent } from './rewards-section/component';
import type { EventDetailsView } from './types';

const API_URL = process.env.NEXT_PUBLIC_API_URL ?? 'http://localhost:4000';

export function EventDetailsComponent({ event }: EventDetailsView) {
  const router = useRouter();
  const { currentUser } = useAuth();
  const [registering, setRegistering] = useState(false);
  const [message, setMessage] = useState<string | null>(null);
  const [myStatus, setMyStatus] = useState<string | null>(null);

  useEffect(() => {
    if (!currentUser) {
      return;
    }

    fetch(`${API_URL}/participations/event/${event.id}/me`, {
      credentials: 'include',
      headers: {
        Accept: 'application/json',
      },
      cache: 'no-store',
    })
      .then(async (response) => {
        if (!response.ok) {
          return null;
        }
        return response.json();
      })
      .then((payload) => {
        if (payload?.status) {
          setMyStatus(payload.status);
        }
      })
      .catch(() => setMyStatus(null));
  }, [currentUser, event.id]);

  const organizerHref = event.organizer.organizerProfile
    ? `/organizations/${event.organizer.id}`
    : `/members/${event.organizer.id}`;

  return (
    <MainLayoutComponent>
      <Box as="main" direction="column" gap={24} width="$full" paddingTop={32} paddingBottom={40}>
        <EventHeroSectionComponent
          event={event}
          myStatus={myStatus}
          message={message}
          registering={registering}
          onRegister={async () => {
            if (!currentUser) {
              router.push('/auth/login');
              return;
            }

            try {
              setRegistering(true);
              setMessage(null);
              const response = await fetch(`${API_URL}/participations`, {
                method: 'POST',
                credentials: 'include',
                headers: {
                  Accept: 'application/json',
                  'Content-Type': 'application/json',
                },
                body: JSON.stringify({ eventId: event.id }),
              });

              const payload = await response.json().catch(() => null);

              if (!response.ok) {
                throw new Error(
                  payload && typeof payload === 'object' && 'message' in payload
                    ? String(payload.message)
                    : 'Не удалось отправить заявку',
                );
              }

              setMyStatus(payload.status);
              setMessage('Заявка отправлена организатору');
            } catch (error) {
              setMessage(error instanceof Error ? error.message : 'Не удалось отправить заявку');
            } finally {
              setRegistering(false);
            }
          }}
        />
        <EventOrganizerSectionComponent
          organizer={event.organizer}
          onOpenProfile={() => router.push(organizerHref)}
        />
        <EventRewardsSectionComponent rewards={event.rewards} />
      </Box>
    </MainLayoutComponent>
  );
}
