import type {CSSProperties} from 'react';
import {cssVarColor, cssVarFont} from '@ui/theme';
import type {TextProps, TextTone} from './types';

const stylesByTone: Record<TextTone, CSSProperties> = {
  body: {
    margin: 0,
    fontSize: 16,
    lineHeight: 1.5,
    color: cssVarColor('primaryText'),
  },
  title: {
    margin: 0,
    fontSize: 40,
    lineHeight: 1,
    letterSpacing: -1.2,
    color: cssVarColor('primaryText'),
    fontFamily: cssVarFont('display'),
  },
  subtitle: {
    margin: 0,
    fontSize: 20,
    lineHeight: 1.3,
    color: cssVarColor('secondaryText'),
  },
  eyebrow: {
    margin: 0,
    fontSize: 12,
    lineHeight: 1,
    textTransform: 'uppercase',
    letterSpacing: 2,
    color: cssVarColor('primary'),
  },
};

export function Text({as: Tag = 'span', children, tone = 'body', color, font}: TextProps) {
  return (
    <Tag
      style={{
        ...stylesByTone[tone],
        color: cssVarColor(color) ?? stylesByTone[tone].color,
        fontFamily: cssVarFont(font) ?? stylesByTone[tone].fontFamily,
      }}
    >
      {children}
    </Tag>
  );
}
