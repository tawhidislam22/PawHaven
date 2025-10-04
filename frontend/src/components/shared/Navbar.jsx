
import React, { useState, useEffect } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { FaHeart, FaPaw, FaSearch, FaBell, FaSignOutAlt, FaSignInAlt, FaBars } from 'react-icons/fa';
import { useAuth } from '../../Providers/AuthProvider';
import ThemeToggle from '../ThemeToggle';

const Navbar = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { user, logout, loading } = useAuth();
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const navigation = [
    { name: 'Home', href: '/' },
    { name: 'Adopt', href: '/adopt' },
    { name: 'Accessories', href: '/accessories' },
    { name: 'Donate', href: '/donate' },
    { name: 'About', href: '/about' },
    { name: 'Contact', href: '/contact' },
    {
      name:'Dashboard', href: user ? '/dashboard' : '/register' //(user.role === 'admin' ? '/admin/dashboard' : '/user/dashboard') 
    }
  ];

  const isActive = (path) => location.pathname === path;

  // Close mobile menu when route changes
  useEffect(() => {
    setIsMenuOpen(false);
  }, [location.pathname]);

  // Close mobile menu when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (isMenuOpen && !event.target.closest('nav')) {
        setIsMenuOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, [isMenuOpen]);

  return (
    <nav className="bg-white dark:bg-gray-800 shadow-md fixed top-0 w-full z-50 transition-all duration-300">
      <div className="container mx-auto px-4">
        <div className="flex justify-between items-center h-16">
          
          {/* Logo and Brand */}
          <div className="flex items-center">
            <Link to="/" className="flex items-center group">
              <div className="relative">
                <FaPaw className="h-8 w-8 text-pink-600 dark:text-pink-400 transition-all duration-300 group-hover:rotate-12 group-hover:scale-110" />
                <div className="absolute -top-1 -right-1 w-3 h-3 bg-gradient-to-r from-yellow-400 to-orange-500 rounded-full animate-bounce"></div>
              </div>
              <span className="text-xl font-bold ml-2 bg-gradient-to-r from-pink-600 to-purple-600 dark:from-pink-400 dark:to-purple-400 bg-clip-text text-transparent">
                PawHaven
              </span>
            </Link>
          </div>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-1">
            {navigation.map((item) => (
              <Link
                key={item.name}
                to={item.href}
                className={`px-4 py-2 rounded-lg text-sm font-medium transition-all duration-300 hover:scale-105 relative group ${
                  isActive(item.href)
                    ? 'text-white bg-gradient-to-r from-pink-500 to-purple-600 shadow-lg'
                    : 'text-gray-700 dark:text-gray-200 hover:text-pink-600 dark:hover:text-pink-400 hover:bg-pink-50 dark:hover:bg-gray-700/50'
                }`}
              >
                {item.name}
                {isActive(item.href) && (
                  <div className="absolute -bottom-1 left-1/2 transform -translate-x-1/2 w-4 h-1 bg-white rounded-full"></div>
                )}
                <div className="absolute inset-0 bg-gradient-to-r from-pink-500/10 to-purple-600/10 opacity-0 group-hover:opacity-100 transition-opacity duration-300 rounded-lg"></div>
              </Link>
            ))}
          </div>

          {/* Right side items */}
          <div className="flex items-center space-x-3">
            <ThemeToggle />
            
            {/* Search Button */}
            <button className="p-2 text-gray-600 dark:text-gray-300 hover:text-pink-600 dark:hover:text-pink-400 hover:bg-pink-50 dark:hover:bg-gray-700 rounded-lg transition-all duration-300 hover:scale-110">
              <FaSearch className="h-4 w-4" />
            </button>
            
            {user ? (
              <div className="flex items-center space-x-3">
                {/* Notifications */}
                <button className="relative p-2 text-gray-600 dark:text-gray-300 hover:text-pink-600 dark:hover:text-pink-400 hover:bg-pink-50 dark:hover:bg-gray-700 rounded-lg transition-all duration-300 hover:scale-110">
                  <FaBell className="h-4 w-4" />
                  <span className="absolute -top-1 -right-1 w-3 h-3 bg-red-500 rounded-full animate-pulse"></span>
                </button>
                
                {/* Watchlist */}
                <Link
                  to="/watchlist"
                  className="relative p-2 text-gray-600 dark:text-gray-300 hover:text-pink-600 dark:hover:text-pink-400 hover:bg-pink-50 dark:hover:bg-gray-700 rounded-lg transition-all duration-300 hover:scale-110"
                >
                  <FaHeart className="h-4 w-4" />
                  <span className="absolute -top-2 -right-2 bg-pink-500 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center font-medium">
                    3
                  </span>
                </Link>
                
                {/* User Profile Dropdown */}
                <div className="relative group">
                  <button className="flex items-center p-1 rounded-full hover:ring-2 hover:ring-pink-200 dark:hover:ring-pink-400/50 transition-all duration-300">
                    <div className="w-8 h-8 rounded-full bg-gradient-to-r from-pink-400 to-purple-500 flex items-center justify-center text-white font-semibold text-sm overflow-hidden">
                      {user.photoURL ? (
                        <img 
                          src={user.photoURL} 
                          alt={user.displayName}
                          className="w-full h-full object-cover"
                        />
                      ) : (
                        user.displayName?.[0] || user.email?.[0] || 'U'
                      )}
                    </div>
                  </button>
                  
                  {/* Dropdown Menu */}
                  <div className="absolute right-0 mt-2 w-64 py-2 bg-white dark:bg-gray-800 rounded-xl shadow-xl border border-gray-200 dark:border-gray-700 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-300 transform translate-y-2 group-hover:translate-y-0">
                    {/* User Info */}
                    <div className="px-4 py-3 border-b border-gray-200 dark:border-gray-700">
                      <div className="font-semibold text-gray-800 dark:text-gray-200 truncate">
                        {user.displayName || 'User'}
                      </div>
                      <div className="text-sm text-gray-500 dark:text-gray-400 truncate">
                        {user.email}
                      </div>
                    </div>
                    
                    {/* Menu Items */}
                    <Link 
                      to="/profile" 
                      className="block px-4 py-2 text-sm text-gray-700 dark:text-gray-200 hover:bg-pink-50 dark:hover:bg-gray-700 hover:text-pink-600 dark:hover:text-pink-400 transition-colors duration-200"
                    >
                      Profile
                    </Link>
                    <Link 
                      to="/applications" 
                      className="block px-4 py-2 text-sm text-gray-700 dark:text-gray-200 hover:bg-pink-50 dark:hover:bg-gray-700 hover:text-pink-600 dark:hover:text-pink-400 transition-colors duration-200"
                    >
                      My Applications
                    </Link>
                    <Link 
                      to="/donations" 
                      className="block px-4 py-2 text-sm text-gray-700 dark:text-gray-200 hover:bg-pink-50 dark:hover:bg-gray-700 hover:text-pink-600 dark:hover:text-pink-400 transition-colors duration-200"
                    >
                      My Donations
                    </Link>
                    
                    <div className="border-t border-gray-200 dark:border-gray-700 mt-1 pt-1">
                      <button 
                        onClick={async () => {
                          await logout();
                          navigate('/');
                        }}
                        className="w-full text-left px-4 py-2 text-sm text-red-600 dark:text-red-400 hover:bg-red-50 dark:hover:bg-red-900/20 transition-colors duration-200 flex items-center space-x-2"
                        disabled={loading}
                      >
                        <FaSignOutAlt className="h-4 w-4" />
                        <span>Logout</span>
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            ) : (
              <div className="hidden md:flex items-center space-x-3">
                <Link 
                  to="/login" 
                  className="px-4 py-2 text-gray-700 dark:text-gray-200 hover:text-pink-600 dark:hover:text-pink-400 font-medium transition-all duration-300 hover:scale-105 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-700"
                >
                  Login
                </Link>
                <Link 
                  to="/register" 
                  className="px-4 py-2 bg-gradient-to-r from-pink-500 to-purple-600 text-white rounded-lg hover:from-pink-600 hover:to-purple-700 transition-all duration-300 hover:scale-105 font-medium shadow-lg hover:shadow-xl"
                >
                  Sign Up
                </Link>
              </div>
            )}

            {/* Mobile Menu Button */}
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="md:hidden p-2 text-gray-700 dark:text-gray-200 hover:text-pink-600 dark:hover:text-pink-400 hover:bg-pink-50 dark:hover:bg-gray-700 rounded-lg transition-all duration-300"
              aria-label="Toggle menu"
            >
              <FaBars className="h-5 w-5" />
            </button>
          </div>
        </div>

        {/* Mobile Navigation */}
        {isMenuOpen && (
          <div className="md:hidden border-t border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800">
            <div className="px-2 pt-2 pb-3 space-y-1">
              {navigation.map((item) => (
                <Link
                  key={item.name}
                  to={item.href}
                  className={`block px-3 py-2 rounded-lg text-base font-medium transition-all duration-300 ${
                    isActive(item.href)
                      ? 'text-white bg-gradient-to-r from-pink-500 to-purple-600'
                      : 'text-gray-700 dark:text-gray-200 hover:text-pink-600 dark:hover:text-pink-400 hover:bg-pink-50 dark:hover:bg-gray-700'
                  }`}
                  onClick={() => setIsMenuOpen(false)}
                >
                  {item.name}
                </Link>
              ))}
              
              {/* Mobile Auth Section */}
              {!user && (
                <div className="pt-4 border-t border-gray-200 dark:border-gray-700 space-y-2">
                  <Link 
                    to="/login" 
                    className="block px-3 py-2 text-gray-700 dark:text-gray-200 hover:text-pink-600 dark:hover:text-pink-400 hover:bg-pink-50 dark:hover:bg-gray-700 rounded-lg transition-all duration-300"
                    onClick={() => setIsMenuOpen(false)}
                  >
                    <div className="flex items-center space-x-2">
                      <FaSignInAlt className="h-4 w-4" />
                      <span>Login</span>
                    </div>
                  </Link>
                  <Link 
                    to="/register" 
                    className="block px-3 py-2 bg-gradient-to-r from-pink-500 to-purple-600 text-white rounded-lg hover:from-pink-600 hover:to-purple-700 transition-all duration-300 text-center font-medium"
                    onClick={() => setIsMenuOpen(false)}
                  >
                    Sign Up
                  </Link>
                </div>
              )}
            </div>
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navbar;