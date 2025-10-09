import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { FaSearch, FaFilter, FaCheck, FaTimes, FaClock, FaEye, FaUser, FaPaw } from 'react-icons/fa';
import { adoptionAPI } from '../../services/api';
import toast from 'react-hot-toast';

const AdminApplications = () => {
  const [applications, setApplications] = useState([]);
  const [filteredApplications, setFilteredApplications] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('ALL');
  const [selectedApplication, setSelectedApplication] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const [showDetailsModal, setShowDetailsModal] = useState(false);
  const [adminNotes, setAdminNotes] = useState('');

  useEffect(() => {
    fetchApplications();
  }, []);

  useEffect(() => {
    filterApplications();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [applications, searchTerm, statusFilter]);

  const fetchApplications = async () => {
    try {
      setLoading(true);
      const response = await adoptionAPI.getAllApplications();
      setApplications(response.data || []);
    } catch (error) {
      console.error('Error fetching applications:', error);
      toast.error('Failed to load applications');
    } finally {
      setLoading(false);
    }
  };

  const filterApplications = () => {
    let filtered = [...applications];

    // Filter by status
    if (statusFilter !== 'ALL') {
      filtered = filtered.filter(app => app.status === statusFilter);
    }

    // Filter by search term
    if (searchTerm) {
      filtered = filtered.filter(app =>
        app.user?.name?.toLowerCase().includes(searchTerm.toLowerCase()) ||
        app.user?.email?.toLowerCase().includes(searchTerm.toLowerCase()) ||
        app.pet?.name?.toLowerCase().includes(searchTerm.toLowerCase()) ||
        app.pet?.species?.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }

    // Sort by date (newest first)
    filtered.sort((a, b) => new Date(b.submissionDate) - new Date(a.submissionDate));

    setFilteredApplications(filtered);
  };

  const updateApplicationStatus = async (applicationId, newStatus, notes) => {
    const loadingToast = toast.loading('Updating application status...');
    try {
      await adoptionAPI.updateApplicationStatus(applicationId, {
        status: newStatus,
        adminNotes: notes || ''
      });
      toast.success(`Application status updated to ${newStatus}!`);
      await fetchApplications();
      setShowModal(false);
      setSelectedApplication(null);
      setAdminNotes('');
    } catch (error) {
      console.error('Error updating application status:', error);
      toast.error('Failed to update application status');
    } finally {
      toast.dismiss(loadingToast);
    }
  };

  const getStatusColor = (status) => {
    switch (status) {
      case 'APPROVED':
        return 'bg-green-100 text-green-800 border-green-300';
      case 'PENDING':
        return 'bg-yellow-100 text-yellow-800 border-yellow-300';
      case 'REJECTED':
        return 'bg-red-100 text-red-800 border-red-300';
      case 'UNDER_REVIEW':
        return 'bg-blue-100 text-blue-800 border-blue-300';
      default:
        return 'bg-gray-100 text-gray-800 border-gray-300';
    }
  };

  const getStatusIcon = (status) => {
    switch (status) {
      case 'APPROVED':
        return <FaCheck className="text-green-600" />;
      case 'PENDING':
        return <FaClock className="text-yellow-600" />;
      case 'REJECTED':
        return <FaTimes className="text-red-600" />;
      case 'UNDER_REVIEW':
        return <FaEye className="text-blue-600" />;
      default:
        return <FaClock className="text-gray-600" />;
    }
  };

  const formatDate = (dateString) => {
    if (!dateString) return 'N/A';
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  const getApplicationStats = () => {
    const total = applications.length;
    const approved = applications.filter(app => app.status === 'APPROVED').length;
    const pending = applications.filter(app => app.status === 'PENDING').length;
    const rejected = applications.filter(app => app.status === 'REJECTED').length;
    const underReview = applications.filter(app => app.status === 'UNDER_REVIEW').length;

    return { total, approved, pending, rejected, underReview };
  };

  const stats = getApplicationStats();

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="w-16 h-16 border-4 border-pink-200 border-t-pink-500 rounded-full animate-spin mx-auto mb-4"></div>
          <p className="text-gray-600">Loading applications...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 via-pink-50 to-amber-50 p-6">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="max-w-7xl mx-auto"
      >
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-4xl font-bold bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent mb-2">
            🐾 Adoption Applications Management
          </h1>
          <p className="text-gray-600">Review and manage adoption applications</p>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-4 mb-6">
          <motion.div
            whileHover={{ scale: 1.05 }}
            className="bg-white/80 backdrop-blur-lg rounded-xl p-4 shadow-lg border border-gray-200"
          >
            <p className="text-gray-600 text-sm">Total Applications</p>
            <p className="text-2xl font-bold text-gray-800">{stats.total}</p>
          </motion.div>

          <motion.div
            whileHover={{ scale: 1.05 }}
            className="bg-green-50/80 backdrop-blur-lg rounded-xl p-4 shadow-lg border border-green-200"
          >
            <p className="text-green-600 text-sm">Approved</p>
            <p className="text-2xl font-bold text-green-800">{stats.approved}</p>
          </motion.div>

          <motion.div
            whileHover={{ scale: 1.05 }}
            className="bg-yellow-50/80 backdrop-blur-lg rounded-xl p-4 shadow-lg border border-yellow-200"
          >
            <p className="text-yellow-600 text-sm">Pending</p>
            <p className="text-2xl font-bold text-yellow-800">{stats.pending}</p>
          </motion.div>

          <motion.div
            whileHover={{ scale: 1.05 }}
            className="bg-blue-50/80 backdrop-blur-lg rounded-xl p-4 shadow-lg border border-blue-200"
          >
            <p className="text-blue-600 text-sm">Under Review</p>
            <p className="text-2xl font-bold text-blue-800">{stats.underReview}</p>
          </motion.div>

          <motion.div
            whileHover={{ scale: 1.05 }}
            className="bg-red-50/80 backdrop-blur-lg rounded-xl p-4 shadow-lg border border-red-200"
          >
            <p className="text-red-600 text-sm">Rejected</p>
            <p className="text-2xl font-bold text-red-800">{stats.rejected}</p>
          </motion.div>
        </div>

        {/* Filters */}
        <div className="bg-white/80 backdrop-blur-lg rounded-xl p-6 shadow-lg border border-gray-200 mb-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {/* Search */}
            <div className="relative">
              <FaSearch className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
              <input
                type="text"
                placeholder="Search by user name, email, pet name, or species..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-pink-500 focus:border-transparent"
              />
            </div>

            {/* Status Filter */}
            <div className="relative">
              <FaFilter className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
              <select
                value={statusFilter}
                onChange={(e) => setStatusFilter(e.target.value)}
                className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-pink-500 focus:border-transparent"
              >
                <option value="ALL">All Status</option>
                <option value="PENDING">Pending</option>
                <option value="UNDER_REVIEW">Under Review</option>
                <option value="APPROVED">Approved</option>
                <option value="REJECTED">Rejected</option>
              </select>
            </div>
          </div>
        </div>

        {/* Applications Table */}
        <div className="bg-white/80 backdrop-blur-lg rounded-xl shadow-lg border border-gray-200 overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-gradient-to-r from-purple-500 to-pink-500 text-white">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider">ID</th>
                  <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider">Applicant</th>
                  <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider">Pet</th>
                  <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider">Submission Date</th>
                  <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider">Status</th>
                  <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200">
                {filteredApplications.length === 0 ? (
                  <tr>
                    <td colSpan="6" className="px-6 py-8 text-center text-gray-500">
                      No applications found
                    </td>
                  </tr>
                ) : (
                  filteredApplications.map((application, index) => (
                    <motion.tr
                      key={application.id}
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: index * 0.05 }}
                      className="hover:bg-gray-50 transition-colors"
                    >
                      <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                        #{application.id}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="flex items-center">
                          <FaUser className="text-gray-400 mr-2" />
                          <div>
                            <div className="text-sm font-medium text-gray-900">{application.user?.name || 'N/A'}</div>
                            <div className="text-sm text-gray-500">{application.user?.email || 'N/A'}</div>
                          </div>
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="flex items-center">
                          <FaPaw className="text-gray-400 mr-2" />
                          <div>
                            <div className="text-sm font-medium text-gray-900">{application.pet?.name || 'N/A'}</div>
                            <div className="text-sm text-gray-500">{application.pet?.species || 'N/A'} - {application.pet?.breed || 'N/A'}</div>
                          </div>
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                        {formatDate(application.submissionDate)}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <span className={`inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-xs font-medium border ${getStatusColor(application.status)}`}>
                          {getStatusIcon(application.status)}
                          {application.status?.replace('_', ' ')}
                        </span>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm space-x-2">
                        <button
                          onClick={() => {
                            setSelectedApplication(application);
                            setShowDetailsModal(true);
                          }}
                          className="bg-blue-500 text-white px-3 py-1.5 rounded-lg hover:bg-blue-600 transition-all duration-300 font-medium inline-flex items-center gap-1"
                        >
                          <FaEye /> View
                        </button>
                        <button
                          onClick={() => {
                            setSelectedApplication(application);
                            setAdminNotes(application.adminNotes || '');
                            setShowModal(true);
                          }}
                          className="bg-gradient-to-r from-pink-500 to-purple-500 text-white px-3 py-1.5 rounded-lg hover:from-pink-600 hover:to-purple-600 transition-all duration-300 font-medium"
                        >
                          Update
                        </button>
                      </td>
                    </motion.tr>
                  ))
                )}
              </tbody>
            </table>
          </div>
        </div>
      </motion.div>

      {/* View Details Modal */}
      {showDetailsModal && selectedApplication && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4 overflow-y-auto">
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            className="bg-white rounded-2xl shadow-2xl max-w-2xl w-full p-6 my-8"
          >
            <h3 className="text-2xl font-bold text-gray-900 mb-4">Application Details</h3>
            
            <div className="space-y-4">
              {/* Application Info */}
              <div className="bg-gradient-to-r from-purple-50 to-pink-50 p-4 rounded-lg">
                <p className="text-sm text-gray-600">Application ID: <span className="font-bold">#{selectedApplication.id}</span></p>
                <p className="text-sm text-gray-600">Status: <span className={`font-bold ${selectedApplication.status === 'PENDING' ? 'text-yellow-600' : selectedApplication.status === 'APPROVED' ? 'text-green-600' : selectedApplication.status === 'REJECTED' ? 'text-red-600' : 'text-blue-600'}`}>{selectedApplication.status?.replace('_', ' ')}</span></p>
                <p className="text-sm text-gray-600">Submitted: <span className="font-bold">{formatDate(selectedApplication.submissionDate)}</span></p>
              </div>

              {/* Applicant Info */}
              <div className="border-l-4 border-purple-500 pl-4">
                <h4 className="font-bold text-lg text-gray-900 mb-2">👤 Applicant Information</h4>
                <p className="text-sm text-gray-700"><strong>Name:</strong> {selectedApplication.user?.name}</p>
                <p className="text-sm text-gray-700"><strong>Email:</strong> {selectedApplication.user?.email}</p>
                <p className="text-sm text-gray-700"><strong>Address:</strong> {selectedApplication.user?.address || 'N/A'}</p>
              </div>

              {/* Pet Info */}
              <div className="border-l-4 border-pink-500 pl-4">
                <h4 className="font-bold text-lg text-gray-900 mb-2">🐾 Pet Information</h4>
                <p className="text-sm text-gray-700"><strong>Name:</strong> {selectedApplication.pet?.name}</p>
                <p className="text-sm text-gray-700"><strong>Species:</strong> {selectedApplication.pet?.species}</p>
                <p className="text-sm text-gray-700"><strong>Breed:</strong> {selectedApplication.pet?.breed}</p>
                <p className="text-sm text-gray-700"><strong>Age:</strong> {selectedApplication.pet?.age} years</p>
              </div>

              {/* Application Details */}
              <div className="border-l-4 border-blue-500 pl-4">
                <h4 className="font-bold text-lg text-gray-900 mb-2">📝 Application Details</h4>
                <p className="text-sm text-gray-700 mb-2"><strong>Why do they want to adopt?</strong></p>
                <p className="text-sm text-gray-600 bg-gray-50 p-3 rounded">{selectedApplication.applicationReason || 'N/A'}</p>
                
                <p className="text-sm text-gray-700 mb-2 mt-3"><strong>Living Situation:</strong></p>
                <p className="text-sm text-gray-600 bg-gray-50 p-3 rounded">{selectedApplication.livingSituation || 'N/A'}</p>
                
                <p className="text-sm text-gray-700 mt-3"><strong>Has Other Pets:</strong> {selectedApplication.hasOtherPets ? 'Yes' : 'No'}</p>
                
                <p className="text-sm text-gray-700 mb-2 mt-3"><strong>Experience with Pets:</strong></p>
                <p className="text-sm text-gray-600 bg-gray-50 p-3 rounded">{selectedApplication.experienceWithPets || 'N/A'}</p>
              </div>

              {/* Admin Notes */}
              {selectedApplication.adminNotes && (
                <div className="border-l-4 border-yellow-500 pl-4">
                  <h4 className="font-bold text-lg text-gray-900 mb-2">📌 Admin Notes</h4>
                  <p className="text-sm text-gray-600 bg-yellow-50 p-3 rounded">{selectedApplication.adminNotes}</p>
                </div>
              )}
            </div>

            <button
              onClick={() => {
                setShowDetailsModal(false);
                setSelectedApplication(null);
              }}
              className="w-full mt-6 bg-gray-300 text-gray-700 py-3 rounded-lg hover:bg-gray-400 transition-colors font-medium"
            >
              Close
            </button>
          </motion.div>
        </div>
      )}

      {/* Update Status Modal */}
      {showModal && selectedApplication && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            className="bg-white rounded-2xl shadow-2xl max-w-md w-full p-6"
          >
            <h3 className="text-2xl font-bold text-gray-900 mb-4">Update Application Status</h3>
            
            <div className="mb-6 p-4 bg-gray-50 rounded-lg">
              <p className="text-sm text-gray-600">Application ID: <span className="font-bold">#{selectedApplication.id}</span></p>
              <p className="text-sm text-gray-600">Applicant: <span className="font-bold">{selectedApplication.user?.name}</span></p>
              <p className="text-sm text-gray-600">Pet: <span className="font-bold">{selectedApplication.pet?.name}</span></p>
              <p className="text-sm text-gray-600">Current Status: <span className={`font-bold ${selectedApplication.status === 'PENDING' ? 'text-yellow-600' : selectedApplication.status === 'APPROVED' ? 'text-green-600' : 'text-red-600'}`}>{selectedApplication.status?.replace('_', ' ')}</span></p>
            </div>

            {/* Admin Notes */}
            <div className="mb-4">
              <label className="block text-sm font-medium text-gray-700 mb-2">Admin Notes (Optional)</label>
              <textarea
                value={adminNotes}
                onChange={(e) => setAdminNotes(e.target.value)}
                placeholder="Add notes about this application..."
                rows="3"
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-pink-500 focus:border-transparent"
              />
            </div>

            <p className="text-gray-700 mb-4">Select new status:</p>

            <div className="space-y-2 mb-6">
              <button
                onClick={() => updateApplicationStatus(selectedApplication.id, 'UNDER_REVIEW', adminNotes)}
                disabled={selectedApplication.status === 'UNDER_REVIEW'}
                className="w-full bg-blue-500 text-white py-3 rounded-lg hover:bg-blue-600 transition-colors disabled:opacity-50 disabled:cursor-not-allowed font-medium flex items-center justify-center gap-2"
              >
                <FaEye /> Mark as Under Review
              </button>

              <button
                onClick={() => updateApplicationStatus(selectedApplication.id, 'APPROVED', adminNotes)}
                disabled={selectedApplication.status === 'APPROVED'}
                className="w-full bg-green-500 text-white py-3 rounded-lg hover:bg-green-600 transition-colors disabled:opacity-50 disabled:cursor-not-allowed font-medium flex items-center justify-center gap-2"
              >
                <FaCheck /> Approve Application
              </button>

              <button
                onClick={() => updateApplicationStatus(selectedApplication.id, 'REJECTED', adminNotes)}
                disabled={selectedApplication.status === 'REJECTED'}
                className="w-full bg-red-500 text-white py-3 rounded-lg hover:bg-red-600 transition-colors disabled:opacity-50 disabled:cursor-not-allowed font-medium flex items-center justify-center gap-2"
              >
                <FaTimes /> Reject Application
              </button>

              <button
                onClick={() => updateApplicationStatus(selectedApplication.id, 'PENDING', adminNotes)}
                disabled={selectedApplication.status === 'PENDING'}
                className="w-full bg-yellow-500 text-white py-3 rounded-lg hover:bg-yellow-600 transition-colors disabled:opacity-50 disabled:cursor-not-allowed font-medium flex items-center justify-center gap-2"
              >
                <FaClock /> Mark as Pending
              </button>
            </div>

            <button
              onClick={() => {
                setShowModal(false);
                setSelectedApplication(null);
                setAdminNotes('');
              }}
              className="w-full bg-gray-300 text-gray-700 py-3 rounded-lg hover:bg-gray-400 transition-colors font-medium"
            >
              Cancel
            </button>
          </motion.div>
        </div>
      )}
    </div>
  );
};

export default AdminApplications;
