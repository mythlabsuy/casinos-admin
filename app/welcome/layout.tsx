import SideNav from '@/app/ui/layout/sidenav/sidenav';
import { auth } from '@/auth';
import { SessionProvider } from 'next-auth/react';
import { getTopNav } from '../lib/utils/navigation/getTopNav';
 
export default async function Layout({ children }: { children: React.ReactNode }) {
  const topNav =  await getTopNav();

  const bottomNav = [
    { name: 'Cambiar contraseña', href: '/welcome/update-password', iconName: 'KeyIcon', },
  ]

  const session = await auth();
  let userName: string = '';
  
  if(session && session.user_data){
    userName = session.user_data.username;
  }

  return (
    <div className="flex h-screen flex-col lg:flex-row md:overflow-hidden">
      <SessionProvider>
        <div className="w-full flex-none lg:w-64">
          <SideNav bottomNavigation={bottomNav} topNavigation={topNav} userName={userName}/>
        </div>
        <div className="flex-grow p-6 md:overflow-y-auto xs:p-12">{children}</div>
      </SessionProvider>
    </div>
  );
}