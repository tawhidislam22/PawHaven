import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { petAPI, userAPI, adoptionAPI, donationAPI, generalAPI } from '../services/api';
import toast from 'react-hot-toast';

// Pet hooks
export const usePets = (filters = {}) => {
  return useQuery({
    queryKey: ['pets', filters],
    queryFn: () => petAPI.getAllPets(filters),
    select: (data) => data.data,
    staleTime: 5 * 60 * 1000, // 5 minutes
  });
};

export const usePet = (id) => {
  return useQuery({
    queryKey: ['pet', id],
    queryFn: () => petAPI.getPetById(id),
    select: (data) => data.data,
    enabled: !!id,
  });
};

export const useFeaturedPets = (limit = 6) => {
  return useQuery({
    queryKey: ['featuredPets', limit],
    queryFn: () => petAPI.getFeaturedPets(limit),
    select: (data) => data.data,
    staleTime: 10 * 60 * 1000, // 10 minutes
  });
};

export const useSearchPets = (query, filters = {}) => {
  return useQuery({
    queryKey: ['searchPets', query, filters],
    queryFn: () => petAPI.searchPets(query, filters),
    select: (data) => data.data,
    enabled: !!query,
  });
};

// User hooks
export const useProfile = () => {
  return useQuery({
    queryKey: ['profile'],
    queryFn: () => userAPI.getProfile(),
    select: (data) => data.data,
  });
};

export const useWatchlist = () => {
  return useQuery({
    queryKey: ['watchlist'],
    queryFn: () => userAPI.getWatchlist(),
    select: (data) => data.data,
  });
};

export const useUserApplications = () => {
  return useQuery({
    queryKey: ['userApplications'],
    queryFn: () => userAPI.getApplications(),
    select: (data) => data.data,
  });
};

// Authentication mutations
export const useLogin = () => {
  const queryClient = useQueryClient();
  
  return useMutation({
    mutationFn: userAPI.login,
    onSuccess: (data) => {
      const { token, user } = data.data;
      localStorage.setItem('pawhaven_token', token);
      localStorage.setItem('pawhaven_user', JSON.stringify(user));
      
      // Invalidate and refetch user-related queries
      queryClient.invalidateQueries(['profile']);
      queryClient.invalidateQueries(['watchlist']);
      
      toast.success(`Welcome back, ${user.name}! 🐾`);
    },
    onError: (error) => {
      const message = error.response?.data?.message || 'Login failed';
      toast.error(message);
    },
  });
};

export const useRegister = () => {
  return useMutation({
    mutationFn: userAPI.register,
    onSuccess: (data) => {
      const { user } = data.data;
      toast.success(`Welcome to PawHaven, ${user.name}! 🎉`);
    },
    onError: (error) => {
      const message = error.response?.data?.message || 'Registration failed';
      toast.error(message);
    },
  });
};

// Watchlist mutations
export const useAddToWatchlist = () => {
  const queryClient = useQueryClient();
  
  return useMutation({
    mutationFn: userAPI.addToWatchlist,
    onSuccess: (data, petId) => {
      // Update the watchlist cache
      queryClient.invalidateQueries(['watchlist']);
      
      // Optimistically update pet in cache if available
      queryClient.setQueryData(['pet', petId], (oldData) => {
        if (oldData) {
          return {
            ...oldData,
            data: { ...oldData.data, isInWatchlist: true }
          };
        }
        return oldData;
      });
      
      toast.success('Added to your watchlist! ❤️', {
        icon: '🐾',
      });
    },
    onError: (error) => {
      const message = error.response?.data?.message || 'Failed to add to watchlist';
      toast.error(message);
    },
  });
};

export const useRemoveFromWatchlist = () => {
  const queryClient = useQueryClient();
  
  return useMutation({
    mutationFn: userAPI.removeFromWatchlist,
    onSuccess: (data, petId) => {
      // Update the watchlist cache
      queryClient.invalidateQueries(['watchlist']);
      
      // Optimistically update pet in cache if available
      queryClient.setQueryData(['pet', petId], (oldData) => {
        if (oldData) {
          return {
            ...oldData,
            data: { ...oldData.data, isInWatchlist: false }
          };
        }
        return oldData;
      });
      
      toast.success('Removed from watchlist');
    },
    onError: (error) => {
      const message = error.response?.data?.message || 'Failed to remove from watchlist';
      toast.error(message);
    },
  });
};

// Adoption mutations
export const useSubmitApplication = () => {
  const queryClient = useQueryClient();
  
  return useMutation({
    mutationFn: adoptionAPI.submitApplication,
    onSuccess: (data) => {
      const application = data.data;
      
      // Invalidate applications query
      queryClient.invalidateQueries(['userApplications']);
      
      toast.success('Application submitted successfully! 🎉', {
        duration: 5000,
      });
      
      return application;
    },
    onError: (error) => {
      const message = error.response?.data?.message || 'Failed to submit application';
      toast.error(message);
    },
  });
};

// Donation mutations
export const useSubmitDonation = () => {
  const queryClient = useQueryClient();
  
  return useMutation({
    mutationFn: donationAPI.submitDonation,
    onSuccess: (data) => {
      const donation = data.data;
      
      // Invalidate donation stats and user donations
      queryClient.invalidateQueries(['donationStats']);
      queryClient.invalidateQueries(['userDonations']);
      queryClient.invalidateQueries(['stats']);
      
      toast.success(`Thank you for your generous donation of $${donation.amount}! 💝`, {
        duration: 5000,
      });
      
      return donation;
    },
    onError: (error) => {
      const message = error.response?.data?.message || 'Donation failed';
      toast.error(message);
    },
  });
};

// Newsletter subscription
export const useNewsletterSubscription = () => {
  return useMutation({
    mutationFn: generalAPI.subscribeNewsletter,
    onSuccess: () => {
      toast.success('Successfully subscribed to newsletter! 📧');
    },
    onError: (error) => {
      const message = error.response?.data?.message || 'Subscription failed';
      toast.error(message);
    },
  });
};

// Contact form submission
export const useContactForm = () => {
  return useMutation({
    mutationFn: generalAPI.submitContactForm,
    onSuccess: () => {
      toast.success('Message sent successfully! We\'ll get back to you soon. 📬');
    },
    onError: (error) => {
      const message = error.response?.data?.message || 'Failed to send message';
      toast.error(message);
    },
  });
};

// Stats hook
export const useStats = () => {
  return useQuery({
    queryKey: ['stats'],
    queryFn: () => generalAPI.getStats(),
    select: (data) => data.data,
    staleTime: 15 * 60 * 1000, // 15 minutes
  });
};

// Notifications hook
export const useNotifications = () => {
  return useQuery({
    queryKey: ['notifications'],
    queryFn: () => generalAPI.getNotifications(),
    select: (data) => data.data,
    refetchInterval: 60 * 1000, // Refetch every minute
  });
};

export const useMarkNotificationRead = () => {
  const queryClient = useQueryClient();
  
  return useMutation({
    mutationFn: generalAPI.markNotificationRead,
    onSuccess: () => {
      // Invalidate notifications to refresh the list
      queryClient.invalidateQueries(['notifications']);
    },
  });
};
