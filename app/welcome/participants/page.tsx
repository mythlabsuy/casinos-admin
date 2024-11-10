import Search from '@/app/ui/search';
import { TableSkeleton } from '@/app/ui/skeletons';
import { Suspense } from 'react';

import { Metadata } from 'next';
import { ButtonLink } from '@/app/ui/components/button-link';
import Breadcrumbs from '@/app/ui/components/breadcrumbs';
import ParticipantsTable from '@/app/ui/participants/participants-table';
 
export const metadata: Metadata = {
  title: 'Participantes',
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
  
  return (
    <div className="w-full">
      <Breadcrumbs
        homeUrl='/welcome'
        breadcrumbs={[
          { label: 'Participantes', href: '/welcome/participants', active: true, },
        ]}
      />
      <div className="mt-4 flex items-center justify-between gap-2 md:mt-8">
        <Search placeholder="Búsqueda de participantes por Nombre, Documento o Email" />
        <ButtonLink href='/welcome/categories/create'/>
      </div>
      {/* TODO ver como extraer los titulos para pasarle al Skeleton y al Table lo mismo */}
      <Suspense key={query + currentPage} fallback={<TableSkeleton titles={['Nombre', 'Documento', 'Teléfono', 'Email']} />}>
        <ParticipantsTable query={query} currentPage={currentPage} />
      </Suspense>
    </div>
  );
}