import Breadcrumbs, { Breadcrumb } from '@/app/ui/components/breadcrumbs';
import PromotionForm from '@/app/ui/promotions/promotions-form';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Nueva promoción',
};
 
export default async function Page() {
  const basePath: string = '/welcome/promotions';
  const breadcrumbConfig: Breadcrumb[] = [
    { label: 'Promociones', href: basePath },
    {
      label: 'Nueva promocion',
      href: `${basePath}/create`,
      active: true,
    },
  ]
 
  return (
    <main>
      <Breadcrumbs breadcrumbs={breadcrumbConfig} />
      <PromotionForm />
    </main>
  );
}
