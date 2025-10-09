import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { FaSearch, FaFilter, FaCheck, FaTimes, FaUndo, FaClock } from 'react-icons/fa';
import { paymentAPI } from '../../services/api';
import toast from 'react-hot-toast';

const AdminPayments = () => {
  const [payments, setPayments] = useState([]);
  const [filteredPayments, setFilteredPayments] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('ALL');
  const [selectedPayment, setSelectedPayment] = useState(null);
  const [showModal, setShowModal] = useState(false);

  useEffect(() => {
    fetchPayments();
  }, []);

  useEffect(() => {
    filterPayments();
  }, [payments, searchTerm, statusFilter]);

  const fetchPayments = async () => {
    try {
      setLoading(true);
      const response = await paymentAPI.getAllPayments();
      setPayments(response.data || []);
    } catch (error) {
      console.error('Error fetching payments:', error);
      toast.error('Failed to load payments');
    } finally {
      setLoading(false);
    }
  };

  const filterPayments = () => {
    let filtered = [...payments];

    // Filter by status
    if (statusFilter !== 'ALL') {
      filtered = filtered.filter(p => p.status === statusFilter);
    }

    // Filter by search term
    if (searchTerm) {
      filtered = filtered.filter(p =>
        p.tranId?.toLowerCase().includes(searchTerm.toLowerCase()) ||
        p.user?.name?.toLowerCase().includes(searchTerm.toLowerCase()) ||
        p.user?.email?.toLowerCase().includes(searchTerm.toLowerCase()) ||
        p.purpose?.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }

    // Sort by date (newest first)
    filtered.sort((a, b) => new Date(b.date) - new Date(a.date));

    setFilteredPayments(filtered);
  };

  const updatePaymentStatus = async (paymentId, newStatus) => {
    const loadingToast = toast.loading('Updating payment status...');
    try {
      await paymentAPI.updatePaymentStatus(paymentId, newStatus);
      toast.success(`Payment status updated to ${newStatus}!`);
      await fetchPayments();
      setShowModal(false);
      setSelectedPayment(null);
    } catch (error) {
      console.error('Error updating payment status:', error);
      toast.error('Failed to update payment status');
    } finally {
      toast.dismiss(loadingToast);
    }
  };

  const getStatusColor = (status) => {
    const statusUpper = status?.toUpperCase();
    switch (statusUpper) {
      case 'COMPLETED':
      case 'SUCCESS':
        return 'bg-green-100 text-green-800 border-green-300';
      case 'PENDING':
        return 'bg-yellow-100 text-yellow-800 border-yellow-300';
      case 'FAILED':
        return 'bg-red-100 text-red-800 border-red-300';
      case 'REFUNDED':
        return 'bg-purple-100 text-purple-800 border-purple-300';
      default:
        return 'bg-gray-100 text-gray-800 border-gray-300';
    }
  };

  const getStatusIcon = (status) => {
    const statusUpper = status?.toUpperCase();
    switch (statusUpper) {
      case 'COMPLETED':
      case 'SUCCESS':
        return <FaCheck className="text-green-600" />;
      case 'PENDING':
        return <FaClock className="text-yellow-600" />;
      case 'FAILED':
        return <FaTimes className="text-red-600" />;
      case 'REFUNDED':
        return <FaUndo className="text-purple-600" />;
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

  const getPaymentStats = () => {
    const total = payments.length;
    const completed = payments.filter(p => p.status === 'COMPLETED').length;
    const pending = payments.filter(p => p.status === 'PENDING').length;
    const failed = payments.filter(p => p.status === 'FAILED').length;
    const refunded = payments.filter(p => p.status === 'REFUNDED').length;
    const totalAmount = payments
      .filter(p => p.status === 'COMPLETED')
      .reduce((sum, p) => sum + (p.amount || 0), 0);

    return { total, completed, pending, failed, refunded, totalAmount };
  };

  const stats = getPaymentStats();

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="w-16 h-16 border-4 border-pink-200 border-t-pink-500 rounded-full animate-spin mx-auto mb-4"></div>
          <p className="text-gray-600">Loading payments...</p>
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
            💳 Payment Management
          </h1>
          <p className="text-gray-600">Manage and update payment statuses</p>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-6 gap-4 mb-6">
          <motion.div
            whileHover={{ scale: 1.05 }}
            className="bg-white/80 backdrop-blur-lg rounded-xl p-4 shadow-lg border border-gray-200"
          >
            <p className="text-gray-600 text-sm">Total Payments</p>
            <p className="text-2xl font-bold text-gray-800">{stats.total}</p>
          </motion.div>

          <motion.div
            whileHover={{ scale: 1.05 }}
            className="bg-green-50/80 backdrop-blur-lg rounded-xl p-4 shadow-lg border border-green-200"
          >
            <p className="text-green-600 text-sm">Completed</p>
            <p className="text-2xl font-bold text-green-800">{stats.completed}</p>
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
            className="bg-red-50/80 backdrop-blur-lg rounded-xl p-4 shadow-lg border border-red-200"
          >
            <p className="text-red-600 text-sm">Failed</p>
            <p className="text-2xl font-bold text-red-800">{stats.failed}</p>
          </motion.div>

          <motion.div
            whileHover={{ scale: 1.05 }}
            className="bg-purple-50/80 backdrop-blur-lg rounded-xl p-4 shadow-lg border border-purple-200"
          >
            <p className="text-purple-600 text-sm">Refunded</p>
            <p className="text-2xl font-bold text-purple-800">{stats.refunded}</p>
          </motion.div>

          <motion.div
            whileHover={{ scale: 1.05 }}
            className="bg-gradient-to-br from-pink-500 to-purple-500 rounded-xl p-4 shadow-lg text-white"
          >
            <p className="text-white/90 text-sm">Total Revenue</p>
            <p className="text-2xl font-bold">${stats.totalAmount.toFixed(2)}</p>
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
                placeholder="Search by transaction ID, user, email, or purpose..."
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
                <option value="COMPLETED">Completed</option>
                <option value="FAILED">Failed</option>
                <option value="REFUNDED">Refunded</option>
              </select>
            </div>
          </div>
        </div>

        {/* Payments Table */}
        <div className="bg-white/80 backdrop-blur-lg rounded-xl shadow-lg border border-gray-200 overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-gradient-to-r from-purple-500 to-pink-500 text-white">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider">ID</th>
                  <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider">User</th>
                  <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider">Purpose</th>
                  <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider">Amount</th>
                  <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider">Transaction ID</th>
                  <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider">Date</th>
                  <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider">Status</th>
                  <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200">
                {filteredPayments.length === 0 ? (
                  <tr>
                    <td colSpan="8" className="px-6 py-8 text-center text-gray-500">
                      No payments found
                    </td>
                  </tr>
                ) : (
                  filteredPayments.map((payment, index) => (
                    <motion.tr
                      key={payment.id}
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: index * 0.05 }}
                      className="hover:bg-gray-50 transition-colors"
                    >
                      <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                        #{payment.id}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="text-sm font-medium text-gray-900">{payment.user?.name || 'N/A'}</div>
                        <div className="text-sm text-gray-500">{payment.user?.email || 'N/A'}</div>
                      </td>
                      <td className="px-6 py-4">
                        <div className="text-sm text-gray-900 max-w-xs truncate">{payment.purpose || 'N/A'}</div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="text-sm font-bold text-gray-900">${payment.amount?.toFixed(2) || '0.00'}</div>
                        <div className="text-xs text-gray-500">{payment.currency || 'USD'}</div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="text-sm text-gray-900">{payment.tranId || 'N/A'}</div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                        {formatDate(payment.date)}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <span className={`inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-xs font-medium border ${getStatusColor(payment.status)}`}>
                          {getStatusIcon(payment.status)}
                          {payment.status}
                        </span>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm">
                        <button
                          onClick={() => {
                            setSelectedPayment(payment);
                            setShowModal(true);
                          }}
                          className="bg-gradient-to-r from-pink-500 to-purple-500 text-white px-4 py-2 rounded-lg hover:from-pink-600 hover:to-purple-600 transition-all duration-300 font-medium"
                        >
                          Update Status
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

      {/* Update Status Modal */}
      {showModal && selectedPayment && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            className="bg-white rounded-2xl shadow-2xl max-w-md w-full p-6"
          >
            <h3 className="text-2xl font-bold text-gray-900 mb-4">Update Payment Status</h3>
            
            <div className="mb-6 p-4 bg-gray-50 rounded-lg">
              <p className="text-sm text-gray-600">Payment ID: <span className="font-bold">#{selectedPayment.id}</span></p>
              <p className="text-sm text-gray-600">User: <span className="font-bold">{selectedPayment.user?.name}</span></p>
              <p className="text-sm text-gray-600">Amount: <span className="font-bold">${selectedPayment.amount?.toFixed(2)}</span></p>
              <p className="text-sm text-gray-600">Current Status: <span className={`font-bold ${selectedPayment.status === 'PENDING' ? 'text-yellow-600' : selectedPayment.status === 'COMPLETED' ? 'text-green-600' : 'text-red-600'}`}>{selectedPayment.status}</span></p>
            </div>

            <p className="text-gray-700 mb-4">Select new status:</p>

            <div className="space-y-2 mb-6">
              <button
                onClick={() => updatePaymentStatus(selectedPayment.id, 'COMPLETED')}
                disabled={selectedPayment.status === 'COMPLETED'}
                className="w-full bg-green-500 text-white py-3 rounded-lg hover:bg-green-600 transition-colors disabled:opacity-50 disabled:cursor-not-allowed font-medium flex items-center justify-center gap-2"
              >
                <FaCheck /> Mark as Completed
              </button>

              <button
                onClick={() => updatePaymentStatus(selectedPayment.id, 'PENDING')}
                disabled={selectedPayment.status === 'PENDING'}
                className="w-full bg-yellow-500 text-white py-3 rounded-lg hover:bg-yellow-600 transition-colors disabled:opacity-50 disabled:cursor-not-allowed font-medium flex items-center justify-center gap-2"
              >
                <FaClock /> Mark as Pending
              </button>

              <button
                onClick={() => updatePaymentStatus(selectedPayment.id, 'FAILED')}
                disabled={selectedPayment.status === 'FAILED'}
                className="w-full bg-red-500 text-white py-3 rounded-lg hover:bg-red-600 transition-colors disabled:opacity-50 disabled:cursor-not-allowed font-medium flex items-center justify-center gap-2"
              >
                <FaTimes /> Mark as Failed
              </button>

              <button
                onClick={() => updatePaymentStatus(selectedPayment.id, 'REFUNDED')}
                disabled={selectedPayment.status === 'REFUNDED'}
                className="w-full bg-purple-500 text-white py-3 rounded-lg hover:bg-purple-600 transition-colors disabled:opacity-50 disabled:cursor-not-allowed font-medium flex items-center justify-center gap-2"
              >
                <FaUndo /> Mark as Refunded
              </button>
            </div>

            <button
              onClick={() => {
                setShowModal(false);
                setSelectedPayment(null);
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

export default AdminPayments;
