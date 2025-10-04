import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { FaHeart, FaEnvelope, FaPhone, FaMapMarkerAlt, FaFacebook, FaTwitter, FaInstagram, FaPaw, FaLinkedin, FaYoutube, FaArrowUp } from 'react-icons/fa';

const Footer = () => {
  const [email, setEmail] = useState('');
  const [isSubscribed, setIsSubscribed] = useState(false);

  const handleSubscribe = (e) => {
    e.preventDefault();
    if (email) {
      setIsSubscribed(true);
      setEmail('');
      setTimeout(() => setIsSubscribed(false), 3000);
    }
  };



  return (
    <footer className="bg-gradient-to-br from-gray-900 via-purple-900 to-pink-900 text-white relative overflow-hidden">
      {/* Background decoration */}
      <div className="absolute inset-0 opacity-10">
        <div className="absolute top-10 left-10 text-6xl animate-float">🐾</div>
        <div className="absolute top-20 right-20 text-4xl animate-float" style={{ animationDelay: '1s' }}>❤️</div>
        <div className="absolute bottom-20 left-1/4 text-5xl animate-float" style={{ animationDelay: '2s' }}>🐕</div>
        <div className="absolute bottom-10 right-1/3 text-4xl animate-float" style={{ animationDelay: '3s' }}>🐱</div>
      </div>

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Newsletter Section */}
        <div className="text-center mb-12 bg-white/10 backdrop-blur-md rounded-2xl p-8 border border-white/20">
          <h3 className="text-2xl font-bold text-gradient-accent mb-4">Stay Connected with PawHaven</h3>
          <p className="text-gray-300 mb-6 max-w-2xl mx-auto">
            Get updates about new pets, adoption success stories, and helpful pet care tips delivered to your inbox.
          </p>
          <form onSubmit={handleSubscribe} className="max-w-md mx-auto flex gap-3">
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Enter your email address"
              className="flex-1 px-4 py-3 rounded-lg bg-white/90 text-gray-900 placeholder-gray-500 border-0 focus:ring-2 focus:ring-pink-400 transition-all duration-200"
              required
            />
            <button 
              type="submit"
              className="px-6 py-3 bg-gradient-to-r from-pink-500 to-purple-600 text-white rounded-lg hover:from-pink-600 hover:to-purple-700 transition-all duration-200 hover:scale-105 font-semibold"
            >
              {isSubscribed ? '✓ Subscribed!' : 'Subscribe'}
            </button>
          </form>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* Brand Section */}
          <div className="space-y-6">
            <div className="flex items-center space-x-3">
              <FaPaw className="h-8 w-8 text-pink-400 animate-pulse" />
              <span className="text-3xl font-bold text-gradient-primary">PawHaven</span>
            </div>
            <p className="text-gray-300 leading-relaxed">
              Connecting loving families with rescue animals. Every pet deserves a forever home, and every family deserves unconditional love.
            </p>
            <div className="flex space-x-4">
              <a href="#" className="p-2 bg-white/10 rounded-lg text-gray-300 hover:text-pink-400 hover:bg-pink-500/20 transition-all duration-300 hover:scale-110">
                <FaFacebook className="h-5 w-5" />
              </a>
              <a href="#" className="p-2 bg-white/10 rounded-lg text-gray-300 hover:text-blue-400 hover:bg-blue-500/20 transition-all duration-300 hover:scale-110">
                <FaTwitter className="h-5 w-5" />
              </a>
              <a href="#" className="p-2 bg-white/10 rounded-lg text-gray-300 hover:text-pink-500 hover:bg-pink-500/20 transition-all duration-300 hover:scale-110">
                <FaInstagram className="h-5 w-5" />
              </a>
              <a href="#" className="p-2 bg-white/10 rounded-lg text-gray-300 hover:text-blue-600 hover:bg-blue-500/20 transition-all duration-300 hover:scale-110">
                <FaLinkedin className="h-5 w-5" />
              </a>
              <a href="#" className="p-2 bg-white/10 rounded-lg text-gray-300 hover:text-red-500 hover:bg-red-500/20 transition-all duration-300 hover:scale-110">
                <FaYoutube className="h-5 w-5" />
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-lg font-semibold mb-4">Quick Links</h3>
            <ul className="space-y-2">
              <li>
                <Link to="/adopt" className="text-gray-300 hover:text-pink-600 transition-colors duration-200">
                  Adopt a Pet
                </Link>
              </li>
              <li>
                <Link to="/donate" className="text-gray-300 hover:text-pink-600 transition-colors duration-200">
                  Make a Donation
                </Link>
              </li>
              <li>
                <Link to="/volunteer" className="text-gray-300 hover:text-pink-600 transition-colors duration-200">
                  Volunteer
                </Link>
              </li>
              <li>
                <Link to="/about" className="text-gray-300 hover:text-pink-600 transition-colors duration-200">
                  About Us
                </Link>
              </li>
            </ul>
          </div>

          {/* Services */}
          <div>
            <h3 className="text-lg font-semibold mb-4">Services</h3>
            <ul className="space-y-2">
              <li>
                <Link to="/services/veterinary" className="text-gray-300 hover:text-pink-600 transition-colors duration-200">
                  Veterinary Care
                </Link>
              </li>
              <li>
                <Link to="/services/training" className="text-gray-300 hover:text-pink-600 transition-colors duration-200">
                  Pet Training
                </Link>
              </li>
              <li>
                <Link to="/services/grooming" className="text-gray-300 hover:text-pink-600 transition-colors duration-200">
                  Pet Grooming
                </Link>
              </li>
              <li>
                <Link to="/lost-found" className="text-gray-300 hover:text-pink-600 transition-colors duration-200">
                  Lost & Found
                </Link>
              </li>
            </ul>
          </div>

          {/* Contact Info */}
          <div>
            <h3 className="text-lg font-semibold mb-4">Contact Info</h3>
            <ul className="space-y-3">
              <li className="flex items-center space-x-2">
                <FaMapMarkerAlt className="h-4 w-4 text-pink-600" />
                <span className="text-gray-300 text-sm">123 Rescue Street, Pet City, PC 12345</span>
              </li>
              <li className="flex items-center space-x-2">
                <FaPhone className="h-4 w-4 text-pink-600" />
                <span className="text-gray-300 text-sm">+1 (555) 123-4567</span>
              </li>
              <li className="flex items-center space-x-2">
                <FaEnvelope className="h-4 w-4 text-pink-600" />
                <span className="text-gray-300 text-sm">info@pawhaven.org</span>
              </li>
            </ul>
            
            {/* Newsletter Signup */}
            <div className="mt-6">
              <h4 className="text-sm font-semibold mb-2">Stay Updated</h4>
              <div className="flex">
                <input
                  type="email"
                  placeholder="Your email"
                  className="flex-1 px-3 py-2 text-gray-900 bg-white rounded-l-md border-0 focus:ring-2 focus:ring-pink-600"
                />
                <button className="px-4 py-2 bg-pink-600 text-white rounded-r-md hover:bg-pink-700 transition-colors duration-200">
                  Subscribe
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Section */}
        <div className="border-t border-gray-800 mt-8 pt-8">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <p className="text-gray-400 text-sm">
              © 2024 PawHaven. All rights reserved.
            </p>
            <div className="flex space-x-6 mt-4 md:mt-0">
              <Link to="/privacy" className="text-gray-400 hover:text-pink-600 text-sm transition-colors duration-200">
                Privacy Policy
              </Link>
              <Link to="/terms" className="text-gray-400 hover:text-pink-600 text-sm transition-colors duration-200">
                Terms of Service
              </Link>
              <Link to="/cookies" className="text-gray-400 hover:text-pink-600 text-sm transition-colors duration-200">
                Cookie Policy
              </Link>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
