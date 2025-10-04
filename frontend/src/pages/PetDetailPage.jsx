import React, { useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { FaHeart, FaCalendar, FaMapMarkerAlt, FaAward, FaShieldAlt, FaUserMd, FaArrowLeft } from 'react-icons/fa';
import { dummyPets } from '../data/dummyData';

const PetDetailPage = () => {
  const { id } = useParams();
  const [pet] = useState(dummyPets.find(p => p.id === parseInt(id)));
  const [isInWatchlist, setIsInWatchlist] = useState(false);

  if (!pet) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-gray-900 mb-4">Pet Not Found</h1>
          <Link to="/adopt" className="text-pink-600 hover:text-pink-700">
            Back to Adopt Page
          </Link>
        </div>
      </div>
    );
  }

  const getAgeDisplay = (ageInMonths) => {
    if (ageInMonths < 12) {
      return `${ageInMonths} months old`;
    } else {
      const years = Math.floor(ageInMonths / 12);
      const months = ageInMonths % 12;
      return months > 0 ? `${years} years ${months} months old` : `${years} years old`;
    }
  };

  const handleWatchlistToggle = () => {
    setIsInWatchlist(!isInWatchlist);
    if (!isInWatchlist) {
      alert(`${pet.name} added to your watchlist!`);
    } else {
      alert(`${pet.name} removed from your watchlist!`);
    }
  };

  const getStatusColor = (status) => {
    switch (status.toLowerCase()) {
      case 'available':
        return 'bg-green-100 text-green-800';
      case 'pending':
        return 'bg-yellow-100 text-yellow-800';
      case 'adopted':
        return 'bg-gray-100 text-gray-800';
      default:
        return 'bg-blue-100 text-blue-800';
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Back Button */}
        <Link
          to="/adopt"
          className="inline-flex items-center text-pink-600 hover:text-pink-700 mb-6"
        >
          <FaArrowLeft className="h-5 w-5 mr-2" />
          Back to Adopt
        </Link>

        <div className="bg-white rounded-lg shadow-lg overflow-hidden">
          <div className="md:flex">
            {/* Pet Image */}
            <div className="md:w-1/2">
              <img
                src={pet.imageUrl}
                alt={pet.name}
                className="w-full h-96 md:h-full object-cover"
              />
            </div>

            {/* Pet Information */}
            <div className="md:w-1/2 p-8">
              <div className="flex justify-between items-start mb-4">
                <div>
                  <h1 className="text-3xl font-bold text-gray-900 mb-2">{pet.name}</h1>
                  <p className="text-xl text-gray-600">{pet.breed} • {getAgeDisplay(pet.age)}</p>
                </div>
                <div className="flex items-center space-x-2">
                  <span className={`px-3 py-1 text-sm font-medium rounded-full ${getStatusColor(pet.status)}`}>
                    {pet.status}
                  </span>
                  <button
                    onClick={handleWatchlistToggle}
                    className={`p-2 rounded-full transition-colors duration-200 ${
                      isInWatchlist 
                        ? 'bg-pink-600 text-white' 
                        : 'bg-gray-100 text-gray-600 hover:bg-pink-50 hover:text-pink-600'
                    }`}
                    title={isInWatchlist ? 'Remove from watchlist' : 'Add to watchlist'}
                  >
                    <FaHeart className={`h-5 w-5 ${isInWatchlist ? 'fill-current' : ''}`} />
                  </button>
                </div>
              </div>

              {/* Basic Info */}
              <div className="grid grid-cols-2 gap-4 mb-6">
                <div>
                  <span className="text-sm font-medium text-gray-500">Species</span>
                  <p className="text-lg text-gray-900">{pet.species}</p>
                </div>
                <div>
                  <span className="text-sm font-medium text-gray-500">Gender</span>
                  <p className="text-lg text-gray-900">{pet.gender}</p>
                </div>
                <div>
                  <span className="text-sm font-medium text-gray-500">Size</span>
                  <p className="text-lg text-gray-900">{pet.size}</p>
                </div>
                <div>
                  <span className="text-sm font-medium text-gray-500">Arrival Date</span>
                  <p className="text-lg text-gray-900">{new Date(pet.arrivalDate).toLocaleDateString()}</p>
                </div>
              </div>

              {/* Health Status */}
              <div className="mb-6">
                <h3 className="text-lg font-semibold text-gray-900 mb-3 flex items-center">
                  <FaUserMd className="h-5 w-5 mr-2 text-pink-600" />
                  Health Status
                </h3>
                <div className="flex flex-wrap gap-2">
                  {pet.isVaccinated && (
                    <span className="px-3 py-1 bg-green-100 text-green-700 text-sm rounded-full flex items-center">
                      <FaShieldAlt className="h-4 w-4 mr-1" />
                      Vaccinated
                    </span>
                  )}
                  {pet.isNeutered && (
                    <span className="px-3 py-1 bg-blue-100 text-blue-700 text-sm rounded-full flex items-center">
                      <FaAward className="h-4 w-4 mr-1" />
                      Neutered/Spayed
                    </span>
                  )}
                  {pet.isMicrochipped && (
                    <span className="px-3 py-1 bg-purple-100 text-purple-700 text-sm rounded-full flex items-center">
                      <FaShieldAlt className="h-4 w-4 mr-1" />
                      Microchipped
                    </span>
                  )}
                </div>
              </div>

              {/* Action Buttons */}
              <div className="flex space-x-4">
                {pet.status.toLowerCase() === 'available' && (
                  <Link
                    to={`/adopt/${pet.id}/apply`}
                    className="flex-1 bg-pink-600 text-white py-3 px-6 rounded-lg hover:bg-pink-700 transition-colors duration-200 text-center font-semibold"
                  >
                    Apply to Adopt
                  </Link>
                )}
                <button
                  onClick={() => alert('Share functionality would be implemented here')}
                  className="px-6 py-3 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors duration-200"
                >
                  Share
                </button>
              </div>
            </div>
          </div>

          {/* Detailed Information Tabs */}
          <div className="border-t border-gray-200">
            <div className="p-8">
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                {/* About Section */}
                <div>
                  <h3 className="text-xl font-semibold text-gray-900 mb-4">About {pet.name}</h3>
                  <p className="text-gray-700 mb-6 leading-relaxed">{pet.description}</p>
                  
                  <h4 className="text-lg font-semibold text-gray-900 mb-3">Temperament</h4>
                  <p className="text-gray-700">{pet.temperament}</p>
                </div>

                {/* Medical History */}
                <div>
                  <h3 className="text-xl font-semibold text-gray-900 mb-4">Medical History</h3>
                  <p className="text-gray-700 leading-relaxed">{pet.medicalHistory}</p>
                  
                  {/* Care Requirements */}
                  <div className="mt-6">
                    <h4 className="text-lg font-semibold text-gray-900 mb-3">Care Requirements</h4>
                    <ul className="text-gray-700 space-y-2">
                      <li>• Regular exercise and playtime</li>
                      <li>• Balanced diet appropriate for age and size</li>
                      <li>• Regular veterinary checkups</li>
                      <li>• Lots of love and attention</li>
                      {pet.species.toLowerCase() === 'dog' && <li>• Daily walks and training</li>}
                      {pet.species.toLowerCase() === 'cat' && <li>• Litter box maintenance</li>}
                    </ul>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Adoption Process Info */}
          <div className="bg-gray-50 p-8">
            <h3 className="text-xl font-semibold text-gray-900 mb-4">Adoption Process</h3>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="text-center">
                <div className="bg-pink-100 w-12 h-12 rounded-full flex items-center justify-center mx-auto mb-3">
                  <span className="text-pink-600 font-bold">1</span>
                </div>
                <h4 className="font-semibold text-gray-900 mb-2">Submit Application</h4>
                <p className="text-gray-600 text-sm">Fill out our adoption application form with your details and preferences.</p>
              </div>
              <div className="text-center">
                <div className="bg-pink-100 w-12 h-12 rounded-full flex items-center justify-center mx-auto mb-3">
                  <span className="text-pink-600 font-bold">2</span>
                </div>
                <h4 className="font-semibold text-gray-900 mb-2">Meet & Greet</h4>
                <p className="text-gray-600 text-sm">Schedule a visit to meet your potential new family member.</p>
              </div>
              <div className="text-center">
                <div className="bg-pink-100 w-12 h-12 rounded-full flex items-center justify-center mx-auto mb-3">
                  <span className="text-pink-600 font-bold">3</span>
                </div>
                <h4 className="font-semibold text-gray-900 mb-2">Take Them Home</h4>
                <p className="text-gray-600 text-sm">Complete the adoption process and welcome your new companion home.</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PetDetailPage;
