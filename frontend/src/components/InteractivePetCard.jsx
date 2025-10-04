import React, { useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { FaHeart, FaEye, FaPaw, FaStar, FaShare, FaCalendar, FaMapMarkerAlt } from 'react-icons/fa';
import { Heart, Eye, Share2, Calendar, MapPin } from 'lucide-react';
import { useInView } from 'react-intersection-observer';

const InteractivePetCard = ({ 
  pet, 
  onAddToWatchlist, 
  isInWatchlist = false,
  onShare,
  index = 0 
}) => {
  const [isHovered, setIsHovered] = useState(false);
  const [imageLoaded, setImageLoaded] = useState(false);
  const { ref, inView } = useInView({
    threshold: 0.1,
    triggerOnce: true
  });

  const getStatusColor = (status) => {
    switch (status.toLowerCase()) {
      case 'available':
        return 'bg-gradient-to-r from-emerald-400 to-green-500 text-white';
      case 'pending':
        return 'bg-gradient-to-r from-amber-400 to-orange-500 text-white';
      case 'adopted':
        return 'bg-gradient-to-r from-gray-400 to-gray-500 text-white';
      default:
        return 'bg-gradient-to-r from-blue-400 to-cyan-500 text-white';
    }
  };

  const getAgeDisplay = (ageInMonths) => {
    if (ageInMonths < 12) {
      return `${ageInMonths}mo`;
    } else {
      const years = Math.floor(ageInMonths / 12);
      const months = ageInMonths % 12;
      return months > 0 ? `${years}y ${months}m` : `${years}y`;
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

  const handleWatchlistClick = (e) => {
    e.preventDefault();
    e.stopPropagation();
    onAddToWatchlist && onAddToWatchlist(pet);
  };

  const handleShare = (e) => {
    e.preventDefault();
    e.stopPropagation();
    onShare && onShare(pet);
  };

  const cardVariants = {
    hidden: { 
      opacity: 0, 
      y: 50, 
      scale: 0.9 
    },
    visible: { 
      opacity: 1, 
      y: 0, 
      scale: 1,
      transition: {
        duration: 0.5,
        delay: index * 0.1,
        ease: "easeOut"
      }
    }
  };

  const imageVariants = {
    loading: { scale: 1.1, opacity: 0 },
    loaded: { scale: 1, opacity: 1 }
  };

  const overlayVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { 
      opacity: 1, 
      y: 0,
      transition: { duration: 0.3 }
    }
  };

  return (
    <motion.div
      ref={ref}
      variants={cardVariants}
      initial="hidden"
      animate={inView ? "visible" : "hidden"}
      whileHover={{ y: -8, transition: { duration: 0.2 } }}
      className="group relative"
    >
      <Link to={`/pet/${pet.id}`} className="block">
        <div 
          className="bg-white rounded-2xl shadow-lg overflow-hidden transition-all duration-300 hover:shadow-2xl border border-gray-100 relative"
          onMouseEnter={() => setIsHovered(true)}
          onMouseLeave={() => setIsHovered(false)}
        >
          {/* Image Container */}
          <div className="relative aspect-[4/3] overflow-hidden bg-gradient-to-br from-pink-50 to-purple-50">
            {/* Loading placeholder */}
            {!imageLoaded && (
              <div className="absolute inset-0 flex items-center justify-center">
                <motion.div
                  animate={{ rotate: 360 }}
                  transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
                  className="text-4xl"
                >
                  {getSpeciesEmoji(pet.species)}
                </motion.div>
              </div>
            )}
            
            <motion.img
              src={pet.imageUrl}
              alt={pet.name}
              variants={imageVariants}
              initial="loading"
              animate={imageLoaded ? "loaded" : "loading"}
              onLoad={() => setImageLoaded(true)}
              className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
            />
            
            {/* Gradient overlay */}
            <div className="absolute inset-0 bg-gradient-to-t from-black/20 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
            
            {/* Action buttons overlay */}
            <AnimatePresence>
              {isHovered && (
                <motion.div
                  variants={overlayVariants}
                  initial="hidden"
                  animate="visible"
                  exit="hidden"
                  className="absolute inset-0 flex items-center justify-center space-x-3"
                >
                  <motion.button
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.9 }}
                    onClick={handleWatchlistClick}
                    className={`p-3 rounded-full backdrop-blur-md border transition-all duration-200 ${
                      isInWatchlist 
                        ? 'bg-pink-500/90 text-white border-pink-400' 
                        : 'bg-white/90 text-gray-700 border-white/50 hover:bg-pink-50'
                    }`}
                  >
                    <Heart className={`h-5 w-5 ${isInWatchlist ? 'fill-current' : ''}`} />
                  </motion.button>
                  
                  <motion.button
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.9 }}
                    className="p-3 rounded-full bg-white/90 text-gray-700 border border-white/50 backdrop-blur-md hover:bg-blue-50 transition-all duration-200"
                  >
                    <Eye className="h-5 w-5" />
                  </motion.button>
                  
                  <motion.button
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.9 }}
                    onClick={handleShare}
                    className="p-3 rounded-full bg-white/90 text-gray-700 border border-white/50 backdrop-blur-md hover:bg-green-50 transition-all duration-200"
                  >
                    <Share2 className="h-5 w-5" />
                  </motion.button>
                </motion.div>
              )}
            </AnimatePresence>

            {/* Status badge */}
            <div className="absolute top-3 left-3">
              <motion.span 
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ delay: 0.2 }}
                className={`px-3 py-1 text-xs font-bold rounded-full backdrop-blur-md shadow-lg ${getStatusColor(pet.status)}`}
              >
                {pet.status}
              </motion.span>
            </div>

            {/* Species indicator */}
            <div className="absolute bottom-3 right-3 bg-white/90 backdrop-blur-md rounded-full p-2 shadow-lg">
              <span className="text-lg">{getSpeciesEmoji(pet.species)}</span>
            </div>

            {/* Quick info on hover */}
            <AnimatePresence>
              {isHovered && (
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: 20 }}
                  className="absolute bottom-3 left-3 bg-black/70 text-white px-3 py-2 rounded-lg text-sm backdrop-blur-md"
                >
                  <div className="flex items-center space-x-2">
                    <Calendar className="h-3 w-3" />
                    <span>{getAgeDisplay(pet.age)}</span>
                    <MapPin className="h-3 w-3 ml-2" />
                    <span>{pet.size}</span>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>

          {/* Pet Information */}
          <div className="p-6">
            {/* Header */}
            <div className="flex justify-between items-start mb-3">
              <motion.h3 
                className="text-xl font-bold text-gray-900 group-hover:text-pink-600 transition-colors duration-300"
                whileHover={{ scale: 1.02 }}
              >
                {pet.name}
              </motion.h3>
              <div className="flex items-center space-x-1 text-sm text-gray-500 bg-gray-50 px-3 py-1 rounded-full">
                <Calendar className="h-3 w-3" />
                <span>{getAgeDisplay(pet.age)}</span>
              </div>
            </div>
            
            {/* Breed and basic info */}
            <div className="flex items-center flex-wrap gap-2 mb-3 text-sm text-gray-600">
              <span className="font-medium">{pet.breed}</span>
              <span className="w-1 h-1 bg-gray-300 rounded-full"></span>
              <span>{pet.gender}</span>
              <span className="w-1 h-1 bg-gray-300 rounded-full"></span>
              <span className="px-2 py-0.5 bg-blue-100 text-blue-700 rounded-full font-medium">
                {pet.size}
              </span>
            </div>
            
            {/* Description */}
            <p className="text-gray-700 text-sm mb-4 line-clamp-2 leading-relaxed">
              {pet.description}
            </p>

            {/* Health badges */}
            <div className="flex flex-wrap gap-2 mb-4">
              {pet.isVaccinated && (
                <motion.span 
                  whileHover={{ scale: 1.05 }}
                  className="flex items-center space-x-1 px-3 py-1 bg-gradient-to-r from-emerald-100 to-green-100 text-emerald-700 text-xs rounded-full font-medium"
                >
                  <span>💉</span>
                  <span>Vaccinated</span>
                </motion.span>
              )}
              {pet.isNeutered && (
                <motion.span 
                  whileHover={{ scale: 1.05 }}
                  className="flex items-center space-x-1 px-3 py-1 bg-gradient-to-r from-blue-100 to-cyan-100 text-blue-700 text-xs rounded-full font-medium"
                >
                  <span>✂️</span>
                  <span>Neutered</span>
                </motion.span>
              )}
              {pet.isMicrochipped && (
                <motion.span 
                  whileHover={{ scale: 1.05 }}
                  className="flex items-center space-x-1 px-3 py-1 bg-gradient-to-r from-purple-100 to-pink-100 text-purple-700 text-xs rounded-full font-medium"
                >
                  <span>🔗</span>
                  <span>Chipped</span>
                </motion.span>
              )}
            </div>

            {/* Health score */}
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center space-x-1">
                <div className="flex space-x-0.5">
                  {[...Array(5)].map((_, i) => (
                    <motion.div
                      key={i}
                      initial={{ scale: 0 }}
                      animate={{ scale: 1 }}
                      transition={{ delay: 0.3 + i * 0.1 }}
                    >
                      <FaStar className={`h-3 w-3 ${i < 4 ? 'text-yellow-400' : 'text-gray-200'}`} />
                    </motion.div>
                  ))}
                </div>
                <span className="text-xs text-gray-500 ml-1">Health Score</span>
              </div>
              
              {/* Days since arrival */}
              <span className="text-xs text-gray-400">
                {pet.arrivalDate && `New arrival`}
              </span>
            </div>

            {/* Action buttons */}
            <div className="flex space-x-2">
              <motion.div
                className="flex-1"
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
              >
                <div className="w-full bg-gradient-to-r from-pink-500 to-purple-600 text-white py-2.5 px-4 rounded-xl hover:from-pink-600 hover:to-purple-700 transition-all duration-300 text-center text-sm font-semibold flex items-center justify-center space-x-2 group/btn">
                  <Eye className="h-3 w-3 transition-transform group-hover/btn:scale-110" />
                  <span>View Details</span>
                </div>
              </motion.div>
              
              {pet.status.toLowerCase() === 'available' && (
                <motion.div
                  className="flex-1"
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                >
                  <div className="w-full bg-white text-pink-600 border-2 border-pink-200 py-2.5 px-4 rounded-xl hover:bg-pink-50 hover:border-pink-300 transition-all duration-300 text-center text-sm font-semibold flex items-center justify-center space-x-2 group/btn">
                    <motion.div
                      animate={{ y: [0, -2, 0] }}
                      transition={{ duration: 1, repeat: Infinity, ease: "easeInOut" }}
                    >
                      <FaPaw className="h-3 w-3" />
                    </motion.div>
                    <span>Adopt Me</span>
                  </div>
                </motion.div>
              )}
            </div>
          </div>
        </div>
      </Link>
    </motion.div>
  );
};

export default InteractivePetCard;
