import React from 'react';
import { motion } from 'framer-motion';
import { FaHeart, FaPaw, FaCalendar, FaUser } from 'react-icons/fa';

const MyAdoptions = () => {
    const adoptions = [
        {
            id: 1,
            petName: 'Max',
            petType: 'Dog',
            breed: 'Golden Retriever',
            adoptionDate: '2024-01-15',
            status: 'Completed',
            image: 'https://images.unsplash.com/photo-1552053831-71594a27632d?w=300&h=300&fit=crop&crop=face'
        },
        {
            id: 2,
            petName: 'Luna',
            petType: 'Cat',
            breed: 'Persian',
            adoptionDate: '2024-02-20',
            status: 'Completed',
            image: 'https://images.unsplash.com/photo-1514888286974-6c03e2ca1dba?w=300&h=300&fit=crop&crop=face'
        }
    ];

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
                            key={adoption.id}
                            initial={{ opacity: 0, scale: 0.9 }}
                            animate={{ opacity: 1, scale: 1 }}
                            transition={{ duration: 0.5, delay: index * 0.1 }}
                            whileHover={{ scale: 1.05, y: -5 }}
                            className="bg-white/80 backdrop-blur-lg rounded-2xl p-6 shadow-xl border border-pink-100"
                        >
                            <div className="text-center">
                                <img
                                    src={adoption.image}
                                    alt={adoption.petName}
                                    className="w-24 h-24 rounded-full mx-auto mb-4 object-cover shadow-lg ring-4 ring-pink-200"
                                />
                                <h3 className="text-xl font-bold text-gray-800 mb-2 flex items-center justify-center">
                                    <FaHeart className="text-pink-500 mr-2" />
                                    {adoption.petName}
                                </h3>
                                <p className="text-gray-600 mb-1">{adoption.breed}</p>
                                <p className="text-sm text-gray-500 mb-3 flex items-center justify-center">
                                    <FaCalendar className="mr-1" />
                                    Adopted: {new Date(adoption.adoptionDate).toLocaleDateString()}
                                </p>
                                <span className="inline-block px-3 py-1 bg-green-100 text-green-800 rounded-full text-sm font-medium">
                                    ✅ {adoption.status}
                                </span>
                            </div>
                        </motion.div>
                    ))}
                    
                    {/* Add New Adoption Card */}
                    <motion.div
                        initial={{ opacity: 0, scale: 0.9 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ duration: 0.5, delay: adoptions.length * 0.1 }}
                        whileHover={{ scale: 1.05, y: -5 }}
                        className="bg-gradient-to-br from-purple-100 to-pink-100 backdrop-blur-lg rounded-2xl p-6 shadow-xl border-2 border-dashed border-purple-300 flex flex-col items-center justify-center text-center"
                    >
                        <div className="w-16 h-16 bg-gradient-to-r from-purple-400 to-pink-400 rounded-full flex items-center justify-center mb-4">
                            <FaPaw className="text-white text-2xl" />
                        </div>
                        <h3 className="text-lg font-bold text-gray-800 mb-2">Find Your Next Friend</h3>
                        <p className="text-gray-600 text-sm mb-4">Ready to give another pet a loving home?</p>
                        <button className="px-4 py-2 bg-gradient-to-r from-purple-500 to-pink-500 text-white rounded-lg hover:from-purple-600 hover:to-pink-600 transition-all duration-300">
                            Browse Pets
                        </button>
                    </motion.div>
                </div>

                {adoptions.length === 0 && (
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        className="text-center py-16"
                    >
                        <div className="text-6xl mb-4">🐕</div>
                        <h2 className="text-2xl font-bold text-gray-800 mb-2">No Adoptions Yet</h2>
                        <p className="text-gray-600 mb-6">Start your journey by adopting a loving pet!</p>
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