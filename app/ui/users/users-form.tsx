'use client';

import { Premise, Role, User } from '@/app/lib/definitions';
import Link from 'next/link';
import { useActionState, useEffect, useMemo, useState } from 'react';
import { TextInput } from '../components/form-fields/input';
import {
  CreateOrUpdateUser,
  UserFormState,
} from '@/app/lib/actions/user-actions';
import MultipleSelector, { Option } from '../components/multiple-selector';
import React from 'react';
import Select from '../components/form-fields/select';
import FullScreenLoading from '../components/fullScreenLoading';
import FormSubmitButtonWithLoading from '../components/formSubmitButtonWithLoading';
import { hasPermission } from '@/app/lib/utils/permissions/hasPermissions';
import { ActionEnum, ModuleEnum } from '@/app/lib/enums/authActionModule';
import UserFormSubmitDialog from './users-form-submit-dialog';

interface Props {
  user?: User;
  roleList: Role[];
  premises: Premise[];
}

export default function UsersForm({ user, roleList, premises }: Props) {
  const initialState: UserFormState = {
    message: null,
    errors: {},
    formData: {},
  };
  const [state, formAction, isPending] = useActionState(
    CreateOrUpdateUser,
    initialState,
  );
  const [formData, setFormData] = useState<any>({});

  const [roleId, setRoleId] = useState(
    user ? user?.role.id : roleList.length > 0 ? roleList[0].id : 0,
  );

  useEffect(() => {
    if (state.errors) {
      setFormData(state.formData || {});
    }
  }, [state]);

  const rolesMap = new Map();
  roleList.map((role) => rolesMap.set(role.name, role.id));

  const promisesOptions: Option[] = premises.map((premise) => ({
    value: premise.id.toString(),
    label: premise.name,
  }));

  const [premiseOptions, setPremiseOptions] = React.useState<Option[]>([]);

  React.useEffect(() => {
    if (user) {
      const initialPremiseOptions = user.premises.map((premise) => ({
        value: premise.id.toString(),
        label: premise.name,
      }));
      setPremiseOptions(initialPremiseOptions);
    }
  }, [user?.premises]);

  const limitPremises = useMemo(() => {
    const selectedRole =
      roleList.find((roleItem) => roleItem.id == roleId) || null;
    if (selectedRole) {
      const hasLimitRole = hasPermission(
        ModuleEnum.PREMISE,
        ActionEnum.ONLY_ONE_PREMISE,
        selectedRole.perms,
      );
      return hasLimitRole;
    } else {
      return false;
    }
  }, [roleId]);

  return (
    <form action={formAction}>
      <FullScreenLoading isLoading={isPending} />
      <div className="rounded-md p-4 md:p-6">
        {/* Hidden input with category id for the edit */}
        {user ? (
          <input type="hidden" value={user.id} id="user_id" name="user_id" />
        ) : null}
        <div className="grid grid-cols-2 gap-4">
          {/* Name */}
          <div className="mb-4">
            <TextInput
              id="username"
              label="Usuario"
              defaultValue={formData.username || user?.username || ''}
              errors={state?.errors ? state?.errors.username : undefined}
            />
          </div>
          <div className="mb-4">
            <TextInput
              id="password"
              label="Password"
              type="password"
              required={!user}
              defaultValue={formData.password || ''}
              errors={state?.errors ? state?.errors.password : undefined}
            />
          </div>

          <div className="mb-4">
            <TextInput
              id="email"
              label="Email"
              type="email"
              required={true}
              defaultValue={formData.email || user?.email || ''}
              errors={state?.errors ? state?.errors.email : undefined}
            />
          </div>

          <div className="mb-4">
            <Select
              id="role"
              label="Seleccione un rol"
              icon="TagIcon"
              value={roleId}
              onChange={(e) => setRoleId(e as number)}
              values={rolesMap}
              errors={state?.errors ? state?.errors.role : undefined}
            />
          </div>
          <input
            type="hidden"
            name="limitPremises"
            id="limitPremises"
            value={limitPremises.toString()}
          />
          <div className="col-span-2 flex w-full flex-col">
            <p className="text-l mb-1">
              Local/es: {premiseOptions.map((val) => val.label).join(', ')}
            </p>
            <MultipleSelector
              value={premiseOptions}
              onChange={setPremiseOptions}
              defaultOptions={promisesOptions}
              maxSelected={limitPremises ? 1 : undefined}
              className="bg-white"
              badgeClassName=" "
              placeholder="Selecciona locales"
              errors={state?.errors ? state?.errors.premises : undefined}
              emptyIndicator={
                <p className="text-l h-full bg-white text-center leading-10 text-gray-600 dark:text-gray-400">
                  Sin resultados
                </p>
              }
            />
          </div>
          <input
            type="hidden"
            name="premises"
            value={JSON.stringify(premiseOptions)}
          />
          {limitPremises ? (
            <p className="text-red-700">
              El rol seleccionado solo permite un local por usuario.{' '}
            </p>
          ) : null}
        </div>
      </div>

      {state?.message && (
        <div className="my-2 rounded border border-red-500 bg-red-100 p-4 text-red-700">
          {state?.message}
        </div>
      )}
      <div className="flex justify-end gap-4">
        <Link
          href="/welcome/users"
          className="flex h-10 items-center rounded-lg bg-gray-100 px-4 text-sm font-medium text-gray-600 transition-colors hover:bg-gray-200"
        >
          Cancelar
        </Link>
        {premiseOptions.length > 1 && limitPremises ? (
          <UserFormSubmitDialog></UserFormSubmitDialog>
        ) : (
          <FormSubmitButtonWithLoading isPending={isPending}>
            Guardar
          </FormSubmitButtonWithLoading>
        )}
      </div>
    </form>
  );
}
