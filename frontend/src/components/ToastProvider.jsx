import React from 'react';
import { Toaster, toast } from 'react-hot-toast';
import { FaCheckCircle, FaExclamationTriangle, FaInfoCircle, FaTimes, FaHeart } from 'react-icons/fa';

const CustomToast = ({ t, type, title, message, icon }) => (
  <div
    className={`${
      t.visible ? 'animate-enter' : 'animate-leave'
    } max-w-md w-full bg-white shadow-lg rounded-xl pointer-events-auto flex ring-1 ring-black ring-opacity-5 overflow-hidden`}
  >
    <div className="flex-1 w-0 p-4">
      <div className="flex items-start">
        <div className="flex-shrink-0">
          {icon || (
            <div className={`w-6 h-6 rounded-full flex items-center justify-center ${
              type === 'success' ? 'bg-green-100' :
              type === 'error' ? 'bg-red-100' :
              type === 'warning' ? 'bg-yellow-100' :
              'bg-blue-100'
            }`}>
              {type === 'success' && <FaCheckCircle className="w-4 h-4 text-green-600" />}
              {type === 'error' && <FaTimes className="w-4 h-4 text-red-600" />}
              {type === 'warning' && <FaExclamationTriangle className="w-4 h-4 text-yellow-600" />}
              {type === 'info' && <FaInfoCircle className="w-4 h-4 text-blue-600" />}
            </div>
          )}
        </div>
        <div className="ml-3 flex-1">
          {title && (
            <p className="text-sm font-medium text-gray-900">
              {title}
            </p>
          )}
          <p className={`${title ? 'mt-1' : ''} text-sm text-gray-500`}>
            {message}
          </p>
        </div>
      </div>
    </div>
    <div className="flex border-l border-gray-200">
      <button
        onClick={() => toast.dismiss(t.id)}
        className="w-full border border-transparent rounded-none rounded-r-xl p-4 flex items-center justify-center text-sm font-medium text-gray-600 hover:text-gray-500 focus:outline-none focus:ring-2 focus:ring-pink-500"
      >
        <FaTimes className="w-4 h-4" />
      </button>
    </div>
  </div>
);

// Custom toast functions
export const showToast = {
  success: (message, options = {}) => {
    toast.custom((t) => (
      <CustomToast 
        t={t} 
        type="success" 
        message={message} 
        {...options}
      />
    ), {
      duration: 4000,
      ...options
    });
  },
  
  error: (message, options = {}) => {
    toast.custom((t) => (
      <CustomToast 
        t={t} 
        type="error" 
        message={message} 
        {...options}
      />
    ), {
      duration: 5000,
      ...options
    });
  },
  
  warning: (message, options = {}) => {
    toast.custom((t) => (
      <CustomToast 
        t={t} 
        type="warning" 
        message={message} 
        {...options}
      />
    ), {
      duration: 4500,
      ...options
    });
  },
  
  info: (message, options = {}) => {
    toast.custom((t) => (
      <CustomToast 
        t={t} 
        type="info" 
        message={message} 
        {...options}
      />
    ), {
      duration: 4000,
      ...options
    });
  },
  
  // Special pet-themed toasts
  petAdded: (petName) => {
    toast.custom((t) => (
      <CustomToast 
        t={t} 
        type="success" 
        title="Added to Watchlist!"
        message={`${petName} has been added to your favorites`}
        icon={<FaHeart className="w-6 h-6 text-pink-500" />}
      />
    ), {
      duration: 3000,
    });
  },
  
  adoptionSubmitted: (petName) => {
    toast.custom((t) => (
      <CustomToast 
        t={t} 
        type="success" 
        title="Application Submitted!"
        message={`Your adoption application for ${petName} has been submitted successfully`}
        icon={<div className="text-2xl">🐾</div>}
      />
    ), {
      duration: 5000,
    });
  }
};

const ToastProvider = () => {
  return (
    <Toaster
      position="top-right"
      reverseOrder={false}
      gutter={8}
      containerClassName=""
      containerStyle={{
        top: 80,
        right: 20,
      }}
      toastOptions={{
        // Define default options
        className: '',
        duration: 4000,
        style: {
          background: 'transparent',
          boxShadow: 'none',
          padding: 0,
        },
      }}
    />
  );
};

export default ToastProvider;
