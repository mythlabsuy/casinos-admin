import Breadcrumbs, { Breadcrumb } from '@/app/ui/components/breadcrumbs';
import RolesForm from '@/app/ui/roles/roles-form';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Nuevo Rol',
};

export default async function Page() {
  const basePath: string = '/welcome/users';
  const breadcrumbConfig: Breadcrumb[] = [
    { label: 'Roles', href: basePath },
    {
      label: 'Nuevo rol',
      href: `${basePath}/create`,
      active: true,
    },
  ];

  return (
    <main>
      <Breadcrumbs breadcrumbs={breadcrumbConfig} />
      <RolesForm  />
    </main>
  );
}
