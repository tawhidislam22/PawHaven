import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { FaBaby, FaCalendar, FaUser, FaClock, FaMapMarkerAlt, FaCheck, FaHourglass, FaSpinner } from 'react-icons/fa';
import { babysittingAPI } from '../../services/api';
import { useAuth } from '../../Providers/AuthProvider';
import toast from 'react-hot-toast';

const MyBabysitting = () => {
    const [bookings, setBookings] = useState([]);
    const [loading, setLoading] = useState(true);
    const { user } = useAuth();

    useEffect(() => {
        const fetchBookings = async () => {
            if (!user?.id) {
                setLoading(false);
                return;
            }

            try {
                setLoading(true);
                const response = await babysittingAPI.getUserBookings(user.id);
                setBookings(response.data || []);
            } catch (error) {
                console.error('Error fetching bookings:', error);
                toast.error('Failed to load bookings');
                setBookings([]);
            } finally {
                setLoading(false);
            }
        };

        fetchBookings();
    }, [user]);

    const getStatusColor = (status) => {
        switch (status) {
            case 'Confirmed': return 'bg-green-100 text-green-800';
            case 'Pending': return 'bg-yellow-100 text-yellow-800';
            case 'Completed': return 'bg-blue-100 text-blue-800';
            case 'Cancelled': return 'bg-red-100 text-red-800';
            default: return 'bg-gray-100 text-gray-800';
        }
    };

    const getStatusIcon = (status) => {
        switch (status) {
            case 'Confirmed': return <FaCheck className="text-green-500" />;
            case 'Pending': return <FaHourglass className="text-yellow-500" />;
            case 'Completed': return <FaCheck className="text-blue-500" />;
            default: return <FaClock className="text-gray-500" />;
        }
    };

    if (loading) {
        return (
            <div className="min-h-screen bg-gradient-to-br from-purple-50 via-pink-50 to-amber-50 p-6 flex items-center justify-center">
                <div className="text-center">
                    <FaSpinner className="animate-spin text-4xl text-pink-600 mx-auto mb-4" />
                    <p className="text-gray-600">Loading bookings...</p>
                </div>
            </div>
        );
    }

    if (!user) {
        return (
            <div className="min-h-screen bg-gradient-to-br from-purple-50 via-pink-50 to-amber-50 p-6 flex items-center justify-center">
                <div className="text-center">
                    <p className="text-gray-600">Please log in to view your bookings.</p>
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
                <div className="mb-8">
                    <h1 className="text-4xl font-bold bg-gradient-to-r from-purple-600 via-pink-600 to-amber-600 bg-clip-text text-transparent mb-2">
                        👶 My Pet Sitting Bookings
                    </h1>
                    <p className="text-gray-600">Manage your pet sitting appointments and schedules</p>
                </div>

                {/* Stats Cards */}
                <div className="grid md:grid-cols-3 gap-6 mb-8">
                    <motion.div
                        initial={{ opacity: 0, scale: 0.9 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ duration: 0.5, delay: 0.1 }}
                        className="bg-gradient-to-r from-green-500 to-emerald-500 rounded-2xl p-6 shadow-xl text-white"
                    >
                        <div className="flex items-center justify-between">
                            <div>
                                <h3 className="text-lg opacity-90 mb-1">Confirmed Bookings</h3>
                                <p className="text-3xl font-bold">{bookings.filter(b => b.status === 'Confirmed').length}</p>
                            </div>
                            <FaCheck className="text-3xl opacity-75" />
                        </div>
                    </motion.div>

                    <motion.div
                        initial={{ opacity: 0, scale: 0.9 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ duration: 0.5, delay: 0.2 }}
                        className="bg-gradient-to-r from-yellow-500 to-amber-500 rounded-2xl p-6 shadow-xl text-white"
                    >
                        <div className="flex items-center justify-between">
                            <div>
                                <h3 className="text-lg opacity-90 mb-1">Pending Approval</h3>
                                <p className="text-3xl font-bold">{bookings.filter(b => b.status === 'Pending').length}</p>
                            </div>
                            <FaHourglass className="text-3xl opacity-75" />
                        </div>
                    </motion.div>

                    <motion.div
                        initial={{ opacity: 0, scale: 0.9 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ duration: 0.5, delay: 0.3 }}
                        className="bg-gradient-to-r from-blue-500 to-cyan-500 rounded-2xl p-6 shadow-xl text-white"
                    >
                        <div className="flex items-center justify-between">
                            <div>
                                <h3 className="text-lg opacity-90 mb-1">Total Spent</h3>
                                <p className="text-3xl font-bold">${bookings.reduce((sum, b) => sum + b.price, 0)}</p>
                            </div>
                            <FaBaby className="text-3xl opacity-75" />
                        </div>
                    </motion.div>
                </div>

                {/* Bookings List */}
                <div className="space-y-6">
                    {bookings.map((booking, index) => (
                        <motion.div
                            key={booking.id}
                            initial={{ opacity: 0, x: -20 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ duration: 0.5, delay: index * 0.1 }}
                            whileHover={{ scale: 1.02, y: -2 }}
                            className="bg-white/80 backdrop-blur-lg rounded-xl p-6 shadow-lg border border-pink-100"
                        >
                            <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between">
                                <div className="flex-1">
                                    <div className="flex items-center mb-4">
                                        <div className="w-12 h-12 bg-gradient-to-r from-purple-100 to-pink-100 rounded-full flex items-center justify-center mr-4">
                                            {getStatusIcon(booking.status)}
                                        </div>
                                        <div>
                                            <h3 className="text-xl font-bold text-gray-800">
                                                🐾 {booking.pet?.name || 'Pet'} ({booking.pet?.species || 'Unknown'})
                                            </h3>
                                            <p className="text-gray-600 flex items-center text-sm">
                                                <FaCalendar className="mr-1" />
                                                Booked: {new Date(booking.bookingDate).toLocaleDateString()}
                                            </p>
                                        </div>
                                    </div>

                                    <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-4 mb-4">
                                        <div className="flex items-center text-gray-600">
                                            <FaClock className="mr-2 text-blue-500" />
                                            <div>
                                                <p className="text-sm font-medium">Start Date</p>
                                                <p className="text-xs">{new Date(booking.startDate).toLocaleDateString()}</p>
                                            </div>
                                        </div>
                                        <div className="flex items-center text-gray-600">
                                            <FaClock className="mr-2 text-purple-500" />
                                            <div>
                                                <p className="text-sm font-medium">End Date</p>
                                                <p className="text-xs">{new Date(booking.endDate).toLocaleDateString()}</p>
                                            </div>
                                        </div>
                                        <div className="flex items-center text-gray-600">
                                            <FaMapMarkerAlt className="mr-2 text-green-500" />
                                            <div>
                                                <p className="text-sm font-medium">Location</p>
                                                <p className="text-xs">{booking.location || 'Not specified'}</p>
                                            </div>
                                        </div>
                                        <div className="flex items-center text-gray-600">
                                            <span className="mr-2 text-amber-500">💰</span>
                                            <div>
                                                <p className="text-sm font-medium">Price</p>
                                                <p className="text-xs font-bold">${booking.price}</p>
                                            </div>
                                        </div>
                                    </div>

                                    {booking.specialInstructions && (
                                        <div className="bg-amber-50 border border-amber-200 rounded-lg p-3 mb-4">
                                            <p className="text-sm text-amber-800">
                                                <strong>Special Instructions:</strong> {booking.specialInstructions}
                                            </p>
                                        </div>
                                    )}
                                </div>

                                <div className="flex flex-col items-end space-y-3 lg:ml-6">
                                    <span className={`inline-block px-4 py-2 rounded-full text-sm font-medium ${getStatusColor(booking.status)}`}>
                                        {booking.status}
                                    </span>
                                    
                                    <div className="flex flex-col space-y-2">
                                        {booking.status === 'Confirmed' && (
                                            <button className="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors duration-300 text-sm">
                                                Contact Sitter
                                            </button>
                                        )}
                                        {booking.status === 'Pending' && (
                                            <button className="px-4 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600 transition-colors duration-300 text-sm">
                                                Cancel Request
                                            </button>
                                        )}
                                        {booking.status === 'Completed' && (
                                            <button className="px-4 py-2 bg-green-500 text-white rounded-lg hover:bg-green-600 transition-colors duration-300 text-sm">
                                                Leave Review
                                            </button>
                                        )}
                                    </div>
                                </div>
                            </div>
                        </motion.div>
                    ))}
                </div>

                {bookings.length === 0 && (
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        className="text-center py-16"
                    >
                        <div className="text-6xl mb-4">👶</div>
                        <h2 className="text-2xl font-bold text-gray-800 mb-2">No Bookings Yet</h2>
                        <p className="text-gray-600 mb-6">Book a trusted sitter for your pet when you need to be away</p>
                        <button className="px-6 py-3 bg-gradient-to-r from-purple-500 to-pink-500 text-white rounded-lg hover:from-purple-600 hover:to-pink-600 transition-all duration-300">
                            Find a Pet Sitter
                        </button>
                    </motion.div>
                )}

                {/* Book New Sitting */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, delay: 0.4 }}
                    className="mt-8 bg-gradient-to-r from-purple-100 to-pink-100 rounded-xl p-6 shadow-lg border-2 border-dashed border-purple-300"
                >
                    <div className="text-center">
                        <div className="w-16 h-16 bg-gradient-to-r from-purple-400 to-pink-400 rounded-full flex items-center justify-center mx-auto mb-4">
                            <FaBaby className="text-white text-2xl" />
                        </div>
                        <h3 className="text-xl font-bold text-gray-800 mb-2">Need a Pet Sitter?</h3>
                        <p className="text-gray-600 mb-4">Find trusted and experienced pet sitters in your area</p>
                        <button className="px-6 py-3 bg-gradient-to-r from-purple-500 to-pink-500 text-white rounded-lg hover:from-purple-600 hover:to-pink-600 transition-all duration-300">
                            Book New Sitting Service
                        </button>
                    </div>
                </motion.div>
            </motion.div>
        </div>
    );
};

export default MyBabysitting;