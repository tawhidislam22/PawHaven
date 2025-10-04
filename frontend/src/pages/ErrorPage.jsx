import React from 'react';
import { Link, useRouteError } from 'react-router-dom';
import { FaHome, FaExclamationTriangle } from 'react-icons/fa';

const ErrorPage = () => {
  const error = useRouteError();

  return (
    <div className="min-h-screen bg-gradient-to-br from-pink-50 via-purple-50 to-cyan-50 flex items-center justify-center px-4">
      <div className="text-center max-w-md mx-auto">
        <div className="mb-8">
          <FaExclamationTriangle className="h-24 w-24 text-pink-500 mx-auto mb-4" />
          <h1 className="text-4xl font-bold text-gray-800 mb-2">Oops!</h1>
          <h2 className="text-xl text-gray-600 mb-4">Something went wrong</h2>
          <p className="text-gray-500 mb-6">
            {error?.statusText || error?.message || "An unexpected error occurred"}
          </p>
        </div>
        
        <Link
          to="/"
          className="inline-flex items-center px-6 py-3 bg-gradient-to-r from-pink-500 to-purple-600 text-white font-semibold rounded-lg hover:from-pink-600 hover:to-purple-700 transition-all duration-300 hover:scale-105 shadow-lg"
        >
          <FaHome className="mr-2" />
          Back to Home
        </Link>
      </div>
    </div>
  );
};

export default ErrorPage;