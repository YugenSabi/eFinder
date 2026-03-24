import type {FieldErrors, UseFormRegister} from 'react-hook-form';
import {Input} from '@ui/input';
import {Box} from '@ui/layout';
import {Text} from '@ui/text';

export type UserSettingsValues = {
  firstName: string;
  lastName: string;
  age: string;
  city: string;
  headline: string;
  school: string;
  telegram: string;
  githubUrl: string;
  behanceUrl: string;
  vkUrl: string;
  avatarUrl: string;
  portfolioSummary: string;
};

type UserProfileSettingsFormProps = {
  email: string;
  register: UseFormRegister<UserSettingsValues>;
  errors: FieldErrors<UserSettingsValues>;
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

export function UserProfileSettingsForm({
  email,
  register,
  errors,
}: UserProfileSettingsFormProps) {
  return (
    <Box direction="column" gap={14}>
      <Box gap={14} style={{flexWrap: 'wrap'}}>
        <Box direction="column" gap={8} style={{flex: '1 1 220px'}}>
          <Input label="Имя" labelFont="headerNav" font="headerNav" {...register('firstName')} />
          <FieldError message={errors.firstName?.message} />
        </Box>
        <Box direction="column" gap={8} style={{flex: '1 1 220px'}}>
          <Input label="Фамилия" labelFont="headerNav" font="headerNav" {...register('lastName')} />
          <FieldError message={errors.lastName?.message} />
        </Box>
      </Box>

      <Box direction="column" gap={8}>
        <Input label="Почта" labelFont="headerNav" font="headerNav" value={email} readOnly />
      </Box>

      <Box gap={14} style={{flexWrap: 'wrap'}}>
        <Box direction="column" gap={8} style={{flex: '1 1 220px'}}>
          <Input label="Возраст" type="number" labelFont="headerNav" font="headerNav" {...register('age')} />
          <FieldError message={errors.age?.message} />
        </Box>
        <Box direction="column" gap={8} style={{flex: '1 1 220px'}}>
          <Input label="Город" labelFont="headerNav" font="headerNav" {...register('city')} />
          <FieldError message={errors.city?.message} />
        </Box>
      </Box>

      <Box direction="column" gap={8}>
        <Input
          label="Краткое описание"
          labelFont="headerNav"
          font="headerNav"
          {...register('headline')}
        />
        <FieldError message={errors.headline?.message} />
      </Box>

      <Box direction="column" gap={8}>
        <Input label="Место обучения" labelFont="headerNav" font="headerNav" {...register('school')} />
        <FieldError message={errors.school?.message} />
      </Box>

      <Box direction="column" gap={8}>
        <Input
          label="О себе"
          labelFont="headerNav"
          font="headerNav"
          {...register('portfolioSummary')}
        />
        <FieldError message={errors.portfolioSummary?.message} />
      </Box>

      <Box direction="column" gap={8}>
        <Text font="headerNav" fontSize={16}>
          Ссылки
        </Text>
      </Box>

      <Box direction="column" gap={8}>
        <Input label="Telegram" labelFont="headerNav" font="headerNav" {...register('telegram')} />
        <FieldError message={errors.telegram?.message} />
      </Box>
      <Box direction="column" gap={8}>
        <Input label="GitHub" labelFont="headerNav" font="headerNav" {...register('githubUrl')} />
        <FieldError message={errors.githubUrl?.message} />
      </Box>
      <Box direction="column" gap={8}>
        <Input label="Behance" labelFont="headerNav" font="headerNav" {...register('behanceUrl')} />
        <FieldError message={errors.behanceUrl?.message} />
      </Box>
      <Box direction="column" gap={8}>
        <Input label="VK" labelFont="headerNav" font="headerNav" {...register('vkUrl')} />
        <FieldError message={errors.vkUrl?.message} />
      </Box>
      <Box direction="column" gap={8}>
        <Input label="Аватар URL" labelFont="headerNav" font="headerNav" {...register('avatarUrl')} />
        <FieldError message={errors.avatarUrl?.message} />
      </Box>
    </Box>
  );
}
