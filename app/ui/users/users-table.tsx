import { User } from '@/app/lib/definitions';
import Table from '../components/table';
import TableActionsCell from '../components/table-actions-cell';
import { ActionButtonWithLoading } from '../components/action-button-with-loading';
import { TrashIcon } from '@heroicons/react/24/outline';
import clsx from 'clsx';
import { disableUser } from '@/app/lib/actions/user-actions';
import { ModuleEnum, ActionEnum } from '@/app/lib/enums/authActionModule';
import AuthWrapper from '@/components/authWrapper';

export default async function UsersTable({ data }: { data: any }) {
  return (
    <div className="flow-root">
      <div className="inline-block min-w-full align-middle">
        <div className="rounded-lg">
          <Table titles={['Usuario']}>
            {data?.map((item: User) => (
              <tr
                key={`user_${item.username.toString()}`}
                // className="w-full border-b py-3 text-sm last-of-type:border-none [&:first-child>td:first-child]:rounded-tl-lg [&:first-child>td:last-child]:rounded-tr-lg [&:last-child>td:first-child]:rounded-bl-lg [&:last-child>td:last-child]:rounded-br-lg "
                className={clsx(
                  'w-full border-b py-3 text-sm last-of-type:border-none',
                  '[&:first-child>td:first-child]:rounded-tl-lg',
                  '[&:first-child>td:last-child]:rounded-tr-lg',
                  '[&:last-child>td:first-child]:rounded-bl-lg',
                  '[&:last-child>td:last-child]:rounded-br-lg',
                )}
              >
                <td className="whitespace-nowrap py-3 pl-6 pr-3">
                  <div className="flex items-center gap-3">
                    <p>
                      <span className={clsx({ 'line-through': item.disabled })}>
                        {item.username}
                      </span>
                      {item.disabled ? (
                        <span className="ml-2 rounded-lg border bg-red-300 px-2 py-1">
                          Deshabilitado
                        </span>
                      ) : null}
                    </p>
                  </div>
                </td>
                <TableActionsCell id={item.id} module={ModuleEnum.USER} path="/welcome/users">
                  <AuthWrapper
                    module={ModuleEnum.USER}
                    action={ActionEnum.DELETE}
                  >
                    {!item.disabled && (
                    <ActionButtonWithLoading
                      id="deleteUser"
                      action={disableUser.bind(null, item.id)}
                    >
                        <TrashIcon className="w-5" />
                    </ActionButtonWithLoading>
                  )}
                  </AuthWrapper>
                </TableActionsCell>
              </tr>
            ))}
          </Table>
        </div>
      </div>
    </div>
  );
}
