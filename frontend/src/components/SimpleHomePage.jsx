import React from 'react';

const SimpleHomePage = () => {
  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="bg-gradient-to-r from-pink-600 via-purple-600 to-indigo-600 text-white py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-5xl md:text-7xl font-bold mb-6">
            Find Your Perfect
            <span className="block text-yellow-300">
              Furry Companion
            </span>
          </h1>
          <p className="text-xl md:text-2xl mb-8 max-w-3xl mx-auto">
            Discover loving pets waiting for their forever homes. Every adoption saves a life and enriches yours.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <button className="bg-white text-purple-600 px-8 py-4 rounded-xl font-semibold hover:bg-gray-100 transition-all duration-200">
              Adopt Now
            </button>
            <button className="border-2 border-white text-white px-8 py-4 rounded-xl font-semibold hover:bg-white hover:text-purple-600 transition-all duration-200">
              Learn More
            </button>
          </div>
        </div>
      </section>

      {/* Simple Content Section */}
      <section className="py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-8">
            Welcome to PawHaven
          </h2>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            We're dedicated to connecting loving families with pets in need. Our mission is to find every pet a safe, loving forever home.
          </p>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
            <div>
              <div className="text-4xl font-bold text-pink-600 mb-2">1,247</div>
              <div className="text-gray-600">Pets Available</div>
            </div>
            <div>
              <div className="text-4xl font-bold text-purple-600 mb-2">3,456</div>
              <div className="text-gray-600">Happy Adoptions</div>
            </div>
            <div>
              <div className="text-4xl font-bold text-indigo-600 mb-2">89</div>
              <div className="text-gray-600">This Month</div>
            </div>
            <div>
              <div className="text-4xl font-bold text-pink-600 mb-2">124</div>
              <div className="text-gray-600">Volunteers</div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default SimpleHomePage;
