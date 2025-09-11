import axios from 'axios';

// API configuration
const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || 'http://localhost:8080/api';

const api = axios.create({
  baseURL: API_BASE_URL,
  timeout: 10000,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Request interceptor
api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('pawhaven_token');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Response interceptor
api.interceptors.response.use(
  (response) => {
    return response;
  },
  (error) => {
    if (error.response?.status === 401) {
      localStorage.removeItem('pawhaven_token');
      localStorage.removeItem('pawhaven_user');
      window.location.href = '/login';
    }
    return Promise.reject(error);
  }
);

// Pet API endpoints
export const petAPI = {
  // Get all pets with optional filters
  getAllPets: (filters = {}) => {
    const params = new URLSearchParams();
    Object.entries(filters).forEach(([key, value]) => {
      if (value) params.append(key, value);
    });
    
    return api.get(`/pets?${params.toString()}`);
  },

  // Get pet by ID
  getPetById: (id) => {
    return api.get(`/pets/${id}`);
  },

  // Search pets
  searchPets: (query, filters = {}) => {
    return api.post('/pets/search', { query, filters });
  },

  // Get featured pets
  getFeaturedPets: (limit = 6) => {
    return api.get(`/pets/featured?limit=${limit}`);
  },

  // Get pets by species
  getPetsBySpecies: (species) => {
    return api.get(`/pets/species/${species}`);
  },

  // Create new pet (admin only)
  createPet: (petData) => {
    return api.post('/pets', petData);
  },

  // Update pet (admin only)
  updatePet: (id, petData) => {
    return api.put(`/pets/${id}`, petData);
  },

  // Delete pet (admin only)
  deletePet: (id) => {
    return api.delete(`/pets/${id}`);
  },
};

// User API endpoints
export const userAPI = {
  // Register new user
  register: (userData) => {
    return api.post('/auth/register', userData);
  },

  // Login user
  login: (credentials) => {
    return api.post('/auth/login', credentials);
  },

  // Get current user profile
  getProfile: () => {
    return api.get('/users/profile');
  },

  // Update user profile
  updateProfile: (userData) => {
    return api.put('/users/profile', userData);
  },

  // Get user's watchlist
  getWatchlist: () => {
    return api.get('/users/watchlist');
  },

  // Add pet to watchlist
  addToWatchlist: (petId) => {
    return api.post('/users/watchlist', { petId });
  },

  // Remove pet from watchlist
  removeFromWatchlist: (petId) => {
    return api.delete(`/users/watchlist/${petId}`);
  },

  // Get user's adoption applications
  getApplications: () => {
    return api.get('/users/applications');
  },
};

// Adoption API endpoints
export const adoptionAPI = {
  // Submit adoption application
  submitApplication: (applicationData) => {
    return api.post('/adoption-applications', applicationData);
  },

  // Get application by ID
  getApplicationById: (id) => {
    return api.get(`/adoption-applications/${id}`);
  },

  // Update application status (admin only)
  updateApplicationStatus: (id, status) => {
    return api.put(`/adoption-applications/${id}/status`, { status });
  },

  // Get all applications (admin only)
  getAllApplications: (filters = {}) => {
    const params = new URLSearchParams();
    Object.entries(filters).forEach(([key, value]) => {
      if (value) params.append(key, value);
    });
    
    return api.get(`/adoption-applications?${params.toString()}`);
  },
};

// Donation API endpoints
export const donationAPI = {
  // Submit donation
  submitDonation: (donationData) => {
    return api.post('/donations', donationData);
  },

  // Get user's donations
  getUserDonations: () => {
    return api.get('/donations/user');
  },

  // Get donation statistics
  getDonationStats: () => {
    return api.get('/donations/stats');
  },

  // Process payment (would integrate with payment gateway)
  processPayment: (paymentData) => {
    return api.post('/donations/payment', paymentData);
  },
};

// General API endpoints
export const generalAPI = {
  // Get app statistics
  getStats: () => {
    return api.get('/stats');
  },

  // Contact form submission
  submitContactForm: (contactData) => {
    return api.post('/contact', contactData);
  },

  // Newsletter subscription
  subscribeNewsletter: (email) => {
    return api.post('/newsletter/subscribe', { email });
  },

  // Upload image
  uploadImage: (file) => {
    const formData = new FormData();
    formData.append('image', file);
    
    return api.post('/upload/image', formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    });
  },

  // Get notifications
  getNotifications: () => {
    return api.get('/notifications');
  },

  // Mark notification as read
  markNotificationRead: (id) => {
    return api.put(`/notifications/${id}/read`);
  },
};

// Export the main API instance
export default api;
