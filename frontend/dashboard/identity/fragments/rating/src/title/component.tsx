import { Box } from '@ui/layout';
import { Text } from '@ui/text';

export function RatingTitle() {
  return (
    <Box width="$full" justifyContent="center" paddingTop={10} paddingBottom={10}>
      <Text font="headerNav" fontSize={20} >
        Рейтинг участников
      </Text>
    </Box>
  );
}
