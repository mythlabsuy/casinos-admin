import { FC } from 'react'
import * as HIcons from '@heroicons/react/24/outline'
import * as HIconsSolid from '@heroicons/react/20/solid'

interface Props{
  icon: string;
  solid?: boolean;
  className: string;
}

const DynamicHeroIcon: FC<{icon: string, className: string, solid?: boolean}> = ({ icon, className, solid = false }: Props) => {
  const {...icons} = solid ? HIconsSolid : HIcons
  // @ts-ignore
  const TheIcon: JSX.Element = icons[icon]

  return (
    <>
      {/* @ts-ignore */}
      <TheIcon className={className} aria-hidden="true" />
    </>
  )
}

export default DynamicHeroIcon