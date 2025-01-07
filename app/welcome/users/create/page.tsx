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

  const dataList: any = await fetchFilteredData({
    path: 'premise/',
    query: '',
    urlParams: pageSearchParams,
    unlimited: true,
  });
  const data = dataList['premises'];

  const rolesResponse: any = await fetchFilteredData({
    path: 'role/',
    query: '',
    currentPage: 1,
    urlParams: pageSearchParams,
    unlimited: true,
  });
  const roleList = rolesResponse['roles'];

  return (
    <main>
      <Breadcrumbs breadcrumbs={breadcrumbConfig} />
      <UsersForm roleList={roleList} premises={data} />
    </main>
  );
}
