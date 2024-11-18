import Pagination from '@/app/ui/components/pagination';
import { TableSkeleton } from '@/app/ui/skeletons';
import { Suspense } from 'react';
import { Metadata } from 'next';
import { ButtonLink } from '@/app/ui/components/button-link';
import Breadcrumbs from '@/app/ui/components/breadcrumbs';
import {
  fetchFilteredData,
  getPagesAmount,
} from '@/app/lib/data/generic';
import UsersTable from '@/app/ui/users/users-table';

export const metadata: Metadata = {
  title: 'Usuarios',
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
    'user/',
    '',
    currentPage,
    pageSearchParams,
    true,
  );
  const data = dataList['users'];
  const totalPages = getPagesAmount(dataList['count']);

  return (
    <div className="w-full">
      <div className="flex flex-row justify-between">
        <Breadcrumbs
          homeUrl="/welcome"
          breadcrumbs={[
            { label: 'Usuarios', href: '/welcome/users', active: true },
          ]}
        />
        <div className="flex flex-col items-end -mt-2 w-min pr-2 gap-2">
          <ButtonLink href="/welcome/users/create" />
        </div>
      </div>
      {/* TODO ver como extraer los titulos para pasarle al Skeleton y al Table lo mismo */}
      <Suspense
        key={query + currentPage}
        fallback={<TableSkeleton titles={['Usuarios']} />}
      >
        <UsersTable data={data} />
      </Suspense>
      <div className="mt-5 flex w-full justify-center">
        <Pagination totalPages={totalPages} />
      </div>
    </div>
  );
}
