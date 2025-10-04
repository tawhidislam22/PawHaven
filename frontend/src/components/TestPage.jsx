import React from 'react';

const TestPage = () => {
  return (
    <div className="min-h-screen bg-gray-100 flex items-center justify-center">
      <div className="text-center">
        <h1 className="text-4xl font-bold text-gray-800 mb-4">
          PawHaven Test Page
        </h1>
        <p className="text-lg text-gray-600">
          If you can see this, the React app is working!
        </p>
        <div className="mt-8 p-6 bg-white rounded-lg shadow-lg">
          <h2 className="text-2xl font-semibold text-pink-600 mb-4">
            Test Components
          </h2>
          <button className="bg-pink-500 text-white px-6 py-3 rounded-lg hover:bg-pink-600 transition-colors">
            Test Button
          </button>
        </div>
      </div>
    </div>
  );
};

export default TestPage;
