import React from 'react';
import { FiAlertCircle } from 'react-icons/fi';

const ErrorMessage = ({ message = 'An error occurred. Please try again later.', className = '' }) => {
  return (
    <div className={`w-1/2 mx-auto my-32 flex items-center justify-center h-32 bg-slate-300 px-4 py-3 rounded-lg drop-shadow-lg ${className}`} role="alert">
      <FiAlertCircle className="w-10 h-10 mr-2 font-bold" />
      <p className='font-bold'>{message}</p>
    </div>
  );
};

export default ErrorMessage;
