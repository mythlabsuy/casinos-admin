'use client';

import Link from 'next/link';
import { Button } from '@/app/ui/button';
import { useActionState, useEffect, useState } from 'react';
import { TextInput } from '../components/form-fields/input';
import { UpdatePassword, UpdatePasswordFormState } from '@/app/lib/actions/update-password-actions';
import { signOut } from '@/auth';

export default function UpdatePasswordForm() {
  const initialState: UpdatePasswordFormState = {
    message: null,
    errors: {},
    formData: {},
  };
  const [state, formAction] = useActionState(
    UpdatePassword,
    initialState,
  );

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);

    const response = await UpdatePassword(state,formData);
  };

  const [formData, setFormData] = useState<any>({});

  useEffect(() => {
    if (state.errors) {
      setFormData(state.formData || {});
    }
  }, [state]);

  return (
    <form action={formAction}>
      <div className="rounded-md p-4 md:p-6">
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          {/* current password */}
          <div className="mb-4 sm:col-span-2">
            <TextInput
              id="currentPassword"
              label="Contraseña actual"
              defaultValue={state?.formData.currentPassword || ''}
              errors={state.errors ? state.errors.currentPassword : undefined}
              type="password"
              required
            />
          </div>
          {/* new password */}
          <div className="mb-4">
            <TextInput
              id="newPassword"
              name='newPassword'
              label="Nueva contraseña"
              defaultValue={state?.formData.newPassword || ''}
              errors={state.errors ? state.errors.newPassword : undefined}
              type="password"
              required
            />
          </div>
          {/* repeat new password */}
          <div className="mb-4">
            <TextInput
              id="repeatNewPassword"
              label="Repetir contraseña nueva"
              defaultValue={state?.formData.repeatNewPassword || ''}
              errors={state.errors ? state.errors.repeatNewPassword : undefined}
              type="password"
              required
            />
          </div>
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
        <Button type="submit">Guardar</Button>
      </div>
    </form>
  );
}
