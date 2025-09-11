import { format, formatDistanceToNow } from 'date-fns';

// Utility functions for the PawHaven app

export const formatAge = (ageInMonths) => {
  if (ageInMonths < 12) {
    return `${ageInMonths} month${ageInMonths !== 1 ? 's' : ''}`;
  } else {
    const years = Math.floor(ageInMonths / 12);
    const months = ageInMonths % 12;
    
    if (months === 0) {
      return `${years} year${years !== 1 ? 's' : ''}`;
    } else {
      return `${years}y ${months}m`;
    }
  }
};

export const getSpeciesEmoji = (species) => {
  const emojiMap = {
    'dog': '🐕',
    'cat': '🐱',
    'rabbit': '🐰',
    'bird': '🦜',
    'hamster': '🐹',
    'fish': '🐠',
    'reptile': '🦎',
    'other': '🐾'
  };
  
  return emojiMap[species?.toLowerCase()] || emojiMap.other;
};

export const getStatusColor = (status) => {
  const colorMap = {
    'available': 'bg-gradient-to-r from-emerald-400 to-green-500 text-white',
    'pending': 'bg-gradient-to-r from-amber-400 to-orange-500 text-white',
    'adopted': 'bg-gradient-to-r from-gray-400 to-gray-500 text-white',
    'reserved': 'bg-gradient-to-r from-blue-400 to-cyan-500 text-white',
    'medical': 'bg-gradient-to-r from-red-400 to-pink-500 text-white'
  };
  
  return colorMap[status?.toLowerCase()] || colorMap.available;
};

export const getSizeColor = (size) => {
  const colorMap = {
    'small': 'bg-green-100 text-green-700',
    'medium': 'bg-blue-100 text-blue-700',
    'large': 'bg-purple-100 text-purple-700',
    'extra-large': 'bg-orange-100 text-orange-700'
  };
  
  return colorMap[size?.toLowerCase()] || colorMap.medium;
};

export const formatDate = (date) => {
  if (!date) return '';
  
  try {
    const dateObj = new Date(date);
    return format(dateObj, 'MMM dd, yyyy');
  } catch (error) {
    return date;
  }
};

export const formatRelativeTime = (date) => {
  if (!date) return '';
  
  try {
    const dateObj = new Date(date);
    return formatDistanceToNow(dateObj, { addSuffix: true });
  } catch (error) {
    return date;
  }
};

export const calculateHealthScore = (pet) => {
  let score = 0;
  
  if (pet.isVaccinated) score += 2;
  if (pet.isNeutered) score += 1;
  if (pet.isMicrochipped) score += 1;
  if (pet.medicalHistory && !pet.medicalHistory.includes('issues')) score += 1;
  
  return Math.min(5, score);
};

export const generateShareText = (pet) => {
  return {
    title: `Meet ${pet.name}!`,
    text: `Check out this adorable ${pet.age < 12 ? 'young' : 'adult'} ${pet.species} looking for a loving home! ${pet.name} is a ${pet.breed} who ${pet.description.substring(0, 100)}...`,
    url: `${window.location.origin}/pet/${pet.id}`
  };
};

export const validateEmail = (email) => {
  const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return re.test(email);
};

export const validatePhone = (phone) => {
  const re = /^[\+]?[1-9][\d]{0,15}$/;
  return re.test(phone.replace(/[\s\-\(\)]/g, ''));
};

export const debounce = (func, wait) => {
  let timeout;
  return function executedFunction(...args) {
    const later = () => {
      clearTimeout(timeout);
      func(...args);
    };
    clearTimeout(timeout);
    timeout = setTimeout(later, wait);
  };
};

export const throttle = (func, limit) => {
  let inThrottle;
  return function() {
    const args = arguments;
    const context = this;
    if (!inThrottle) {
      func.apply(context, args);
      inThrottle = true;
      setTimeout(() => inThrottle = false, limit);
    }
  };
};

export const generatePetId = () => {
  return 'pet_' + Math.random().toString(36).substr(2, 9);
};

export const formatCurrency = (amount) => {
  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD'
  }).format(amount);
};

export const capitalizeFirst = (str) => {
  return str.charAt(0).toUpperCase() + str.slice(1).toLowerCase();
};

export const truncateText = (text, maxLength = 100) => {
  if (text.length <= maxLength) return text;
  return text.substr(0, maxLength).trim() + '...';
};
