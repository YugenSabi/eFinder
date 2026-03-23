import { Button } from '@ui/button';
import type { ButtonProps } from '@ui/button';
import { useTranslations } from 'next-intl';

type SubmitButtonComponentProps = {
  buttonProps?: Omit<ButtonProps, 'label'>;
};

export function SubmitButtonComponent({
  buttonProps,
}: SubmitButtonComponentProps) {
  const t = useTranslations('Auth.login');

  return (
    <Button
      bg="contrastColor"
      font="headerNav"
      label={t('submit')}
      fullWidth
      {...buttonProps}
    />
  );
}
