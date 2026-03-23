import type {CSSProperties, InputHTMLAttributes} from 'react';
import type {ColorValue, FontValue, RadiusToken} from '@ui/theme';

export type InputSize = 'sm' | 'md' | 'lg';
export type InputVariant = 'filled' | 'outline' | 'ghost';

export type InputProps = Omit<InputHTMLAttributes<HTMLInputElement>, 'size' | 'color'> & {
  label: string;
  size?: InputSize;
  variant?: InputVariant;
  radius?: RadiusToken;
  fullWidth?: boolean;
  error?: boolean;
  font?: FontValue;
  fontSize?: number | string;
  fontWeight?: CSSProperties['fontWeight'];
  textColor?: ColorValue;
  borderColor?: ColorValue;
  bg?: ColorValue;
};
