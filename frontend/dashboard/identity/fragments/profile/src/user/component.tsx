'use client';

import { useEffect, useState } from 'react';
import { Button } from '@ui/button';
import { Box } from '@ui/layout';
import { Text } from '@ui/text';
import { updateCurrentUserProfile } from '../../../../lib/kratos';
import type { AuthUser } from '../../../../lib/auth/types';
import { uploadImage } from '../../../../lib/uploads/client';
import { buildProfileViewModel } from './model';
import { ProfileAchievementsSection } from './achievements-section';
import { ProfileOverviewSection } from './overview-section';
import { ProfileStatsSection } from './stats-section';

type UserProfileComponentProps = {
  currentUser: NonNullable<AuthUser>;
  logoutLabel: string;
  logoutLoadingLabel: string;
  loggingOut: boolean;
  onLogout: () => void | Promise<void>;
  onProfileUpdated: (user: NonNullable<AuthUser>) => void;
  actionLabel?: string;
  onAction?: () => void;
};

export function UserProfileComponent({
  currentUser,
  logoutLabel,
  logoutLoadingLabel,
  loggingOut,
  onLogout,
  onProfileUpdated,
  actionLabel,
  onAction,
}: UserProfileComponentProps) {
  const [saving, setSaving] = useState(false);
  const [saveError, setSaveError] = useState<string | null>(null);
  const [form, setForm] = useState({
    firstName: currentUser.firstName ?? '',
    lastName: currentUser.lastName ?? '',
    headline: currentUser.headline ?? '',
    portfolioSummary: currentUser.participantProfile?.portfolioSummary ?? '',
    age: currentUser.age !== null && currentUser.age !== undefined ? String(currentUser.age) : '',
    school: currentUser.school ?? '',
    city: currentUser.city ?? '',
    telegram: currentUser.telegram ?? '',
    githubUrl: currentUser.githubUrl ?? '',
    behanceUrl: currentUser.behanceUrl ?? '',
    vkUrl: currentUser.vkUrl ?? '',
    avatarUrl: currentUser.avatarUrl ?? '',
  });

  useEffect(() => {
    setForm({
      firstName: currentUser.firstName ?? '',
      lastName: currentUser.lastName ?? '',
      headline: currentUser.headline ?? '',
      portfolioSummary: currentUser.participantProfile?.portfolioSummary ?? '',
      age:
        currentUser.age !== null && currentUser.age !== undefined
          ? String(currentUser.age)
          : '',
      school: currentUser.school ?? '',
      city: currentUser.city ?? '',
      telegram: currentUser.telegram ?? '',
      githubUrl: currentUser.githubUrl ?? '',
      behanceUrl: currentUser.behanceUrl ?? '',
      vkUrl: currentUser.vkUrl ?? '',
      avatarUrl: currentUser.avatarUrl ?? '',
    });
  }, [currentUser]);

  const profile = buildProfileViewModel(currentUser);

  const save = async () => {
    try {
      setSaving(true);
      setSaveError(null);
      const updatedUser = await updateCurrentUserProfile({
        firstName: form.firstName,
        lastName: form.lastName,
        age: form.age ? Number(form.age) : null,
        city: form.city,
        headline: form.headline,
        school: form.school,
        telegram: form.telegram,
        githubUrl: form.githubUrl,
        behanceUrl: form.behanceUrl,
        vkUrl: form.vkUrl,
        avatarUrl: form.avatarUrl,
        portfolioSummary: form.portfolioSummary,
      });
      onProfileUpdated(updatedUser);
    } catch (error) {
      setSaveError(error instanceof Error ? error.message : 'Не удалось сохранить профиль');
    } finally {
      setSaving(false);
    }
  };

  return (
    <Box as="main" direction="column" width="$full" gap={28} paddingTop={34} paddingBottom={40}>
      <ProfileOverviewSection
        profile={profile}
        form={form}
        saving={saving}
        saveLabel="Сохранить профиль"
        saveLoadingLabel="Сохраняем..."
        onSave={() => void save()}
        onFieldChange={(field, value) =>
          setForm((current) => ({
            ...current,
            [field]: value,
          }))
        }
        actionLabel={actionLabel}
        onAction={onAction}
      />

      <Box gap={18} alignItems="stretch" flexWrap="wrap">
        <ProfileAchievementsSection achievements={profile.achievements} />
        <ProfileStatsSection stats={profile.stats} />
      </Box>

      <Box direction="column" gap={8}>
        <Text as="span" font="headerNav" fontSize={16}>
          Загрузить аватар
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
              const avatarUrl = await uploadImage(file);
              setForm((current) => ({ ...current, avatarUrl }));
            } catch (error) {
              setSaveError(
                error instanceof Error ? error.message : 'Не удалось загрузить аватар',
              );
            }
          }}
        />
      </Box>

      {saveError ? (
        <Text as="span" color="danger" fontSize={14}>
          {saveError}
        </Text>
      ) : null}

      <Box justifyContent="flex-end">
        <Button
          label={loggingOut ? logoutLoadingLabel : logoutLabel}
          variant="secondary"
          font="headerNav"
          onClick={onLogout}
        />
      </Box>
    </Box>
  );
}
