import { Button } from '@ui/button';
import { Input } from '@ui/input';
import { Box } from '@ui/layout';
import { Text } from '@ui/text';
import type { ProfileViewModel } from './model';

export function ProfileOverviewSection({
  profile,
  form,
  saving,
  saveLabel,
  saveLoadingLabel,
  onSave,
  onFieldChange,
  actionLabel,
  onAction,
}: {
  profile: ProfileViewModel;
  form: {
    firstName: string;
    lastName: string;
    headline: string;
    portfolioSummary: string;
    age: string;
    school: string;
    city: string;
    telegram: string;
    githubUrl: string;
    behanceUrl: string;
    vkUrl: string;
  };
  saving: boolean;
  saveLabel: string;
  saveLoadingLabel: string;
  onSave: () => void | Promise<void>;
  onFieldChange: (field: string, value: string) => void;
  actionLabel?: string;
  onAction?: () => void;
}) {
  return (
    <Box gap={14} alignItems="stretch" style={{ flexWrap: 'wrap' }}>
      <Box
        width={290}
        minWidth={290}
        height={290}
        minHeight={290}
        border="1.5px solid #000000"
        borderRadius={28}
        backgroundColor="surface"
        justifyContent="center"
        alignItems="center"
      >
        {profile.avatarUrl ? (
          <img
            src={profile.avatarUrl}
            alt={profile.fullName}
            style={{ width: '100%', height: '100%', objectFit: 'cover' }}
          />
        ) : (
          <Text font="headerNav" fontSize={54}>
            {(profile.firstName[0] ?? profile.fullName[0] ?? '').toUpperCase()}
            {(profile.lastName[0] ?? '').toUpperCase()}
          </Text>
        )}
      </Box>
      <Box
        flexGrow={1}
        direction="column"
        gap={22}
        padding={18}
        borderRadius={28}
        backgroundColor="cardBg"
        shadow="soft"
        style={{ minWidth: 360, boxShadow: '-3px 3px 3px rgba(0, 0, 0, 0.25)' }}
      >
        <Box gap={22} justifyContent="space-between" alignItems="stretch" style={{ flexWrap: 'wrap' }}>
          <Box direction="column" gap={10} style={{ flex: '1 1 340px' }}>
            <Text font="headerNav" fontSize={20}>
              {profile.fullName}
            </Text>
            <Text font="footerText" fontSize={15}>
              {profile.roleLine}
            </Text>
            <Text font="footerText" fontSize={15}>
              {profile.description}
            </Text>
            <Box gap={24} style={{ flexWrap: 'wrap' }}>
              <Box direction="column" gap={8} style={{ flex: '1 1 200px' }}>
                <Text font="headerNav" fontSize={15}>
                  Личная информация
                </Text>
                <Input
                  label="Имя"
                  value={form.firstName}
                  onChange={(event) => onFieldChange('firstName', event.currentTarget.value)}
                />
                <Input
                  label="Фамилия"
                  value={form.lastName}
                  onChange={(event) => onFieldChange('lastName', event.currentTarget.value)}
                />
                <Input
                  label="Краткое описание"
                  value={form.headline}
                  onChange={(event) => onFieldChange('headline', event.currentTarget.value)}
                />
                <Input
                  label="Описание"
                  value={form.portfolioSummary}
                  onChange={(event) => onFieldChange('portfolioSummary', event.currentTarget.value)}
                />
                <Input
                  label="Возраст"
                  type="number"
                  value={form.age}
                  onChange={(event) => onFieldChange('age', event.currentTarget.value)}
                />
                <Input
                  label="Школа / организация"
                  value={form.school}
                  onChange={(event) => onFieldChange('school', event.currentTarget.value)}
                />
                <Input
                  label="Город"
                  value={form.city}
                  onChange={(event) => onFieldChange('city', event.currentTarget.value)}
                />
              </Box>
              <Box direction="column" gap={8} style={{ flex: '1 1 220px' }}>
                <Text font="headerNav" fontSize={15}>
                  Ссылки
                </Text>
                <Input
                  label="Telegram"
                  value={form.telegram}
                  onChange={(event) => onFieldChange('telegram', event.currentTarget.value)}
                />
                <Input
                  label="Github"
                  value={form.githubUrl}
                  onChange={(event) => onFieldChange('githubUrl', event.currentTarget.value)}
                />
                <Input
                  label="Behance"
                  value={form.behanceUrl}
                  onChange={(event) => onFieldChange('behanceUrl', event.currentTarget.value)}
                />
                <Input
                  label="VK"
                  value={form.vkUrl}
                  onChange={(event) => onFieldChange('vkUrl', event.currentTarget.value)}
                />
              </Box>
            </Box>
            <Box gap={12} wrap="wrap">
              <Button
                label={saving ? saveLoadingLabel : saveLabel}
                bg="contrastColor"
                font="headerNav"
                disabled={saving}
                onClick={onSave}
              />
              {actionLabel && onAction ? (
                <Button
                  label={actionLabel}
                  variant="secondary"
                  font="headerNav"
                  onClick={onAction}
                />
              ) : null}
            </Box>
            <Box direction="column" gap={6}>
              <Text font="headerNav" fontSize={15}>
                Баллов для кадрового резерва: {profile.reserveScore}
              </Text>
              {profile.personalInfo.map((item) => (
                <Text key={item} font="footerText" fontSize={15}>
                  • {item}
                </Text>
              ))}
              {profile.links.map((item) => (
                <Text key={item} font="footerText" fontSize={15}>
                  • {item}
                </Text>
              ))}
            </Box>
          </Box>
          <Box
            direction="column"
            gap={10}
            padding={14}
            borderRadius={24}
            style={{ flex: '1 1 360px', minWidth: 320 }}
          >
            <Text font="headerNav" fontSize={20}>
              Текущий рейтинг в общем зачете
            </Text>
            {profile.rating.length === 0 ? (
              <Text font="footerText" fontSize={15}>
                Пока нет данных по рейтингу
              </Text>
            ) : (
              profile.rating.map((item) => (
                <Box
                  key={item.place}
                  alignItems="center"
                  justifyContent="space-between"
                  padding={8}
                  borderRadius={18}
                  backgroundColor={item.highlight ? 'background' : 'cardBg'}
                  border={item.highlight ? '1px solid rgba(68, 126, 173, 0.45)' : undefined}
                  gap={12}
                  style={{ boxShadow: '-3px 3px 3px rgba(0, 0, 0, 0.25)' }}
                >
                  <Box
                    width={36}
                    height={36}
                    justifyContent="center"
                    alignItems="center"
                    borderRadius={10}
                    backgroundColor="surface"
                  >
                    <Text font="headerNav" fontSize={16}>
                      {item.place}
                    </Text>
                  </Box>
                  <Box flexGrow={1} justifyContent="center" alignItems="center">
                    <Text font="headerNav" fontSize={16}>
                      {item.name}
                    </Text>
                  </Box>
                  <Box
                    minWidth={74}
                    height={36}
                    justifyContent="center"
                    alignItems="center"
                    borderRadius={10}
                    backgroundColor="surface"
                  >
                    <Text font="headerNav" fontSize={18}>
                      {item.score}
                    </Text>
                  </Box>
                </Box>
              ))
            )}
          </Box>
        </Box>
      </Box>
    </Box>
  );
}
