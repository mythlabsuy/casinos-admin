import Link from 'next/link';
import DynamicHeroIcon from '../dynamic-hero-icon';

interface Props {
  text?: string,
  href: string,
  icon?: string,
  className?: string
}

export function ButtonLink({text, href, icon='PlusIcon', className}: Props) {
  return (
    <Link
      href={href}
      className={ !className ? `flex h-10 items-center justify-items-center rounded-lg bg-primary-600 px-4 text-sm font-medium text-white 
      transition-colors hover:bg-primary-500 focus-visible:outline focus-visible:outline-2 
      focus-visible:outline-offset-2 focus-visible:outline-primary-600` : className}
    >
      {text ? <span className="hidden md:block mr-2">{text}</span> : null}
      <DynamicHeroIcon icon={icon} className="h-5"/>
    </Link>
  );
}