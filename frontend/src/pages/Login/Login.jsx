import { useState } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { useAuth } from '../../Providers/AuthProvider';
import { userAPI } from '../../services/api';
import { FaGoogle, FaEye, FaEyeSlash, FaPaw, FaHeart, FaEnvelope, FaLock } from 'react-icons/fa';
import { motion } from 'framer-motion';
import toast from 'react-hot-toast';

const Login = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [showPassword, setShowPassword] = useState(false);
    const [loading, setLoading] = useState(false);
    const [showForgotPassword, setShowForgotPassword] = useState(false);
    const [resetEmail, setResetEmail] = useState('');
    const [resetLoading, setResetLoading] = useState(false);
    const { signIn, signInWithGoogle, resetPassword, setUser } = useAuth();
    const navigate = useNavigate();
    const location = useLocation();
    const from = location.state?.from?.pathname || '/dashboard';

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        try {
            // Try backend API login first
            try {
                const response = await userAPI.login({ username: email, password });
                if (response.data.success) {
                    // Store user data and token in localStorage
                    localStorage.setItem('pawhaven_user', JSON.stringify(response.data.user));
                    localStorage.setItem('pawhaven_token', 'backend_auth_token');
                    
                    // Update user in auth context with complete database user data
                    setUser(response.data.user);
                    
                    toast.success(`Welcome back, ${response.data.user.name}! 🐾`);
                    navigate(from, { replace: true });
                    setLoading(false);
                    return;
                }
            } catch (backendError) {
                console.log('Backend login failed, trying Firebase...', backendError);
            }

            // Fallback to Firebase Auth
            if (signIn) {
                await signIn(email, password);
                toast.success('Welcome back to PawHaven! 🐾');
                navigate(from, { replace: true });
            } else {
                throw new Error('No authentication method available');
            }
            await signIn(email, password);
            toast.success('Welcome back to PawHaven! 🐾');
            navigate(from, { replace: true });
        } catch (error) {
            console.error('Login error:', error);
            toast.error('Login failed. Please check your credentials.');
        } finally {
            setLoading(false);
        }
    };

    const handleGoogleSignIn = async () => {
        setLoading(true);
        try {
            await signInWithGoogle();
            toast.success('Welcome to PawHaven! 🐾');
            navigate(from, { replace: true });
        } catch (error) {
            console.error('Google sign-in error:', error);
            toast.error('Google sign-in failed. Please try again.');
        } finally {
            setLoading(false);
        }
    };

    const handleForgotPassword = async (e) => {
        e.preventDefault();
        if (!resetEmail) {
            toast.error('Please enter your email address');
            return;
        }
        
        setResetLoading(true);
        try {
            await resetPassword(resetEmail);
            toast.success('Password reset email sent! Check your inbox 📧');
            setShowForgotPassword(false);
            setResetEmail('');
        } catch (error) {
            console.error('Password reset error:', error);
            if (error.code === 'auth/user-not-found') {
                toast.error('No account found with this email address');
            } else if (error.code === 'auth/invalid-email') {
                toast.error('Invalid email address');
            } else {
                toast.error('Failed to send reset email. Please try again.');
            }
        } finally {
            setResetLoading(false);
        }
    };

    return (
        <div className="min-h-screen bg-gradient-to-br from-pink-50 via-purple-50 to-cyan-50 flex items-center justify-center p-4 relative overflow-hidden">
            {/* Animated Background Elements */}
            <div className="absolute inset-0 overflow-hidden">
                <div className="absolute -top-1/2 -left-1/2 w-full h-full bg-gradient-to-br from-pink-200/20 to-transparent rounded-full animate-pulse"></div>
                <div className="absolute -bottom-1/2 -right-1/2 w-full h-full bg-gradient-to-tl from-purple-200/20 to-transparent rounded-full animate-pulse delay-1000"></div>
                {/* Floating paw prints */}
                <FaPaw className="absolute top-20 left-20 text-pink-300/30 text-4xl animate-bounce delay-300" />
                <FaPaw className="absolute top-40 right-32 text-purple-300/30 text-3xl animate-bounce delay-700" />
                <FaHeart className="absolute bottom-32 left-16 text-pink-400/30 text-2xl animate-pulse delay-500" />
                <FaPaw className="absolute bottom-20 right-20 text-cyan-300/30 text-5xl animate-bounce delay-1000" />
            </div>

            <motion.div 
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.6, ease: "easeOut" }}
                className="relative z-10"
            >
                <div className="bg-white/80 backdrop-blur-lg p-8 rounded-3xl shadow-2xl w-full max-w-md border border-white/20">
                    {/* Header */}
                    <div className="text-center mb-8">
                        <motion.div 
                            initial={{ scale: 0 }}
                            animate={{ scale: 1 }}
                            transition={{ delay: 0.2, type: "spring", stiffness: 200 }}
                            className="inline-flex items-center justify-center w-20 h-20 bg-gradient-to-r from-pink-500 to-purple-600 rounded-full mb-4 shadow-lg"
                        >
                            <FaPaw className="text-white text-3xl" />
                        </motion.div>
                        <h1 className="text-3xl font-bold bg-gradient-to-r from-pink-600 to-purple-600 bg-clip-text text-transparent mb-2">
                            Welcome Back!
                        </h1>
                        <p className="text-gray-600">Sign in to continue your journey with PawHaven</p>
                    </div>
                    
                    <form onSubmit={handleSubmit} className="space-y-6">
                        {/* Email Field */}
                        <motion.div
                            initial={{ x: -50, opacity: 0 }}
                            animate={{ x: 0, opacity: 1 }}
                            transition={{ delay: 0.3 }}
                            className="relative"
                        >
                            <label className="block text-sm font-semibold text-gray-700 mb-2">
                                <FaEnvelope className="inline mr-2 text-pink-500" />
                                Email Address
                            </label>
                            <input
                                type="email"
                                required
                                className="w-full px-4 py-3 bg-white/50 border-2 border-gray-200 rounded-xl focus:border-pink-500 focus:outline-none focus:ring-2 focus:ring-pink-200 transition-all duration-300 placeholder-gray-400"
                                placeholder="Enter your email"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                            />
                        </motion.div>

                        {/* Password Field */}
                        <motion.div
                            initial={{ x: -50, opacity: 0 }}
                            animate={{ x: 0, opacity: 1 }}
                            transition={{ delay: 0.4 }}
                            className="relative"
                        >
                            <label className="block text-sm font-semibold text-gray-700 mb-2">
                                <FaLock className="inline mr-2 text-pink-500" />
                                Password
                            </label>
                            <div className="relative">
                                <input
                                    type={showPassword ? "text" : "password"}
                                    required
                                    className="w-full px-4 py-3 bg-white/50 border-2 border-gray-200 rounded-xl focus:border-pink-500 focus:outline-none focus:ring-2 focus:ring-pink-200 transition-all duration-300 placeholder-gray-400 pr-12"
                                    placeholder="Enter your password"
                                    value={password}
                                    onChange={(e) => setPassword(e.target.value)}
                                />
                                <button
                                    type="button"
                                    onClick={() => setShowPassword(!showPassword)}
                                    className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-500 hover:text-pink-500 transition-colors"
                                >
                                    {showPassword ? <FaEyeSlash /> : <FaEye />}
                                </button>
                            </div>
                        </motion.div>

                        {/* Forgot Password Link */}
                        <motion.div
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            transition={{ delay: 0.45 }}
                            className="text-right"
                        >
                            <button
                                type="button"
                                onClick={() => setShowForgotPassword(true)}
                                className="text-sm text-pink-600 hover:text-purple-600 font-medium transition-colors duration-300 hover:underline"
                            >
                                Forgot Password?
                            </button>
                        </motion.div>

                        {/* Login Button */}
                        <motion.button
                            initial={{ y: 50, opacity: 0 }}
                            animate={{ y: 0, opacity: 1 }}
                            transition={{ delay: 0.5 }}
                            whileHover={{ scale: 1.02 }}
                            whileTap={{ scale: 0.98 }}
                            type="submit"
                            disabled={loading}
                            className="w-full py-3 bg-gradient-to-r from-pink-500 to-purple-600 text-white font-semibold rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 hover:from-pink-600 hover:to-purple-700 disabled:opacity-50 disabled:cursor-not-allowed"
                        >
                            {loading ? (
                                <div className="flex items-center justify-center">
                                    <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin mr-2"></div>
                                    Signing In...
                                </div>
                            ) : (
                                'Sign In to PawHaven'
                            )}
                        </motion.button>
                    </form>

                    {/* Divider */}
                    <div className="flex items-center my-6">
                        <div className="flex-1 h-px bg-gradient-to-r from-transparent via-gray-300 to-transparent"></div>
                        <span className="px-4 text-sm text-gray-500 bg-white rounded-full">or</span>
                        <div className="flex-1 h-px bg-gradient-to-r from-transparent via-gray-300 to-transparent"></div>
                    </div>

                    {/* Google Sign In */}
                    <motion.button
                        initial={{ y: 50, opacity: 0 }}
                        animate={{ y: 0, opacity: 1 }}
                        transition={{ delay: 0.6 }}
                        whileHover={{ scale: 1.02 }}
                        whileTap={{ scale: 0.98 }}
                        onClick={handleGoogleSignIn}
                        disabled={loading}
                        className="w-full py-3 bg-white border-2 border-gray-200 text-gray-700 font-semibold rounded-xl shadow-md hover:shadow-lg transition-all duration-300 hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-3"
                    >
                        <FaGoogle className="text-red-500" />
                        Continue with Google
                    </motion.button>

                    {/* Register Link */}
                    <motion.p 
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ delay: 0.7 }}
                        className="mt-6 text-center text-sm text-gray-600"
                    >
                        New to PawHaven?{' '}
                        <Link 
                            to="/register" 
                            className="font-semibold bg-gradient-to-r from-pink-600 to-purple-600 bg-clip-text text-transparent hover:from-pink-700 hover:to-purple-700 transition-all duration-300"
                        >
                            Create an account
                        </Link>
                    </motion.p>

                    {/* Footer */}
                    <div className="mt-6 text-center">
                        <p className="text-xs text-gray-500">
                            By signing in, you agree to help us find loving homes for pets 🐾
                        </p>
                    </div>
                </div>
            </motion.div>

            {/* Forgot Password Modal */}
            {showForgotPassword && (
                <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center p-4 z-50">
                    <motion.div
                        initial={{ opacity: 0, scale: 0.9, y: 50 }}
                        animate={{ opacity: 1, scale: 1, y: 0 }}
                        exit={{ opacity: 0, scale: 0.9, y: 50 }}
                        className="bg-white/90 backdrop-blur-lg rounded-3xl p-8 w-full max-w-md shadow-2xl border border-white/30"
                    >
                        <div className="text-center mb-6">
                            <div className="w-16 h-16 mx-auto mb-4 bg-gradient-to-r from-pink-500 to-purple-500 rounded-full flex items-center justify-center shadow-lg">
                                <FaEnvelope className="text-white text-2xl" />
                            </div>
                            <h2 className="text-2xl font-bold bg-gradient-to-r from-pink-600 to-purple-600 bg-clip-text text-transparent mb-2">
                                Reset Password
                            </h2>
                            <p className="text-gray-600 text-sm">
                                Enter your email address and we'll send you a link to reset your password.
                            </p>
                        </div>

                        <form onSubmit={handleForgotPassword} className="space-y-4">
                            <div className="relative">
                                <FaEnvelope className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400" />
                                <input
                                    type="email"
                                    required
                                    className="w-full pl-12 pr-4 py-3 bg-white/50 border-2 border-gray-200 rounded-xl focus:border-pink-500 focus:outline-none focus:ring-2 focus:ring-pink-200 transition-all duration-300 placeholder-gray-400"
                                    placeholder="Enter your email address"
                                    value={resetEmail}
                                    onChange={(e) => setResetEmail(e.target.value)}
                                />
                            </div>

                            <div className="flex space-x-3">
                                <button
                                    type="button"
                                    onClick={() => {
                                        setShowForgotPassword(false);
                                        setResetEmail('');
                                    }}
                                    className="flex-1 py-3 bg-gray-200 text-gray-700 font-semibold rounded-xl hover:bg-gray-300 transition-all duration-300"
                                >
                                    Cancel
                                </button>
                                <button
                                    type="submit"
                                    disabled={resetLoading}
                                    className="flex-1 py-3 bg-gradient-to-r from-pink-500 to-purple-600 text-white font-semibold rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 hover:from-pink-600 hover:to-purple-700 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center"
                                >
                                    {resetLoading ? (
                                        <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                                    ) : (
                                        'Send Reset Email'
                                    )}
                                </button>
                            </div>
                        </form>
                    </motion.div>
                </div>
            )}
        </div>
    );
};

export default Login;