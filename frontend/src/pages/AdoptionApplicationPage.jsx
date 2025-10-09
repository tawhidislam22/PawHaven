import React, { useState, useEffect } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { FaArrowLeft, FaCheck, FaPaw, FaHome } from 'react-icons/fa';
import { petAPI, adoptionAPI } from '../services/api';
import { useAuth } from '../Providers/AuthProvider';
import toast from 'react-hot-toast';

const AdoptionApplicationPage = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    const { user } = useAuth();
    const [pet, setPet] = useState(null);
    const [loading, setLoading] = useState(true);
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [isSubmitted, setIsSubmitted] = useState(false);
    const [formData, setFormData] = useState({
        applicationReason: '',
        livingSituation: '',
        hasOtherPets: false,
        experienceWithPets: ''
    });

    useEffect(() => {
        const fetchPet = async () => {
            try {
                const response = await petAPI.getPetById(id);
                setPet(response.data);
            } catch (error) {
                console.error('Error fetching pet:', error);
                toast.error('Failed to load pet details');
            } finally {
                setLoading(false);
            }
        };
        fetchPet();
    }, [id]);

    const handleInputChange = (e) => {
        const { name, value, type, checked } = e.target;
        setFormData(prev => ({
            ...prev,
            [name]: type === 'checkbox' ? checked : value
        }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        // Get user data from multiple sources
        const storedUser = localStorage.getItem('pawhaven_user');
        let currentUser = user;
        
        if (storedUser) {
            try {
                currentUser = JSON.parse(storedUser);
            } catch (error) {
                console.error('Error parsing stored user:', error);
            }
        }

        // Check if user is logged in
        if (!currentUser) {
            toast.error('Please login to submit an adoption application');
            navigate('/login', { state: { from: `/adopt/${id}/apply` } });
            return;
        }

        // Auto-fix user data if needed (handle both Firebase and backend users)
        let userId = currentUser.id;
        let userEmail = currentUser.email;
        let userName = currentUser.name || currentUser.displayName || 'Anonymous';

        // If user doesn't have backend ID (Firebase user), try to get from database
        if (!userId || typeof userId === 'string') {
            try {
                // Try to fetch user from backend by email
                const response = await fetch(`http://localhost:8080/api/users/email/${userEmail}`);
                if (response.ok) {
                    const backendUser = await response.json();
                    if (backendUser && backendUser.id) {
                        // Update localStorage with backend user
                        localStorage.setItem('pawhaven_user', JSON.stringify(backendUser));
                        currentUser = backendUser;
                        userId = backendUser.id;
                        userName = backendUser.name;
                        console.log('Auto-synced user with database:', backendUser);
                    }
                }
            } catch (error) {
                console.error('Could not fetch user from database:', error);
            }
        }

        // Final check - if still no valid ID, ask to login
        if (!userId || typeof userId === 'string') {
            toast.error('Please log in to continue');
            navigate('/login', { state: { from: `/adopt/${id}/apply` } });
            return;
        }

        setIsSubmitting(true);

        try {
            const applicationData = {
                user: { 
                    id: userId,
                    email: userEmail,
                    name: userName
                },
                pet: { id: pet.id },
                applicationReason: formData.applicationReason,
                livingSituation: formData.livingSituation,
                hasOtherPets: formData.hasOtherPets,
                experienceWithPets: formData.experienceWithPets,
                status: 'PENDING'
            };

            await adoptionAPI.submitApplication(applicationData);
            toast.success('Application submitted successfully!');
            setIsSubmitted(true);
        } catch (error) {
            console.error('Error submitting application:', error);
            toast.error(error.response?.data?.message || 'Failed to submit application. Please try again.');
        } finally {
            setIsSubmitting(false);
        }
    };

    if (loading) {
        return (
            <div className="min-h-screen bg-gradient-to-br from-purple-50 via-pink-50 to-amber-50 flex items-center justify-center">
                <div className="text-center">
                    <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-pink-600 mx-auto mb-4"></div>
                    <p className="text-gray-600">Loading pet details...</p>
                </div>
            </div>
        );
    }

    if (!pet) {
        return (
            <div className="min-h-screen bg-gradient-to-br from-purple-50 via-pink-50 to-amber-50 flex items-center justify-center">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="text-center bg-white/80 backdrop-blur-lg rounded-2xl p-8 shadow-xl border border-pink-100"
                >
                    <div className="text-6xl mb-4">🐾</div>
                    <h1 className="text-2xl font-bold text-gray-900 mb-4">Pet Not Found</h1>
                    <p className="text-gray-600 mb-6">The pet you're looking for doesn't exist or may have been adopted.</p>
                    <Link 
                        to="/adopt" 
                        className="inline-flex items-center px-6 py-3 bg-gradient-to-r from-purple-500 to-pink-500 text-white rounded-lg hover:from-purple-600 hover:to-pink-600 transition-all duration-300"
                    >
                        <FaArrowLeft className="mr-2" />
                        Back to Adopt Page
                    </Link>
                </motion.div>
            </div>
        );
    }

    if (!pet.available) {
        return (
            <div className="min-h-screen bg-gradient-to-br from-purple-50 via-pink-50 to-amber-50 flex items-center justify-center">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="text-center bg-white/80 backdrop-blur-lg rounded-2xl p-8 shadow-xl border border-pink-100 max-w-md"
                >
                    <div className="text-6xl mb-4">😔</div>
                    <h1 className="text-2xl font-bold text-gray-900 mb-4">Not Available for Adoption</h1>
                    <p className="text-gray-600 mb-2">
                        <strong>{pet.name}</strong> is currently not available for adoption
                    </p>
                    <p className="text-sm text-gray-500 mb-6">
                        This pet may have already been adopted or is temporarily unavailable.
                    </p>
                    <div className="flex gap-3 justify-center">
                        <Link 
                            to={`/pet/${pet.id}`}
                            className="px-4 py-2 bg-white border-2 border-pink-300 text-pink-600 rounded-lg hover:bg-pink-50 transition-all duration-300"
                        >
                            View Details
                        </Link>
                        <Link 
                            to="/adopt" 
                            className="px-4 py-2 bg-gradient-to-r from-purple-500 to-pink-500 text-white rounded-lg hover:from-purple-600 hover:to-pink-600 transition-all duration-300"
                        >
                            Browse Other Pets
                        </Link>
                    </div>
                </motion.div>
            </div>
        );
    }

    if (isSubmitted) {
        return (
            <div className="min-h-screen bg-gradient-to-br from-purple-50 via-pink-50 to-amber-50 flex items-center justify-center p-4">
                <motion.div
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 0.5 }}
                    className="text-center bg-white/80 backdrop-blur-lg rounded-2xl p-8 shadow-xl border border-pink-100 max-w-lg w-full"
                >
                    <motion.div
                        initial={{ scale: 0 }}
                        animate={{ scale: 1 }}
                        transition={{ duration: 0.5, delay: 0.2 }}
                        className="w-20 h-20 bg-gradient-to-r from-green-400 to-emerald-400 rounded-full flex items-center justify-center mx-auto mb-6"
                    >
                        <FaCheck className="text-white text-3xl" />
                    </motion.div>
                    
                    <h1 className="text-3xl font-bold bg-gradient-to-r from-purple-600 via-pink-600 to-amber-600 bg-clip-text text-transparent mb-4">
                        Application Submitted Successfully! 🎉
                    </h1>
                    
                    <div className="bg-gradient-to-r from-purple-100 to-pink-100 rounded-xl p-4 mb-6">
                        <p className="text-gray-800 font-semibold mb-2">
                            Your application for <span className="text-purple-600">{pet.name}</span> has been received!
                        </p>
                        <p className="text-gray-600 text-sm">
                            Our adoption team will review your application and contact you within 2-3 business days.
                        </p>
                    </div>

                    <div className="flex flex-col sm:flex-row gap-3">
                        <Link 
                            to={`/pet/${pet.id}`}
                            className="flex items-center justify-center px-6 py-3 bg-gradient-to-r from-blue-500 to-cyan-500 text-white rounded-lg hover:from-blue-600 hover:to-cyan-600 transition-all duration-300"
                        >
                            <FaPaw className="mr-2" />
                            View {pet.name}
                        </Link>
                        <Link 
                            to="/adopt" 
                            className="flex items-center justify-center px-6 py-3 bg-gradient-to-r from-purple-500 to-pink-500 text-white rounded-lg hover:from-purple-600 hover:to-pink-600 transition-all duration-300"
                        >
                            <FaHome className="mr-2" />
                            Browse More Pets
                        </Link>
                    </div>
                </motion.div>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-gradient-to-br from-purple-50 via-pink-50 to-amber-50 py-12 px-4">
            <div className="max-w-3xl mx-auto">
                <Link 
                    to={`/pet/${pet.id}`}
                    className="inline-flex items-center text-purple-600 hover:text-purple-700 mb-6 transition-colors"
                >
                    <FaArrowLeft className="mr-2" />
                    Back to {pet.name}'s Profile
                </Link>

                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="bg-white/80 backdrop-blur-lg rounded-2xl shadow-xl border border-pink-100 overflow-hidden"
                >
                    {/* Header */}
                    <div className="bg-gradient-to-r from-purple-500 via-pink-500 to-amber-500 p-8 text-white">
                        <h1 className="text-3xl font-bold mb-2">Adoption Application</h1>
                        <p className="text-white/90">
                            Apply to adopt <span className="font-semibold">{pet.name}</span>
                        </p>
                    </div>

                    {/* Pet Info Card */}
                    <div className="p-6 bg-gradient-to-r from-purple-50 to-pink-50 border-b border-pink-100">
                        <div className="flex items-center gap-4">
                            {pet.imageUrl && (
                                <img 
                                    src={pet.imageUrl} 
                                    alt={pet.name}
                                    className="w-20 h-20 rounded-full object-cover border-4 border-white shadow-lg"
                                />
                            )}
                            <div>
                                <h2 className="text-2xl font-bold text-gray-800">{pet.name}</h2>
                                <p className="text-gray-600">{pet.breed} • {pet.age} • {pet.gender}</p>
                            </div>
                        </div>
                    </div>

                    {/* Form */}
                    <form onSubmit={handleSubmit} className="p-8 space-y-6">
                        {/* Application Reason */}
                        <div>
                            <label htmlFor="applicationReason" className="block text-sm font-semibold text-gray-700 mb-2">
                                Why do you want to adopt {pet.name}? *
                            </label>
                            <textarea
                                id="applicationReason"
                                name="applicationReason"
                                value={formData.applicationReason}
                                onChange={handleInputChange}
                                required
                                rows="4"
                                placeholder="Tell us why you'd like to adopt this pet and what makes you a great match..."
                                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent resize-none"
                            />
                        </div>

                        {/* Living Situation */}
                        <div>
                            <label htmlFor="livingSituation" className="block text-sm font-semibold text-gray-700 mb-2">
                                Describe your living situation *
                            </label>
                            <textarea
                                id="livingSituation"
                                name="livingSituation"
                                value={formData.livingSituation}
                                onChange={handleInputChange}
                                required
                                rows="4"
                                placeholder="E.g., House with a fenced yard, apartment with pet policy, etc."
                                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent resize-none"
                            />
                        </div>

                        {/* Experience with Pets */}
                        <div>
                            <label htmlFor="experienceWithPets" className="block text-sm font-semibold text-gray-700 mb-2">
                                What is your experience with pets? *
                            </label>
                            <textarea
                                id="experienceWithPets"
                                name="experienceWithPets"
                                value={formData.experienceWithPets}
                                onChange={handleInputChange}
                                required
                                rows="4"
                                placeholder="Share your experience caring for pets, training, etc."
                                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent resize-none"
                            />
                        </div>

                        {/* Has Other Pets */}
                        <div className="flex items-start">
                            <input
                                type="checkbox"
                                id="hasOtherPets"
                                name="hasOtherPets"
                                checked={formData.hasOtherPets}
                                onChange={handleInputChange}
                                className="mt-1 h-5 w-5 text-purple-600 border-gray-300 rounded focus:ring-purple-500"
                            />
                            <label htmlFor="hasOtherPets" className="ml-3 text-sm text-gray-700">
                                <span className="font-semibold">I currently have other pets at home</span>
                                <p className="text-gray-500 text-xs mt-1">Check this if you have other pets that {pet.name} will be living with</p>
                            </label>
                        </div>

                        {/* Submit Button */}
                        <div className="flex gap-4 pt-4">
                            <button
                                type="button"
                                onClick={() => navigate(`/pet/${pet.id}`)}
                                className="flex-1 px-6 py-3 border-2 border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-all duration-300 font-semibold"
                            >
                                Cancel
                            </button>
                            <button
                                type="submit"
                                disabled={isSubmitting}
                                className="flex-1 px-6 py-3 bg-gradient-to-r from-purple-500 to-pink-500 text-white rounded-lg hover:from-purple-600 hover:to-pink-600 transition-all duration-300 font-semibold disabled:opacity-50 disabled:cursor-not-allowed"
                            >
                                {isSubmitting ? (
                                    <span className="flex items-center justify-center">
                                        <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                                            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                                            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                                        </svg>
                                        Submitting...
                                    </span>
                                ) : (
                                    'Submit Application'
                                )}
                            </button>
                        </div>

                        <p className="text-xs text-gray-500 text-center">
                            By submitting this application, you agree to our adoption terms and conditions.
                        </p>
                    </form>
                </motion.div>
            </div>
        </div>
    );
};

export default AdoptionApplicationPage;
