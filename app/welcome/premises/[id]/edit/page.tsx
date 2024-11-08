import { fetchPremiseById } from '@/app/lib/data/premises';
import CategoryForm from '@/app/ui/categories/categories-form';
import Breadcrumbs, { Breadcrumb } from '@/app/ui/components/breadcrumbs';
import PremiseForm from '@/app/ui/premises/premises-form';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Editar local',
};
 
export default async function Page(props: { params: Promise<{ id: string }> }) {
    const params = await props.params;
    const id = params.id;
  const basePath: string = '/welcome/premises';
  const breadcrumbConfig: Breadcrumb[] = [
    { label: 'Locales', href: basePath },
    {
      label: 'Editar local',
      href: `${basePath}/premises/${id}/edit`,
      active: true,
    },
  ]

  const premise: any = await fetchPremiseById('premise/', id);
  const data = premise['premise'];
  
  return (
    <main>
      <Breadcrumbs breadcrumbs={breadcrumbConfig} />
      <PremiseForm premise={premise} />
    </main>
  );
}