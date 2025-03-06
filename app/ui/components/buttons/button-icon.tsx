import DynamicHeroIcon from "../../dynamic-hero-icon";

interface Props {
  onClick: Function,
  icon: string,
  className?: string
  iconClassName?: string
  srText: string
}

/**
 * Simple Icon button with onClick action. No base colors and no hover effects, must be added using className param.
 * 
 * @param onClick Action that the button must execute on click.
 * @param icon Icon to show in the button. From HeroIcons. Ex: XMarkIcon.
 * @param className Optional CSS classes to apply to the button.
 * @param srText Text to be used by screen readers.
 * @param iconClassName Optional CSS classes to apply to the icon itself.
 */
export function ButtonIcon({onClick, icon, srText, className, iconClassName}: Props) {
  return (
    <button type='button' onClick={() => {onClick()}} 
      className={`${className} inline-flex rounded-md p-1.5 focus:outline-none focus:ring-2 focus:ring-offset-2`}>
      <span className="sr-only">{ srText }</span>
      <DynamicHeroIcon icon={icon} className={`w-5 h-5 ${iconClassName}`}/>
    </button>
  );
}