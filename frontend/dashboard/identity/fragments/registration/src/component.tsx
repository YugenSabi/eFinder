'use client';

import { zodResolver } from '@hookform/resolvers/zod';
import { MainLayoutComponent } from '@identity/main-layout';
import { Box } from '@ui/layout';
import { useForm } from 'react-hook-form';
import { RegisterSchema, type TypeRegisterSchema } from '../schemas';
import { EmailInputComponent } from './email-input';
import { NameInputComponent } from './name-input';
import { PasswordInputComponent } from './password-input';
import { RepeatPasswordInputComponent } from './repeat-password-input';
import { SubmitButtonComponent } from './submit-button';
import { TitleComponent } from './title/component';

export function RegistrationComponent() {
  const form = useForm<TypeRegisterSchema>({
    resolver: zodResolver(RegisterSchema),
    defaultValues: {
      email: '',
      name: '',
      password: '',
      repeatPassword: '',
    },
  });

  const onSubmit = (_data: TypeRegisterSchema) => {};

  return (
    <MainLayoutComponent>
      <Box as="main" width="$full" justifyContent="center" paddingTop={48} paddingBottom={48}>
        <Box
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
          <NameInputComponent register={form.register} errors={form.formState.errors} />
          <PasswordInputComponent register={form.register} errors={form.formState.errors} />
          <RepeatPasswordInputComponent
            register={form.register}
            errors={form.formState.errors}
          />
          <SubmitButtonComponent buttonProps={{ type: 'submit' }} />
        </Box>
      </Box>
    </MainLayoutComponent>
  );
}
