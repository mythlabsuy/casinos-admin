'use client';

import { Premise } from '@/app/lib/definitions';
import Link from 'next/link';
import { useActionState, useEffect, useState } from 'react';
import { TextInput } from '../components/form-fields/input';
import FileChooser from '../components/form-fields/file-chooser';
import {
  CreateOrUpdatePremise,
  PremiseFormState,
} from '@/app/lib/actions/premise-actions';
import FullScreenLoading from '../components/fullScreenLoading';
import FormSubmitButtonWithLoading from '../components/formSubmitButtonWithLoading';

interface Props {
  premise?: Premise;
}

export default function PremiseForm({ premise }: Props) {
  const initialState: PremiseFormState = {
    message: null,
    errors: {},
    formData: {},
  };
  const [state, formAction, isPending] = useActionState(
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
      <FullScreenLoading isLoading={isPending} />
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
              label="Nombre del local"
              defaultValue={formData.name || premise?.name || ''}
              errors={state.errors ? state.errors.name : undefined}
              icon="DocumentTextIcon"
            />
          </div>
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
            fileWeight="1.5 Mb"
            fileTypes="avif, jpeg, png, webp"
            fileSize="8:5 (Ej: 1280x800 px)"
            allowedFileTypes={[
              'image/avif',
              'image/jpeg',
              'image/png',
              'image/webp',
            ]}
            maxFilesAmount={1}
            removeMediaCallback={removeMedia}
            mediaFiles={[
              ...(formData?.logoImage ? [formData.logoImage] : []),
              ...(premise?.logo ? [premise.logo] : []),
            ]}
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
            fileWeight="1.5 Mb"
            fileTypes="pdf"
            allowedFileTypes={['application/pdf']}
            maxFilesAmount={1}
            removeMediaCallback={removeMedia}
            mediaFiles={[
              ...(formData?.privacyImage ? [formData.privacyImage] : []),
              ...(premise?.privacy_policy ? [premise.privacy_policy] : []),
            ]}
          />
        </div>
      </div>

      {state?.message && (
        <div className="my-2 rounded border border-red-500 bg-red-100 p-4 text-red-700">
          {state?.message}
        </div>
      )}
      <div className="flex justify-end gap-4">
        <Link
          href="/welcome/premises"
          className="flex h-10 items-center rounded-lg bg-gray-100 px-4 text-sm font-medium text-gray-600 transition-colors hover:bg-gray-200"
        >
          Cancelar
        </Link>
        <FormSubmitButtonWithLoading isPending={isPending}>Guardar</FormSubmitButtonWithLoading>
      </div>
    </form>
  );
}
