'use client';

import { Button } from '@ui/button';
import { Box } from '@ui/layout';
import { Text } from '@ui/text';

type CenteredCardProps = {
  title: string;
  description: string;
  actionLabel: string;
  onAction: () => void;
};

export function ObserverCenteredCard({
  title,
  description,
  actionLabel,
  onAction,
}: CenteredCardProps) {
  return (
    <Box as="main" width="$full" justifyContent="center" alignItems="center" paddingTop={48} paddingBottom={48}>
      <Box direction="column" width="$full" maxWidth={520} gap={16} padding={32} surface="card">
        <Text as="h1" font="headerNav" fontSize={38}>
          {title}
        </Text>
        <Text as="p">{description}</Text>
        <Button
          label={actionLabel}
          bg="contrastColor"
          font="headerNav"
          onClick={onAction}
        />
      </Box>
    </Box>
  );
}
