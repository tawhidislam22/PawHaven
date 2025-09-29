import { useState, useEffect } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import { FaHeart, FaRegHeart, FaStar, FaShoppingCart, FaArrowLeft, FaShare, FaTruck, FaShieldAlt, FaUndo } from 'react-icons/fa';
import { accessoriesData } from '../data/accessoriesData';
import { useWatchlist } from '../contexts/WatchlistContext';
import { useAuth } from '../Providers/AuthProvider';
import toast from 'react-hot-toast';

const ProductDetailPage = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { user } = useAuth();
  const { isInWatchlist, addToWatchlist, removeFromWatchlist } = useWatchlist();
  
  const [product, setProduct] = useState(null);
  const [selectedImage, setSelectedImage] = useState(0);
  const [selectedVariant, setSelectedVariant] = useState({});
  const [quantity, setQuantity] = useState(1);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const foundProduct = accessoriesData.find(p => p.id === parseInt(id));
    if (foundProduct) {
      setProduct(foundProduct);
      if (foundProduct.images && foundProduct.images.length > 0) {
        setSelectedImage(0);
      }
    }
    setLoading(false);
  }, [id]);

  const isWishlisted = product ? isInWatchlist(product.id) : false;

  const handleWatchlistToggle = () => {
    if (!user) {
      toast.error('Please login to add items to watchlist 🔒');
      return;
    }

    if (isWishlisted) {
      removeFromWatchlist(product.id);
    } else {
      addToWatchlist(product);
    }
  };

  const handleBuyNow = () => {
    if (!user) {
      toast.error('Please login to purchase items 🔒');
      return;
    }

    if (!product.inStock) {
      toast.error('This item is out of stock');
      return;
    }

    toast.success(`${quantity}x ${product.name} added to cart! 🛒`, {
      duration: 3000,
      icon: '✅'
    });
  };

  const handleShare = async () => {
    if (navigator.share) {
      try {
        await navigator.share({
          title: product.name,
          text: product.description,
          url: window.location.href,
        });
      } catch (err) {
        console.log('Error sharing:', err);
      }
    } else {
      // Fallback: copy to clipboard
      navigator.clipboard.writeText(window.location.href);
      toast.success('Product link copied to clipboard! 📋');
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-pink-50 via-purple-50 to-cyan-50 flex items-center justify-center">
        <div className="text-center">
          <div className="w-16 h-16 border-4 border-pink-200 border-t-pink-500 rounded-full animate-spin mx-auto mb-4"></div>
          <p className="text-gray-600">Loading product details...</p>
        </div>
      </div>
    );
  }

  if (!product) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-pink-50 via-purple-50 to-cyan-50 flex items-center justify-center">
        <div className="text-center">
          <div className="text-6xl mb-4">🔍</div>
          <h2 className="text-2xl font-bold text-gray-800 mb-2">Product Not Found</h2>
          <p className="text-gray-600 mb-6">The product you're looking for doesn't exist.</p>
          <Link
            to="/accessories"
            className="px-6 py-3 bg-gradient-to-r from-pink-500 to-purple-500 text-white rounded-xl font-semibold hover:shadow-lg transition-all duration-300"
          >
            Back to Accessories
          </Link>
        </div>
      </div>
    );
  }

  const discount = product.originalPrice ? Math.round(((product.originalPrice - product.price) / product.originalPrice) * 100) : 0;

  return (
    <div className="min-h-screen bg-gradient-to-br from-pink-50 via-purple-50 to-cyan-50">
      <div className="container mx-auto px-4 py-8">
        {/* Breadcrumb */}
        <nav className="mb-8">
          <button
            onClick={() => navigate(-1)}
            className="flex items-center space-x-2 text-gray-600 hover:text-pink-600 transition-colors mb-4"
          >
            <FaArrowLeft />
            <span>Back</span>
          </button>
          <div className="text-sm text-gray-500">
            <Link to="/accessories" className="hover:text-pink-600">Accessories</Link>
            <span className="mx-2">/</span>
            <span className="capitalize">{product.category}</span>
            <span className="mx-2">/</span>
            <span className="text-gray-800">{product.name}</span>
          </div>
        </nav>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          {/* Product Images */}
          <div>
            <div className="bg-white rounded-2xl shadow-lg overflow-hidden">
              {/* Main Image */}
              <div className="aspect-square bg-gray-100 relative">
                {discount > 0 && (
                  <div className="absolute top-4 left-4 z-10">
                    <span className="bg-gradient-to-r from-red-500 to-pink-500 text-white px-3 py-1 rounded-full text-sm font-bold shadow-lg">
                      -{discount}% OFF
                    </span>
                  </div>
                )}
                
                <img
                  src={product.images ? product.images[selectedImage] : product.image}
                  alt={product.name}
                  className="w-full h-full object-cover"
                />
              </div>

              {/* Thumbnail Images */}
              {product.images && product.images.length > 1 && (
                <div className="p-4">
                  <div className="flex space-x-2 overflow-x-auto">
                    {product.images.map((image, index) => (
                      <button
                        key={index}
                        onClick={() => setSelectedImage(index)}
                        className={`flex-shrink-0 w-16 h-16 rounded-lg overflow-hidden border-2 transition-all duration-300 ${
                          selectedImage === index
                            ? 'border-pink-500 shadow-lg'
                            : 'border-gray-200 hover:border-pink-300'
                        }`}
                      >
                        <img
                          src={image}
                          alt={`${product.name} ${index + 1}`}
                          className="w-full h-full object-cover"
                        />
                      </button>
                    ))}
                  </div>
                </div>
              )}
            </div>
          </div>

          {/* Product Info */}
          <div className="space-y-6">
            {/* Header */}
            <div>
              <p className="text-sm text-pink-600 font-medium uppercase tracking-wide mb-2">
                {product.category.replace(/([A-Z])/g, ' $1').trim()}
              </p>
              <h1 className="text-3xl font-bold text-gray-800 mb-4">{product.name}</h1>
              
              {/* Rating */}
              <div className="flex items-center mb-4">
                <div className="flex items-center">
                  {[...Array(5)].map((_, i) => (
                    <FaStar
                      key={i}
                      className={`text-lg ${
                        i < Math.floor(product.rating)
                          ? 'text-yellow-400'
                          : 'text-gray-200'
                      }`}
                    />
                  ))}
                </div>
                <span className="text-gray-600 ml-3">
                  {product.rating} ({product.reviews} reviews)
                </span>
              </div>
            </div>

            {/* Price */}
            <div className="border-b border-gray-200 pb-6">
              <div className="flex items-center space-x-4 mb-2">
                <span className="text-4xl font-bold text-gray-800">
                  ${product.price}
                </span>
                {product.originalPrice && (
                  <span className="text-xl text-gray-500 line-through">
                    ${product.originalPrice}
                  </span>
                )}
              </div>
              
              {product.stockCount <= 5 && product.inStock && (
                <p className="text-orange-600 font-medium text-sm">
                  🔥 Only {product.stockCount} left in stock!
                </p>
              )}
              
              {!product.inStock && (
                <p className="text-red-600 font-medium">❌ Out of Stock</p>
              )}
            </div>

            {/* Description */}
            <div>
              <h3 className="font-bold text-gray-800 mb-3">Description</h3>
              <p className="text-gray-600 leading-relaxed">{product.description}</p>
            </div>

            {/* Features */}
            {product.features && (
              <div>
                <h3 className="font-bold text-gray-800 mb-3">Key Features</h3>
                <ul className="space-y-2">
                  {product.features.map((feature, index) => (
                    <li key={index} className="flex items-start space-x-2 text-gray-600">
                      <span className="text-green-500 mt-1">✓</span>
                      <span>{feature}</span>
                    </li>
                  ))}
                </ul>
              </div>
            )}

            {/* Variants */}
            {(product.colors || product.sizes) && (
              <div className="space-y-4">
                {product.colors && (
                  <div>
                    <h3 className="font-bold text-gray-800 mb-2">Colors</h3>
                    <div className="flex flex-wrap gap-2">
                      {product.colors.map((color, index) => (
                        <button
                          key={index}
                          onClick={() => setSelectedVariant({...selectedVariant, color})}
                          className={`px-3 py-1 rounded-full text-sm border-2 transition-all duration-300 ${
                            selectedVariant.color === color
                              ? 'border-pink-500 bg-pink-50 text-pink-700'
                              : 'border-gray-200 hover:border-pink-300 text-gray-600'
                          }`}
                        >
                          {color}
                        </button>
                      ))}
                    </div>
                  </div>
                )}

                {product.sizes && (
                  <div>
                    <h3 className="font-bold text-gray-800 mb-2">Sizes</h3>
                    <div className="flex flex-wrap gap-2">
                      {product.sizes.map((size, index) => (
                        <button
                          key={index}
                          onClick={() => setSelectedVariant({...selectedVariant, size})}
                          className={`px-3 py-1 rounded-full text-sm border-2 transition-all duration-300 ${
                            selectedVariant.size === size
                              ? 'border-purple-500 bg-purple-50 text-purple-700'
                              : 'border-gray-200 hover:border-purple-300 text-gray-600'
                          }`}
                        >
                          {size}
                        </button>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            )}

            {/* Quantity */}
            <div>
              <h3 className="font-bold text-gray-800 mb-2">Quantity</h3>
              <div className="flex items-center space-x-4">
                <div className="flex items-center border-2 border-gray-200 rounded-lg">
                  <button
                    onClick={() => setQuantity(Math.max(1, quantity - 1))}
                    className="px-3 py-2 hover:bg-gray-100 transition-colors"
                  >
                    -
                  </button>
                  <span className="px-4 py-2 min-w-[50px] text-center">{quantity}</span>
                  <button
                    onClick={() => setQuantity(quantity + 1)}
                    className="px-3 py-2 hover:bg-gray-100 transition-colors"
                  >
                    +
                  </button>
                </div>
                <span className="text-gray-600">
                  Total: <span className="font-bold text-gray-800">${(product.price * quantity).toFixed(2)}</span>
                </span>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="flex space-x-4">
              <button
                onClick={handleBuyNow}
                disabled={!product.inStock}
                className={`flex-1 py-4 px-6 rounded-xl font-semibold transition-all duration-300 flex items-center justify-center space-x-2 ${
                  product.inStock
                    ? 'bg-gradient-to-r from-pink-500 to-purple-500 text-white hover:from-pink-600 hover:to-purple-600 hover:shadow-lg transform hover:scale-105'
                    : 'bg-gray-200 text-gray-500 cursor-not-allowed'
                }`}
              >
                <FaShoppingCart />
                <span>{product.inStock ? 'Add to Cart' : 'Out of Stock'}</span>
              </button>

              <button
                onClick={handleWatchlistToggle}
                className={`px-6 py-4 rounded-xl border-2 transition-all duration-300 flex items-center justify-center ${
                  isWishlisted
                    ? 'border-red-500 bg-red-50 text-red-600 hover:bg-red-100'
                    : 'border-gray-200 text-gray-600 hover:border-red-300 hover:text-red-500'
                }`}
              >
                {isWishlisted ? <FaHeart /> : <FaRegHeart />}
              </button>

              <button
                onClick={handleShare}
                className="px-6 py-4 rounded-xl border-2 border-gray-200 text-gray-600 hover:border-blue-300 hover:text-blue-500 transition-all duration-300"
              >
                <FaShare />
              </button>
            </div>

            {/* Guarantees */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 pt-6 border-t border-gray-200">
              <div className="flex items-center space-x-3 text-sm text-gray-600">
                <FaTruck className="text-green-500" />
                <span>Free Shipping</span>
              </div>
              <div className="flex items-center space-x-3 text-sm text-gray-600">
                <FaShieldAlt className="text-blue-500" />
                <span>2 Year Warranty</span>
              </div>
              <div className="flex items-center space-x-3 text-sm text-gray-600">
                <FaUndo className="text-orange-500" />
                <span>30 Day Returns</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductDetailPage;