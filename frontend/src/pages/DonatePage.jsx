import React, { useState } from 'react';
import { FaHeart, FaDollarSign, FaChartLine, FaUsers } from 'react-icons/fa';

const DonatePage = () => {
  const [donationAmount, setDonationAmount] = useState('');
  const [donationType, setDonationType] = useState('general');
  const [isMonthly, setIsMonthly] = useState(false);
  const [message, setMessage] = useState('');

  const predefinedAmounts = [25, 50, 100, 250, 500];

  const donationTypes = [
    {
      id: 'general',
      name: 'General Support',
      description: 'Help us continue our mission of rescuing and caring for animals in need',
      icon: <FaHeart className="h-8 w-8" />,
      color: 'bg-pink-100 text-pink-600'
    },
    {
      id: 'medical',
      name: 'Medical Care',
      description: 'Fund critical medical treatments, surgeries, and veterinary care',
      icon: <FaHeart className="h-8 w-8" />,
      color: 'bg-red-100 text-red-600'
    },
    {
      id: 'food',
      name: 'Food & Supplies',
      description: 'Provide nutritious meals and essential supplies for our animals',
      icon: <FaHeart className="h-8 w-8" />,
      color: 'bg-green-100 text-green-600'
    },
    {
      id: 'shelter',
      name: 'Shelter Maintenance',
      description: 'Help maintain and improve our facilities for better animal care',
      icon: <FaHeart className="h-8 w-8" />,
      color: 'bg-blue-100 text-blue-600'
    },
    {
      id: 'emergency',
      name: 'Emergency Fund',
      description: 'Support urgent rescue operations and emergency medical care',
      icon: <FaHeart className="h-8 w-8" />,
      color: 'bg-orange-100 text-orange-600'
    }
  ];

  const impactData = [
    { amount: 25, impact: 'Feeds 5 animals for a day' },
    { amount: 50, impact: 'Provides vaccinations for 2 animals' },
    { amount: 100, impact: 'Covers spay/neuter surgery for 1 animal' },
    { amount: 250, impact: 'Funds emergency medical treatment' },
    { amount: 500, impact: 'Supports full veterinary care for 3 animals' }
  ];

  const handleSubmit = (e) => {
    e.preventDefault();
    
    if (!donationAmount || donationAmount <= 0) {
      alert('Please enter a valid donation amount');
      return;
    }

    // Mock donation submission
    alert(`Thank you for your ${isMonthly ? 'monthly' : 'one-time'} donation of $${donationAmount}!`);
    
    // Reset form
    setDonationAmount('');
    setMessage('');
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero Section */}
      <section className="bg-gradient-to-r from-pink-600 to-purple-700 text-white py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-4xl md:text-5xl font-bold mb-4">Make a Difference Today</h1>
          <p className="text-xl mb-8 max-w-2xl mx-auto">
            Your donation helps us rescue, care for, and find loving homes for animals in need. 
            Every contribution makes a real impact.
          </p>
        </div>
      </section>

      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          {/* Donation Form */}
          <div className="bg-white rounded-lg shadow-lg p-8">
            <h2 className="text-2xl font-bold text-gray-900 mb-6">Make Your Donation</h2>
            
            <form onSubmit={handleSubmit} className="space-y-6">
              {/* Donation Type Selection */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-3">
                  Choose donation purpose
                </label>
                <div className="grid grid-cols-1 gap-3">
                  {donationTypes.map((type) => (
                    <label
                      key={type.id}
                      className={`relative flex items-center p-4 border rounded-lg cursor-pointer hover:bg-gray-50 transition-colors duration-200 ${
                        donationType === type.id ? 'border-pink-500 bg-pink-50' : 'border-gray-300'
                      }`}
                    >
                      <input
                        type="radio"
                        name="donationType"
                        value={type.id}
                        checked={donationType === type.id}
                        onChange={(e) => setDonationType(e.target.value)}
                        className="sr-only"
                      />
                      <div className={`flex-shrink-0 w-12 h-12 rounded-lg flex items-center justify-center mr-4 ${type.color}`}>
                        {type.icon}
                      </div>
                      <div className="flex-1">
                        <p className="font-medium text-gray-900">{type.name}</p>
                        <p className="text-sm text-gray-600">{type.description}</p>
                      </div>
                      {donationType === type.id && (
                        <div className="absolute top-2 right-2">
                          <div className="w-4 h-4 bg-pink-500 rounded-full flex items-center justify-center">
                            <div className="w-2 h-2 bg-white rounded-full"></div>
                          </div>
                        </div>
                      )}
                    </label>
                  ))}
                </div>
              </div>

              {/* Donation Frequency */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-3">
                  Donation frequency
                </label>
                <div className="flex space-x-4">
                  <label className="flex items-center">
                    <input
                      type="radio"
                      name="frequency"
                      checked={!isMonthly}
                      onChange={() => setIsMonthly(false)}
                      className="mr-2 text-pink-600 focus:ring-pink-500"
                    />
                    <span className="text-gray-700">One-time</span>
                  </label>
                  <label className="flex items-center">
                    <input
                      type="radio"
                      name="frequency"
                      checked={isMonthly}
                      onChange={() => setIsMonthly(true)}
                      className="mr-2 text-pink-600 focus:ring-pink-500"
                    />
                    <span className="text-gray-700">Monthly</span>
                  </label>
                </div>
              </div>

              {/* Predefined Amounts */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-3">
                  Select amount
                </label>
                <div className="grid grid-cols-3 gap-3 mb-4">
                  {predefinedAmounts.map((amount) => (
                    <button
                      key={amount}
                      type="button"
                      onClick={() => setDonationAmount(amount.toString())}
                      className={`py-3 px-4 rounded-lg border font-medium transition-colors duration-200 ${
                        donationAmount === amount.toString()
                          ? 'border-pink-500 bg-pink-500 text-white'
                          : 'border-gray-300 text-gray-700 hover:border-pink-300 hover:bg-pink-50'
                      }`}
                    >
                      ${amount}
                    </button>
                  ))}
                </div>

                {/* Custom Amount */}
                <div className="relative">
                  <span className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500">$</span>
                  <input
                    type="number"
                    placeholder="Custom amount"
                    value={donationAmount}
                    onChange={(e) => setDonationAmount(e.target.value)}
                    className="w-full pl-8 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-pink-500 focus:border-pink-500"
                    min="1"
                    step="0.01"
                  />
                </div>
              </div>

              {/* Message */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Message (optional)
                </label>
                <textarea
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                  placeholder="Leave a message of support..."
                  rows={3}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-pink-500 focus:border-pink-500"
                />
              </div>

              {/* Submit Button */}
              <button
                type="submit"
                className="w-full bg-pink-600 text-white py-3 px-6 rounded-lg font-semibold hover:bg-pink-700 transition-colors duration-200"
              >
                Donate ${donationAmount || '0'} {isMonthly ? 'Monthly' : 'Now'}
              </button>
            </form>
          </div>

          {/* Impact Information */}
          <div className="space-y-8">
            {/* Your Impact */}
            <div className="bg-white rounded-lg shadow-lg p-8">
              <h3 className="text-xl font-bold text-gray-900 mb-4">Your Impact</h3>
              <div className="space-y-4">
                {impactData.map((item) => (
                  <div
                    key={item.amount}
                    className={`p-4 rounded-lg border-2 transition-all duration-200 ${
                      donationAmount && parseInt(donationAmount) >= item.amount
                        ? 'border-pink-500 bg-pink-50'
                        : 'border-gray-200'
                    }`}
                  >
                    <div className="flex justify-between items-center">
                      <span className="font-semibold text-gray-900">${item.amount}</span>
                      <span className="text-sm text-gray-600">{item.impact}</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Recent Impact Stats */}
            <div className="bg-white rounded-lg shadow-lg p-8">
              <h3 className="text-xl font-bold text-gray-900 mb-6">Recent Impact</h3>
              <div className="grid grid-cols-2 gap-6">
                <div className="text-center">
                  <div className="bg-pink-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-3">
                    <FaHeart className="h-8 w-8 text-pink-600" />
                  </div>
                  <div className="text-2xl font-bold text-gray-900">147</div>
                  <div className="text-sm text-gray-600">Animals rescued this month</div>
                </div>
                <div className="text-center">
                  <div className="bg-green-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-3">
                    <FaDollarSign className="h-8 w-8 text-green-600" />
                  </div>
                  <div className="text-2xl font-bold text-gray-900">$45,670</div>
                  <div className="text-sm text-gray-600">Raised this year</div>
                </div>
                <div className="text-center">
                  <div className="bg-blue-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-3">
                    <FaUsers className="h-8 w-8 text-blue-600" />
                  </div>
                  <div className="text-2xl font-bold text-gray-900">456</div>
                  <div className="text-sm text-gray-600">Active donors</div>
                </div>
                <div className="text-center">
                  <div className="bg-purple-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-3">
                    <FaChartLine className="h-8 w-8 text-purple-600" />
                  </div>
                  <div className="text-2xl font-bold text-gray-900">89%</div>
                  <div className="text-sm text-gray-600">Successful adoptions</div>
                </div>
              </div>
            </div>

            {/* Other Ways to Help */}
            <div className="bg-white rounded-lg shadow-lg p-8">
              <h3 className="text-xl font-bold text-gray-900 mb-4">Other Ways to Help</h3>
              <div className="space-y-4">
                <div className="flex items-center">
                  <div className="w-3 h-3 bg-pink-500 rounded-full mr-3"></div>
                  <span className="text-gray-700">Volunteer at our shelter</span>
                </div>
                <div className="flex items-center">
                  <div className="w-3 h-3 bg-pink-500 rounded-full mr-3"></div>
                  <span className="text-gray-700">Foster animals in need</span>
                </div>
                <div className="flex items-center">
                  <div className="w-3 h-3 bg-pink-500 rounded-full mr-3"></div>
                  <span className="text-gray-700">Sponsor a specific animal</span>
                </div>
                <div className="flex items-center">
                  <div className="w-3 h-3 bg-pink-500 rounded-full mr-3"></div>
                  <span className="text-gray-700">Donate supplies and equipment</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DonatePage;
