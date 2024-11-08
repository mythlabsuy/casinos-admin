import NavLinks from './nav-links'
import MobileSideNav from './mobile/mobile-nav'
import PremiseSelect from './premise-select';
import { fetchActivePremises } from '@/app/lib/data/premises';
import LogoutBtn from './logout-btn';

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
            <div className="flex h-16 shrink-0 items-center gap-x-4 px-6 py-3 text-sm 
              font-semibold leading-6 text-white border-b border-dotted">
              <span aria-hidden="true">Bienvenido {userName}</span>
            </div>
            <nav className="flex flex-1 flex-col">
              <ul role="list" className="flex flex-1 flex-col gap-y-7">
                <NavLinks 
                topNavigation={topNavigation} 
               // bottomNavigation={bottomNavigation} 
                topNavTitle={topNavTitle} 
                bottomNavTitle={bottomNavTitle}/>

                <li className="-mx-6 mt-auto">
                  <PremiseSelect premises={premiseList}/>
                </li>
                <div className="flex grow flex-row justify-between space-x-2 md:flex-col md:space-x-0 md:space-y-2 mb-4">
                  <LogoutBtn/>
                </div>
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
