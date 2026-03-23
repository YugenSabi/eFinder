import type {CSSProperties} from 'react';
import {cssVarColor, cssVarFont} from '@ui/theme';
import type {ButtonSize, ButtonVariant} from './types';

export function sizeStyle(size: ButtonSize): CSSProperties {
  switch (size) {
    case 'sm':
      return {height: 36, fontSize: 13, padding: '0 12px'};
    case 'lg':
      return {height: 56, fontSize: 16, padding: '0 18px'};
    case 'md':
    default:
      return {height: 44, fontSize: 14, padding: '0 14px'};
  }
}

export function variantStyle(variant: ButtonVariant): CSSProperties {
  switch (variant) {
    case 'secondary':
      return {
        backgroundColor: 'transparent',
        border: '1px solid ' + cssVarColor('border'),
        color: cssVarColor('primaryText'),
      };
    case 'primary':
    default:
      return {
        backgroundColor: cssVarColor('primary'),
        border: 'none',
        color: '#fffaf3',
      };
  }
}

export function buttonBaseStyle(): CSSProperties {
  return {
    display: 'inline-flex',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 8,
    border: 'none',
    outline: 'none',
    cursor: 'pointer',
    fontFamily: cssVarFont('ui'),
    lineHeight: 1,
    userSelect: 'none',
    textDecoration: 'none',
    transition: 'transform 120ms ease, opacity 120ms ease',
  };
}
