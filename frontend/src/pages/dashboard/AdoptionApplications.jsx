import { useState } from 'react';
import { FaHeart, FaCheck, FaTimes, FaEye, FaSearch, FaFilter, FaClock } from 'react-icons/fa';
import { motion } from 'framer-motion';
import toast from 'react-hot-toast';

const AdoptionApplications = () => {
  const [applications, setApplications] = useState([
    {
      id: 1,
      petName: 'Buddy',
      petImage: 'https://images.unsplash.com/photo-1552053831-71594a27632d?w=300',
      applicantName: 'John Smith',
      applicantEmail: 'john@example.com',
      status: 'Pending',
      submissionDate: '2024-01-15',
      reason: 'Looking for a loyal companion for my family'
    },
    {
      id: 2,
      petName: 'Luna',
      petImage: 'https://images.unsplash.com/photo-1574158622682-e40e69881006?w=300',
      applicantName: 'Sarah Johnson',
      applicantEmail: 'sarah@example.com',
      status: 'Approved',
      submissionDate: '2024-01-12',
      reason: 'Want to give a loving home to a cat'
    },
    {
      id: 3,
      petName: 'Max',
      petImage: 'https://images.unsplash.com/photo-1583337130417-3346a1be7dee?w=300',
      applicantName: 'Mike Wilson',
      applicantEmail: 'mike@example.com',
      status: 'Rejected',
      submissionDate: '2024-01-10',
      reason: 'Need a guard dog for home security'
    }
  ]);
  
  const [searchTerm, setSearchTerm] = useState('');
  const [filterStatus, setFilterStatus] = useState('all');
  const [selectedApplication, setSelectedApplication] = useState(null);

  const filteredApplications = applications.filter(app => {
    const matchesSearch = app.applicantName.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         app.petName.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus = filterStatus === 'all' || app.status.toLowerCase() === filterStatus.toLowerCase();
    return matchesSearch && matchesStatus;
  });

  const handleStatusUpdate = (id, newStatus) => {
    setApplications(applications.map(app => 
      app.id === id ? { ...app, status: newStatus } : app
    ));
    toast.success(`Application ${newStatus.toLowerCase()} successfully!`);
  };

  const getStatusColor = (status) => {
    switch (status) {
      case 'Pending': return 'bg-yellow-100 text-yellow-800';
      case 'Approved': return 'bg-green-100 text-green-800';
      case 'Rejected': return 'bg-red-100 text-red-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getStatusIcon = (status) => {
    switch (status) {
      case 'Pending': return <FaClock />;
      case 'Approved': return <FaCheck />;
      case 'Rejected': return <FaTimes />;
      default: return <FaClock />;
    }
  };

  return (
    <div className="p-6">
      {/* Header */}
      <div className="flex justify-between items-center mb-8">
        <div>
          <h1 className="text-3xl font-bold text-gray-800 flex items-center gap-3">
            <FaHeart className="text-pink-600" />
            Adoption Applications
          </h1>
          <p className="text-gray-600 mt-2">Review and manage pet adoption applications</p>
        </div>
      </div>

      {/* Search and Filter */}
      <div className="bg-white rounded-xl shadow-lg p-6 mb-8">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="relative">
            <FaSearch className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
            <input
              type="text"
              placeholder="Search applications..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-10 pr-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-pink-500 focus:border-transparent"
            />
          </div>
          <div className="relative">
            <FaFilter className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
            <select
              value={filterStatus}
              onChange={(e) => setFilterStatus(e.target.value)}
              className="w-full pl-10 pr-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-pink-500 focus:border-transparent appearance-none"
            >
              <option value="all">All Status</option>
              <option value="pending">Pending</option>
              <option value="approved">Approved</option>
              <option value="rejected">Rejected</option>
            </select>
          </div>
          <div className="text-gray-600 flex items-center">
            Total Applications: <span className="font-bold text-pink-600 ml-2">{filteredApplications.length}</span>
          </div>
        </div>
      </div>

      {/* Applications Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-6">
        {filteredApplications.map((application) => (
          <motion.div
            key={application.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="bg-white rounded-xl shadow-lg overflow-hidden hover:shadow-xl transition-all duration-300"
          >
            <div className="flex items-center p-4 border-b border-gray-100">
              <img
                src={application.petImage}
                alt={application.petName}
                className="w-16 h-16 rounded-full object-cover mr-4"
              />
              <div className="flex-1">
                <h3 className="text-lg font-bold text-gray-800">{application.petName}</h3>
                <p className="text-gray-600 text-sm">Pet</p>
              </div>
              <div className={`px-3 py-1 rounded-full text-sm font-semibold flex items-center gap-2 ${getStatusColor(application.status)}`}>
                {getStatusIcon(application.status)}
                {application.status}
              </div>
            </div>
            
            <div className="p-4">
              <div className="space-y-2 mb-4">
                <p><span className="font-semibold text-gray-700">Applicant:</span> {application.applicantName}</p>
                <p><span className="font-semibold text-gray-700">Email:</span> {application.applicantEmail}</p>
                <p><span className="font-semibold text-gray-700">Date:</span> {application.submissionDate}</p>
                <p><span className="font-semibold text-gray-700">Reason:</span></p>
                <p className="text-gray-600 text-sm bg-gray-50 p-3 rounded-lg">{application.reason}</p>
              </div>
              
              <div className="flex justify-between items-center space-x-2">
                <button 
                  onClick={() => setSelectedApplication(application)}
                  className="flex-1 bg-blue-500 text-white py-2 px-3 rounded-lg hover:bg-blue-600 transition-colors flex items-center justify-center gap-2"
                >
                  <FaEye /> View Details
                </button>
                {application.status === 'Pending' && (
                  <>
                    <button 
                      onClick={() => handleStatusUpdate(application.id, 'Approved')}
                      className="bg-green-500 text-white p-2 rounded-lg hover:bg-green-600 transition-colors"
                    >
                      <FaCheck />
                    </button>
                    <button 
                      onClick={() => handleStatusUpdate(application.id, 'Rejected')}
                      className="bg-red-500 text-white p-2 rounded-lg hover:bg-red-600 transition-colors"
                    >
                      <FaTimes />
                    </button>
                  </>
                )}
              </div>
            </div>
          </motion.div>
        ))}
      </div>

      {/* Application Details Modal */}
      {selectedApplication && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-2xl p-8 max-w-2xl w-full mx-4 max-h-[80vh] overflow-y-auto">
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-2xl font-bold text-gray-800">Application Details</h2>
              <button
                onClick={() => setSelectedApplication(null)}
                className="text-gray-500 hover:text-gray-700 text-2xl"
              >
                <FaTimes />
              </button>
            </div>
            
            <div className="space-y-6">
              <div className="flex items-center space-x-4">
                <img
                  src={selectedApplication.petImage}
                  alt={selectedApplication.petName}
                  className="w-24 h-24 rounded-full object-cover"
                />
                <div>
                  <h3 className="text-xl font-bold text-gray-800">{selectedApplication.petName}</h3>
                  <div className={`inline-flex items-center gap-2 px-3 py-1 rounded-full text-sm font-semibold ${getStatusColor(selectedApplication.status)}`}>
                    {getStatusIcon(selectedApplication.status)}
                    {selectedApplication.status}
                  </div>
                </div>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="font-semibold text-gray-700">Applicant Name:</label>
                  <p className="text-gray-600">{selectedApplication.applicantName}</p>
                </div>
                <div>
                  <label className="font-semibold text-gray-700">Email:</label>
                  <p className="text-gray-600">{selectedApplication.applicantEmail}</p>
                </div>
                <div>
                  <label className="font-semibold text-gray-700">Submission Date:</label>
                  <p className="text-gray-600">{selectedApplication.submissionDate}</p>
                </div>
              </div>
              
              <div>
                <label className="font-semibold text-gray-700">Reason for Adoption:</label>
                <p className="text-gray-600 bg-gray-50 p-4 rounded-lg mt-2">{selectedApplication.reason}</p>
              </div>
              
              {selectedApplication.status === 'Pending' && (
                <div className="flex justify-end space-x-4 pt-4 border-t border-gray-200">
                  <button 
                    onClick={() => {
                      handleStatusUpdate(selectedApplication.id, 'Rejected');
                      setSelectedApplication(null);
                    }}
                    className="px-6 py-3 bg-red-500 text-white rounded-xl hover:bg-red-600 flex items-center gap-2"
                  >
                    <FaTimes /> Reject
                  </button>
                  <button 
                    onClick={() => {
                      handleStatusUpdate(selectedApplication.id, 'Approved');
                      setSelectedApplication(null);
                    }}
                    className="px-6 py-3 bg-green-500 text-white rounded-xl hover:bg-green-600 flex items-center gap-2"
                  >
                    <FaCheck /> Approve
                  </button>
                </div>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default AdoptionApplications;