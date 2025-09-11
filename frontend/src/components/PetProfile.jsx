import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Heart, 
  Share2, 
  Calendar, 
  MapPin, 
  Shield, 
  Award, 
  Activity,
  User,
  Phone,
  Mail,
  Clock,
  CheckCircle,
  AlertCircle,
  Star,
  Camera,
  Play,
  Volume2,
  VolumeX,
  ChevronLeft,
  ChevronRight,
  X
} from 'lucide-react';
import { FaPaw, FaVenus, FaMars, FaDog, FaCat, FaWeight, FaRuler } from 'react-icons/fa';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, Pagination, Autoplay } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';

const PetProfile = ({ pet, onAdopt, onWatchlist, isInWatchlist = false }) => {
  const [activeTab, setActiveTab] = useState('overview');
  const [showVideoModal, setShowVideoModal] = useState(false);
  const [isMuted, setIsMuted] = useState(true);
  const [showContactForm, setShowContactForm] = useState(false);
  const [adoptionProgress, setAdoptionProgress] = useState(0);

  // Mock data - replace with actual data from props
  const mockPet = {
    id: 1,
    name: 'Buddy',
    breed: 'Golden Retriever',
    age: '2 years',
    gender: 'Male',
    size: 'Large',
    weight: '65 lbs',
    color: 'Golden',
    location: 'New York, NY',
    status: 'Available',
    images: [
      'https://images.unsplash.com/photo-1552053831-71594a27632d?w=600&h=400&fit=crop',
      'https://images.unsplash.com/photo-1583512603805-3cc6b41f3edb?w=600&h=400&fit=crop',
      'https://images.unsplash.com/photo-1518717758536-85ae29035b6d?w=600&h=400&fit=crop',
      'https://images.unsplash.com/photo-1574158622682-e40e69881006?w=600&h=400&fit=crop'
    ],
    video: 'https://sample-videos.com/zip/10/mp4/SampleVideo_1280x720_1mb.mp4',
    description: 'Buddy is a friendly and energetic Golden Retriever who loves playing fetch and swimming. He\'s great with kids and other pets, making him the perfect family companion.',
    personality: ['Friendly', 'Energetic', 'Loyal', 'Playful', 'Smart'],
    medicalHistory: [
      { date: '2024-01-15', event: 'Vaccination - Complete', status: 'completed' },
      { date: '2024-01-10', event: 'Health Check', status: 'completed' },
      { date: '2023-12-20', event: 'Spayed/Neutered', status: 'completed' }
    ],
    requirements: [
      'Fenced yard preferred',
      'Daily exercise needed',
      'Good with children 5+',
      'Compatible with other dogs'
    ],
    adoptionFee: 350,
    shelterInfo: {
      name: 'Happy Paws Rescue',
      address: '123 Main St, New York, NY 10001',
      phone: '(555) 123-4567',
      email: 'info@happypawsrescue.com',
      hours: 'Mon-Sat: 10AM-6PM, Sun: 12PM-4PM'
    },
    caregiverNotes: 'Buddy has been with us for 3 months and has made incredible progress. He was initially shy but has blossomed into a confident, loving dog.',
    ...pet
  };

  const tabs = [
    { id: 'overview', label: 'Overview', icon: FaPaw },
    { id: 'medical', label: 'Medical', icon: Shield },
    { id: 'personality', label: 'Personality', icon: Heart },
    { id: 'requirements', label: 'Requirements', icon: CheckCircle }
  ];

  const handleAdopt = () => {
    setAdoptionProgress(25);
    setTimeout(() => setAdoptionProgress(50), 500);
    setTimeout(() => setAdoptionProgress(75), 1000);
    setTimeout(() => {
      setAdoptionProgress(100);
      onAdopt(mockPet);
    }, 1500);
  };

  const getStatusColor = (status) => {
    switch (status) {
      case 'Available': return 'bg-green-500';
      case 'Pending': return 'bg-yellow-500';
      case 'Adopted': return 'bg-gray-500';
      default: return 'bg-blue-500';
    }
  };

  return (
    <div className="max-w-7xl mx-auto p-6">
      {/* Hero Section */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8">
        {/* Image Gallery */}
        <div className="space-y-4">
          <div className="relative rounded-2xl overflow-hidden shadow-lg">
            <Swiper
              modules={[Navigation, Pagination, Autoplay]}
              navigation={{
                prevEl: '.swiper-button-prev-custom',
                nextEl: '.swiper-button-next-custom',
              }}
              pagination={{ 
                clickable: true,
                bulletClass: 'swiper-pagination-bullet bg-white/50',
                bulletActiveClass: 'swiper-pagination-bullet-active bg-white'
              }}
              autoplay={{ delay: 5000, disableOnInteraction: false }}
              className="h-96 w-full"
            >
              {mockPet.images.map((image, index) => (
                <SwiperSlide key={index}>
                  <div className="relative h-full">
                    <img
                      src={image}
                      alt={`${mockPet.name} ${index + 1}`}
                      className="w-full h-full object-cover"
                    />
                    {/* Video Play Button for First Image */}
                    {index === 0 && mockPet.video && (
                      <button
                        onClick={() => setShowVideoModal(true)}
                        className="absolute inset-0 flex items-center justify-center bg-black/20 hover:bg-black/30 transition-colors"
                      >
                        <div className="w-16 h-16 bg-white/90 rounded-full flex items-center justify-center hover:scale-110 transition-transform">
                          <Play className="h-6 w-6 text-gray-800 ml-1" />
                        </div>
                      </button>
                    )}
                  </div>
                </SwiperSlide>
              ))}
              
              {/* Custom Navigation Buttons */}
              <button className="swiper-button-prev-custom absolute left-4 top-1/2 transform -translate-y-1/2 z-10 w-10 h-10 bg-white/80 rounded-full flex items-center justify-center hover:bg-white transition-colors">
                <ChevronLeft className="h-5 w-5" />
              </button>
              <button className="swiper-button-next-custom absolute right-4 top-1/2 transform -translate-y-1/2 z-10 w-10 h-10 bg-white/80 rounded-full flex items-center justify-center hover:bg-white transition-colors">
                <ChevronRight className="h-5 w-5" />
              </button>
            </Swiper>
          </div>

          {/* Thumbnail Grid */}
          <div className="grid grid-cols-4 gap-2">
            {mockPet.images.slice(0, 4).map((image, index) => (
              <div key={index} className="aspect-square rounded-lg overflow-hidden">
                <img
                  src={image}
                  alt={`Thumbnail ${index + 1}`}
                  className="w-full h-full object-cover hover:scale-110 transition-transform duration-300 cursor-pointer"
                />
              </div>
            ))}
          </div>
        </div>

        {/* Pet Info */}
        <div className="space-y-6">
          <div>
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center space-x-3">
                <h1 className="text-4xl font-bold text-gray-900">{mockPet.name}</h1>
                <div className={`px-3 py-1 rounded-full text-white text-sm font-semibold ${getStatusColor(mockPet.status)}`}>
                  {mockPet.status}
                </div>
              </div>
              <div className="flex space-x-2">
                <button
                  onClick={() => onWatchlist(mockPet)}
                  className={`p-3 rounded-full transition-all duration-200 ${
                    isInWatchlist 
                      ? 'bg-pink-100 text-pink-600 hover:bg-pink-200' 
                      : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                  }`}
                >
                  <Heart className={`h-6 w-6 ${isInWatchlist ? 'fill-current' : ''}`} />
                </button>
                <button className="p-3 rounded-full bg-gray-100 text-gray-600 hover:bg-gray-200 transition-colors">
                  <Share2 className="h-6 w-6" />
                </button>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4 mb-6">
              <div className="flex items-center space-x-2 text-gray-600">
                <FaDog className="h-5 w-5" />
                <span>{mockPet.breed}</span>
              </div>
              <div className="flex items-center space-x-2 text-gray-600">
                <Calendar className="h-5 w-5" />
                <span>{mockPet.age}</span>
              </div>
              <div className="flex items-center space-x-2 text-gray-600">
                {mockPet.gender === 'Male' ? <FaMars className="h-5 w-5" /> : <FaVenus className="h-5 w-5" />}
                <span>{mockPet.gender}</span>
              </div>
              <div className="flex items-center space-x-2 text-gray-600">
                <MapPin className="h-5 w-5" />
                <span>{mockPet.location}</span>
              </div>
              <div className="flex items-center space-x-2 text-gray-600">
                <FaWeight className="h-5 w-5" />
                <span>{mockPet.weight}</span>
              </div>
              <div className="flex items-center space-x-2 text-gray-600">
                <FaRuler className="h-5 w-5" />
                <span>{mockPet.size}</span>
              </div>
            </div>

            <p className="text-gray-700 text-lg leading-relaxed mb-6">
              {mockPet.description}
            </p>
          </div>

          {/* Adoption Fee */}
          <div className="bg-gradient-to-r from-green-50 to-emerald-50 rounded-xl p-6 border border-green-200">
            <div className="flex items-center justify-between">
              <div>
                <h3 className="text-lg font-semibold text-gray-800">Adoption Fee</h3>
                <p className="text-sm text-gray-600">Includes vaccinations, spay/neuter, and microchip</p>
              </div>
              <div className="text-3xl font-bold text-green-600">
                ${mockPet.adoptionFee}
              </div>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="space-y-4">
            {adoptionProgress > 0 ? (
              <div className="space-y-3">
                <div className="flex items-center justify-between text-sm">
                  <span>Processing adoption...</span>
                  <span>{adoptionProgress}%</span>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-2">
                  <motion.div
                    className="bg-gradient-to-r from-green-500 to-emerald-600 h-2 rounded-full"
                    initial={{ width: 0 }}
                    animate={{ width: `${adoptionProgress}%` }}
                    transition={{ duration: 0.5 }}
                  />
                </div>
              </div>
            ) : (
              <button
                onClick={handleAdopt}
                className="w-full bg-gradient-to-r from-pink-500 to-purple-600 text-white py-4 rounded-xl font-semibold text-lg hover:from-pink-600 hover:to-purple-700 hover:scale-105 transition-all duration-200 shadow-lg"
              >
                Start Adoption Process
              </button>
            )}
            
            <button
              onClick={() => setShowContactForm(true)}
              className="w-full border-2 border-pink-500 text-pink-600 py-4 rounded-xl font-semibold hover:bg-pink-50 transition-colors"
            >
              Contact Shelter
            </button>
          </div>
        </div>
      </div>

      {/* Tabs */}
      <div className="bg-white rounded-2xl shadow-lg overflow-hidden">
        <div className="border-b border-gray-200">
          <div className="flex overflow-x-auto">
            {tabs.map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`flex items-center space-x-2 px-6 py-4 font-semibold whitespace-nowrap transition-colors ${
                  activeTab === tab.id
                    ? 'text-pink-600 border-b-2 border-pink-600 bg-pink-50'
                    : 'text-gray-600 hover:text-gray-800'
                }`}
              >
                <tab.icon className="h-5 w-5" />
                <span>{tab.label}</span>
              </button>
            ))}
          </div>
        </div>

        <div className="p-8">
          <AnimatePresence mode="wait">
            {/* Overview Tab */}
            {activeTab === 'overview' && (
              <motion.div
                key="overview"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                className="space-y-6"
              >
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                  <div>
                    <h3 className="text-xl font-bold text-gray-800 mb-4">About {mockPet.name}</h3>
                    <div className="space-y-3">
                      <div className="flex justify-between">
                        <span className="text-gray-600">Breed:</span>
                        <span className="font-semibold">{mockPet.breed}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-gray-600">Age:</span>
                        <span className="font-semibold">{mockPet.age}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-gray-600">Size:</span>
                        <span className="font-semibold">{mockPet.size}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-gray-600">Weight:</span>
                        <span className="font-semibold">{mockPet.weight}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-gray-600">Color:</span>
                        <span className="font-semibold">{mockPet.color}</span>
                      </div>
                    </div>
                  </div>

                  <div>
                    <h3 className="text-xl font-bold text-gray-800 mb-4">Shelter Information</h3>
                    <div className="bg-gray-50 rounded-lg p-4 space-y-3">
                      <div className="flex items-center space-x-2">
                        <User className="h-4 w-4 text-gray-500" />
                        <span className="font-semibold">{mockPet.shelterInfo.name}</span>
                      </div>
                      <div className="flex items-center space-x-2">
                        <MapPin className="h-4 w-4 text-gray-500" />
                        <span className="text-sm text-gray-600">{mockPet.shelterInfo.address}</span>
                      </div>
                      <div className="flex items-center space-x-2">
                        <Phone className="h-4 w-4 text-gray-500" />
                        <span className="text-sm text-gray-600">{mockPet.shelterInfo.phone}</span>
                      </div>
                      <div className="flex items-center space-x-2">
                        <Clock className="h-4 w-4 text-gray-500" />
                        <span className="text-sm text-gray-600">{mockPet.shelterInfo.hours}</span>
                      </div>
                    </div>
                  </div>
                </div>

                <div>
                  <h3 className="text-xl font-bold text-gray-800 mb-4">Caregiver Notes</h3>
                  <div className="bg-blue-50 rounded-lg p-4 border-l-4 border-blue-400">
                    <p className="text-gray-700 italic">"{mockPet.caregiverNotes}"</p>
                  </div>
                </div>
              </motion.div>
            )}

            {/* Medical Tab */}
            {activeTab === 'medical' && (
              <motion.div
                key="medical"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                className="space-y-6"
              >
                <h3 className="text-xl font-bold text-gray-800">Medical History</h3>
                <div className="space-y-4">
                  {mockPet.medicalHistory.map((record, index) => (
                    <div key={index} className="flex items-center space-x-4 p-4 bg-gray-50 rounded-lg">
                      <div className="flex-shrink-0">
                        {record.status === 'completed' ? (
                          <CheckCircle className="h-6 w-6 text-green-500" />
                        ) : (
                          <AlertCircle className="h-6 w-6 text-yellow-500" />
                        )}
                      </div>
                      <div className="flex-1">
                        <div className="flex items-center justify-between">
                          <h4 className="font-semibold text-gray-800">{record.event}</h4>
                          <span className="text-sm text-gray-500">{record.date}</span>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>

                <div className="bg-green-50 rounded-lg p-6 border border-green-200">
                  <div className="flex items-center space-x-2 mb-2">
                    <Shield className="h-5 w-5 text-green-600" />
                    <h4 className="font-semibold text-green-800">Health Status</h4>
                  </div>
                  <p className="text-green-700">All vaccinations up to date • Spayed/Neutered • Microchipped</p>
                </div>
              </motion.div>
            )}

            {/* Personality Tab */}
            {activeTab === 'personality' && (
              <motion.div
                key="personality"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                className="space-y-6"
              >
                <h3 className="text-xl font-bold text-gray-800">Personality Traits</h3>
                <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                  {mockPet.personality.map((trait, index) => (
                    <div key={index} className="bg-gradient-to-r from-pink-100 to-purple-100 rounded-lg p-4 text-center">
                      <Star className="h-6 w-6 text-pink-500 mx-auto mb-2" />
                      <span className="font-semibold text-gray-800">{trait}</span>
                    </div>
                  ))}
                </div>

                <div className="bg-yellow-50 rounded-lg p-6 border border-yellow-200">
                  <h4 className="font-semibold text-yellow-800 mb-2">Perfect For</h4>
                  <p className="text-yellow-700">Active families who enjoy outdoor activities and have experience with large dogs.</p>
                </div>
              </motion.div>
            )}

            {/* Requirements Tab */}
            {activeTab === 'requirements' && (
              <motion.div
                key="requirements"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                className="space-y-6"
              >
                <h3 className="text-xl font-bold text-gray-800">Adoption Requirements</h3>
                <div className="space-y-4">
                  {mockPet.requirements.map((requirement, index) => (
                    <div key={index} className="flex items-center space-x-3 p-4 bg-blue-50 rounded-lg">
                      <CheckCircle className="h-5 w-5 text-blue-500 flex-shrink-0" />
                      <span className="text-gray-700">{requirement}</span>
                    </div>
                  ))}
                </div>

                <div className="bg-gray-50 rounded-lg p-6">
                  <h4 className="font-semibold text-gray-800 mb-4">Adoption Process</h4>
                  <div className="space-y-3 text-sm text-gray-600">
                    <div className="flex items-center space-x-2">
                      <div className="w-6 h-6 bg-pink-500 text-white rounded-full flex items-center justify-center text-xs font-bold">1</div>
                      <span>Submit adoption application</span>
                    </div>
                    <div className="flex items-center space-x-2">
                      <div className="w-6 h-6 bg-pink-500 text-white rounded-full flex items-center justify-center text-xs font-bold">2</div>
                      <span>Home visit and interview</span>
                    </div>
                    <div className="flex items-center space-x-2">
                      <div className="w-6 h-6 bg-pink-500 text-white rounded-full flex items-center justify-center text-xs font-bold">3</div>
                      <span>Meet and greet with pet</span>
                    </div>
                    <div className="flex items-center space-x-2">
                      <div className="w-6 h-6 bg-pink-500 text-white rounded-full flex items-center justify-center text-xs font-bold">4</div>
                      <span>Finalize adoption and take home!</span>
                    </div>
                  </div>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>

      {/* Video Modal */}
      <AnimatePresence>
        {showVideoModal && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/80 flex items-center justify-center z-50 p-4"
            onClick={() => setShowVideoModal(false)}
          >
            <motion.div
              initial={{ scale: 0.8 }}
              animate={{ scale: 1 }}
              exit={{ scale: 0.8 }}
              className="bg-white rounded-2xl overflow-hidden max-w-4xl w-full"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="flex items-center justify-between p-4 border-b border-gray-200">
                <h3 className="text-lg font-semibold">Meet {mockPet.name}</h3>
                <div className="flex items-center space-x-2">
                  <button
                    onClick={() => setIsMuted(!isMuted)}
                    className="p-2 rounded-full bg-gray-100 hover:bg-gray-200 transition-colors"
                  >
                    {isMuted ? <VolumeX className="h-5 w-5" /> : <Volume2 className="h-5 w-5" />}
                  </button>
                  <button
                    onClick={() => setShowVideoModal(false)}
                    className="p-2 rounded-full bg-gray-100 hover:bg-gray-200 transition-colors"
                  >
                    <X className="h-5 w-5" />
                  </button>
                </div>
              </div>
              <div className="aspect-video">
                <video
                  src={mockPet.video}
                  controls
                  autoPlay
                  muted={isMuted}
                  className="w-full h-full"
                >
                  Your browser does not support the video tag.
                </video>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Contact Form Modal */}
      <AnimatePresence>
        {showContactForm && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4"
            onClick={() => setShowContactForm(false)}
          >
            <motion.div
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.8, opacity: 0 }}
              className="bg-white rounded-2xl p-8 max-w-md w-full"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="flex items-center justify-between mb-6">
                <h3 className="text-xl font-bold">Contact Shelter</h3>
                <button
                  onClick={() => setShowContactForm(false)}
                  className="p-2 rounded-full bg-gray-100 hover:bg-gray-200 transition-colors"
                >
                  <X className="h-5 w-5" />
                </button>
              </div>

              <div className="space-y-4">
                <div className="flex items-center space-x-3 p-3 bg-gray-50 rounded-lg">
                  <Phone className="h-5 w-5 text-gray-500" />
                  <div>
                    <div className="font-medium">{mockPet.shelterInfo.phone}</div>
                    <div className="text-sm text-gray-500">Call directly</div>
                  </div>
                </div>

                <div className="flex items-center space-x-3 p-3 bg-gray-50 rounded-lg">
                  <Mail className="h-5 w-5 text-gray-500" />
                  <div>
                    <div className="font-medium">{mockPet.shelterInfo.email}</div>
                    <div className="text-sm text-gray-500">Send an email</div>
                  </div>
                </div>

                <div className="flex items-center space-x-3 p-3 bg-gray-50 rounded-lg">
                  <MapPin className="h-5 w-5 text-gray-500" />
                  <div>
                    <div className="font-medium">Visit us</div>
                    <div className="text-sm text-gray-500">{mockPet.shelterInfo.address}</div>
                  </div>
                </div>
              </div>

              <button
                onClick={() => setShowContactForm(false)}
                className="w-full mt-6 bg-gradient-to-r from-pink-500 to-purple-600 text-white py-3 rounded-lg font-semibold hover:from-pink-600 hover:to-purple-700 transition-colors"
              >
                Got it, thanks!
              </button>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default PetProfile;
