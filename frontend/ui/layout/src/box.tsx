import {createElement, type CSSProperties, type HTMLAttributes, type ReactNode} from 'react';
import {cssVarColor, cssVarShadow, type ColorValue, type ShadowValue} from '@ui/theme';

type BoxTag = 'div' | 'section' | 'main' | 'header' | 'footer' | 'form';
type SizeToken = '$full';
type CssSize = number | string | SizeToken;

function toCssSize(value: CssSize | undefined): string | undefined {
  if (value === undefined) return undefined;
  if (value === '$full') return '100%';
  if (typeof value === 'number') return value + 'px';
  const trimmed = value.trim();
  if (/^-?\d+(\.\d+)?$/.test(trimmed)) return trimmed + 'px';
  return value;
}

export type BoxProps = Omit<HTMLAttributes<HTMLElement>, 'color'> & {
  as?: BoxTag;
  display?: CSSProperties['display'];
  position?: CSSProperties['position'];
  inset?: CssSize;
  top?: CssSize;
  left?: CssSize;
  right?: CssSize;
  bottom?: CssSize;
  zIndex?: CSSProperties['zIndex'];
  opacity?: CSSProperties['opacity'];
  cursor?: CSSProperties['cursor'];
  pointerEvents?: CSSProperties['pointerEvents'];
  overflow?: CSSProperties['overflow'];
  width?: CssSize;
  height?: CssSize;
  minWidth?: CssSize;
  minHeight?: CssSize | 'screen';
  maxWidth?: CssSize;
  maxHeight?: CssSize;
  backgroundColor?: ColorValue;
  color?: ColorValue;
  borderColor?: ColorValue;
  flexDirection?: CSSProperties['flexDirection'];
  direction?: CSSProperties['flexDirection'];
  alignItems?: CSSProperties['alignItems'];
  justifyContent?: CSSProperties['justifyContent'];
  flexWrap?: CSSProperties['flexWrap'];
  wrap?: CSSProperties['flexWrap'];
  gap?: CssSize;
  flexGrow?: CSSProperties['flexGrow'];
  flexShrink?: CSSProperties['flexShrink'];
  flexBasis?: CssSize;
  padding?: CssSize;
  paddingTop?: CssSize;
  paddingRight?: CssSize;
  paddingBottom?: CssSize;
  paddingLeft?: CssSize;
  margin?: CssSize;
  marginTop?: CssSize;
  marginRight?: CssSize;
  marginBottom?: CssSize;
  marginLeft?: CssSize;
  borderRadius?: CssSize;
  border?: CSSProperties['border'];
  borderTop?: CSSProperties['borderTop'];
  borderRight?: CSSProperties['borderRight'];
  borderBottom?: CSSProperties['borderBottom'];
  borderLeft?: CSSProperties['borderLeft'];
  shadow?: ShadowValue;
  surface?: 'card' | 'frosted' | 'orb' | 'orbSecondary' | 'grid';
  children?: ReactNode;
};

