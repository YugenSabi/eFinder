'use client';

import { zodResolver } from '@hookform/resolvers/zod';
import { MainLayoutComponent } from '@identity/main-layout';
import { Box } from '@ui/layout';
import { useForm } from 'react-hook-form';
import { LoginSchema, type TypeLoginSchema } from '../schemas';
import { EmailInputComponent } from './email-input';
import { PasswordInputComponent } from './password-input';
import { SubmitButtonComponent } from './submit-button';
import { TitleComponent } from './title/component';

export function LoginComponent() {
  const form = useForm<TypeLoginSchema>({
    resolver: zodResolver(LoginSchema),
    defaultValues: {
      email: '',
      password: '',
    },
  });

  const onSubmit = (_data: TypeLoginSchema) => {};

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
          <PasswordInputComponent register={form.register} errors={form.formState.errors} />
          <SubmitButtonComponent buttonProps={{ type: 'submit' }} />
        </Box>
      </Box>
    </MainLayoutComponent>
  );
}
