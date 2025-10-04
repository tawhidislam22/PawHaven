import React, { createContext, useState, useEffect } from 'react';
import toast from 'react-hot-toast';

export const AppContext = createContext();

export const AppProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [watchlist, setWatchlist] = useState([]);
  const [loading, setLoading] = useState(false);
  const [theme, setTheme] = useState('light');
  const [notifications, setNotifications] = useState([]);

  // Load user data from localStorage on mount
  useEffect(() => {
    const savedUser = localStorage.getItem('pawhaven_user');
    const savedWatchlist = localStorage.getItem('pawhaven_watchlist');
    const savedTheme = localStorage.getItem('pawhaven_theme');

    if (savedUser) {
      setUser(JSON.parse(savedUser));
      setIsAuthenticated(true);
    }

    if (savedWatchlist) {
      setWatchlist(JSON.parse(savedWatchlist));
    }

    if (savedTheme) {
      setTheme(savedTheme);
    }
  }, []);

  // Save watchlist to localStorage when it changes
  useEffect(() => {
    localStorage.setItem('pawhaven_watchlist', JSON.stringify(watchlist));
  }, [watchlist]);

  // Authentication functions
  const login = (userData) => {
    setUser(userData);
    setIsAuthenticated(true);
    localStorage.setItem('pawhaven_user', JSON.stringify(userData));
    toast.success(`Welcome back, ${userData.name}! 🐾`);
  };

  const logout = () => {
    setUser(null);
    setIsAuthenticated(false);
    setWatchlist([]);
    localStorage.removeItem('pawhaven_user');
    localStorage.removeItem('pawhaven_watchlist');
    toast.success('Logged out successfully');
  };

  // Watchlist functions
  const addToWatchlist = (pet) => {
    if (!watchlist.find(item => item.id === pet.id)) {
      const newWatchlist = [...watchlist, pet];
      setWatchlist(newWatchlist);
      toast.success(`${pet.name} added to your watchlist! ❤️`, {
        icon: '🐾',
        style: {
          borderRadius: '12px',
          background: '#333',
          color: '#fff',
        },
      });
    } else {
      toast.error(`${pet.name} is already in your watchlist`);
    }
  };

  const removeFromWatchlist = (petId) => {
    const pet = watchlist.find(item => item.id === petId);
    const newWatchlist = watchlist.filter(item => item.id !== petId);
    setWatchlist(newWatchlist);
    
    if (pet) {
      toast.success(`${pet.name} removed from watchlist`, {
        icon: '💔',
      });
    }
  };

  const isInWatchlist = (petId) => {
    return watchlist.some(item => item.id === petId);
  };

  // Theme functions
  const toggleTheme = () => {
    const newTheme = theme === 'light' ? 'dark' : 'light';
    setTheme(newTheme);
    localStorage.setItem('pawhaven_theme', newTheme);
    document.documentElement.setAttribute('data-theme', newTheme);
  };

  // Notification functions
  const addNotification = (notification) => {
    const id = Date.now().toString();
    const newNotification = { ...notification, id, timestamp: new Date() };
    setNotifications(prev => [newNotification, ...prev.slice(0, 9)]); // Keep only 10 latest
  };

  const markNotificationAsRead = (id) => {
    setNotifications(prev => 
      prev.map(notif => 
        notif.id === id ? { ...notif, read: true } : notif
      )
    );
  };

  const clearNotifications = () => {
    setNotifications([]);
  };

  // Get unread notification count
  const unreadCount = notifications.filter(notif => !notif.read).length;

  const value = {
    // User state
    user,
    isAuthenticated,
    login,
    logout,
    
    // Watchlist state
    watchlist,
    addToWatchlist,
    removeFromWatchlist,
    isInWatchlist,
    
    // App state
    loading,
    setLoading,
    theme,
    toggleTheme,
    
    // Notifications
    notifications,
    addNotification,
    markNotificationAsRead,
    clearNotifications,
    unreadCount,
  };

  return (
    <AppContext.Provider value={value}>
      {children}
    </AppContext.Provider>
  );
};
