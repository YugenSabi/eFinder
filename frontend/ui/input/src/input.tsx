import type {CSSProperties} from 'react';
import {cssVarColor, cssVarFont, cssVarRadius} from '@ui/theme';
import {fieldStyle, inputBaseStyle, sizeStyle, variantStyle, wrapperStyle} from './styles';
import type {InputProps} from './types';

export function Input({
  label,
  size = 'md',
  variant = 'filled',
  radius = 'md',
  fullWidth = true,
  error,
  font,
  fontSize,
  fontWeight,
  textColor = 'primaryText',
  borderColor,
  bg,
  style,
  ...props
}: InputProps) {
  const radiusValue = cssVarRadius(radius) ?? '18px';
  const wrapperStyles = wrapperStyle(radiusValue, fullWidth);
  const fieldStyles: CSSProperties = {
    ...fieldStyle(radiusValue),
    ...sizeStyle(size),
    ...variantStyle(variant, error),
    borderColor: cssVarColor(borderColor),
    backgroundColor: cssVarColor(bg) ?? variantStyle(variant, error).backgroundColor ?? cssVarColor('surface'),
  };
  const inputStyles: CSSProperties = {
    ...inputBaseStyle(),
    fontFamily: cssVarFont(font) ?? inputBaseStyle().fontFamily,
    fontSize,
    fontWeight,
    color: cssVarColor(textColor),
    padding: '0 14px',
    ...style,
  };

  return (
    <label style={wrapperStyles}>
      <span style={{fontSize: 14, color: cssVarColor('secondaryText')}}>{label}</span>
      <span style={fieldStyles}>
        <input {...props} style={inputStyles} placeholder={props.placeholder} />
      </span>
    </label>
  );
}
