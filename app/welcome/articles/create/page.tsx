import { fetchActiveCategories } from '@/app/lib/data/categories';
import ArticleForm from '@/app/ui/articles/articles-form';
import Breadcrumbs from '@/app/ui/components/breadcrumbs';
import { Metadata } from 'next';

export const dynamic = 'force-dynamic';

export const metadata: Metadata = {
  title: 'Create Invoice',
};
 
export default async function Page() {
  const categories = await fetchActiveCategories();
  //TODO extract from DB
  const currencies = new Map([
    ['USD', 'USD'],
    ['UYU', 'UYU'],
    ['ARS', 'ARS']
  ]);
 
  return (
    <main>
      <Breadcrumbs
        homeUrl='/welcome'
        breadcrumbs={[
          { label: 'Artículos', href: '/welcome/articles' },
          {
            label: 'Nuevo artículo',
            href: '/welcome/articles/create',
            active: true,
          },
        ]}
      />
      <ArticleForm categories={categories} currencies={currencies}/>
    </main>
  );
}
