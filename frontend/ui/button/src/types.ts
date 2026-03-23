import type {ButtonHTMLAttributes, CSSProperties} from 'react';
import type {ColorValue, FontValue, RadiusToken} from '@ui/theme';

export type ButtonVariant = 'primary' | 'secondary' | 'ghost';
export type ButtonSize = 'sm' | 'md' | 'lg';

export type ButtonProps = Omit<ButtonHTMLAttributes<HTMLButtonElement>, 'color'> & {
  label: string;
  variant?: ButtonVariant;
  size?: ButtonSize;
  fullWidth?: boolean;
  font?: FontValue;
  fontSize?: number | string;
  fontWeight?: CSSProperties['fontWeight'];
  textColor?: ColorValue;
  borderColor?: ColorValue;
  bg?: ColorValue;
  radius?: RadiusToken;
};
