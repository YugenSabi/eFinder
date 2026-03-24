import type { ChangeEvent } from 'react';
import { Box } from '@ui/layout';
import { FilterIcon } from '@ui/icons';

type RatingSearchProps = {
  value: string;
  onChange: (value: string) => void;
};

export function RatingSearch({ value, onChange }: RatingSearchProps) {
  return (
    <Box width="$full" justifyContent="center" alignItems="center" gap={18}>
      <Box
        width="$full"
        maxWidth={700}
        height={55}
        borderRadius={16}
        backgroundColor="cardBg"
        paddingLeft={14}
        paddingRight={14}
        alignItems="center"
        gap={12}
        style={{ boxShadow: '0 2px 3px rgba(0, 0, 0, 0.18)' }}
      >
        <svg width="26" height="26" viewBox="0 0 24 24" fill="none" aria-hidden="true">
          <circle cx="11" cy="11" r="7" stroke="#1D1A16" strokeWidth="2.5" />
          <path d="M16.5 16.5L21 21" stroke="#1D1A16" strokeWidth="2.5" strokeLinecap="round" />
        </svg>

        <input
          value={value}
          onChange={(event: ChangeEvent<HTMLInputElement>) => onChange(event.target.value)}
          placeholder="Поиск участников"
          aria-label="Поиск участников"
          style={{
            width: '100%',
            height: '100%',
            border: 'none',
            outline: 'none',
            background: 'transparent',
            fontFamily: 'var(--font-geologica), Georgia, serif',
            fontSize: '18px',
            color: '#1D1A16',
          }}
        />
      </Box>

      <Box width={34} height={34} justifyContent="center" alignItems="center">
        <FilterIcon />
      </Box>
    </Box>
  );
}
