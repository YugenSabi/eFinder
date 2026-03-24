import type {ReactNode} from 'react';
import {redirect} from 'next/navigation';
import {Suspense} from 'react';
import {RegistrationComponent} from '@identity/registration';
import {getBrowserFlowRedirectUrl} from '../../../lib/kratos/server';

type RegistrationPageProps = {
  searchParams: Promise<{
    flow?: string;
  }>;
};

export default async function RegistrationPage({
  searchParams,
}: RegistrationPageProps): Promise<ReactNode> {
  const params = await searchParams;

  if (!params.flow) {
    redirect(getBrowserFlowRedirectUrl('registration', '/auth/registration'));
  }

  return (
    <Suspense fallback={null}>
      <RegistrationComponent />
    </Suspense>
  );
}
