import { fetchPromotionById } from '@/app/lib/data/promotions';
import Breadcrumbs, { Breadcrumb } from '@/app/ui/components/breadcrumbs';
import PremiseForm from '@/app/ui/premises/premises-form';
import PromotionForm from '@/app/ui/promotions/promotions-form';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Editar local',
};
 
export default async function Page(props: { params: Promise<{ id: string }> }) {
    const params = await props.params;
    const id = params.id;
  const basePath: string = '/welcome/promotions';
  const breadcrumbConfig: Breadcrumb[] = [
    { label: 'Promociones', href: basePath },
    {
      label: 'Editar Promoción',
      href: `${basePath}/promotions/${id}/edit`,
      active: true,
    },
  ]

  const promotion: any = await fetchPromotionById('promotion/', id);
  const data = promotion['promotion'];
  
  return (
    <main>
      <Breadcrumbs breadcrumbs={breadcrumbConfig} />
      <PromotionForm promotion={promotion} />
    </main>
  );
}
