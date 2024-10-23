import Pagination from '@/app/ui/components/pagination';
import Search from '@/app/ui/search';
import { TableSkeleton } from '@/app/ui/skeletons';
import { Suspense } from 'react';

import { Metadata } from 'next';
import { ButtonLink } from '@/app/ui/components/button-link';
import Breadcrumbs, { Breadcrumb } from '@/app/ui/components/breadcrumbs';
import { fetchPagesAmount } from '@/app/lib/data/generic';
import OrdersTable from '@/app/ui/orders/orders-table';
 
export const metadata: Metadata = {
  title: 'Órdenes',
};
 
export default async function Page({
  searchParams,
}: {
  searchParams?: {
    query?: string;
    page?: string;
  };
}) {
  const basePath: string = '/welcome/orders';
  const breadcrumbConfig: Breadcrumb[] = [
    { label: 'Órdenes', href: basePath, active: true, },
  ]
  const query = searchParams?.query || '';
  const currentPage = Number(searchParams?.page) || 1;

  const totalPages = await fetchPagesAmount('order/all/count', query);

  
  return (
    <div className="w-full">
      <Breadcrumbs breadcrumbs={ breadcrumbConfig } />
      <div className="mt-4 flex items-center justify-between gap-2 md:mt-8">
        <Search placeholder="Búsqueda de órdenes (Dirección, nombre del comprador o identificador de la orden)" />
        <ButtonLink href='/welcome/orders/create'/>
      </div>
      {/* TODO ver como extraer los titulos para pasarle al Skeleton y al Table lo mismo */}
      <Suspense key={query + currentPage} fallback={<TableSkeleton titles={['Fecha de creación', 'Cliente', 'E-mail', 'Phone', 'Monto', 'Estado']} />}>
        <OrdersTable query={query} currentPage={currentPage} />
      </Suspense>
      <div className="mt-5 flex w-full justify-center">
        <Pagination totalPages={totalPages} />
      </div>
    </div>
  );
}