export function Box({
  as = 'div',
  display = 'flex',
  position,
  inset,
  top,
  left,
  right,
  bottom,
  zIndex,
  opacity,
  cursor,
  pointerEvents,
  overflow,
  width,
  height,
  minWidth,
  minHeight,
  maxWidth,
  maxHeight,
  backgroundColor,
  color,
  borderColor,
  flexDirection,
  direction,
  alignItems,
  justifyContent,
  flexWrap,
  wrap,
  gap,
  flexGrow,
  flexShrink,
  flexBasis,
  padding,
  paddingTop,
  paddingRight,
  paddingBottom,
  paddingLeft,
  margin,
  marginTop,
  marginRight,
  marginBottom,
  marginLeft,
  borderRadius,
  border,
  borderTop,
  borderRight,
  borderBottom,
  borderLeft,
  shadow,
  surface,
  style,
  ...props
}: BoxProps) {
  const resolvedPadding = toCssSize(padding);
  const surfaceStyles: Record<NonNullable<BoxProps['surface']>, CSSProperties> = {
    card: {
      backgroundColor: cssVarColor('surface'),
      border: '1px solid ' + cssVarColor('border'),
      borderRadius: '24px',
      boxShadow: cssVarShadow('card'),
    },
    frosted: {
      background: 'rgba(255, 250, 243, 0.78)',
      backdropFilter: 'blur(18px)',
      borderBottom: '1px solid rgba(232, 215, 192, 0.7)',
    },
    orb: {
      borderRadius: '50%',
      background: 'radial-gradient(circle, rgba(217, 108, 50, 0.28) 0%, rgba(217, 108, 50, 0) 72%)',
    },
    orbSecondary: {
      borderRadius: '50%',
      background: 'radial-gradient(circle, rgba(34, 107, 91, 0.22) 0%, rgba(34, 107, 91, 0) 72%)',
    },
    grid: {
      borderRadius: '48px',
      backgroundImage:
        'linear-gradient(rgba(29, 26, 22, 0.06) 1px, transparent 1px), linear-gradient(90deg, rgba(29, 26, 22, 0.06) 1px, transparent 1px)',
      backgroundSize: '24px 24px',
      opacity: 0.55,
    },
  };

  const nextStyle: CSSProperties = {
    boxSizing: 'border-box',
    display,
    position,
    inset: toCssSize(inset),
    top: toCssSize(top),
    left: toCssSize(left),
    right: toCssSize(right),
    bottom: toCssSize(bottom),
    zIndex,
    opacity,
    cursor,
    pointerEvents,
    overflow,
    width: toCssSize(width),
    height: toCssSize(height),
    minWidth: toCssSize(minWidth),
    minHeight: minHeight === 'screen' ? '100vh' : toCssSize(minHeight),
    maxWidth: toCssSize(maxWidth),
    maxHeight: toCssSize(maxHeight),
    flexDirection: direction ?? flexDirection,
    alignItems,
    justifyContent,
    flexWrap: wrap ?? flexWrap,
    gap: toCssSize(gap),
    flexGrow,
    flexShrink,
    flexBasis: toCssSize(flexBasis),
    padding: resolvedPadding,
    paddingTop: paddingTop === undefined ? resolvedPadding : toCssSize(paddingTop),
    paddingRight: paddingRight === undefined ? resolvedPadding : toCssSize(paddingRight),
    paddingBottom: paddingBottom === undefined ? resolvedPadding : toCssSize(paddingBottom),
    paddingLeft: paddingLeft === undefined ? resolvedPadding : toCssSize(paddingLeft),
    margin: toCssSize(margin),
    marginTop: toCssSize(marginTop),
    marginRight: toCssSize(marginRight),
    marginBottom: toCssSize(marginBottom),
    marginLeft: toCssSize(marginLeft),
    borderRadius: toCssSize(borderRadius),
    boxShadow: cssVarShadow(shadow),
    backgroundColor: cssVarColor(backgroundColor),
    color: cssVarColor(color),
    ...(surface ? surfaceStyles[surface] : {}),
    ...style,
  };

  if (border !== undefined) {
    nextStyle.border = border;
    if (borderTop === undefined) nextStyle.borderTop = border;
    if (borderRight === undefined) nextStyle.borderRight = border;
    if (borderBottom === undefined) nextStyle.borderBottom = border;
    if (borderLeft === undefined) nextStyle.borderLeft = border;
  }
  if (borderTop !== undefined) nextStyle.borderTop = borderTop;
  if (borderRight !== undefined) nextStyle.borderRight = borderRight;
  if (borderBottom !== undefined) nextStyle.borderBottom = borderBottom;
  if (borderLeft !== undefined) nextStyle.borderLeft = borderLeft;
  if (borderColor !== undefined) nextStyle.borderColor = cssVarColor(borderColor);

  return createElement(as, {...props, style: nextStyle});
}
