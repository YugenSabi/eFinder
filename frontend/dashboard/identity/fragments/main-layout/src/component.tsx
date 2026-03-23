import type {PropsWithChildren, ReactNode} from 'react';
import {Box} from '@ui/layout';
import {MainBackgroundComponent} from './background/src/component';
import {MainFooter} from './footer/src/component';
import {HEADER_HEIGHT_PX, MainHeader} from './header/src';

export function MainLayoutComponent({children}: PropsWithChildren): ReactNode {
  return (
    <Box position="relative" minHeight="screen" direction="column">
      <MainHeader />
      <MainBackgroundComponent />
      <Box
        position="relative"
        zIndex={1}
        width="100%"
        flexGrow={1}
        paddingTop={HEADER_HEIGHT_PX}
      >
        {children}
      </Box>
      <MainFooter />
    </Box>
  );
}
