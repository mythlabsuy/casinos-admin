import TopNavLink from './top-nav-link';
import { signOut } from '@/auth';
import { ArrowRightStartOnRectangleIcon } from '@heroicons/react/24/outline';
import BottomNavLink from './bottom-nav-link';

interface Props {
  topNavigation: any[];
  bottomNavigation: any[];
  topNavTitle?: string;
  bottomNavTitle?: string;
}

export default function NavLinks({
  topNavigation,
  topNavTitle,
  bottomNavTitle,
  bottomNavigation,
}: Props) {
  return (
    <div className="flex h-full flex-col px-3 py-4 md:px-2">
      <div className="flex-1 space-y-6">
        <li>
          <div className="text-xs font-semibold leading-6 text-gray-400">
            {topNavTitle}
          </div>
          <ul role="list" className="-mx-2 space-y-1">
            {topNavigation.map((item) => (
              <li key={item.name}>
                <TopNavLink item={item} />
              </li>
            ))}
          </ul>
        </li>
        {bottomNavigation.length > 0 ? <div className="border-b border-gray-200 pb-4"></div> : <></>}
        <li>
          <div className="text-xs font-semibold leading-6 text-gray-400">
            {bottomNavTitle}
          </div>
          <ul role="list" className="-mx-2 mt-2 space-y-1">
            {bottomNavigation.map((item) => (
              <li key={item.name}>
                <BottomNavLink item={item} />
              </li>
            ))}
          </ul>
        </li>
      </div>
    </div>
  );
}
