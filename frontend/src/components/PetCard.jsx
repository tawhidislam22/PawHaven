import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { FaHeart, FaCalendar, FaMapMarkerAlt, FaEye, FaPaw, FaStar } from 'react-icons/fa';

const PetCard = ({ pet, onAddToWatchlist, isInWatchlist = false }) => {
  const [, setIsHovered] = useState(false);
  const [imageLoaded, setImageLoaded] = useState(false);

  const getStatusColor = (status) => {
    switch (status.toLowerCase()) {
      case 'available':
        return 'bg-gradient-to-r from-emerald-400 to-green-500 text-white shadow-lg';
      case 'pending':
        return 'bg-gradient-to-r from-amber-400 to-orange-500 text-white shadow-lg';
      case 'adopted':
        return 'bg-gradient-to-r from-gray-400 to-gray-500 text-white shadow-lg';
      default:
        return 'bg-gradient-to-r from-blue-400 to-cyan-500 text-white shadow-lg';
    }
  };

  const getAgeDisplay = (ageInMonths) => {
    if (ageInMonths < 12) {
      return `${ageInMonths} months`;
    } else {
      const years = Math.floor(ageInMonths / 12);
      const months = ageInMonths % 12;
      return months > 0 ? `${years}y ${months}m` : `${years} years`;
    }
  };

  const getSpeciesEmoji = (species) => {
    switch (species.toLowerCase()) {
      case 'dog': return '🐕';
      case 'cat': return '🐱';
      case 'rabbit': return '🐰';
      case 'bird': return '🦜';
      default: return '🐾';
    }
  };

  return (
    <div 
      className="bg-white rounded-2xl shadow-lg overflow-hidden card-hover group relative animate-fadeInScale"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {/* Pet Image */}
      <div className="relative overflow-hidden">
        <img
          src={pet.imageUrl}
          alt={pet.name}
          className={`w-full h-48 object-cover transition-all duration-500 group-hover:scale-110 ${
            imageLoaded ? 'opacity-100' : 'opacity-0'
          }`}
          onLoad={() => setImageLoaded(true)}
        />
        
        {/* Loading placeholder */}
        {!imageLoaded && (
          <div className="absolute inset-0 bg-gradient-to-br from-pink-100 to-purple-100 flex items-center justify-center">
            <div className="text-4xl animate-bounce">{getSpeciesEmoji(pet.species)}</div>
          </div>
        )}
        
        {/* Image overlay on hover */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300">
          <div className="absolute bottom-4 left-4 text-white">
            <div className="flex items-center space-x-1 text-sm font-medium">
              <FaEye className="h-3 w-3" />
              <span>View Details</span>
            </div>
          </div>
        </div>

        {/* Wishlist Button */}
        <div className="absolute top-3 right-3">
          <button
            onClick={(e) => {
              e.preventDefault();
              onAddToWatchlist && onAddToWatchlist(pet);
            }}
            className={`p-2.5 rounded-full backdrop-blur-md transition-all duration-300 hover:scale-110 ${
              isInWatchlist 
                ? 'bg-pink-500/90 text-white shadow-lg animate-pulse-glow' 
                : 'bg-white/90 text-gray-600 hover:bg-pink-50 hover:text-pink-600'
            }`}
            title={isInWatchlist ? 'Remove from watchlist' : 'Add to watchlist'}
          >
            <FaHeart className={`h-4 w-4 transition-transform duration-200 ${isInWatchlist ? 'fill-current scale-110' : ''}`} />
          </button>
        </div>

        {/* Status Badge */}
        <div className="absolute top-3 left-3">
          <span className={`px-3 py-1 text-xs font-bold rounded-full backdrop-blur-md ${getStatusColor(pet.status)}`}>
            {pet.status}
          </span>
        </div>

        {/* Species indicator */}
        <div className="absolute bottom-3 right-3 bg-white/90 backdrop-blur-md rounded-full p-2">
          <span className="text-lg">{getSpeciesEmoji(pet.species)}</span>
        </div>
      </div>

      {/* Pet Info */}
      <div className="p-6">
        {/* Header with Name and Age */}
        <div className="flex justify-between items-start mb-3">
          <h3 className="text-xl font-bold text-gray-900 group-hover:text-pink-600 transition-colors duration-300">
            {pet.name}
          </h3>
          <div className="flex items-center space-x-1 text-sm text-gray-500 bg-gray-50 px-3 py-1 rounded-full">
            <FaCalendar className="h-3 w-3" />
            <span>{getAgeDisplay(pet.age)}</span>
          </div>
        </div>
        
        {/* Breed and Basic Info */}
        <div className="flex items-center space-x-2 mb-3 text-gray-600">
          <span className="font-medium">{pet.breed}</span>
          <span>•</span>
          <span>{pet.gender}</span>
          <span>•</span>
          <span className="px-2 py-0.5 bg-blue-100 text-blue-700 text-xs rounded-full font-medium">
            {pet.size}
          </span>
        </div>
        
        {/* Description */}
        <p className="text-gray-700 text-sm mb-4 line-clamp-2 leading-relaxed">
          {pet.description}
        </p>

        {/* Health Status with Icons */}
        <div className="flex flex-wrap gap-2 mb-4">
          {pet.isVaccinated && (
            <span className="flex items-center space-x-1 px-3 py-1 bg-gradient-to-r from-emerald-100 to-green-100 text-emerald-700 text-xs rounded-full font-medium">
              <span>💉</span>
              <span>Vaccinated</span>
            </span>
          )}
          {pet.isNeutered && (
            <span className="flex items-center space-x-1 px-3 py-1 bg-gradient-to-r from-blue-100 to-cyan-100 text-blue-700 text-xs rounded-full font-medium">
              <span>✂️</span>
              <span>Neutered</span>
            </span>
          )}
          {pet.isMicrochipped && (
            <span className="flex items-center space-x-1 px-3 py-1 bg-gradient-to-r from-purple-100 to-pink-100 text-purple-700 text-xs rounded-full font-medium">
              <span>🔗</span>
              <span>Chipped</span>
            </span>
          )}
        </div>

        {/* Rating/Quality Indicator */}
        <div className="flex items-center space-x-1 mb-4">
          <div className="flex space-x-0.5">
            {[...Array(5)].map((_, i) => (
              <FaStar key={i} className={`h-3 w-3 ${i < 4 ? 'text-yellow-400' : 'text-gray-200'}`} />
            ))}
          </div>
          <span className="text-xs text-gray-500 ml-1">Health Score</span>
        </div>

        {/* Action Buttons */}
        <div className="flex space-x-2">
          <Link
            to={`/pet/${pet.id}`}
            className="flex-1 bg-gradient-to-r from-pink-500 to-purple-600 text-white py-2.5 px-4 rounded-xl hover:from-pink-600 hover:to-purple-700 transition-all duration-300 text-center text-sm font-semibold hover:scale-105 hover:shadow-lg flex items-center justify-center space-x-2"
          >
            <FaEye className="h-3 w-3" />
            <span>View Details</span>
          </Link>
          {pet.status.toLowerCase() === 'available' && (
            <Link
              to={`/adopt/${pet.id}`}
              className="flex-1 bg-white text-pink-600 border-2 border-pink-200 py-2.5 px-4 rounded-xl hover:bg-pink-50 hover:border-pink-300 transition-all duration-300 text-center text-sm font-semibold hover:scale-105 flex items-center justify-center space-x-2 group"
            >
              <FaPaw className="h-3 w-3 group-hover:animate-bounce" />
              <span>Adopt Me</span>
            </Link>
          )}
        </div>
      </div>
    </div>
  );
};

export default PetCard;
