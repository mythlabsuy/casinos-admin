import CategoryForm from '@/app/ui/categories/categories-form';
import Breadcrumbs, { Breadcrumb } from '@/app/ui/components/breadcrumbs';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Nueva Categoría',
};
 
export default async function Page() {
  const basePath: string = '/welcome/categories';
  const breadcrumbConfig: Breadcrumb[] = [
    { label: 'Categorías', href: basePath },
    {
      label: 'Nueva categoría',
      href: `${basePath}/create`,
      active: true,
    },
  ]
 
  return (
    <main>
      <Breadcrumbs breadcrumbs={breadcrumbConfig} />
      <CategoryForm />
    </main>
  );
}
