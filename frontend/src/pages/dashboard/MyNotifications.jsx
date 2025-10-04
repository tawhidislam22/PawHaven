import React from 'react';
import { motion } from 'framer-motion';
import { FaBell, FaCalendar, FaCheck, FaExclamationTriangle, FaInfo, FaHeart } from 'react-icons/fa';

const MyNotifications = () => {
    const notifications = [
        {
            id: 1,
            type: 'success',
            title: 'Adoption Application Approved!',
            message: 'Congratulations! Your application to adopt Max has been approved. Please visit us to complete the process.',
            date: '2024-01-15T10:30:00Z',
            read: false
        },
        {
            id: 2,
            type: 'info',
            title: 'Vaccination Reminder',
            message: 'Luna is due for her annual vaccination next week. Please schedule an appointment with your vet.',
            date: '2024-01-14T14:20:00Z',
            read: true
        },
        {
            id: 3,
            type: 'warning',
            title: 'Payment Due',
            message: 'Your monthly pet care subscription payment is due in 3 days.',
            date: '2024-01-13T09:15:00Z',
            read: true
        },
        {
            id: 4,
            type: 'info',
            title: 'New Pet Available',
            message: 'A new Golden Retriever puppy is available for adoption and matches your preferences!',
            date: '2024-01-12T16:45:00Z',
            read: false
        }
    ];

    const getTypeIcon = (type) => {
        switch (type) {
            case 'success': return <FaCheck className="text-green-500" />;
            case 'warning': return <FaExclamationTriangle className="text-yellow-500" />;
            case 'info': return <FaInfo className="text-blue-500" />;
            default: return <FaBell className="text-gray-500" />;
        }
    };

    const getTypeColor = (type) => {
        switch (type) {
            case 'success': return 'from-green-100 to-emerald-100 border-green-200';
            case 'warning': return 'from-yellow-100 to-amber-100 border-yellow-200';
            case 'info': return 'from-blue-100 to-cyan-100 border-blue-200';
            default: return 'from-gray-100 to-slate-100 border-gray-200';
        }
    };

    const unreadCount = notifications.filter(n => !n.read).length;

    return (
        <div className="min-h-screen bg-gradient-to-br from-purple-50 via-pink-50 to-amber-50 p-6">
            <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
            >
                <div className="mb-8 flex items-center justify-between">
                    <div>
                        <h1 className="text-4xl font-bold bg-gradient-to-r from-purple-600 via-pink-600 to-amber-600 bg-clip-text text-transparent mb-2">
                            🔔 My Notifications
                        </h1>
                        <p className="text-gray-600">Stay updated with your pet care journey</p>
                    </div>
                    {unreadCount > 0 && (
                        <div className="bg-red-500 text-white px-3 py-1 rounded-full text-sm font-bold">
                            {unreadCount} unread
                        </div>
                    )}
                </div>

                {/* Notifications List */}
                <div className="space-y-4">
                    {notifications.map((notification, index) => (
                        <motion.div
                            key={notification.id}
                            initial={{ opacity: 0, x: -20 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ duration: 0.5, delay: index * 0.1 }}
                            whileHover={{ scale: 1.02, y: -2 }}
                            className={`bg-gradient-to-r ${getTypeColor(notification.type)} backdrop-blur-lg rounded-xl p-6 shadow-lg border-2 ${!notification.read ? 'ring-2 ring-purple-300 ring-opacity-50' : ''}`}
                        >
                            <div className="flex items-start space-x-4">
                                <div className="w-12 h-12 bg-white rounded-full flex items-center justify-center shadow-lg flex-shrink-0">
                                    {getTypeIcon(notification.type)}
                                </div>
                                <div className="flex-1 min-w-0">
                                    <div className="flex items-center justify-between mb-2">
                                        <h3 className="font-bold text-gray-800 flex items-center">
                                            {notification.title}
                                            {!notification.read && (
                                                <span className="ml-2 w-2 h-2 bg-red-500 rounded-full animate-pulse"></span>
                                            )}
                                        </h3>
                                        <p className="text-sm text-gray-500 flex items-center flex-shrink-0">
                                            <FaCalendar className="mr-1" />
                                            {new Date(notification.date).toLocaleDateString()}
                                        </p>
                                    </div>
                                    <p className="text-gray-700 leading-relaxed mb-3">
                                        {notification.message}
                                    </p>
                                    <div className="flex items-center justify-between">
                                        <span className={`text-xs px-2 py-1 rounded-full ${notification.read ? 'bg-gray-200 text-gray-600' : 'bg-purple-200 text-purple-800'}`}>
                                            {notification.read ? 'Read' : 'Unread'}
                                        </span>
                                        {!notification.read && (
                                            <button className="text-sm text-purple-600 hover:text-purple-800 font-medium">
                                                Mark as read
                                            </button>
                                        )}
                                    </div>
                                </div>
                            </div>
                        </motion.div>
                    ))}
                </div>

                {notifications.length === 0 && (
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        className="text-center py-16"
                    >
                        <div className="text-6xl mb-4">🔔</div>
                        <h2 className="text-2xl font-bold text-gray-800 mb-2">No Notifications</h2>
                        <p className="text-gray-600 mb-6">You're all caught up! Check back later for updates.</p>
                    </motion.div>
                )}

                {/* Quick Actions */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, delay: 0.3 }}
                    className="mt-8 bg-white/80 backdrop-blur-lg rounded-xl p-6 shadow-lg border border-pink-100"
                >
                    <h3 className="text-lg font-bold text-gray-800 mb-4 flex items-center">
                        <FaHeart className="text-pink-500 mr-2" />
                        Quick Actions
                    </h3>
                    <div className="grid md:grid-cols-3 gap-4">
                        <button className="p-3 bg-gradient-to-r from-purple-500 to-pink-500 text-white rounded-lg hover:from-purple-600 hover:to-pink-600 transition-all duration-300">
                            Browse Available Pets
                        </button>
                        <button className="p-3 bg-gradient-to-r from-blue-500 to-cyan-500 text-white rounded-lg hover:from-blue-600 hover:to-cyan-600 transition-all duration-300">
                            Schedule Vet Visit
                        </button>
                        <button className="p-3 bg-gradient-to-r from-green-500 to-emerald-500 text-white rounded-lg hover:from-green-600 hover:to-emerald-600 transition-all duration-300">
                            Make a Donation
                        </button>
                    </div>
                </motion.div>
            </motion.div>
        </div>
    );
};

export default MyNotifications;