import type {CSSProperties} from 'react';
import {cssVarColor, cssVarFont} from '@ui/theme';
import type {TextProps, TextTone} from './types';

const stylesByTone: Record<TextTone, CSSProperties> = {
  body: {
    margin: 0,
    fontSize: 15,
    lineHeight: 1.45,
    color: cssVarColor('primaryText'),
  },
  title: {
    margin: 0,
    fontSize: 32,
    lineHeight: 1,
    letterSpacing: -1,
    color: cssVarColor('primaryText'),
    fontFamily: cssVarFont('display'),
  },
  subtitle: {
    margin: 0,
    fontSize: 18,
    lineHeight: 1.3,
    color: cssVarColor('secondaryText'),
  },
  eyebrow: {
    margin: 0,
    fontSize: 11,
    lineHeight: 1,
    textTransform: 'uppercase',
    letterSpacing: 1.6,
    color: cssVarColor('primary'),
  },
};

export function Text({
  as: Tag = 'span',
  children,
  tone = 'body',
  color,
  font,
  fontSize,
  lineHeight,
  letterSpacing,
}: TextProps) {
  return (
    <Tag
      style={{
        ...stylesByTone[tone],
        color: cssVarColor(color) ?? stylesByTone[tone].color,
        fontFamily: cssVarFont(font) ?? stylesByTone[tone].fontFamily,
        fontSize: fontSize ?? stylesByTone[tone].fontSize,
        lineHeight: lineHeight ?? stylesByTone[tone].lineHeight,
        letterSpacing: letterSpacing ?? stylesByTone[tone].letterSpacing,
      }}
    >
      {children}
    </Tag>
  );
}
