'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { useTranslations } from 'next-intl';
import { Button } from '@ui/button';
import { Box } from '@ui/layout';
import { Text } from '@ui/text';
import { downloadParticipantReport } from '../api';
import type { ObserverParticipant } from '../types';

function formatName(
  firstName?: string | null,
  lastName?: string | null,
  email?: string,
) {
  const fullName = [firstName, lastName].filter(Boolean).join(' ').trim();

  return fullName || email || 'Участник';
}

type ObserverParticipantCardProps = {
  participant: ObserverParticipant;
  loading: boolean;
  onToggleFavorite: (participant: ObserverParticipant) => void;
};

export function ObserverParticipantCard({
  participant,
  loading,
  onToggleFavorite,
}: ObserverParticipantCardProps) {
  const t = useTranslations('Observer');
  const router = useRouter();
  const [downloadingReport, setDownloadingReport] = useState(false);
  const [reportError, setReportError] = useState<string | null>(null);

  return (
    <Box
      direction="column"
      gap={16}
      padding={20}
      surface="card"
      borderRadius={24}
      style={{ boxShadow: '-3px 3px 10px rgba(0, 0, 0, 0.12)' }}
    >
      <Box justifyContent="space-between" alignItems="flex-start" gap={16} wrap="wrap">
        <Box direction="column" gap={6}>
          <Text as="span" font="headerNav" fontSize={22}>
            {formatName(
              participant.firstName,
              participant.lastName,
              participant.email,
            )}
          </Text>
          <Text as="span" color="secondaryText">
            {participant.email}
          </Text>
        </Box>

        <Box
          padding={10}
          borderRadius={14}
          style={{
            minWidth: '116px',
            textAlign: 'center',
            background: participant.isFavorite ? '#4E84B5' : '#E7E4E1',
          }}
        >
          <Text
            as="span"
            font={participant.isFavorite ? 'headerNav' : 'footerText'}
            color={participant.isFavorite ? 'surface' : 'primaryText'}
          >
            {participant.isFavorite ? 'В избранном' : 'Не в избранном'}
          </Text>
        </Box>
      </Box>

      <Box gap={10} wrap="wrap">
        <Box padding={10} borderRadius={14} style={{ background: '#F2EFEC' }}>
          <Text as="span" color="secondaryText">
            {t('card.city')}: {participant.city ?? t('card.noValue')}
          </Text>
        </Box>
        <Box padding={10} borderRadius={14} style={{ background: '#F2EFEC' }}>
          <Text as="span" color="secondaryText">
            {t('card.age')}: {participant.age ?? t('card.noValue')}
          </Text>
        </Box>
        <Box padding={10} borderRadius={14} style={{ background: '#F2EFEC' }}>
          <Text as="span" color="secondaryText">
            {t('card.eventsCount')}: {participant.eventsCount}
          </Text>
        </Box>
        <Box padding={10} borderRadius={14} style={{ background: '#F2EFEC' }}>
          <Text as="span" color="secondaryText">
            {t('card.averageScore')}: {participant.averageScore.toFixed(1)}
          </Text>
        </Box>
        <Box padding={10} borderRadius={14} style={{ background: '#F2EFEC' }}>
          <Text as="span" color="secondaryText">
            {t('card.totalScore')}: {participant.totalScore}
          </Text>
        </Box>
      </Box>

      <Box gap={8} wrap="wrap">
        <Button
          label="Профиль"
          variant="secondary"
          font="headerNav"
          textColor="contrastColor"
          borderColor="contrastColor"
          onClick={() => router.push(`/members/${participant.id}`)}
        />
        <Button
          label={downloadingReport ? 'Скачиваем PDF...' : 'Скачать PDF'}
          variant="secondary"
          font="headerNav"
          textColor="contrastColor"
          borderColor="contrastColor"
          disabled={downloadingReport}
          onClick={async () => {
            try {
              setDownloadingReport(true);
              setReportError(null);

              const { blob, fileName } = await downloadParticipantReport(participant.id);
              const url = window.URL.createObjectURL(blob);
              const link = document.createElement('a');
              link.href = url;
              link.download = fileName;
              document.body.appendChild(link);
              link.click();
              window.setTimeout(() => {
                link.remove();
                window.URL.revokeObjectURL(url);
              }, 3000);
            } catch (error) {
              setReportError(
                error instanceof Error ? error.message : 'Не удалось скачать отчет',
              );
            } finally {
              setDownloadingReport(false);
            }
          }}
        />
        <Button
          label={
            loading
              ? t('card.updatingFavorite')
              : participant.isFavorite
                ? t('card.removeFavorite')
                : t('card.addFavorite')
          }
          variant={participant.isFavorite ? 'primary' : 'secondary'}
          font="headerNav"
          bg={participant.isFavorite ? 'contrastColor' : undefined}
          borderColor="contrastColor"
          textColor={participant.isFavorite ? 'surface' : 'contrastColor'}
          disabled={loading}
          onClick={() => onToggleFavorite(participant)}
        />
      </Box>

      {reportError ? (
        <Text as="span" color="danger" fontSize={14}>
          {reportError}
        </Text>
      ) : null}
    </Box>
  );
}
