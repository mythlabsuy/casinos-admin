import TopNavLink from '../top-nav-link'
import BottomNavLink from '../bottom-nav-link';

interface props {
  topNavigation: any[],
  bottomNavigation: any[],
  topNavTitle?: string,
  bottomNavTitle?: string
}

export default function MobileNavLinks({ topNavigation, bottomNavigation }: props) {
  return (
    <>
      <li>
        <ul role="list" className="-mx-2 space-y-1">
          {topNavigation.map((item) => (
            <li key={item.name}>
              <TopNavLink item={item}/>
            </li>
          ))}
        </ul>
      </li>
      {bottomNavigation.length > 0 ? <div className="border-b border-gray-200 pb-4"></div> : <></>}
      <li>
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
