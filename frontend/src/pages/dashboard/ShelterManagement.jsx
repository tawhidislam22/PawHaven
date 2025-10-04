import { useState } from 'react';
import { FaHome, FaPlus, FaEdit, FaTrash, FaEye, FaSearch, FaMapMarkerAlt, FaPhone } from 'react-icons/fa';
import { motion } from 'framer-motion';
import toast from 'react-hot-toast';

const ShelterManagement = () => {
  const [shelters, setShelters] = useState([
    {
      id: 1,
      name: 'Happy Paws Shelter',
      contactNumber: '+1-555-0123',
      location: '123 Main St, Springfield',
      capacity: 50,
      currentAnimals: 32,
      manager: 'John Smith',
      email: 'john@happypaws.com',
      established: '2018',
      image: 'https://images.unsplash.com/photo-1601758228041-f3b2795255f1?w=300'
    },
    {
      id: 2,
      name: 'Cat Haven Sanctuary',
      contactNumber: '+1-555-0456',
      location: '456 Oak Ave, Riverside',
      capacity: 30,
      currentAnimals: 28,
      manager: 'Sarah Johnson',
      email: 'sarah@cathaven.org',
      established: '2020',
      image: 'https://images.unsplash.com/photo-1574158622682-e40e69881006?w=300'
    },
    {
      id: 3,
      name: 'Rescue Paradise',
      contactNumber: '+1-555-0789',
      location: '789 Pine St, Hillview',
      capacity: 40,
      currentAnimals: 15,
      manager: 'Mike Wilson',
      email: 'mike@rescueparadise.com',
      established: '2019',
      image: 'https://images.unsplash.com/photo-1583337130417-3346a1be7dee?w=300'
    }
  ]);
  
  const [searchTerm, setSearchTerm] = useState('');
  const [showAddModal, setShowAddModal] = useState(false);

  const filteredShelters = shelters.filter(shelter => 
    shelter.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    shelter.location.toLowerCase().includes(searchTerm.toLowerCase()) ||
    shelter.manager.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleAddShelter = (shelterData) => {
    const newShelter = {
      id: shelters.length + 1,
      ...shelterData,
      currentAnimals: 0,
      image: 'https://images.unsplash.com/photo-1601758228041-f3b2795255f1?w=300'
    };
    setShelters([...shelters, newShelter]);
    toast.success('Shelter added successfully! 🏠');
    setShowAddModal(false);
  };

  const handleDeleteShelter = (id) => {
    if (window.confirm('Are you sure you want to delete this shelter?')) {
      setShelters(shelters.filter(shelter => shelter.id !== id));
      toast.success('Shelter deleted successfully');
    }
  };

  const getCapacityStatus = (current, capacity) => {
    const percentage = (current / capacity) * 100;
    if (percentage >= 90) return { color: 'text-red-600', bg: 'bg-red-100', status: 'Full' };
    if (percentage >= 70) return { color: 'text-yellow-600', bg: 'bg-yellow-100', status: 'High' };
    return { color: 'text-green-600', bg: 'bg-green-100', status: 'Available' };
  };

  return (
    <div className="p-6">
      {/* Header */}
      <div className="flex justify-between items-center mb-8">
        <div>
          <h1 className="text-3xl font-bold text-gray-800 flex items-center gap-3">
            <FaHome className="text-green-600" />
            Shelter Management
          </h1>
          <p className="text-gray-600 mt-2">Manage animal shelters and their information</p>
        </div>
        <button
          onClick={() => setShowAddModal(true)}
          className="bg-gradient-to-r from-green-500 to-blue-500 text-white px-6 py-3 rounded-xl hover:shadow-lg transition-all duration-300 flex items-center gap-2"
        >
          <FaPlus /> Add New Shelter
        </button>
      </div>

      {/* Search */}
      <div className="bg-white rounded-xl shadow-lg p-6 mb-8">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="relative">
            <FaSearch className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
            <input
              type="text"
              placeholder="Search shelters..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-10 pr-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-green-500 focus:border-transparent"
            />
          </div>
          <div className="text-gray-600 flex items-center">
            Total Shelters: <span className="font-bold text-green-600 ml-2">{filteredShelters.length}</span>
          </div>
        </div>
      </div>

      {/* Shelters Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-6">
        {filteredShelters.map((shelter) => {
          const capacityStatus = getCapacityStatus(shelter.currentAnimals, shelter.capacity);
          
          return (
            <motion.div
              key={shelter.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="bg-white rounded-xl shadow-lg overflow-hidden hover:shadow-xl transition-all duration-300"
            >
              <div className="relative">
                <img
                  src={shelter.image}
                  alt={shelter.name}
                  className="w-full h-48 object-cover"
                />
                <div className={`absolute top-3 right-3 px-3 py-1 rounded-full text-sm font-semibold ${capacityStatus.bg} ${capacityStatus.color}`}>
                  {capacityStatus.status}
                </div>
              </div>
              
              <div className="p-6">
                <h3 className="text-xl font-bold text-gray-800 mb-2">{shelter.name}</h3>
                <div className="space-y-2 text-sm text-gray-600 mb-4">
                  <div className="flex items-center gap-2">
                    <FaMapMarkerAlt className="text-red-500" />
                    <span>{shelter.location}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <FaPhone className="text-blue-500" />
                    <span>{shelter.contactNumber}</span>
                  </div>
                  <p><span className="font-semibold">Manager:</span> {shelter.manager}</p>
                  <p><span className="font-semibold">Email:</span> {shelter.email}</p>
                  <p><span className="font-semibold">Established:</span> {shelter.established}</p>
                </div>
                
                {/* Capacity Bar */}
                <div className="mb-4">
                  <div className="flex justify-between text-sm text-gray-600 mb-1">
                    <span>Capacity</span>
                    <span>{shelter.currentAnimals}/{shelter.capacity}</span>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-2">
                    <div 
                      className={`h-2 rounded-full transition-all duration-300 ${
                        capacityStatus.color === 'text-red-600' ? 'bg-red-500' :
                        capacityStatus.color === 'text-yellow-600' ? 'bg-yellow-500' : 'bg-green-500'
                      }`}
                      style={{ width: `${(shelter.currentAnimals / shelter.capacity) * 100}%` }}
                    ></div>
                  </div>
                </div>
                
                <div className="flex justify-between items-center">
                  <div className="flex space-x-2">
                    <button className="p-2 text-blue-600 hover:bg-blue-50 rounded-lg transition-colors">
                      <FaEye />
                    </button>
                    <button className="p-2 text-green-600 hover:bg-green-50 rounded-lg transition-colors">
                      <FaEdit />
                    </button>
                    <button 
                      onClick={() => handleDeleteShelter(shelter.id)}
                      className="p-2 text-red-600 hover:bg-red-50 rounded-lg transition-colors"
                    >
                      <FaTrash />
                    </button>
                  </div>
                </div>
              </div>
            </motion.div>
          );
        })}
      </div>

      {/* Add Shelter Modal */}
      {showAddModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-2xl p-8 max-w-md w-full mx-4">
            <h2 className="text-2xl font-bold text-gray-800 mb-6">Add New Shelter</h2>
            <form onSubmit={(e) => {
              e.preventDefault();
              const formData = new FormData(e.target);
              const shelterData = {
                name: formData.get('name'),
                contactNumber: formData.get('contactNumber'),
                location: formData.get('location'),
                capacity: parseInt(formData.get('capacity')),
                manager: formData.get('manager'),
                email: formData.get('email'),
                established: formData.get('established')
              };
              handleAddShelter(shelterData);
            }}>
              <div className="space-y-4">
                <input name="name" placeholder="Shelter Name" className="w-full p-3 border border-gray-200 rounded-xl" required />
                <input name="contactNumber" placeholder="Contact Number" className="w-full p-3 border border-gray-200 rounded-xl" required />
                <input name="location" placeholder="Location/Address" className="w-full p-3 border border-gray-200 rounded-xl" required />
                <input name="capacity" type="number" placeholder="Capacity" className="w-full p-3 border border-gray-200 rounded-xl" required />
                <input name="manager" placeholder="Manager Name" className="w-full p-3 border border-gray-200 rounded-xl" required />
                <input name="email" type="email" placeholder="Email Address" className="w-full p-3 border border-gray-200 rounded-xl" required />
                <input name="established" type="number" placeholder="Year Established" className="w-full p-3 border border-gray-200 rounded-xl" required />
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
                  className="px-6 py-3 bg-gradient-to-r from-green-500 to-blue-500 text-white rounded-xl hover:shadow-lg"
                >
                  Add Shelter
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default ShelterManagement;