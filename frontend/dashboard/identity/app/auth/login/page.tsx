import type {ReactNode} from 'react';
import {redirect} from 'next/navigation';
import {Suspense} from 'react';
import {LoginComponent} from '@identity/login';
import {getBrowserFlowRedirectUrl} from '../../../lib/kratos/server';
import {getServerCurrentUser} from '../../../lib/kratos/server';

type LoginPageProps = {
  searchParams: Promise<{
    flow?: string;
  }>;
};

export default async function LoginPage({
  searchParams,
}: LoginPageProps): Promise<ReactNode> {
  const params = await searchParams;
  const currentUser = await getServerCurrentUser();

  if (currentUser) {
    redirect('/profile');
  }

  if (!params.flow) {
    redirect(getBrowserFlowRedirectUrl('login', '/auth/login'));
  }

  return (
    <Suspense fallback={null}>
      <LoginComponent />
    </Suspense>
  );
}
