'use client';

import {useEffect, useState} from 'react';
import {useRouter, useSearchParams} from 'next/navigation';
import {useTranslations} from 'next-intl';
import {MainLayoutComponent} from '@identity/main-layout';
import {Button} from '@ui/button';
import {Input} from '@ui/input';
import {Box} from '@ui/layout';
import {Text} from '@ui/text';
import {useAuth} from '../../../lib/auth/context';
import {
  getBrowserFlow,
  getCsrfToken,
  resendVerificationCode,
  startBrowserFlow,
  submitVerificationFlow,
  syncCurrentUser,
} from '../../../lib/kratos';

export function ConfirmComponent() {
  const t = useTranslations('Auth.confirm');
  const router = useRouter();
  const {currentUser, setCurrentUser} = useAuth();
  const searchParams = useSearchParams();
  const [flowId, setFlowId] = useState<string | null>(null);
  const [csrfToken, setCsrfToken] = useState<string | undefined>();
  const [email, setEmail] = useState<string | undefined>();
  const [code, setCode] = useState('');
  const [submitting, setSubmitting] = useState(false);
  const [resending, setResending] = useState(false);
  const [submitError, setSubmitError] = useState<string | null>(null);

  useEffect(() => {
    const nextFlowId = searchParams.get('flow');

    if (!nextFlowId) {
      startBrowserFlow('verification');
      return;
    }

    let cancelled = false;

    getBrowserFlow('verification', nextFlowId)
      .then((flow) => {
        if (cancelled) {
          return;
        }

        setFlowId(flow.id);
        setCsrfToken(getCsrfToken(flow));
        setEmail(currentUser?.email);
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
  }, [currentUser?.email, searchParams, t]);

  const handleSubmit = async () => {
    if (!flowId) {
      startBrowserFlow('verification');
      return;
    }

    setSubmitting(true);
    setSubmitError(null);

    try {
      await submitVerificationFlow({
        flowId,
        csrfToken,
        code,
        email,
      });

      let isVerified = false;

      for (let attempt = 0; attempt < 4; attempt += 1) {
        const nextUser = await syncCurrentUser();
        setCurrentUser(nextUser);

        if (nextUser?.isVerified) {
          isVerified = true;
          break;
        }

        await new Promise((resolve) => {
          window.setTimeout(resolve, 250);
        });
      }

      if (!isVerified) {
        throw new Error(t('verificationSyncError'));
      }

      router.push('/profile');
      router.refresh();
    } catch (error) {
      setSubmitError(error instanceof Error ? error.message : t('errorDefault'));
    } finally {
      setSubmitting(false);
    }
  };

  const handleResend = async () => {
    if (!flowId) {
      startBrowserFlow('verification');
      return;
    }

    setResending(true);
    setSubmitError(null);

    try {
      const nextFlow = await resendVerificationCode({
        flowId,
        csrfToken,
        email,
      });

      if (!nextFlow?.id) {
        throw new Error(t('errorDefault'));
      }

      setFlowId(nextFlow.id);
      setCsrfToken(getCsrfToken(nextFlow));
    } catch (error) {
      setSubmitError(error instanceof Error ? error.message : t('errorDefault'));
    } finally {
      setResending(false);
    }
  };

  return (
    <MainLayoutComponent>
      <Box as="main" width="$full" justifyContent="center" alignItems="center" paddingTop={48} paddingBottom={48}>
        <Box direction="column" width="$full" maxWidth={520} gap={16} padding={32} surface="card">
          <Text as="h1" font="headerNav" fontSize={38}>
            {t('title')}
          </Text>
          <Text as="p">{t('description')}</Text>
          <Input
            label={t('code.label')}
            placeholder={t('code.placeholder')}
            value={code}
            onChange={(event) => setCode(event.currentTarget.value)}
            font="headerNav"
            labelFont="headerNav"
          />
          {submitError ? (
            <Text as="span" color="danger" font="headerNav" fontSize={14}>
              {submitError}
            </Text>
          ) : null}
          <Button
            label={submitting ? t('loading') : t('submit')}
            bg="contrastColor"
            font="headerNav"
            fullWidth
            disabled={submitting || code.trim().length === 0}
            onClick={handleSubmit}
          />
          <Button
            label={resending ? t('resendLoading') : t('resend')}
            variant="secondary"
            font="headerNav"
            fullWidth
            disabled={resending || !email}
            onClick={handleResend}
          />
        </Box>
      </Box>
    </MainLayoutComponent>
  );
}
