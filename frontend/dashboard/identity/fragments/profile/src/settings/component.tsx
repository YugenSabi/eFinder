'use client';

import {zodResolver} from '@hookform/resolvers/zod';
import {useRouter} from 'next/navigation';
import {useState} from 'react';
import {useForm} from 'react-hook-form';
import {z} from 'zod';
import {MainLayoutComponent} from '@identity/main-layout';
import {Box} from '@ui/layout';
import {Text} from '@ui/text';
import {useAuth} from '../../../../lib/auth/context';
import {
  logoutCurrentUser,
  updateCurrentUserProfile,
  updateOrganizerProfile,
} from '../../../../lib/kratos';
import {ProfileSettingsActions} from './actions';
import {
  OrganizerProfileSettingsForm,
  type OrganizerSettingsValues,
} from './organizer-form';
import {ProfileSettingsTitle} from './title';
import {UserProfileSettingsForm, type UserSettingsValues} from './user-form';

const userSettingsSchema = z.object({
  firstName: z.string().max(120),
  lastName: z.string().max(120),
  age: z.string(),
  city: z.string().max(120),
  headline: z.string().max(180),
  school: z.string().max(180),
  telegram: z.string().max(180),
  githubUrl: z.string().max(255),
  behanceUrl: z.string().max(255),
  vkUrl: z.string().max(255),
  avatarUrl: z.string().max(255),
  portfolioSummary: z.string().max(1000),
});

const organizerSettingsSchema = z.object({
  organizationName: z.string().max(180),
  bio: z.string().max(1200),
  websiteUrl: z.string().max(255),
  telegram: z.string().max(180),
  vkUrl: z.string().max(255),
  logoUrl: z.string().max(255),
});

export function ProfileSettingsComponent() {
  const router = useRouter();
  const {currentUser, setCurrentUser, isAuthResolved} = useAuth();
  const [saving, setSaving] = useState(false);
  const [loggingOut, setLoggingOut] = useState(false);
  const [submitError, setSubmitError] = useState<string | null>(null);

  const userForm = useForm<UserSettingsValues>({
    resolver: zodResolver(userSettingsSchema),
    defaultValues: {
      firstName: currentUser?.firstName ?? '',
      lastName: currentUser?.lastName ?? '',
      age:
        currentUser?.age !== null && currentUser?.age !== undefined
          ? String(currentUser.age)
          : '',
      city: currentUser?.city ?? '',
      headline: currentUser?.headline ?? '',
      school: currentUser?.school ?? '',
      telegram: currentUser?.telegram ?? '',
      githubUrl: currentUser?.githubUrl ?? '',
      behanceUrl: currentUser?.behanceUrl ?? '',
      vkUrl: currentUser?.vkUrl ?? '',
      avatarUrl: currentUser?.avatarUrl ?? '',
      portfolioSummary: currentUser?.participantProfile?.portfolioSummary ?? '',
    },
  });

  const organizerForm = useForm<OrganizerSettingsValues>({
    resolver: zodResolver(organizerSettingsSchema),
    defaultValues: {
      organizationName: currentUser?.organizerProfile?.organizationName ?? '',
      bio: currentUser?.organizerProfile?.description ?? '',
      websiteUrl: currentUser?.organizerProfile?.websiteUrl ?? '',
      telegram: currentUser?.organizerProfile?.telegram ?? '',
      vkUrl: currentUser?.organizerProfile?.vkUrl ?? '',
      logoUrl: currentUser?.organizerProfile?.logoUrl ?? '',
    },
  });

  if (!isAuthResolved) {
    return (
      <MainLayoutComponent>
        <Box as="main" width="$full" justifyContent="center" paddingTop={48} paddingBottom={48}>
          <Text font="headerNav" fontSize={24}>
            Загрузка настроек...
          </Text>
        </Box>
      </MainLayoutComponent>
    );
  }

  if (!currentUser) {
    return (
      <MainLayoutComponent>
        <Box as="main" width="$full" justifyContent="center" paddingTop={48} paddingBottom={48}>
          <Text font="headerNav" fontSize={24}>
            Нужно войти в аккаунт
          </Text>
        </Box>
      </MainLayoutComponent>
    );
  }

  const isOrganizer =
    currentUser.role === 'ORGANIZER' ||
    (currentUser.role === 'PARTICIPANT' && Boolean(currentUser.organizerProfile));

  const logout = async () => {
    try {
      setLoggingOut(true);
      setCurrentUser(null);
      await logoutCurrentUser();
    } finally {
      setLoggingOut(false);
    }
  };

  const submitUser = userForm.handleSubmit(async (values) => {
    try {
      setSaving(true);
      setSubmitError(null);
      const updatedUser = await updateCurrentUserProfile({
        firstName: values.firstName,
        lastName: values.lastName,
        age: values.age ? Number(values.age) : null,
        city: values.city,
        headline: values.headline,
        school: values.school,
        telegram: values.telegram,
        githubUrl: values.githubUrl,
        behanceUrl: values.behanceUrl,
        vkUrl: values.vkUrl,
        avatarUrl: values.avatarUrl,
        portfolioSummary: values.portfolioSummary,
      });
      setCurrentUser(updatedUser);
      router.push('/profile');
      router.refresh();
    } catch (error) {
      setSubmitError(error instanceof Error ? error.message : 'Не удалось сохранить профиль');
    } finally {
      setSaving(false);
    }
  });

  const submitOrganizer = organizerForm.handleSubmit(async (values) => {
    try {
      setSaving(true);
      setSubmitError(null);
      const updatedUser = await updateOrganizerProfile({
        organizationName: values.organizationName,
        bio: values.bio,
        websiteUrl: values.websiteUrl,
        telegram: values.telegram,
        vkUrl: values.vkUrl,
        logoUrl: values.logoUrl,
      });
      setCurrentUser(updatedUser);
      router.push('/profile');
      router.refresh();
    } catch (error) {
      setSubmitError(
        error instanceof Error ? error.message : 'Не удалось сохранить данные организации',
      );
    } finally {
      setSaving(false);
    }
  });

  return (
    <MainLayoutComponent>
      <Box
        as="main"
        width="$full"
        justifyContent="center"
        alignItems="center"
        paddingTop={48}
        paddingBottom={48}
      >
        <Box
          as="form"
          direction="column"
          width="$full"
          maxWidth={720}
          gap={18}
          padding={32}
          surface="card"
          onSubmit={isOrganizer ? submitOrganizer : submitUser}
        >
          <ProfileSettingsTitle
            title={isOrganizer ? 'Редактирование организации' : 'Редактирование профиля'}
            description={
              isOrganizer
                ? 'Обновите данные организации и основные ссылки.'
                : 'Обновите основные данные профиля и ссылки.'
            }
          />

          {isOrganizer ? (
            <OrganizerProfileSettingsForm
              email={currentUser.email}
              register={organizerForm.register}
              errors={organizerForm.formState.errors}
            />
          ) : (
            <UserProfileSettingsForm
              email={currentUser.email}
              register={userForm.register}
              errors={userForm.formState.errors}
            />
          )}

          {submitError ? (
            <Text color="danger" font="headerNav" fontSize={14}>
              {submitError}
            </Text>
          ) : null}

          <ProfileSettingsActions
            saveLabel="Сохранить"
            savingLabel="Сохраняем..."
            backLabel="Назад"
            logoutLabel="Выйти из аккаунта"
            loggingOutLabel="Выходим..."
            saving={saving}
            loggingOut={loggingOut}
            onBack={() => router.push('/profile')}
            onLogout={logout}
          />
        </Box>
      </Box>
    </MainLayoutComponent>
  );
}
