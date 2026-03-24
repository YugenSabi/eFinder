import { Button } from '@ui/button';

export function EventCardButton() {
  return (
    <Button
      label="Подробнее"
      bg="contrastColor"
      textColor="surface"
      font="headerNav"
      fontSize={11}
      style={{
        width: 95,
        height: 25,
        padding: 10,
        borderRadius: 10,
      }}
    />
  );
}
