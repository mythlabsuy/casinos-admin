import Breadcrumbs from '@/app/ui/components/breadcrumbs';
import { notFound } from 'next/navigation';
import { Metadata } from 'next';
import ArticleForm from '@/app/ui/articles/articles-form';
import { fetchActiveCategories } from '@/app/lib/data/categories';
import { fetchArticle } from '@/app/lib/data/articles';

export const metadata: Metadata = {
  title: 'Edit Article',
};
 
export default async function Page({ params }: { params: { id: number } }) {
  const id = params.id;
  const categories = await fetchActiveCategories();
  //TODO extract from DB
  const currencies = new Map([
    ['USD', 'USD'],
    ['UYU', 'UYU'],
    ['ARS', 'ARS']
  ]);
  const articleResponse = await fetchArticle(id);
  const article = await articleResponse.json()

  const breadcrumbConfig = [
    { label: 'Artículos', href: '/welcome/articles' },
    {
      label: 'Editar artículo',
      href: `/welcome/articles/${id}/edit`,
      active: true,
    },
  ]

  if (!article) {
    notFound();
  }
  
  return (
    <main>
      <Breadcrumbs
        breadcrumbs={breadcrumbConfig}
      />
      <ArticleForm categories={categories} currencies={currencies} article={article}/>
    </main>
  );
}