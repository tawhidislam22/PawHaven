import { useState, useEffect } from 'react';
import { FaPaw, FaPlus, FaEdit, FaTrash, FaEye, FaSearch, FaFilter } from 'react-icons/fa';
import { motion } from 'framer-motion';
import toast from 'react-hot-toast';

const PetManagement = () => {
  const [pets, setPets] = useState([
    {
      id: 1,
      name: 'Buddy',
      species: 'Dog',
      breed: 'Golden Retriever',
      gender: 'Male',
      age: '3 years',
      image: 'https://images.unsplash.com/photo-1552053831-71594a27632d?w=300',
      available: true,
      shelter: 'Happy Paws Shelter',
      description: 'Friendly and energetic dog'
    },
    {
      id: 2,
      name: 'Luna',
      species: 'Cat',
      breed: 'Persian',
      gender: 'Female',
      age: '2 years',
      image: 'https://images.unsplash.com/photo-1574158622682-e40e69881006?w=300',
      available: true,
      shelter: 'Cat Haven',
      description: 'Calm and affectionate cat'
    }
  ]);
  const [searchTerm, setSearchTerm] = useState('');
  const [filterSpecies, setFilterSpecies] = useState('all');
  const [showAddModal, setShowAddModal] = useState(false);

  const filteredPets = pets.filter(pet => {
    const matchesSearch = pet.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         pet.breed.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesSpecies = filterSpecies === 'all' || pet.species.toLowerCase() === filterSpecies.toLowerCase();
    return matchesSearch && matchesSpecies;
  });

  const handleAddPet = (petData) => {
    const newPet = {
      id: pets.length + 1,
      ...petData,
      image: 'https://images.unsplash.com/photo-1601758228041-f3b2795255f1?w=300'
    };
    setPets([...pets, newPet]);
    toast.success('Pet added successfully! 🐾');
    setShowAddModal(false);
  };

  const handleDeletePet = (id) => {
    if (window.confirm('Are you sure you want to delete this pet?')) {
      setPets(pets.filter(pet => pet.id !== id));
      toast.success('Pet deleted successfully');
    }
  };

  return (
    <div className="p-6">
      {/* Header */}
      <div className="flex justify-between items-center mb-8">
        <div>
          <h1 className="text-3xl font-bold text-gray-800 flex items-center gap-3">
            <FaPaw className="text-pink-600" />
            Pet Management
          </h1>
          <p className="text-gray-600 mt-2">Manage all pets available for adoption</p>
        </div>
        <button
          onClick={() => setShowAddModal(true)}
          className="bg-gradient-to-r from-pink-500 to-purple-500 text-white px-6 py-3 rounded-xl hover:shadow-lg transition-all duration-300 flex items-center gap-2"
        >
          <FaPlus /> Add New Pet
        </button>
      </div>

      {/* Search and Filter */}
      <div className="bg-white rounded-xl shadow-lg p-6 mb-8">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="relative">
            <FaSearch className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
            <input
              type="text"
              placeholder="Search pets..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-10 pr-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-pink-500 focus:border-transparent"
            />
          </div>
          <div className="relative">
            <FaFilter className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
            <select
              value={filterSpecies}
              onChange={(e) => setFilterSpecies(e.target.value)}
              className="w-full pl-10 pr-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-pink-500 focus:border-transparent appearance-none"
            >
              <option value="all">All Species</option>
              <option value="dog">Dogs</option>
              <option value="cat">Cats</option>
              <option value="rabbit">Rabbits</option>
              <option value="bird">Birds</option>
            </select>
          </div>
          <div className="text-gray-600 flex items-center">
            Total Pets: <span className="font-bold text-pink-600 ml-2">{filteredPets.length}</span>
          </div>
        </div>
      </div>

      {/* Pets Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
        {filteredPets.map((pet) => (
          <motion.div
            key={pet.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="bg-white rounded-xl shadow-lg overflow-hidden hover:shadow-xl transition-all duration-300"
          >
            <div className="relative">
              <img
                src={pet.image}
                alt={pet.name}
                className="w-full h-48 object-cover"
              />
              <div className={`absolute top-3 right-3 px-3 py-1 rounded-full text-sm font-semibold ${
                pet.available 
                  ? 'bg-green-100 text-green-800' 
                  : 'bg-red-100 text-red-800'
              }`}>
                {pet.available ? 'Available' : 'Adopted'}
              </div>
            </div>
            
            <div className="p-4">
              <h3 className="text-xl font-bold text-gray-800 mb-2">{pet.name}</h3>
              <div className="space-y-1 text-sm text-gray-600 mb-4">
                <p><span className="font-semibold">Species:</span> {pet.species}</p>
                <p><span className="font-semibold">Breed:</span> {pet.breed}</p>
                <p><span className="font-semibold">Gender:</span> {pet.gender}</p>
                <p><span className="font-semibold">Age:</span> {pet.age}</p>
                <p><span className="font-semibold">Shelter:</span> {pet.shelter}</p>
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
                    onClick={() => handleDeletePet(pet.id)}
                    className="p-2 text-red-600 hover:bg-red-50 rounded-lg transition-colors"
                  >
                    <FaTrash />
                  </button>
                </div>
              </div>
            </div>
          </motion.div>
        ))}
      </div>

      {/* Add Pet Modal */}
      {showAddModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-2xl p-8 max-w-md w-full mx-4">
            <h2 className="text-2xl font-bold text-gray-800 mb-6">Add New Pet</h2>
            <form onSubmit={(e) => {
              e.preventDefault();
              const formData = new FormData(e.target);
              const petData = {
                name: formData.get('name'),
                species: formData.get('species'),
                breed: formData.get('breed'),
                gender: formData.get('gender'),
                age: formData.get('age'),
                shelter: formData.get('shelter'),
                description: formData.get('description'),
                available: true
              };
              handleAddPet(petData);
            }}>
              <div className="space-y-4">
                <input name="name" placeholder="Pet Name" className="w-full p-3 border border-gray-200 rounded-xl" required />
                <select name="species" className="w-full p-3 border border-gray-200 rounded-xl" required>
                  <option value="">Select Species</option>
                  <option value="Dog">Dog</option>
                  <option value="Cat">Cat</option>
                  <option value="Rabbit">Rabbit</option>
                  <option value="Bird">Bird</option>
                </select>
                <input name="breed" placeholder="Breed" className="w-full p-3 border border-gray-200 rounded-xl" required />
                <select name="gender" className="w-full p-3 border border-gray-200 rounded-xl" required>
                  <option value="">Select Gender</option>
                  <option value="Male">Male</option>
                  <option value="Female">Female</option>
                </select>
                <input name="age" placeholder="Age" className="w-full p-3 border border-gray-200 rounded-xl" required />
                <input name="shelter" placeholder="Shelter Name" className="w-full p-3 border border-gray-200 rounded-xl" required />
                <textarea name="description" placeholder="Description" className="w-full p-3 border border-gray-200 rounded-xl" rows="3"></textarea>
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
                  className="px-6 py-3 bg-gradient-to-r from-pink-500 to-purple-500 text-white rounded-xl hover:shadow-lg"
                >
                  Add Pet
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default PetManagement;