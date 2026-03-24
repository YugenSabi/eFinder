'use client';

import { useEffect, useMemo, useState } from 'react';
import { useTranslations } from 'next-intl';
import { Button } from '@ui/button';
import { Input } from '@ui/input';
import { Box } from '@ui/layout';
import { Text } from '@ui/text';
import { DIRECTIONS, DIFFICULTIES } from '../constants';
import { createEvent } from '../api';
import { ChoiceGroupComponent } from '../choice-group';
import type { EventFormPayload, OrganizerUser } from '../types';
import { uploadImage } from '../../../../../lib/uploads/client';

type CreateEventSectionProps = {
  organizers: OrganizerUser[];
};

const INITIAL_FORM: EventFormPayload = {
  title: '',
  description: '',
  city: '',
  direction: 'IT',
  difficulty: 'BASIC',
  startsAt: '',
  endsAt: '',
  basePoints: '10',
  rewardSummary: '',
  organizerId: '',
  imageUrl: '',
};

export function CreateEventSectionComponent({
  organizers,
}: CreateEventSectionProps) {
  const t = useTranslations('Admin');
  const [creatingEvent, setCreatingEvent] = useState(false);
  const [eventMessage, setEventMessage] = useState<string | null>(null);
  const [eventForm, setEventForm] = useState<EventFormPayload>(INITIAL_FORM);

  useEffect(() => {
    if (organizers.length === 1) {
      setEventForm((current) => ({
        ...current,
        organizerId: current.organizerId || organizers[0].id,
      }));
    }
  }, [organizers]);

  const canSubmit = useMemo(
    () =>
      Boolean(
        eventForm.title &&
          eventForm.description &&
          eventForm.startsAt &&
          eventForm.organizerId,
      ),
    [eventForm],
  );

  return (
    <Box direction="column" gap={16} padding={24} surface="card">
      <Text as="h2" font="headerNav" fontSize={24}>
        {t('createEvent.title')}
      </Text>
      <Box direction="column" gap={12}>
        <Input
          label={t('createEvent.fields.title')}
          value={eventForm.title}
          onChange={(event) => {
            const { value } = event.currentTarget;
            setEventForm((current) => ({ ...current, title: value }));
          }}
        />
        <Input
          label={t('createEvent.fields.description')}
          value={eventForm.description}
          onChange={(event) => {
            const { value } = event.currentTarget;
            setEventForm((current) => ({
              ...current,
              description: value,
            }));
          }}
        />
        <Input
          label={t('createEvent.fields.city')}
          value={eventForm.city}
          onChange={(event) => {
            const { value } = event.currentTarget;
            setEventForm((current) => ({ ...current, city: value }));
          }}
        />
        <Input
          label={t('createEvent.fields.startsAt')}
          type="datetime-local"
          value={eventForm.startsAt}
          onChange={(event) => {
            const { value } = event.currentTarget;
            setEventForm((current) => ({ ...current, startsAt: value }));
          }}
        />
        <Input
          label={t('createEvent.fields.endsAt')}
          type="datetime-local"
          value={eventForm.endsAt}
          onChange={(event) => {
            const { value } = event.currentTarget;
            setEventForm((current) => ({ ...current, endsAt: value }));
          }}
        />
        <Input
          label={t('createEvent.fields.basePoints')}
          type="number"
          value={eventForm.basePoints}
          onChange={(event) => {
            const { value } = event.currentTarget;
            setEventForm((current) => ({ ...current, basePoints: value }));
          }}
        />
        <Input
          label={t('createEvent.fields.rewardSummary')}
          value={eventForm.rewardSummary}
          onChange={(event) => {
            const { value } = event.currentTarget;
            setEventForm((current) => ({
              ...current,
              rewardSummary: value,
            }));
          }}
        />
        <Box direction="column" gap={8}>
          <Text as="span" color="secondaryText" fontSize={14}>
            Изображение мероприятия
          </Text>
          <input
            type="file"
            accept="image/*"
            onChange={async (event) => {
              const file = event.currentTarget.files?.[0];

              if (!file) {
                return;
              }

              try {
                const imageUrl = await uploadImage(file);
                setEventForm((current) => ({ ...current, imageUrl }));
              } catch (error) {
                setEventMessage(
                  error instanceof Error ? error.message : t('createEvent.error'),
                );
              }
            }}
          />
        </Box>
        <ChoiceGroupComponent
          label={t('createEvent.fields.direction')}
          value={eventForm.direction}
          options={DIRECTIONS}
          onChange={(value) =>
            setEventForm((current) => ({ ...current, direction: value }))
          }
        />
        <ChoiceGroupComponent
          label={t('createEvent.fields.difficulty')}
          value={eventForm.difficulty}
          options={DIFFICULTIES}
          onChange={(value) =>
            setEventForm((current) => ({ ...current, difficulty: value }))
          }
        />
        {organizers.length > 1 ? (
          <Box direction="column" gap={8}>
            <Text as="span" color="secondaryText" fontSize={14}>
              {t('createEvent.fields.organizer')}
            </Text>
            <Box gap={8} wrap="wrap">
              {organizers.map((organizer) => {
                const label = [organizer.firstName, organizer.lastName]
                  .filter(Boolean)
                  .join(' ')
                  .trim() || organizer.email;

                return (
                  <Button
                    key={organizer.id}
                    label={label}
                    variant={
                      organizer.id === eventForm.organizerId ? 'primary' : 'secondary'
                    }
                    font="headerNav"
                    onClick={() =>
                      setEventForm((current) => ({
                        ...current,
                        organizerId: organizer.id,
                      }))
                    }
                  />
                );
              })}
            </Box>
          </Box>
        ) : null}
        {organizers.length === 0 ? (
          <Text as="span" color="secondaryText">
            {t('createEvent.noOrganizers')}
          </Text>
        ) : null}
        <Button
          label={creatingEvent ? t('createEvent.creating') : t('createEvent.submit')}
          bg="contrastColor"
          font="headerNav"
          disabled={creatingEvent || !canSubmit}
          onClick={async () => {
            setCreatingEvent(true);
            setEventMessage(null);

            try {
              const createdEvent = await createEvent(eventForm);
              setEventMessage(t('createEvent.success', { id: createdEvent.id }));
              setEventForm({
                ...INITIAL_FORM,
                organizerId: eventForm.organizerId,
              });
            } catch (error) {
              setEventMessage(
                error instanceof Error ? error.message : t('createEvent.error'),
              );
            } finally {
              setCreatingEvent(false);
            }
          }}
        />
        {eventMessage ? (
          <Text as="span" color="secondaryText" fontSize={14}>
            {eventMessage}
          </Text>
        ) : null}
      </Box>
    </Box>
  );
}
