import {Box} from '@ui/layout';
import {Text} from '@ui/text';

export function MainFooter() {
  return (
    <Box
      position="relative"
      zIndex={1}
      alignItems="center"
      justifyContent="space-between"
      marginTop="auto"
      padding={24}
      surface="frosted"
    >
      <Text as="span" tone="eyebrow">
        Olympians NextJs Workshop
      </Text>
      <Text as="span">Modular starter</Text>
    </Box>
  );
}
