import type { CSSProperties } from 'react';
import { cssVarColor, cssVarFont } from '@ui/theme';
import type { InputSize, InputVariant } from './types';

export function sizeStyle(size: InputSize): CSSProperties {
  switch (size) {
    case 'sm':
      return { height: 34, fontSize: 12, padding: '0 10px' };
    case 'lg':
      return { height: 50, fontSize: 15, padding: '0 14px' };
    case 'md':
    default:
      return { height: 40, fontSize: 13, padding: '0 12px' };
  }
}

export function variantStyle(
  variant: InputVariant,
  error?: boolean,
): CSSProperties {
  if (error) {
    return {
      borderWidth: 1,
      borderStyle: 'solid',
      borderColor: cssVarColor('danger'),
      backgroundColor: cssVarColor('background'),
    };
  }

  switch (variant) {
    case 'filled':
      return {
        backgroundColor: cssVarColor('cardBg'),
        borderWidth: 0,
        borderStyle: 'solid',
        borderColor: 'transparent',
      };
    case 'ghost':
      return {
        backgroundColor: 'transparent',
        borderWidth: 0,
        borderStyle: 'solid',
        borderColor: 'transparent',
      };
    case 'outline':
    default:
      return {
        backgroundColor: cssVarColor('background'),
        borderWidth: 1,
        borderStyle: 'solid',
        borderColor: cssVarColor('border'),
      };
  }
}

export function wrapperStyle(
  radius: string,
  fullWidth?: boolean,
): CSSProperties {
  return {
    display: 'flex',
    flexDirection: 'column',
    gap: 8,
    width: fullWidth ? '100%' : undefined,
  };
}

export function fieldStyle(radius: string): CSSProperties {
  return {
    display: 'flex',
    alignItems: 'center',
    borderRadius: radius,
    overflow: 'hidden',
  };
}

export function inputBaseStyle(): CSSProperties {
  return {
    flex: 1,
    display: 'block',
    minWidth: 0,
    height: '100%',
    border: 'none',
    outline: 'none',
    backgroundColor: 'transparent',
    fontFamily: cssVarFont('ui'),
    color: cssVarColor('primaryText'),
    width: '100%',
  };
}
