import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { FaPhone, FaEnvelope, FaMapMarkerAlt, FaClock, FaPaw, FaHeart, FaUsers, FaHandsHelping, FaPaperPlane, FaFacebook, FaTwitter, FaInstagram, FaLinkedin } from 'react-icons/fa';

const ContactPage = () => {
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        phone: '',
        subject: '',
        message: '',
        inquiryType: 'general'
    });

    const [isSubmitting, setIsSubmitting] = useState(false);
    const [submitStatus, setSubmitStatus] = useState(null);

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({
            ...prev,
            [name]: value
        }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setIsSubmitting(true);
        
        // Simulate form submission (replace with actual API call)
        setTimeout(() => {
            setIsSubmitting(false);
            setSubmitStatus('success');
            setFormData({
                name: '',
                email: '',
                phone: '',
                subject: '',
                message: '',
                inquiryType: 'general'
            });
            
            // Clear success message after 5 seconds
            setTimeout(() => setSubmitStatus(null), 5000);
        }, 2000);
    };

    const contactInfo = [
        {
            icon: FaPhone,
            title: 'Phone',
            details: ['+1 (555) 123-PAWS', '+1 (555) 123-7297'],
            description: 'Call us during business hours for immediate assistance',
            color: 'from-blue-500 to-cyan-500'
        },
        {
            icon: FaEnvelope,
            title: 'Email',
            details: ['info@pawhaven.org', 'adoptions@pawhaven.org'],
            description: 'Send us an email and we\'ll respond within 24 hours',
            color: 'from-purple-500 to-indigo-500'
        },
        {
            icon: FaMapMarkerAlt,
            title: 'Address',
            details: ['123 Rescue Lane', 'Pet City, PC 12345'],
            description: 'Visit our main facility and meet our furry friends',
            color: 'from-pink-500 to-rose-500'
        },
        {
            icon: FaClock,
            title: 'Hours',
            details: ['Mon-Fri: 9AM-6PM', 'Sat-Sun: 10AM-4PM'],
            description: 'Our adoption center is open 7 days a week',
            color: 'from-amber-500 to-orange-500'
        }
    ];

    const inquiryTypes = [
        { value: 'general', label: '🐾 General Inquiry', icon: FaPaw },
        { value: 'adoption', label: '❤️ Pet Adoption', icon: FaHeart },
        { value: 'volunteer', label: '🤝 Volunteer Opportunities', icon: FaHandsHelping },
        { value: 'partnership', label: '🏢 Partnership/Business', icon: FaUsers }
    ];

    const socialMedia = [
        { icon: FaFacebook, name: 'Facebook', url: '#', color: 'hover:text-blue-600' },
        { icon: FaTwitter, name: 'Twitter', url: '#', color: 'hover:text-sky-500' },
        { icon: FaInstagram, name: 'Instagram', url: '#', color: 'hover:text-pink-600' },
        { icon: FaLinkedin, name: 'LinkedIn', url: '#', color: 'hover:text-blue-700' }
    ];

    return (
        <div className="min-h-screen bg-gradient-to-br from-purple-50 via-pink-50 to-amber-50">
            {/* Hero Section */}
            <section className="relative py-20 overflow-hidden">
                {/* Background decorations */}
                <div className="absolute top-10 right-10 text-6xl opacity-10 animate-bounce" style={{animationDuration: '3s'}}>📞</div>
                <div className="absolute bottom-20 left-20 text-4xl opacity-15 float-animation" style={{animationDelay: '1s'}}>💌</div>
                <div className="absolute top-1/2 right-1/4 text-5xl opacity-10 paw-animation" style={{animationDelay: '2s'}}>🐾</div>
                
                <div className="container mx-auto px-4 relative z-10">
                    <motion.div
                        initial={{ opacity: 0, y: 30 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.8 }}
                        className="text-center max-w-4xl mx-auto"
                    >
                        <div className="text-8xl mb-6">📱</div>
                        <h1 className="text-6xl font-black bg-gradient-to-r from-purple-600 via-pink-600 to-amber-600 bg-clip-text text-transparent mb-6">
                            Get in Touch
                        </h1>
                        <p className="text-xl text-gray-700 leading-relaxed mb-8">
                            Have questions about adoption, volunteering, or need help with pet care? 
                            We're here to help! Reach out to our friendly team and let's make a difference together.
                        </p>
                    </motion.div>
                </div>
            </section>

            {/* Contact Information Cards */}
            <section className="py-16 bg-white/50 backdrop-blur-sm">
                <div className="container mx-auto px-4">
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.6 }}
                        viewport={{ once: true }}
                        className="text-center mb-12"
                    >
                        <h2 className="text-4xl font-bold text-gray-800 mb-4">Contact Information</h2>
                        <p className="text-lg text-gray-600">Multiple ways to reach our dedicated team</p>
                    </motion.div>

                    <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
                        {contactInfo.map((info, index) => (
                            <motion.div
                                key={index}
                                initial={{ opacity: 0, scale: 0.9 }}
                                whileInView={{ opacity: 1, scale: 1 }}
                                transition={{ duration: 0.5, delay: index * 0.1 }}
                                viewport={{ once: true }}
                                whileHover={{ scale: 1.05, y: -5 }}
                                className="bg-white/80 backdrop-blur-lg rounded-2xl p-6 shadow-xl border border-pink-100 text-center"
                            >
                                <div className={`w-16 h-16 bg-gradient-to-r ${info.color} rounded-full flex items-center justify-center shadow-lg mx-auto mb-4`}>
                                    <info.icon className="text-white text-2xl" />
                                </div>
                                <h3 className="text-xl font-bold text-gray-800 mb-3">{info.title}</h3>
                                <div className="space-y-1 mb-3">
                                    {info.details.map((detail, idx) => (
                                        <p key={idx} className="text-gray-700 font-semibold">{detail}</p>
                                    ))}
                                </div>
                                <p className="text-gray-600 text-sm leading-relaxed">{info.description}</p>
                            </motion.div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Contact Form Section */}
            <section className="py-16">
                <div className="container mx-auto px-4">
                    <div className="grid lg:grid-cols-2 gap-12">
                        {/* Contact Form */}
                        <motion.div
                            initial={{ opacity: 0, x: -30 }}
                            whileInView={{ opacity: 1, x: 0 }}
                            transition={{ duration: 0.6 }}
                            viewport={{ once: true }}
                        >
                            <div className="bg-white/80 backdrop-blur-lg rounded-3xl p-8 shadow-2xl border-2 border-pink-200">
                                <div className="text-center mb-8">
                                    <div className="w-16 h-16 bg-gradient-to-r from-purple-500 to-pink-500 rounded-full flex items-center justify-center shadow-xl mx-auto mb-4">
                                        <FaPaperPlane className="text-white text-2xl" />
                                    </div>
                                    <h2 className="text-3xl font-bold text-gray-800 mb-2">Send us a Message</h2>
                                    <p className="text-gray-600">We'd love to hear from you!</p>
                                </div>

                                {submitStatus === 'success' && (
                                    <motion.div
                                        initial={{ opacity: 0, y: -10 }}
                                        animate={{ opacity: 1, y: 0 }}
                                        className="bg-green-100 border border-green-400 text-green-700 px-4 py-3 rounded-xl mb-6 flex items-center"
                                    >
                                        <FaHeart className="mr-2" />
                                        Thank you! Your message has been sent successfully. We'll get back to you soon! 🐾
                                    </motion.div>
                                )}

                                <form onSubmit={handleSubmit} className="space-y-6">
                                    {/* Inquiry Type */}
                                    <div>
                                        <label className="block text-sm font-semibold text-gray-700 mb-3">
                                            What can we help you with?
                                        </label>
                                        <div className="grid grid-cols-2 gap-3">
                                            {inquiryTypes.map((type) => (
                                                <label key={type.value} className="cursor-pointer">
                                                    <input
                                                        type="radio"
                                                        name="inquiryType"
                                                        value={type.value}
                                                        checked={formData.inquiryType === type.value}
                                                        onChange={handleInputChange}
                                                        className="sr-only"
                                                    />
                                                    <div className={`p-3 rounded-xl border-2 text-center transition-all duration-300 ${
                                                        formData.inquiryType === type.value
                                                            ? 'border-pink-500 bg-pink-50 text-pink-700'
                                                            : 'border-gray-200 hover:border-pink-300 hover:bg-pink-25'
                                                    }`}>
                                                        <div className="text-lg mb-1">{type.label.split(' ')[0]}</div>
                                                        <div className="text-xs font-medium">{type.label.split(' ').slice(1).join(' ')}</div>
                                                    </div>
                                                </label>
                                            ))}
                                        </div>
                                    </div>

                                    {/* Name and Email */}
                                    <div className="grid md:grid-cols-2 gap-4">
                                        <div>
                                            <label className="block text-sm font-semibold text-gray-700 mb-2">
                                                Full Name *
                                            </label>
                                            <input
                                                type="text"
                                                name="name"
                                                value={formData.name}
                                                onChange={handleInputChange}
                                                required
                                                className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-pink-500 focus:border-pink-500 transition-colors duration-300"
                                                placeholder="Your full name"
                                            />
                                        </div>
                                        <div>
                                            <label className="block text-sm font-semibold text-gray-700 mb-2">
                                                Email Address *
                                            </label>
                                            <input
                                                type="email"
                                                name="email"
                                                value={formData.email}
                                                onChange={handleInputChange}
                                                required
                                                className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-pink-500 focus:border-pink-500 transition-colors duration-300"
                                                placeholder="your.email@example.com"
                                            />
                                        </div>
                                    </div>

                                    {/* Phone and Subject */}
                                    <div className="grid md:grid-cols-2 gap-4">
                                        <div>
                                            <label className="block text-sm font-semibold text-gray-700 mb-2">
                                                Phone Number
                                            </label>
                                            <input
                                                type="tel"
                                                name="phone"
                                                value={formData.phone}
                                                onChange={handleInputChange}
                                                className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-pink-500 focus:border-pink-500 transition-colors duration-300"
                                                placeholder="(555) 123-4567"
                                            />
                                        </div>
                                        <div>
                                            <label className="block text-sm font-semibold text-gray-700 mb-2">
                                                Subject *
                                            </label>
                                            <input
                                                type="text"
                                                name="subject"
                                                value={formData.subject}
                                                onChange={handleInputChange}
                                                required
                                                className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-pink-500 focus:border-pink-500 transition-colors duration-300"
                                                placeholder="Brief subject line"
                                            />
                                        </div>
                                    </div>

                                    {/* Message */}
                                    <div>
                                        <label className="block text-sm font-semibold text-gray-700 mb-2">
                                            Message *
                                        </label>
                                        <textarea
                                            name="message"
                                            value={formData.message}
                                            onChange={handleInputChange}
                                            required
                                            rows={5}
                                            className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-pink-500 focus:border-pink-500 transition-colors duration-300 resize-vertical"
                                            placeholder="Tell us how we can help you..."
                                        />
                                    </div>

                                    {/* Submit Button */}
                                    <motion.button
                                        type="submit"
                                        disabled={isSubmitting}
                                        whileHover={{ scale: 1.02 }}
                                        whileTap={{ scale: 0.98 }}
                                        className={`w-full py-4 px-6 rounded-xl font-bold text-lg shadow-xl transition-all duration-300 ${
                                            isSubmitting
                                                ? 'bg-gray-400 cursor-not-allowed'
                                                : 'bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600 text-white hover:shadow-2xl'
                                        }`}
                                    >
                                        {isSubmitting ? (
                                            <span className="flex items-center justify-center">
                                                <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white mr-2"></div>
                                                Sending...
                                            </span>
                                        ) : (
                                            <span className="flex items-center justify-center">
                                                <FaPaperPlane className="mr-2" />
                                                Send Message 🐾
                                            </span>
                                        )}
                                    </motion.button>
                                </form>
                            </div>
                        </motion.div>

                        {/* Additional Information */}
                        <motion.div
                            initial={{ opacity: 0, x: 30 }}
                            whileInView={{ opacity: 1, x: 0 }}
                            transition={{ duration: 0.6 }}
                            viewport={{ once: true }}
                            className="space-y-8"
                        >
                            {/* FAQ Section */}
                            <div className="bg-white/80 backdrop-blur-lg rounded-3xl p-8 shadow-xl border border-pink-100">
                                <h3 className="text-2xl font-bold text-gray-800 mb-6 flex items-center">
                                    <div className="w-8 h-8 bg-gradient-to-r from-amber-400 to-orange-400 rounded-full flex items-center justify-center mr-3">
                                        <span className="text-white text-sm">?</span>
                                    </div>
                                    Quick Answers
                                </h3>
                                <div className="space-y-4">
                                    <div>
                                        <h4 className="font-semibold text-gray-800 mb-1">🐕 How long does adoption take?</h4>
                                        <p className="text-gray-600 text-sm">Most adoptions are completed within 3-5 business days after approval.</p>
                                    </div>
                                    <div>
                                        <h4 className="font-semibold text-gray-800 mb-1">💰 What are adoption fees?</h4>
                                        <p className="text-gray-600 text-sm">Fees vary by animal type and age, typically ranging from $50-$300.</p>
                                    </div>
                                    <div>
                                        <h4 className="font-semibold text-gray-800 mb-1">🏥 Are pets health-checked?</h4>
                                        <p className="text-gray-600 text-sm">Yes! All pets receive full veterinary care before adoption.</p>
                                    </div>
                                    <div>
                                        <h4 className="font-semibold text-gray-800 mb-1">🤝 Can I volunteer?</h4>
                                        <p className="text-gray-600 text-sm">Absolutely! We welcome volunteers of all experience levels.</p>
                                    </div>
                                </div>
                            </div>

                            {/* Emergency Contact */}
                            <div className="bg-gradient-to-r from-red-500 to-pink-500 rounded-3xl p-8 shadow-xl text-white">
                                <h3 className="text-2xl font-bold mb-4 flex items-center">
                                    <div className="text-3xl mr-3">🚨</div>
                                    Emergency?
                                </h3>
                                <p className="mb-4">If you've found an injured or abandoned animal, please contact:</p>
                                <div className="space-y-2">
                                    <p className="font-bold text-lg">📞 Emergency Hotline: (555) 911-PETS</p>
                                    <p className="text-red-100">Available 24/7 for animal emergencies</p>
                                </div>
                            </div>

                            {/* Social Media */}
                            <div className="bg-white/80 backdrop-blur-lg rounded-3xl p-8 shadow-xl border border-pink-100">
                                <h3 className="text-2xl font-bold text-gray-800 mb-6 text-center">Follow Our Journey</h3>
                                <div className="flex justify-center space-x-6">
                                    {socialMedia.map((social, index) => (
                                        <motion.a
                                            key={index}
                                            href={social.url}
                                            whileHover={{ scale: 1.1, y: -2 }}
                                            className={`w-12 h-12 bg-gray-100 rounded-full flex items-center justify-center text-gray-600 ${social.color} transition-colors duration-300 shadow-lg hover:shadow-xl`}
                                        >
                                            <social.icon className="text-xl" />
                                        </motion.a>
                                    ))}
                                </div>
                                <p className="text-center text-gray-600 mt-4 text-sm">
                                    Stay updated with our latest rescues and adoption success stories! 📸🐾
                                </p>
                            </div>
                        </motion.div>
                    </div>
                </div>
            </section>

            {/* Map Section (Placeholder) */}
            <section className="py-16 bg-white/50 backdrop-blur-sm">
                <div className="container mx-auto px-4">
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.6 }}
                        viewport={{ once: true }}
                        className="text-center mb-12"
                    >
                        <h2 className="text-4xl font-bold text-gray-800 mb-4">Visit Our Location</h2>
                        <p className="text-lg text-gray-600">Come meet our wonderful pets in person!</p>
                    </motion.div>

                    <motion.div
                        initial={{ opacity: 0, scale: 0.95 }}
                        whileInView={{ opacity: 1, scale: 1 }}
                        transition={{ duration: 0.6 }}
                        viewport={{ once: true }}
                        className="bg-gradient-to-br from-blue-100 to-cyan-100 rounded-3xl p-16 shadow-xl text-center"
                    >
                        <div className="text-6xl mb-6">🗺️</div>
                        <h3 className="text-2xl font-bold text-gray-800 mb-4">Interactive Map Coming Soon</h3>
                        <p className="text-gray-600 mb-6">
                            We're working on an interactive map to help you find us easily. 
                            In the meantime, you can use the address above with your favorite navigation app!
                        </p>
                        <div className="inline-block px-6 py-3 bg-white rounded-full shadow-lg">
                            <span className="font-semibold text-gray-800">📍 123 Rescue Lane, Pet City, PC 12345</span>
                        </div>
                    </motion.div>
                </div>
            </section>
        </div>
    );
};

export default ContactPage;