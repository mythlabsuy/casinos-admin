import Breadcrumbs, { Breadcrumb } from '@/app/ui/components/breadcrumbs';
import { notFound } from 'next/navigation';
import { Metadata } from 'next';
import { fetchOrder } from '@/app/lib/data/orders';
import OrdersForm from '@/app/ui/orders/orders-form';
import { fetchFilteredClients } from '@/app/lib/actions/clients';

export const metadata: Metadata = {
  title: 'Editar Orden',
};
 
export default async function Page({ params }: { params: { id: number } }) {
  const clients = await fetchFilteredClients('', 0);
  
  const id = params.id;
  
  const itemResponse = await fetchOrder(id);
  const item = await itemResponse.json()

  const basePath: string = '/welcome/orders';
  const breadcrumbConfig: Breadcrumb[] = [
    { label: 'Órdenes', href: basePath },
    {
      label: 'Nueva orden',
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
      <OrdersForm order={item} clients={clients.clients}/>
    </main>
  );
}