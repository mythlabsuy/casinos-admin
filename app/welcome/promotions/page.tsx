import Pagination from '@/app/ui/components/pagination';
import { TableSkeleton } from '@/app/ui/skeletons';
import { Suspense } from 'react';
import { Metadata } from 'next';
import { ButtonLink } from '@/app/ui/components/button-link';
import Breadcrumbs from '@/app/ui/components/breadcrumbs';
import { fetchFilteredData, getPagesAmount } from '@/app/lib/data/generic';
import PromotionsTable from '@/app/ui/promotions/promotions-table';

export const metadata: Metadata = {
  title: 'Promociones',
};

export default async function Page(props: {
  searchParams?: Promise<{ 
    query?: string;
    page?: string;
  }>;
}) {
  const params = await props.searchParams;
  const query = params?.query || '';
  const currentPage = Number(params?.page || 1);

  const pageSearchParams = new URLSearchParams({ show_all: 'true' });
  const dataList: any = await fetchFilteredData({
    path: 'promotion/',
    query: '',
    currentPage: currentPage,
    urlParams: pageSearchParams,
    addPremiseQuery: true,
  });
  const data = dataList['promotions'];
  const totalPages = getPagesAmount(dataList['count']);

  return (
    <div className="w-full">
      <div className="flex flex-row justify-between">
        <Breadcrumbs
          homeUrl="/welcome"
          breadcrumbs={[
            { label: 'Promociones', href: '/welcome/promotions', active: true },
          ]}
        />
        <div className="-mt-2 flex w-min flex-col items-end gap-2 pr-2">
          <ButtonLink href="/welcome/promotions/create" />
        </div>
      </div>
      {/* TODO ver como extraer los titulos para pasarle al Skeleton y al Table lo mismo */}
      <Suspense
        key={query + currentPage}
        fallback={<TableSkeleton titles={['Promoción']} />}
      >
        <PromotionsTable data={data} />
      </Suspense>
      <div className="mt-5 flex w-full justify-center">
        <Pagination totalPages={totalPages} />
      </div>
    </div>
  );
}
