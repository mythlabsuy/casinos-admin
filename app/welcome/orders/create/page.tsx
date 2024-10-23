import { fetchFilteredClients } from '@/app/lib/actions/clients';
import Breadcrumbs, { Breadcrumb } from '@/app/ui/components/breadcrumbs';
import OrdersForm from '@/app/ui/orders/orders-form';
import { Metadata } from 'next';

//TODO Ver si hay una mejor forma de resolver esto
export const dynamic = 'force-dynamic';

export const metadata: Metadata = {
  title: 'Nueva Categoría',
};
 
export default async function Page() {
  const clients = await fetchFilteredClients('', 0);

  const basePath: string = '/welcome/orders';
  const breadcrumbConfig: Breadcrumb[] = [
    { label: 'Órdenes', href: basePath },
    {
      label: 'Nueva orden',
      href: `${basePath}/create`,
      active: true,
    },
  ]
 
  return (
    <main>
      <Breadcrumbs breadcrumbs={breadcrumbConfig} />
      <OrdersForm clients={clients.clients} />
    </main>
  );
}
