
import React from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { FaHeart, FaUser, FaBars, FaTimes, FaPaw, FaSearch, FaBell, FaSignOutAlt, FaSignInAlt } from 'react-icons/fa';
import { useAuth } from '../context/AuthContext';

const Navbar = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { user, logOut, loading } = useAuth();
  const [isMenuOpen, setIsMenuOpen] = React.useState(false);
  const [isScrolled, setIsScrolled] = React.useState(false);

  const navigation = [
    { name: 'Home', href: '/', icon: '🏠' },
    { name: 'Adopt', href: '/adopt', icon: '🐾' },
    { name: 'Donate', href: '/donate', icon: '💝' },
    { name: 'About', href: '/about', icon: 'ℹ️' },
    { name: 'Contact', href: '/contact', icon: '📞' }
  ];

  const isActive = (path) => location.pathname === path;

  // Handle scroll effect
  React.useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Close mobile menu when clicking outside or on route change
  React.useEffect(() => {
    setIsMenuOpen(false);
  }, [location.pathname]);

  return (
    <nav className={`fixed top-0 w-full z-50 transition-all duration-500 ${
      isScrolled 
        ? 'bg-white/90 backdrop-blur-xl shadow-2xl border-b border-pink-100/50' 
        : 'bg-white/95 backdrop-blur-sm shadow-lg'
    }`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16 lg:h-20">
          
          {/* Logo Section */}
          <div className="flex items-center">
            <Link to="/" className="flex items-center space-x-3 group">
              <div className="relative">
                <FaPaw className={`h-8 w-8 lg:h-10 lg:w-10 text-pink-600 transition-all duration-300 group-hover:rotate-12 group-hover:scale-110 ${
                  isScrolled ? 'drop-shadow-lg' : ''
                }`} />
                <div className="absolute -top-1 -right-1 w-3 h-3 lg:w-4 lg:h-4 bg-gradient-to-r from-yellow-400 to-orange-500 rounded-full animate-bounce"></div>
              </div>
              <span className="text-2xl lg:text-3xl font-bold bg-gradient-to-r from-pink-600 via-purple-600 to-pink-600 bg-clip-text text-transparent animate-gradient-x bg-[length:200%_200%]">
                PawHaven
              </span>
            </Link>
          </div>

          {/* Desktop Navigation - Visible only on lg+ screens */}
          <div className="sm:hidden md:hidden lg:flex items-center space-x-1">
            {navigation.map((item, index) => (
              <Link
                key={item.name}
                to={item.href}
                className={`relative px-4 xl:px-6 py-3 rounded-xl text-base font-semibold transition-all duration-300 hover:scale-105 group overflow-hidden ${
                  isActive(item.href)
                    ? 'text-white bg-gradient-to-r from-pink-500 to-purple-600 shadow-lg shadow-pink-200/50'
                    : 'text-gray-700 hover:text-pink-600 hover:bg-pink-50/80'
                }`}
                style={{ 
                  animationDelay: `${index * 0.1}s`,
                  animationFillMode: 'both'
                }}
              >
                <span className="flex items-center space-x-2 relative z-10">
                  <span className="text-lg transition-transform duration-300 group-hover:scale-125">{item.icon}</span>
                  <span>{item.name}</span>
                </span>
                
                {/* Hover effect background */}
                {!isActive(item.href) && (
                  <div className="absolute inset-0 bg-gradient-to-r from-pink-500 to-purple-600 opacity-0 group-hover:opacity-10 transition-all duration-300 rounded-xl"></div>
                )}
                
                {/* Active indicator */}
                {isActive(item.href) && (
                  <div className="absolute -bottom-1 left-1/2 transform -translate-x-1/2 w-6 h-1 bg-white rounded-full shadow-sm"></div>
                )}
                
                {/* Ripple effect on hover */}
                <div className="absolute inset-0 overflow-hidden rounded-xl">
                  <div className="absolute -left-full top-0 h-full w-full bg-gradient-to-r from-transparent via-white/20 to-transparent transform skew-x-12 group-hover:left-full transition-all duration-700"></div>
                </div>
              </Link>
            ))}
          </div>

          {/* Desktop Right Section - User Actions */}
          <div className="sm:hidden md:hidden lg:flex items-center space-x-3">
            {/* Search Button */}
            <button className="group p-3 text-gray-600 hover:text-pink-600 hover:bg-pink-50 rounded-xl transition-all duration-300 hover:scale-110 relative overflow-hidden">
              <FaSearch className="h-4 w-4 transition-transform duration-300 group-hover:scale-110" />
              <div className="absolute inset-0 bg-pink-100 opacity-0 group-hover:opacity-100 transition-opacity duration-300 rounded-xl"></div>
            </button>
            
            {user ? (
              <div className="flex items-center space-x-3">
                {/* Notifications */}
                <button className="group relative p-3 text-gray-600 hover:text-pink-600 hover:bg-pink-50 rounded-xl transition-all duration-300 hover:scale-110 overflow-hidden">
                  <FaBell className="h-4 w-4 transition-transform duration-300 group-hover:scale-110" />
                  <span className="absolute -top-1 -right-1 w-3 h-3 bg-red-500 rounded-full animate-pulse"></span>
                  <div className="absolute inset-0 bg-pink-100 opacity-0 group-hover:opacity-100 transition-opacity duration-300 rounded-xl"></div>
                </button>
                
                {/* Watchlist */}
                <Link
                  to="/watchlist"
                  className="group relative p-3 text-gray-600 hover:text-pink-600 hover:bg-pink-50 rounded-xl transition-all duration-300 hover:scale-110 overflow-hidden"
                >
                  <FaHeart className="h-4 w-4 transition-transform duration-300 group-hover:scale-110" />
                  <span className="absolute -top-2 -right-2 bg-pink-500 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center font-medium group-hover:scale-110 transition-transform shadow-lg">
                    3
                  </span>
                  <div className="absolute inset-0 bg-pink-100 opacity-0 group-hover:opacity-100 transition-opacity duration-300 rounded-xl"></div>
                </Link>
                
                {/* User Menu */}
                <div className="dropdown dropdown-end">
                  <div tabIndex={0} role="button" className="btn btn-ghost btn-circle hover:bg-pink-50 hover:text-pink-600 border-2 border-transparent hover:border-pink-200 transition-all duration-300">
                    <div className="w-8 h-8 rounded-full bg-gradient-to-r from-pink-400 to-purple-500 flex items-center justify-center text-white font-semibold shadow-lg">
                      {user.photoURL ? (
                        <img src={user.photoURL} alt="Profile" className="w-full h-full rounded-full object-cover" />
                      ) : (
                        user.displayName?.[0] || user.email?.[0] || 'U'
                      )}
                    </div>
                  </div>
                  <ul tabIndex={0} className="mt-3 z-[1] p-3 shadow-2xl menu menu-sm dropdown-content bg-white/95 backdrop-blur-xl rounded-2xl w-64 border border-pink-100/50">
                    <li className="mb-2">
                      <div className="px-4 py-3 bg-gradient-to-r from-pink-50 to-purple-50 rounded-xl">
                        <div className="font-semibold text-gray-800">{user.displayName || 'User'}</div>
                        <div className="text-sm text-gray-500 truncate">{user.email}</div>
                      </div>
                    </li>
                    <li><Link to="/profile" className="hover:bg-pink-50 hover:text-pink-600 rounded-xl transition-all duration-200">👤 Profile</Link></li>
                    <li><Link to="/applications" className="hover:bg-pink-50 hover:text-pink-600 rounded-xl transition-all duration-200">📋 My Applications</Link></li>
                    <li><Link to="/donations" className="hover:bg-pink-50 hover:text-pink-600 rounded-xl transition-all duration-200">💝 My Donations</Link></li>
                    <div className="divider my-2"></div>
                    <li>
                      <button 
                        onClick={async () => {
                          await logOut();
                          navigate('/');
                        }}
                        className="hover:bg-red-50 hover:text-red-600 rounded-xl w-full text-left transition-all duration-200"
                        disabled={loading}
                      >
                        <FaSignOutAlt className="mr-2" />
                        Logout
                      </button>
                    </li>
                  </ul>
                </div>
              </div>
            ) : (
              <div className="flex items-center space-x-3">
                <Link
                  to="/auth"
                  className="px-4 py-2 text-gray-700 hover:text-pink-600 font-medium transition-all duration-300 hover:scale-105 relative overflow-hidden rounded-lg hover:bg-pink-50"
                >
                  Login
                </Link>
                <Link
                  to="/auth"
                  className="relative px-6 py-3 bg-gradient-to-r from-pink-500 to-purple-600 text-white rounded-xl hover:from-pink-600 hover:to-purple-700 transition-all duration-300 hover:scale-105 hover:shadow-xl font-semibold overflow-hidden group"
                >
                  <span className="relative z-10">Sign Up</span>
                  <div className="absolute inset-0 bg-gradient-to-r from-pink-600 to-purple-700 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                </Link>
              </div>
            )}
          </div>

          {/* Mobile Menu Button - Hidden on lg+ screens */}
          <div className="sm:flex lg:hidden items-center space-x-3">
            {/* Mobile User Avatar (if logged in) */}
            {user && (
              <div className="w-8 h-8 rounded-full bg-gradient-to-r from-pink-400 to-purple-500 flex items-center justify-center text-white font-semibold text-sm">
                {user.photoURL ? (
                  <img src={user.photoURL} alt="Profile" className="w-full h-full rounded-full object-cover" />
                ) : (
                  user.displayName?.[0] || user.email?.[0] || 'U'
                )}
              </div>
            )}
            
            {/* Hamburger Menu Button */}
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="relative p-2 text-gray-700 hover:text-pink-600 hover:bg-pink-50 rounded-xl transition-all duration-300 hover:scale-110 group overflow-hidden"
              aria-label="Toggle menu"
            >
              <div className="w-6 h-6 flex flex-col justify-center items-center">
                <div className={`w-5 h-0.5 bg-current transition-all duration-300 ${isMenuOpen ? 'rotate-45 translate-y-0.5' : '-translate-y-1'}`}></div>
                <div className={`w-5 h-0.5 bg-current transition-all duration-300 ${isMenuOpen ? 'opacity-0' : 'opacity-100'}`}></div>
                <div className={`w-5 h-0.5 bg-current transition-all duration-300 ${isMenuOpen ? '-rotate-45 -translate-y-0.5' : 'translate-y-1'}`}></div>
              </div>
              <div className="absolute inset-0 bg-pink-100 opacity-0 group-hover:opacity-100 transition-opacity duration-300 rounded-xl"></div>
            </button>
          </div>
        </div>

        {/* Mobile Navigation Menu - Hidden on lg+ screens */}
        <div className={` lg:hidden transition-all duration-500 overflow-hidden ${
          isMenuOpen 
            ? 'max-h-screen opacity-100 translate-y-0' 
            : 'max-h-0 opacity-0 -translate-y-4'
        }`}>
          <div className="px-4 pt-4 pb-6 space-y-2 bg-white/95 backdrop-blur-xl border-t border-pink-100/50">
            {/* Mobile Navigation Links */}
            {navigation.map((item, index) => (
              <Link
                key={item.name}
                to={item.href}
                className={`block px-4 py-3 text-base font-semibold rounded-xl transition-all duration-300 hover:scale-105 group relative overflow-hidden ${
                  isActive(item.href)
                    ? 'text-white bg-gradient-to-r from-pink-500 to-purple-600 shadow-lg shadow-pink-200/50'
                    : 'text-gray-700 hover:text-pink-600 hover:bg-pink-50'
                }`}
                onClick={() => setIsMenuOpen(false)}
                style={{ 
                  animationDelay: `${index * 0.1}s`,
                }}
              >
                <span className="flex items-center space-x-3 relative z-10">
                  <span className="text-lg transition-transform duration-300 group-hover:scale-125">{item.icon}</span>
                  <span>{item.name}</span>
                </span>
                {!isActive(item.href) && (
                  <div className="absolute inset-0 bg-gradient-to-r from-pink-500 to-purple-600 opacity-0 group-hover:opacity-10 transition-opacity duration-300 rounded-xl"></div>
                )}
              </Link>
            ))}
            
            {/* Mobile Search */}
            <button className="w-full px-4 py-3 text-gray-700 hover:text-pink-600 hover:bg-pink-50 rounded-xl transition-all duration-300 text-left group relative overflow-hidden">
              <span className="flex items-center space-x-3 relative z-10">
                <FaSearch className="h-4 w-4 transition-transform duration-300 group-hover:scale-125" />
                <span>Search Pets</span>
              </span>
              <div className="absolute inset-0 bg-pink-100 opacity-0 group-hover:opacity-50 transition-opacity duration-300 rounded-xl"></div>
            </button>
            
            {/* Mobile Auth Section */}
            <div className="pt-4 border-t border-pink-100 mt-4">
              {user ? (
                <div className="space-y-2">
                  <div className="px-4 py-3 bg-gradient-to-r from-pink-50 to-purple-50 rounded-xl">
                    <div className="font-semibold text-gray-800">{user.displayName || 'User'}</div>
                    <div className="text-sm text-gray-500 truncate">{user.email}</div>
                  </div>
                  
                  <Link to="/profile" className="block px-4 py-3 text-base font-medium text-gray-700 hover:text-pink-600 hover:bg-pink-50 rounded-xl transition-all duration-300 group">
                    <span className="flex items-center space-x-3">
                      <span className="transition-transform duration-300 group-hover:scale-125">👤</span>
                      <span>Profile</span>
                    </span>
                  </Link>
                  
                  <Link to="/watchlist" className="block px-4 py-3 text-base font-medium text-gray-700 hover:text-pink-600 hover:bg-pink-50 rounded-xl transition-all duration-300 group">
                    <span className="flex items-center space-x-3">
                      <span className="transition-transform duration-300 group-hover:scale-125">❤️</span>
                      <span>Watchlist</span>
                      <span className="ml-auto bg-pink-500 text-white text-xs rounded-full w-6 h-6 flex items-center justify-center font-medium shadow-lg">3</span>
                    </span>
                  </Link>
                  
                  <Link to="/applications" className="block px-4 py-3 text-base font-medium text-gray-700 hover:text-pink-600 hover:bg-pink-50 rounded-xl transition-all duration-300 group">
                    <span className="flex items-center space-x-3">
                      <span className="transition-transform duration-300 group-hover:scale-125">📋</span>
                      <span>My Applications</span>
                    </span>
                  </Link>
                  
                  <button
                    onClick={async () => {
                      await logOut();
                      navigate('/');
                      setIsMenuOpen(false);
                    }}
                    className="block w-full text-left px-4 py-3 text-base font-medium text-red-600 hover:bg-red-50 rounded-xl transition-all duration-300 group"
                    disabled={loading}
                  >
                    <span className="flex items-center space-x-3">
                      <FaSignOutAlt className="transition-transform duration-300 group-hover:scale-125" />
                      <span>Logout</span>
                    </span>
                  </button>
                </div>
              ) : (
                <div className="space-y-3">
                  <Link 
                    to="/auth" 
                    className="block px-4 py-3 text-base font-medium text-gray-700 hover:text-pink-600 hover:bg-pink-50 rounded-xl transition-all duration-300 group"
                    onClick={() => setIsMenuOpen(false)}
                  >
                    <span className="flex items-center space-x-3">
                      <FaSignInAlt className="transition-transform duration-300 group-hover:scale-125" />
                      <span>Login</span>
                    </span>
                  </Link>
                  <Link 
                    to="/auth" 
                    className="block px-4 py-3 text-base font-semibold bg-gradient-to-r from-pink-500 to-purple-600 text-white rounded-xl hover:from-pink-600 hover:to-purple-700 transition-all duration-300 text-center hover:scale-105 shadow-lg"
                    onClick={() => setIsMenuOpen(false)}
                  >
                    Sign Up
                  </Link>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;