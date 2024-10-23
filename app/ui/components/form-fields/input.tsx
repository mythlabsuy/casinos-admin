import DynamicHeroIcon from '../../dynamic-hero-icon';
import clsx from 'clsx';

interface BaseInputProps {
  id: string;
  name?: string;
  placeholder?: string;
  className?: string;
  label?: string;
  icon?: string;
  errors?: string[];
  disabled?: boolean;
}

interface InputProps extends BaseInputProps {
  defaultValue?: string | number;
  type: string;
  step?: number;
  min?: number;
  max?: number;
}

interface TextInputProps extends BaseInputProps {
  defaultValue?: string;
}

interface NumberInputProps extends BaseInputProps {
  defaultValue?: number;
  step?: number;
  min?: number;
  max?: number;
}

export function TextInput({ id, name, placeholder, className, defaultValue = '', label = '', icon, errors, disabled = false }: TextInputProps ) {
  return (
    <Input id={id} 
    name={name} 
    placeholder={placeholder} 
    className={className} 
    defaultValue={defaultValue} 
    label={label} 
    icon= {icon} 
    errors={errors} 
    type='text' 
    disabled = {disabled}
    />
  );
}

export function NumberInput({ id, name, placeholder, className, defaultValue = 0, label = '', icon, errors, step = 1, min, max, disabled = false }: NumberInputProps ) {
  return (
    <Input id={id} 
    name={name} 
    placeholder={placeholder} 
    className={className} 
    defaultValue={defaultValue} 
    label={label}
    icon= {icon}
    errors={errors}
    step={step}
    type="number"
    min={min}
    max={max} 
    disabled = {disabled}
    />
  );
}

export default function Input({ id, name, placeholder, className, defaultValue, label = '', icon, errors, type, step, min, max, disabled = false }: InputProps ) {
  return (
    <>
      <label htmlFor={id} className="mb-2 ml-1 block text-sm font-medium text-gray-700">
        {label}
      </label>
      <div className="relative mt-2 rounded-md">
        <div className="relative">
          <input
            id={id}
            name={ name ? name : id }
            type={type}
            step={step}
            min={min}
            max={max}
            placeholder={ placeholder ? placeholder : '' }
            className={ clsx(
              className ? className : null,
              "peer block w-full rounded-md border border-gray-200 py-2 pl-10 text-sm outline-2 placeholder:text-gray-700 text-gray-700"
            )}
            aria-describedby={`${id}-error`}
            defaultValue={ defaultValue }
            disabled = {disabled}
          />
          { icon ? 
          <DynamicHeroIcon className='pointer-events-none absolute left-3 top-1/2 h-[18px] w-[18px] -translate-y-1/2 text-gray-500' icon={icon} solid={false}/> 
          : null}
        </div>
        <div id={`${id}-error`} aria-live="polite" aria-atomic="true">
          {errors ?
          <FormFieldsErrors errors={errors}/> : null}
        </div>
      </div>
    </>
  );
}

export function FormFieldsErrors({ errors } : {errors: string[]}) {
  return (
    <div className="rounded-md bg-red-50 pr-4 py-1">
      <div className="flex">
        <div className="ml-0">
          <div className="mt-0 text-sm text-red-700">
            <ul role="list" className="list-none space-y-1 pl-5">
            { errors.map((error: string) => (
                <li key={error}>
                  {error}
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </div>
  )
}