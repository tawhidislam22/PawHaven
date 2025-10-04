import React, { useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { useForm, Controller } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import { FaUser, FaEnvelope, FaPhone, FaHome, FaHeart, FaPaw, FaCheck, FaTimes } from 'react-icons/fa';
import { User, Mail, Phone, Home, Heart, Check, X, ChevronRight, AlertCircle } from 'lucide-react';

// Validation schema
const adoptionSchema = yup.object({
  firstName: yup.string().required('First name is required').min(2, 'Too short'),
  lastName: yup.string().required('Last name is required').min(2, 'Too short'),
  email: yup.string().email('Invalid email').required('Email is required'),
  phone: yup.string().required('Phone number is required'),
  address: yup.string().required('Address is required'),
  city: yup.string().required('City is required'),
  state: yup.string().required('State is required'),
  zipCode: yup.string().required('ZIP code is required'),
  housingType: yup.string().required('Please select housing type'),
  hasYard: yup.boolean(),
  hasOtherPets: yup.boolean(),
  otherPetsDetails: yup.string().when('hasOtherPets', {
    is: true,
    then: (schema) => schema.required('Please provide details about other pets'),
    otherwise: (schema) => schema
  }),
  experience: yup.string().required('Please describe your experience'),
  reason: yup.string().required('Please tell us why you want to adopt'),
  availability: yup.string().required('Please describe your availability'),
  vetReference: yup.string(),
  agreeToTerms: yup.boolean().oneOf([true], 'You must agree to the terms')
});

const AdoptionForm = ({ pet, onSubmit, isLoading = false }) => {
  const [currentStep, setCurrentStep] = useState(1);
  const [formData, setFormData] = useState({});
  const totalSteps = 4;

  const {
    control,
    handleSubmit,
    formState: { isValid },
    trigger,
    getValues,
    watch
  } = useForm({
    resolver: yupResolver(adoptionSchema),
    mode: 'onChange',
    defaultValues: {
      hasYard: false,
      hasOtherPets: false,
      agreeToTerms: false
    }
  });

  const watchHasOtherPets = watch('hasOtherPets');

  const stepTitles = [
    'Personal Information',
    'Housing Details',
    'Pet Experience',
    'Review & Submit'
  ];

  const nextStep = async () => {
    const fieldsToValidate = getFieldsForStep(currentStep);
    const isStepValid = await trigger(fieldsToValidate);
    
    if (isStepValid) {
      if (currentStep < totalSteps) {
        setFormData({ ...formData, ...getValues() });
        setCurrentStep(currentStep + 1);
      }
    }
  };

  const prevStep = () => {
    if (currentStep > 1) {
      setCurrentStep(currentStep - 1);
    }
  };

  const getFieldsForStep = (step) => {
    switch (step) {
      case 1:
        return ['firstName', 'lastName', 'email', 'phone'];
      case 2:
        return ['address', 'city', 'state', 'zipCode', 'housingType'];
      case 3:
        return ['experience', 'reason', 'availability'];
      case 4:
        return ['agreeToTerms'];
      default:
        return [];
    }
  };

  const onFormSubmit = (data) => {
    const applicationData = {
      ...data,
      petId: pet.id,
      submittedAt: new Date().toISOString()
    };
    onSubmit(applicationData);
  };

  const FormField = ({ 
    name, 
    label, 
    type = 'text', 
    placeholder, 
    icon: Icon, 
    required = false,
    as = 'input',
    options = [],
    rows = 3
  }) => (
    <Controller
      name={name}
      control={control}
      render={({ field, fieldState: { error } }) => (
        <div className="space-y-2">
          <label className="block text-sm font-semibold text-gray-700">
            {Icon && <Icon className="inline h-4 w-4 mr-2 text-pink-500" />}
            {label}
            {required && <span className="text-red-500 ml-1">*</span>}
          </label>
          
          <div className="relative">
            {as === 'select' ? (
              <select
                {...field}
                className={`w-full p-4 border-2 rounded-xl transition-all duration-200 focus:outline-none ${
                  error 
                    ? 'border-red-300 focus:border-red-500 bg-red-50' 
                    : 'border-gray-200 focus:border-pink-400 hover:border-pink-300'
                } ${Icon ? 'pl-12' : ''}`}
              >
                <option value="">{placeholder}</option>
                {options.map(option => (
                  <option key={option.value} value={option.value}>
                    {option.label}
                  </option>
                ))}
              </select>
            ) : as === 'textarea' ? (
              <textarea
                {...field}
                placeholder={placeholder}
                rows={rows}
                className={`w-full p-4 border-2 rounded-xl transition-all duration-200 focus:outline-none resize-none ${
                  error 
                    ? 'border-red-300 focus:border-red-500 bg-red-50' 
                    : 'border-gray-200 focus:border-pink-400 hover:border-pink-300'
                } ${Icon ? 'pl-12' : ''}`}
              />
            ) : type === 'checkbox' ? (
              <div className="flex items-center space-x-3">
                <input
                  type="checkbox"
                  {...field}
                  className="w-5 h-5 text-pink-600 bg-gray-100 border-gray-300 rounded focus:ring-pink-500 focus:ring-2"
                />
                <span className="text-sm text-gray-600">{placeholder}</span>
              </div>
            ) : (
              <input
                type={type}
                {...field}
                placeholder={placeholder}
                className={`w-full p-4 border-2 rounded-xl transition-all duration-200 focus:outline-none ${
                  error 
                    ? 'border-red-300 focus:border-red-500 bg-red-50' 
                    : 'border-gray-200 focus:border-pink-400 hover:border-pink-300'
                } ${Icon ? 'pl-12' : ''}`}
              />
            )}
            
            {Icon && as !== 'checkbox' && (
              <Icon className="absolute left-4 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
            )}
          </div>
          
          {error && (
            <motion.p
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              className="text-sm text-red-600 flex items-center"
            >
              <AlertCircle className="h-4 w-4 mr-1" />
              {error.message}
            </motion.p>
          )}
        </div>
      )}
    />
  );

  const StepIndicator = () => (
    <div className="flex items-center justify-center mb-8">
      {Array.from({ length: totalSteps }, (_, i) => (
        <div key={i} className="flex items-center">
          <div className={`
            relative w-10 h-10 rounded-full flex items-center justify-center font-semibold text-sm
            ${i + 1 <= currentStep 
              ? 'bg-gradient-to-r from-pink-500 to-purple-600 text-white' 
              : 'bg-gray-200 text-gray-500'
            }
          `}>
            {i + 1 < currentStep ? <Check className="h-5 w-5" /> : i + 1}
          </div>
          {i < totalSteps - 1 && (
            <div className={`
              w-16 h-1 mx-2
              ${i + 1 < currentStep ? 'bg-gradient-to-r from-pink-500 to-purple-600' : 'bg-gray-200'}
            `} />
          )}
        </div>
      ))}
    </div>
  );

  const renderStep = () => {
    switch (currentStep) {
      case 1:
        return (
          <motion.div
            key="step1"
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -50 }}
            className="space-y-6"
          >
            <div className="text-center mb-8">
              <h3 className="text-2xl font-bold text-gray-800 mb-2">Personal Information</h3>
              <p className="text-gray-600">Tell us about yourself</p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <FormField name="firstName" label="First Name" placeholder="John" icon={User} required />
              <FormField name="lastName" label="Last Name" placeholder="Doe" icon={User} required />
            </div>

            <FormField name="email" label="Email Address" type="email" placeholder="john@example.com" icon={Mail} required />
            <FormField name="phone" label="Phone Number" type="tel" placeholder="(555) 123-4567" icon={Phone} required />
          </motion.div>
        );

      case 2:
        return (
          <motion.div
            key="step2"
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -50 }}
            className="space-y-6"
          >
            <div className="text-center mb-8">
              <h3 className="text-2xl font-bold text-gray-800 mb-2">Housing Details</h3>
              <p className="text-gray-600">Information about your living situation</p>
            </div>

            <FormField name="address" label="Street Address" placeholder="123 Main Street" icon={Home} required />
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <FormField name="city" label="City" placeholder="Springfield" required />
              <FormField name="state" label="State" placeholder="CA" required />
              <FormField name="zipCode" label="ZIP Code" placeholder="12345" required />
            </div>

            <FormField 
              name="housingType" 
              label="Housing Type" 
              as="select"
              placeholder="Select housing type"
              icon={Home}
              options={[
                { value: 'house', label: 'House' },
                { value: 'apartment', label: 'Apartment' },
                { value: 'condo', label: 'Condo' },
                { value: 'townhouse', label: 'Townhouse' }
              ]}
              required 
            />

            <FormField 
              name="hasYard" 
              label="Do you have a yard?"
              type="checkbox"
              placeholder="Yes, I have a yard or outdoor space"
            />
          </motion.div>
        );

      case 3:
        return (
          <motion.div
            key="step3"
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -50 }}
            className="space-y-6"
          >
            <div className="text-center mb-8">
              <h3 className="text-2xl font-bold text-gray-800 mb-2">Pet Experience</h3>
              <p className="text-gray-600">Help us understand your background with pets</p>
            </div>

            <FormField 
              name="hasOtherPets" 
              label="Do you currently have other pets?"
              type="checkbox"
              placeholder="Yes, I have other pets"
            />

            {watchHasOtherPets && (
              <motion.div
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: 'auto' }}
                exit={{ opacity: 0, height: 0 }}
              >
                <FormField 
                  name="otherPetsDetails" 
                  label="Tell us about your other pets"
                  as="textarea"
                  placeholder="Please describe your current pets (species, age, temperament, etc.)"
                  required
                />
              </motion.div>
            )}

            <FormField 
              name="experience" 
              label="Pet Care Experience"
              as="textarea"
              placeholder="Describe your experience with pets (training, care, veterinary needs, etc.)"
              required
            />

            <FormField 
              name="reason" 
              label="Why do you want to adopt this pet?"
              as="textarea"
              placeholder="Tell us what draws you to this specific pet and your motivation for adoption"
              required
            />

            <FormField 
              name="availability" 
              label="Your Schedule & Availability"
              as="textarea"
              placeholder="Describe your daily schedule and how much time you can dedicate to your new pet"
              required
            />

            <FormField 
              name="vetReference" 
              label="Veterinarian Reference (Optional)"
              placeholder="Vet clinic name and phone number"
            />
          </motion.div>
        );

      case 4:
        return (
          <motion.div
            key="step4"
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -50 }}
            className="space-y-6"
          >
            <div className="text-center mb-8">
              <h3 className="text-2xl font-bold text-gray-800 mb-2">Review & Submit</h3>
              <p className="text-gray-600">Please review your information and submit your application</p>
            </div>

            {/* Pet Summary */}
            <div className="bg-gradient-to-r from-pink-50 to-purple-50 rounded-2xl p-6 border border-pink-200">
              <div className="flex items-center space-x-4">
                <img
                  src={pet.imageUrl}
                  alt={pet.name}
                  className="w-20 h-20 rounded-xl object-cover"
                />
                <div>
                  <h4 className="text-xl font-bold text-gray-800">{pet.name}</h4>
                  <p className="text-gray-600">{pet.breed} • {pet.gender} • {pet.size}</p>
                  <p className="text-sm text-gray-500">Application for adoption</p>
                </div>
              </div>
            </div>

            {/* Application Summary */}
            <div className="bg-gray-50 rounded-2xl p-6 space-y-4">
              <h4 className="font-semibold text-gray-800">Application Summary</h4>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
                <div><strong>Name:</strong> {getValues('firstName')} {getValues('lastName')}</div>
                <div><strong>Email:</strong> {getValues('email')}</div>
                <div><strong>Phone:</strong> {getValues('phone')}</div>
                <div><strong>Housing:</strong> {getValues('housingType')}</div>
              </div>
            </div>

            <FormField 
              name="agreeToTerms" 
              label="Terms and Agreement"
              type="checkbox"
              placeholder="I agree to the adoption terms and conditions, and understand that providing false information may result in application rejection"
              required
            />

            <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
              <p className="text-sm text-blue-800">
                <AlertCircle className="inline h-4 w-4 mr-1" />
                By submitting this application, you agree to a home visit and reference checks as part of our adoption process.
              </p>
            </div>
          </motion.div>
        );

      default:
        return null;
    }
  };

  return (
    <div className="max-w-4xl mx-auto p-6">
      <div className="bg-white rounded-3xl shadow-xl overflow-hidden">
        <div className="bg-gradient-to-r from-pink-600 via-purple-600 to-cyan-600 p-8 text-white">
          <h2 className="text-3xl font-bold mb-2">Adoption Application</h2>
          <p className="text-pink-100">Step {currentStep} of {totalSteps}: {stepTitles[currentStep - 1]}</p>
        </div>

        <div className="p-8">
          <StepIndicator />
          
          <form onSubmit={handleSubmit(onFormSubmit)}>
            <AnimatePresence mode="wait">
              {renderStep()}
            </AnimatePresence>

            <div className="flex justify-between mt-12">
              <button
                type="button"
                onClick={prevStep}
                disabled={currentStep === 1}
                className={`px-8 py-3 rounded-xl font-semibold transition-all duration-200 flex items-center ${
                  currentStep === 1
                    ? 'bg-gray-100 text-gray-400 cursor-not-allowed'
                    : 'bg-gray-200 text-gray-700 hover:bg-gray-300 hover:scale-105'
                }`}
              >
                <ChevronRight className="h-5 w-5 mr-2 rotate-180" />
                Previous
              </button>

              {currentStep < totalSteps ? (
                <button
                  type="button"
                  onClick={nextStep}
                  className="px-8 py-3 bg-gradient-to-r from-pink-500 to-purple-600 text-white rounded-xl font-semibold hover:from-pink-600 hover:to-purple-700 transition-all duration-200 hover:scale-105 flex items-center"
                >
                  Next Step
                  <ChevronRight className="h-5 w-5 ml-2" />
                </button>
              ) : (
                <button
                  type="submit"
                  disabled={!isValid || isLoading}
                  className={`px-8 py-3 rounded-xl font-semibold transition-all duration-200 flex items-center ${
                    isValid && !isLoading
                      ? 'bg-gradient-to-r from-green-500 to-emerald-600 text-white hover:from-green-600 hover:to-emerald-700 hover:scale-105'
                      : 'bg-gray-300 text-gray-500 cursor-not-allowed'
                  }`}
                >
                  {isLoading ? (
                    <>
                      <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white mr-2"></div>
                      Submitting...
                    </>
                  ) : (
                    <>
                      <Heart className="h-5 w-5 mr-2" />
                      Submit Application
                    </>
                  )}
                </button>
              )}
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default AdoptionForm;
