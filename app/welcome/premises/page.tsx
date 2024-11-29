import Pagination from '@/app/ui/components/pagination';
import { TableSkeleton } from '@/app/ui/skeletons';
import { Suspense } from 'react';

import { Metadata } from 'next';
import { ButtonLink } from '@/app/ui/components/button-link';
import Breadcrumbs from '@/app/ui/components/breadcrumbs';
import { fetchFilteredData, getPagesAmount } from '@/app/lib/data/generic';
import PremisesTable from '@/app/ui/premises/premises-table';

export const metadata: Metadata = {
  title: 'Locales',
};

export default async function Page(props: {
  params: Promise<{ query: string; page: string }>;
}) {
  const params = await props.params;
  const query = params.query || '';
  const currentPage = Number(params.page || 1);

  const pageSearchParams = new URLSearchParams({ show_all: 'true' });

  const dataList: any = await fetchFilteredData({
    path: 'premise/',
    query: '',
    currentPage: currentPage,
    urlParams: pageSearchParams,
  });
  const data = dataList['premises'];
  const totalPages = getPagesAmount(dataList['count']);

  return (
    <div className="w-full">
      <div className="flex flex-row justify-between">
        <Breadcrumbs
          homeUrl="/welcome"
          breadcrumbs={[
            { label: 'Locales', href: '/welcome/premises', active: true },
          ]}
        />
        <div className="-mt-2 flex w-min flex-col items-end gap-2 pr-2">
          <ButtonLink href="/welcome/premises/create" />
        </div>
      </div>
      {/* TODO ver como extraer los titulos para pasarle al Skeleton y al Table lo mismo */}
      <Suspense
        key={query + currentPage}
        fallback={<TableSkeleton titles={['Local']} />}
      >
        <PremisesTable data={data} />
      </Suspense>
      <div className="mt-5 flex w-full justify-center">
        <Pagination totalPages={totalPages} />
      </div>
    </div>
  );
}
