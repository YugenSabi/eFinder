import type {ReactNode} from 'react';
import {Suspense} from 'react';
import {LoginComponent} from '@identity/login';

export default function LoginPage(): ReactNode {
  return (
    <Suspense fallback={null}>
      <LoginComponent />
    </Suspense>
  );
}
