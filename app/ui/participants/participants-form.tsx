'use client';

import Link from 'next/link';
import { Button } from '@/app/ui/button';
import { useActionState, useEffect, useState } from 'react';
import { TextInput } from '../components/form-fields/input';
import { Participant } from '@/app/lib/definitions';
import { CreateOrUpdateParticipant, ParticipantFormState } from '@/app/lib/actions/participants';

interface Props {
  participant?: Participant;
}

export default function ParticipantsForm({ participant }: Props) {
  const initialState: ParticipantFormState = {
    message: null,
    errors: {},
    formData: {},
  };
  const [state, formAction] = useActionState(
    CreateOrUpdateParticipant,
    initialState,
  );
  
  const [formData, setFormData] = useState<any>({});

  useEffect(() => {
    if (state.errors) {
      setFormData(state.formData || {});
    }
  }, [state]);

  return (
    <form action={formAction}>
      <div className="rounded-md bg-gray-50 p-4 md:p-6">
        {/* Hidden input with participant id for the edit */}
        {participant ? (
          <input
            type="hidden"
            value={participant.id}
            id="participant_id"
            name="participant_id"
          />
        ) : null}
        <div className="grid grid-cols-2 gap-4">
          {/* Name */}
          <div className="mb-4">
            <TextInput
              id="full_name"
              defaultValue={formData.full_name || participant?.full_name || ''}
              errors={state.errors ? state.errors.full_name : undefined}
              icon="UserIcon"
              label="Nombre"
            />
          </div>
          {/* Document Number */}
          <div className="mb-4">
            <TextInput
              id="document_number"
              defaultValue={formData.document_number || participant?.document_number || ''}
              errors={state.errors ? state.errors.document_number : undefined}
              icon="IdentificationIcon"
              label="Documento"
            />
          </div>
          {/* Email */}
          <div className="mb-4">
            <TextInput
              id="email"
              defaultValue={formData.email || participant?.email || ''}
              errors={state.errors ? state.errors.email : undefined}
              icon="EnvelopeIcon"
              label="Email"
            />
          </div>
          {/* Teléfono */}
          <div className="mb-4">
            <TextInput
              id="phone_number"
              defaultValue={formData.phone_number || participant?.phone_number || ''}
              errors={state.errors ? state.errors.phone_number : undefined}
              icon="DevicePhoneMobileIcon"
              label="Teléfono"
            />
          </div>
        </div>
      </div>
      <div className="mt-6 flex justify-end gap-4">
        <Link
          href="/welcome/participants"
          className="flex h-10 items-center rounded-lg bg-gray-100 px-4 text-sm font-medium text-gray-600 transition-colors hover:bg-gray-200"
        >
          Cancelar
        </Link>
        <Button type="submit">Guardar</Button>
      </div>
    </form>
  );
}
