'use client';

import { useState } from 'react'; // Import useState
import { ButtonFlat } from './buttons/button-flat';
import { ButtonIcon } from './buttons/button-icon';
import DynamicHeroIcon from '../dynamic-hero-icon';

const alertStyles = {
  Error: {
    mainColor: 'bg-red-50',
    textColor: 'text-red-800',
    hoverColor: 'hover:bg-red-100',
    borderColor: 'border-red-400',
    focusColor: 'focus:ring-red-600',
    focusOffsetColor: 'focus:ring-offset-red-50',
    icon: 'XCircleIcon',
  },
  Warning: {
    mainColor: 'bg-yellow-50',
    textColor: 'text-yellow-800',
    hoverColor: 'hover:bg-yellow-100',
    borderColor: 'border-yellow-400',
    focusColor: 'focus:ring-yellow-600',
    focusOffsetColor: 'focus:ring-offset-yellow-50',
    icon: 'ExclamationTriangleIcon',
  },
  Success: {
    mainColor: 'bg-green-50',
    textColor: 'text-green-800',
    hoverColor: 'hover:bg-green-100',
    borderColor: 'border-green-400',
    focusColor: 'focus:ring-green-600',
    focusOffsetColor: 'focus:ring-offset-green-50',
    icon: 'CheckCircleIcon',
  },
  Info: {
    mainColor: 'bg-blue-50',
    textColor: 'text-blue-800',
    hoverColor: 'hover:bg-blue-100',
    borderColor: 'border-blue-400',
    focusColor: 'focus:ring-blue-600',
    focusOffsetColor: 'focus:ring-offset-blue-50',
    icon: 'InformationCircleIcon',
  },
};

interface Props {
  title?: string,
  text?: string,
  showIcon?: boolean,
  dismissable?: boolean,
  alertType: keyof typeof alertStyles;
  actionText?: string,
  actionCallback?: Function,
}

/**
 * Simple alert to show inline information to the user. WARNING: If action button is configured, then the parent page requires 'use client'
 * 
 * @param alertType Enum value that changes the colors of the alert and the icon. (Error, Warning, Success, Info)
 * @param actionText The text of the action button inside the alert. If this is not undefined, then the button is activated.
 * @param actionCallback The action for the button to perform. WARNING: This requires that the parent has 'use client'.
 * @param dismissable Enables the user to dismiss the alert.
 */
export default function Alert({ alertType, title, text, actionText, actionCallback, showIcon=true, dismissable = true}: Props) {
  const [isVisible, setIsVisible] = useState(true);
  
  const { mainColor, textColor, hoverColor, borderColor, focusColor, focusOffsetColor, icon } =
  alertStyles[alertType] || alertStyles.Info;
  
  const handleDismiss = () => {
    setIsVisible(false);
  };  

  return (
    isVisible && (
      <div className={`border-l-4 ${borderColor} rounded-md ${mainColor} p-4`}>
        <div className="flex">
          { showIcon ?
            <div className="shrink-0">
              <DynamicHeroIcon className={`size-5 ${textColor}`} icon={icon}/>
            </div> : null }
          <div className="ml-3">
            <p className={`text-sm font-bold ${textColor}`}>{title}</p>
            <div className={`mt-2 text-sm ${textColor}`}>
              <p>{text}</p>
            </div>
            <div className="mt-4">
              <div className="-mx-2 -my-1.5 flex">

                { actionText ? 
                <ButtonFlat text={actionText} 
                className={`${borderColor} ${mainColor} ${textColor} ${hoverColor} ${focusColor} ${focusOffsetColor}`} 
                onClick={ () => actionCallback }/> : null }
                
              </div>
            </div>
          </div>
          
          { dismissable ? 
            <div className="ml-auto pl-3">
              <div className="-mx-1.5 -my-1.5">
                <ButtonIcon onClick={handleDismiss} icon={'XMarkIcon'} srText={'Cerrar'} 
                  className={`${mainColor} ${textColor} ${hoverColor} ${focusColor} ${focusOffsetColor}`}/>
              </div>
            </div> : null }
        </div>
      </div>
    )
  )
}
