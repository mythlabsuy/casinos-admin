import Image from 'next/image';
import { Category } from '@/app/lib/definitions';
import Table from '../components/table';
import TableActionsCell from '../components/table-actions-cell';
import DynamicHeroIcon from '../dynamic-hero-icon';
import { IconButton } from '../components/icon-button';
import { TrashIcon } from '@heroicons/react/24/outline';
import { fetchFilteredData } from '@/app/lib/data/generic';
import { deleteCategory } from '@/app/lib/category-actions';

export default async function CategoriesTable({
  query,
  currentPage,
}: {
  query: string;
  currentPage: number;
}) {
  const searchParams = new URLSearchParams({ show_all: 'true' });
  const dataList:any = await fetchFilteredData('category', query, currentPage, searchParams);
  const data = dataList['category'];

  return (
    <div className="mt-6 flow-root">
      <div className="inline-block min-w-full align-middle">
        <div className="rounded-lg bg-gray-50 p-2 md:pt-0">
          <Table titles={['Categoria']}>
            {data?.map((item: Category) => (
              <tr
                key={`cat_${item.id.toString()}`}
                className="w-full border-b py-3 text-sm last-of-type:border-none [&:first-child>td:first-child]:rounded-tl-lg [&:first-child>td:last-child]:rounded-tr-lg [&:last-child>td:first-child]:rounded-bl-lg [&:last-child>td:last-child]:rounded-br-lg"
              >
                <td className="whitespace-nowrap py-3 pl-6 pr-3">
                  <div className="flex items-center gap-3">
                    {item.image ? <Image
                      src={item.image}
                      className="rounded-md"
                      width={28}
                      height={28}
                      alt={`${item.name}'s profile picture`}
                    /> : <DynamicHeroIcon icon='PhotoIcon' className='w-7 h-7'/> }
                    <p>{item.name}</p>
                  </div>
                </td>
                <TableActionsCell id={item.id} path="/welcome/categories">
                  <IconButton id='deleteCategory' deleteAction={deleteCategory.bind(null, item.id)}>
                    <TrashIcon className="w-5" />
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
