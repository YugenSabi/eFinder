import type {ReactNode} from 'react';
import {Suspense} from 'react';
import {RegistrationComponent} from '@identity/registration';

export default function RegistrationPage(): ReactNode {
  return (
    <Suspense fallback={null}>
      <RegistrationComponent />
    </Suspense>
  );
}
