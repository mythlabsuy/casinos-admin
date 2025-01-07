import { fetchRoleById } from '@/app/lib/data/roles';
import Breadcrumbs, { Breadcrumb } from '@/app/ui/components/breadcrumbs';
import RolesForm from '@/app/ui/roles/roles-form';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Editar Rol',
};
 
export default async function Page(props: { params: Promise<{ id: string }> }) {
    const params = await props.params;
    const id = params.id;
  const basePath: string = '/welcome/roles';
  const breadcrumbConfig: Breadcrumb[] = [
    { label: 'Roles', href: basePath },
    {
      label: 'Editar rol',
      href: `${basePath}/${id}/edit`,
      active: true,
    },
  ]

  const role: any = await fetchRoleById('role/', id);
  
  return (
    <main>
      <Breadcrumbs breadcrumbs={breadcrumbConfig} />
      <RolesForm role={role} />
    </main>
  );
}
