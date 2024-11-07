import TopNavLink from '../top-nav-link'
import BottomNavLink from '../bottom-nav-link';

interface props {
  topNavigation: any[],
 // bottomNavigation: any[],
  topNavTitle?: string,
  bottomNavTitle?: string
}

export default function MobileNavLinks({ topNavigation, }: props) {
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
      <li>
        {/* <div className="text-xs font-semibold leading-6 text-gray-400">Your teams</div> */}
        <ul role="list" className="-mx-2 mt-2 space-y-1">
          {/* {bottomNavigation.map((item) => (
            <li key={item.name}>
              <BottomNavLink item={item}/>
            </li>
          ))} */}
        </ul>
      </li>
    </>
  )
}
