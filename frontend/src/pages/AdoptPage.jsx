import React, { useState, useMemo, useEffect } from 'react';
import { FaSearch, FaFilter, FaBars } from 'react-icons/fa';
import { petAPI } from '../services/api';
import PetCard from '../components/PetCard';

const AdoptPage = () => {
  const [pets, setPets] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [filters, setFilters] = useState({
    species: '',
    size: '',
    gender: '',
    age: ''
  });
  const [showFilters, setShowFilters] = useState(false);

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
    } finally {
      setLoading(false);
    }
  };

  const filteredPets = useMemo(() => {
    return pets.filter(pet => {
      const matchesSearch = pet.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                           pet.breed.toLowerCase().includes(searchTerm.toLowerCase()) ||
                           pet.species.toLowerCase().includes(searchTerm.toLowerCase());

      const matchesSpecies = !filters.species || pet.species.toLowerCase() === filters.species.toLowerCase();
      const matchesSize = !filters.size || pet.size.toLowerCase() === filters.size.toLowerCase();
      const matchesGender = !filters.gender || pet.gender.toLowerCase() === filters.gender.toLowerCase();
      
      let matchesAge = true;
      if (filters.age) {
        const ageInYears = pet.age / 12;
        switch (filters.age) {
          case 'puppy':
            matchesAge = ageInYears < 1;
            break;
          case 'young':
            matchesAge = ageInYears >= 1 && ageInYears < 3;
            break;
          case 'adult':
            matchesAge = ageInYears >= 3 && ageInYears < 7;
            break;
          case 'senior':
            matchesAge = ageInYears >= 7;
            break;
          default:
            matchesAge = true;
        }
      }

      return matchesSearch && matchesSpecies && matchesSize && matchesGender && matchesAge;
    });
  }, [pets, searchTerm, filters]);

  const handleFilterChange = (filterType, value) => {
    setFilters(prev => ({
      ...prev,
      [filterType]: value
    }));
  };

  const clearFilters = () => {
    setFilters({
      species: '',
      size: '',
      gender: '',
      age: ''
    });
    setSearchTerm('');
  };

  const handleAddToWatchlist = (pet) => {
    console.log('Added to watchlist:', pet.name);
    alert(`${pet.name} added to your watchlist!`);
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-16 w-16 border-t-2 border-b-2 border-pink-500 mx-auto mb-4"></div>
          <p className="text-gray-600">Loading pets...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero Section */}
      <section className="bg-gradient-to-r from-pink-500 to-purple-600 text-white py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-4xl md:text-5xl font-bold mb-4">Find Your Perfect Companion</h1>
          <p className="text-xl mb-8 max-w-2xl mx-auto">
            Browse our available pets and find the one that will complete your family.
          </p>
        </div>
      </section>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Search and Filter Bar */}
        <div className="bg-white rounded-lg shadow-md p-6 mb-8">
          <div className="flex flex-col lg:flex-row gap-4">
            {/* Search Bar */}
            <div className="flex-1 relative">
              <FaSearch className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5" />
              <input
                type="text"
                placeholder="Search by name, breed, or species..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-pink-500 focus:border-pink-500"
              />
            </div>

            {/* Filter Toggle */}
            <button
              onClick={() => setShowFilters(!showFilters)}
              className="flex items-center px-4 py-2 bg-gray-100 text-gray-700 rounded-md hover:bg-gray-200 transition-colors duration-200"
            >
              <FaBars className="h-5 w-5 mr-2" />
              Filters
            </button>
          </div>

          {/* Filters */}
          {showFilters && (
            <div className="mt-6 pt-6 border-t border-gray-200">
              <div className="grid sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {/* Species Filter */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Species</label>
                  <select
                    value={filters.species}
                    onChange={(e) => handleFilterChange('species', e.target.value)}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-pink-500 focus:border-pink-500"
                  >
                    <option value="">All Species</option>
                    <option value="dog">Dog</option>
                    <option value="cat">Cat</option>
                    <option value="rabbit">Rabbit</option>
                    <option value="bird">Bird</option>
                  </select>
                </div>

                {/* Size Filter */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Size</label>
                  <select
                    value={filters.size}
                    onChange={(e) => handleFilterChange('size', e.target.value)}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-pink-500 focus:border-pink-500"
                  >
                    <option value="">All Sizes</option>
                    <option value="small">Small</option>
                    <option value="medium">Medium</option>
                    <option value="large">Large</option>
                    <option value="extra_large">Extra Large</option>
                  </select>
                </div>

                {/* Gender Filter */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Gender</label>
                  <select
                    value={filters.gender}
                    onChange={(e) => handleFilterChange('gender', e.target.value)}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-pink-500 focus:border-pink-500"
                  >
                    <option value="">All Genders</option>
                    <option value="male">Male</option>
                    <option value="female">Female</option>
                  </select>
                </div>

                {/* Age Filter */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Age</label>
                  <select
                    value={filters.age}
                    onChange={(e) => handleFilterChange('age', e.target.value)}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-pink-500 focus:border-pink-500"
                  >
                    <option value="">All Ages</option>
                    <option value="puppy">Puppy/Kitten (&lt; 1 year)</option>
                    <option value="young">Young (1-3 years)</option>
                    <option value="adult">Adult (3-7 years)</option>
                    <option value="senior">Senior (7+ years)</option>
                  </select>
                </div>
              </div>

              <div className="mt-4 flex justify-between items-center">
                <button
                  onClick={clearFilters}
                  className="text-pink-600 hover:text-pink-700 font-medium"
                >
                  Clear All Filters
                </button>
                <span className="text-sm text-gray-500">
                  {filteredPets.length} pets found
                </span>
              </div>
            </div>
          )}
        </div>

        {/* Results Count */}
        <div className="mb-6">
          <h2 className="text-2xl font-bold text-gray-900">
            Available Pets ({filteredPets.length})
          </h2>
          {searchTerm && (
            <p className="text-gray-600 mt-2">
              Showing results for "{searchTerm}"
            </p>
          )}
        </div>

        {/* Pet Grid */}
        {filteredPets.length > 0 ? (
          <div className="grid sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {filteredPets.map((pet) => (
              <PetCard
                key={pet.id}
                pet={pet}
                onAddToWatchlist={handleAddToWatchlist}
              />
            ))}
          </div>
        ) : (
          <div className="text-center py-12">
            <div className="text-gray-400 text-6xl mb-4">🐾</div>
            <h3 className="text-xl font-semibold text-gray-900 mb-2">No pets found</h3>
            <p className="text-gray-600 mb-4">
              Try adjusting your search criteria or filters to find more pets.
            </p>
            <button
              onClick={clearFilters}
              className="bg-pink-600 text-white px-6 py-2 rounded-md hover:bg-pink-700 transition-colors duration-200"
            >
              Clear Filters
            </button>
          </div>
        )}

        {/* Load More Button (for pagination) */}
        {filteredPets.length > 0 && (
          <div className="text-center mt-12">
            <button className="bg-white text-pink-600 border border-pink-600 px-8 py-3 rounded-md hover:bg-pink-50 transition-colors duration-200">
              Load More Pets
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default AdoptPage;
