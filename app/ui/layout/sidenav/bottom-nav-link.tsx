'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation';
import clsx from 'clsx';
import DynamicHeroIcon from '../../dynamic-hero-icon';

interface props {
  item: any
}

export default function TopNavLink({ item }: props) {
  const pathname = usePathname();

  return (
    <>
      <Link
        href={item.href}
        className={clsx(
          pathname === item.href
            ? 'bg-gray-800 text-white'
            : 'text-gray-400 hover:bg-gray-800 hover:text-white',
          'group flex gap-x-3 rounded-md p-2 text-sm font-semibold leading-6',
        )}
      >
        <DynamicHeroIcon icon={item.iconName} aria-hidden="true" className="h-6 w-6 shrink-0"/>
        {item.name}
      </Link>
    
    </>
  )
}
