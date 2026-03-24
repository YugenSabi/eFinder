import {Box} from '@ui/layout';
import {Text} from '@ui/text';
import type {ActivityPoint} from '../model';

type ActivityChartProps = {
  points: ActivityPoint[];
  ticks?: number[];
};

function buildTicks(points: ActivityPoint[]) {
  const maxValue = Math.max(...points.map((point) => point.value), 1);

  if (maxValue <= 5) {
    return [1, 2, 3, 4, 5];
  }

  if (maxValue <= 10) {
    return [2, 4, 6, 8, 10];
  }

  const step = Math.ceil(maxValue / 5);
  return Array.from({length: 5}, (_, index) => step * (index + 1));
}

export function ActivityChart({points, ticks}: ActivityChartProps) {
  const resolvedTicks = ticks ?? buildTicks(points);
  const width = 2000;
  const height = 340;
  const paddingLeft = 42;
  const paddingRight = 8;
  const paddingTop = 4;
  const paddingBottom = 42;
  const maxTick = Math.max(...resolvedTicks, ...points.map((point) => point.value), 1);
  const roundedMax = Math.max(maxTick, 1);

  const chartWidth = width - paddingLeft - paddingRight;
  const chartHeight = height - paddingTop - paddingBottom;

  const toX = (index: number) =>
    paddingLeft + (chartWidth / Math.max(points.length - 1, 1)) * index;
  const toY = (value: number) =>
    paddingTop + chartHeight - (value / roundedMax) * chartHeight;

  const path = points
    .map(
      (point, index) =>
        `${index === 0 ? 'M' : 'L'} ${toX(index)} ${toY(point.value)}`,
    )
    .join(' ');

  return (
    <Box direction="column" gap={8}>
      <Text font="headerNav" fontSize={20}>
        График активности
      </Text>

      <Box
        width="$full"
        paddingTop={0}
        paddingBottom={0}
        paddingLeft={0}
        paddingRight={0}
      >
        <svg
          viewBox={`0 0 ${width} ${height}`}
          width="100%"
          height="340"
          aria-label="График активности"
        >
          <line
            x1={paddingLeft}
            y1={height - paddingBottom}
            x2={width - paddingRight}
            y2={height - paddingBottom}
            stroke="#0C0310"
            strokeWidth="3.5"
          />
          <line
            x1={paddingLeft}
            y1={paddingTop}
            x2={paddingLeft}
            y2={height - paddingBottom}
            stroke="#0C0310"
            strokeWidth="3.5"
          />

          {resolvedTicks.map((tick) => {
            const y = toY(tick);

            return (
              <g key={tick}>
                <line
                  x1={paddingLeft}
                  y1={y}
                  x2={width - paddingRight}
                  y2={y}
                  stroke="rgba(12, 3, 16, 0.22)"
                  strokeWidth="1.5"
                />
                <text
                  x={paddingLeft + 8}
                  y={y + 8}
                  fontFamily="var(--font-delagothicone), Georgia, serif"
                  fontSize="18"
                  fill="#0C0310"
                >
                  {tick}
                </text>
              </g>
            );
          })}

          {points.length > 0 ? (
            <>
              <path
                d={path}
                fill="none"
                stroke="#447EAD"
                strokeWidth="2.5"
                strokeLinejoin="round"
              />

              {points.map((point, index) => (
                <circle
                  key={point.label}
                  cx={toX(index)}
                  cy={toY(point.value)}
                  r="3.5"
                  fill="#447EAD"
                />
              ))}

              {points.map((point, index) => (
                <text
                  key={`${point.label}-x`}
                  x={toX(index)}
                  y={height - 8}
                  textAnchor="middle"
                  fontFamily="var(--font-geologica), Georgia, serif"
                  fontSize="16"
                  fill="#0C0310"
                >
                  {point.label}
                </text>
              ))}
            </>
          ) : null}
        </svg>
      </Box>
    </Box>
  );
}
