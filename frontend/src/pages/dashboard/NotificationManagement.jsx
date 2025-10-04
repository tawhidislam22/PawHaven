import { useState } from 'react';
import { FaBell, FaPlus, FaTrash, FaEye, FaSearch, FaFilter, FaCheck, FaTimes } from 'react-icons/fa';
import { motion } from 'framer-motion';
import toast from 'react-hot-toast';

const NotificationManagement = () => {
  const [notifications, setNotifications] = useState([
    {
      id: 1,
      type: 'Adoption Update',
      message: 'Your adoption application for Buddy has been approved!',
      date: '2024-01-15',
      recipient: 'John Smith',
      status: 'Sent',
      priority: 'High'
    },
    {
      id: 2,
      type: 'Payment Confirmation',
      message: 'Payment of $150 has been successfully processed.',
      date: '2024-01-14',
      recipient: 'Sarah Johnson',
      status: 'Delivered',
      priority: 'Medium'
    },
    {
      id: 3,
      type: 'System Alert',
      message: 'Your account password will expire in 7 days.',
      date: '2024-01-13',
      recipient: 'All Users',
      status: 'Pending',
      priority: 'Low'
    },
    {
      id: 4,
      type: 'Pet Update',
      message: 'New pets have been added to the shelter.',
      date: '2024-01-12',
      recipient: 'All Users',
      status: 'Failed',
      priority: 'Medium'
    }
  ]);
  
  const [searchTerm, setSearchTerm] = useState('');
  const [filterStatus, setFilterStatus] = useState('all');
  const [showAddModal, setShowAddModal] = useState(false);

  const filteredNotifications = notifications.filter(notification => {
    const matchesSearch = notification.message.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         notification.type.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         notification.recipient.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus = filterStatus === 'all' || notification.status.toLowerCase() === filterStatus.toLowerCase();
    return matchesSearch && matchesStatus;
  });

  const handleAddNotification = (notificationData) => {
    const newNotification = {
      id: notifications.length + 1,
      ...notificationData,
      date: new Date().toISOString().split('T')[0],
      status: 'Pending'
    };
    setNotifications([...notifications, newNotification]);
    toast.success('Notification created successfully! 🔔');
    setShowAddModal(false);
  };

  const handleDeleteNotification = (id) => {
    if (window.confirm('Are you sure you want to delete this notification?')) {
      setNotifications(notifications.filter(notification => notification.id !== id));
      toast.success('Notification deleted successfully');
    }
  };

  const getStatusColor = (status) => {
    switch (status) {
      case 'Sent': return 'bg-blue-100 text-blue-800';
      case 'Delivered': return 'bg-green-100 text-green-800';
      case 'Pending': return 'bg-yellow-100 text-yellow-800';
      case 'Failed': return 'bg-red-100 text-red-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getPriorityColor = (priority) => {
    switch (priority) {
      case 'High': return 'bg-red-100 text-red-800';
      case 'Medium': return 'bg-yellow-100 text-yellow-800';
      case 'Low': return 'bg-green-100 text-green-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getStatusIcon = (status) => {
    switch (status) {
      case 'Sent': return <FaBell />;
      case 'Delivered': return <FaCheck />;
      case 'Pending': return <FaBell />;
      case 'Failed': return <FaTimes />;
      default: return <FaBell />;
    }
  };

  return (
    <div className="p-6">
      {/* Header */}
      <div className="flex justify-between items-center mb-8">
        <div>
          <h1 className="text-3xl font-bold text-gray-800 flex items-center gap-3">
            <FaBell className="text-blue-600" />
            Notification Management
          </h1>
          <p className="text-gray-600 mt-2">Send and manage system notifications</p>
        </div>
        <button
          onClick={() => setShowAddModal(true)}
          className="bg-gradient-to-r from-blue-500 to-purple-500 text-white px-6 py-3 rounded-xl hover:shadow-lg transition-all duration-300 flex items-center gap-2"
        >
          <FaPlus /> Send Notification
        </button>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
        {['Sent', 'Delivered', 'Pending', 'Failed'].map((status) => {
          const count = notifications.filter(n => n.status === status).length;
          const colors = {
            'Sent': 'from-blue-500 to-blue-600',
            'Delivered': 'from-green-500 to-green-600',
            'Pending': 'from-yellow-500 to-yellow-600',
            'Failed': 'from-red-500 to-red-600'
          };
          
          return (
            <div key={status} className={`bg-gradient-to-r ${colors[status]} text-white rounded-xl p-6`}>
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-white/80">{status}</p>
                  <p className="text-2xl font-bold">{count}</p>
                </div>
                {getStatusIcon(status)}
              </div>
            </div>
          );
        })}
      </div>

      {/* Search and Filter */}
      <div className="bg-white rounded-xl shadow-lg p-6 mb-8">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="relative">
            <FaSearch className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
            <input
              type="text"
              placeholder="Search notifications..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-10 pr-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            />
          </div>
          <div className="relative">
            <FaFilter className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
            <select
              value={filterStatus}
              onChange={(e) => setFilterStatus(e.target.value)}
              className="w-full pl-10 pr-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent appearance-none"
            >
              <option value="all">All Status</option>
              <option value="sent">Sent</option>
              <option value="delivered">Delivered</option>
              <option value="pending">Pending</option>
              <option value="failed">Failed</option>
            </select>
          </div>
          <div className="text-gray-600 flex items-center">
            Total Notifications: <span className="font-bold text-blue-600 ml-2">{filteredNotifications.length}</span>
          </div>
        </div>
      </div>

      {/* Notifications Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {filteredNotifications.map((notification) => (
          <motion.div
            key={notification.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="bg-white rounded-xl shadow-lg p-6 hover:shadow-xl transition-all duration-300"
          >
            <div className="flex justify-between items-start mb-4">
              <div className="flex items-center space-x-3">
                <div className={`p-2 rounded-lg ${getStatusColor(notification.status)}`}>
                  {getStatusIcon(notification.status)}
                </div>
                <div>
                  <h3 className="font-bold text-gray-800">{notification.type}</h3>
                  <p className="text-sm text-gray-600">{notification.date}</p>
                </div>
              </div>
              <div className="flex space-x-2">
                <span className={`px-2 py-1 rounded-full text-xs font-semibold ${getPriorityColor(notification.priority)}`}>
                  {notification.priority}
                </span>
                <span className={`px-2 py-1 rounded-full text-xs font-semibold ${getStatusColor(notification.status)}`}>
                  {notification.status}
                </span>
              </div>
            </div>
            
            <p className="text-gray-700 mb-4">{notification.message}</p>
            
            <div className="flex justify-between items-center">
              <div>
                <p className="text-sm text-gray-600">
                  <span className="font-semibold">To:</span> {notification.recipient}
                </p>
              </div>
              <div className="flex space-x-2">
                <button className="p-2 text-blue-600 hover:bg-blue-50 rounded-lg transition-colors">
                  <FaEye />
                </button>
                <button 
                  onClick={() => handleDeleteNotification(notification.id)}
                  className="p-2 text-red-600 hover:bg-red-50 rounded-lg transition-colors"
                >
                  <FaTrash />
                </button>
              </div>
            </div>
          </motion.div>
        ))}
      </div>

      {/* Add Notification Modal */}
      {showAddModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-2xl p-8 max-w-md w-full mx-4">
            <h2 className="text-2xl font-bold text-gray-800 mb-6">Send New Notification</h2>
            <form onSubmit={(e) => {
              e.preventDefault();
              const formData = new FormData(e.target);
              const notificationData = {
                type: formData.get('type'),
                message: formData.get('message'),
                recipient: formData.get('recipient'),
                priority: formData.get('priority')
              };
              handleAddNotification(notificationData);
            }}>
              <div className="space-y-4">
                <select name="type" className="w-full p-3 border border-gray-200 rounded-xl" required>
                  <option value="">Select Type</option>
                  <option value="Adoption Update">Adoption Update</option>
                  <option value="Payment Confirmation">Payment Confirmation</option>
                  <option value="System Alert">System Alert</option>
                  <option value="Pet Update">Pet Update</option>
                  <option value="General">General</option>
                </select>
                <textarea 
                  name="message" 
                  placeholder="Notification message..." 
                  className="w-full p-3 border border-gray-200 rounded-xl" 
                  rows="4"
                  required 
                />
                <input name="recipient" placeholder="Recipient (or 'All Users')" className="w-full p-3 border border-gray-200 rounded-xl" required />
                <select name="priority" className="w-full p-3 border border-gray-200 rounded-xl" required>
                  <option value="">Select Priority</option>
                  <option value="High">High</option>
                  <option value="Medium">Medium</option>
                  <option value="Low">Low</option>
                </select>
              </div>
              <div className="flex justify-end space-x-4 mt-6">
                <button
                  type="button"
                  onClick={() => setShowAddModal(false)}
                  className="px-6 py-3 text-gray-600 border border-gray-200 rounded-xl hover:bg-gray-50"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-6 py-3 bg-gradient-to-r from-blue-500 to-purple-500 text-white rounded-xl hover:shadow-lg"
                >
                  Send Notification
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default NotificationManagement;