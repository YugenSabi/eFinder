'use client';

import { useMemo, useState } from 'react';
import { useRouter } from 'next/navigation';
import { Button } from '@ui/button';
import { Box } from '@ui/layout';
import { Text } from '@ui/text';
import { ProfileActionsSection } from '../user/actions-section';
import { useAuth } from '../../../../lib/auth/context';

type OrganizerProfileComponentProps = {
  loggingOut: boolean;
  onLogout: () => void | Promise<void>;
};

function RatingRow({
  place,
  name,
  score,
  highlight,
}: {
  place: number;
  name: string;
  score: number;
  highlight?: boolean;
}) {
  return (
    <Box
      alignItems="center"
      justifyContent="space-between"
      padding={8}
      borderRadius={16}
      backgroundColor="cardBg"
      gap={12}
      style={{ boxShadow: '-3px 3px 3px rgba(0, 0, 0, 0.25)' }}
    >
      <Box
        width={36}
        height={36}
        justifyContent="center"
        alignItems="center"
        borderRadius={10}
        backgroundColor="surface"
      >
        <Text font="headerNav" fontSize={16}>
          {place}
        </Text>
      </Box>
      <Box flexGrow={1} justifyContent="center" alignItems="center">
        <Text font={highlight ? 'headerNav' : 'footerText'} fontSize={16}>
          {name}
        </Text>
      </Box>
      <Box
        minWidth={88}
        height={36}
        justifyContent="center"
        alignItems="center"
        borderRadius={10}
        backgroundColor="surface"
      >
        <Text font="headerNav" fontSize={16}>
          {score.toFixed(2)}
        </Text>
      </Box>
    </Box>
  );
}

