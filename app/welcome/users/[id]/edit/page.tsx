import { fetchFilteredData } from '@/app/lib/data/generic';
import { fetchPremiseById } from '@/app/lib/data/premises';
import { fetchUserById } from '@/app/lib/data/users';
import Breadcrumbs, { Breadcrumb } from '@/app/ui/components/breadcrumbs';
import PremiseForm from '@/app/ui/premises/premises-form';
import UsersForm from '@/app/ui/users/users-form';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Editar local',
};

export default async function Page(props: { params: Promise<{ id: string }> }) {
  const params = await props.params;
  const id = params.id;
  const basePath: string = '/welcome/premises';
  const breadcrumbConfig: Breadcrumb[] = [
    { label: 'Usuarios', href: basePath },
    {
      label: 'Editar usuario',
      href: `${basePath}/users/${id}/edit`,
      active: true,
    },
  ];

  const pageSearchParams = new URLSearchParams({ show_all: 'true' });

  const user: any = await fetchUserById('', id);

  const premisesResponse: any = await fetchFilteredData({
    path: 'premise/',
    query: '',
    unlimited: true,
  });
  const premises = premisesResponse['premises'];

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
      <UsersForm user={user} roleList={roleList} premises={premises} />
    </main>
  );
}
