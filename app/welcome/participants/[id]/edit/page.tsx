import Breadcrumbs, { Breadcrumb } from '@/app/ui/components/breadcrumbs';
import { notFound } from 'next/navigation';
import { Metadata } from 'next';
import ParticipantsForm from '@/app/ui/participants/participants-form';
import { fetchParticipant } from '@/app/lib/data/participants';

export const metadata: Metadata = {
  title: 'Editar Participante',
};
 
export default async function Page({ params }: { params: { id: number } }) {
  const id = params.id;
  
  const itemResponse = await fetchParticipant(id);
  const item = await itemResponse.json()

  const basePath: string = '/welcome/participants';
  const breadcrumbConfig: Breadcrumb[] = [
    { label: 'Participantes', href: basePath },
    {
      label: 'Editar participante',
      href: `${basePath}/${id}/edit`,
      active: true,
    },
  ]

  if (!item) {
    notFound();
  }
  
  return (
    <main>
      <Breadcrumbs
        breadcrumbs={breadcrumbConfig}
      />
      <ParticipantsForm participant={item}/>
    </main>
  );
}