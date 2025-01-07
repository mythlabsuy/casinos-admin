import Breadcrumbs, { Breadcrumb } from '@/app/ui/components/breadcrumbs';
import UpdatePasswordForm from '@/app/ui/update-password/update-password-form';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Actualizar contraseña',
};

export default async function Page() {
  const basePath: string = '/welcome/update-password';
  const breadcrumbConfig: Breadcrumb[] = [
    { label: 'Actalizar contraseña', href: basePath, active: true },
  ];

  return (
    <main>
      <Breadcrumbs breadcrumbs={breadcrumbConfig} />
      <UpdatePasswordForm />
    </main>
  );
}
