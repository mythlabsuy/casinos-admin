import SideNav from '@/app/ui/layout/sidenav/sidenav';
import { auth } from '@/auth';
 
export default async function Layout({ children }: { children: React.ReactNode }) {
  const topNav = [
    { name: 'Dashboard', href: '/welcome', iconName: 'HomeIcon' },
    { name: 'Artículos', href: '/welcome/articles', iconName: 'ArchiveBoxIcon' },
    { name: 'Categorías', href: '/welcome/categories', iconName: 'TagIcon' },
    { name: 'Órdenes', href: '/welcome/orders', iconName: 'InboxStackIcon' },
  ]
  const bottomNav = [
    { id: 1, name: 'Heroicons', href: '#', initial: 'H' },
    { id: 2, name: 'Tailwind Labs', href: '#', initial: 'T' },
    { id: 3, name: 'Workcation', href: '#', initial: 'W' },
  ]

  const session = await auth();
  let userName: string = '';
  
  if(session && session.user_data){
    userName = session.user_data.full_name ? session.user_data.full_name : session.user_data.username;
  }

  return (
    <div className="flex h-screen flex-col md:flex-row md:overflow-hidden">
      <div className="w-full flex-none md:w-64">
        <SideNav topNavigation={topNav} bottomNavigation={bottomNav} bottomNavTitle='Your Team' userName={userName}/>
      </div>
      <div className="flex-grow p-6 md:overflow-y-auto xs:p-12">{children}</div>
    </div>
  );
}