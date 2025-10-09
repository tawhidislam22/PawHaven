import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { FaHeart, FaPaw, FaCalendar, FaUser, FaSpinner } from 'react-icons/fa';
import { useNavigate } from 'react-router-dom';
import { adoptionAPI } from '../../services/api';
import { useAuth } from '../../Providers/AuthProvider';
import toast from 'react-hot-toast';

const MyAdoptions = () => {
    const [adoptions, setAdoptions] = useState([]);
    const [loading, setLoading] = useState(true);
    const { user } = useAuth();
    const navigate = useNavigate();

    useEffect(() => {
        const fetchMyAdoptions = async () => {
            if (!user?.id) {
                setLoading(false);
                return;
            }

            try {
                setLoading(true);
                // Fetch user's adoption applications
                const response = await adoptionAPI.getUserApplications(user.id);
                setAdoptions(response.data || []);
            } catch (error) {
                console.error('Error fetching adoptions:', error);
                toast.error('Failed to load your adoptions');
                setAdoptions([]);
            } finally {
                setLoading(false);
            }
        };

        fetchMyAdoptions();
    }, [user]);

    const getStatusColor = (status) => {
        switch (status?.toUpperCase()) {
            case 'APPROVED':
                return 'bg-green-100 text-green-800';
            case 'PENDING':
                return 'bg-yellow-100 text-yellow-800';
            case 'REJECTED':
                return 'bg-red-100 text-red-800';
            default:
                return 'bg-gray-100 text-gray-800';
        }
    };

    const getStatusIcon = (status) => {
        switch (status?.toUpperCase()) {
            case 'APPROVED':
                return '✅';
            case 'PENDING':
                return '⏳';
            case 'REJECTED':
                return '❌';
            default:
                return '📝';
        }
    };

    if (loading) {
        return (
            <div className="min-h-screen bg-gradient-to-br from-purple-50 via-pink-50 to-amber-50 p-6 flex items-center justify-center">
                <div className="text-center">
                    <FaSpinner className="animate-spin text-4xl text-pink-600 mx-auto mb-4" />
                    <p className="text-gray-600">Loading your adoptions...</p>
                </div>
            </div>
        );
    }

    if (!user) {
        return (
            <div className="min-h-screen bg-gradient-to-br from-purple-50 via-pink-50 to-amber-50 p-6 flex items-center justify-center">
                <div className="text-center">
                    <p className="text-gray-600">Please log in to view your adoptions.</p>
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
                        🐾 My Adoptions
                    </h1>
                    <p className="text-gray-600">Your wonderful journey with adopted pets</p>
                </div>

                <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {adoptions.map((adoption, index) => (
                        <motion.div
                            key={adoption.applicationId}
                            initial={{ opacity: 0, scale: 0.9 }}
                            animate={{ opacity: 1, scale: 1 }}
                            transition={{ duration: 0.5, delay: index * 0.1 }}
                            whileHover={{ scale: 1.05, y: -5 }}
                            className="bg-white/80 backdrop-blur-lg rounded-2xl p-6 shadow-xl border border-pink-100 cursor-pointer"
                            onClick={() => navigate(`/pet/${adoption.pet?.id}`)}
                        >
                            <div className="text-center">
                                <img
                                    src={adoption.pet?.image || 'https://via.placeholder.com/150?text=Pet'}
                                    alt={adoption.pet?.name || 'Pet'}
                                    className="w-24 h-24 rounded-full mx-auto mb-4 object-cover shadow-lg ring-4 ring-pink-200"
                                    onError={(e) => {
                                        e.target.src = 'https://via.placeholder.com/150?text=Pet';
                                    }}
                                />
                                <h3 className="text-xl font-bold text-gray-800 mb-2 flex items-center justify-center">
                                    <FaHeart className="text-pink-500 mr-2" />
                                    {adoption.pet?.name || 'Unknown Pet'}
                                </h3>
                                <p className="text-gray-600 mb-1">
                                    {adoption.pet?.breed || 'Unknown Breed'} • {adoption.pet?.species || 'Pet'}
                                </p>
                                <p className="text-sm text-gray-500 mb-3 flex items-center justify-center">
                                    <FaCalendar className="mr-1" />
                                    Applied: {new Date(adoption.applicationDate).toLocaleDateString()}
                                </p>
                                <span className={`inline-block px-3 py-1 rounded-full text-sm font-medium ${getStatusColor(adoption.status)}`}>
                                    {getStatusIcon(adoption.status)} {adoption.status}
                                </span>
                                {adoption.notes && (
                                    <p className="text-xs text-gray-500 mt-3 italic line-clamp-2">
                                        "{adoption.notes}"
                                    </p>
                                )}
                            </div>
                        </motion.div>
                    ))}
                    
                    {/* Add New Adoption Card */}
                    <motion.div
                        initial={{ opacity: 0, scale: 0.9 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ duration: 0.5, delay: adoptions.length * 0.1 }}
                        whileHover={{ scale: 1.05, y: -5 }}
                        className="bg-gradient-to-br from-purple-100 to-pink-100 backdrop-blur-lg rounded-2xl p-6 shadow-xl border-2 border-dashed border-purple-300 flex flex-col items-center justify-center text-center cursor-pointer"
                        onClick={() => navigate('/adopt')}
                    >
                        <div className="w-16 h-16 bg-gradient-to-r from-purple-400 to-pink-400 rounded-full flex items-center justify-center mb-4">
                            <FaPaw className="text-white text-2xl" />
                        </div>
                        <h3 className="text-lg font-bold text-gray-800 mb-2">Find Your Next Friend</h3>
                        <p className="text-gray-600 text-sm mb-4">Ready to give another pet a loving home?</p>
                        <button 
                            className="px-4 py-2 bg-gradient-to-r from-purple-500 to-pink-500 text-white rounded-lg hover:from-purple-600 hover:to-pink-600 transition-all duration-300"
                            onClick={(e) => {
                                e.stopPropagation();
                                navigate('/adopt');
                            }}
                        >
                            Browse Pets
                        </button>
                    </motion.div>
                </div>

                {adoptions.length === 0 && !loading && (
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        className="text-center py-16 bg-white/60 backdrop-blur-lg rounded-2xl shadow-lg"
                    >
                        <div className="text-6xl mb-4">🐕</div>
                        <h2 className="text-2xl font-bold text-gray-800 mb-2">No Adoption Applications Yet</h2>
                        <p className="text-gray-600 mb-6">Start your journey by applying to adopt a loving pet!</p>
                        <button 
                            onClick={() => navigate('/adopt')}
                            className="px-6 py-3 bg-gradient-to-r from-purple-500 to-pink-500 text-white rounded-lg hover:from-purple-600 hover:to-pink-600 transition-all duration-300 shadow-lg"
                        >
                            Browse Available Pets
                        </button>
                        <button className="px-6 py-3 bg-gradient-to-r from-purple-500 to-pink-500 text-white rounded-lg hover:from-purple-600 hover:to-pink-600 transition-all duration-300">
                            Browse Available Pets
                        </button>
                    </motion.div>
                )}
            </motion.div>
        </div>
    );
};

export default MyAdoptions;