import Image from 'next/image';
import { Promotion } from '@/app/lib/definitions';
import Table from '../components/table';
import TableActionsCell from '../components/table-actions-cell';
import { ActionButtonWithLoading } from '../components/action-button-with-loading';
import { TrashIcon } from '@heroicons/react/24/outline';
import DynamicHeroIcon from '../dynamic-hero-icon';
import clsx from 'clsx';
import { softDeletePromotion } from '@/app/lib/actions/promotion-actions';
import { ModuleEnum, ActionEnum } from '@/app/lib/enums/authActionModule';
import AuthWrapper from '@/components/authWrapper';

export default async function PromotionsTable({ data }: { data: any }) {
  let counter = 0;
  return (
    <div className="flow-root">
      <div className="inline-block min-w-full align-middle">
        <div className="rounded-lg">
          <Table titles={['Promoción']}>
            {data?.map((item: Promotion) => (
              <tr
                key={`pro_${item.name.toString()}_${counter++}`}
                // className="w-full border-b py-3 text-sm last-of-type:border-none [&:first-child>td:first-child]:rounded-tl-lg [&:first-child>td:last-child]:rounded-tr-lg [&:last-child>td:first-child]:rounded-bl-lg [&:last-child>td:last-child]:rounded-br-lg "
                className={clsx(
                  'w-full py-3 text-sm',
                  { 'border-b': !item.is_active },
                  { 'border-green-600 border-2': item.is_active },
                  '[&:first-child>td:first-child]:rounded-tl-lg',
                  '[&:first-child>td:last-child]:rounded-tr-lg',
                  '[&:last-child>td:first-child]:rounded-bl-lg',
                  '[&:last-child>td:last-child]:rounded-br-lg',
                  { 'bg-red-600': item.is_deleted },
                )}
              >
                <td className= {clsx(
                  "whitespace-nowrap py-3 pl-6 pr-3",
                )}>
                  <div className="flex items-center gap-3">
                    {item.background?.path ? (
                      <Image
                        src={
                          item.background?.path?.startsWith('http')
                            ? item.background.path
                            : `/${item.background.path?.replace(/^\/+/, '')}` // ensures only one leading slash
                        }
                        className="rounded-md"
                        width={28}
                        height={28}
                        alt={`Logo del local ${item.name}`}
                      />
                    ) : (
                      <DynamicHeroIcon icon="PhotoIcon" className="h-7 w-7" />
                    )}
                    <p>{item.name}</p>
                  </div>
                </td>
                <TableActionsCell
                  id={item.id}
                  module={ModuleEnum.PROMOTION}
                  path="/welcome/promotions"
                >
                  <AuthWrapper
                    module={ModuleEnum.PROMOTION}
                    action={ActionEnum.DELETE}
                  >
                    {!item.is_deleted && (
                    <ActionButtonWithLoading
                      id="deletePromotion"
                      action={softDeletePromotion.bind(null, item.id)}
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
