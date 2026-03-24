'use client';

import {Box} from '@ui/layout';
import {Text} from '@ui/text';
import type {PublicProfileView} from '../types';

type PublicProfileStatsSectionProps = Pick<
  PublicProfileView['user'],
  'participations'
>;

type StatPoint = {
  label: string;
  value: number;
};

function mapStats(
  participations: PublicProfileView['user']['participations'],
): StatPoint[] {
  const directions = [
    {key: 'IT', label: 'IT'},
    {key: 'SOCIAL', label: 'Soc'},
    {key: 'MEDIA', label: 'Med'},
    {key: 'EDUCATION', label: 'Edu'},
    {key: 'VOLUNTEERING', label: 'Vol'},
    {key: 'OTHER', label: 'Oth'},
  ] as const;

  const totals = new Map<string, number>();

  for (const item of participations) {
    const direction = item.event.direction;
    totals.set(direction, (totals.get(direction) ?? 0) + item.scoreAwarded);
  }

  return directions.map((direction) => ({
    label: direction.label,
    value: totals.get(direction.key) ?? 0,
  }));
}

function RadarChart({points}: {points: StatPoint[]}) {
  const size = 300;
  const center = size / 2;
  const radius = 108;
  const levels = 4;
  const maxValue = Math.max(...points.map((point) => point.value), 1);

  const polygon = (scale: number) =>
    points
      .map((point, index) => {
        const angle = (Math.PI * 2 * index) / points.length - Math.PI / 2;
        const x = center + Math.cos(angle) * radius * scale;
        const y = center + Math.sin(angle) * radius * scale;
        return `${x},${y}`;
      })
      .join(' ');

  const dataPolygon = points
    .map((point, index) => {
      const angle = (Math.PI * 2 * index) / points.length - Math.PI / 2;
      const normalized = Math.max(0.12, Math.min(point.value / maxValue, 1));
      const x = center + Math.cos(angle) * radius * normalized;
      const y = center + Math.sin(angle) * radius * normalized;
      return `${x},${y}`;
    })
    .join(' ');

  return (
    <svg
      viewBox={`0 0 ${size} ${size}`}
      width="100%"
      height="100%"
      aria-label="Статистика направлений"
    >
      {Array.from({length: levels}, (_, index) => {
        const scale = (index + 1) / levels;
        return (
          <polygon
            key={scale}
            points={polygon(scale)}
            fill="none"
            stroke="rgba(29, 26, 22, 0.18)"
            strokeWidth="1.5"
          />
        );
      })}
      {points.map((point, index) => {
        const angle = (Math.PI * 2 * index) / points.length - Math.PI / 2;
        const x = center + Math.cos(angle) * radius;
        const y = center + Math.sin(angle) * radius;
        return (
          <g key={point.label}>
            <line
              x1={center}
              y1={center}
              x2={x}
              y2={y}
              stroke="rgba(29, 26, 22, 0.26)"
              strokeWidth="1.5"
            />
            <text
              x={center + Math.cos(angle) * (radius + 18)}
              y={center + Math.sin(angle) * (radius + 18)}
              textAnchor="middle"
              dominantBaseline="middle"
              fontFamily="var(--font-geologica), Georgia, serif"
              fontSize="15"
              fill="#4c4135"
            >
              {point.label}
            </text>
          </g>
        );
      })}
      <polygon
        points={dataPolygon}
        fill="rgba(68, 126, 173, 0.18)"
        stroke="#447EAD"
        strokeWidth="4"
        strokeLinejoin="round"
      />
    </svg>
  );
}

export function PublicProfileStatsSectionComponent({
  participations,
}: PublicProfileStatsSectionProps) {
  const points = mapStats(participations);

  return (
    <Box direction="column" gap={12} style={{flex: '1 1 420px', minWidth: 360}}>
      <Box justifyContent="center" alignItems="center">
        <Text font="headerNav" fontSize={32}>
          Статистика направлений
        </Text>
      </Box>
      <Box
        justifyContent="center"
        alignItems="center"
        padding={18}
        borderRadius={18}
        backgroundColor="cardBg"
        style={{
          minHeight: 360,
          boxShadow: '-3px 3px 3px rgba(0, 0, 0, 0.25)',
        }}
      >
        {points.length === 0 ? (
          <Text font="footerText" fontSize={15}>
            Пока нет данных по направлениям
          </Text>
        ) : (
          <Box width="$full" style={{maxWidth: 355, aspectRatio: '1 / 1'}}>
            <RadarChart points={points} />
          </Box>
        )}
      </Box>
    </Box>
  );
}
