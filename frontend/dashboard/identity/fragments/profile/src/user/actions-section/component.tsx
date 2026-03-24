import {Button} from '@ui/button';
import {Box} from '@ui/layout';

type ProfileActionsSectionProps = {
  editLabel: string;
  actionLabel?: string;
  logoutLabel: string;
  logoutLoadingLabel: string;
  loggingOut: boolean;
  onEdit: () => void;
  onAction?: () => void;
  onLogout: () => void | Promise<void>;
};

export function ProfileActionsSection({
  editLabel,
  actionLabel,
  logoutLabel,
  logoutLoadingLabel,
  loggingOut,
  onEdit,
  onAction,
  onLogout,
}: ProfileActionsSectionProps) {
  return (
    <Box justifyContent="flex-end" gap={12} wrap="wrap">
      <Button label={editLabel} bg="contrastColor" font="headerNav" onClick={onEdit} />
      {actionLabel && onAction ? (
        <Button label={actionLabel} variant="secondary" font="headerNav" onClick={onAction} />
      ) : null}
      <Button
        label={loggingOut ? logoutLoadingLabel : logoutLabel}
        variant="secondary"
        font="headerNav"
        onClick={onLogout}
      />
    </Box>
  );
}
