'use client';

import { Category, MediaFiles } from '@/app/lib/definitions';
import Link from 'next/link';
import { Button } from '@/app/ui/button';
import { useActionState, useEffect, useState } from 'react';
import { TextInput } from '../components/form-fields/input';
import FileChooser from '../components/form-fields/file-chooser';
import {
  PremiseFormState,
  CreateOrUpdatePremise,
} from '@/app/lib/premise-actions';

interface Props {
  category?: Category;
}

export default function CategoryForm({ category }: Props) {
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

  const file: MediaFiles = {
    id: 0,
    name: 'placeholder',
    path: category ? category?.image : '',
    disabled: false,
    mime_type: '',
    article_id: 0,
  };
  const mediaFiles: [MediaFiles] | [] =
    category && category.image ? [file] : [];

  useEffect(() => {
    if (state.errors) {
      setFormData(state.formData || {});
    }
  }, [state]);

  function removeMedia(mediaId: number) {
    let filesToRemove = mediaToRemove ? mediaToRemove.split(',') : [];
    filesToRemove.push(category ? category?.image : '');
    setMediaToRemove(filesToRemove.join(','));
  }

  return (
    <form action={formAction}>
      <div className="rounded-md bg-gray-50 p-4 md:p-6">
        {/* Hidden input with category id for the edit */}
        {category ? (
          <input
            type="hidden"
            value={category.id}
            id="category_id"
            name="category_id"
          />
        ) : null}
        <div className="grid grid-cols-2 gap-4">
          {/* Name */}
          <div className="mb-4">
            <TextInput
              id="name"
              defaultValue={formData.name || category?.name || ''}
              errors={state.errors ? state.errors.name : undefined}
              icon="DocumentTextIcon"
              label="Nombre de la categoria"
            />
          </div>
        </div>

        <FileChooser
          id="category-images"
          maxFilesAmount={1}
          removeMediaCallback={removeMedia}
          mediaFiles={formData.media_files || mediaFiles || []}
        />
        <input
          type="hidden"
          id="images-to-remove"
          name="images-to-remove"
          defaultValue={mediaToRemove}
        />
      </div>
      <div className="mt-6 flex justify-end gap-4">
        <Link
          href="/welcome/categories"
          className="flex h-10 items-center rounded-lg bg-gray-100 px-4 text-sm font-medium text-gray-600 transition-colors hover:bg-gray-200"
        >
          Cancelar
        </Link>
        <Button type="submit">Guardar</Button>
      </div>
    </form>
  );
}
