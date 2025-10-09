import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { FaBell, FaCalendar, FaCheck, FaExclamationTriangle, FaInfo, FaHeart, FaSpinner, FaTrash } from 'react-icons/fa';
import { notificationAPI } from '../../services/api';
import { useAuth } from '../../Providers/AuthProvider';
import toast from 'react-hot-toast';

const MyNotifications = () => {
    const [notifications, setNotifications] = useState([]);
    const [loading, setLoading] = useState(true);
    const { user } = useAuth();

    useEffect(() => {
        const fetchNotifications = async () => {
            if (!user?.id) return;
            
            try {
                const response = await notificationAPI.getUserNotifications(user.id);
                // Ensure we have an array
                const data = Array.isArray(response) ? response : (response?.data || []);
                setNotifications(data);
            } catch (error) {
                console.error('Error fetching notifications:', error);
                toast.error('Failed to load notifications');
                setNotifications([]); // Set empty array on error
            } finally {
                setLoading(false);
            }
        };

        fetchNotifications();
    }, [user]);

    const handleMarkAsRead = async (notificationId) => {
        try {
            await notificationAPI.markAsRead(notificationId);
            setNotifications(prev => 
                Array.isArray(prev) ? prev.map(n => 
                    n.id === notificationId ? { ...n, isRead: true } : n
                ) : []
            );
            toast.success('Marked as read');
        } catch (error) {
            console.error('Error marking notification as read:', error);
            toast.error('Failed to mark as read');
        }
    };

    const handleMarkAllAsRead = async () => {
        try {
            await notificationAPI.markAllAsRead();
            setNotifications(prev => 
                Array.isArray(prev) ? prev.map(n => ({ ...n, isRead: true })) : []
            );
            toast.success('All notifications marked as read');
        } catch (error) {
            console.error('Error marking all as read:', error);
            toast.error('Failed to mark all as read');
        }
    };

    const handleDelete = async (notificationId) => {
        try {
            await notificationAPI.deleteNotification(notificationId);
            setNotifications(prev => 
                Array.isArray(prev) ? prev.filter(n => n.id !== notificationId) : []
            );
            toast.success('Notification deleted');
        } catch (error) {
            console.error('Error deleting notification:', error);
            toast.error('Failed to delete notification');
        }
    };

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

    const unreadCount = Array.isArray(notifications) ? notifications.filter(n => !n.isRead).length : 0;

    if (loading) {
        return (
            <div className="min-h-screen bg-gradient-to-br from-purple-50 via-pink-50 to-amber-50 p-6 flex items-center justify-center">
                <div className="text-center">
                    <FaSpinner className="animate-spin text-4xl text-pink-600 mx-auto mb-4" />
                    <p className="text-gray-600">Loading notifications...</p>
                </div>
            </div>
        );
    }

    if (!user) {
        return (
            <div className="min-h-screen bg-gradient-to-br from-purple-50 via-pink-50 to-amber-50 p-6 flex items-center justify-center">
                <div className="text-center">
                    <p className="text-gray-600">Please log in to view your notifications.</p>
                </div>
            </div>
        );
    }

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
                    <div className="flex items-center gap-4">
                        {unreadCount > 0 && (
                            <>
                                <div className="bg-red-500 text-white px-3 py-1 rounded-full text-sm font-bold">
                                    {unreadCount} unread
                                </div>
                                <button 
                                    onClick={handleMarkAllAsRead}
                                    className="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors text-sm"
                                >
                                    Mark All Read
                                </button>
                            </>
                        )}
                    </div>
                </div>

                {/* Notifications List */}
                <div className="space-y-4">
                    {Array.isArray(notifications) && notifications.map((notification, index) => (
                        <motion.div
                            key={notification.id}
                            initial={{ opacity: 0, x: -20 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ duration: 0.5, delay: index * 0.1 }}
                            whileHover={{ scale: 1.02, y: -2 }}
                            className={`bg-gradient-to-r ${getTypeColor(notification.type)} backdrop-blur-lg rounded-xl p-6 shadow-lg border-2 ${!notification.isRead ? 'ring-2 ring-purple-300 ring-opacity-50' : ''}`}
                        >
                            <div className="flex items-start space-x-4">
                                <div className="w-12 h-12 bg-white rounded-full flex items-center justify-center shadow-lg flex-shrink-0">
                                    {getTypeIcon(notification.type)}
                                </div>
                                <div className="flex-1 min-w-0">
                                    <div className="flex items-center justify-between mb-2">
                                        <h3 className="font-bold text-gray-800 flex items-center">
                                            {notification.type.toUpperCase()}
                                            {!notification.isRead && (
                                                <span className="ml-2 w-2 h-2 bg-red-500 rounded-full animate-pulse"></span>
                                            )}
                                        </h3>
                                        <p className="text-sm text-gray-500 flex items-center flex-shrink-0">
                                            <FaCalendar className="mr-1" />
                                            {new Date(notification.createdAt).toLocaleDateString()}
                                        </p>
                                    </div>
                                    <p className="text-gray-700 leading-relaxed mb-3">
                                        {notification.message}
                                    </p>
                                    <div className="flex items-center justify-between">
                                        <span className={`text-xs px-2 py-1 rounded-full ${notification.isRead ? 'bg-gray-200 text-gray-600' : 'bg-purple-200 text-purple-800'}`}>
                                            {notification.isRead ? 'Read' : 'Unread'}
                                        </span>
                                        <div className="flex items-center gap-2">
                                            {!notification.isRead && (
                                                <button 
                                                    onClick={() => handleMarkAsRead(notification.id)}
                                                    className="text-sm text-purple-600 hover:text-purple-800 font-medium"
                                                >
                                                    Mark as read
                                                </button>
                                            )}
                                            <button 
                                                onClick={() => handleDelete(notification.id)}
                                                className="text-sm text-red-600 hover:text-red-800 font-medium flex items-center"
                                            >
                                                <FaTrash className="mr-1" /> Delete
                                            </button>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </motion.div>
                    ))}
                </div>

                {(!Array.isArray(notifications) || notifications.length === 0) && (
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