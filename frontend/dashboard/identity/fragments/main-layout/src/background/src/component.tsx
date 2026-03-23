import {Box} from '@ui/layout';

export function MainBackgroundComponent() {
  return (
    <Box position="absolute" inset={0} overflow="hidden">
      <Box position="absolute" top={48} left={48} width={220} height={220} surface="orb" />
      <Box position="absolute" top={160} right={96} width={320} height={320} surface="orbSecondary" />
      <Box position="absolute" bottom={-40} left="20%" width={420} height={240} surface="grid" />
    </Box>
  );
}
