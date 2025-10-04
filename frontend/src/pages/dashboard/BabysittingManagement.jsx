import { useState } from 'react';
import { FaBaby, FaPlus, FaEdit, FaTrash, FaEye, FaSearch, FaFilter, FaClock, FaCheck, FaTimes } from 'react-icons/fa';
import { motion } from 'framer-motion';
import toast from 'react-hot-toast';

const BabysittingManagement = () => {
  const [bookings, setBookings] = useState([
    {
      id: 1,
      petName: 'Buddy',
      petImage: 'https://images.unsplash.com/photo-1552053831-71594a27632d?w=300',
      ownerName: 'John Smith',
      serviceDate: '2024-01-20',
      duration: '8 hours',
      status: 'Confirmed',
      caregiver: 'Sarah Johnson',
      specialInstructions: 'Needs medication at 2 PM'
    },
    {
      id: 2,
      petName: 'Luna',
      petImage: 'https://images.unsplash.com/photo-1574158622682-e40e69881006?w=300',
      ownerName: 'Emily Davis',
      serviceDate: '2024-01-18',
      duration: '4 hours',
      status: 'Pending',
      caregiver: 'Mike Wilson',
      specialInstructions: 'Very shy, needs gentle approach'
    },
    {
      id: 3,
      petName: 'Max',
      petImage: 'https://images.unsplash.com/photo-1583337130417-3346a1be7dee?w=300',
      ownerName: 'Robert Brown',
      serviceDate: '2024-01-16',
      duration: '6 hours',
      status: 'Completed',
      caregiver: 'Lisa Anderson',
      specialInstructions: 'Loves to play fetch'
    }
  ]);
  
  const [searchTerm, setSearchTerm] = useState('');
  const [filterStatus, setFilterStatus] = useState('all');
  const [showAddModal, setShowAddModal] = useState(false);

  const filteredBookings = bookings.filter(booking => {
    const matchesSearch = booking.petName.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         booking.ownerName.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         booking.caregiver.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus = filterStatus === 'all' || booking.status.toLowerCase() === filterStatus.toLowerCase();
    return matchesSearch && matchesStatus;
  });

  const handleAddBooking = (bookingData) => {
    const newBooking = {
      id: bookings.length + 1,
      ...bookingData,
      status: 'Pending',
      petImage: 'https://images.unsplash.com/photo-1601758228041-f3b2795255f1?w=300'
    };
    setBookings([...bookings, newBooking]);
    toast.success('Babysitting booking created successfully! 🐶');
    setShowAddModal(false);
  };

  const handleDeleteBooking = (id) => {
    if (window.confirm('Are you sure you want to delete this booking?')) {
      setBookings(bookings.filter(booking => booking.id !== id));
      toast.success('Booking deleted successfully');
    }
  };

  const handleStatusUpdate = (id, newStatus) => {
    setBookings(bookings.map(booking => 
      booking.id === id ? { ...booking, status: newStatus } : booking
    ));
    toast.success(`Booking ${newStatus.toLowerCase()} successfully!`);
  };

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
      case 'Confirmed': return <FaCheck />;
      case 'Pending': return <FaClock />;
      case 'Completed': return <FaCheck />;
      case 'Cancelled': return <FaTimes />;
      default: return <FaClock />;
    }
  };

  return (
    <div className="p-6">
      {/* Header */}
      <div className="flex justify-between items-center mb-8">
        <div>
          <h1 className="text-3xl font-bold text-gray-800 flex items-center gap-3">
            <FaBaby className="text-orange-600" />
            Pet Babysitting Services
          </h1>
          <p className="text-gray-600 mt-2">Manage pet care and babysitting bookings</p>
        </div>
        <button
          onClick={() => setShowAddModal(true)}
          className="bg-gradient-to-r from-orange-500 to-red-500 text-white px-6 py-3 rounded-xl hover:shadow-lg transition-all duration-300 flex items-center gap-2"
        >
          <FaPlus /> New Booking
        </button>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
        {['Confirmed', 'Pending', 'Completed', 'Cancelled'].map((status) => {
          const count = bookings.filter(b => b.status === status).length;
          const colors = {
            'Confirmed': 'from-green-500 to-green-600',
            'Pending': 'from-yellow-500 to-yellow-600',
            'Completed': 'from-blue-500 to-blue-600',
            'Cancelled': 'from-red-500 to-red-600'
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
              placeholder="Search bookings..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-10 pr-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-orange-500 focus:border-transparent"
            />
          </div>
          <div className="relative">
            <FaFilter className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
            <select
              value={filterStatus}
              onChange={(e) => setFilterStatus(e.target.value)}
              className="w-full pl-10 pr-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-orange-500 focus:border-transparent appearance-none"
            >
              <option value="all">All Status</option>
              <option value="confirmed">Confirmed</option>
              <option value="pending">Pending</option>
              <option value="completed">Completed</option>
              <option value="cancelled">Cancelled</option>
            </select>
          </div>
          <div className="text-gray-600 flex items-center">
            Total Bookings: <span className="font-bold text-orange-600 ml-2">{filteredBookings.length}</span>
          </div>
        </div>
      </div>

      {/* Bookings Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-6">
        {filteredBookings.map((booking) => (
          <motion.div
            key={booking.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="bg-white rounded-xl shadow-lg overflow-hidden hover:shadow-xl transition-all duration-300"
          >
            <div className="flex items-center p-4 border-b border-gray-100">
              <img
                src={booking.petImage}
                alt={booking.petName}
                className="w-16 h-16 rounded-full object-cover mr-4"
              />
              <div className="flex-1">
                <h3 className="text-lg font-bold text-gray-800">{booking.petName}</h3>
                <p className="text-gray-600 text-sm">{booking.ownerName}</p>
              </div>
              <div className={`px-3 py-1 rounded-full text-sm font-semibold flex items-center gap-2 ${getStatusColor(booking.status)}`}>
                {getStatusIcon(booking.status)}
                {booking.status}
              </div>
            </div>
            
            <div className="p-4">
              <div className="space-y-2 mb-4">
                <p><span className="font-semibold text-gray-700">Service Date:</span> {booking.serviceDate}</p>
                <p><span className="font-semibold text-gray-700">Duration:</span> {booking.duration}</p>
                <p><span className="font-semibold text-gray-700">Caregiver:</span> {booking.caregiver}</p>
                <p><span className="font-semibold text-gray-700">Instructions:</span></p>
                <p className="text-gray-600 text-sm bg-gray-50 p-3 rounded-lg">{booking.specialInstructions}</p>
              </div>
              
              <div className="flex justify-between items-center space-x-2">
                <div className="flex space-x-2">
                  <button className="p-2 text-blue-600 hover:bg-blue-50 rounded-lg transition-colors">
                    <FaEye />
                  </button>
                  <button className="p-2 text-green-600 hover:bg-green-50 rounded-lg transition-colors">
                    <FaEdit />
                  </button>
                  <button 
                    onClick={() => handleDeleteBooking(booking.id)}
                    className="p-2 text-red-600 hover:bg-red-50 rounded-lg transition-colors"
                  >
                    <FaTrash />
                  </button>
                </div>
                {booking.status === 'Pending' && (
                  <div className="flex space-x-1">
                    <button 
                      onClick={() => handleStatusUpdate(booking.id, 'Confirmed')}
                      className="text-xs bg-green-500 text-white px-3 py-1 rounded-lg hover:bg-green-600 transition-colors"
                    >
                      Confirm
                    </button>
                    <button 
                      onClick={() => handleStatusUpdate(booking.id, 'Cancelled')}
                      className="text-xs bg-red-500 text-white px-3 py-1 rounded-lg hover:bg-red-600 transition-colors"
                    >
                      Cancel
                    </button>
                  </div>
                )}
              </div>
            </div>
          </motion.div>
        ))}
      </div>

      {/* Add Booking Modal */}
      {showAddModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-2xl p-8 max-w-md w-full mx-4">
            <h2 className="text-2xl font-bold text-gray-800 mb-6">New Babysitting Booking</h2>
            <form onSubmit={(e) => {
              e.preventDefault();
              const formData = new FormData(e.target);
              const bookingData = {
                petName: formData.get('petName'),
                ownerName: formData.get('ownerName'),
                serviceDate: formData.get('serviceDate'),
                duration: formData.get('duration'),
                caregiver: formData.get('caregiver'),
                specialInstructions: formData.get('specialInstructions')
              };
              handleAddBooking(bookingData);
            }}>
              <div className="space-y-4">
                <input name="petName" placeholder="Pet Name" className="w-full p-3 border border-gray-200 rounded-xl" required />
                <input name="ownerName" placeholder="Owner Name" className="w-full p-3 border border-gray-200 rounded-xl" required />
                <input name="serviceDate" type="date" className="w-full p-3 border border-gray-200 rounded-xl" required />
                <select name="duration" className="w-full p-3 border border-gray-200 rounded-xl" required>
                  <option value="">Select Duration</option>
                  <option value="2 hours">2 hours</option>
                  <option value="4 hours">4 hours</option>
                  <option value="6 hours">6 hours</option>
                  <option value="8 hours">8 hours</option>
                  <option value="Full day">Full day</option>
                </select>
                <input name="caregiver" placeholder="Assigned Caregiver" className="w-full p-3 border border-gray-200 rounded-xl" required />
                <textarea name="specialInstructions" placeholder="Special instructions..." className="w-full p-3 border border-gray-200 rounded-xl" rows="3"></textarea>
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
                  className="px-6 py-3 bg-gradient-to-r from-orange-500 to-red-500 text-white rounded-xl hover:shadow-lg"
                >
                  Create Booking
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default BabysittingManagement;