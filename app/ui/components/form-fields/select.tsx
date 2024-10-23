import DynamicHeroIcon from '../../dynamic-hero-icon';
import clsx from 'clsx';

interface Props {
  id: string;
  name?: string;
  placeholder?: string;
  className?: string;
  label?: string;
  icon?: string;
  errors?: string[];
  defaultValue?: string | number;
  value?: string | number;
  values: Map<string, string>;
  onChange?: (value: string | number) => void;
}

/**
 * Generic select component that can be used server side or client side
 * @param param0 Use defaultValue is there is no state handling or value if there is a state handling. Do not use both.
 * @returns 
 */
export default function Select({ id, name,label, className, icon, errors, defaultValue, value, placeholder, values, onChange }: Props ) {
  console.log(`SELECT DEFAULT VALUE (${id})`, defaultValue)

  return (
    <>
      <label htmlFor={id} className="mb-2 ml-1 block text-sm font-medium text-gray-700">
        {label}
      </label>
      <div className="relative">
        <select
          id={id}
          name={ name ? name : id }
          className={ clsx(
            className ? className : null,
            "peer block w-full cursor-pointer rounded-md border border-gray-200 py-2 pl-10 text-sm outline-2 placeholder:text-gray-700 text-gray-700"
          )}
          {...(value && { value })}
          {...(defaultValue && { defaultValue })}
          aria-describedby={`${id}-error`}
          onChange={(e) => onChange && onChange(e.target.value)}
        >
          {/* Add placeholder item if placeholder is not null or empty */}
          { placeholder ? <option value="" disabled> {placeholder} </option> : null }
          { Array.from(values.entries()).map(([key, value]) => (
            <option key={key} value={value}>
              {key}
            </option>
          ))}
        </select>
        { icon ? 
          <DynamicHeroIcon className='pointer-events-none absolute left-3 top-1/2 h-[18px] w-[18px] -translate-y-1/2 text-gray-500' icon={icon} solid={false}/> 
          : null }
      </div>
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
