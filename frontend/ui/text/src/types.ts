import type {CSSProperties, ReactNode} from 'react';
import type {ColorValue, FontValue} from '@ui/theme';

export type TextTone = 'body' | 'title' | 'subtitle' | 'eyebrow';

export type TextProps = {
  as?: 'span' | 'p' | 'h1' | 'h2';
  children: ReactNode;
  tone?: TextTone;
  color?: ColorValue;
  font?: FontValue;
  fontSize?: number;
  lineHeight?: number;
  letterSpacing?: number;
  style?: CSSProperties;
};
