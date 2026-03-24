'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { useTranslations } from 'next-intl';
import { Button } from '@ui/button';
import { Input } from '@ui/input';
import { Box } from '@ui/layout';
import { Text } from '@ui/text';
import { useAuth } from '../../../../lib/auth/context';
import { updateOrganizerProfile } from '../../../../lib/kratos';
import { uploadImage } from '../../../../lib/uploads/client';

type OrganizerProfileComponentProps = {
  loggingOut: boolean;
  onLogout: () => void | Promise<void>;
};

export function OrganizerProfileComponent({
  loggingOut,
  onLogout,
}: OrganizerProfileComponentProps) {
  const t = useTranslations('Auth.profile');
  const router = useRouter();
  const { currentUser, setCurrentUser } = useAuth();
  const [saving, setSaving] = useState(false);
  const [saveError, setSaveError] = useState<string | null>(null);

  const organizerProfile = currentUser?.organizerProfile;

  const [form, setForm] = useState({
    organizationName: organizerProfile?.organizationName ?? '',
    bio: organizerProfile?.description ?? '',
    websiteUrl: organizerProfile?.websiteUrl ?? '',
    telegram: organizerProfile?.telegram ?? '',
    vkUrl: organizerProfile?.vkUrl ?? '',
    logoUrl: organizerProfile?.logoUrl ?? '',
  });

  useEffect(() => {
    setForm({
      organizationName: organizerProfile?.organizationName ?? '',
      bio: organizerProfile?.description ?? '',
      websiteUrl: organizerProfile?.websiteUrl ?? '',
      telegram: organizerProfile?.telegram ?? '',
      vkUrl: organizerProfile?.vkUrl ?? '',
      logoUrl: organizerProfile?.logoUrl ?? '',
    });
  }, [organizerProfile]);

  if (!currentUser || !organizerProfile) {
    return null;
  }

  return (
    <Box
      as="main"
      direction="column"
      width="$full"
      gap={24}
      paddingTop={34}
      paddingBottom={40}
    >
      <Box direction="column" gap={8}>
        <Text as="h1" font="headerNav" fontSize={38}>
          {organizerProfile.organizationName || t('organizer.title')}
        </Text>
        <Text as="p" color="secondaryText">
          {organizerProfile.status === 'APPROVED'
            ? t('organizer.approved')
            : organizerProfile.status === 'REJECTED'
              ? t('organizer.rejected')
              : t('organizer.pending')}
        </Text>
      </Box>

      <Box direction="column" gap={18} padding={24} surface="card">
        {organizerProfile.logoUrl ? (
          <Box width={160} height={160} borderRadius={24} overflow="hidden">
            <img
              src={organizerProfile.logoUrl}
              alt={organizerProfile.organizationName || t('organizer.title')}
              style={{ width: '100%', height: '100%', objectFit: 'cover' }}
            />
          </Box>
        ) : null}

        <Text as="span" font="headerNav" fontSize={20}>
          {t('organizer.about')}
        </Text>

        <Input
          label="Название организации"
          value={form.organizationName}
          onChange={(event) =>
            setForm((current) => ({
              ...current,
              organizationName: event.currentTarget.value,
            }))
          }
        />
        <Input
          label="Описание"
          value={form.bio}
          onChange={(event) =>
            setForm((current) => ({
              ...current,
              bio: event.currentTarget.value,
            }))
          }
        />

        <Text as="span">
          {t('organizer.rating')}: {organizerProfile.trustScore}
        </Text>
        <Text as="span">
          {t('organizer.totalEvents')}: {organizerProfile.totalEvents}
        </Text>
        <Text as="span">
          {t('organizer.rank')}: {organizerProfile.organizationRank ?? t('organizer.noRank')}
        </Text>

        <Box direction="column" gap={6}>
          <Text as="span" font="headerNav" fontSize={18}>
            {t('organizer.links')}
          </Text>
          <Input
            label="Сайт"
            value={form.websiteUrl}
            onChange={(event) =>
              setForm((current) => ({
                ...current,
                websiteUrl: event.currentTarget.value,
              }))
            }
          />
          <Input
            label="Telegram"
            value={form.telegram}
            onChange={(event) =>
              setForm((current) => ({
                ...current,
                telegram: event.currentTarget.value,
              }))
            }
          />
          <Input
            label="VK"
            value={form.vkUrl}
            onChange={(event) =>
              setForm((current) => ({
                ...current,
                vkUrl: event.currentTarget.value,
              }))
            }
          />
        </Box>

        <Box direction="column" gap={8}>
          <Text as="span" font="headerNav" fontSize={18}>
            Логотип
          </Text>
          <input
            type="file"
            accept="image/*"
            onChange={async (event) => {
              const file = event.currentTarget.files?.[0];

              if (!file) {
                return;
              }

              try {
                const logoUrl = await uploadImage(file);
                setForm((current) => ({ ...current, logoUrl }));
              } catch (error) {
                setSaveError(
                  error instanceof Error ? error.message : 'Не удалось загрузить логотип',
                );
              }
            }}
          />
        </Box>

        <Box direction="column" gap={6}>
          <Text as="span" font="headerNav" fontSize={18}>
            {t('organizer.rewards')}
          </Text>
          {organizerProfile.commonRewardTypes.length > 0 ? (
            organizerProfile.commonRewardTypes.map((reward) => (
              <Text key={reward} as="span">
                • {reward}
              </Text>
            ))
          ) : (
            <Text as="span">{t('organizer.noRewards')}</Text>
          )}
        </Box>

        <Box direction="column" gap={6}>
          <Text as="span" font="headerNav" fontSize={18}>
            {t('organizer.recentEvents')}
          </Text>
          {organizerProfile.recentEvents.length > 0 ? (
            organizerProfile.recentEvents.map((event) => (
              <Button
                key={event.id}
                label={event.title}
                variant="ghost"
                font="headerNav"
                onClick={() => router.push(`/events/${event.id}`)}
              />
            ))
          ) : (
            <Text as="span">{t('organizer.noEvents')}</Text>
          )}
        </Box>

        {organizerProfile.status === 'APPROVED' ? (
          <Button
            label={t('actions.eventManagement')}
            bg="contrastColor"
            font="headerNav"
            onClick={() => router.push('/profile/event-management')}
          />
        ) : null}

        <Button
          label={saving ? 'Сохраняем данные организации...' : 'Сохранить данные организации'}
          bg="contrastColor"
          font="headerNav"
          disabled={saving}
          onClick={async () => {
            try {
              setSaving(true);
              setSaveError(null);
              const updatedUser = await updateOrganizerProfile(form);
              setCurrentUser(updatedUser);
            } catch (error) {
              setSaveError(
                error instanceof Error ? error.message : 'Не удалось сохранить организацию',
              );
            } finally {
              setSaving(false);
            }
          }}
        />

        {saveError ? (
          <Text as="span" color="danger" fontSize={14}>
            {saveError}
          </Text>
        ) : null}

        <Button
          label={loggingOut ? t('logoutLoading') : t('logout')}
          variant="secondary"
          font="headerNav"
          onClick={onLogout}
        />
      </Box>
    </Box>
  );
}
