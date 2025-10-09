import React, { useState, useEffect } from 'react';
import { AnimatePresence } from 'framer-motion';
import { Filter, Search, SlidersHorizontal, Grid, List, ChevronDown } from 'lucide-react';
import { petAPI } from '../services/api';
import InteractivePetCard from '../components/InteractivePetCard';
import SearchComponent from '../components/SearchComponent';
import { PetCardSkeleton } from '../components/LoadingSkeletons';

const AllPet = () => {
  const [pets, setPets] = useState([]);
  const [loading, setLoading] = useState(true);
  const [viewMode, setViewMode] = useState('grid'); // 'grid' or 'list'
  const [showFilters, setShowFilters] = useState(false);
  const [sortBy, setSortBy] = useState('name');
  const [filters, setFilters] = useState({
    species: '',
    age: '',
    size: '',
    location: '',
    gender: ''
  });

  useEffect(() => {
    fetchPets();
  }, []);

  const fetchPets = async () => {
    setLoading(true);
    try {
      const response = await petAPI.getAllPets();
      setPets(response.data);
    } catch (error) {
      console.error('Error fetching pets:', error);
      alert(error.message || 'Failed to fetch pets. Please check if the backend server is running.');
    } finally {
      setLoading(false);
    }
  };

  const handleAddToWatchlist = (pet) => {
    console.log('Added to watchlist:', pet.name);
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

  const handleSearch = async (query, searchFilters) => {
    setLoading(true);
    try {
      // If there's a search query, use the search API
      if (query) {
        const response = await petAPI.searchPets(query, searchFilters);
        setPets(response.data);
      } else {
        // Otherwise, fetch all pets with filters
        const response = await petAPI.getAllPets(searchFilters);
        setPets(response.data);
      }
    } catch (error) {
      console.error('Error searching pets:', error);
      alert('Failed to search pets. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const handleSort = (sortOption) => {
    const sortedPets = [...pets].sort((a, b) => {
      switch (sortOption) {
        case 'name':
          return a.name.localeCompare(b.name);
        case 'age':
          return a.age.localeCompare(b.age);
        case 'breed':
          return a.breed.localeCompare(b.breed);
        case 'newest':
          return b.id - a.id;
        default:
          return 0;
      }
    });
    setPets(sortedPets);
    setSortBy(sortOption);
  };

  const sortOptions = [
    { value: 'name', label: 'Name (A-Z)' },
    { value: 'age', label: 'Age' },
    { value: 'breed', label: 'Breed' },
    { value: 'newest', label: 'Newest First' }
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero Section */}
      <section className="bg-gradient-to-r from-pink-600 via-purple-600 to-indigo-600 text-white py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="text-4xl md:text-5xl font-bold mb-4"
            >
              Find Your Perfect Pet
            </motion.h1>
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="text-xl mb-8 max-w-2xl mx-auto"
            >
              Browse through our amazing collection of pets looking for their forever homes
            </motion.p>
          </div>
        </div>
      </section>

      {/* Search and Filters */}
      <section className="bg-white shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <div className="mb-6">
            <SearchComponent onSearch={handleSearch} />
          </div>

          {/* Controls Bar */}
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
            <div className="flex items-center space-x-4">
              <button
                onClick={() => setShowFilters(!showFilters)}
                className="flex items-center space-x-2 px-4 py-2 bg-gray-100 rounded-lg hover:bg-gray-200 transition-colors"
              >
                <SlidersHorizontal className="h-4 w-4" />
                <span>Filters</span>
                <ChevronDown className={`h-4 w-4 transition-transform ${showFilters ? 'rotate-180' : ''}`} />
              </button>

              <div className="flex items-center space-x-2">
                <span className="text-gray-600 text-sm">View:</span>
                <button
                  onClick={() => setViewMode('grid')}
                  className={`p-2 rounded ${viewMode === 'grid' ? 'bg-pink-100 text-pink-600' : 'text-gray-400 hover:text-gray-600'}`}
                >
                  <Grid className="h-4 w-4" />
                </button>
                <button
                  onClick={() => setViewMode('list')}
                  className={`p-2 rounded ${viewMode === 'list' ? 'bg-pink-100 text-pink-600' : 'text-gray-400 hover:text-gray-600'}`}
                >
                  <List className="h-4 w-4" />
                </button>
              </div>
            </div>

            <div className="flex items-center space-x-4">
              <span className="text-gray-600 text-sm">Sort by:</span>
              <select
                value={sortBy}
                onChange={(e) => handleSort(e.target.value)}
                className="border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-pink-500"
              >
                {sortOptions.map(option => (
                  <option key={option.value} value={option.value}>
                    {option.label}
                  </option>
                ))}
              </select>

              <span className="text-gray-500 text-sm">
                {pets.length} pets found
              </span>
            </div>
          </div>

          {/* Advanced Filters */}
          <AnimatePresence>
            {showFilters && (
              <motion.div
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: 'auto' }}
                exit={{ opacity: 0, height: 0 }}
                className="mt-6 p-6 bg-gray-50 rounded-lg border"
              >
                <div className="grid sm:grid-cols-1 md:grid-cols-3 lg:grid-cols-5 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Species</label>
                    <select
                      value={filters.species}
                      onChange={(e) => setFilters({...filters, species: e.target.value})}
                      className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-pink-500"
                    >
                      <option value="">All Species</option>
                      <option value="Dog">Dogs</option>
                      <option value="Cat">Cats</option>
                      <option value="Bird">Birds</option>
                      <option value="Rabbit">Rabbits</option>
                    </select>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Age</label>
                    <select
                      value={filters.age}
                      onChange={(e) => setFilters({...filters, age: e.target.value})}
                      className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-pink-500"
                    >
                      <option value="">All Ages</option>
                      <option value="Young">Young</option>
                      <option value="Adult">Adult</option>
                      <option value="Senior">Senior</option>
                    </select>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Size</label>
                    <select
                      value={filters.size}
                      onChange={(e) => setFilters({...filters, size: e.target.value})}
                      className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-pink-500"
                    >
                      <option value="">All Sizes</option>
                      <option value="Small">Small</option>
                      <option value="Medium">Medium</option>
                      <option value="Large">Large</option>
                    </select>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Gender</label>
                    <select
                      value={filters.gender}
                      onChange={(e) => setFilters({...filters, gender: e.target.value})}
                      className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-pink-500"
                    >
                      <option value="">All Genders</option>
                      <option value="Male">Male</option>
                      <option value="Female">Female</option>
                    </select>
                  </div>

                  <div className="flex items-end">
                    <button
                      onClick={() => {
                        setFilters({species: '', age: '', size: '', location: '', gender: ''});
                        fetchPets();
                      }}
                      className="w-full px-4 py-2 text-sm text-gray-600 hover:text-gray-800 underline"
                    >
                      Clear Filters
                    </button>
                  </div>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </section>

      {/* Pet Grid */}
      <section className="py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {loading ? (
            <div className="grid sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {Array.from({ length: 12 }).map((_, i) => (
                <PetCardSkeleton key={i} />
              ))}
            </div>
          ) : pets.length > 0 ? (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className={viewMode === 'grid' 
                ? "grid sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
                : "space-y-6"
              }
            >
              <AnimatePresence>
                {pets.map((pet, index) => (
                  <motion.div
                    key={pet.id}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -20 }}
                    transition={{ delay: index * 0.1 }}
                  >
                    <InteractivePetCard
                      pet={pet}
                      onAddToWatchlist={handleAddToWatchlist}
                      onShare={handleShare}
                      viewMode={viewMode}
                    />
                  </motion.div>
                ))}
              </AnimatePresence>
            </motion.div>
          ) : (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="text-center py-16"
            >
              <div className="w-24 h-24 bg-gray-200 rounded-full flex items-center justify-center mx-auto mb-6">
                <Search className="h-12 w-12 text-gray-400" />
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-2">No pets found</h3>
              <p className="text-gray-600 mb-6">Try adjusting your search criteria or filters</p>
              <button
                onClick={() => {
                  setFilters({species: '', age: '', size: '', location: '', gender: ''});
                  fetchPets();
                }}
                className="bg-pink-600 text-white px-6 py-3 rounded-lg hover:bg-pink-700 transition-colors"
              >
                Clear All Filters
              </button>
            </motion.div>
          )}
        </div>
      </section>
    </div>
  );
};

export default AllPet;