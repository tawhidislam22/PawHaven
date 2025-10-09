import { Link, NavLink, Outlet, useNavigate } from 'react-router-dom';
import { useAuth } from '../Providers/AuthProvider';
import { useState } from 'react';
import { FaHome, FaList, FaUserFriends, FaBox, FaClipboardList, FaUsers, FaUserCircle, FaCreditCard, FaHistory, FaBoxOpen, FaBars, FaTimes, FaSignOutAlt, FaHeart, FaBell, FaBaby, FaChartLine, FaStar, FaShieldAlt } from 'react-icons/fa';

const Dashboard = () => {
    const { user, logout, loading } = useAuth();
    const navigate = useNavigate();
    const [sidebarOpen, setSidebarOpen] = useState(false);

    const handleLogout = async () => {
        try {
            console.log('Logout button clicked');
            await logout();
            console.log('Logout successful, navigating to home');
            navigate('/', { replace: true });
        } catch (error) {
            console.error('Logout error:', error);
        }
    };

    // Get user role directly from user object (stored in localStorage after login)
    const userRole = user?.role || 'USER';

    // Admin Panel Menu Items - For managing applications and payments
    const adminPanelMenu = [
        { to: '/dashboard/admin-applications', icon: <FaClipboardList className="text-purple-500" />, text: '🔒 Manage Applications' },
        { to: '/dashboard/admin-payments', icon: <FaCreditCard className="text-green-500" />, text: '🔒 Manage Payments' },
    ];

    // PawHaven Dashboard Menu Items based on ER diagram entities
    const adminMenu = [
        { to: '/dashboard/pets', icon: <FaBox />, text: 'Pet Management' },
        { to: '/dashboard/users', icon: <FaUsers />, text: 'User Management' },
        { to: '/dashboard/adoptions', icon: <FaHeart className="text-pink-500" />, text: 'Adoption Applications' },
        { to: '/dashboard/shelters', icon: <FaHome className="text-green-500" />, text: 'Shelter Management' },
        { to: '/dashboard/payments', icon: <FaCreditCard />, text: 'Payment Management' },
        { to: '/dashboard/notifications', icon: <FaBell className="text-blue-500" />, text: 'Notifications' },
        { to: '/dashboard/babysitting', icon: <FaBaby className="text-orange-500" />, text: 'Babysitting Services' },
        { to: '/dashboard/feedback', icon: <FaStar className="text-yellow-500" />, text: 'Feedback Management' },
        { to: '/dashboard/reports', icon: <FaChartLine className="text-purple-500" />, text: 'Reports & Analytics' },
    ];

    const userMenu = [
        { to: '/dashboard/my-adoptions', icon: <FaHeart className="text-pink-500" />, text: 'My Adoptions' },
        { to: '/dashboard/my-payments', icon: <FaCreditCard />, text: 'My Payments' },
        { to: '/dashboard/my-notifications', icon: <FaBell className="text-blue-500" />, text: 'My Notifications' },
        { to: '/dashboard/my-babysitting', icon: <FaBaby className="text-orange-500" />, text: 'My Bookings' },
    ];

    const commonMenu = [
        { to: '/dashboard/profile', icon: <FaUserCircle />, text: 'My Profile' },
        { to: '/dashboard/payment', icon: <FaCreditCard />, text: 'Payment' },
        { to: '/dashboard/payment-history', icon: <FaHistory />, text: 'Payment History' },
    ];

    const renderMenu = () => {
        const menuItems = userRole === 'ADMIN' ? [...adminPanelMenu, ...adminMenu] : userMenu;
        return [...menuItems, ...commonMenu].map((item, index) => (
            <li key={index} className="relative">
                <NavLink
                    to={item.to}
                    onClick={() => setSidebarOpen(false)}
                    className={({ isActive }) =>
                        `flex items-center px-5 py-4 mx-3 rounded-xl transition-all duration-300 group relative overflow-hidden
                        ${isActive 
                            ? 'bg-gradient-to-r from-amber-400 via-pink-500 to-purple-500 text-white shadow-2xl transform scale-105 border-2 border-amber-300' 
                            : 'text-amber-100 hover:bg-gradient-to-r hover:from-purple-700/50 hover:to-pink-700/50 hover:text-white hover:transform hover:scale-105 hover:shadow-xl border border-amber-200/20 hover:border-amber-300/50'
                        }`
                    }
                >
                    {/* Background decoration for hover */}
                    <div className="absolute inset-0 bg-gradient-to-r from-white/10 to-transparent rounded-xl opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                    
                    <span className="relative z-10 text-xl mr-4 transition-all duration-300 group-hover:transform group-hover:scale-125 group-hover:rotate-12">
                        {item.icon}
                    </span>
                    <span className="relative z-10 font-semibold group-hover:translate-x-1 transition-transform duration-300">{item.text}</span>
                    
                    {/* Hover effect decoration */}
                    <span className="relative z-10 ml-auto opacity-0 group-hover:opacity-100 transition-all duration-300 transform translate-x-2 group-hover:translate-x-0">
                        ✨
                    </span>
                </NavLink>
            </li>
        ));
    };

    if (!user) {
        return (
            <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-50 to-indigo-100">
                <div className="text-center">
                    <div className="animate-spin rounded-full h-16 w-16 border-b-2 border-blue-600 mx-auto mb-4"></div>
                    <p className="text-gray-600 text-lg">Loading Dashboard...</p>
                </div>
            </div>
        );
    }

    return (
        <div className="flex h-screen bg-gradient-to-br from-purple-50 via-pink-50 to-amber-50 relative overflow-hidden">
            {/* Background decorative elements */}
            <div className="absolute top-10 right-10 w-32 h-32 bg-gradient-to-r from-pink-200 to-purple-200 rounded-full opacity-20 animate-pulse"></div>
            <div className="absolute bottom-20 left-20 w-24 h-24 bg-gradient-to-r from-amber-200 to-orange-200 rounded-full opacity-30 animate-bounce" style={{animationDuration: '3s'}}></div>
            <div className="absolute top-1/2 right-1/4 w-16 h-16 bg-gradient-to-r from-blue-200 to-indigo-200 rounded-full opacity-25" style={{animation: 'float 4s ease-in-out infinite'}}></div>
            {/* Mobile Menu Overlay */}
            {sidebarOpen && (
                <div 
                    className="fixed inset-0 bg-black bg-opacity-50 z-40 lg:hidden"
                    onClick={() => setSidebarOpen(false)}
                ></div>
            )}

            {/* Sidebar */}
            <aside className={`
                fixed lg:static inset-y-0 left-0 z-50 w-72 bg-gradient-to-b from-slate-900 via-purple-900 to-indigo-900 transform transition-transform duration-300 ease-in-out
                ${sidebarOpen ? 'translate-x-0' : '-translate-x-full lg:translate-x-0'}
                shadow-2xl border-r-4 border-gradient-to-b border-amber-400
            `}>
                {/* Logo */}
                <div className="p-6 border-b border-amber-200/20">
                    <div className="flex items-center justify-between">
                        <Link to="/" className="flex items-center space-x-3 group">
                            <div className="w-12 h-12 bg-gradient-to-r from-amber-400 via-orange-500 to-pink-500 rounded-full flex items-center justify-center shadow-xl group-hover:shadow-2xl transition-all duration-300 group-hover:scale-110">
                                <FaHeart className="text-white text-xl group-hover:animate-pulse" />
                            </div>
                            <div>
                                <h1 className="text-2xl font-bold bg-gradient-to-r from-amber-300 to-pink-300 bg-clip-text text-transparent group-hover:from-pink-300 group-hover:to-purple-300 transition-all duration-300">
                                    🐾 PawHaven
                                </h1>
                                <p className="text-xs text-amber-200 capitalize flex items-center">
                                    <FaStar className="mr-1 text-yellow-400" />
                                    {userRole || 'User'} Dashboard
                                </p>
                            </div>
                        </Link>
                        <button
                            onClick={() => setSidebarOpen(false)}
                            className="lg:hidden text-gray-400 hover:text-white transition-colors p-2"
                        >
                            <FaTimes className="text-xl" />
                        </button>
                    </div>
                </div>

                {/* User Info */}
                <div className="p-6 border-b border-amber-200/20 bg-gradient-to-r from-purple-800/20 to-pink-800/20">
                    <div className="flex items-center space-x-3">
                        <div className="relative">
                            <div className="w-14 h-14 rounded-full bg-gradient-to-r from-amber-400 via-pink-500 to-purple-500 flex items-center justify-center shadow-xl ring-4 ring-amber-300/30">
                                {user?.photoURL ? (
                                    <img 
                                        src={user.photoURL} 
                                        alt="Profile" 
                                        className="w-14 h-14 rounded-full object-cover"
                                    />
                                ) : (
                                    <FaUserCircle className="text-white text-3xl" />
                                )}
                            </div>
                            <div className="absolute -top-1 -right-1 w-4 h-4 bg-green-400 rounded-full border-2 border-white animate-pulse"></div>
                        </div>
                        <div className="flex-1 min-w-0">
                            <p className="text-white font-semibold truncate flex items-center">
                                {user?.name || user?.displayName || 'Pet Lover'} 
                                <span className="ml-2 text-amber-300">🐾</span>
                            </p>
                            <p className="text-amber-200 text-sm truncate">
                                {user?.email}
                            </p>
                            <div className="flex items-center mt-1">
                                <div className="flex space-x-1">
                                    {[...Array(3)].map((_, i) => (
                                        <div key={i} className="w-1 h-1 bg-amber-400 rounded-full animate-pulse" style={{animationDelay: `${i * 0.2}s`}}></div>
                                    ))}
                                </div>
                                <span className="text-xs text-amber-300 ml-2 capitalize">{user?.role?.toLowerCase() || 'user'}</span>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Navigation */}
                <nav className="flex-1 py-6 overflow-y-auto">
                    <ul className="space-y-1">
                        {renderMenu()}
                    </ul>
                </nav>

                {/* Logout Button */}
                <div className="p-6 border-t border-amber-200/20">
                    <button
                        onClick={handleLogout}
                        className="w-full flex items-center px-4 py-3 text-amber-200 hover:bg-gradient-to-r hover:from-red-500 hover:to-pink-600 hover:text-white rounded-xl transition-all duration-300 group border border-amber-200/20 hover:border-transparent hover:shadow-lg"
                    >
                        <FaSignOutAlt className="text-xl mr-3 group-hover:transform group-hover:rotate-12 transition-transform duration-300" />
                        <span className="font-medium">Logout</span>
                        <span className="ml-auto opacity-0 group-hover:opacity-100 transition-opacity duration-300">👋</span>
                    </button>
                </div>
            </aside>

            {/* Main Content */}
            <div className="flex-1 flex flex-col overflow-hidden">
                {/* Header */}
                <header className="bg-white/80 backdrop-blur-md shadow-xl border-b-4 border-gradient-to-r from-amber-400 to-pink-400 relative overflow-hidden">
                    {/* Header background decoration */}
                    <div className="absolute inset-0 bg-gradient-to-r from-purple-50/50 via-pink-50/50 to-amber-50/50"></div>
                    <div className="relative z-10">
                        <div className="flex items-center justify-between h-20 px-6">
                            <div className="flex items-center space-x-4">
                                <button
                                    onClick={() => setSidebarOpen(true)}
                                    className="lg:hidden p-3 rounded-xl text-purple-600 hover:bg-purple-100 transition-all duration-300 hover:scale-110"
                                >
                                    <FaBars className="text-xl" />
                                </button>
                                <div className="flex items-center space-x-3">
                                    <div className="text-3xl animate-bounce" style={{animationDuration: '2s'}}>🐾</div>
                                    <div>
                                        <h2 className="text-2xl font-bold bg-gradient-to-r from-purple-600 via-pink-600 to-amber-600 bg-clip-text text-transparent">
                                            Welcome back, {user?.displayName?.split(' ')[0] || 'Pet Lover'}!
                                        </h2>
                                        <p className="text-sm text-gray-600 flex items-center">
                                            <FaHeart className="text-pink-500 mr-1 text-xs" />
                                            Managing pets with love since today
                                        </p>
                                    </div>
                                </div>
                            </div>
                            
                            <div className="flex items-center space-x-4">
                                <div className="hidden sm:flex items-center space-x-3 px-4 py-2 bg-gradient-to-r from-purple-100 to-pink-100 rounded-full border border-purple-200 shadow-lg">
                                    <div className="flex items-center space-x-1">
                                        <div className="w-3 h-3 bg-green-500 rounded-full animate-pulse shadow-lg"></div>
                                        <div className="w-2 h-2 bg-green-300 rounded-full animate-pulse" style={{animationDelay: '0.5s'}}></div>
                                    </div>
                                    <span className="text-sm text-purple-700 font-semibold capitalize flex items-center">
                                        <FaStar className="text-amber-500 mr-1" />
                                        {userRole || 'Loading...'}
                                    </span>
                                </div>
                                <div className="hidden md:flex items-center space-x-2 text-sm text-gray-600">
                                    <span className="animate-pulse">❤️</span>
                                    <span>Pets need you!</span>
                                </div>
                            </div>
                        </div>
                    </div>
                </header>

                {/* Content */}
                <main className="flex-1 overflow-y-auto bg-gradient-to-br from-purple-50/50 via-pink-50/50 to-amber-50/50 relative">
                    {/* Floating pet-themed decorations */}
                    <div className="absolute top-10 left-10 text-6xl opacity-10 animate-bounce" style={{animationDuration: '4s'}}>🐕</div>
                    <div className="absolute top-32 right-20 text-4xl opacity-15 animate-pulse" style={{animationDelay: '1s'}}>🐱</div>
                    <div className="absolute bottom-20 right-40 text-5xl opacity-10" style={{animation: 'float 6s ease-in-out infinite', animationDelay: '2s'}}>🐾</div>
                    
                    <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-8 relative z-10">
                        <div className="bg-white/90 backdrop-blur-sm rounded-3xl shadow-2xl border-4 border-gradient-to-r from-purple-200 via-pink-200 to-amber-200 min-h-[calc(100vh-12rem)] relative overflow-hidden">
                            {/* Content area decoration */}
                            <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-bl from-pink-100 to-transparent rounded-bl-full opacity-50"></div>
                            <div className="absolute bottom-0 left-0 w-40 h-40 bg-gradient-to-tr from-purple-100 to-transparent rounded-tr-full opacity-40"></div>
                            
                            <div className="relative z-10 p-8">
                                <Outlet />
                            </div>
                        </div>
                    </div>
                </main>
            </div>
        </div>
    );
};

export default Dashboard;