export function OrganizerProfileComponent({
  loggingOut,
  onLogout,
}: OrganizerProfileComponentProps) {
  const router = useRouter();
  const { currentUser } = useAuth();
  const [actionError, setActionError] = useState<string | null>(null);

  if (!currentUser?.organizerProfile) {
    return null;
  }

  const organizerProfile = currentUser.organizerProfile;
  const organizationName = organizerProfile.organizationName || currentUser.email;
  const description =
    organizerProfile.description || 'Описание организации пока не заполнено';
  const links = [
    organizerProfile.websiteUrl ? `Сайт: ${organizerProfile.websiteUrl}` : null,
    organizerProfile.telegram ? `Telegram: ${organizerProfile.telegram}` : null,
    organizerProfile.vkUrl ? `VK: ${organizerProfile.vkUrl}` : null,
  ].filter(Boolean) as string[];

  const ratingRows = useMemo(() => {
    if (
      organizerProfile.organizationRank === null ||
      organizerProfile.organizationRank === undefined
    ) {
      return [];
    }

    return [
      {
        place: organizerProfile.organizationRank,
        name: organizationName,
        score: organizerProfile.trustScore ?? 0,
        highlight: true,
      },
    ];
  }, [
    organizationName,
    organizerProfile.organizationRank,
    organizerProfile.trustScore,
  ]);

  const isApproved = organizerProfile.status === 'APPROVED';

  return (
    <Box as="main" direction="column" width="$full" gap={28} paddingTop={34} paddingBottom={40}>
      <Box gap={14} alignItems="stretch" style={{ flexWrap: 'wrap' }}>
        <Box
          width={320}
          minWidth={320}
          height={320}
          minHeight={320}
          border="1.5px solid #000000"
          borderRadius={24}
          backgroundColor="surface"
          justifyContent="center"
          alignItems="center"
          overflow="hidden"
        >
          {organizerProfile.logoUrl ? (
            <img
              src={organizerProfile.logoUrl}
              alt={organizationName}
              style={{ width: '100%', height: '100%', objectFit: 'cover' }}
            />
          ) : (
            <Text font="headerNav" fontSize={30} style={{ textAlign: 'center', padding: '0 20px' }}>
              {organizationName}
            </Text>
          )}
        </Box>

        <Box
          flexGrow={1}
          direction="column"
          gap={18}
          padding={14}
          borderRadius={24}
          backgroundColor="cardBg"
          style={{ minWidth: 360, boxShadow: '-3px 3px 3px rgba(0, 0, 0, 0.25)' }}
        >
          <Box gap={18} justifyContent="space-between" alignItems="stretch" style={{ flexWrap: 'wrap' }}>
            <Box direction="column" gap={8} style={{ flex: '1 1 340px' }}>
              <Text font="headerNav" fontSize={18}>
                {organizationName}
              </Text>

              <Text font="footerText" fontSize={13}>
                {description}
              </Text>

              <Box gap={24} style={{ flexWrap: 'wrap' }}>
                <Box direction="column" gap={8} style={{ flex: '1 1 220px' }}>
                  <Text font="headerNav" fontSize={14}>
                    Ссылки:
                  </Text>
                  {links.length > 0 ? (
                    links.map((item) => (
                      <Text key={item} font="footerText" fontSize={13}>
                        • {item}
                      </Text>
                    ))
                  ) : (
                    <Text font="footerText" fontSize={13}>
                      Ссылки пока не добавлены
                    </Text>
                  )}
                </Box>

                <Box direction="column" gap={8} style={{ flex: '1 1 220px' }}>
                  <Text font="headerNav" fontSize={14}>
                    Данные организации:
                  </Text>
                  <Text font="footerText" fontSize={13}>
                    • Проведено мероприятий: {organizerProfile.totalEvents}
                  </Text>
                  <Text font="footerText" fontSize={13}>
                    • Рейтинг доверия: {(organizerProfile.trustScore ?? 0).toFixed(2)}
                  </Text>
                  <Text font="footerText" fontSize={13}>
                    • Место в рейтинге: {organizerProfile.organizationRank ?? 'нет данных'}
                  </Text>
                  <Text font="footerText" fontSize={13}>
                    • Статус заявки: {organizerProfile.status ?? 'PENDING'}
                  </Text>
                </Box>
              </Box>
            </Box>

            <Box
              direction="column"
              gap={10}
              padding={10}
              borderRadius={20}
              style={{ flex: '1 1 360px', minWidth: 320 }}
            >
              <Text font="headerNav" fontSize={18}>
                Текущий рейтинг в общем зачете
              </Text>
              {ratingRows.length > 0 ? (
                ratingRows.map((item) => (
                  <RatingRow key={`${item.place}-${item.name}`} {...item} />
                ))
              ) : (
                <Box
                  padding={18}
                  borderRadius={16}
                  backgroundColor="background"
                  justifyContent="center"
                  alignItems="center"
                >
                  <Text font="footerText" fontSize={14}>
                    Рейтинг пока недоступен
                  </Text>
                </Box>
              )}
            </Box>
          </Box>
        </Box>
      </Box>

      <Box gap={18} alignItems="stretch" flexWrap="wrap">
        <Box
          direction="column"
          gap={14}
          padding={16}
          borderRadius={24}
          backgroundColor="cardBg"
          style={{ flex: '1 1 420px', minWidth: 320, boxShadow: '-3px 3px 3px rgba(0, 0, 0, 0.25)' }}
        >
          <Text font="headerNav" fontSize={24} style={{ textAlign: 'center' }}>
            Список призов
          </Text>
          {organizerProfile.commonRewardTypes.length > 0 ? (
            organizerProfile.commonRewardTypes.map((reward) => (
              <Box
                key={reward}
                padding={18}
                borderRadius={16}
                backgroundColor="background"
                justifyContent="center"
                alignItems="center"
              >
                <Text font="headerNav" fontSize={18}>
                  {reward}
                </Text>
              </Box>
            ))
          ) : (
            <Box
              padding={18}
              borderRadius={16}
              backgroundColor="background"
              justifyContent="center"
              alignItems="center"
            >
              <Text font="footerText" fontSize={14}>
                Призы пока не добавлены
              </Text>
            </Box>
          )}
        </Box>

        <Box
          direction="column"
          gap={14}
          padding={16}
          borderRadius={24}
          backgroundColor="cardBg"
          style={{ flex: '1 1 520px', minWidth: 360, boxShadow: '-3px 3px 3px rgba(0, 0, 0, 0.25)' }}
        >
          <Text font="headerNav" fontSize={24} style={{ textAlign: 'center' }}>
            Последние мероприятия
          </Text>
          <Box
            direction="column"
            gap={14}
            style={
              organizerProfile.recentEvents.length > 2
                ? { maxHeight: '420px', overflowY: 'auto', paddingRight: '4px' }
                : undefined
            }
          >
            {organizerProfile.recentEvents.length > 0 ? (
              organizerProfile.recentEvents.map((event) => (
                <Box
                  key={event.id}
                  gap={14}
                  padding={14}
                  borderRadius={18}
                  backgroundColor="background"
                  alignItems="stretch"
                >
                  <Box
                    width={148}
                    minWidth={148}
                    height={148}
                    borderRadius={18}
                    backgroundColor="cardBg"
                    overflow="hidden"
                    justifyContent="center"
                    alignItems="center"
                  >
                    {event.imageUrl ? (
                      <img
                        src={event.imageUrl}
                        alt={event.title}
                        style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                      />
                    ) : (
                      <Text font="headerNav" fontSize={16}>
                        eFinder
                      </Text>
                    )}
                  </Box>

                  <Box direction="column" gap={8} flexGrow={1} style={{ minWidth: 0 }}>
                    <Text font="headerNav" fontSize={18}>
                      {event.title}
                    </Text>
                    <Text font="footerText" fontSize={13}>
                      {(event.city ?? 'Онлайн')} • {new Date(event.startsAt).toLocaleDateString('ru-RU')}
                    </Text>
                    <Box alignItems="flex-start">
                      <Button
                        label="Подробнее"
                        onClick={() => router.push(`/events/${event.id}`)}
                        font="headerNav"
                        fontSize={10}
                        bg="contrastColor"
                        textColor="surface"
                        style={{ height: 28, padding: '0 10px' }}
                      />
                    </Box>
                  </Box>
                </Box>
              ))
            ) : (
              <Box
                padding={18}
                borderRadius={16}
                backgroundColor="background"
                justifyContent="center"
                alignItems="center"
              >
                <Text font="footerText" fontSize={14}>
                  Мероприятий пока нет
                </Text>
              </Box>
            )}
          </Box>
        </Box>
      </Box>

      {actionError ? (
        <Text color="danger" font="headerNav" fontSize={14}>
          {actionError}
        </Text>
      ) : null}

      <ProfileActionsSection
        editLabel="Редактировать"
        actionLabel="Управление мероприятиями"
        logoutLabel="Выйти из аккаунта"
        logoutLoadingLabel="Выходим..."
        loggingOut={loggingOut}
        onEdit={() => router.push('/profile/settings')}
        onAction={() => {
          if (!isApproved) {
            setActionError('Обратитесь к организатору для подтверждения аккаунта');
            return;
          }

          setActionError(null);
          router.push('/profile/event-management');
        }}
        onLogout={onLogout}
      />
    </Box>
  );
}
