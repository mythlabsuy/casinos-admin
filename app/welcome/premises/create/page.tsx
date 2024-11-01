import CategoryForm from '@/app/ui/categories/categories-form';
import Breadcrumbs, { Breadcrumb } from '@/app/ui/components/breadcrumbs';
import PremiseForm from '@/app/ui/premises/premises-form';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Nuevo local',
};
 
export default async function Page() {
  const basePath: string = '/welcome/premises';
  const breadcrumbConfig: Breadcrumb[] = [
    { label: 'Locales', href: basePath },
    {
      label: 'Nuevo local',
      href: `${basePath}/create`,
      active: true,
    },
  ]
 
  return (
    <main>
      <Breadcrumbs breadcrumbs={breadcrumbConfig} />
      <PremiseForm />
    </main>
  );
}
