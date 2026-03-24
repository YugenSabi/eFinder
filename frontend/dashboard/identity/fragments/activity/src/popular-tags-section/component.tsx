import { Box } from '@ui/layout';
import { Text } from '@ui/text';

export function PopularTagsSection({ tags }: { tags: string[] }) {
  return (
    <Box direction="column" gap={12}>
      <Text font="headerNav" fontSize={20}>
        Популярные направления событий
      </Text>

      <Box gap={8} style={{ flexWrap: 'wrap' }}>
        {tags.map((tag) => (
          <Box
            key={tag}
            height={20}
            paddingLeft={12}
            paddingRight={12}
            borderRadius={999}
            justifyContent="center"
            alignItems="center"
            style={{ backgroundColor: '#A5A5A5' }}
          >
            <Text font="headerNav" fontSize={8} color="surface">
              {tag}
            </Text>
          </Box>
        ))}
      </Box>
    </Box>
  );
}
