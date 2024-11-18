import { fetchFilteredData } from '@/app/lib/data/generic';
import Breadcrumbs, { Breadcrumb } from '@/app/ui/components/breadcrumbs';
import UsersForm from '@/app/ui/users/users-form';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Nuevo Usuario',
};

export default async function Page() {
  const basePath: string = '/welcome/users';
  const breadcrumbConfig: Breadcrumb[] = [
    { label: 'Usuarios', href: basePath },
    {
      label: 'Nuevo usuario',
      href: `${basePath}/create`,
      active: true,
    },
  ];

  const pageSearchParams = new URLSearchParams({ show_all: 'true' });

  const dataList: any = await fetchFilteredData(
    'premise/',
    '',
    1,
    pageSearchParams,
  );
  const data = dataList['premises'];

  const rolesResponse: any = await fetchFilteredData(
    'role/',
    '',
    1,
    pageSearchParams,
  );
  const roleList = rolesResponse['roles'];

  return (
    <main>
      <Breadcrumbs breadcrumbs={breadcrumbConfig} />
      <UsersForm roleList={roleList} premises={data} />
    </main>
  );
}
