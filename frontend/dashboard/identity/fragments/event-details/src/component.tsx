'use client';

import {useEffect, useState} from 'react';
import {useRouter} from 'next/navigation';
import {MainLayoutComponent} from '@identity/main-layout';
import {Box} from '@ui/layout';
import {useAuth} from '../../../lib/auth/context';
import {EventHeroSectionComponent} from './hero-section/component';
import {EventOrganizerSectionComponent} from './organizer-section/component';
import {EventRewardsSectionComponent} from './rewards-section/component';
import type {EventDetailsView} from './types';

const API_URL = process.env.NEXT_PUBLIC_API_URL ?? 'http://localhost:4000';

export function EventDetailsComponent({event}: EventDetailsView) {
  const router = useRouter();
  const {currentUser} = useAuth();
  const [registering, setRegistering] = useState(false);
  const [message, setMessage] = useState<string | null>(null);
  const [myStatus, setMyStatus] = useState<string | null>(null);
  const isOwner = currentUser?.id === event.organizer.id;

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
      <Box as="main" direction="column" gap={22} width="$full" paddingTop={24} paddingBottom={40}>
        <EventHeroSectionComponent
          event={event}
          myStatus={myStatus}
          isOwner={Boolean(isOwner)}
          message={message}
          registering={registering}
          onRegister={async () => {
            if (!currentUser) {
              router.push('/auth/login');
              return;
            }

            if (isOwner) {
              setMessage('Организатор не может зарегистрироваться на своё мероприятие');
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
                body: JSON.stringify({eventId: event.id}),
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

        <Box
          width="$full"
          display="grid"
          style={{
            gridTemplateColumns: 'minmax(0, 0.9fr) minmax(0, 1.1fr)',
            gap: '18px',
          }}
        >
          <EventOrganizerSectionComponent
            organizer={event.organizer}
            onOpenProfile={() => router.push(organizerHref)}
          />
          <EventRewardsSectionComponent rewards={event.rewards} />
        </Box>
      </Box>
    </MainLayoutComponent>
  );
}
