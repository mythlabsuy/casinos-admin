import Search from '@/app/ui/search';
import { TableSkeleton } from '@/app/ui/skeletons';
import { ReactNode, Suspense } from 'react';

import { Metadata } from 'next';
import Breadcrumbs from '@/app/ui/components/breadcrumbs';
import ParticipantsTable from '@/app/ui/participants/participants-table';

export const metadata: Metadata = {
  title: 'Participantes',
};
export interface PageProps {
  searchParams?: {
    query?: string;
    page?: string;
  };
}
export default async function Page(props: {
  params: Promise<{ query: string; page: string }>;
}) {
  const params = await props.params;
  const query = params.query || '';
  const currentPage = Number(params.page || 1);

  return (
    <div className="w-full">
      <Breadcrumbs
        homeUrl="/welcome"
        breadcrumbs={[
          {
            label: 'Participantes',
            href: '/welcome/participants',
            active: true,
          },
        ]}
      />
      <div className="mt-4 flex items-center justify-between gap-2 md:mt-8">
        <Search placeholder="Búsqueda de participantes por Nombre, Documento o Email" />
      </div>
      {/* TODO ver como extraer los titulos para pasarle al Skeleton y al Table lo mismo */}
      <Suspense
        key={query + currentPage}
        fallback={
          <TableSkeleton
            titles={['Nombre', 'Documento', 'Teléfono', 'Email']}
          />
        }
      >
        <ParticipantsTable query={query} currentPage={currentPage} />
      </Suspense>
    </div>
  );
}
