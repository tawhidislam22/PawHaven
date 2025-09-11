import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useForm, Controller } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import { 
  Eye, 
  EyeOff, 
  Mail, 
  Lock, 
  User, 
  Phone, 
  MapPin,
  Check,
  ArrowRight
} from 'lucide-react';
import { FaGoogle, FaFacebook, FaTwitter, FaPaw } from 'react-icons/fa';

// Validation schemas
const loginSchema = yup.object({
  email: yup.string().email('Invalid email').required('Email is required'),
  password: yup.string().min(6, 'Password must be at least 6 characters').required('Password is required')
});

const registerSchema = yup.object({
  firstName: yup.string().required('First name is required'),
  lastName: yup.string().required('Last name is required'),
  email: yup.string().email('Invalid email').required('Email is required'),
  password: yup.string()
    .min(8, 'Password must be at least 8 characters')
    .matches(/[A-Z]/, 'Password must contain at least one uppercase letter')
    .matches(/[a-z]/, 'Password must contain at least one lowercase letter')
    .matches(/\d/, 'Password must contain at least one number')
    .required('Password is required'),
  confirmPassword: yup.string()
    .oneOf([yup.ref('password')], 'Passwords must match')
    .required('Please confirm your password'),
  phone: yup.string().matches(/^[+]?[1-9][\d]{0,15}$/, 'Invalid phone number'),
  city: yup.string(),
  acceptTerms: yup.boolean().oneOf([true], 'You must accept the terms and conditions')
});

