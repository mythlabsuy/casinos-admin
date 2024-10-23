import NavLinks from './nav-links'
import MobileSideNav from './mobile/mobile-nav'
import StoreSelect from './store-select'
import Link from 'next/link';
import { fetchActivePremises } from '@/app/lib/data/articles';

interface props {
  topNavigation: any[],
  bottomNavigation: any[],
  topNavTitle?: string,
  bottomNavTitle?: string,
  userName?: string
}

export default async function SideNav({ topNavigation, bottomNavigation, topNavTitle, bottomNavTitle, userName }: props) {
  const stores = await fetchActivePremises();
  
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
                bottomNavigation={bottomNavigation} 
                topNavTitle={topNavTitle} 
                bottomNavTitle={bottomNavTitle}/>
                
                {/* User Profile */}
                <li className="-mx-6 mt-auto">
                  <StoreSelect stores={stores}/>
                </li>
                <li className="-mx-6">
                  <Link
                    href="#"
                    className="flex items-center gap-x-4 px-6 py-3 text-sm font-semibold leading-6 text-white hover:bg-gray-800"
                  >
                    <img
                      alt=""
                      src="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80"
                      className="h-8 w-8 rounded-full bg-gray-800"
                    />
                    <span className="sr-only">Your profile</span>
                    <span aria-hidden="true">{userName}</span>
                  </Link>
                </li>
              </ul>
            </nav>
          </div>
        </div>
        
        <MobileSideNav 
          topNavigation={topNavigation} 
          bottomNavigation={bottomNavigation} 
          topNavTitle={topNavTitle} 
          bottomNavTitle={bottomNavTitle} 
          userName={userName}/>
      </div>
    </>
  )
}
