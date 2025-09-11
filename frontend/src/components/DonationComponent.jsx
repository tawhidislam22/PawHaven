import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useForm, Controller } from 'react-hook-form';
import { Heart, CreditCard, Lock, Gift, DollarSign, Award, Star, Check } from 'lucide-react';

const DonationComponent = ({ onSubmit, isLoading = false }) => {
  const [selectedAmount, setSelectedAmount] = useState(null);
  const [donationType, setDonationType] = useState('one-time');
  const [showPaymentForm, setShowPaymentForm] = useState(false);

  const { control, handleSubmit, setValue, watch, formState: { errors } } = useForm({
    defaultValues: {
      amount: '',
      donationType: 'one-time',
      isAnonymous: false,
      dedicateToSomeone: false
    }
  });

  const watchAmount = watch('amount');
  const watchDedicateToSomeone = watch('dedicateToSomeone');

  const predefinedAmounts = [
    { amount: 25, impact: 'Feeds 5 pets for a day', icon: '🍽️' },
    { amount: 50, impact: 'Provides medical checkup', icon: '🏥' },
    { amount: 100, impact: 'Sponsors pet supplies for a week', icon: '🛍️' },
    { amount: 250, impact: 'Covers vaccination for 10 pets', icon: '💉' },
    { amount: 500, impact: 'Funds emergency medical care', icon: '🚨' },
    { amount: 1000, impact: 'Sponsors a pet for 3 months', icon: '⭐' }
  ];

  const donorBenefits = [
    { level: 'Friend', min: 25, benefits: ['Monthly newsletter', 'Tax receipt'], color: 'bg-blue-500' },
    { level: 'Supporter', min: 100, benefits: ['Above +', 'Adoption updates', 'Pet photos'], color: 'bg-green-500' },
    { level: 'Champion', min: 250, benefits: ['Above +', 'Facility tours', 'Meet & greets'], color: 'bg-purple-500' },
    { level: 'Hero', min: 500, benefits: ['Above +', 'VIP events', 'Impact reports'], color: 'bg-pink-500' },
    { level: 'Guardian', min: 1000, benefits: ['Above +', 'Name recognition', 'Special gifts'], color: 'bg-gradient-to-r from-yellow-400 to-orange-500' }
  ];

  const handleAmountSelect = (amount) => {
    setSelectedAmount(amount);
    setValue('amount', amount);
  };

  const handleCustomAmount = (value) => {
    setSelectedAmount(null);
    setValue('amount', value);
  };

  const getDonorLevel = (amount) => {
    const numAmount = parseFloat(amount) || 0;
    return donorBenefits.reverse().find(level => numAmount >= level.min) || donorBenefits[donorBenefits.length - 1];
  };

  const proceedToPayment = () => {
    setShowPaymentForm(true);
  };

  const completeDonation = (paymentData) => {
    const donationData = {
      ...watch(),
      ...paymentData,
      timestamp: new Date().toISOString()
    };
    onSubmit(donationData);
  };

  if (showPaymentForm) {
    return <PaymentForm amount={watchAmount} onSubmit={completeDonation} onBack={() => setShowPaymentForm(false)} isLoading={isLoading} />;
  }

  return (
    <div className="max-w-6xl mx-auto p-6">
      <div className="text-center mb-12">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="inline-block"
        >
          <div className="w-20 h-20 bg-gradient-to-r from-pink-500 to-red-500 rounded-full flex items-center justify-center mx-auto mb-6">
            <Heart className="h-10 w-10 text-white animate-pulse" />
          </div>
        </motion.div>
        
        <h1 className="text-4xl md:text-5xl font-bold text-gradient-primary mb-4">
          Make a Difference Today
        </h1>
        <p className="text-xl text-gray-600 max-w-3xl mx-auto">
          Your donation directly impacts the lives of rescue animals. Every dollar helps provide food, medical care, and love to pets in need.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Donation Form */}
        <div className="lg:col-span-2 space-y-8">
          {/* Donation Type */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="bg-white rounded-2xl shadow-lg p-8"
          >
            <h3 className="text-2xl font-bold text-gray-800 mb-6">Choose Donation Type</h3>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <button
                type="button"
                onClick={() => {
                  setDonationType('one-time');
                  setValue('donationType', 'one-time');
                }}
                className={`p-6 rounded-xl border-2 transition-all duration-200 ${
                  donationType === 'one-time'
                    ? 'border-pink-500 bg-pink-50 text-pink-600'
                    : 'border-gray-200 hover:border-pink-300'
                }`}
              >
                <Gift className="h-8 w-8 mx-auto mb-3" />
                <h4 className="font-semibold text-lg">One-Time Gift</h4>
                <p className="text-sm text-gray-600 mt-2">Make a single donation to help pets today</p>
              </button>

              <button
                type="button"
                onClick={() => {
                  setDonationType('monthly');
                  setValue('donationType', 'monthly');
                }}
                className={`p-6 rounded-xl border-2 transition-all duration-200 relative ${
                  donationType === 'monthly'
                    ? 'border-pink-500 bg-pink-50 text-pink-600'
                    : 'border-gray-200 hover:border-pink-300'
                }`}
              >
                <div className="absolute -top-2 -right-2 bg-gradient-to-r from-green-400 to-emerald-500 text-white text-xs font-bold px-3 py-1 rounded-full">
                  IMPACT+
                </div>
                <Heart className="h-8 w-8 mx-auto mb-3" />
                <h4 className="font-semibold text-lg">Monthly Giving</h4>
                <p className="text-sm text-gray-600 mt-2">Ongoing support for sustainable care</p>
              </button>
            </div>
          </motion.div>

          {/* Amount Selection */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="bg-white rounded-2xl shadow-lg p-8"
          >
            <h3 className="text-2xl font-bold text-gray-800 mb-6">Select Amount</h3>
            
            <div className="grid grid-cols-2 md:grid-cols-3 gap-4 mb-6">
              {predefinedAmounts.map(({ amount, impact, icon }) => (
                <button
                  key={amount}
                  type="button"
                  onClick={() => handleAmountSelect(amount)}
                  className={`p-4 rounded-xl border-2 transition-all duration-200 text-center group ${
                    selectedAmount === amount
                      ? 'border-pink-500 bg-pink-50 text-pink-600 scale-105'
                      : 'border-gray-200 hover:border-pink-300 hover:scale-102'
                  }`}
                >
                  <div className="text-2xl mb-2">{icon}</div>
                  <div className="font-bold text-lg">${amount}</div>
                  <div className="text-xs text-gray-600 mt-1 group-hover:text-pink-600">
                    {impact}
                  </div>
                </button>
              ))}
            </div>

            <div className="relative">
              <DollarSign className="absolute left-4 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
              <Controller
                name="amount"
                control={control}
                rules={{ required: 'Please enter an amount', min: { value: 1, message: 'Minimum $1' } }}
                render={({ field }) => (
                  <input
                    type="number"
                    placeholder="Enter custom amount"
                    {...field}
                    onChange={(e) => {
                      field.onChange(e);
                      handleCustomAmount(e.target.value);
                    }}
                    className="w-full pl-12 pr-4 py-4 border-2 border-gray-200 rounded-xl focus:border-pink-400 focus:outline-none text-lg"
                  />
                )}
              />
            </div>
            {errors.amount && (
              <p className="text-red-600 text-sm mt-2">{errors.amount.message}</p>
            )}
          </motion.div>

          {/* Additional Options */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="bg-white rounded-2xl shadow-lg p-8"
          >
            <h3 className="text-2xl font-bold text-gray-800 mb-6">Additional Options</h3>
            
            <div className="space-y-6">
              <Controller
                name="isAnonymous"
                control={control}
                render={({ field }) => (
                  <label className="flex items-center space-x-3 cursor-pointer">
                    <input
                      type="checkbox"
                      {...field}
                      className="w-5 h-5 text-pink-600 bg-gray-100 border-gray-300 rounded focus:ring-pink-500 focus:ring-2"
                    />
                    <span className="text-gray-700">Make this donation anonymous</span>
                  </label>
                )}
              />

              <Controller
                name="dedicateToSomeone"
                control={control}
                render={({ field }) => (
                  <label className="flex items-center space-x-3 cursor-pointer">
                    <input
                      type="checkbox"
                      {...field}
                      className="w-5 h-5 text-pink-600 bg-gray-100 border-gray-300 rounded focus:ring-pink-500 focus:ring-2"
                    />
                    <span className="text-gray-700">Dedicate this donation to someone special</span>
                  </label>
                )}
              />

              <AnimatePresence>
                {watchDedicateToSomeone && (
                  <motion.div
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: 'auto' }}
                    exit={{ opacity: 0, height: 0 }}
                    className="ml-8 space-y-4"
                  >
                    <Controller
                      name="dedicationName"
                      control={control}
                      render={({ field }) => (
                        <input
                          {...field}
                          placeholder="Name of person to honor"
                          className="w-full p-3 border border-gray-300 rounded-lg focus:border-pink-400 focus:outline-none"
                        />
                      )}
                    />
                    <Controller
                      name="dedicationMessage"
                      control={control}
                      render={({ field }) => (
                        <textarea
                          {...field}
                          placeholder="Optional message"
                          rows="3"
                          className="w-full p-3 border border-gray-300 rounded-lg focus:border-pink-400 focus:outline-none resize-none"
                        />
                      )}
                    />
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          </motion.div>

          {/* Continue Button */}
          <motion.button
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            onClick={handleSubmit(proceedToPayment)}
            disabled={!watchAmount || parseFloat(watchAmount) < 1}
            className={`w-full py-4 rounded-xl font-semibold text-lg transition-all duration-200 ${
              watchAmount && parseFloat(watchAmount) >= 1
                ? 'bg-gradient-to-r from-pink-500 to-purple-600 text-white hover:from-pink-600 hover:to-purple-700 hover:scale-105 shadow-lg'
                : 'bg-gray-300 text-gray-500 cursor-not-allowed'
            }`}
          >
            Proceed to Payment • ${watchAmount || '0'}
          </motion.button>
        </div>

        {/* Sidebar */}
        <div className="space-y-6">
          {/* Impact Preview */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            className="bg-gradient-to-br from-pink-50 to-purple-50 rounded-2xl p-6 border border-pink-200"
          >
            <h4 className="font-bold text-lg text-gray-800 mb-4">Your Impact</h4>
            {watchAmount && parseFloat(watchAmount) > 0 ? (
              <div className="space-y-3">
                <div className="text-3xl font-bold text-pink-600">
                  ${parseFloat(watchAmount).toLocaleString()}
                </div>
                <div className="text-sm text-gray-600">
                  {donationType === 'monthly' ? 'Monthly donation' : 'One-time gift'}
                </div>
                <div className="bg-white rounded-lg p-3 text-sm">
                  {predefinedAmounts.find(p => p.amount <= parseFloat(watchAmount))?.impact || 
                   `Helps provide essential care for ${Math.floor(parseFloat(watchAmount) / 5)} pet meals`}
                </div>
              </div>
            ) : (
              <div className="text-gray-500 text-center py-8">
                Select an amount to see your impact
              </div>
            )}
          </motion.div>

          {/* Donor Level */}
          {watchAmount && parseFloat(watchAmount) > 0 && (
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              className="bg-white rounded-2xl p-6 shadow-lg"
            >
              <h4 className="font-bold text-lg text-gray-800 mb-4">Donor Recognition</h4>
              {(() => {
                const level = getDonorLevel(watchAmount);
                return (
                  <div>
                    <div className={`inline-flex items-center px-4 py-2 rounded-full text-white font-semibold ${level.color}`}>
                      <Award className="h-4 w-4 mr-2" />
                      {level.level}
                    </div>
                    <ul className="mt-4 space-y-2 text-sm">
                      {level.benefits.map((benefit, idx) => (
                        <li key={idx} className="flex items-center">
                          <Check className="h-4 w-4 text-green-500 mr-2" />
                          {benefit}
                        </li>
                      ))}
                    </ul>
                  </div>
                );
              })()}
            </motion.div>
          )}

          {/* Success Stories */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.2 }}
            className="bg-white rounded-2xl p-6 shadow-lg"
          >
            <h4 className="font-bold text-lg text-gray-800 mb-4">Recent Success</h4>
            <div className="text-center">
              <img
                src="https://images.unsplash.com/photo-1583337130417-3346a1be7dee?w=200&h=200&fit=crop&crop=faces"
                alt="Rescued pet"
                className="w-20 h-20 rounded-full mx-auto mb-3 object-cover"
              />
              <h5 className="font-semibold">Buddy</h5>
              <p className="text-sm text-gray-600 mt-2">
                "Thanks to donations like yours, I found my forever home! 🏠❤️"
              </p>
            </div>
          </motion.div>

          {/* Trust Indicators */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.3 }}
            className="bg-white rounded-2xl p-6 shadow-lg"
          >
            <h4 className="font-bold text-lg text-gray-800 mb-4">Your Donation is Secure</h4>
            <div className="space-y-3 text-sm text-gray-600">
              <div className="flex items-center">
                <Lock className="h-4 w-4 text-green-500 mr-2" />
                SSL Encrypted
              </div>
              <div className="flex items-center">
                <Star className="h-4 w-4 text-yellow-500 mr-2" />
                4.9/5 Charity Rating
              </div>
              <div className="flex items-center">
                <Check className="h-4 w-4 text-blue-500 mr-2" />
                Tax Deductible
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  );
};

// Payment Form Component
const PaymentForm = ({ amount, onSubmit, onBack, isLoading }) => {
  const { control, handleSubmit, formState: { errors } } = useForm();

  const onPaymentSubmit = (data) => {
    onSubmit(data);
  };

  return (
    <div className="max-w-2xl mx-auto p-6">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="bg-white rounded-2xl shadow-xl overflow-hidden"
      >
        <div className="bg-gradient-to-r from-pink-600 to-purple-600 p-6 text-white">
          <h2 className="text-2xl font-bold">Complete Your Donation</h2>
          <p className="text-pink-100 mt-2">Amount: ${parseFloat(amount).toLocaleString()}</p>
        </div>

        <form onSubmit={handleSubmit(onPaymentSubmit)} className="p-8 space-y-6">
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-2">
              Card Number
            </label>
            <Controller
              name="cardNumber"
              control={control}
              rules={{ required: 'Card number is required' }}
              render={({ field }) => (
                <div className="relative">
                  <CreditCard className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
                  <input
                    {...field}
                    placeholder="1234 5678 9012 3456"
                    className="w-full pl-12 pr-4 py-3 border-2 border-gray-200 rounded-lg focus:border-pink-400 focus:outline-none"
                  />
                </div>
              )}
            />
            {errors.cardNumber && <p className="text-red-600 text-sm mt-1">{errors.cardNumber.message}</p>}
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">
                Expiry Date
              </label>
              <Controller
                name="expiryDate"
                control={control}
                rules={{ required: 'Expiry date is required' }}
                render={({ field }) => (
                  <input
                    {...field}
                    placeholder="MM/YY"
                    className="w-full p-3 border-2 border-gray-200 rounded-lg focus:border-pink-400 focus:outline-none"
                  />
                )}
              />
              {errors.expiryDate && <p className="text-red-600 text-sm mt-1">{errors.expiryDate.message}</p>}
            </div>

            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">
                CVV
              </label>
              <Controller
                name="cvv"
                control={control}
                rules={{ required: 'CVV is required' }}
                render={({ field }) => (
                  <input
                    {...field}
                    placeholder="123"
                    className="w-full p-3 border-2 border-gray-200 rounded-lg focus:border-pink-400 focus:outline-none"
                  />
                )}
              />
              {errors.cvv && <p className="text-red-600 text-sm mt-1">{errors.cvv.message}</p>}
            </div>
          </div>

          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-2">
              Name on Card
            </label>
            <Controller
              name="cardName"
              control={control}
              rules={{ required: 'Name is required' }}
              render={({ field }) => (
                <input
                  {...field}
                  placeholder="John Doe"
                  className="w-full p-3 border-2 border-gray-200 rounded-lg focus:border-pink-400 focus:outline-none"
                />
              )}
            />
            {errors.cardName && <p className="text-red-600 text-sm mt-1">{errors.cardName.message}</p>}
          </div>

          <div className="flex space-x-4">
            <button
              type="button"
              onClick={onBack}
              className="flex-1 py-3 border-2 border-gray-300 text-gray-700 rounded-lg font-semibold hover:bg-gray-50 transition-colors"
            >
              Back
            </button>
            <button
              type="submit"
              disabled={isLoading}
              className={`flex-1 py-3 rounded-lg font-semibold transition-all duration-200 ${
                isLoading
                  ? 'bg-gray-300 text-gray-500 cursor-not-allowed'
                  : 'bg-gradient-to-r from-pink-500 to-purple-600 text-white hover:from-pink-600 hover:to-purple-700 hover:scale-105'
              }`}
            >
              {isLoading ? (
                <div className="flex items-center justify-center">
                  <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white mr-2"></div>
                  Processing...
                </div>
              ) : (
                `Donate $${parseFloat(amount).toLocaleString()}`
              )}
            </button>
          </div>

          <div className="bg-gray-50 rounded-lg p-4 text-sm text-gray-600 text-center">
            <Lock className="inline h-4 w-4 mr-1" />
            Your payment information is encrypted and secure
          </div>
        </form>
      </motion.div>
    </div>
  );
};

export default DonationComponent;
