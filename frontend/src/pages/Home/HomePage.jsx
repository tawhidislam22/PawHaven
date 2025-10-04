import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { FaArrowRight, FaHeart, FaUsers, FaAward, FaChartLine, FaPaw, FaHome, FaShieldAlt, FaPlay } from 'react-icons/fa';
import { ArrowRight, Heart, Users, Award, BarChart3, Home, Shield, Play } from 'lucide-react';
import { dummyPets, testimonials, stats } from '../../data/dummyData';

const HomePage = () => {
  const [featuredPets] = useState(dummyPets.slice(0, 8));
  const [loading, setLoading] = useState(true);


  useEffect(() => {
    // Simulate loading
    const timer = setTimeout(() => setLoading(false), 1500);
    return () => clearTimeout(timer);
  }, []);

  const handleAddToWatchlist = (pet) => {
    console.log('Added to watchlist:', pet.name);
    // This will be handled by the context
  };

  const handleSearch = (query, filters) => {
    console.log('Searching for:', query, filters);
    // This would navigate to search results
  };

  const handleFilter = (filters) => {
    console.log('Filtering with:', filters);
  };

  const handleShare = (pet) => {
    if (navigator.share) {
      navigator.share({
        title: `Meet ${pet.name}!`,
        text: `Check out this adorable ${pet.species} looking for a home!`,
        url: window.location.origin + `/pet/${pet.id}`
      });
    }
  };

  const features = [
    {
      icon: <FaPaw className="h-8 w-8" />,
      title: "Easy Adoption Process",
      description: "Streamlined application process to help you find your perfect companion quickly and easily."
    },
    {
      icon: <FaHeart className="h-8 w-8" />,
      title: "Veterinary Care",
      description: "All our pets receive comprehensive medical care and are ready for their forever homes."
    },
    {
      icon: <FaHome className="h-8 w-8" />,
      title: "Post-Adoption Support",
      description: "We provide ongoing support and resources to ensure successful pet integration."
    },
    {
      icon: <FaShieldAlt className="h-8 w-8" />,
      title: "Verified Profiles",
      description: "Every pet profile includes detailed health records and temperament information."
    }
  ];

  return (
    <div className="min-h-screen">
      {/* Enhanced Hero Section */}
      <section className="relative min-h-screen bg-gradient-to-br from-pink-600 via-purple-700 to-cyan-600 text-white overflow-hidden">
        {/* Animated background elements */}
        <div className="absolute inset-0">
          <div className="absolute top-20 left-10 text-6xl opacity-20 animate-float">🐕</div>
          <div className="absolute top-40 right-20 text-4xl opacity-20 animate-float" style={{ animationDelay: '1s' }}>🐱</div>
          <div className="absolute bottom-40 left-1/4 text-5xl opacity-20 animate-float" style={{ animationDelay: '2s' }}>❤️</div>
          <div className="absolute bottom-60 right-1/3 text-3xl opacity-20 animate-float" style={{ animationDelay: '3s' }}>🐾</div>
        </div>

        <div className="absolute inset-0 bg-black/30"></div>

        <div className="relative flex items-center justify-center min-h-screen">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24 text-center">
            <motion.div
              initial={{ opacity: 0, y: 50 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              className="mb-8"
            >
              <h1 className="text-5xl md:text-7xl font-bold mb-6 leading-tight">
                Find Your Perfect
                <span className="block text-gradient-accent bg-gradient-to-r from-yellow-300 to-orange-400 bg-clip-text text-transparent">
                  Furry Companion
                </span>
              </h1>
              <p className="text-xl md:text-2xl mb-12 max-w-4xl mx-auto leading-relaxed opacity-90">
                Connect with rescue animals and give them the loving home they deserve.
                Every adoption saves a life and opens your heart to unconditional love.
              </p>
            </motion.div>

            {/* Enhanced Search Component */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.3 }}
              className="mb-12"
            >
              {/* <SearchComponent 
                onSearch={handleSearch}
                onFilter={handleFilter}
              /> */}
              
            </motion.div>

            {/* Action buttons */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.6 }}
              className="flex flex-col sm:flex-row gap-6 justify-center items-center"
            >
              <Link
                to="/adopt"
                className="group bg-white text-pink-600 px-8 py-4 rounded-2xl font-bold hover:bg-gray-100 transition-all duration-300 flex items-center justify-center shadow-2xl hover:shadow-3xl hover:scale-105"
              >
                <FaPaw className="mr-3 h-6 w-6 group-hover:animate-bounce" />
                Adopt Now
                <ArrowRight className="ml-3 h-5 w-5 group-hover:translate-x-1 transition-transform" />
              </Link>

              <Link
                to="/donate"
                className="group border-2 border-white text-white px-8 py-4 rounded-2xl font-bold hover:bg-white hover:text-pink-600 transition-all duration-300 shadow-lg hover:shadow-2xl hover:scale-105"
              >
                <Heart className="mr-3 h-6 w-6 group-hover:text-red-500 group-hover:animate-pulse" />
                Make a Donation
              </Link>

              <button className="group bg-white/10 backdrop-blur-md text-white px-6 py-4 rounded-2xl font-semibold hover:bg-white/20 transition-all duration-300 flex items-center justify-center border border-white/20">
                <Play className="mr-2 h-5 w-5" />
                Watch Stories
              </button>
            </motion.div>

            {/* Floating stats */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.9 }}
              className="mt-16 grid grid-cols-2 md:grid-cols-4 gap-6 text-center"
            >
              <div className="bg-white/10 backdrop-blur-md rounded-xl p-4 border border-white/20">
                <div className="text-2xl md:text-3xl font-bold mb-1">{stats.totalPetsRescued.toLocaleString()}+</div>
                <div className="text-sm opacity-80">Pets Rescued</div>
              </div>
              <div className="bg-white/10 backdrop-blur-md rounded-xl p-4 border border-white/20">
                <div className="text-2xl md:text-3xl font-bold mb-1">{stats.petsAdopted.toLocaleString()}+</div>
                <div className="text-sm opacity-80">Happy Adoptions</div>
              </div>
              <div className="bg-white/10 backdrop-blur-md rounded-xl p-4 border border-white/20">
                <div className="text-2xl md:text-3xl font-bold mb-1">{stats.activeDonors}+</div>
                <div className="text-sm opacity-80">Active Donors</div>
              </div>
              <div className="bg-white/10 backdrop-blur-md rounded-xl p-4 border border-white/20">
                <div className="text-2xl md:text-3xl font-bold mb-1">${stats.totalDonations.toLocaleString()}+</div>
                <div className="text-sm opacity-80">Donations</div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

     

      {/* Enhanced Featured Pets Section */}
      <section className="bg-gradient-to-br from-gray-50 via-white to-pink-50 py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl md:text-5xl font-bold text-gradient-primary mb-6">
              Meet Our Featured Pets
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
              These wonderful animals are looking for their forever homes. Each one has a unique personality and so much love to give.
            </p>
            <div className="mt-6 flex justify-center">
              <div className="w-20 h-1 bg-gradient-to-r from-pink-500 to-purple-600 rounded-full"></div>
            </div>
          </motion.div>

          <div className="container mx-auto px-4">
              {loading ? (
            <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-8 mb-12">
              {Array.from({ length: 8 }).map((_, i) => (
                <div key={i} className="bg-white rounded-xl shadow-md p-4 animate-pulse">
                  <div className="bg-gray-300 h-48 rounded-lg mb-4"></div>
                  <div className="h-4 bg-gray-300 rounded mb-2"></div>
                  <div className="h-4 bg-gray-300 rounded w-3/4 mb-2"></div>
                  <div className="h-3 bg-gray-300 rounded w-1/2"></div>
                </div>
              ))}
            </div>
          ) : (
            
                <div className="grid sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-16">
                  {featuredPets.map((pet, index) => (
                  <motion.div
                    key={pet.id}
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6, delay: index * 0.1 }}
                    className="bg-white rounded-xl shadow-md hover:shadow-xl transition-all duration-300 overflow-hidden group"
                  >
                    <div className="relative overflow-hidden">
                      <img
                        src={pet.imageUrl}
                        alt={pet.name}
                        className="w-full h-48 object-cover group-hover:scale-110 transition-transform duration-300"
                      />
                      <div className="absolute top-3 right-3 bg-white rounded-full p-2 shadow-md">
                        <button
                          onClick={() => handleAddToWatchlist(pet)}
                          className="text-gray-400 hover:text-pink-500 transition-colors"
                        >
                          <FaHeart className="h-4 w-4" />
                        </button>
                      </div>
                    </div>
                    <div className="p-6">
                      <h3 className="text-xl font-bold text-gray-800 mb-2">{pet.name}</h3>
                      <p className="text-gray-600 mb-2">{pet.breed} • {pet.age} months</p>
                      <p className="text-gray-500 text-sm mb-4 line-clamp-2">{pet.description}</p>
                      <Link
                        to={`/pet/${pet.id}`}
                        className="block bg-gradient-to-r from-pink-500 to-purple-600 text-white text-center py-2 rounded-lg hover:from-pink-600 hover:to-purple-700 transition-colors font-semibold"
                      >
                        Learn More
                      </Link>
                    </div>
                  </motion.div>
                ))}
                </div>
              


          )}
            </div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.3 }}
            viewport={{ once: true }}
            className="text-center"
          >
            <Link
              to="/adopt"
              className="group bg-gradient-to-r from-pink-500 to-purple-600 text-white px-10 py-4 rounded-2xl font-bold hover:from-pink-600 hover:to-purple-700 transition-all duration-300 inline-flex items-center shadow-xl hover:shadow-2xl hover:scale-105"
            >
              <FaPaw className="mr-3 h-6 w-6 group-hover:animate-bounce" />
              View All Pets
              <ArrowRight className="ml-3 h-5 w-5 group-hover:translate-x-1 transition-transform" />
            </Link>
          </motion.div>
        </div>
      </section>

      {/* Features Section */}
      <section className="bg-white py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              Why Choose PawHaven?
            </h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              We're committed to making the adoption process smooth, transparent, and successful for both pets and families.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {features.map((feature, index) => (
              <div key={index} className="text-center">
                <div className="bg-pink-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4 text-pink-600">
                  {feature.icon}
                </div>
                <h3 className="text-xl font-semibold text-gray-900 mb-2">
                  {feature.title}
                </h3>
                <p className="text-gray-600">
                  {feature.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section className="bg-gray-50 py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              Happy Adoption Stories
            </h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              Read what our adopters and volunteers have to say about their PawHaven experience.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {testimonials.map((testimonial) => (
              <div key={testimonial.id} className="bg-white p-6 rounded-lg shadow-md">
                <div className="flex items-center mb-4">
                  <img
                    src={testimonial.image}
                    alt={testimonial.name}
                    className="w-12 h-12 rounded-full object-cover mr-4"
                  />
                  <div>
                    <h4 className="font-semibold text-gray-900">{testimonial.name}</h4>
                    <p className="text-sm text-gray-600">{testimonial.pet}</p>
                  </div>
                </div>
                <p className="text-gray-700 mb-4">"{testimonial.message}"</p>
                <div className="flex text-yellow-400">
                  {[...Array(testimonial.rating)].map((_, i) => (
                    <span key={i}>⭐</span>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Call to Action Section */}
      <section className="bg-pink-600 text-white py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            Ready to Change a Life?
          </h2>
          <p className="text-xl mb-8 max-w-2xl mx-auto">
            Whether you're looking to adopt, volunteer, or donate, every action makes a difference in an animal's life.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              to="/adopt"
              className="bg-white text-pink-600 px-8 py-3 rounded-lg font-semibold hover:bg-gray-100 transition-colors duration-200"
            >
              Start Adoption Process
            </Link>
            <Link
              to="/volunteer"
              className="border-2 border-white text-white px-8 py-3 rounded-lg font-semibold hover:bg-white hover:text-pink-600 transition-colors duration-200"
            >
              Become a Volunteer
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
};

export default HomePage;
