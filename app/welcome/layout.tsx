import SideNav from '@/app/ui/layout/sidenav/sidenav';
import { auth } from '@/auth';
 
export default async function Layout({ children }: { children: React.ReactNode }) {
  const topNav = [
    { name: 'Locales', href: '/welcome/premises', iconName: 'ArchiveBoxIcon' },
  ]

  const session = await auth();
  let userName: string = '';
  
  if(session && session.user_data){
    //TODO we were using full name here, I dont have that anymore
    userName = session.user_data.username;
  }

  return (
    <div className="flex h-screen flex-col md:flex-row md:overflow-hidden">
      <div className="w-full flex-none md:w-64">
        <SideNav topNavigation={topNav} bottomNavTitle='Your Team' userName={userName}/>
      </div>
      <div className="flex-grow p-6 md:overflow-y-auto xs:p-12">{children}</div>
    </div>
  );
}