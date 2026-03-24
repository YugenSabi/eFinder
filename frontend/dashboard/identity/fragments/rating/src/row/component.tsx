import {Box} from '@ui/layout';
import {Text} from '@ui/text';
import type {RatingRowModel} from '../types';

export function RatingRow({row}: {row: RatingRowModel}) {
  return (
    <Box
      width="$full"
      height={54}
      borderRadius={14}
      backgroundColor="background"
      alignItems="center"
      justifyContent="space-between"
      paddingLeft={10}
      paddingRight={10}
      style={{boxShadow: '0 2px 3px rgba(0, 0, 0, 0.18)'}}
    >
      <Box
        width={38}
        height={38}
        borderRadius={8}
        backgroundColor="cardBg"
        justifyContent="center"
        alignItems="center"
      >
        <Text font="headerNav" fontSize={16}>
          {row.place}
        </Text>
      </Box>

      <Box
        flexGrow={1}
        justifyContent="center"
        alignItems="center"
        paddingLeft={16}
        paddingRight={16}
      >
        <Text font="footerText" fontSize={16}>
          {row.fullName}
        </Text>
      </Box>

      <Box
        minWidth={60}
        maxWidth={60}
        height={38}
        borderRadius={8}
        backgroundColor="cardBg"
        justifyContent="center"
        alignItems="center"
        paddingLeft={10}
        paddingRight={10}
      >
        <Text font="headerNav" fontSize={16}>
          {row.score}
        </Text>
      </Box>
    </Box>
  );
}
