import Pagination from '@/app/ui/components/pagination';
import Search from '@/app/ui/search';
import Table from '@/app/ui/articles/articles-table';
import { TableSkeleton } from '@/app/ui/skeletons';
import { Suspense } from 'react';

import { Metadata } from 'next';
import { ButtonLink } from '@/app/ui/components/button-link';
import Breadcrumbs from '@/app/ui/components/breadcrumbs';
import { fetchPagesAmount } from '@/app/lib/data/generic';
 
export const metadata: Metadata = {
  title: 'Artículos',
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

  const totalPages = await fetchPagesAmount('article/count', query);
  
  return (
    <div className="w-full">
      <Breadcrumbs
        homeUrl='/welcome'
        breadcrumbs={[
          { label: 'Artículos', href: '/welcome/articles', active: true, },
        ]}
      />
      <div className="mt-4 flex items-center justify-between gap-2 md:mt-8">
        <Search placeholder="Búsqueda de artículos..." />
        <ButtonLink href='/welcome/articles/create'/>
      </div>
      {/* TODO ver como extraer los titulos para pasarle al Skeleton y al Table lo mismo */}
      <Suspense key={query + currentPage} fallback={<TableSkeleton titles={['Artículo', 'Descripción', 'Stock Disponible', 'Categoría', 'Precio']} />}>
        <Table query={query} currentPage={currentPage} />
      </Suspense>
      <div className="mt-5 flex w-full justify-center">
        <Pagination totalPages={totalPages} />
      </div>
    </div>
  );
}