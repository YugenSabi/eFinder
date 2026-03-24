'use client';

import {Button} from '@ui/button';
import {Box} from '@ui/layout';
import {Text} from '@ui/text';

type CenteredCardProps = {
  title: string;
  description: string;
  actionLabel: string;
  onAction: () => void;
};

export function CenteredCardComponent({
  title,
  description,
  actionLabel,
  onAction,
}: CenteredCardProps) {
  return (
    <Box
      as="main"
      width="$full"
      justifyContent="center"
      alignItems="center"
      paddingTop={48}
      paddingBottom={48}
    >
      <Box
        direction="column"
        width="$full"
        maxWidth={560}
        gap={16}
        padding={32}
        borderRadius={24}
        backgroundColor="cardBg"
        style={{boxShadow: '-3px 3px 3px rgba(0, 0, 0, 0.25)'}}
      >
        <Text font="headerNav" fontSize={38}>
          {title}
        </Text>
        <Text font="footerText" fontSize={15}>
          {description}
        </Text>
        <Button
          label={actionLabel}
          bg="contrastColor"
          borderColor="contrastColor"
          font="headerNav"
          onClick={onAction}
        />
      </Box>
    </Box>
  );
}
