import type {ReactNode} from 'react';
import {redirect} from 'next/navigation';
import {Suspense} from 'react';
import {ConfirmComponent} from '../../../fragments/confirm/src';
import {getBrowserFlowRedirectUrl} from '../../../lib/kratos/server';

type ConfirmPageProps = {
  searchParams: Promise<{
    flow?: string;
  }>;
};

export default async function ConfirmPage({
  searchParams,
}: ConfirmPageProps): Promise<ReactNode> {
  const params = await searchParams;

  if (!params.flow) {
    redirect(getBrowserFlowRedirectUrl('verification', '/auth/confirm'));
  }

  return (
    <Suspense fallback={null}>
      <ConfirmComponent />
    </Suspense>
  );
}
