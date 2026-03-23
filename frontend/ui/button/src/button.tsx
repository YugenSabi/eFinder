import type {CSSProperties} from 'react';
import {cssVarColor, cssVarFont, cssVarRadius} from '@ui/theme';
import {buttonBaseStyle, sizeStyle, variantStyle} from './styles';
import type {ButtonProps} from './types';

export function Button({
  label,
  variant = 'primary',
  size = 'md',
  fullWidth,
  disabled = false,
  font,
  fontSize,
  fontWeight,
  textColor,
  borderColor,
  bg,
  radius = 'pill',
  style,
  ...props
}: ButtonProps) {
  const buttonStyles: CSSProperties = {
    ...buttonBaseStyle(),
    ...sizeStyle(size),
    ...variantStyle(variant),
    width: fullWidth ? '100%' : undefined,
    borderRadius: cssVarRadius(radius),
    fontFamily: cssVarFont(font) ?? buttonBaseStyle().fontFamily,
    fontSize,
    fontWeight,
    color: cssVarColor(textColor) ?? variantStyle(variant).color,
    backgroundColor: cssVarColor(bg) ?? variantStyle(variant).backgroundColor,
    borderColor: cssVarColor(borderColor) ?? variantStyle(variant).borderColor,
    opacity: disabled ? 0.6 : 1,
    cursor: disabled ? 'not-allowed' : buttonBaseStyle().cursor,
    ...style,
  };

  return (
    <button
      type="button"
      disabled={disabled}
      style={buttonStyles}
      {...props}
    >
      {label}
    </button>
  );
}
