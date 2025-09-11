import React, { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FaSearch, FaTimes, FaFilter, FaPaw, FaMapMarkerAlt } from 'react-icons/fa';
import { Search, SlidersHorizontal, X } from 'lucide-react';

const SearchComponent = ({ onSearch, onFilter, initialFilters = {} }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [showFilters, setShowFilters] = useState(false);
  const [filters, setFilters] = useState({
    species: '',
    breed: '',
    age: '',
    size: '',
    gender: '',
    location: '',
    status: 'available',
    ...initialFilters
  });
  const [suggestions, setSuggestions] = useState([]);
  const searchRef = useRef(null);

  const popularSearches = [
    'Golden Retriever',
    'Persian Cat',
    'Puppies',
    'Senior Dogs',
    'Small Dogs',
    'Indoor Cats'
  ];

  const mockSuggestions = [
    { type: 'breed', value: 'Golden Retriever', count: 15 },
    { type: 'breed', value: 'Persian Cat', count: 8 },
    { type: 'breed', value: 'German Shepherd', count: 12 },
    { type: 'species', value: 'Dog', count: 45 },
    { type: 'species', value: 'Cat', count: 32 },
  ];

  useEffect(() => {
    if (searchQuery) {
      const filtered = mockSuggestions.filter(item =>
        item.value.toLowerCase().includes(searchQuery.toLowerCase())
      );
      setSuggestions(filtered);
    } else {
      setSuggestions([]);
    }
  }, [searchQuery]);

  const handleSearch = (query = searchQuery) => {
    if (query.trim()) {
      onSearch && onSearch(query.trim(), filters);
      setIsOpen(false);
    }
  };

  const handleFilterChange = (key, value) => {
    const newFilters = { ...filters, [key]: value };
    setFilters(newFilters);
    onFilter && onFilter(newFilters);
  };

  const clearFilters = () => {
    const clearedFilters = {
      species: '',
      breed: '',
      age: '',
      size: '',
      gender: '',
      location: '',
      status: 'available'
    };
    setFilters(clearedFilters);
    onFilter && onFilter(clearedFilters);
  };

  const activeFilterCount = Object.values(filters).filter(value => 
    value && value !== 'available'
  ).length;

  return (
    <div className="relative max-w-2xl mx-auto">
      {/* Main Search Bar */}
      <motion.div
        initial={{ scale: 0.95, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        className={`relative bg-white rounded-2xl shadow-lg border-2 transition-all duration-300 ${
          isOpen ? 'border-pink-400 shadow-xl' : 'border-gray-200 hover:border-pink-300'
        }`}
      >
        <div className="flex items-center p-4">
          <Search className="h-5 w-5 text-gray-400 mr-3" />
          <input
            ref={searchRef}
            type="text"
            placeholder="Search for your perfect companion..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            onFocus={() => setIsOpen(true)}
            onKeyPress={(e) => e.key === 'Enter' && handleSearch()}
            className="flex-1 text-gray-700 placeholder-gray-400 bg-transparent focus:outline-none text-lg"
          />
          
          <AnimatePresence>
            {searchQuery && (
              <motion.button
                initial={{ scale: 0, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                exit={{ scale: 0, opacity: 0 }}
                onClick={() => setSearchQuery('')}
                className="p-1 text-gray-400 hover:text-gray-600 mr-2"
              >
                <X className="h-4 w-4" />
              </motion.button>
            )}
          </AnimatePresence>

          <button
            onClick={() => setShowFilters(!showFilters)}
            className={`p-2 rounded-lg transition-all duration-200 relative ${
              showFilters || activeFilterCount > 0
                ? 'bg-pink-100 text-pink-600'
                : 'text-gray-400 hover:text-pink-600 hover:bg-pink-50'
            }`}
          >
            <SlidersHorizontal className="h-5 w-5" />
            {activeFilterCount > 0 && (
              <span className="absolute -top-1 -right-1 bg-pink-500 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center">
                {activeFilterCount}
              </span>
            )}
          </button>

          <button
            onClick={() => handleSearch()}
            className="ml-3 px-6 py-2 bg-gradient-to-r from-pink-500 to-purple-600 text-white rounded-xl hover:from-pink-600 hover:to-purple-700 transition-all duration-200 hover:scale-105 font-semibold"
          >
            Search
          </button>
        </div>

        {/* Search Suggestions Dropdown */}
        <AnimatePresence>
          {isOpen && (searchQuery || !showFilters) && (
            <motion.div
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              className="absolute top-full left-0 right-0 bg-white rounded-b-2xl shadow-xl border-t border-gray-100 z-50"
            >
              {suggestions.length > 0 ? (
                <div className="p-4">
                  <h4 className="text-sm font-semibold text-gray-600 mb-3">Suggestions</h4>
                  <div className="space-y-2">
                    {suggestions.map((suggestion, index) => (
                      <motion.button
                        key={index}
                        initial={{ opacity: 0, x: -10 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: index * 0.05 }}
                        onClick={() => handleSearch(suggestion.value)}
                        className="w-full flex items-center justify-between p-3 text-left hover:bg-pink-50 rounded-lg transition-colors duration-200 group"
                      >
                        <div className="flex items-center space-x-3">
                          <FaPaw className="h-4 w-4 text-pink-500" />
                          <span className="text-gray-700 group-hover:text-pink-600">
                            {suggestion.value}
                          </span>
                          <span className="text-xs text-gray-400 bg-gray-100 px-2 py-1 rounded-full">
                            {suggestion.type}
                          </span>
                        </div>
                        <span className="text-xs text-gray-400">
                          {suggestion.count} pets
                        </span>
                      </motion.button>
                    ))}
                  </div>
                </div>
              ) : searchQuery ? (
                <div className="p-4 text-center text-gray-500">
                  No suggestions found for "{searchQuery}"
                </div>
              ) : (
                <div className="p-4">
                  <h4 className="text-sm font-semibold text-gray-600 mb-3">Popular Searches</h4>
                  <div className="flex flex-wrap gap-2">
                    {popularSearches.map((search, index) => (
                      <motion.button
                        key={search}
                        initial={{ opacity: 0, scale: 0.8 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ delay: index * 0.05 }}
                        onClick={() => handleSearch(search)}
                        className="px-4 py-2 bg-gray-100 text-gray-700 rounded-full hover:bg-pink-100 hover:text-pink-600 transition-colors duration-200 text-sm"
                      >
                        {search}
                      </motion.button>
                    ))}
                  </div>
                </div>
              )}
            </motion.div>
          )}
        </AnimatePresence>
      </motion.div>

      {/* Advanced Filters */}
      <AnimatePresence>
        {showFilters && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className="mt-4 bg-white rounded-2xl shadow-lg border border-gray-200 overflow-hidden"
          >
            <div className="p-6">
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-lg font-semibold text-gray-800">Advanced Filters</h3>
                {activeFilterCount > 0 && (
                  <button
                    onClick={clearFilters}
                    className="text-sm text-pink-600 hover:text-pink-700 font-medium"
                  >
                    Clear All
                  </button>
                )}
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {/* Species */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Species
                  </label>
                  <select
                    value={filters.species}
                    onChange={(e) => handleFilterChange('species', e.target.value)}
                    className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-pink-400 focus:border-pink-400"
                  >
                    <option value="">All Species</option>
                    <option value="dog">Dogs</option>
                    <option value="cat">Cats</option>
                    <option value="rabbit">Rabbits</option>
                    <option value="bird">Birds</option>
                  </select>
                </div>

                {/* Size */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Size
                  </label>
                  <select
                    value={filters.size}
                    onChange={(e) => handleFilterChange('size', e.target.value)}
                    className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-pink-400 focus:border-pink-400"
                  >
                    <option value="">All Sizes</option>
                    <option value="small">Small</option>
                    <option value="medium">Medium</option>
                    <option value="large">Large</option>
                    <option value="extra-large">Extra Large</option>
                  </select>
                </div>

                {/* Gender */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Gender
                  </label>
                  <select
                    value={filters.gender}
                    onChange={(e) => handleFilterChange('gender', e.target.value)}
                    className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-pink-400 focus:border-pink-400"
                  >
                    <option value="">Any Gender</option>
                    <option value="male">Male</option>
                    <option value="female">Female</option>
                  </select>
                </div>

                {/* Age Range */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Age Range
                  </label>
                  <select
                    value={filters.age}
                    onChange={(e) => handleFilterChange('age', e.target.value)}
                    className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-pink-400 focus:border-pink-400"
                  >
                    <option value="">Any Age</option>
                    <option value="0-6">Puppy/Kitten (0-6 months)</option>
                    <option value="6-12">Young (6-12 months)</option>
                    <option value="12-24">Adult (1-2 years)</option>
                    <option value="24+">Senior (2+ years)</option>
                  </select>
                </div>

                {/* Location */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Location
                  </label>
                  <div className="relative">
                    <FaMapMarkerAlt className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                    <input
                      type="text"
                      placeholder="Enter city or zip code"
                      value={filters.location}
                      onChange={(e) => handleFilterChange('location', e.target.value)}
                      className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-pink-400 focus:border-pink-400"
                    />
                  </div>
                </div>

                {/* Status */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Availability
                  </label>
                  <select
                    value={filters.status}
                    onChange={(e) => handleFilterChange('status', e.target.value)}
                    className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-pink-400 focus:border-pink-400"
                  >
                    <option value="available">Available</option>
                    <option value="pending">Pending Adoption</option>
                    <option value="adopted">Recently Adopted</option>
                    <option value="all">All Status</option>
                  </select>
                </div>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Click outside to close */}
      {isOpen && (
        <div
          className="fixed inset-0 z-40"
          onClick={() => setIsOpen(false)}
        />
      )}
    </div>
  );
};

export default SearchComponent;
