const colors = {
  background: '#f6f1e8',
  surface: '#fffaf3',
  cardBg: '#AEA7A333',
  contrastColor: '#447EAD',
  primary: '#d96c32',
  secondary: '#226b5b',
  border: '#e8d7c0',
  primaryText: '#1d1a16',
  secondaryText: '#4c4135',
  mutedText: '#888888',
  danger: '#a63c2f',
} as const;

const fonts = {
  display: "Georgia, 'Times New Roman', serif",
  headerBrand: "var(--font-underrated), Georgia, 'Times New Roman', serif",
  headerNav: "var(--font-dela-gothic-one), Georgia, 'Times New Roman', serif",
  footerText: "var(--font-geologica), Georgia, 'Times New Roman', serif",
  ui: "Georgia, 'Times New Roman', serif",
} as const;

const radius = {
  sm: '12px',
  md: '18px',
  lg: '24px',
  pill: '999px',
} as const;

const shadows = {
  card: '0 24px 80px rgba(74, 42, 18, 0.12)',
  soft: '0 12px 32px rgba(74, 42, 18, 0.08)',
} as const;

export type ColorValue = keyof typeof colors;
export type FontValue = keyof typeof fonts;
export type RadiusToken = keyof typeof radius;
export type ShadowValue = keyof typeof shadows;

export const theme = {
  colors,
  fonts,
  radius,
  shadows,
} as const;

export function cssVarColor(value?: ColorValue): string | undefined {
  if (!value) return undefined;
  return theme.colors[value];
}

export function cssVarFont(value?: FontValue): string | undefined {
  if (!value) return undefined;
  return theme.fonts[value];
}

export function cssVarRadius(value?: RadiusToken): string | undefined {
  if (!value) return undefined;
  return theme.radius[value];
}

export function cssVarShadow(value?: ShadowValue): string | undefined {
  if (!value) return undefined;
  return theme.shadows[value];
}
