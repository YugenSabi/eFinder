import type {CSSProperties} from 'react';
import {cssVarColor, cssVarFont} from '@ui/theme';
import type {ButtonSize, ButtonVariant} from './types';

export function sizeStyle(size: ButtonSize): CSSProperties {
  switch (size) {
    case 'sm':
      return {height: 34, fontSize: 12, padding: '0 11px'};
    case 'lg':
      return {height: 50, fontSize: 15, padding: '0 16px'};
    case 'md':
    default:
      return {height: 40, fontSize: 13, padding: '0 13px'};
  }
}

export function variantStyle(variant: ButtonVariant): CSSProperties {
  switch (variant) {
    case 'ghost':
      return {
        backgroundColor: 'transparent',
        border: 'none',
        color: cssVarColor('primaryText'),
      };
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
