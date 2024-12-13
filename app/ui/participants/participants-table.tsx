import { Participant } from '@/app/lib/definitions';
import Table from '../components/table';
import TableActionsCell from '../components/table-actions-cell';
import { fetchFilteredData, getPagesAmount } from '@/app/lib/data/generic';
import Pagination from '../components/pagination';
import clsx from 'clsx';
import { ModuleEnum } from '@/app/lib/enums/authActionModule';

export default async function ParticipantsTable({
  query,
  currentPage,
}: {
  query: string;
  currentPage: number;
}) {
  const dataList: any = await fetchFilteredData({
    path: 'participant/',
    query: query,
    currentPage: currentPage,
  });
  const data = dataList['participants'];
  const total_amount = dataList['total_amount'];

  return (
    <>
      <div className="flow-root">
        <div className="inline-block min-w-full align-middle">
          <div className="rounded-lg">
            <Table titles={['Nombre', 'Documento', 'Teléfono', 'Email']}>
              {data?.map((item: Participant) => (
                <tr
                  key={`cat_${item.id.toString()}`}
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
                      <p>{item.full_name}</p>
                    </div>
                  </td>
                  <td className="whitespace-nowrap py-3 pl-6 pr-3">
                    <div className="flex items-center gap-3">
                      <p>{item.document_number}</p>
                    </div>
                  </td>
                  <td className="whitespace-nowrap py-3 pl-6 pr-3">
                    <div className="flex items-center gap-3">
                      <p>{item.phone_number}</p>
                    </div>
                  </td>
                  <td className="whitespace-nowrap py-3 pl-6 pr-3">
                    <div className="flex items-center gap-3">
                      <p>{item.email}</p>
                    </div>
                  </td>
                  <TableActionsCell
                    id={item.id}
                    module={ModuleEnum.PARTICIPANT}
                    path="/welcome/participants"
                  >
                    {/* <IconButton id='deleteCategory' deleteAction={deleteCategory.bind(null, item.id)}>
                      <TrashIcon className="w-5" />
                    </IconButton> */}
                  </TableActionsCell>
                </tr>
              ))}
            </Table>
          </div>
        </div>
      </div>
      <div className="mt-5 flex w-full justify-center">
        <Pagination totalPages={getPagesAmount(total_amount)} />
      </div>
    </>
  );
}
