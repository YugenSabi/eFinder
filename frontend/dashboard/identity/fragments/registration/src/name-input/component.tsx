import { Box } from '@ui/layout';
import { Input } from '@ui/input';
import { Text } from '@ui/text';
import type { InputProps } from '@ui/input';
import { useTranslations } from 'next-intl';
import type { FieldErrors, UseFormRegister } from 'react-hook-form';
import type { TypeRegisterSchema } from '../../schemas';

type NameInputComponentProps = {
  register: UseFormRegister<TypeRegisterSchema>;
  errors: FieldErrors<TypeRegisterSchema>;
  inputProps?: Omit<InputProps, 'label' | 'placeholder' | 'type' | 'name'>;
};

export function NameInputComponent({
  register,
  errors,
  inputProps,
}: NameInputComponentProps) {
  const t = useTranslations('Auth.registration.name');

  return (
    <Box direction="column" gap={6}>
      <Input
        label={t('label')}
        labelFont="headerNav"
        type="text"
        font="headerNav"
        placeholder={t('placeholder')}
        error={Boolean(errors.name)}
        {...register('name')}
        {...inputProps}
      />
      {errors.name?.message ? (
        <Text as="span" color="danger" font="headerNav" fontSize={14}>
          {String(errors.name.message)}
        </Text>
      ) : null}
    </Box>
  );
}
