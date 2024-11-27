import React from 'react';

interface FullScreenLoadingProps {
  isLoading: boolean;
}

const FullScreenLoading: React.FC<FullScreenLoadingProps> = ({ isLoading }) => {
  if (!isLoading) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
      <div className="h-16 w-16 animate-spin rounded-full border-t-4 border-solid border-blue-500"></div>
    </div>
  );
};

export default FullScreenLoading;
