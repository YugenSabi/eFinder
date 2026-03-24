'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { useTranslations } from 'next-intl';
import { MainLayoutComponent } from '@identity/main-layout';
import { Button } from '@ui/button';
import { Box } from '@ui/layout';
import { Text } from '@ui/text';
import { useAuth } from '../../../../lib/auth/context';
import { CreateEventSectionComponent } from './create-event';
import { getPendingParticipations, reviewParticipation } from './api';
import type { PendingParticipation } from './types';

export function OrganizerDashboardComponent() {
  const t = useTranslations('OrganizerDashboard');
  const router = useRouter();
  const { currentUser, isAuthResolved } = useAuth();
  const [pendingParticipations, setPendingParticipations] = useState<PendingParticipation[]>([]);

  useEffect(() => {
    if (
      currentUser?.role !== 'ORGANIZER' ||
      currentUser.organizerProfile?.status !== 'APPROVED'
    ) {
      return;
    }

    getPendingParticipations()
      .then(setPendingParticipations)
      .catch(() => setPendingParticipations([]));
  }, [currentUser]);

  if (!isAuthResolved) {
    return (
      <MainLayoutComponent>
        <Box as="main" width="$full" justifyContent="center" alignItems="center" paddingTop={48} paddingBottom={48}>
          <Text as="span">{t('loading')}</Text>
        </Box>
      </MainLayoutComponent>
    );
  }

  if (!currentUser) {
    return (
      <MainLayoutComponent>
        <Box as="main" width="$full" justifyContent="center" alignItems="center" paddingTop={48} paddingBottom={48}>
          <Box direction="column" width="$full" maxWidth={520} gap={16} padding={32} surface="card">
            <Text as="h1" font="headerNav" fontSize={38}>
              {t('title')}
            </Text>
            <Text as="p">{t('loginRequired')}</Text>
            <Button
              label={t('goToLogin')}
              bg="contrastColor"
              font="headerNav"
              onClick={() => router.push('/auth/login')}
            />
          </Box>
        </Box>
      </MainLayoutComponent>
    );
  }

  if (
    currentUser.role !== 'ORGANIZER' ||
    currentUser.organizerProfile?.status !== 'APPROVED'
  ) {
    return (
      <MainLayoutComponent>
        <Box as="main" width="$full" justifyContent="center" alignItems="center" paddingTop={48} paddingBottom={48}>
          <Box direction="column" width="$full" maxWidth={520} gap={16} padding={32} surface="card">
            <Text as="h1" font="headerNav" fontSize={38}>
              {t('title')}
            </Text>
            <Text as="p">{t('forbidden')}</Text>
            <Button
              label={t('goHome')}
              bg="contrastColor"
              font="headerNav"
              onClick={() => router.push('/profile')}
            />
          </Box>
        </Box>
      </MainLayoutComponent>
    );
  }

  return (
    <MainLayoutComponent>
      <Box as="main" direction="column" gap={20} width="$full" paddingTop={48} paddingBottom={48}>
        <Box direction="column" gap={8}>
          <Text as="h1" font="headerNav" fontSize={38}>
            {t('title')}
          </Text>
          <Text as="p" color="secondaryText">
            {t('description')}
          </Text>
        </Box>
        <CreateEventSectionComponent
          organizers={[
            {
              id: currentUser.id,
              email: currentUser.email,
              firstName: currentUser.firstName,
              lastName: currentUser.lastName,
              role: currentUser.role,
            },
          ]}
        />
        <Box direction="column" gap={16} padding={24} surface="card">
          <Text as="h2" font="headerNav" fontSize={24}>
            Заявки на участие
          </Text>
          {pendingParticipations.length === 0 ? (
            <Text as="span">Пока нет новых заявок</Text>
          ) : (
            pendingParticipations.map((participation) => (
              <Box
                key={participation.id}
                direction="column"
                gap={10}
                padding={16}
                border="1px solid #e8d7c0"
                borderRadius={18}
              >
                <Text as="span" font="headerNav" fontSize={18}>
                  {participation.event.title}
                </Text>
                <Text as="span">
                  {[participation.participant.firstName, participation.participant.lastName]
                    .filter(Boolean)
                    .join(' ') || participation.participant.email}
                </Text>
                <Box gap={8}>
                  <Button
                    label="Профиль участника"
                    variant="secondary"
                    font="headerNav"
                    onClick={() => router.push(`/members/${participation.participant.id}`)}
                  />
                  <Button
                    label="Подтвердить"
                    bg="contrastColor"
                    font="headerNav"
                    onClick={async () => {
                      await reviewParticipation(participation.id, 'VERIFIED');
                      setPendingParticipations((current) =>
                        current.filter((item) => item.id !== participation.id),
                      );
                    }}
                  />
                  <Button
                    label="Отклонить"
                    variant="secondary"
                    font="headerNav"
                    onClick={async () => {
                      await reviewParticipation(participation.id, 'REJECTED');
                      setPendingParticipations((current) =>
                        current.filter((item) => item.id !== participation.id),
                      );
                    }}
                  />
                </Box>
              </Box>
            ))
          )}
        </Box>
      </Box>
    </MainLayoutComponent>
  );
}
