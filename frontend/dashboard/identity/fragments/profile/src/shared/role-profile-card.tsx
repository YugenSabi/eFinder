'use client';

import { Button } from '@ui/button';
import { Box } from '@ui/layout';
import { Text } from '@ui/text';

type RoleProfileCardProps = {
  title: string;
  roleLabel: string;
  actionLabel?: string;
  onAction?: () => void;
  logoutLabel: string;
  logoutLoadingLabel: string;
  loggingOut: boolean;
  onLogout: () => void | Promise<void>;
};

export function RoleProfileCard({
  title,
  roleLabel,
  actionLabel,
  onAction,
  logoutLabel,
  logoutLoadingLabel,
  loggingOut,
  onLogout,
}: RoleProfileCardProps) {
  return (
    <Box as="main" width="$full" justifyContent="center" alignItems="center" paddingTop={48} paddingBottom={48}>
      <Box direction="column" width="$full" maxWidth={520} gap={16} padding={32} surface="card">
        <Text as="h1" font="headerNav" fontSize={38}>
          {title}
        </Text>
        <Text as="p" font="headerNav" fontSize={22}>
          {roleLabel}
        </Text>
        {actionLabel && onAction ? (
          <Button
            label={actionLabel}
            bg="contrastColor"
            font="headerNav"
            onClick={onAction}
          />
        ) : null}
        <Button
          label={loggingOut ? logoutLoadingLabel : logoutLabel}
          variant="secondary"
          font="headerNav"
          onClick={onLogout}
        />
      </Box>
    </Box>
  );
}
