import { Box } from '@ui/layout';
import { Input } from '@ui/input';
import { Text } from '@ui/text';
import type { InputProps } from '@ui/input';
import { useTranslations } from 'next-intl';
import type { FieldErrors, UseFormRegister } from 'react-hook-form';
import type { TypeRegisterSchema } from '../../schemas';

type PasswordInputComponentProps = {
  register: UseFormRegister<TypeRegisterSchema>;
  errors: FieldErrors<TypeRegisterSchema>;
  inputProps?: Omit<InputProps, 'label' | 'placeholder' | 'type' | 'name'>;
};

export function PasswordInputComponent({
  register,
  errors,
  inputProps,
}: PasswordInputComponentProps) {
  const t = useTranslations('Auth.registration.password');

  return (
    <Box direction="column" gap={6}>
      <Input
        label={t('label')}
        labelFont="headerNav"
        type="password"
        placeholder={t('placeholder')}
        font="headerNav"
        error={Boolean(errors.password)}
        {...register('password')}
        {...inputProps}
      />
      {errors.password?.message ? (
        <Text as="span" color="danger" font="headerNav" fontSize={14}>
          {String(errors.password.message)}
        </Text>
      ) : null}
    </Box>
  );
}
