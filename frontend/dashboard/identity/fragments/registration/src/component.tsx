'use client';

import { zodResolver } from '@hookform/resolvers/zod';
import {
  getBrowserFlow,
  getCsrfToken,
  getVerificationConfirmPath,
  requestOrganizerAccess,
  submitRegistrationFlow,
  syncCurrentUser,
} from '../../../lib/kratos';
import { useAuth } from '../../../lib/auth/context';
import { MainLayoutComponent } from '@identity/main-layout';
import { Button } from '@ui/button';
import { Input } from '@ui/input';
import { Box } from '@ui/layout';
import { Text } from '@ui/text';
import { useRouter, useSearchParams } from 'next/navigation';
import { useEffect, useState } from 'react';
import { useTranslations } from 'next-intl';
import { useForm } from 'react-hook-form';
import { uploadImage } from '../../../lib/uploads/client';
import { RegisterSchema, type TypeRegisterSchema } from '../schemas';
import { CtaComponent } from './cta';
import { EmailInputComponent } from './email-input';
import { FirstNameInputComponent } from './first-name-input';
import { LastNameInputComponent } from './last-name-input';
import { PasswordInputComponent } from './password-input';
import { RepeatPasswordInputComponent } from './repeat-password-input';
import { SubmitButtonComponent } from './submit-button';
import { TitleComponent } from './title/component';

export function RegistrationComponent() {
  const t = useTranslations('Auth.registration');
  const router = useRouter();
  const { setCurrentUser } = useAuth();
  const searchParams = useSearchParams();
  const [flowId, setFlowId] = useState<string | null>(null);
  const [csrfToken, setCsrfToken] = useState<string | undefined>();
  const [submitError, setSubmitError] = useState<string | null>(null);
  const [submitting, setSubmitting] = useState(false);

  const form = useForm<TypeRegisterSchema>({
    resolver: zodResolver(RegisterSchema),
    defaultValues: {
      email: '',
      accountType: 'participant',
      firstName: '',
      lastName: '',
      password: '',
      repeatPassword: '',
      organizationName: '',
      organizationBio: '',
      organizationWebsite: '',
      organizationTelegram: '',
      organizationVk: '',
      organizationLogoUrl: '',
    },
  });

  useEffect(() => {
    const nextFlowId = searchParams.get('flow');

    if (!nextFlowId) {
      return;
    }

    let cancelled = false;

    getBrowserFlow('registration', nextFlowId)
      .then((flow) => {
        if (cancelled) {
          return;
        }

        setFlowId(flow.id);
        setCsrfToken(getCsrfToken(flow));
      })
      .catch((error: unknown) => {
        if (cancelled) {
          return;
        }

        setSubmitError(error instanceof Error ? error.message : t('errorDefault'));
      });

    return () => {
      cancelled = true;
    };
  }, [searchParams, t]);

  const onSubmit = async (data: TypeRegisterSchema) => {
    if (!flowId) {
      setSubmitError(t('errorDefault'));
      return;
    }

    setSubmitting(true);
    setSubmitError(null);

    try {
      const registrationResult = await submitRegistrationFlow({
        flowId,
        csrfToken,
        email: data.email,
        firstName: data.firstName,
        lastName: data.lastName,
        password: data.password,
      });
      const currentUser = await syncCurrentUser();

      if (data.accountType === 'organizer') {
        await requestOrganizerAccess({
          organizationName: data.organizationName ?? '',
          bio: data.organizationBio ?? '',
          websiteUrl: data.organizationWebsite ?? '',
          telegram: data.organizationTelegram ?? '',
          vkUrl: data.organizationVk ?? '',
          logoUrl: data.organizationLogoUrl ?? '',
        });
        const organizerUser = await syncCurrentUser();
        setCurrentUser(organizerUser);
      } else {
        setCurrentUser(currentUser);
      }
      router.push(getVerificationConfirmPath(registrationResult) ?? '/auth/confirm');
      router.refresh();
    } catch (error) {
      setSubmitError(error instanceof Error ? error.message : t('errorDefault'));
    } finally {
      setSubmitting(false);
    }
  };

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
          maxWidth={520}
          gap={16}
          padding={32}
          surface="card"
          onSubmit={form.handleSubmit(onSubmit)}
        >
          <TitleComponent />
          <Box gap={8} wrap="wrap">
            <Button
              label={t('accountType.participant')}
              variant={form.watch('accountType') === 'participant' ? 'primary' : 'secondary'}
              font="headerNav"
              bg={form.watch('accountType') === 'participant' ? 'contrastColor' : undefined}
              borderColor="contrastColor"
              textColor={
                form.watch('accountType') === 'participant'
                  ? 'surface'
                  : 'contrastColor'
              }
              onClick={() => form.setValue('accountType', 'participant')}
            />
            <Button
              label={t('accountType.organizer')}
              variant={form.watch('accountType') === 'organizer' ? 'primary' : 'secondary'}
              font="headerNav"
              bg={form.watch('accountType') === 'organizer' ? 'contrastColor' : undefined}
              borderColor="contrastColor"
              textColor={
                form.watch('accountType') === 'organizer'
                  ? 'surface'
                  : 'contrastColor'
              }
              onClick={() => form.setValue('accountType', 'organizer')}
            />
          </Box>
          <EmailInputComponent register={form.register} errors={form.formState.errors} />
          <FirstNameInputComponent register={form.register} errors={form.formState.errors} />
          <LastNameInputComponent register={form.register} errors={form.formState.errors} />
          {form.watch('accountType') === 'organizer' ? (
            <Box direction="column" gap={12}>
              <Input
                label={t('organizer.organizationName.label')}
                labelFont="headerNav"
                font="headerNav"
                error={Boolean(form.formState.errors.organizationName)}
                {...form.register('organizationName')}
              />
              <Input
                label={t('organizer.bio.label')}
                labelFont="headerNav"
                font="headerNav"
                {...form.register('organizationBio')}
              />
              <Input
                label={t('organizer.website.label')}
                labelFont="headerNav"
                font="headerNav"
                {...form.register('organizationWebsite')}
              />
              <Input
                label={t('organizer.telegram.label')}
                labelFont="headerNav"
                font="headerNav"
                {...form.register('organizationTelegram')}
              />
              <Input
                label={t('organizer.vk.label')}
                labelFont="headerNav"
                font="headerNav"
                {...form.register('organizationVk')}
              />
              <Box direction="column" gap={8}>
                <Text as="span" color="secondaryText" fontSize={14}>
                  {t('organizer.logo.label')}
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
                      form.setValue('organizationLogoUrl', logoUrl, {
                        shouldValidate: true,
                      });
                    } catch (error) {
                      setSubmitError(
                        error instanceof Error ? error.message : t('errorDefault'),
                      );
                    }
                  }}
                />
              </Box>
            </Box>
          ) : null}
          <PasswordInputComponent register={form.register} errors={form.formState.errors} />
          <RepeatPasswordInputComponent
            register={form.register}
            errors={form.formState.errors}
          />
          {submitError ? (
            <Text as="span" color="danger" font="headerNav" fontSize={14}>
              {submitError}
            </Text>
          ) : null}
          <SubmitButtonComponent
            buttonProps={{ type: 'submit', disabled: submitting }}
            label={submitting ? t('loading') : t('submit')}
          />
          <CtaComponent />
        </Box>
      </Box>
    </MainLayoutComponent>
  );
}
