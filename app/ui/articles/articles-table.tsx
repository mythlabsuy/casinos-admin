import Image from 'next/image';
import { Article } from '@/app/lib/definitions';
import Table from '../components/table';
import TableActionsCell from '../components/table-actions-cell';
import DynamicHeroIcon from '../dynamic-hero-icon';
import TableCell from '../components/table-cell';
import { IconButton } from '../components/icon-button';
import { TrashIcon } from '@heroicons/react/24/outline';
import { deleteArticle } from '@/app/lib/actions';
import { fetchFilteredArticles } from '@/app/lib/data/articles';

export default async function ArticlesTable({
  query,
  currentPage,
}: {
  query: string;
  currentPage: number;
}) {
  const articles:Article[] = await fetchFilteredArticles(query, currentPage);

  return (
    <div className="mt-6 flow-root">
      <div className="inline-block min-w-full align-middle">
        <div className="rounded-lg bg-gray-50 p-2 md:pt-0">
          <Table titles={['Artículo', 'Descripción', 'Stock Disponible', 'Categoría', 'Precio']}>
            {articles?.map((article: Article) => (
              <tr
                key={article.id}
                className="w-full border-b py-3 text-sm last-of-type:border-none [&:first-child>td:first-child]:rounded-tl-lg [&:first-child>td:last-child]:rounded-tr-lg [&:last-child>td:first-child]:rounded-bl-lg [&:last-child>td:last-child]:rounded-br-lg"
              >
                <td className="whitespace-nowrap py-3 pl-6 pr-3">
                  <div className="flex items-center gap-3">
                    {article.media_files.find(file => !file.disabled) ? <Image
                      src={article.media_files.find(file => !file.disabled)!.path}
                      className="rounded-md"
                      width={28}
                      height={28}
                      alt={`${article.name}'s profile picture`}
                    /> : <DynamicHeroIcon icon='PhotoIcon' className='w-7 h-7'/> }
                    <p>{article.name}</p>
                  </div>
                </td>
                <TableCell text={article.description}/>
                <TableCell text={article.current_stock.toString()}/>
                <TableCell text={article.category.name}/>
                <TableCell text={`${article.currency} ${article.price}`}/>
                <TableActionsCell id={article.id} path="/welcome/articles/">
                <IconButton id="deleteArticle" deleteAction={deleteArticle.bind(null, article.id)}>
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
