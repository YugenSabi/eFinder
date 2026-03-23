import type {ReactNode} from 'react';
import {Suspense} from 'react';
import {ConfirmComponent} from '../../../fragments/confirm/src';

export default function ConfirmPage(): ReactNode {
  return (
    <Suspense fallback={null}>
      <ConfirmComponent />
    </Suspense>
  );
}
