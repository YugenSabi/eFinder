import {Box} from './box';

type SpaceProps = {
  size?: number;
  axis?: 'vertical' | 'horizontal';
};

export function Space({size = 16, axis = 'vertical'}: SpaceProps) {
  return <Box width={axis === 'horizontal' ? size : 1} height={axis === 'vertical' ? size : 1} />;
}
