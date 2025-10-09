import { useState } from 'react';
import { Link } from 'react-router-dom';
import { FaHeart, FaRegHeart, FaStar, FaShoppingCart, FaEye } from 'react-icons/fa';
import { motion } from 'framer-motion';
import { useWatchlist } from '../contexts/WatchlistContext';
import { useAuth } from '../Providers/AuthProvider';
import toast from 'react-hot-toast';
import { paymentAPI } from '../services/api';

const ProductCard = ({ product, index = 0 }) => {
  const [imageLoading, setImageLoading] = useState(true);
  const [imageError, setImageError] = useState(false);
  const { isInWatchlist, addToWatchlist, removeFromWatchlist } = useWatchlist();
  const { user } = useAuth();
  
  // Map backend fields to component fields
  const productId = product.accId || product.id;
  const isWishlisted = isInWatchlist(productId);
  const stockCount = product.quantity || 0;
  const inStock = product.isActive && stockCount > 0;
  const category = product.type || 'Accessory';
  const discount = 0; // Backend doesn't have originalPrice

  const handleWatchlistToggle = (e) => {
    e.preventDefault();
    e.stopPropagation();
    
    if (!user) {
      toast.error('Please login to add items to watchlist 🔒');
      return;
    }

    if (isWishlisted) {
      removeFromWatchlist(productId);
    } else {
      addToWatchlist({ ...product, id: productId });
    }
  };

  const handleBuyNow = async (e) => {
    e.preventDefault();
    e.stopPropagation();
    
    if (!user) {
      toast.error('Please login to purchase items 🔒');
      return;
    }

    // Auto-sync user data if needed (same as DonatePage)
    let currentUser = user;
    let userId = currentUser.id;
    let userEmail = currentUser.email;
    let userName = currentUser.name || currentUser.displayName;

    // If user doesn't have backend ID, fetch from database
    if (!userId || typeof userId === 'string') {
      try {
        const response = await fetch(`http://localhost:8080/api/users/email/${userEmail}`);
        if (response.ok) {
          const backendUser = await response.json();
          localStorage.setItem('pawhaven_user', JSON.stringify(backendUser));
          currentUser = backendUser;
          userId = backendUser.id;
          userName = backendUser.name;
          console.log('Auto-synced user with database for purchase:', backendUser);
        } else {
          toast.error('Please login with your PawHaven account first');
          return;
        }
      } catch (error) {
        console.error('Error fetching user data:', error);
        toast.error('Failed to verify user account');
        return;
      }
    }

    // Create payment record for accessory purchase
    const loadingToast = toast.loading('Processing your purchase...');
    
    try {
      const paymentData = {
        user: {
          id: userId,
          email: userEmail,
          name: userName
        },
        amount: parseFloat(product.price),
        purpose: `Accessory Purchase: ${product.name}`,
        tranId: `ACC-${Date.now()}-${userId}`,
        status: 'PENDING',
        paymentMethod: 'ONLINE',
        currency: 'USD',
        notes: `Purchased 1x ${product.name} (${product.brand || 'Generic'}) - ${product.type}`
      };

      console.log('Creating purchase order:', paymentData);
      const response = await paymentAPI.createPayment(paymentData);
      
      console.log('Purchase order created:', response.data);
      toast.success(`🎉 Order placed for ${product.name}! Status: PENDING`, {
        duration: 4000,
        icon: '✅'
      });
      
    } catch (error) {
      console.error('Error creating purchase order:', error);
      toast.error('Failed to place order. Please try again.');
    } finally {
      toast.dismiss(loadingToast);
    }
  };

  const handleImageLoad = () => {
    setImageLoading(false);
  };

  const handleImageError = () => {
    setImageLoading(false);
    setImageError(true);
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 50 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: index * 0.1, duration: 0.6 }}
      className="group"
    >
      <Link to={`/accessories/${product.id}`} className="block">
        <div className="bg-white rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-2 overflow-hidden border border-gray-100">
          {/* Product Image */}
          <div className="relative overflow-hidden aspect-square">
            {/* Stock Status */}
            {!inStock && (
              <div className="absolute top-3 left-3 z-10">
                <span className="bg-gray-500 text-white px-2 py-1 rounded-full text-xs font-bold shadow-lg">
                  Out of Stock
                </span>
              </div>
            )}
            
            {/* Active Badge */}
            {product.isActive && inStock && (
              <div className="absolute top-3 left-3 z-10">
                <span className="bg-gradient-to-r from-green-500 to-emerald-500 text-white px-2 py-1 rounded-full text-xs font-bold shadow-lg">
                  Available
                </span>
              </div>
            )}

            {/* Watchlist Button */}
            <button
              onClick={handleWatchlistToggle}
              className="absolute top-3 right-3 z-10 w-10 h-10 bg-white/90 backdrop-blur-sm rounded-full flex items-center justify-center shadow-lg hover:bg-white hover:scale-110 transition-all duration-300"
              title={isWishlisted ? 'Remove from watchlist' : 'Add to watchlist'}
            >
              {isWishlisted ? (
                <FaHeart className="text-red-500 text-lg" />
              ) : (
                <FaRegHeart className="text-gray-600 text-lg group-hover:text-red-500 transition-colors" />
              )}
            </button>

            {/* Product Image */}
            <div className="w-full h-full bg-gray-100 flex items-center justify-center">
              {imageLoading && (
                <div className="animate-pulse bg-gray-200 w-full h-full flex items-center justify-center">
                  <div className="w-16 h-16 border-4 border-pink-200 border-t-pink-500 rounded-full animate-spin"></div>
                </div>
              )}
              
              {imageError ? (
                <div className="w-full h-full bg-gradient-to-br from-pink-100 to-purple-100 flex items-center justify-center">
                  <div className="text-center text-gray-500">
                    <FaEye className="text-4xl mb-2 mx-auto" />
                    <p className="text-sm">Image not available</p>
                  </div>
                </div>
              ) : (
                <img
                  src={product.image}
                  alt={product.name}
                  className={`w-full h-full object-cover transition-transform duration-700 group-hover:scale-110 ${
                    imageLoading ? 'opacity-0' : 'opacity-100'
                  }`}
                  onLoad={handleImageLoad}
                  onError={handleImageError}
                />
              )}
            </div>

            {/* Quick View Overlay */}
            <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-all duration-300 flex items-center justify-center">
              <div className="opacity-0 group-hover:opacity-100 transform translate-y-4 group-hover:translate-y-0 transition-all duration-300">
                <span className="bg-white text-gray-800 px-4 py-2 rounded-full text-sm font-semibold shadow-lg flex items-center space-x-2">
                  <FaEye />
                  <span>Quick View</span>
                </span>
              </div>
            </div>
          </div>

          {/* Product Info */}
          <div className="p-4">
            {/* Category */}
            <p className="text-xs text-pink-600 font-medium uppercase tracking-wide mb-1">
              {category}
            </p>

            {/* Product Name */}
            <h3 className="font-bold text-gray-800 text-lg mb-2 line-clamp-2 group-hover:text-pink-600 transition-colors">
              {product.name}
            </h3>

            {/* Brand */}
            {product.brand && (
              <div className="flex items-center mb-3">
                <span className="text-sm text-gray-600">
                  Brand: <span className="font-semibold">{product.brand}</span>
                </span>
              </div>
            )}

            {/* Price */}
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center space-x-2">
                <span className="text-2xl font-bold text-gray-800">
                  ${product.price?.toFixed(2) || '0.00'}
                </span>
              </div>
              
              {stockCount <= 5 && inStock && (
                <span className="text-xs text-orange-600 font-medium">
                  Only {stockCount} left!
                </span>
              )}
            </div>

            {/* Action Buttons */}
            <div className="flex space-x-2">
              <button
                onClick={handleBuyNow}
                disabled={!inStock}
                className={`flex-1 py-3 px-4 rounded-xl font-semibold transition-all duration-300 flex items-center justify-center space-x-2 ${
                  inStock
                    ? 'bg-gradient-to-r from-pink-500 to-purple-500 text-white hover:from-pink-600 hover:to-purple-600 hover:shadow-lg transform hover:scale-105'
                    : 'bg-gray-200 text-gray-500 cursor-not-allowed'
                }`}
              >
                <FaShoppingCart className="text-sm" />
                <span>{inStock ? 'Buy Now' : 'Out of Stock'}</span>
              </button>
            </div>

            {/* Features Preview */}
            {product.features && product.features.length > 0 && (
              <div className="mt-3 pt-3 border-t border-gray-100">
                <p className="text-xs text-gray-600 line-clamp-2">
                  ✨ {product.features.slice(0, 2).join(' • ')}
                </p>
              </div>
            )}
          </div>
        </div>
      </Link>
    </motion.div>
  );
};

export default ProductCard;