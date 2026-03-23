import type { PropsWithChildren, ReactNode } from 'react';
import { Box } from '@ui/layout';
import { MainFooter } from './footer/src/component';
import { HEADER_HEIGHT_PX, MainHeader } from './header/src';

export function MainLayoutComponent({
  children,
}: PropsWithChildren): ReactNode {
  return (
    <Box
      position="relative"
      minHeight="screen"
      direction="column"
      backgroundColor="surface"
    >
      <MainHeader />
      <Box
        position="relative"
        zIndex={1}
        width="100%"
        flexGrow={1}
        paddingLeft={50}
        paddingRight={50}
        paddingTop={HEADER_HEIGHT_PX}
      >
        {children}
      </Box>
      <MainFooter />
    </Box>
  );
}
