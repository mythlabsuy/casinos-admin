import Breadcrumbs, { Breadcrumb } from '@/app/ui/components/breadcrumbs';
import { notFound } from 'next/navigation';
import { Metadata } from 'next';
import CategoryForm from '@/app/ui/categories/categories-form';
import { fetchCategory } from '@/app/lib/data/categories';

export const metadata: Metadata = {
  title: 'Editar Categoría',
};
 
export default async function Page({ params }: { params: { id: number } }) {
  const id = params.id;
  
  const itemResponse = await fetchCategory(id);
  const item = await itemResponse.json()

  const basePath: string = '/welcome/categories';
  const breadcrumbConfig: Breadcrumb[] = [
    { label: 'Categorías', href: basePath },
    {
      label: 'Nueva categoría',
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
      <CategoryForm category={item}/>
    </main>
  );
}