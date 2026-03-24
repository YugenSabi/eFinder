import type { ChangeEvent } from 'react';
import { Box } from '@ui/layout';
import { FilterIcon } from '@ui/icons';

type EventsSearchComponentProps = {
  value: string;
  onChange: (value: string) => void;
};

export function EventsSearchComponent({ value, onChange }: EventsSearchComponentProps) {
  return (
    <Box width="$full" justifyContent="center" alignItems="center" gap={18} paddingTop={15}>
      <Box
        width="$full"
        maxWidth={798}
        height={55}
        borderRadius={20}
        backgroundColor="cardBg"
        padding={15}
        alignItems="center"
        gap={10}
      >
        <svg width="26" height="26" viewBox="0 0 24 24" fill="none" aria-hidden="true">
          <circle cx="11" cy="11" r="7" stroke="#1D1A16" strokeWidth="2.5" />
          <path d="M16.5 16.5L21 21" stroke="#1D1A16" strokeWidth="2.5" strokeLinecap="round" />
        </svg>

        <input
          value={value}
          onChange={(event: ChangeEvent<HTMLInputElement>) => onChange(event.target.value)}
          placeholder="Поиск событий"
          aria-label="Поиск событий"
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
