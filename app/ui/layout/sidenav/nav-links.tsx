import TopNavLink from './top-nav-link';
import BottomNavLink from './bottom-nav-link';

interface Props {
  topNavigation: any[],
  bottomNavigation: any[],
  topNavTitle?: string,
  bottomNavTitle?: string,
}

export default function NavLinks({ topNavigation, bottomNavigation, topNavTitle, bottomNavTitle }: Props) {
  return (
    <>
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
      <li>
        <div className="text-xs font-semibold leading-6 text-gray-400">{bottomNavTitle}</div>
        <ul role="list" className="-mx-2 mt-2 space-y-1">
          {bottomNavigation.map((item) => (
            <li key={item.name}>
              <BottomNavLink item={item}/>
            </li>
          ))}
        </ul>
      </li>      
    </>
  )
}
