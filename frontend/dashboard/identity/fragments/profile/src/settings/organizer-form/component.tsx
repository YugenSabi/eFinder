import type {FieldErrors, UseFormRegister} from 'react-hook-form';
import {Input} from '@ui/input';
import {Box} from '@ui/layout';
import {Text} from '@ui/text';

export type OrganizerSettingsValues = {
  organizationName: string;
  bio: string;
  websiteUrl: string;
  telegram: string;
  vkUrl: string;
  logoUrl: string;
};

type OrganizerProfileSettingsFormProps = {
  email: string;
  register: UseFormRegister<OrganizerSettingsValues>;
  errors: FieldErrors<OrganizerSettingsValues>;
};

function FieldError({message}: {message?: string}) {
  if (!message) {
    return null;
  }

  return (
    <Text color="danger" font="headerNav" fontSize={13}>
      {message}
    </Text>
  );
}

export function OrganizerProfileSettingsForm({
  email,
  register,
  errors,
}: OrganizerProfileSettingsFormProps) {
  return (
    <Box direction="column" gap={14}>
      <Box direction="column" gap={8}>
        <Input
          label="Название организации"
          labelFont="headerNav"
          font="headerNav"
          {...register('organizationName')}
        />
        <FieldError message={errors.organizationName?.message} />
      </Box>

      <Box direction="column" gap={8}>
        <Input label="Почта" labelFont="headerNav" font="headerNav" value={email} readOnly />
      </Box>

      <Box direction="column" gap={8}>
        <Input label="Описание" labelFont="headerNav" font="headerNav" {...register('bio')} />
        <FieldError message={errors.bio?.message} />
      </Box>

      <Box direction="column" gap={8}>
        <Text font="headerNav" fontSize={16}>
          Ссылки
        </Text>
      </Box>

      <Box direction="column" gap={8}>
        <Input label="Сайт" labelFont="headerNav" font="headerNav" {...register('websiteUrl')} />
        <FieldError message={errors.websiteUrl?.message} />
      </Box>
      <Box direction="column" gap={8}>
        <Input label="Telegram" labelFont="headerNav" font="headerNav" {...register('telegram')} />
        <FieldError message={errors.telegram?.message} />
      </Box>
      <Box direction="column" gap={8}>
        <Input label="VK" labelFont="headerNav" font="headerNav" {...register('vkUrl')} />
        <FieldError message={errors.vkUrl?.message} />
      </Box>
      <Box direction="column" gap={8}>
        <Input label="Логотип URL" labelFont="headerNav" font="headerNav" {...register('logoUrl')} />
        <FieldError message={errors.logoUrl?.message} />
      </Box>
    </Box>
  );
}
