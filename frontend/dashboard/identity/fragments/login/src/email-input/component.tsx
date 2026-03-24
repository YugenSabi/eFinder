import { Box } from '@ui/layout';
import { Input } from '@ui/input';
import { Text } from '@ui/text';
import type { InputProps } from '@ui/input';
import { useTranslations } from 'next-intl';
import type { FieldErrors, UseFormRegister } from 'react-hook-form';
import type { TypeLoginSchema } from '../../schemas';

type EmailInputComponentProps = {
  register: UseFormRegister<TypeLoginSchema>;
  errors: FieldErrors<TypeLoginSchema>;
  inputProps?: Omit<InputProps, 'label' | 'placeholder' | 'type' | 'name'>;
};

export function EmailInputComponent({
  register,
  errors,
  inputProps,
}: EmailInputComponentProps) {
  const t = useTranslations('Auth.login.email');

  return (
    <Box direction="column" gap={6}>
      <Input
        label={t('label')}
        labelFont="headerNav"
        type="email"
        font="headerNav"
        placeholder={t('placeholder')}
        error={Boolean(errors.email)}
        {...register('email')}
        {...inputProps}
      />
      {errors.email?.message ? (
        <Text as="span" color="danger" font="headerNav" fontSize={14}>
          {String(errors.email.message)}
        </Text>
      ) : null}
    </Box>
  );
}
