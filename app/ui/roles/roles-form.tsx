'use client';

import { Role } from '@/app/lib/definitions';
import Link from 'next/link';
import { Button } from '@/app/ui/button';
import { useActionState, useEffect, useState } from 'react';
import { TextInput } from '../components/form-fields/input';
import React from 'react';
import {
  CreateOrUpdateRole,
  RoleFormState,
} from '@/app/lib/actions/role-actions';
import Table from '../components/table';
import { Perm, PermCategory, permDefaultValues } from '@/app/lib/enums/perms';
import clsx from 'clsx';
import SwitchWithIcon from '../components/form-fields/switch';

interface Props {
  role?: Role;
}

export default function RolesForm({ role }: Props) {
  const initialState: RoleFormState = {
    message: null,
    errors: {},
    formData: {},
  };
  const [state, formAction] = useActionState(CreateOrUpdateRole, initialState);
  const [formData, setFormData] = useState<any>({});

  const [permissions, setPermissions] = useState<Perm[]>(permDefaultValues);

  const togglePermission = (id: number) => {
    setPermissions((prev) =>
      prev.map((perm) =>
        perm.id === id ? { ...perm, selected: !perm.selected } : perm,
      ),
    );
  };

  useEffect(() => {
    if (state.errors) {
      setFormData(state.formData || {});
    }
  }, [state]);

  // React.useEffect(() => {
  //   if (user) {
  //     const initialPremiseOptions = user.premises.map((premise) => ({
  //       value: premise.id.toString(),
  //       label: premise.name,
  //     }));
  //     setPremiseOptions(initialPremiseOptions);
  //   }
  // }, [user?.premises]);

  return (
    <form action={formAction}>
      <div className="rounded-md  p-4 md:p-6 ">
        {/* Hidden input with category id for the edit */}
        {role ? (
          <input type="hidden" value={role.id} id="user_id" name="user_id" />
        ) : null}
        <div className="grid grid-cols-1 sm:grid-cols-2">
          {/* Name */}
          <div className=" sm:col-span-2 px-2">
            <TextInput
              id="name"
              label="Nombre"
              defaultValue={formData.name || ''}
              errors={state?.errors ? state?.errors.name : undefined}
              required
            />
          </div>
          <input
            type="hidden"
            name="perms"
            value={JSON.stringify(permissions)}
          />

          {/* Roles table */}
          <div className=" rounded-lg">
            <Table titles={['Roles']}>
              {permissions
                .filter((perm) => perm.category === PermCategory.ROLE)
                .map((rolePerm) => (
                  <tr
                    key={`perm_${rolePerm.label}`}
                    onClick={() => togglePermission(rolePerm.id)}
                    // className="w-full border-b py-3 text-sm last-of-type:border-none [&:first-child>td:first-child]:rounded-tl-lg [&:first-child>td:last-child]:rounded-tr-lg [&:last-child>td:first-child]:rounded-bl-lg [&:last-child>td:last-child]:rounded-br-lg "
                    className={clsx(
                      'w-full cursor-pointer border-b py-3 text-sm last-of-type:border-none',
                      '[&:first-child>td:first-child]:rounded-tl-lg',
                      '[&:first-child>td:last-child]:rounded-tr-lg',
                      '[&:last-child>td:first-child]:rounded-bl-lg',
                      '[&:last-child>td:last-child]:rounded-br-lg',
                    )}
                  >
                    <td className=" py-3 pl-6 pr-3">
                      <div className="flex items-center gap-3">
                        <p>
                          <span>{rolePerm.label}</span>
                        </p>
                      </div>
                    </td>
                    <td className=" py-3 pl-6 pr-3">
                      <div className="flex justify-end gap-3">
                        <SwitchWithIcon
                          id={`rp_${rolePerm.label}`}
                          label=""
                          iconDisabled="XMarkIcon"
                          iconEnabled="CheckIcon"
                          value={rolePerm.selected}
                          onChange={() => {}}
                        />
                      </div>
                    </td>
                  </tr>
                ))}
            </Table>
          </div>

          {/* Participant table */}
          <div className=" rounded-lg">
            <Table titles={['Participantes']}>
              {permissions
                .filter((perm) => perm.category === PermCategory.PARTICIPANT)
                .map((participantPerm) => (
                  <tr
                    key={`perm_${participantPerm.label}`}
                    onClick={() => togglePermission(participantPerm.id)}
                    // className="w-full border-b py-3 text-sm last-of-type:border-none [&:first-child>td:first-child]:rounded-tl-lg [&:first-child>td:last-child]:rounded-tr-lg [&:last-child>td:first-child]:rounded-bl-lg [&:last-child>td:last-child]:rounded-br-lg "
                    className={clsx(
                      'w-full cursor-pointer border-b py-3 text-sm last-of-type:border-none',
                      '[&:first-child>td:first-child]:rounded-tl-lg',
                      '[&:first-child>td:last-child]:rounded-tr-lg',
                      '[&:last-child>td:first-child]:rounded-bl-lg',
                      '[&:last-child>td:last-child]:rounded-br-lg',
                    )}
                  >
                    <td className=" py-3 pl-6 pr-3">
                      <div className="flex items-center gap-3">
                        <p>
                          <span>{participantPerm.label}</span>
                        </p>
                      </div>
                    </td>
                    <td className="whitespace-nowrap py-3 pl-6 pr-3">
                      <div className="flex justify-end gap-3">
                        <SwitchWithIcon
                          id={`pp_${participantPerm.label}`}
                          label=""
                          iconDisabled="XMarkIcon"
                          iconEnabled="CheckIcon"
                          value={participantPerm.selected}
                          onChange={() => {}}
                        />
                      </div>
                    </td>
                  </tr>
                ))}
            </Table>
          </div>

          {/* User table */}
          <div className="rounded-lg">
            <Table titles={['Usuarios']}>
              {permissions
                .filter((perm) => perm.category === PermCategory.USER)
                .map((userPerm) => (
                  <tr
                    key={`perm_${userPerm.label}`}
                    onClick={() => togglePermission(userPerm.id)}
                    // className="w-full border-b py-3 text-sm last-of-type:border-none [&:first-child>td:first-child]:rounded-tl-lg [&:first-child>td:last-child]:rounded-tr-lg [&:last-child>td:first-child]:rounded-bl-lg [&:last-child>td:last-child]:rounded-br-lg "
                    className={clsx(
                      'w-full cursor-pointer border-b py-3 text-sm last-of-type:border-none',
                      '[&:first-child>td:first-child]:rounded-tl-lg',
                      '[&:first-child>td:last-child]:rounded-tr-lg',
                      '[&:last-child>td:first-child]:rounded-bl-lg',
                      '[&:last-child>td:last-child]:rounded-br-lg',
                    )}
                  >
                    <td className="whitespace-nowrap py-3 pl-6 pr-3">
                      <div className="flex items-center gap-3">
                        <p>
                          <span>{userPerm.label}</span>
                        </p>
                      </div>
                    </td>
                    <td className="whitespace-nowrap py-3 pl-6 pr-3">
                      <div className="flex justify-end gap-3">
                        <SwitchWithIcon
                          id={`up_${userPerm.label}`}
                          label=""
                          iconDisabled="XMarkIcon"
                          iconEnabled="CheckIcon"
                          value={userPerm.selected}
                          onChange={() => {}}
                        />
                      </div>
                    </td>
                  </tr>
                ))}
            </Table>
          </div>

          {/* Premises table */}
          <div className="rounded-lg">
            <Table titles={['Locales']}>
              {permissions
                .filter((perm) => perm.category === PermCategory.PREMISE)
                .map((premisePerm) => (
                  <tr
                    key={`perm_${premisePerm.label}`}
                    onClick={() => togglePermission(premisePerm.id)}
                    // className="w-full border-b py-3 text-sm last-of-type:border-none [&:first-child>td:first-child]:rounded-tl-lg [&:first-child>td:last-child]:rounded-tr-lg [&:last-child>td:first-child]:rounded-bl-lg [&:last-child>td:last-child]:rounded-br-lg "
                    className={clsx(
                      'w-full cursor-pointer border-b py-3 text-sm last-of-type:border-none',
                      '[&:first-child>td:first-child]:rounded-tl-lg',
                      '[&:first-child>td:last-child]:rounded-tr-lg',
                      '[&:last-child>td:first-child]:rounded-bl-lg',
                      '[&:last-child>td:last-child]:rounded-br-lg',
                    )}
                  >
                    <td className="whitespace-nowrap py-3 pl-6 pr-3">
                      <div className="flex items-center gap-3">
                        <p>
                          <span>{premisePerm.label}</span>
                        </p>
                      </div>
                    </td>
                    <td className="whitespace-nowrap py-3 pl-6 pr-3">
                      <div className="flex justify-end gap-3">
                        <SwitchWithIcon
                          id={`prep_${premisePerm.label}`}
                          label=""
                          iconDisabled="XMarkIcon"
                          iconEnabled="CheckIcon"
                          value={premisePerm.selected}
                          onChange={() => {}}
                        />
                      </div>
                    </td>
                  </tr>
                ))}
            </Table>
          </div>

          {/* Promotion table */}
          <div className="rounded-lg ">
            <Table titles={['Promociones']}>
              {permissions
                .filter((perm) => perm.category === PermCategory.PROMOTION)
                .map((promotionPerm) => (
                  <tr
                    key={`perm_${promotionPerm.label}`}
                    onClick={() => togglePermission(promotionPerm.id)}
                    // className="w-full border-b py-3 text-sm last-of-type:border-none [&:first-child>td:first-child]:rounded-tl-lg [&:first-child>td:last-child]:rounded-tr-lg [&:last-child>td:first-child]:rounded-bl-lg [&:last-child>td:last-child]:rounded-br-lg "
                    className={clsx(
                      'w-full cursor-pointer border-b py-3 text-sm last-of-type:border-none',
                      '[&:first-child>td:first-child]:rounded-tl-lg',
                      '[&:first-child>td:last-child]:rounded-tr-lg',
                      '[&:last-child>td:first-child]:rounded-bl-lg',
                      '[&:last-child>td:last-child]:rounded-br-lg',
                    )}
                  >
                    <td className=" py-3 pl-6 pr-3">
                      <div className="flex items-center gap-3">
                        <p>
                          <span>{promotionPerm.label}</span>
                        </p>
                      </div>
                    </td>
                    <td className=" py-3 pl-6 pr-3">
                      <div className="flex justify-end gap-3">
                        <SwitchWithIcon
                          id={`prop_${promotionPerm.label}`}
                          label=""
                          iconDisabled="XMarkIcon"
                          iconEnabled="CheckIcon"
                          value={promotionPerm.selected}
                          onChange={() => {}}
                        />
                      </div>
                    </td>
                  </tr>
                ))}
            </Table>
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
