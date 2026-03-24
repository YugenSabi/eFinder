import {Box} from '@ui/layout';
import type {RatingRowModel} from '../types';
import {RatingRow} from '../row';

export function RatingList({rows}: {rows: RatingRowModel[]}) {
  return (
    <Box direction="column" width="$full" gap={8}>
      {rows.map((row) => (
        <RatingRow key={row.id} row={row} />
      ))}
    </Box>
  );
}
