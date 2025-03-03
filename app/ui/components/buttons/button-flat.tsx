import DynamicHeroIcon from "../../dynamic-hero-icon";


interface Props {
  text?: string,
  onClick: Function,
  icon?: string,
  className?: string
  iconClassName?: string
}

export function ButtonFlat({ text, onClick, icon, className, iconClassName}: Props) {
  return (
    <button type='button' onClick={() => {onClick()}} 
      className={`${className} border rounded-md ml-2 px-2 py-1.5 text-sm font-medium focus:outline-none focus:ring-2 focus:ring-offset-2`}>
      { text ? <span>{text}</span> : null }
      { icon ? <DynamicHeroIcon icon={icon} className={`w-5 h-5 ${iconClassName}`}/> : null }
    </button>
  );
}