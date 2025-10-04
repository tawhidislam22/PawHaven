import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { FaSearch, FaEdit, FaTrash, FaEye, FaStar, FaUser, FaPaw, FaCalendar, FaSort, FaReply } from 'react-icons/fa';

const FeedbackManagement = () => {
    const [feedbacks, setFeedbacks] = useState([]);
    const [filteredFeedbacks, setFilteredFeedbacks] = useState([]);
    const [searchTerm, setSearchTerm] = useState('');
    const [filterType, setFilterType] = useState('all');
    const [filterRating, setFilterRating] = useState('all');
    const [showViewModal, setShowViewModal] = useState(false);
    const [showReplyModal, setShowReplyModal] = useState(false);
    const [selectedFeedback, setSelectedFeedback] = useState(null);
    const [replyText, setReplyText] = useState('');
    const [sortBy, setSortBy] = useState('date');
    const [sortOrder, setSortOrder] = useState('desc');
    const [currentPage, setCurrentPage] = useState(1);
    const [itemsPerPage] = useState(10);
    const [loading, setLoading] = useState(true);

    // Sample data for feedback management
    useEffect(() => {
        // Simulate API call
        setTimeout(() => {
            const sampleFeedbacks = [
                {
                    id: 1,
                    userId: 101,
                    userName: 'Sarah Johnson',
                    userEmail: 'sarah.johnson@email.com',
                    petId: 201,
                    petName: 'Max',
                    type: 'adoption',
                    rating: 5,
                    subject: 'Amazing adoption experience',
                    message: 'The adoption process was smooth and the staff was incredibly helpful. Max is settling in perfectly!',
                    status: 'published',
                    createdAt: '2024-01-15T10:30:00Z',
                    reply: null,
                    isPublic: true
                },
                {
                    id: 2,
                    userId: 102,
                    userName: 'Mike Chen',
                    userEmail: 'mike.chen@email.com',
                    petId: 202,
                    petName: 'Luna',
                    type: 'service',
                    rating: 4,
                    subject: 'Good babysitting service',
                    message: 'The babysitting service was professional, though communication could be improved.',
                    status: 'pending',
                    createdAt: '2024-01-14T14:20:00Z',
                    reply: null,
                    isPublic: false
                },
                {
                    id: 3,
                    userId: 103,
                    userName: 'Emily Rodriguez',
                    userEmail: 'emily.rodriguez@email.com',
                    petId: null,
                    petName: null,
                    type: 'general',
                    rating: 3,
                    subject: 'Website improvement suggestions',
                    message: 'The website could use better mobile optimization and faster loading times.',
                    status: 'reviewed',
                    createdAt: '2024-01-13T09:15:00Z',
                    reply: 'Thank you for your feedback. We are working on improving our mobile experience.',
                    isPublic: true
                },
                {
                    id: 4,
                    userId: 104,
                    userName: 'David Kim',
                    userEmail: 'david.kim@email.com',
                    petId: 203,
                    petName: 'Buddy',
                    type: 'complaint',
                    rating: 2,
                    subject: 'Delayed response to application',
                    message: 'My adoption application took too long to process. Better communication needed.',
                    status: 'pending',
                    createdAt: '2024-01-12T16:45:00Z',
                    reply: null,
                    isPublic: false
                },
                {
                    id: 5,
                    userId: 105,
                    userName: 'Lisa Thompson',
                    userEmail: 'lisa.thompson@email.com',
                    petId: 204,
                    petName: 'Bella',
                    type: 'adoption',
                    rating: 5,
                    subject: 'Wonderful experience',
                    message: 'Bella is the perfect addition to our family. Thank you for the excellent service!',
                    status: 'published',
                    createdAt: '2024-01-11T11:30:00Z',
                    reply: 'We are so happy to hear that Bella has found her forever home!',
                    isPublic: true
                }
            ];
            setFeedbacks(sampleFeedbacks);
            setFilteredFeedbacks(sampleFeedbacks);
            setLoading(false);
        }, 1000);
    }, []);

    // Filter and search logic
    useEffect(() => {
        let filtered = feedbacks.filter(feedback => {
            const matchesSearch = 
                feedback.userName.toLowerCase().includes(searchTerm.toLowerCase()) ||
                feedback.subject.toLowerCase().includes(searchTerm.toLowerCase()) ||
                feedback.message.toLowerCase().includes(searchTerm.toLowerCase()) ||
                (feedback.petName && feedback.petName.toLowerCase().includes(searchTerm.toLowerCase()));

            const matchesType = filterType === 'all' || feedback.type === filterType;
            const matchesRating = filterRating === 'all' || feedback.rating === parseInt(filterRating);

            return matchesSearch && matchesType && matchesRating;
        });

        // Sort logic
        filtered.sort((a, b) => {
            let comparison = 0;
            switch (sortBy) {
                case 'date':
                    comparison = new Date(b.createdAt) - new Date(a.createdAt);
                    break;
                case 'rating':
                    comparison = b.rating - a.rating;
                    break;
                case 'name':
                    comparison = a.userName.localeCompare(b.userName);
                    break;
                case 'type':
                    comparison = a.type.localeCompare(b.type);
                    break;
                default:
                    break;
            }
            return sortOrder === 'desc' ? comparison : -comparison;
        });

        setFilteredFeedbacks(filtered);
        setCurrentPage(1);
    }, [feedbacks, searchTerm, filterType, filterRating, sortBy, sortOrder]);

    const handleViewFeedback = (feedback) => {
        setSelectedFeedback(feedback);
        setShowViewModal(true);
    };

    const handleReplyFeedback = (feedback) => {
        setSelectedFeedback(feedback);
        setReplyText(feedback.reply || '');
        setShowReplyModal(true);
    };

    const handleSubmitReply = () => {
        setFeedbacks(prev => prev.map(feedback => 
            feedback.id === selectedFeedback.id 
                ? { ...feedback, reply: replyText, status: 'reviewed' }
                : feedback
        ));
        setShowReplyModal(false);
        setReplyText('');
    };

    const handleUpdateStatus = (feedbackId, newStatus) => {
        setFeedbacks(prev => prev.map(feedback => 
            feedback.id === feedbackId 
                ? { ...feedback, status: newStatus }
                : feedback
        ));
    };

    const handleTogglePublic = (feedbackId) => {
        setFeedbacks(prev => prev.map(feedback => 
            feedback.id === feedbackId 
                ? { ...feedback, isPublic: !feedback.isPublic }
                : feedback
        ));
    };

    const handleDeleteFeedback = (feedbackId) => {
        if (window.confirm('Are you sure you want to delete this feedback?')) {
            setFeedbacks(prev => prev.filter(feedback => feedback.id !== feedbackId));
        }
    };

    const getStatusColor = (status) => {
        switch (status) {
            case 'published': return 'bg-green-100 text-green-800';
            case 'reviewed': return 'bg-blue-100 text-blue-800';
            case 'pending': return 'bg-yellow-100 text-yellow-800';
            default: return 'bg-gray-100 text-gray-800';
        }
    };

    const getTypeColor = (type) => {
        switch (type) {
            case 'adoption': return 'bg-pink-100 text-pink-800';
            case 'service': return 'bg-blue-100 text-blue-800';
            case 'complaint': return 'bg-red-100 text-red-800';
            case 'general': return 'bg-gray-100 text-gray-800';
            default: return 'bg-gray-100 text-gray-800';
        }
    };

    const renderStars = (rating) => {
        return [...Array(5)].map((_, i) => (
            <FaStar 
                key={i} 
                className={`${i < rating ? 'text-yellow-400' : 'text-gray-300'} text-sm`} 
            />
        ));
    };

    // Pagination logic
    const indexOfLastItem = currentPage * itemsPerPage;
    const indexOfFirstItem = indexOfLastItem - itemsPerPage;
    const currentItems = filteredFeedbacks.slice(indexOfFirstItem, indexOfLastItem);
    const totalPages = Math.ceil(filteredFeedbacks.length / itemsPerPage);

    if (loading) {
        return (
            <div className="flex justify-center items-center h-64">
                <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
            </div>
        );
    }

    return (
        <div className="p-6 bg-gradient-to-br from-blue-50 to-indigo-100 min-h-screen">
            <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
                className="max-w-7xl mx-auto"
            >
                {/* Header */}
                <div className="mb-8">
                    <h1 className="text-4xl font-bold text-gray-800 mb-2">Feedback Management</h1>
                    <p className="text-gray-600">Manage user feedback, reviews, and responses</p>
                </div>

                {/* Stats Cards */}
                <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
                    <motion.div
                        whileHover={{ scale: 1.05 }}
                        className="bg-white rounded-lg shadow-md p-6"
                    >
                        <h3 className="text-lg font-semibold text-gray-700 mb-2">Total Feedback</h3>
                        <p className="text-3xl font-bold text-blue-600">{feedbacks.length}</p>
                    </motion.div>
                    <motion.div
                        whileHover={{ scale: 1.05 }}
                        className="bg-white rounded-lg shadow-md p-6"
                    >
                        <h3 className="text-lg font-semibold text-gray-700 mb-2">Pending Review</h3>
                        <p className="text-3xl font-bold text-yellow-600">
                            {feedbacks.filter(f => f.status === 'pending').length}
                        </p>
                    </motion.div>
                    <motion.div
                        whileHover={{ scale: 1.05 }}
                        className="bg-white rounded-lg shadow-md p-6"
                    >
                        <h3 className="text-lg font-semibold text-gray-700 mb-2">Average Rating</h3>
                        <p className="text-3xl font-bold text-green-600">
                            {(feedbacks.reduce((sum, f) => sum + f.rating, 0) / feedbacks.length).toFixed(1)}
                        </p>
                    </motion.div>
                    <motion.div
                        whileHover={{ scale: 1.05 }}
                        className="bg-white rounded-lg shadow-md p-6"
                    >
                        <h3 className="text-lg font-semibold text-gray-700 mb-2">Published</h3>
                        <p className="text-3xl font-bold text-purple-600">
                            {feedbacks.filter(f => f.status === 'published').length}
                        </p>
                    </motion.div>
                </div>

                {/* Search and Filter Section */}
                <div className="bg-white rounded-lg shadow-md p-6 mb-8">
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-4">
                        {/* Search */}
                        <div className="relative">
                            <FaSearch className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                            <input
                                type="text"
                                placeholder="Search feedback..."
                                value={searchTerm}
                                onChange={(e) => setSearchTerm(e.target.value)}
                                className="pl-10 pr-4 py-2 w-full border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                            />
                        </div>

                        {/* Type Filter */}
                        <select
                            value={filterType}
                            onChange={(e) => setFilterType(e.target.value)}
                            className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                        >
                            <option value="all">All Types</option>
                            <option value="adoption">Adoption</option>
                            <option value="service">Service</option>
                            <option value="complaint">Complaint</option>
                            <option value="general">General</option>
                        </select>

                        {/* Rating Filter */}
                        <select
                            value={filterRating}
                            onChange={(e) => setFilterRating(e.target.value)}
                            className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                        >
                            <option value="all">All Ratings</option>
                            <option value="5">5 Stars</option>
                            <option value="4">4 Stars</option>
                            <option value="3">3 Stars</option>
                            <option value="2">2 Stars</option>
                            <option value="1">1 Star</option>
                        </select>

                        {/* Sort By */}
                        <select
                            value={sortBy}
                            onChange={(e) => setSortBy(e.target.value)}
                            className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                        >
                            <option value="date">Sort by Date</option>
                            <option value="rating">Sort by Rating</option>
                            <option value="name">Sort by Name</option>
                            <option value="type">Sort by Type</option>
                        </select>

                        {/* Sort Order */}
                        <button
                            onClick={() => setSortOrder(sortOrder === 'asc' ? 'desc' : 'asc')}
                            className="flex items-center justify-center px-4 py-2 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200 transition-colors"
                        >
                            <FaSort className="mr-2" />
                            {sortOrder === 'asc' ? 'Ascending' : 'Descending'}
                        </button>
                    </div>
                </div>

                {/* Feedback List */}
                <div className="bg-white rounded-lg shadow-md overflow-hidden">
                    <div className="overflow-x-auto">
                        <table className="min-w-full divide-y divide-gray-200">
                            <thead className="bg-gray-50">
                                <tr>
                                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                        User & Pet
                                    </th>
                                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                        Type & Rating
                                    </th>
                                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                        Subject
                                    </th>
                                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                        Status
                                    </th>
                                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                        Date
                                    </th>
                                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                        Actions
                                    </th>
                                </tr>
                            </thead>
                            <tbody className="bg-white divide-y divide-gray-200">
                                {currentItems.map((feedback) => (
                                    <motion.tr
                                        key={feedback.id}
                                        initial={{ opacity: 0 }}
                                        animate={{ opacity: 1 }}
                                        whileHover={{ backgroundColor: '#f9fafb' }}
                                        transition={{ duration: 0.2 }}
                                    >
                                        <td className="px-6 py-4 whitespace-nowrap">
                                            <div>
                                                <div className="flex items-center">
                                                    <FaUser className="text-gray-400 mr-2" />
                                                    <span className="text-sm font-medium text-gray-900">
                                                        {feedback.userName}
                                                    </span>
                                                </div>
                                                {feedback.petName && (
                                                    <div className="flex items-center mt-1">
                                                        <FaPaw className="text-blue-400 mr-2" />
                                                        <span className="text-sm text-gray-600">
                                                            {feedback.petName}
                                                        </span>
                                                    </div>
                                                )}
                                            </div>
                                        </td>
                                        <td className="px-6 py-4 whitespace-nowrap">
                                            <div>
                                                <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${getTypeColor(feedback.type)}`}>
                                                    {feedback.type}
                                                </span>
                                                <div className="flex items-center mt-1">
                                                    {renderStars(feedback.rating)}
                                                    <span className="ml-2 text-sm text-gray-600">
                                                        {feedback.rating}/5
                                                    </span>
                                                </div>
                                            </div>
                                        </td>
                                        <td className="px-6 py-4">
                                            <div className="text-sm font-medium text-gray-900 max-w-xs truncate">
                                                {feedback.subject}
                                            </div>
                                            <div className="text-sm text-gray-600 max-w-xs truncate">
                                                {feedback.message}
                                            </div>
                                        </td>
                                        <td className="px-6 py-4 whitespace-nowrap">
                                            <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${getStatusColor(feedback.status)}`}>
                                                {feedback.status}
                                            </span>
                                            {feedback.isPublic && (
                                                <div className="text-xs text-green-600 mt-1">Public</div>
                                            )}
                                        </td>
                                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-600">
                                            <div className="flex items-center">
                                                <FaCalendar className="mr-1" />
                                                {new Date(feedback.createdAt).toLocaleDateString()}
                                            </div>
                                        </td>
                                        <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                                            <div className="flex space-x-2">
                                                <button
                                                    onClick={() => handleViewFeedback(feedback)}
                                                    className="text-blue-600 hover:text-blue-900 transition-colors"
                                                    title="View Details"
                                                >
                                                    <FaEye />
                                                </button>
                                                <button
                                                    onClick={() => handleReplyFeedback(feedback)}
                                                    className="text-green-600 hover:text-green-900 transition-colors"
                                                    title="Reply"
                                                >
                                                    <FaReply />
                                                </button>
                                                <button
                                                    onClick={() => handleDeleteFeedback(feedback.id)}
                                                    className="text-red-600 hover:text-red-900 transition-colors"
                                                    title="Delete"
                                                >
                                                    <FaTrash />
                                                </button>
                                            </div>
                                        </td>
                                    </motion.tr>
                                ))}
                            </tbody>
                        </table>
                    </div>

                    {/* Pagination */}
                    {totalPages > 1 && (
                        <div className="px-6 py-4 border-t border-gray-200">
                            <div className="flex items-center justify-between">
                                <div className="text-sm text-gray-700">
                                    Showing {indexOfFirstItem + 1} to {Math.min(indexOfLastItem, filteredFeedbacks.length)} of {filteredFeedbacks.length} results
                                </div>
                                <div className="flex space-x-2">
                                    <button
                                        onClick={() => setCurrentPage(prev => Math.max(prev - 1, 1))}
                                        disabled={currentPage === 1}
                                        className="px-3 py-1 text-sm bg-gray-200 text-gray-700 rounded hover:bg-gray-300 disabled:opacity-50 disabled:cursor-not-allowed"
                                    >
                                        Previous
                                    </button>
                                    {[...Array(totalPages)].map((_, i) => (
                                        <button
                                            key={i + 1}
                                            onClick={() => setCurrentPage(i + 1)}
                                            className={`px-3 py-1 text-sm rounded ${
                                                currentPage === i + 1
                                                    ? 'bg-blue-500 text-white'
                                                    : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
                                            }`}
                                        >
                                            {i + 1}
                                        </button>
                                    ))}
                                    <button
                                        onClick={() => setCurrentPage(prev => Math.min(prev + 1, totalPages))}
                                        disabled={currentPage === totalPages}
                                        className="px-3 py-1 text-sm bg-gray-200 text-gray-700 rounded hover:bg-gray-300 disabled:opacity-50 disabled:cursor-not-allowed"
                                    >
                                        Next
                                    </button>
                                </div>
                            </div>
                        </div>
                    )}
                </div>

                {/* View Feedback Modal */}
                {showViewModal && selectedFeedback && (
                    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
                        <motion.div
                            initial={{ opacity: 0, scale: 0.9 }}
                            animate={{ opacity: 1, scale: 1 }}
                            className="bg-white rounded-lg p-6 w-full max-w-2xl mx-4 max-h-[90vh] overflow-y-auto"
                        >
                            <h3 className="text-lg font-semibold mb-4">Feedback Details</h3>
                            
                            <div className="space-y-4">
                                <div className="grid grid-cols-2 gap-4">
                                    <div>
                                        <label className="font-medium text-gray-700">User:</label>
                                        <p className="text-gray-600">{selectedFeedback.userName}</p>
                                    </div>
                                    <div>
                                        <label className="font-medium text-gray-700">Email:</label>
                                        <p className="text-gray-600">{selectedFeedback.userEmail}</p>
                                    </div>
                                    {selectedFeedback.petName && (
                                        <>
                                            <div>
                                                <label className="font-medium text-gray-700">Pet:</label>
                                                <p className="text-gray-600">{selectedFeedback.petName}</p>
                                            </div>
                                            <div>
                                                <label className="font-medium text-gray-700">Pet ID:</label>
                                                <p className="text-gray-600">{selectedFeedback.petId}</p>
                                            </div>
                                        </>
                                    )}
                                    <div>
                                        <label className="font-medium text-gray-700">Type:</label>
                                        <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${getTypeColor(selectedFeedback.type)}`}>
                                            {selectedFeedback.type}
                                        </span>
                                    </div>
                                    <div>
                                        <label className="font-medium text-gray-700">Rating:</label>
                                        <div className="flex items-center">
                                            {renderStars(selectedFeedback.rating)}
                                            <span className="ml-2">{selectedFeedback.rating}/5</span>
                                        </div>
                                    </div>
                                </div>

                                <div>
                                    <label className="font-medium text-gray-700">Subject:</label>
                                    <p className="text-gray-600">{selectedFeedback.subject}</p>
                                </div>

                                <div>
                                    <label className="font-medium text-gray-700">Message:</label>
                                    <p className="text-gray-600 bg-gray-50 p-3 rounded">{selectedFeedback.message}</p>
                                </div>

                                {selectedFeedback.reply && (
                                    <div>
                                        <label className="font-medium text-gray-700">Admin Reply:</label>
                                        <p className="text-gray-600 bg-blue-50 p-3 rounded">{selectedFeedback.reply}</p>
                                    </div>
                                )}

                                <div className="flex justify-between items-center">
                                    <div>
                                        <label className="font-medium text-gray-700">Status:</label>
                                        <select
                                            value={selectedFeedback.status}
                                            onChange={(e) => handleUpdateStatus(selectedFeedback.id, e.target.value)}
                                            className="ml-2 px-2 py-1 border rounded"
                                        >
                                            <option value="pending">Pending</option>
                                            <option value="reviewed">Reviewed</option>
                                            <option value="published">Published</option>
                                        </select>
                                    </div>
                                    <div>
                                        <label className="flex items-center">
                                            <input
                                                type="checkbox"
                                                checked={selectedFeedback.isPublic}
                                                onChange={() => handleTogglePublic(selectedFeedback.id)}
                                                className="mr-2"
                                            />
                                            <span className="font-medium text-gray-700">Public</span>
                                        </label>
                                    </div>
                                </div>
                            </div>

                            <div className="flex justify-end space-x-3 mt-6">
                                <button
                                    onClick={() => setShowViewModal(false)}
                                    className="px-4 py-2 text-gray-600 border border-gray-300 rounded hover:bg-gray-50"
                                >
                                    Close
                                </button>
                                <button
                                    onClick={() => {
                                        setShowViewModal(false);
                                        handleReplyFeedback(selectedFeedback);
                                    }}
                                    className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
                                >
                                    Reply
                                </button>
                            </div>
                        </motion.div>
                    </div>
                )}

                {/* Reply Modal */}
                {showReplyModal && selectedFeedback && (
                    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
                        <motion.div
                            initial={{ opacity: 0, scale: 0.9 }}
                            animate={{ opacity: 1, scale: 1 }}
                            className="bg-white rounded-lg p-6 w-full max-w-lg mx-4"
                        >
                            <h3 className="text-lg font-semibold mb-4">Reply to Feedback</h3>
                            
                            <div className="mb-4">
                                <p className="text-sm text-gray-600 mb-2">Original Message:</p>
                                <p className="text-gray-800 bg-gray-50 p-3 rounded">{selectedFeedback.message}</p>
                            </div>

                            <div className="mb-4">
                                <label className="block text-sm font-medium text-gray-700 mb-2">
                                    Your Reply:
                                </label>
                                <textarea
                                    value={replyText}
                                    onChange={(e) => setReplyText(e.target.value)}
                                    rows={4}
                                    className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                                    placeholder="Type your reply here..."
                                />
                            </div>

                            <div className="flex justify-end space-x-3">
                                <button
                                    onClick={() => setShowReplyModal(false)}
                                    className="px-4 py-2 text-gray-600 border border-gray-300 rounded hover:bg-gray-50"
                                >
                                    Cancel
                                </button>
                                <button
                                    onClick={handleSubmitReply}
                                    className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
                                >
                                    Send Reply
                                </button>
                            </div>
                        </motion.div>
                    </div>
                )}
            </motion.div>
        </div>
    );
};

export default FeedbackManagement;