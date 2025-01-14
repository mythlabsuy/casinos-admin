'use client';

import { useState } from 'react';
import { Switch } from '@headlessui/react';
import DynamicHeroIcon from '../../dynamic-hero-icon';

interface Props {
  id: string;
  label?: string;
  iconEnabled?: string;
  iconDisabled?: string;
  value: boolean; // New prop to control checked state
  onChange: (enabled: boolean) => void;
  errors?: string[];
}

export default function SwitchWithIcon({
  id,
  label,
  iconEnabled = 'CheckIcon',
  iconDisabled = 'XMarkIcon',
  value = false,
  onChange,
  errors,
}: Props) {
  // const [enabled, setEnabled] = useState(defaultEnabled);

  const handleToggle = () => {
    onChange(!value); // Pass the toggled value to parent
  };

  return (
    <>
      <label
        htmlFor={`${id}_switch`}
        className="mb-2 ml-1 block text-sm font-medium text-gray-700"
      >
        {label}
      </label>
      <input id={id} name={id} type="hidden" value={String(value)} />
      <Switch
        id={`${id}_switch`}
        name={`${id}_switch`}
        checked={value}
        onChange={handleToggle}
        className="group relative inline-flex h-8 w-14 flex-shrink-0 cursor-pointer rounded-full border-2 border-transparent bg-gray-200 transition-colors duration-200 ease-in-out focus:outline-none focus:ring-2 focus:ring-indigo-600 focus:ring-offset-2 data-[checked]:bg-indigo-600"
      >
        <span className="sr-only">Use setting</span>
        <span className="pointer-events-none relative inline-block h-7 w-7 transform rounded-full bg-white shadow ring-0 transition duration-200 ease-in-out group-data-[checked]:translate-x-6">
          <span
            aria-hidden="true"
            className="absolute inset-0 flex h-full w-full items-center justify-center transition-opacity duration-200 ease-in group-data-[checked]:opacity-0 group-data-[checked]:duration-100 group-data-[checked]:ease-out"
          >
            <DynamicHeroIcon
              icon={iconDisabled}
              className={'h-5 w-5 text-gray-400'}
            />
          </span>
          <span
            aria-hidden="true"
            className="absolute inset-0 flex h-full w-full items-center justify-center opacity-0 transition-opacity duration-100 ease-out group-data-[checked]:opacity-100 group-data-[checked]:duration-200 group-data-[checked]:ease-in"
          >
            <DynamicHeroIcon
              icon={iconEnabled}
              className={'h-5 w-5 text-indigo-600'}
            />
          </span>
        </span>
      </Switch>
      <div id={`${id}-error`} aria-live="polite" aria-atomic="true">
        {errors &&
          errors.map((error: string) => (
            <p className="mt-2 text-sm text-red-500" key={error}>
              {error}
            </p>
          ))}
      </div>
    </>
  );
}
