import NavLinks from './nav-links';
import MobileSideNav from './mobile/mobile-nav';
import PremiseSelect from './premise-select';
import { fetchActivePremises } from '@/app/lib/data/premises';
import LogoutBtn from './logout-btn';
import { Premise } from '@/app/lib/definitions';

interface props {
  topNavigation: any[];
  bottomNavigation: any[],
  topNavTitle?: string;
  bottomNavTitle?: string;
  userName?: string;
}

export default async function SideNav({
  topNavigation,
  topNavTitle,
  bottomNavTitle,
  userName,
  bottomNavigation,
}: props) {
  let hasError: boolean = false;
  let premises: Premise[] = [];

  try {
    const response = await fetchActivePremises();
    premises = response;
  } catch (error) {
    hasError = true;
  }

  return (
    <>
      <div>
        {/* Static sidebar for desktop */}
        <div className="hidden lg:fixed lg:inset-y-0 lg:z-50 lg:flex lg:w-64 lg:flex-col">
          <div className="flex grow flex-col gap-y-5 overflow-y-auto bg-gray-900 px-6">
            <div className="flex h-16 shrink-0 items-center gap-x-4 border-b px-6 py-3 text-sm font-semibold leading-6 text-white">
              <span aria-hidden="true">Bienvenido {userName}</span>
            </div>
            <nav className="flex flex-1 flex-col">
              <ul role="list" className="flex flex-1 flex-col gap-y-7">
                <NavLinks
                  topNavigation={topNavigation}
                  bottomNavigation={bottomNavigation}
                  topNavTitle={topNavTitle}
                  bottomNavTitle={bottomNavTitle}
                />

                <li className="-mx-6 mt-auto">
                  <PremiseSelect premises={premises} />
                </li>
                <div className="mb-4 flex grow flex-row justify-between space-x-2 md:flex-col md:space-x-0 md:space-y-2">
                  <LogoutBtn />
                </div>
              </ul>
            </nav>
          </div>
        </div>

        <MobileSideNav
          topNavigation={topNavigation}
          bottomNavigation={bottomNavigation}
          topNavTitle={topNavTitle}
          bottomNavTitle={bottomNavTitle}
          userName={userName}
        />
      </div>
    </>
  );
}
