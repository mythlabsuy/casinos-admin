import Pagination from '@/app/ui/components/pagination';
import Search from '@/app/ui/search';
import CategoriesTable from '@/app/ui/categories/categories-table';
import { TableSkeleton } from '@/app/ui/skeletons';
import { Suspense } from 'react';

import { Metadata } from 'next';
import { ButtonLink } from '@/app/ui/components/button-link';
import Breadcrumbs from '@/app/ui/components/breadcrumbs';
import { fetchPagesAmount } from '@/app/lib/data/generic';
 
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

  const totalPages = await fetchPagesAmount('category/count', query);
  
  return (
    <div className="w-full">
      <Breadcrumbs
        homeUrl='/welcome'
        breadcrumbs={[
          { label: 'Categorias', href: '/welcome/categories', active: true, },
        ]}
      />
      <div className="mt-4 flex items-center justify-between gap-2 md:mt-8">
        <Search placeholder="Búsqueda de categorias..." />
        <ButtonLink href='/welcome/categories/create'/>
      </div>
      {/* TODO ver como extraer los titulos para pasarle al Skeleton y al Table lo mismo */}
      <Suspense key={query + currentPage} fallback={<TableSkeleton titles={['Nombre']} />}>
        <CategoriesTable query={query} currentPage={currentPage} />
      </Suspense>
      <div className="mt-5 flex w-full justify-center">
        <Pagination totalPages={totalPages} />
      </div>
    </div>
  );
}