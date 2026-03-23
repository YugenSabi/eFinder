import {Button} from '@ui/button';
import {SparkIcon} from '@ui/icons';
import {Box} from '@ui/layout';
import {Text} from '@ui/text';
import {HEADER_HEIGHT_PX} from './constants';

export function MainHeader() {
  return (
    <Box
      position="fixed"
      top={0}
      left={0}
      right={0}
      zIndex={2}
      alignItems="center"
      justifyContent="space-between"
      height={HEADER_HEIGHT_PX}
      padding={24}
      surface="frosted"
    >
      <Box gap={10} alignItems="center">
        <SparkIcon />
        <Text as="span" tone="eyebrow">
          Workspace
        </Text>
      </Box>
      <Box gap={12} alignItems="center">
        <Button label="Docs" variant="secondary" />
        <Button label="Launch" />
      </Box>
    </Box>
  );
}
