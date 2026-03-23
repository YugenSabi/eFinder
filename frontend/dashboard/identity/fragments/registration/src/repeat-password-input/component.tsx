import { Box } from '@ui/layout';
import { Input } from '@ui/input';
import { Text } from '@ui/text';
import type { InputProps } from '@ui/input';
import { useTranslations } from 'next-intl';
import type { FieldErrors, UseFormRegister } from 'react-hook-form';
import type { TypeRegisterSchema } from '../../schemas';

type RepeatPasswordInputComponentProps = {
  register: UseFormRegister<TypeRegisterSchema>;
  errors: FieldErrors<TypeRegisterSchema>;
  inputProps?: Omit<InputProps, 'label' | 'placeholder' | 'type' | 'name'>;
};

export function RepeatPasswordInputComponent({
  register,
  errors,
  inputProps,
}: RepeatPasswordInputComponentProps) {
  const t = useTranslations('Auth.registration.repeatPassword');

  return (
    <Box direction="column" gap={6}>
      <Input
        label={t('label')}
        labelFont="headerNav"
        type="password"
        placeholder={t('placeholder')}
        font="headerNav"
        error={Boolean(errors.repeatPassword)}
        {...register('repeatPassword')}
        {...inputProps}
      />
      {errors.repeatPassword?.message ? (
        <Text as="span" color="danger" font="headerNav" fontSize={14}>
          {String(errors.repeatPassword.message)}
        </Text>
      ) : null}
    </Box>
  );
}
