import {Button} from '@ui/button';
import {Box} from '@ui/layout';

type ProfileSettingsActionsProps = {
  saveLabel: string;
  savingLabel: string;
  backLabel: string;
  logoutLabel: string;
  loggingOutLabel: string;
  saving: boolean;
  loggingOut: boolean;
  onBack: () => void;
  onLogout: () => void | Promise<void>;
};

export function ProfileSettingsActions({
  saveLabel,
  savingLabel,
  backLabel,
  logoutLabel,
  loggingOutLabel,
  saving,
  loggingOut,
  onBack,
  onLogout,
}: ProfileSettingsActionsProps) {
  return (
    <Box justifyContent="space-between" gap={12} wrap="wrap">
      <Button label={backLabel} variant="secondary" font="headerNav" onClick={onBack} />
      <Box gap={12} wrap="wrap">
        <Button
          label={loggingOut ? loggingOutLabel : logoutLabel}
          variant="secondary"
          font="headerNav"
          onClick={onLogout}
        />
        <Button
          label={saving ? savingLabel : saveLabel}
          type="submit"
          bg="contrastColor"
          font="headerNav"
          disabled={saving}
        />
      </Box>
    </Box>
  );
}
