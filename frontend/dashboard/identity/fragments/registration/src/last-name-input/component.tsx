import { Box } from '@ui/layout';
import { Input } from '@ui/input';
import { Text } from '@ui/text';
import type { InputProps } from '@ui/input';
import { useTranslations } from 'next-intl';
import type { FieldErrors, UseFormRegister } from 'react-hook-form';
import type { TypeRegisterSchema } from '../../schemas';

type LastNameInputComponentProps = {
  register: UseFormRegister<TypeRegisterSchema>;
  errors: FieldErrors<TypeRegisterSchema>;
  inputProps?: Omit<InputProps, 'label' | 'placeholder' | 'type' | 'name'>;
};

export function LastNameInputComponent({
  register,
  errors,
  inputProps,
}: LastNameInputComponentProps) {
  const t = useTranslations('Auth.registration.lastName');

  return (
    <Box direction="column" gap={6}>
      <Input
        label={t('label')}
        labelFont="headerNav"
        type="text"
        font="headerNav"
        placeholder={t('placeholder')}
        error={Boolean(errors.lastName)}
        {...register('lastName')}
        {...inputProps}
      />
      {errors.lastName?.message ? (
        <Text as="span" color="danger" font="headerNav" fontSize={14}>
          {String(errors.lastName.message)}
        </Text>
      ) : null}
    </Box>
  );
}
