import React from 'react';
import clsx from 'clsx';
import { CustomButton } from '../customButton';

interface FormSubmitButtonWithLoadingProps {
  isPending: boolean;
  children: React.ReactNode;
  onClick?: React.MouseEventHandler<HTMLButtonElement>;
  form?: string;
}

const FormSubmitButtonWithLoading: React.FC<
  FormSubmitButtonWithLoadingProps
> = ({ isPending, children, onClick, form}) => {
  return (
    <CustomButton
      form={form}
      type="submit"
      onClick={onClick}
      className={clsx(
        isPending
          ? 'bg-gray-400 hover:bg-gray-400'
          : 'bg-blue-500 hover:bg-blue-600',
        'rounded p-2 text-white', 
      )}
      disabled={isPending}
    >
      {children}
    </CustomButton>
  );
};

export default FormSubmitButtonWithLoading;
