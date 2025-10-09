import React, { useState, useEffect } from 'react';
import { FaUser, FaEnvelope, FaCalendar, FaPaw, FaHeart, FaEdit, FaSave, FaTimes, FaSpinner } from 'react-icons/fa';
import { useAuth } from '../Providers/AuthProvider';
import ProtectedRoute from '../components/ProtectedRoute';
import { userAPI, adoptionAPI } from '../services/api';
import toast from 'react-hot-toast';
import { motion } from 'framer-motion';

const ProfilePage = () => {
  const { user } = useAuth();
  const [isEditing, setIsEditing] = useState(false);
  const [loading, setLoading] = useState(true);
  const [stats, setStats] = useState({
    petsViewed: 0,
    favorites: 0,
    applications: 0
  });
  const [profileData, setProfileData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    phoneNumber: '',
    address: '',
    username: '',
    preferences: {
      petTypes: [],
      size: '',
      agePreference: '',
      activityLevel: ''
    }
  });

  useEffect(() => {
    const fetchProfile = async () => {
      if (!user?.id) return;
      
      try {
        const userData = await userAPI.getProfile(user.id);
        setProfileData({
          firstName: userData.firstName || '',
          lastName: userData.lastName || '',
          email: userData.email || '',
          phoneNumber: userData.phoneNumber || '',
          address: userData.address || '',
          username: userData.username || '',
          preferences: {
            petTypes: userData.preferences?.petTypes || [],
            size: userData.preferences?.size || '',
            agePreference: userData.preferences?.agePreference || '',
            activityLevel: userData.preferences?.activityLevel || ''
          }
        });

        // Fetch application count for stats
        const applications = await adoptionAPI.getUserApplications(user.id);
        setStats(prev => ({
          ...prev,
          applications: applications.length
        }));
      } catch (error) {
        console.error('Error fetching profile:', error);
        toast.error('Failed to load profile');
      } finally {
        setLoading(false);
      }
    };

    fetchProfile();
  }, [user]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    if (name.startsWith('preferences.')) {
      const prefKey = name.split('.')[1];
      setProfileData(prev => ({
        ...prev,
        preferences: {
          ...prev.preferences,
          [prefKey]: value
        }
      }));
    } else {
      setProfileData(prev => ({
        ...prev,
        [name]: value
      }));
    }
  };

  const handleSave = async () => {
    try {
      await userAPI.updateProfile(user.id, profileData);
      toast.success('Profile updated successfully');
      setIsEditing(false);
    } catch (error) {
      console.error('Error updating profile:', error);
      toast.error('Failed to update profile');
    }
  };

  if (loading) {
    return (
      <ProtectedRoute>
        <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-orange-50 flex items-center justify-center">
          <div className="text-center">
            <FaSpinner className="animate-spin text-4xl text-blue-600 mx-auto mb-4" />
            <p className="text-gray-600">Loading profile...</p>
          </div>
        </div>
      </ProtectedRoute>
    );
  }

  const statsDisplay = [
    { icon: FaPaw, label: 'Pets Viewed', value: stats.petsViewed },
    { icon: FaHeart, label: 'Favorites', value: stats.favorites },
    { icon: FaCalendar, label: 'Applications', value: stats.applications },
  ];

  return (
    <ProtectedRoute>
      <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-orange-50 py-12">
        <div className="max-w-4xl mx-auto px-4">
          {/* Profile Header */}
          <motion.div
            className="bg-white rounded-2xl shadow-xl p-8 mb-8"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
          >
            <div className="flex flex-col md:flex-row items-center space-y-6 md:space-y-0 md:space-x-8">
              <div className="relative">
                <div className="w-32 h-32 rounded-full bg-gradient-to-r from-blue-400 to-purple-500 flex items-center justify-center text-white text-4xl font-bold overflow-hidden">
                  {user?.photoURL ? (
                    <img src={user.photoURL} alt="Profile" className="w-full h-full object-cover" />
                  ) : (
                    user?.displayName?.[0] || user?.email?.[0] || 'U'
                  )}
                </div>
                <button className="absolute bottom-2 right-2 bg-white rounded-full p-2 shadow-lg hover:shadow-xl transition-shadow">
                  <FaEdit className="text-gray-600" />
                </button>
              </div>
              
              <div className="flex-1 text-center md:text-left">
                <div className="flex items-center justify-between mb-4">
                  <div>
                    <h1 className="text-3xl font-bold text-gray-800 mb-2">
                      {profileData.firstName} {profileData.lastName}
                    </h1>
                    <p className="text-gray-600 flex items-center justify-center md:justify-start">
                      <FaUser className="mr-2" />
                      {profileData.username}
                    </p>
                    <p className="text-gray-600 flex items-center justify-center md:justify-start">
                      <FaEnvelope className="mr-2" />
                      {profileData.email}
                    </p>
                  </div>
                  
                  <button
                    onClick={() => isEditing ? handleSave() : setIsEditing(true)}
                    className="flex items-center space-x-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
                  >
                    {isEditing ? <FaSave /> : <FaEdit />}
                    <span>{isEditing ? 'Save' : 'Edit Profile'}</span>
                  </button>
                </div>
                
                {/* Stats */}
                <div className="grid grid-cols-3 gap-4">
                  {statsDisplay.map((stat, index) => (
                    <div key={index} className="text-center">
                      <div className="flex items-center justify-center mb-2">
                        <stat.icon className="text-2xl text-blue-600 mr-2" />
                        <span className="text-2xl font-bold text-gray-800">{stat.value}</span>
                      </div>
                      <p className="text-sm text-gray-600">{stat.label}</p>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </motion.div>

          <div className="grid lg:grid-cols-2 gap-8">
            {/* Personal Information */}
            <motion.div
              className="bg-white rounded-2xl shadow-xl p-8"
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.2 }}
            >
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-2xl font-bold text-gray-800 flex items-center">
                  <FaUser className="mr-3 text-blue-600" />
                  Personal Information
                </h2>
              </div>

              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">First Name</label>
                  {isEditing ? (
                    <input
                      type="text"
                      name="firstName"
                      value={profileData.firstName}
                      onChange={handleInputChange}
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    />
                  ) : (
                    <p className="text-gray-900 font-medium">{profileData.firstName || 'Not provided'}</p>
                  )}
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Last Name</label>
                  {isEditing ? (
                    <input
                      type="text"
                      name="lastName"
                      value={profileData.lastName}
                      onChange={handleInputChange}
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    />
                  ) : (
                    <p className="text-gray-900 font-medium">{profileData.lastName || 'Not provided'}</p>
                  )}
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Username</label>
                  <p className="text-gray-900 font-medium">{profileData.username}</p>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Email</label>
                  <p className="text-gray-900 font-medium">{profileData.email}</p>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Phone</label>
                  {isEditing ? (
                    <input
                      type="tel"
                      name="phoneNumber"
                      value={profileData.phoneNumber}
                      onChange={handleInputChange}
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      placeholder="Enter phone number"
                    />
                  ) : (
                    <p className="text-gray-900 font-medium">{profileData.phoneNumber || 'Not provided'}</p>
                  )}
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Address</label>
                  {isEditing ? (
                    <textarea
                      name="address"
                      value={profileData.address}
                      onChange={handleInputChange}
                      rows={3}
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      placeholder="Enter your address"
                    />
                  ) : (
                    <p className="text-gray-900 font-medium">{profileData.address || 'Not provided'}</p>
                  )}
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Bio</label>
                  {isEditing ? (
                    <textarea
                      name="bio"
                      value={profileData.bio}
                      onChange={handleInputChange}
                      rows={4}
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      placeholder="Tell us about yourself and your love for pets..."
                    />
                  ) : (
                    <p className="text-gray-900">{profileData.bio || 'No bio provided'}</p>
                  )}
                </div>
              </div>
            </motion.div>

            {/* Pet Preferences */}
            <motion.div
              className="bg-white rounded-2xl shadow-xl p-8"
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.4 }}
            >
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-2xl font-bold text-gray-800 flex items-center">
                  <FaPaw className="mr-3 text-blue-600" />
                  Pet Preferences
                </h2>
              </div>

              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Preferred Pet Types</label>
                  {isEditing ? (
                    <div className="space-y-2">
                      {['Dogs', 'Cats', 'Birds', 'Rabbits', 'Others'].map((type) => (
                        <label key={type} className="flex items-center">
                          <input
                            type="checkbox"
                            checked={profileData.preferences?.petTypes?.includes(type) || false}
                            onChange={(e) => {
                              const types = profileData.preferences?.petTypes || [];
                              if (e.target.checked) {
                                setProfileData(prev => ({
                                  ...prev,
                                  preferences: {
                                    ...prev.preferences,
                                    petTypes: [...types, type]
                                  }
                                }));
                              } else {
                                setProfileData(prev => ({
                                  ...prev,
                                  preferences: {
                                    ...prev.preferences,
                                    petTypes: types.filter(t => t !== type)
                                  }
                                }));
                              }
                            }}
                            className="mr-2 rounded text-blue-600 focus:ring-blue-500"
                          />
                          <span>{type}</span>
                        </label>
                      ))}
                    </div>
                  ) : (
                    <p className="text-gray-900">{profileData.preferences?.petTypes?.length > 0 ? profileData.preferences.petTypes.join(', ') : 'No preferences set'}</p>
                  )}
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Preferred Size</label>
                  {isEditing ? (
                    <select
                      name="preferences.size"
                      value={profileData.preferences?.size || ''}
                      onChange={handleInputChange}
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    >
                      <option value="">Select size</option>
                      <option value="small">Small (0-25 lbs)</option>
                      <option value="medium">Medium (25-60 lbs)</option>
                      <option value="large">Large (60+ lbs)</option>
                    </select>
                  ) : (
                    <p className="text-gray-900 capitalize">{profileData.preferences?.size || 'No preference'}</p>
                  )}
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Preferred Age</label>
                  {isEditing ? (
                    <select
                      name="preferences.age"
                      value={profileData.preferences?.age || ''}
                      onChange={handleInputChange}
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    >
                      <option value="">Select age</option>
                      <option value="puppy/kitten">Puppy/Kitten</option>
                      <option value="young">Young</option>
                      <option value="adult">Adult</option>
                      <option value="senior">Senior</option>
                    </select>
                  ) : (
                    <p className="text-gray-900 capitalize">{profileData.preferences?.age || 'No preference'}</p>
                  )}
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Activity Level</label>
                  {isEditing ? (
                    <select
                      name="preferences.activityLevel"
                      value={profileData.preferences?.activityLevel || ''}
                      onChange={handleInputChange}
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    >
                      <option value="">Select activity level</option>
                      <option value="low">Low - Prefers calm, quiet pets</option>
                      <option value="moderate">Moderate - Enjoys some activity</option>
                      <option value="high">High - Very active lifestyle</option>
                    </select>
                  ) : (
                    <p className="text-gray-900 capitalize">{profileData.preferences?.activityLevel || 'No preference'}</p>
                  )}
                </div>
              </div>

              {isEditing && (
                <div className="flex space-x-4 mt-6">
                  <button
                    onClick={handleSave}
                    className="flex-1 bg-blue-600 text-white py-2 px-4 rounded-lg hover:bg-blue-700 transition-colors flex items-center justify-center"
                  >
                    <FaSave className="mr-2" />
                    Save Changes
                  </button>
                  <button
                    onClick={() => setIsEditing(false)}
                    className="flex-1 bg-gray-300 text-gray-700 py-2 px-4 rounded-lg hover:bg-gray-400 transition-colors flex items-center justify-center"
                  >
                    <FaTimes className="mr-2" />
                    Cancel
                  </button>
                </div>
              )}
            </motion.div>
          </div>
        </div>
      </div>
    </ProtectedRoute>
  );
};

export default ProfilePage;