const AuthForm = ({ onLogin, onRegister, initialMode = 'login' }) => {
  const [mode, setMode] = useState(initialMode); // 'login' or 'register'
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const schema = mode === 'login' ? loginSchema : registerSchema;
  
  const { control, handleSubmit, formState: { errors }, reset, watch } = useForm({
    resolver: yupResolver(schema),
    mode: 'onChange'
  });

  const watchedPassword = watch('password');

  const getPasswordStrength = (password) => {
    if (!password) return { score: 0, label: '' };
    
    let score = 0;
    if (password.length >= 8) score++;
    if (/[A-Z]/.test(password)) score++;
    if (/[a-z]/.test(password)) score++;
    if (/\d/.test(password)) score++;
    if (/[^A-Za-z\d]/.test(password)) score++;

    const labels = ['', 'Very Weak', 'Weak', 'Fair', 'Good', 'Strong'];
    const colors = ['', 'bg-red-500', 'bg-orange-500', 'bg-yellow-500', 'bg-green-500', 'bg-emerald-500'];
    
    return { score, label: labels[score], color: colors[score] };
  };

  const onSubmit = async (data) => {
    setIsLoading(true);
    try {
      if (mode === 'login') {
        await onLogin(data);
      } else {
        await onRegister(data);
      }
    } finally {
      setIsLoading(false);
    }
  };

  const toggleMode = () => {
    setMode(mode === 'login' ? 'register' : 'login');
    reset();
    setShowPassword(false);
    setShowConfirmPassword(false);
  };

  const handleSocialLogin = (provider) => {
    console.log(`Login with ${provider}`);
    // Implement social login logic
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-pink-50 via-purple-50 to-indigo-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full space-y-8">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center"
        >
          <div className="mx-auto h-16 w-16 bg-gradient-to-r from-pink-500 to-purple-600 rounded-full flex items-center justify-center mb-6">
            <FaPaw className="h-8 w-8 text-white" />
          </div>
          <h2 className="text-3xl font-extrabold text-gray-900">
            {mode === 'login' ? 'Welcome back!' : 'Join PawHaven'}
          </h2>
          <p className="mt-2 text-sm text-gray-600">
            {mode === 'login' 
              ? 'Sign in to your account to continue helping pets find homes'
              : 'Create an account to start your pet adoption journey'
            }
          </p>
        </motion.div>

        {/* Form Card */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="bg-white rounded-2xl shadow-xl p-8 space-y-6"
        >
          {/* Social Login Buttons */}
          <div className="space-y-3">
            <button
              type="button"
              onClick={() => handleSocialLogin('google')}
              className="w-full flex items-center justify-center px-4 py-3 border border-gray-300 rounded-lg shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 transition-colors"
            >
              <FaGoogle className="h-5 w-5 text-red-500 mr-3" />
              Continue with Google
            </button>
            
            <div className="grid grid-cols-2 gap-3">
              <button
                type="button"
                onClick={() => handleSocialLogin('facebook')}
                className="flex items-center justify-center px-4 py-3 border border-gray-300 rounded-lg shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 transition-colors"
              >
                <FaFacebook className="h-5 w-5 text-blue-600 mr-2" />
                Facebook
              </button>
              <button
                type="button"
                onClick={() => handleSocialLogin('twitter')}
                className="flex items-center justify-center px-4 py-3 border border-gray-300 rounded-lg shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 transition-colors"
              >
                <FaTwitter className="h-5 w-5 text-blue-400 mr-2" />
                Twitter
              </button>
            </div>
          </div>

          {/* Divider */}
          <div className="relative">
            <div className="absolute inset-0 flex items-center">
              <div className="w-full border-t border-gray-300" />
            </div>
            <div className="relative flex justify-center text-sm">
              <span className="px-2 bg-white text-gray-500">Or continue with email</span>
            </div>
          </div>

          {/* Form */}
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
            <AnimatePresence mode="wait">
              <motion.div
                key={mode}
                initial={{ opacity: 0, x: mode === 'login' ? -20 : 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: mode === 'login' ? 20 : -20 }}
                transition={{ duration: 0.3 }}
                className="space-y-4"
              >
                {mode === 'register' && (
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        First Name
                      </label>
                      <Controller
                        name="firstName"
                        control={control}
                        render={({ field }) => (
                          <div className="relative">
                            <User className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
                            <input
                              {...field}
                              type="text"
                              placeholder="John"
                              className={`w-full pl-10 pr-4 py-3 border rounded-lg focus:outline-none transition-colors ${
                                errors.firstName 
                                  ? 'border-red-500 focus:border-red-500' 
                                  : 'border-gray-300 focus:border-pink-500'
                              }`}
                            />
                          </div>
                        )}
                      />
                      {errors.firstName && (
                        <p className="mt-1 text-sm text-red-600">{errors.firstName.message}</p>
                      )}
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Last Name
                      </label>
                      <Controller
                        name="lastName"
                        control={control}
                        render={({ field }) => (
                          <div className="relative">
                            <User className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
                            <input
                              {...field}
                              type="text"
                              placeholder="Doe"
                              className={`w-full pl-10 pr-4 py-3 border rounded-lg focus:outline-none transition-colors ${
                                errors.lastName 
                                  ? 'border-red-500 focus:border-red-500' 
                                  : 'border-gray-300 focus:border-pink-500'
                              }`}
                            />
                          </div>
                        )}
                      />
                      {errors.lastName && (
                        <p className="mt-1 text-sm text-red-600">{errors.lastName.message}</p>
                      )}
                    </div>
                  </div>
                )}

                {/* Email */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Email Address
                  </label>
                  <Controller
                    name="email"
                    control={control}
                    render={({ field }) => (
                      <div className="relative">
                        <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
                        <input
                          {...field}
                          type="email"
                          placeholder="john@example.com"
                          className={`w-full pl-10 pr-4 py-3 border rounded-lg focus:outline-none transition-colors ${
                            errors.email 
                              ? 'border-red-500 focus:border-red-500' 
                              : 'border-gray-300 focus:border-pink-500'
                          }`}
                        />
                      </div>
                    )}
                  />
                  {errors.email && (
                    <p className="mt-1 text-sm text-red-600">{errors.email.message}</p>
                  )}
                </div>

                {mode === 'register' && (
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Phone
                      </label>
                      <Controller
                        name="phone"
                        control={control}
                        render={({ field }) => (
                          <div className="relative">
                            <Phone className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
                            <input
                              {...field}
                              type="tel"
                              placeholder="+1234567890"
                              className={`w-full pl-10 pr-4 py-3 border rounded-lg focus:outline-none transition-colors ${
                                errors.phone 
                                  ? 'border-red-500 focus:border-red-500' 
                                  : 'border-gray-300 focus:border-pink-500'
                              }`}
                            />
                          </div>
                        )}
                      />
                      {errors.phone && (
                        <p className="mt-1 text-sm text-red-600">{errors.phone.message}</p>
                      )}
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        City
                      </label>
                      <Controller
                        name="city"
                        control={control}
                        render={({ field }) => (
                          <div className="relative">
                            <MapPin className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
                            <input
                              {...field}
                              type="text"
                              placeholder="New York"
                              className={`w-full pl-10 pr-4 py-3 border rounded-lg focus:outline-none transition-colors ${
                                errors.city 
                                  ? 'border-red-500 focus:border-red-500' 
                                  : 'border-gray-300 focus:border-pink-500'
                              }`}
                            />
                          </div>
                        )}
                      />
                      {errors.city && (
                        <p className="mt-1 text-sm text-red-600">{errors.city.message}</p>
                      )}
                    </div>
                  </div>
                )}

                {/* Password */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Password
                  </label>
                  <Controller
                    name="password"
                    control={control}
                    render={({ field }) => (
                      <div className="relative">
                        <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
                        <input
                          {...field}
                          type={showPassword ? 'text' : 'password'}
                          placeholder="••••••••"
                          className={`w-full pl-10 pr-12 py-3 border rounded-lg focus:outline-none transition-colors ${
                            errors.password 
                              ? 'border-red-500 focus:border-red-500' 
                              : 'border-gray-300 focus:border-pink-500'
                          }`}
                        />
                        <button
                          type="button"
                          onClick={() => setShowPassword(!showPassword)}
                          className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600"
                        >
                          {showPassword ? <EyeOff className="h-5 w-5" /> : <Eye className="h-5 w-5" />}
                        </button>
                      </div>
                    )}
                  />
                  
                  {/* Password Strength Indicator for Register */}
                  {mode === 'register' && watchedPassword && (
                    <div className="mt-2">
                      {(() => {
                        const strength = getPasswordStrength(watchedPassword);
                        return (
                          <div>
                            <div className="flex justify-between text-sm mb-1">
                              <span className="text-gray-600">Password strength:</span>
                              <span className={`font-medium ${
                                strength.score <= 2 ? 'text-red-600' : 
                                strength.score <= 3 ? 'text-yellow-600' : 'text-green-600'
                              }`}>
                                {strength.label}
                              </span>
                            </div>
                            <div className="w-full bg-gray-200 rounded-full h-2">
                              <div 
                                className={`h-2 rounded-full transition-all duration-300 ${strength.color}`}
                                style={{ width: `${(strength.score / 5) * 100}%` }}
                              />
                            </div>
                          </div>
                        );
                      })()}
                    </div>
                  )}
                  
                  {errors.password && (
                    <p className="mt-1 text-sm text-red-600">{errors.password.message}</p>
                  )}
                </div>

                {/* Confirm Password for Register */}
                {mode === 'register' && (
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Confirm Password
                    </label>
                    <Controller
                      name="confirmPassword"
                      control={control}
                      render={({ field }) => (
                        <div className="relative">
                          <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
                          <input
                            {...field}
                            type={showConfirmPassword ? 'text' : 'password'}
                            placeholder="••••••••"
                            className={`w-full pl-10 pr-12 py-3 border rounded-lg focus:outline-none transition-colors ${
                              errors.confirmPassword 
                                ? 'border-red-500 focus:border-red-500' 
                                : 'border-gray-300 focus:border-pink-500'
                            }`}
                          />
                          <button
                            type="button"
                            onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                            className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600"
                          >
                            {showConfirmPassword ? <EyeOff className="h-5 w-5" /> : <Eye className="h-5 w-5" />}
                          </button>
                        </div>
                      )}
                    />
                    {errors.confirmPassword && (
                      <p className="mt-1 text-sm text-red-600">{errors.confirmPassword.message}</p>
                    )}
                  </div>
                )}

                {/* Terms and Conditions for Register */}
                {mode === 'register' && (
                  <div>
                    <Controller
                      name="acceptTerms"
                      control={control}
                      render={({ field }) => (
                        <label className="flex items-start space-x-3 cursor-pointer">
                          <input
                            type="checkbox"
                            {...field}
                            className="w-5 h-5 text-pink-600 bg-gray-100 border-gray-300 rounded focus:ring-pink-500 focus:ring-2 mt-1"
                          />
                          <span className="text-sm text-gray-700">
                            I agree to the{' '}
                            <a href="#" className="text-pink-600 hover:text-pink-500 font-medium">
                              Terms and Conditions
                            </a>{' '}
                            and{' '}
                            <a href="#" className="text-pink-600 hover:text-pink-500 font-medium">
                              Privacy Policy
                            </a>
                          </span>
                        </label>
                      )}
                    />
                    {errors.acceptTerms && (
                      <p className="mt-1 text-sm text-red-600">{errors.acceptTerms.message}</p>
                    )}
                  </div>
                )}

                {/* Submit Button */}
                <button
                  type="submit"
                  disabled={isLoading}
                  className={`w-full flex items-center justify-center px-4 py-3 rounded-lg font-semibold text-white transition-all duration-200 ${
                    isLoading
                      ? 'bg-gray-300 cursor-not-allowed'
                      : 'bg-gradient-to-r from-pink-500 to-purple-600 hover:from-pink-600 hover:to-purple-700 hover:scale-105 shadow-lg'
                  }`}
                >
                  {isLoading ? (
                    <div className="flex items-center">
                      <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white mr-2"></div>
                      {mode === 'login' ? 'Signing in...' : 'Creating account...'}
                    </div>
                  ) : (
                    <div className="flex items-center">
                      {mode === 'login' ? 'Sign in' : 'Create account'}
                      <ArrowRight className="ml-2 h-4 w-4" />
                    </div>
                  )}
                </button>
              </motion.div>
            </AnimatePresence>
          </form>

          {/* Forgot Password for Login */}
          {mode === 'login' && (
            <div className="text-center">
              <a href="#" className="text-sm text-pink-600 hover:text-pink-500">
                Forgot your password?
              </a>
            </div>
          )}

          {/* Mode Toggle */}
          <div className="text-center border-t border-gray-200 pt-6">
            <p className="text-sm text-gray-600">
              {mode === 'login' ? "Don't have an account?" : 'Already have an account?'}{' '}
              <button
                type="button"
                onClick={toggleMode}
                className="font-medium text-pink-600 hover:text-pink-500 transition-colors"
              >
                {mode === 'login' ? 'Sign up' : 'Sign in'}
              </button>
            </p>
          </div>
        </motion.div>

        {/* Features */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="bg-white rounded-xl shadow-lg p-6"
        >
          <h3 className="text-lg font-semibold text-gray-800 mb-4 text-center">
            Join thousands of pet lovers who have found their perfect companion
          </h3>
          <div className="grid grid-cols-2 gap-4 text-sm">
            <div className="flex items-center text-gray-600">
              <Check className="h-4 w-4 text-green-500 mr-2" />
              Browse 500+ pets
            </div>
            <div className="flex items-center text-gray-600">
              <Check className="h-4 w-4 text-green-500 mr-2" />
              Safe adoption process
            </div>
            <div className="flex items-center text-gray-600">
              <Check className="h-4 w-4 text-green-500 mr-2" />
              Expert support
            </div>
            <div className="flex items-center text-gray-600">
              <Check className="h-4 w-4 text-green-500 mr-2" />
              Community forums
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default AuthForm;
