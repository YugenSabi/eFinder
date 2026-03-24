'use client';

import { Button } from '@ui/button';
import { Box } from '@ui/layout';
import { Text } from '@ui/text';

type ChoiceGroupProps = {
  label: string;
  value: string;
  options: readonly string[];
  onChange: (value: string) => void;
};

export function ChoiceGroupComponent({
  label,
  value,
  options,
  onChange,
}: ChoiceGroupProps) {
  return (
    <Box direction="column" gap={8}>
      <Text as="span" color="secondaryText" fontSize={14}>
        {label}
      </Text>
      <Box gap={8} wrap="wrap">
        {options.map((option) => (
          <Button
            key={option}
            label={option}
            variant={option === value ? 'primary' : 'secondary'}
            font="headerNav"
            onClick={() => onChange(option)}
          />
        ))}
      </Box>
    </Box>
  );
}
