import TopNavLink from './top-nav-link';
import { signOut } from '@/auth';
import { ArrowRightStartOnRectangleIcon } from '@heroicons/react/24/outline';

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
      {/* <div className="flex grow flex-row justify-between space-x-2 md:flex-col md:space-x-0 md:space-y-2">
        <div className="hidden h-auto w-full grow rounded-md md:block"></div>
        <form  action={async () => {
            'use server';
            await signOut({ redirectTo: "/login" });
          }}>
            <ul role="list" className="-mx-2 space-y-1">
              <button className="w-full text-gray-400 hover:bg-gray-800 hover:text-white group flex gap-x-3 rounded-md p-2 text-sm font-semibold leading-6">
                  <ArrowRightStartOnRectangleIcon className="h-6 w-6 shrink-0"/>
                  Cerrar sesión
              </button>
            </ul>
        </form>
      </div> */}
    </div>
  )
}
