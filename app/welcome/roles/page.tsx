import Pagination from '@/app/ui/components/pagination';
import { TableSkeleton } from '@/app/ui/skeletons';
import { Suspense } from 'react';
import { Metadata } from 'next';
import { ButtonLink } from '@/app/ui/components/button-link';
import Breadcrumbs from '@/app/ui/components/breadcrumbs';
import { fetchFilteredData, getPagesAmount } from '@/app/lib/data/generic';
import RolesTable from '@/app/ui/roles/roles-table';

export const metadata: Metadata = {
  title: 'Roles',
};

export default async function Page({
  searchParams,
}: {
  searchParams?: {
    query?: string;
    page?: string;
  };
}) {
  const resolvedSearchParams = await Promise.resolve(searchParams);
  const query = resolvedSearchParams?.query || '';
  const currentPage = Number(resolvedSearchParams?.page) || 1;

  const pageSearchParams = new URLSearchParams({ show_all: 'true' });

  const dataList: any = await fetchFilteredData(
    'role/',
    '',
    currentPage,
    pageSearchParams,
  );
  const data = dataList['roles'];
  const totalPages = getPagesAmount(dataList['count']);

  return (
    <div className="w-full">
      <div className="flex flex-row justify-between">
        <Breadcrumbs
          homeUrl="/welcome"
          breadcrumbs={[
            { label: 'Roles', href: '/welcome/roles', active: true },
          ]}
        />
        <div className="-mt-2 flex w-min flex-col items-end gap-2 pr-2">
          <ButtonLink href="/welcome/roles/create" />
        </div>
      </div>
      {/* TODO ver como extraer los titulos para pasarle al Skeleton y al Table lo mismo */}
      <Suspense
        key={query + currentPage}
        fallback={<TableSkeleton titles={['Rol']} />}
      >
        <RolesTable data={data} />
      </Suspense>
      <div className="mt-5 flex w-full justify-center">
        <Pagination totalPages={totalPages} />
      </div>
    </div>
  );
}
