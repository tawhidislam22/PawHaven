import { useAuth } from '../Providers/AuthProvider';
import { FaHeart, FaPaw, FaHome, FaChartLine, FaUsers, FaBell, FaStar, FaBaby } from 'react-icons/fa';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';

const DashboardHome = () => {
    const { user } = useAuth();

    const quickStats = [
        { icon: FaHeart, label: 'Pets Adopted', value: '1,234', color: 'from-pink-500 to-rose-500', bgColor: 'from-pink-50 to-rose-50' },
        { icon: FaUsers, label: 'Happy Families', value: '856', color: 'from-purple-500 to-indigo-500', bgColor: 'from-purple-50 to-indigo-50' },
        { icon: FaPaw, label: 'Pets Available', value: '245', color: 'from-amber-500 to-orange-500', bgColor: 'from-amber-50 to-orange-50' },
        { icon: FaStar, label: 'Reviews', value: '2,567', color: 'from-emerald-500 to-teal-500', bgColor: 'from-emerald-50 to-teal-50' },
    ];

    return (
        <div className="min-h-screen relative overflow-hidden">
            {/* Animated background elements */}
            <div className="absolute top-20 right-20 text-8xl opacity-5 animate-bounce" style={{animationDuration: '3s'}}>🐕</div>
            <div className="absolute bottom-20 left-20 text-6xl opacity-10 float-animation" style={{animationDelay: '1s'}}>🐱</div>
            <div className="absolute top-1/2 right-1/4 text-4xl opacity-15 paw-animation" style={{animationDelay: '2s'}}>🐾</div>
            
            <div className="relative z-10">
                {/* Welcome Header */}
                <motion.div 
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6 }}
                    className="bg-gradient-to-r from-white/90 via-pink-50/90 to-purple-50/90 backdrop-blur-xl rounded-3xl p-8 shadow-2xl mb-8 border-2 border-pink-200 relative overflow-hidden"
                >
                    {/* Header decoration */}
                    <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-bl from-pink-200/30 to-transparent rounded-bl-full"></div>
                    <div className="absolute bottom-0 left-0 w-24 h-24 bg-gradient-to-tr from-purple-200/30 to-transparent rounded-tr-full"></div>
                    
                    <div className="text-center relative z-10">
                        <motion.div 
                            className="w-24 h-24 mx-auto mb-6 bg-gradient-to-r from-amber-400 via-pink-500 to-purple-500 rounded-full flex items-center justify-center shadow-2xl heart-beat-animation"
                            whileHover={{ scale: 1.1 }}
                            transition={{ type: "spring", stiffness: 300 }}
                        >
                            <FaPaw className="text-white text-4xl" />
                        </motion.div>
                        <h1 className="text-5xl font-black bg-gradient-to-r from-purple-600 via-pink-600 to-amber-600 bg-clip-text text-transparent mb-4">
                            🐾 Welcome to PawHaven Dashboard! 
                        </h1>
                        <p className="text-gray-700 text-xl max-w-2xl mx-auto leading-relaxed">
                            Hello <span className="font-bold text-transparent bg-gradient-to-r from-pink-600 to-purple-600 bg-clip-text">{user?.displayName || 'Pet Lover'}</span>! 
                            ✨ Ready to spread love and help our furry friends find their forever homes? Let's make some magic happen! 🌟
                        </p>
                    </div>
                </motion.div>

                {/* Quick Stats */}
                <motion.div 
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6, delay: 0.2 }}
                    className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8"
                >
                    {quickStats.map((stat, index) => (
                        <motion.div
                            key={index}
                            initial={{ opacity: 0, scale: 0.9 }}
                            animate={{ opacity: 1, scale: 1 }}
                            transition={{ duration: 0.5, delay: index * 0.1 }}
                            whileHover={{ scale: 1.05, y: -5 }}
                            className={`bg-gradient-to-br ${stat.bgColor} rounded-2xl p-6 shadow-xl border-2 border-white/50 hover:shadow-2xl transition-all duration-300`}
                        >
                            <div className={`w-14 h-14 bg-gradient-to-r ${stat.color} rounded-full flex items-center justify-center shadow-lg mb-4 mx-auto`}>
                                <stat.icon className="text-white text-2xl" />
                            </div>
                            <h3 className="text-3xl font-bold text-gray-800 text-center mb-2">{stat.value}</h3>
                            <p className="text-gray-600 text-center font-medium">{stat.label}</p>
                        </motion.div>
                    ))}
                </motion.div>

                {/* Quick Actions */}
                <motion.div 
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6, delay: 0.4 }}
                    className="grid md:grid-cols-3 gap-8 mb-8"
                >
                    <motion.div whileHover={{ scale: 1.05, y: -5 }} transition={{ type: "spring", stiffness: 300 }}>
                        <Link to="/adopt" className="group block">
                            <div className="bg-gradient-to-br from-pink-50 to-rose-100 backdrop-blur-lg rounded-3xl p-8 shadow-xl border-2 border-pink-200 hover:shadow-2xl hover:border-pink-300 transition-all duration-300 relative overflow-hidden">
                                <div className="absolute top-0 right-0 w-20 h-20 bg-gradient-to-bl from-pink-200/30 to-transparent rounded-bl-full"></div>
                                <div className="relative z-10">
                                    <div className="w-20 h-20 mx-auto mb-6 bg-gradient-to-r from-pink-400 to-rose-500 rounded-full flex items-center justify-center shadow-xl group-hover:scale-110 group-hover:rotate-12 transition-all duration-300">
                                        <FaHeart className="text-white text-3xl heart-beat-animation" />
                                    </div>
                                    <h3 className="text-2xl font-bold text-gray-800 mb-3 text-center">💖 Adopt a Pet</h3>
                                    <p className="text-gray-600 text-center leading-relaxed">Find your perfect furry companion and give them the loving forever home they deserve!</p>
                                </div>
                            </div>
                        </Link>
                    </motion.div>

                    <motion.div whileHover={{ scale: 1.05, y: -5 }} transition={{ type: "spring", stiffness: 300 }}>
                        <Link to="/donate" className="group block">
                            <div className="bg-gradient-to-br from-purple-50 to-indigo-100 backdrop-blur-lg rounded-3xl p-8 shadow-xl border-2 border-purple-200 hover:shadow-2xl hover:border-purple-300 transition-all duration-300 relative overflow-hidden">
                                <div className="absolute bottom-0 left-0 w-16 h-16 bg-gradient-to-tr from-purple-200/30 to-transparent rounded-tr-full"></div>
                                <div className="relative z-10">
                                    <div className="w-20 h-20 mx-auto mb-6 bg-gradient-to-r from-purple-400 to-indigo-500 rounded-full flex items-center justify-center shadow-xl group-hover:scale-110 group-hover:rotate-12 transition-all duration-300">
                                        <FaPaw className="text-white text-3xl paw-animation" />
                                    </div>
                                    <h3 className="text-2xl font-bold text-gray-800 mb-3 text-center">✨ Make a Donation</h3>
                                    <p className="text-gray-600 text-center leading-relaxed">Support our mission and help us care for more animals in need of love and attention!</p>
                                </div>
                            </div>
                        </Link>
                    </motion.div>

                    <motion.div whileHover={{ scale: 1.05, y: -5 }} transition={{ type: "spring", stiffness: 300 }}>
                        <Link to="/dashboard/pets" className="group block">
                            <div className="bg-gradient-to-br from-amber-50 to-orange-100 backdrop-blur-lg rounded-3xl p-8 shadow-xl border-2 border-amber-200 hover:shadow-2xl hover:border-amber-300 transition-all duration-300 relative overflow-hidden">
                                <div className="absolute top-0 left-0 w-24 h-24 bg-gradient-to-br from-amber-200/30 to-transparent rounded-br-full"></div>
                                <div className="relative z-10">
                                    <div className="w-20 h-20 mx-auto mb-6 bg-gradient-to-r from-amber-400 to-orange-500 rounded-full flex items-center justify-center shadow-xl group-hover:scale-110 group-hover:rotate-12 transition-all duration-300">
                                        <FaChartLine className="text-white text-3xl float-animation" />
                                    </div>
                                    <h3 className="text-2xl font-bold text-gray-800 mb-3 text-center">📊 Manage Pets</h3>
                                    <p className="text-gray-600 text-center leading-relaxed">Access your pet management dashboard and keep track of all our furry friends!</p>
                                </div>
                            </div>
                        </Link>
                    </motion.div>
                </motion.div>

                {/* Dashboard Info Cards */}
                <motion.div 
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6, delay: 0.6 }}
                    className="grid md:grid-cols-2 gap-8"
                >
                    <div className="bg-gradient-to-br from-pink-50 to-rose-100 backdrop-blur-lg rounded-3xl p-8 shadow-2xl border-2 border-pink-200 relative overflow-hidden">
                        <div className="absolute top-0 right-0 w-24 h-24 bg-gradient-to-bl from-pink-200/30 to-transparent rounded-bl-full"></div>
                        <div className="relative z-10">
                            <h3 className="text-3xl font-bold text-gray-800 mb-6 flex items-center">
                                <FaHeart className="text-pink-500 mr-3 heart-beat-animation" />
                                💖 Your Impact
                            </h3>
                            <div className="space-y-4">
                                <div className="flex justify-between items-center bg-white/50 rounded-xl p-3">
                                    <span className="text-gray-700 font-medium flex items-center">
                                        🐕 Pets Helped:
                                    </span>
                                    <span className="font-bold text-pink-600 text-lg">Coming Soon ✨</span>
                                </div>
                                <div className="flex justify-between items-center bg-white/50 rounded-xl p-3">
                                    <span className="text-gray-700 font-medium flex items-center">
                                        💝 Donations Made:
                                    </span>
                                    <span className="font-bold text-purple-600 text-lg">Coming Soon ✨</span>
                                </div>
                                <div className="flex justify-between items-center bg-white/50 rounded-xl p-3">
                                    <span className="text-gray-700 font-medium flex items-center">
                                        📅 Member Since:
                                    </span>
                                    <span className="font-bold text-amber-600 text-lg">
                                        {user?.metadata?.creationTime ? 
                                            new Date(user.metadata.creationTime).toLocaleDateString() : 
                                            'Recently ⭐'
                                        }
                                    </span>
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className="bg-gradient-to-br from-purple-50 to-indigo-100 backdrop-blur-lg rounded-3xl p-8 shadow-2xl border-2 border-purple-200 relative overflow-hidden">
                        <div className="absolute bottom-0 left-0 w-20 h-20 bg-gradient-to-tr from-purple-200/30 to-transparent rounded-tr-full"></div>
                        <div className="relative z-10">
                            <h3 className="text-3xl font-bold text-gray-800 mb-6 flex items-center">
                                <FaPaw className="text-purple-500 mr-3 paw-animation" />
                                🌟 Quick Info
                            </h3>
                            <div className="space-y-4">
                                <div className="bg-white/50 rounded-xl p-4">
                                    <p className="text-gray-700 leading-relaxed">
                                        🐾 Welcome to your PawHaven dashboard! Here you can manage pets, track adoptions, 
                                        and help our furry friends find loving homes.
                                    </p>
                                </div>
                                <div className="bg-white/50 rounded-xl p-4">
                                    <p className="text-gray-700 leading-relaxed">
                                        ✨ Use the sidebar to navigate between different sections and explore all the 
                                        amazing features we have for pet management!
                                    </p>
                                </div>
                                <div className="bg-white/50 rounded-xl p-4 text-center">
                                    <p className="text-2xl mb-2">🎉</p>
                                    <p className="text-gray-700 font-medium">
                                        Thank you for being part of our mission to help pets! 
                                    </p>
                                </div>
                            </div>
                        </div>
                    </div>
                </motion.div>
            </div>
        </div>
    );
};

export default DashboardHome;