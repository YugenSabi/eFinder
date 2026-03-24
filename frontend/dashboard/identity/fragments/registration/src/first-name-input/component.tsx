import { Box } from '@ui/layout';
import { Input } from '@ui/input';
import { Text } from '@ui/text';
import type { InputProps } from '@ui/input';
import { useTranslations } from 'next-intl';
import type { FieldErrors, UseFormRegister } from 'react-hook-form';
import type { TypeRegisterSchema } from '../../schemas';

type FirstNameInputComponentProps = {
  register: UseFormRegister<TypeRegisterSchema>;
  errors: FieldErrors<TypeRegisterSchema>;
  inputProps?: Omit<InputProps, 'label' | 'placeholder' | 'type' | 'name'>;
};

export function FirstNameInputComponent({
  register,
  errors,
  inputProps,
}: FirstNameInputComponentProps) {
  const t = useTranslations('Auth.registration.firstName');

  return (
    <Box direction="column" gap={6}>
      <Input
        label={t('label')}
        labelFont="headerNav"
        type="text"
        font="headerNav"
        placeholder={t('placeholder')}
        error={Boolean(errors.firstName)}
        {...register('firstName')}
        {...inputProps}
      />
      {errors.firstName?.message ? (
        <Text as="span" color="danger" font="headerNav" fontSize={14}>
          {String(errors.firstName.message)}
        </Text>
      ) : null}
    </Box>
  );
}
