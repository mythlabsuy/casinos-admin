import React from 'react';
import clsx from 'clsx';
import { CustomButton } from '../customButton';

interface FormSubmitButtonWithLoadingProps {
  isPending: boolean;
  children: React.ReactNode;
  onClick?: React.MouseEventHandler<HTMLButtonElement>;
}

const FormSubmitButtonWithLoading: React.FC<FormSubmitButtonWithLoadingProps> = ({ isPending, children, onClick }) => {
  return (
    <CustomButton
      type="submit"
      onClick={onClick}
      className={clsx(
        isPending ? 'bg-gray-400 hover:bg-gray-400' : 'bg-blue-500 hover:bg-blue-600',
        'text-white p-2 rounded' // Common classes
      )}
      disabled={isPending}
    >
      {children}
    </CustomButton>
  );
};

export default FormSubmitButtonWithLoading;
