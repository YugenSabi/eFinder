import { Box } from '@ui/layout';
import { Text } from '@ui/text';

export function EventCardTags({ tags }: { tags: string[] }) {
  return (
    <Box gap={6} style={{ flexWrap: 'wrap' }}>
      {tags.map((tag) => (
        <Box
          key={tag}
          minWidth={44}
          height={18}
          paddingLeft={10}
          paddingRight={10}
          justifyContent="center"
          alignItems="center"
          borderRadius={999}
          style={{ backgroundColor: '#A5A5A5' }}
        >
          <Text font="headerNav" fontSize={8} color="surface">
            {tag}
          </Text>
        </Box>
      ))}
    </Box>
  );
}
