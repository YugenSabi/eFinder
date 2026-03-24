import {Text} from '@ui/text';

export function ProfileSettingsTitle({
  title,
  description,
}: {
  title: string;
  description: string;
}) {
  return (
    <>
      <Text font="headerNav" fontSize={38}>
        {title}
      </Text>
      <Text font="footerText" fontSize={15}>
        {description}
      </Text>
    </>
  );
}
