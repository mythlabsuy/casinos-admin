import TopNavLink from './top-nav-link';
import BottomNavLink from './bottom-nav-link';
import { signOut } from '@/auth';

interface Props {
  topNavigation: any[],
//  bottomNavigation: any[],
  topNavTitle?: string,
  bottomNavTitle?: string,
}

export default function NavLinks({ topNavigation, topNavTitle, bottomNavTitle }: Props) {
  return (
    <div className="flex h-full flex-col px-3 py-4 md:px-2">
      <div className="flex-1 space-y-6">
      <li>
        <div className="text-xs font-semibold leading-6 text-gray-400">{topNavTitle}</div>
        <ul role="list" className="-mx-2 space-y-1">
          {topNavigation.map((item) => (
            <li key={item.name}>
              <TopNavLink item={item}/>
            </li>
          ))}
        </ul>
      </li> 
      </div>    
      <div className="flex grow flex-row justify-between space-x-2 md:flex-col md:space-x-0 md:space-y-2">
        <div className="hidden h-auto w-full grow rounded-md md:block"></div>
        <form  action={async () => {
            'use server';
            await signOut();
          }}>
          <button className="flex h-[48px] w-full grow items-center justify-center gap-2 rounded-md  p-3 text-sm font-medium text-gray-400 hover:bg-gray-800 hover:text-white md:flex-none md:justify-start md:p-2 md:px-3">
            <div className="hidden md:block">Cerrar sesión</div>
          </button>
        </form>
      </div>
    </div>
  )
}
