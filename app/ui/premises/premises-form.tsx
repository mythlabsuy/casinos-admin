'use client';

import { Premise, MediaFile } from '@/app/lib/definitions';
import Link from 'next/link';
import { Button } from '@/app/ui/button';
import { useActionState, useEffect, useState } from 'react';
import { TextInput } from '../components/form-fields/input';
import FileChooser from '../components/form-fields/file-chooser';
import {
  CreateOrUpdatePremise,
  PremiseFormState,
} from '@/app/lib/premise-actions';

interface Props {
  premise?: Premise;
}

export default function PremiseForm({ premise }: Props) {
  const initialState: PremiseFormState = {
    message: null,
    errors: {},
    formData: {},
  };
  const [state, formAction] = useActionState(
    CreateOrUpdatePremise,
    initialState,
  );
  const [mediaToRemove, setMediaToRemove] = useState<string>();
  const [formData, setFormData] = useState<any>({});

  useEffect(() => {
    if (state.errors) {
      setFormData(state.formData || {});
    }
  }, [state]);

  function removeMedia(mediaId: number) {
    let filesToRemove = mediaToRemove ? mediaToRemove.split(',') : [];
    filesToRemove.push(mediaId.toString());
    setMediaToRemove(filesToRemove.join(','));
  }

  return (
    <form action={formAction}>
      <div className="rounded-md p-4 md:p-6">
        {/* Hidden input with category id for the edit */}
        {premise ? (
          <input
            type="hidden"
            value={premise.id}
            id="premise_id"
            name="premise_id"
          />
        ) : null}
        <div className="grid grid-cols-2 gap-4">
          {/* Name */}
          <div className="mb-4">
            <TextInput
              id="name"
              label='Nombre del local'
              defaultValue={formData.name || premise?.name || ''}
              errors={state.errors ? state.errors.name : undefined}
              icon="DocumentTextIcon"
            />
          </div>
          {premise ? (
            <div className="mb-4 flex flex-col">
              <label
                htmlFor="flag"
                className="block text-sm font-medium text-gray-700"
              >
                Deshabilitar
              </label>
              <div className="mt-2 flex items-center space-x-2.5">
                <input
                  type="checkbox"
                  id="flag"
                  name="flag"
                  defaultChecked={formData.flag || false}
                  className="min-h-[38px] min-w-[38px] rounded border-gray-300 p-2.5 text-blue-600 focus:ring-blue-500"
                />
              </div>
            </div>
          ) : null}
          {/* Disabled */}
        </div>
        <div className="mb-4">
          <label
            htmlFor="premise-logo-image"
            className="mb-2 ml-1 block text-sm font-medium text-gray-700"
          >
            Logo o foto del local
          </label>
          <FileChooser
            id="premise-logo-image"
            maxFilesAmount={1}
            removeMediaCallback={removeMedia}
            mediaFiles={formData.media_files || premise?.logo || []}
          />
        </div>
        <div className="mb-4">
          <label
            htmlFor="premise-privacy-image"
            className="mb-2 ml-1 block text-sm font-medium text-gray-700"
          >
            Política de privacidad
          </label>
          <FileChooser
            id="premise-privacy-image"
            maxFilesAmount={1}
            removeMediaCallback={removeMedia}
            mediaFiles={formData.media_files || premise?.privacy_policy || []}
          />
        </div>
      </div>

      <div className="flex justify-end gap-4">
        <Link
          href="/welcome/premises"
          className="flex h-10 items-center rounded-lg bg-gray-100 px-4 text-sm font-medium text-gray-600 transition-colors hover:bg-gray-200"
        >
          Cancelar
        </Link>
        <Button type="submit">Guardar</Button>
      </div>
    </form>
  );
}
