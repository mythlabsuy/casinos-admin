import NavLinks from './nav-links'
import MobileSideNav from './mobile/mobile-nav'
import Link from 'next/link';
import { signOut } from '@/auth';
import PremiseSelect from './premise-select';
import { fetchActivePremises } from '@/app/lib/data/premises';

interface props {
  topNavigation: any[],
  //bottomNavigation: any[],
  topNavTitle?: string,
  bottomNavTitle?: string,
  userName?: string
}

export default async function SideNav({ topNavigation, topNavTitle, bottomNavTitle, userName }: props) {
  const premiseList = await fetchActivePremises();
  
  return (
    <>
      <div>
        {/* Static sidebar for desktop */}
        <div className="hidden lg:fixed lg:inset-y-0 lg:z-50 lg:flex lg:w-64 lg:flex-col">
          <div className="flex grow flex-col gap-y-5 overflow-y-auto bg-gray-900 px-6">
            <div className="flex h-16 shrink-0 items-center">
              <img
                alt="Your Company"
                src="https://tailwindui.com/img/logos/mark.svg?color=indigo&shade=500"
                className="h-8 w-auto"
              />
            </div>
            <nav className="flex flex-1 flex-col">
              <ul role="list" className="flex flex-1 flex-col gap-y-7">
                <NavLinks 
                topNavigation={topNavigation} 
               // bottomNavigation={bottomNavigation} 
                topNavTitle={topNavTitle} 
                bottomNavTitle={bottomNavTitle}/>
                
                {/* User Profile */}
                <li className="-mx-6 mt-auto">
                  <PremiseSelect premises={premiseList}/>
                </li>
                <li className="-mx-6">
                  <Link
                    href="#"
                    className="flex items-center gap-x-4 px-6 py-3 text-sm font-semibold leading-6 text-white hover:bg-gray-800"
                  >
                    <span aria-hidden="true">{userName}</span>
                  </Link>
                </li>
              </ul>
            </nav>
          </div>
        </div>
        
        <MobileSideNav 
          topNavigation={topNavigation} 
         // bottomNavigation={bottomNavigation} 
          topNavTitle={topNavTitle} 
          bottomNavTitle={bottomNavTitle} 
          userName={userName}/>
      </div>
    </>
  )
}
