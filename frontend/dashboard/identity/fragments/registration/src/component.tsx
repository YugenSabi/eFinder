'use client';

import { zodResolver } from '@hookform/resolvers/zod';
import {
  getBrowserFlow,
  getCsrfToken,
  getVerificationConfirmPath,
  startBrowserFlow,
  submitRegistrationFlow,
  syncCurrentUser,
} from '../../../lib/kratos';
import { useAuth } from '../../../lib/auth/context';
import { MainLayoutComponent } from '@identity/main-layout';
import { Box } from '@ui/layout';
import { Text } from '@ui/text';
import { useRouter, useSearchParams } from 'next/navigation';
import { useEffect, useState } from 'react';
import { useTranslations } from 'next-intl';
import { useForm } from 'react-hook-form';
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
      firstName: '',
      lastName: '',
      password: '',
      repeatPassword: '',
    },
  });

  useEffect(() => {
    const nextFlowId = searchParams.get('flow');

    if (!nextFlowId) {
      startBrowserFlow('registration');
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
      startBrowserFlow('registration');
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
      setCurrentUser(currentUser);
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
          <EmailInputComponent register={form.register} errors={form.formState.errors} />
          <FirstNameInputComponent register={form.register} errors={form.formState.errors} />
          <LastNameInputComponent register={form.register} errors={form.formState.errors} />
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
