import Link from 'next/link';
import DynamicHeroIcon from '../dynamic-hero-icon';
import clsx from 'clsx';

interface Props {
  breadcrumbs: Breadcrumb[];
  homeUrl?: string;
}

export interface Breadcrumb {
  label: string;
  href: string;
  active?: boolean;
}

export default function Breadcrumbs({ breadcrumbs, homeUrl = '/' }: Props) {
  return (
    <nav aria-label="Breadcrumb" className='flex flex-row mb-4'>
      <Link href={homeUrl} className='flex items-center'>
        <DynamicHeroIcon className='h-5' icon='HomeIcon' solid={true}/>
      </Link>
      {breadcrumbs.map((breadcrumb) => (
        <div key={breadcrumb.label} className='flex flex-row items-center' aria-current={breadcrumb.active}>
          <DynamicHeroIcon className='h-6 mx-3' icon='ChevronRightIcon' solid={false}/>
          <Link href={breadcrumb.href}>
            <h2 className={clsx(breadcrumb.active ? 'underline' : 'text-gray-200', "text-md font-bold tracking-tight")}>{breadcrumb.label}</h2>
          </Link>
        </div>
      ))}
    </nav>
  );
}
