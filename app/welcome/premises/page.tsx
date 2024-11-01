import Pagination from '@/app/ui/components/pagination';
import Search from '@/app/ui/search';
import CategoriesTable from '@/app/ui/categories/categories-table';
import { TableSkeleton } from '@/app/ui/skeletons';
import { Suspense } from 'react';

import { Metadata } from 'next';
import { ButtonLink } from '@/app/ui/components/button-link';
import Breadcrumbs from '@/app/ui/components/breadcrumbs';
import {
  fetchFilteredData,
  fetchPagesAmount,
  getPagesAmount,
} from '@/app/lib/data/generic';
import PremisesTable from '@/app/ui/premises/premises-table';

export const metadata: Metadata = {
  title: 'Categorias',
};

export default async function Page({
  searchParams,
}: {
  searchParams?: {
    query?: string;
    page?: string;
  };
}) {
  const query = searchParams?.query || '';
  const currentPage = Number(searchParams?.page) || 1;

  const pageSearchParams = new URLSearchParams({ show_all: 'true' });

  const dataList: any = await fetchFilteredData(
    'premise/',
    '',
    currentPage,
    pageSearchParams,
  );
  const data = dataList['premises'];
  const totalPages = getPagesAmount(dataList['count']);

  return (
    <div className="w-full">
      <Breadcrumbs
        homeUrl="/welcome"
        breadcrumbs={[
          { label: 'Locales', href: '/welcome/premises', active: true },
        ]}
      />
      <div className="mt-4 flex items-center justify-between gap-2 md:mt-8">
        <ButtonLink href="/welcome/premises/create" />
      </div>
      {/* TODO ver como extraer los titulos para pasarle al Skeleton y al Table lo mismo */}
      <Suspense
        key={query + currentPage}
        fallback={<TableSkeleton titles={['Nombre']} />}
      >
        <PremisesTable data={data} />
      </Suspense>
      <div className="mt-5 flex w-full justify-center">
        <Pagination totalPages={totalPages} />
      </div>
    </div>
  );
}
