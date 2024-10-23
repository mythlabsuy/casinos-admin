import { ListOrdersModel, OrdersListItemModel } from '@/app/lib/definitions';
import Table from '../components/table';
import TableActionsCell from '../components/table-actions-cell';
import { IconButton } from '../components/icon-button';
import { ArchiveBoxXMarkIcon, TrashIcon, XMarkIcon } from '@heroicons/react/24/outline';
import { fetchFilteredData } from '@/app/lib/data/generic';
import { getOrderStatusString } from '@/app/lib/enums/order-status';
import { deleteOrder } from '@/app/lib/actions/orders';

export default async function OrdersTable({
  query,
  currentPage,
}: {
  query: string;
  currentPage: number;
}) {
  const searchParams = new URLSearchParams({ show_all: 'true' });
  const dataList: ListOrdersModel = await fetchFilteredData('order/all', query, currentPage, searchParams);
  const data = dataList['orders'];

  return (
    <div className="mt-6 flow-root">
      <div className="inline-block min-w-full align-middle">
        <div className="rounded-lg bg-gray-50 p-2 md:pt-0">
          <Table titles={['Fecha de creación', 'Cliente', 'Datos de contacto', 'Monto', 'Estado']}>
            {data?.map((item: OrdersListItemModel) => (
              <tr
                key={`cat_${item.order_id.toString()}`}
                className="w-full border-b py-3 text-sm last-of-type:border-none [&:first-child>td:first-child]:rounded-tl-lg [&:first-child>td:last-child]:rounded-tr-lg [&:last-child>td:first-child]:rounded-bl-lg [&:last-child>td:last-child]:rounded-br-lg"
              >
                <td className="whitespace-nowrap py-3 pl-6 pr-3">
                  { new Date(item.date).toLocaleDateString('es-UY', {
                      day: '2-digit',
                      month: '2-digit',
                      year: 'numeric',
                      hour: '2-digit',
                      minute: '2-digit',
                      hour12: false,
                    })
                  }
                </td>
                <td className="whitespace-nowrap py-3 pl-6 pr-3">
                  {item.client_name}
                </td>
                <td className="whitespace-nowrap py-3 pl-6 pr-3">
                  {item.client_email} <br/>
                  {item.client_phone}
                </td>
                <td className="whitespace-nowrap py-3 pl-6 pr-3">
                  {item.currency} {item.price}
                </td>
                <td className="whitespace-nowrap py-3 pl-6 pr-3">
                  {getOrderStatusString(item.status, 'es')}
                </td>
                <TableActionsCell id={item.order_id} path="/welcome/orders">
                  <IconButton deleteAction={deleteOrder.bind(null, item.order_id)} tooltip='Cancelar orden' id={item.order_id.toString()}>
                    <XMarkIcon className="w-5" />
                  </IconButton>
                </TableActionsCell> 
              </tr>
            ))}
          </Table>
        </div>
      </div>
    </div>
  );
}
