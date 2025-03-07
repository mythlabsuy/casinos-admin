'use client';

import { Role } from '@/app/lib/definitions';
import Link from 'next/link';
import { useActionState, useEffect, useState } from 'react';
import { TextInput } from '../components/form-fields/input';
import React from 'react';
import {
  CreateOrUpdateRole,
  RoleFormState,
} from '@/app/lib/actions/role-actions';
import Table from '../components/table';
import {
  Perm,
  PermCategory,
  permDefaultValues,
  PermEnum,
} from '@/app/lib/enums/perms';
import clsx from 'clsx';
import SwitchWithIcon from '../components/form-fields/switch';
import FormSubmitButtonWithLoading from '../components/formSubmitButtonWithLoading';
import FullScreenLoading from '../components/fullScreenLoading';
import RolesFormErrorSubmitDialog from './roles-form-error-submit-dialog';

interface Props {
  role?: Role;
}

export default function RolesForm({ role }: Props) {
  const initialState: RoleFormState = {
    message: null,
    errors: {},
    formData: {},
  };
  const [state, formAction, isPending] = useActionState(
    CreateOrUpdateRole,
    initialState,
  );
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

  React.useEffect(() => {
    if (role) {
      const permsSet = new Set(role.perms);
      const updatedList = permissions.map((item) =>
        permsSet.has(item.id) ? { ...item, selected: true } : item,
      );
      setPermissions(updatedList);
    }
  }, [role?.perms]);

  const missingExportByPromotionPermissionList = React.useMemo(() => {
    const missingPermissions: string[] = [];
    const isExportAllSelected = permissions.some(
      (perm) =>
        perm.id === PermEnum.EXPORT_PARTICIPANT_BY_PROMOTION && perm.selected,
    );
    if (!isExportAllSelected) {
      return [];
    }
    // Check for the other required permissions and add to the missing list if not selected
    if (
      !permissions.some(
        (perm) => perm.id === PermEnum.READ_PROMOTION && perm.selected,
      )
    ) {
      missingPermissions.push('Ver promociones');
    }
    if (
      !permissions.some(
        (perm) => perm.id === PermEnum.READ_PARTICIPANT && perm.selected,
      )
    ) {
      missingPermissions.push('Ver participantes');
    }

    return missingPermissions;
  }, [
    permissions,
    PermEnum.EXPORT_ALL_PARTICIPANT_BY_PREMISE,
    PermEnum.READ_PREMISE,
    PermEnum.READ_PARTICIPANT,
  ]);

  const missingExportByPremisePermissionList = React.useMemo(() => {
    const missingPermissions: string[] = [];
    const isExportAllSelected = permissions.some(
      (perm) =>
        perm.id === PermEnum.EXPORT_ALL_PARTICIPANT_BY_PREMISE && perm.selected,
    );
    if (!isExportAllSelected) {
      return [];
    }
    if (
      !permissions.some(
        (perm) => perm.id === PermEnum.READ_PREMISE && perm.selected,
      )
    ) {
      missingPermissions.push('Ver locales');
    }
    if (
      !permissions.some(
        (perm) => perm.id === PermEnum.READ_PARTICIPANT && perm.selected,
      )
    ) {
      missingPermissions.push('Ver participantes');
    }

    return missingPermissions;
  }, [
    permissions,
    PermEnum.EXPORT_ALL_PARTICIPANT_BY_PREMISE,
    PermEnum.READ_PREMISE,
    PermEnum.READ_PARTICIPANT,
  ]);

  return (
    <form action={formAction}>
      <FullScreenLoading isLoading={isPending} />
      <div className="rounded-md p-4 md:p-6">
        {/* Hidden input with category id for the edit */}
        {role ? (
          <input type="hidden" value={role.id} id="role_id" name="role_id" />
        ) : null}
        <div className="grid grid-cols-1 sm:grid-cols-2">
          {/* Name */}
          <div className="px-2 sm:col-span-2">
            <TextInput
              id="name"
              label="Nombre"
              defaultValue={formData.name || role?.name || ''}
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
          <div className="rounded-lg">
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
                    <td className="py-3 pl-6 pr-3">
                      <div className="flex items-center gap-3">
                        <p>
                          <span>{rolePerm.label}</span>
                        </p>
                      </div>
                    </td>
                    <td className="py-3 pl-6 pr-3">
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
          <div className="rounded-lg">
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
                    <td className="py-3 pl-6 pr-3">
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
          <div className="rounded-lg">
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
                    <td className="py-3 pl-6 pr-3">
                      <div className="flex items-center gap-3">
                        <p>
                          <span>{promotionPerm.label}</span>
                        </p>
                      </div>
                    </td>
                    <td className="py-3 pl-6 pr-3">
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

          {/* Export participants table */}
          <div className="rounded-lg">
            <Table titles={['Opciones adicionales']}>
              {permissions
                .filter(
                  (perm) =>
                    perm.category ===
                      PermCategory.EXPORT_PARTICIPANT_BY_PROMOTION ||
                    perm.category ===
                      PermCategory.EXPORT_ALL_PARTICIPANT_BY_PREMISE ||
                    perm.category === PermCategory.ONLY_ONE_PREMISE,
                )
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
        </div>
      </div>

      {state?.message && (
        <div className="my-2 rounded border border-red-500 bg-red-100 p-4 text-red-700">
          {state?.message}
        </div>
      )}
      <div className="flex justify-end gap-4">
        <Link
          href="/welcome/roles"
          className="flex h-10 items-center rounded-lg bg-gray-100 px-4 text-sm font-medium text-gray-600 transition-colors hover:bg-gray-200"
        >
          Cancelar
        </Link>
        {missingExportByPromotionPermissionList.length > 0 ||
        missingExportByPremisePermissionList.length > 0 ? (
          <RolesFormErrorSubmitDialog
            missingPerms={
              missingExportByPromotionPermissionList.length > 0
                ? missingExportByPromotionPermissionList
                : missingExportByPremisePermissionList
            }
            description={
              missingExportByPromotionPermissionList.length > 0
                ? promotionPermsMissingDialogMessage
                : premisePermsMissingDialogMessage
            }
          ></RolesFormErrorSubmitDialog>
        ) : (
          <FormSubmitButtonWithLoading isPending={isPending}>
            Guardar
          </FormSubmitButtonWithLoading>
        )}
      </div>
    </form>
  );
}
const promotionPermsMissingDialogMessage =
  'Para exportar participantes por promoción, se requieren los siguientes permisos:';
const premisePermsMissingDialogMessage =
  'Para exportar todos los participantes por local, se requieren los siguientes permisos:';
