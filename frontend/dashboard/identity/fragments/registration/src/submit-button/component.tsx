import { Button } from '@ui/button';
import type { ButtonProps } from '@ui/button';
import { useTranslations } from 'next-intl';

type SubmitButtonComponentProps = {
  buttonProps?: Omit<ButtonProps, 'label'>;
  label?: string;
};

export function SubmitButtonComponent({
  buttonProps,
  label,
}: SubmitButtonComponentProps) {
  const t = useTranslations('Auth.registration');

  return (
    <Button
      bg="contrastColor"
      font="headerNav"
      label={label ?? t('submit')}
      fullWidth
      {...buttonProps}
    />
  );
}
