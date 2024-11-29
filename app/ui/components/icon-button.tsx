'use client';
import { useState } from 'react';
import FullScreenLoading from './fullScreenLoading';

interface Props {
  id: string;
  text?: string;
  tooltip?: string;
  deleteAction: any;
  children: React.ReactNode;
}

export function DeleteIconButton({
  id,
  text,
  tooltip,
  deleteAction,
  children,
}: Props) {
  const [isLoading, setIsLoading] = useState(false);

  const handleClick = async (event: React.MouseEvent<HTMLButtonElement>) => {
    event.preventDefault();
    setIsLoading(true);
    try {
      await deleteAction();
    } catch (error) {
      console.error('Error during delete action:', error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <form className="inline-block">
      <FullScreenLoading isLoading={isLoading} />
      <button
        className="group relative rounded-md border p-2 hover:bg-gray-100"
        name={`iconbtn_${id}`}
        id={`iconbtn_${id}`}
        onClick={handleClick}
      >
        <span className="sr-only">{text}</span>
        {children}
        {tooltip && (
          <div className="pointer-events-none absolute bottom-full left-1/2 mb-2 -translate-x-1/2 transform rounded-md bg-gray-700 px-2 py-1 text-sm text-white opacity-0 transition-opacity duration-300 group-hover:opacity-100">
            {tooltip}
          </div>
        )}
      </button>
    </form>
  );
}
