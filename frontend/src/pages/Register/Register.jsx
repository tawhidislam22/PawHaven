import { useForm } from "react-hook-form";
import { Link, useNavigate } from "react-router-dom";
import useAxiosPublic from "../../hooks/useAxiosPublic";
import { userAPI } from "../../services/api";
import { useState } from "react";
import { FaEye, FaEyeSlash, FaPaw, FaHeart, FaUser, FaUserCircle, FaEnvelope, FaLock, FaPhone, FaMapMarkerAlt, FaGoogle, FaUpload, FaDog, FaCat, FaHome } from "react-icons/fa";
import { motion } from "framer-motion";
import toast from "react-hot-toast";
import SocialLogin from "../../components/shared/SocialLogin";
import { useAuth } from "../../Providers/AuthProvider";

const Register = () => {
    const { createUser, updateUserProfile, setUser } = useAuth();
    const [showPassword, setShowPassword] = useState(false);
    const [showConfirmPassword, setShowConfirmPassword] = useState(false);
    const [loading, setLoading] = useState(false);

    const axiosPublic = useAxiosPublic();
    const navigate = useNavigate();

    const {
        register,
        handleSubmit,
        formState: { errors },
        watch,
        reset
    } = useForm();

    const password = watch("password");

    const uploadImage = async (file) => {
        try {
            // Check if API key is available
            const apiKey = import.meta.env.VITE_IMAGE_HOSTING_KEY;
            if (!apiKey) {
                console.warn('Image hosting API key not configured, skipping image upload');
                return null; // Return null instead of throwing error
            }

            
            const imageFile = new FormData();
            imageFile.append('image', file);
            const response = await axiosPublic.post(
                `https://api.imgbb.com/1/upload?key=${import.meta.env.VITE_IMAGE_HOSTING_KEY}`,
                imageFile
            );
            return response.data.data.url;
        } catch (error) {
            console.error('Error uploading image:', error);
            // Don't throw error, just return null to allow registration without image
            toast.error('Image upload failed, but registration will continue without profile photo');
            return null;
        }
    };

    const onSubmit = async (data) => {
        setLoading(true);
        try {
            // Upload profile image if provided
            let photoURL = null;
            if (data.photo && data.photo[0]) {
                try {
                    photoURL = await uploadImage(data.photo[0]);
                } catch {
                    console.warn('Image upload failed, continuing registration without image');
                    photoURL = null;
                }
            }

            // Create user with Firebase (if using Firebase Auth)
            if (createUser) {
                await createUser(data.email, data.password);
                
                // Update profile
                if (updateUserProfile) {
                    await updateUserProfile(data.name, photoURL);
                }
            }

            // Prepare user info for backend API matching User entity structure
            const userInfo = {
                name: data.name,
                email: data.email,
                password: data.password,
                address: data.address || '',
                profileImage: photoURL || '',
                role: data.role || 'USER',
                isActive: true
            };

            // Save user info to database using userAPI
            console.log('Sending user data:', userInfo);
            const dbResponse = await userAPI.register(userInfo);
            console.log('Backend response:', dbResponse.data);

            if (dbResponse.data && dbResponse.data.success) {
                // Fetch the complete user data from database to ensure we have the ID
                const loginResponse = await userAPI.login({ 
                    username: data.email, 
                    password: data.password 
                });
                
                if (loginResponse.data.success) {
                    // Store complete user data with ID in localStorage
                    localStorage.setItem('pawhaven_user', JSON.stringify(loginResponse.data.user));
                    localStorage.setItem('pawhaven_token', 'backend_auth_token');
                    
                    // Update user in auth context with complete database user data
                    setUser(loginResponse.data.user);
                    
                    toast.success(`Welcome to PawHaven, ${loginResponse.data.user.name}! 🐾`);
                    reset();
                    navigate('/dashboard'); // Redirect to dashboard after registration
                } else {
                    toast.success('Registration successful! Please login.');
                    reset();
                    navigate('/login');
                }
            } else {
                throw new Error(dbResponse.data?.message || 'Registration failed');
            }
        } catch (error) {
            console.error('Registration error:', error);
            
            let errorMessage = 'Failed to register';
            
            if (error.code === 'ERR_NETWORK' || error.code === 'ERR_CONNECTION_REFUSED') {
                errorMessage = '🔌 Backend server is not running. Please start the backend server first.';
            } else if (error.response?.status === 400) {
                errorMessage = error.response.data?.message || 'Please check your input data';
            } else if (error.response?.status === 409) {
                errorMessage = 'Email already exists. Please use a different email.';
            } else if (error.message) {
                errorMessage = error.message;
            }
            
            toast.error(errorMessage);
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="min-h-screen bg-gradient-to-br from-purple-50 via-pink-50 to-amber-50 pt-24 pb-12 px-4">
            <motion.div 
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6 }}
                className="flex w-full max-w-7xl mx-auto bg-white/90 backdrop-blur-lg rounded-3xl shadow-2xl overflow-hidden min-h-[85vh]"
            >
                {/* Left Side - Pet-Themed Visual Content */}
                <div className="hidden lg:flex flex-1 bg-gradient-to-br from-purple-600 via-pink-600 to-amber-600 relative overflow-hidden">
                    {/* Animated background elements */}
                    <div className="absolute inset-0">
                        <div className="absolute top-10 left-10 w-20 h-20 bg-white/10 rounded-full animate-bounce"></div>
                        <div className="absolute top-1/3 right-20 w-16 h-16 bg-pink-300/20 rounded-full animate-pulse"></div>
                        <div className="absolute bottom-20 left-1/4 w-12 h-12 bg-amber-300/20 rounded-full animate-bounce" style={{animationDelay: '1s'}}></div>
                        <div className="absolute bottom-1/3 right-10 w-8 h-8 bg-purple-300/30 rounded-full animate-pulse" style={{animationDelay: '2s'}}></div>
                    </div>
                    
                    <div className="absolute inset-0 bg-black/20"></div>
                    <div className="relative z-10 flex flex-col justify-center items-center text-white p-16">
                        <motion.div 
                            initial={{ scale: 0.8, opacity: 0 }}
                            animate={{ scale: 1, opacity: 1 }}
                            transition={{ duration: 0.8, delay: 0.2 }}
                            className="mb-8 text-center"
                        >
                            <div className="mx-auto w-24 h-24 bg-white/20 backdrop-blur-sm rounded-full flex items-center justify-center mb-6 shadow-xl">
                                <FaPaw className="w-12 h-12 text-white" />
                            </div>
                            <h2 className="text-4xl font-bold mb-4 leading-tight">
                                Join the
                                <br />
                                <span className="text-pink-200">PawHaven</span>
                                <br />
                                Family! 🐾
                            </h2>
                            <p className="text-xl text-purple-100 leading-relaxed max-w-md mx-auto">
                                Create your account and start your journey to find the perfect furry companion or help pets find their forever homes.
                            </p>
                        </motion.div>
                        
                        <motion.div 
                            initial={{ y: 20, opacity: 0 }}
                            animate={{ y: 0, opacity: 1 }}
                            transition={{ duration: 0.6, delay: 0.4 }}
                            className="grid grid-cols-1 gap-6 max-w-sm w-full"
                        >
                            <motion.div 
                                whileHover={{ scale: 1.05 }}
                                className="bg-white/10 backdrop-blur-sm rounded-xl p-6 border border-white/20 transition-all duration-300"
                            >
                                <div className="flex items-start">
                                    <div className="w-12 h-12 bg-pink-400 rounded-full flex items-center justify-center mr-4 flex-shrink-0">
                                        <FaHeart className="w-6 h-6 text-white" />
                                    </div>
                                    <div>
                                        <h3 className="font-semibold text-lg mb-2">Find Your Perfect Match</h3>
                                        <p className="text-sm text-purple-100">Connect with loving pets waiting for their forever home</p>
                                    </div>
                                </div>
                            </motion.div>
                            
                            <motion.div 
                                whileHover={{ scale: 1.05 }}
                                className="bg-white/10 backdrop-blur-sm rounded-xl p-6 border border-white/20 transition-all duration-300"
                            >
                                <div className="flex items-start">
                                    <div className="w-12 h-12 bg-amber-400 rounded-full flex items-center justify-center mr-4 flex-shrink-0">
                                        <FaHome className="w-6 h-6 text-white" />
                                    </div>
                                    <div>
                                        <h3 className="font-semibold text-lg mb-2">Safe & Secure</h3>
                                        <p className="text-sm text-purple-100">All pets are health-checked and verified by our team</p>
                                    </div>
                                </div>
                            </motion.div>

                            <motion.div 
                                whileHover={{ scale: 1.05 }}
                                className="bg-white/10 backdrop-blur-sm rounded-xl p-6 border border-white/20 transition-all duration-300"
                            >
                                <div className="flex items-start">
                                    <div className="w-12 h-12 bg-purple-400 rounded-full flex items-center justify-center mr-4 flex-shrink-0">
                                        <FaDog className="w-6 h-6 text-white" />
                                    </div>
                                    <div>
                                        <h3 className="font-semibold text-lg mb-2">Support Community</h3>
                                        <p className="text-sm text-purple-100">Join thousands of pet lovers in our caring community</p>
                                    </div>
                                </div>
                            </motion.div>
                        </motion.div>

                        {/* Floating Pet Icons */}
                        <div className="absolute top-16 right-16 text-4xl animate-bounce">🐕</div>
                        <div className="absolute top-1/3 right-8 text-3xl animate-pulse">🐱</div>
                        <div className="absolute bottom-20 left-16 text-2xl animate-bounce" style={{animationDelay: '1s'}}>🐰</div>
                        <div className="absolute bottom-1/3 right-1/4 text-3xl animate-pulse" style={{animationDelay: '1.5s'}}>🐦</div>
                    </div>
                </div>

                {/* Right Side - Registration Form */}
                <div className="flex-1 flex items-start justify-center p-8 lg:p-16 overflow-y-auto">
                    <div className="w-full max-w-md py-4">
                        <motion.form 
                            initial={{ opacity: 0, x: 20 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ duration: 0.6, delay: 0.3 }}
                            onSubmit={handleSubmit(onSubmit)} 
                            className="space-y-6 pb-8"
                        >
                            {/* Header */}
                            <div className="text-center mb-8">
                                <motion.div 
                                    initial={{ scale: 0 }}
                                    animate={{ scale: 1 }}
                                    transition={{ duration: 0.5, delay: 0.5, type: "spring" }}
                                    className="mx-auto w-16 h-16 bg-gradient-to-r from-purple-500 to-pink-500 rounded-full flex items-center justify-center mb-4 shadow-lg"
                                >
                                    <FaPaw className="w-8 h-8 text-white" />
                                </motion.div>
                                <h1 className="text-3xl font-bold bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent mb-2">
                                    Join PawHaven
                                </h1>
                                <p className="text-gray-600">Start your pet adoption journey today! 🐾</p>
                            </div>

                            {/* Role Selection */}
                            <div className="space-y-2">
                                <label className="text-sm font-medium text-gray-700 flex items-center">
                                    <FaUser className="mr-2 text-blue-500" />
                                    Role
                                </label>
                                <select
                                    className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all duration-300 hover:border-gray-300"
                                    {...register("role", {
                                        required: "Role is required"
                                    })}
                                >
                                    <option value="USER">👤 User</option>
                                    <option value="ADMIN">👑 Admin</option>
                                    <option value="MODERATOR">💼 Moderator</option>
                                </select>
                                {errors.role && (
                                    <p className="text-sm text-red-600 flex items-center mt-1">
                                        <FaHeart className="w-4 h-4 mr-1" />
                                        {errors.role.message}
                                    </p>
                                )}
                            </div>

                            {/* Full Name */}
                            <div className="space-y-2">
                                <label className="text-sm font-medium text-gray-700 flex items-center">
                                    <FaUser className="mr-2 text-purple-500" />
                                    Full Name
                                </label>
                                <input
                                    type="text"
                                    placeholder="Enter your full name"
                                    className={`w-full px-4 py-3 border-2 rounded-xl transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent ${
                                        errors.name ? 'border-red-300 bg-red-50' : 'border-gray-200 hover:border-gray-300'
                                    }`}
                                    {...register("name", {
                                        required: "Name is required",
                                        minLength: {
                                            value: 3,
                                            message: "Name must be at least 3 characters"
                                        }
                                    })}
                                />
                                {errors.name && (
                                    <p className="text-sm text-red-600 flex items-center mt-1">
                                        <FaHeart className="w-4 h-4 mr-1" />
                                        {errors.name.message}
                                    </p>
                                )}
                            </div>

                            {/* Email */}
                            <div className="space-y-2">
                                <label className="block text-sm font-medium text-gray-700">
                                    <FaEnvelope className="inline mr-2 text-pink-500" />
                                    Email Address
                                </label>
                                <input
                                    type="email"
                                    placeholder="Enter your email address"
                                    className={`w-full px-4 py-3 border-2 rounded-xl transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent ${
                                        errors.email ? 'border-red-300 bg-red-50' : 'border-gray-200 hover:border-gray-300'
                                    }`}
                                    {...register("email", {
                                        required: "Email is required",
                                        pattern: {
                                            value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                                            message: "Please enter a valid email address"
                                        }
                                    })}
                                />
                                {errors.email && (
                                    <p className="text-sm text-red-600 flex items-center mt-1">
                                        <FaHeart className="w-4 h-4 mr-1" />
                                        <svg className="w-4 h-4 mr-1" fill="currentColor" viewBox="0 0 20 20">
                                            <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
                                        </svg>
                                        {errors.email.message}
                                    </p>
                                )}
                            </div>

                            {/* Photo Upload */}
                            <div className="space-y-2">
                                <label className="text-sm font-medium text-gray-700 flex items-center">
                                    <FaUpload className="mr-2 text-blue-500" />
                                    Profile Photo
                                </label>
                                <input
                                    type="file"
                                    accept="image/*"
                                    className={`w-full px-4 py-3 border-2 rounded-xl transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-purple-50 file:text-purple-700 hover:file:bg-purple-100 ${
                                        errors.photo ? 'border-red-300 bg-red-50' : 'border-gray-200 hover:border-gray-300'
                                    }`}
                                    {...register("photo")}
                                />
                                {errors.photo && (
                                    <p className="text-sm text-red-600 flex items-center mt-1">
                                        <FaHeart className="w-4 h-4 mr-1" />
                                        {errors.photo.message}
                                    </p>
                                )}
                            </div>

                            {/* Address */}
                            <div className="space-y-2">
                                <label className="text-sm font-medium text-gray-700 flex items-center">
                                    <FaMapMarkerAlt className="mr-2 text-green-500" />
                                    Address
                                </label>
                                <textarea
                                    placeholder="Enter your home address"
                                    rows="2"
                                    className={`w-full px-4 py-3 border-2 rounded-xl transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent resize-none ${
                                        errors.address ? 'border-red-300 bg-red-50' : 'border-gray-200 hover:border-gray-300'
                                    }`}
                                    {...register("address", {
                                        required: "Address is required for pet adoption verification"
                                    })}
                                />
                                {errors.address && (
                                    <p className="text-sm text-red-600 flex items-center mt-1">
                                        <FaHeart className="w-4 h-4 mr-1" />
                                        {errors.address.message}
                                    </p>
                                )}
                            </div>

                            {/* Password */}
                            <div className="space-y-2">
                                <label className="block text-sm font-medium text-gray-700">
                                    Password
                                </label>
                                <div className="relative">
                                    <input
                                        type={showPassword ? "text" : "password"}
                                        placeholder="Create a secure password"
                                        className={`w-full px-4 py-3 pr-12 border-2 rounded-xl transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent ${
                                            errors.password ? 'border-red-300 bg-red-50' : 'border-gray-200 hover:border-gray-300'
                                        }`}
                                        {...register("password", {
                                            required: "Password is required",
                                            minLength: {
                                                value: 6,
                                                message: "Password must be at least 6 characters"
                                            },
                                            pattern: {
                                                value: /^(?=.*[A-Z])(?=.*[!@#$&*])(?=.*[0-9])(?=.*[a-z])/,
                                                message: 'Password must contain uppercase, lowercase, number and special character'
                                            }
                                        })}
                                    />
                                    <button
                                        type="button"
                                        className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-500 hover:text-purple-600 transition-colors"
                                        onClick={() => setShowPassword(!showPassword)}
                                    >
                                        {showPassword ? <FaEyeSlash className="w-5 h-5" /> : <FaEye className="w-5 h-5" />}
                                    </button>
                                </div>
                                {errors.password && (
                                    <p className="text-sm text-red-600 flex items-center mt-1">
                                        <FaHeart className="w-4 h-4 mr-1" />
                                        <svg className="w-4 h-4 mr-1" fill="currentColor" viewBox="0 0 20 20">
                                            <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
                                        </svg>
                                        {errors.password.message}
                                    </p>
                                )}
                            </div>

                            {/* Confirm Password */}
                            <div className="space-y-2">
                                <label className="text-sm font-medium text-gray-700 flex items-center">
                                    <FaLock className="mr-2 text-blue-500" />
                                    Confirm Password
                                </label>
                                <div className="relative">
                                    <input
                                        type={showConfirmPassword ? "text" : "password"}
                                        placeholder="Confirm your password"
                                        className={`w-full px-4 py-3 pr-12 border-2 rounded-xl transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent ${
                                            errors.confirmPassword ? 'border-red-300 bg-red-50' : 'border-gray-200 hover:border-gray-300'
                                        }`}
                                        {...register("confirmPassword", {
                                            required: "Please confirm your password",
                                            validate: value => value === password || "Passwords do not match"
                                        })}
                                    />
                                    <button
                                        type="button"
                                        className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-500 hover:text-purple-600 transition-colors"
                                        onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                                    >
                                        {showConfirmPassword ? <FaEyeSlash className="w-5 h-5" /> : <FaEye className="w-5 h-5" />}
                                    </button>
                                </div>
                                {errors.confirmPassword && (
                                    <p className="text-sm text-red-600 flex items-center mt-1">
                                        <FaHeart className="w-4 h-4 mr-1" />
                                        {errors.confirmPassword.message}
                                    </p>
                                )}
                            </div>



                            <motion.button
                                type="submit"
                                disabled={loading}
                                whileHover={{ scale: 1.02 }}
                                whileTap={{ scale: 0.98 }}
                                className="w-full py-4 px-6 rounded-xl font-semibold text-lg transition-all duration-300 focus:outline-none focus:ring-4 focus:ring-purple-300 disabled:opacity-50 disabled:cursor-not-allowed shadow-xl border-0"
                                style={{
                                    background: loading ? '#9333ea' : 'linear-gradient(to right, #8b5cf6, #ec4899)',
                                    color: '#ffffff',
                                    minHeight: '50px',
                                    border: 'none',
                                    outline: 'none'
                                }}
                            >
                                {loading ? (
                                    <div className="flex items-center justify-center" style={{ color: '#ffffff' }}>
                                        <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white mr-3"></div>
                                        <span style={{ color: '#ffffff' }}>Creating Your Account...</span>
                                    </div>
                                ) : (
                                    <span className="flex items-center justify-center" style={{ color: '#ffffff' }}>
                                        <FaPaw className="mr-2" style={{ color: '#ffffff' }} />
                                        <span style={{ color: '#ffffff' }}>Join PawHaven Family</span>
                                    </span>
                                )}
                            </motion.button>
                            {/* Profile Photo */}
                            <div className="space-y-2">
                                <label className="block text-sm font-medium text-gray-700">
                                    Profile Photo <span className="text-gray-400">(Optional)</span>
                                </label>
                                <input
                                    type="file"
                                    accept="image/*"
                                    className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent hover:border-gray-300 file:mr-4 file:py-2 file:px-4 file:rounded-lg file:border-0 file:text-sm file:font-medium file:bg-indigo-50 file:text-indigo-700 hover:file:bg-indigo-100"
                                    {...register("photo")}
                                />
                            </div>

                            <button
                                type="submit"
                                disabled={loading}
                                className="w-full bg-gradient-to-r from-indigo-500 to-purple-600 text-white py-3 px-6 rounded-xl font-medium transition-all duration-300 hover:from-indigo-600 hover:to-purple-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed transform hover:scale-[1.02] active:scale-[0.98]"
                            >
                                {loading ? (
                                    <div className="flex items-center justify-center">
                                        <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                                            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                                            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                                        </svg>
                                        Creating Account...
                                    </div>
                                ) : (
                                    'Join PawHaven 🐾'
                                )}
                            </button>

                            <div className="text-center">
                                <p className="text-gray-600">
                                    Already have an account?{" "}
                                    <Link to="/login" className="text-purple-600 hover:text-purple-700 font-medium transition-colors">
                                        Sign In Here 🐾
                                    </Link>
                                </p>
                            </div>

                            <div className="relative my-6">
                                <div className="absolute inset-0 flex items-center">
                                    <div className="w-full border-t border-gray-300"></div>
                                </div>
                                <div className="relative flex justify-center text-sm">
                                    <span className="px-4 bg-white text-gray-500">Or continue with</span>
                                </div>
                            </div>

                            <SocialLogin />
                        </motion.form>
                    </div>
                </div>
            </motion.div>
        </div>
    );
};

export default Register;