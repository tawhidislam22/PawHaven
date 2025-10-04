import React from 'react';
import { motion } from 'framer-motion';
import { FaHeart, FaPaw, FaUsers, FaHome, FaAward, FaHandsHelping, FaLeaf, FaStar } from 'react-icons/fa';

const AboutPage = () => {
    const stats = [
        { icon: FaHeart, number: '5,000+', label: 'Pets Rescued', color: 'from-pink-500 to-rose-500' },
        { icon: FaUsers, number: '3,200+', label: 'Happy Families', color: 'from-purple-500 to-indigo-500' },
        { icon: FaHome, number: '15+', label: 'Partner Shelters', color: 'from-blue-500 to-cyan-500' },
        { icon: FaAward, number: '50+', label: 'Awards Won', color: 'from-amber-500 to-orange-500' }
    ];

    const teamMembers = [
        {
            name: 'Sarah Johnson',
            role: 'Founder & CEO',
            image: 'https://images.unsplash.com/photo-1494790108755-2616b5d5e2ad?w=400&h=400&fit=crop&crop=face',
            bio: 'Passionate animal lover with 15+ years in animal welfare.',
            specialty: 'Animal Behavior'
        },
        {
            name: 'Dr. Michael Chen',
            role: 'Chief Veterinarian',
            image: 'https://images.unsplash.com/photo-1612349317150-e413f6a5b16d?w=400&h=400&fit=crop&crop=face',
            bio: 'Licensed veterinarian specializing in rescue animal care.',
            specialty: 'Veterinary Medicine'
        },
        {
            name: 'Emily Rodriguez',
            role: 'Adoption Coordinator',
            image: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=400&h=400&fit=crop&crop=face',
            bio: 'Dedicated to finding perfect matches between pets and families.',
            specialty: 'Pet Matching'
        },
        {
            name: 'David Kim',
            role: 'Community Outreach',
            image: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&h=400&fit=crop&crop=face',
            bio: 'Building bridges between communities and animal welfare.',
            specialty: 'Community Relations'
        }
    ];

    const values = [
        {
            icon: FaHeart,
            title: 'Compassion First',
            description: 'Every decision we make is guided by love and empathy for all animals in need.',
            color: 'from-pink-400 to-rose-400'
        },
        {
            icon: FaHandsHelping,
            title: 'Community Support',
            description: 'We believe in the power of community to create lasting change for animal welfare.',
            color: 'from-purple-400 to-indigo-400'
        },
        {
            icon: FaLeaf,
            title: 'Sustainable Care',
            description: 'Building environmentally conscious and financially sustainable rescue operations.',
            color: 'from-green-400 to-emerald-400'
        },
        {
            icon: FaStar,
            title: 'Excellence Always',
            description: 'Committed to providing the highest standard of care and service to pets and families.',
            color: 'from-amber-400 to-yellow-400'
        }
    ];

    return (
        <div className="min-h-screen bg-gradient-to-br from-purple-50 via-pink-50 to-amber-50">
            {/* Hero Section */}
            <section className="relative py-20 overflow-hidden">
                {/* Background decorations */}
                <div className="absolute top-10 right-10 w-32 h-32 bg-gradient-to-r from-pink-200 to-purple-200 rounded-full opacity-20 animate-pulse"></div>
                <div className="absolute bottom-20 left-20 w-24 h-24 bg-gradient-to-r from-amber-200 to-orange-200 rounded-full opacity-30 animate-bounce" style={{animationDuration: '3s'}}></div>
                <div className="absolute top-1/2 right-1/4 text-6xl opacity-10 animate-bounce" style={{animationDuration: '4s'}}>🐾</div>
                
                <div className="container mx-auto px-4 relative z-10">
                    <motion.div
                        initial={{ opacity: 0, y: 30 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.8 }}
                        className="text-center max-w-4xl mx-auto"
                    >
                        <div className="mb-8">
                            <div className="text-8xl mb-4">🐕‍🦺</div>
                            <h1 className="text-6xl font-black bg-gradient-to-r from-purple-600 via-pink-600 to-amber-600 bg-clip-text text-transparent mb-6">
                                About PawHaven
                            </h1>
                            <p className="text-xl text-gray-700 leading-relaxed mb-8">
                                Where every paw finds a path to happiness. We're more than just a pet adoption platform – 
                                we're a community dedicated to creating lifelong bonds between rescued animals and loving families.
                            </p>
                        </div>

                        {/* Mission Statement */}
                        <motion.div
                            initial={{ opacity: 0, scale: 0.9 }}
                            animate={{ opacity: 1, scale: 1 }}
                            transition={{ duration: 0.6, delay: 0.3 }}
                            className="bg-white/80 backdrop-blur-lg rounded-3xl p-8 shadow-2xl border-2 border-pink-200 mb-16"
                        >
                            <div className="flex items-center justify-center mb-6">
                                <div className="w-16 h-16 bg-gradient-to-r from-pink-500 to-purple-500 rounded-full flex items-center justify-center shadow-xl">
                                    <FaHeart className="text-white text-2xl animate-pulse" />
                                </div>
                            </div>
                            <h2 className="text-3xl font-bold text-gray-800 mb-4">Our Mission</h2>
                            <p className="text-lg text-gray-600 leading-relaxed">
                                To rescue, rehabilitate, and rehome animals in need while educating communities about 
                                responsible pet ownership and the importance of spaying, neutering, and compassionate animal care.
                            </p>
                        </motion.div>
                    </motion.div>
                </div>
            </section>

            {/* Statistics Section */}
            <section className="py-16 bg-white/50 backdrop-blur-sm">
                <div className="container mx-auto px-4">
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.6 }}
                        viewport={{ once: true }}
                        className="text-center mb-12"
                    >
                        <h2 className="text-4xl font-bold text-gray-800 mb-4">Our Impact in Numbers</h2>
                        <p className="text-lg text-gray-600">Every number represents a life changed, a family completed</p>
                    </motion.div>

                    <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
                        {stats.map((stat, index) => (
                            <motion.div
                                key={index}
                                initial={{ opacity: 0, scale: 0.8 }}
                                whileInView={{ opacity: 1, scale: 1 }}
                                transition={{ duration: 0.5, delay: index * 0.1 }}
                                viewport={{ once: true }}
                                whileHover={{ scale: 1.05, y: -5 }}
                                className="text-center bg-white/80 backdrop-blur-lg rounded-2xl p-6 shadow-xl border border-pink-100"
                            >
                                <div className={`w-16 h-16 bg-gradient-to-r ${stat.color} rounded-full flex items-center justify-center shadow-lg mx-auto mb-4`}>
                                    <stat.icon className="text-white text-2xl" />
                                </div>
                                <h3 className="text-3xl font-bold text-gray-800 mb-2">{stat.number}</h3>
                                <p className="text-gray-600 font-medium">{stat.label}</p>
                            </motion.div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Our Story Section */}
            <section className="py-16">
                <div className="container mx-auto px-4">
                    <div className="grid lg:grid-cols-2 gap-12 items-center">
                        <motion.div
                            initial={{ opacity: 0, x: -30 }}
                            whileInView={{ opacity: 1, x: 0 }}
                            transition={{ duration: 0.6 }}
                            viewport={{ once: true }}
                        >
                            <h2 className="text-4xl font-bold text-gray-800 mb-6">Our Story</h2>
                            <div className="space-y-4 text-gray-600 leading-relaxed">
                                <p>
                                    PawHaven began in 2019 when our founder, Sarah Johnson, rescued a severely injured stray dog 
                                    named Max. After witnessing the overwhelming number of animals in need and the lack of resources 
                                    available to help them, she knew something had to change.
                                </p>
                                <p>
                                    What started as a small rescue operation in Sarah's backyard has grown into a comprehensive 
                                    animal welfare organization. We've built partnerships with local shelters, veterinary clinics, 
                                    and volunteers who share our passion for animal welfare.
                                </p>
                                <p>
                                    Today, PawHaven operates across multiple states, providing not just adoption services, but also 
                                    educational programs, emergency medical care, and temporary fostering solutions. Every animal 
                                    that comes through our doors receives individualized care, medical attention, and lots of love 
                                    while they wait for their forever home.
                                </p>
                            </div>
                        </motion.div>

                        <motion.div
                            initial={{ opacity: 0, x: 30 }}
                            whileInView={{ opacity: 1, x: 0 }}
                            transition={{ duration: 0.6 }}
                            viewport={{ once: true }}
                            className="relative"
                        >
                            <div className="grid grid-cols-2 gap-4">
                                <div className="space-y-4">
                                    <div className="h-48 bg-gradient-to-br from-pink-200 to-purple-200 rounded-2xl shadow-lg flex items-center justify-center text-6xl">
                                        🐕
                                    </div>
                                    <div className="h-32 bg-gradient-to-br from-amber-200 to-orange-200 rounded-2xl shadow-lg flex items-center justify-center text-4xl">
                                        🐾
                                    </div>
                                </div>
                                <div className="space-y-4 pt-8">
                                    <div className="h-32 bg-gradient-to-br from-blue-200 to-cyan-200 rounded-2xl shadow-lg flex items-center justify-center text-4xl">
                                        🐱
                                    </div>
                                    <div className="h-48 bg-gradient-to-br from-green-200 to-emerald-200 rounded-2xl shadow-lg flex items-center justify-center text-6xl">
                                        ❤️
                                    </div>
                                </div>
                            </div>
                        </motion.div>
                    </div>
                </div>
            </section>

            {/* Values Section */}
            <section className="py-16 bg-white/50 backdrop-blur-sm">
                <div className="container mx-auto px-4">
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.6 }}
                        viewport={{ once: true }}
                        className="text-center mb-12"
                    >
                        <h2 className="text-4xl font-bold text-gray-800 mb-4">Our Core Values</h2>
                        <p className="text-lg text-gray-600">The principles that guide everything we do</p>
                    </motion.div>

                    <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
                        {values.map((value, index) => (
                            <motion.div
                                key={index}
                                initial={{ opacity: 0, y: 20 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                transition={{ duration: 0.5, delay: index * 0.1 }}
                                viewport={{ once: true }}
                                whileHover={{ scale: 1.05, y: -10 }}
                                className="bg-white/80 backdrop-blur-lg rounded-2xl p-6 shadow-xl border border-pink-100 text-center"
                            >
                                <div className={`w-14 h-14 bg-gradient-to-r ${value.color} rounded-full flex items-center justify-center shadow-lg mx-auto mb-4`}>
                                    <value.icon className="text-white text-xl" />
                                </div>
                                <h3 className="text-xl font-bold text-gray-800 mb-3">{value.title}</h3>
                                <p className="text-gray-600 leading-relaxed">{value.description}</p>
                            </motion.div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Team Section */}
            <section className="py-16">
                <div className="container mx-auto px-4">
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.6 }}
                        viewport={{ once: true }}
                        className="text-center mb-12"
                    >
                        <h2 className="text-4xl font-bold text-gray-800 mb-4">Meet Our Team</h2>
                        <p className="text-lg text-gray-600">The passionate people behind PawHaven's mission</p>
                    </motion.div>

                    <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
                        {teamMembers.map((member, index) => (
                            <motion.div
                                key={index}
                                initial={{ opacity: 0, scale: 0.9 }}
                                whileInView={{ opacity: 1, scale: 1 }}
                                transition={{ duration: 0.5, delay: index * 0.1 }}
                                viewport={{ once: true }}
                                whileHover={{ scale: 1.05, y: -10 }}
                                className="bg-white/80 backdrop-blur-lg rounded-2xl p-6 shadow-xl border border-pink-100 text-center"
                            >
                                <div className="relative mb-4">
                                    <img
                                        src={member.image}
                                        alt={member.name}
                                        className="w-24 h-24 rounded-full mx-auto object-cover shadow-lg ring-4 ring-pink-200"
                                    />
                                    <div className="absolute -bottom-2 -right-2 w-8 h-8 bg-gradient-to-r from-pink-400 to-purple-400 rounded-full flex items-center justify-center shadow-lg">
                                        <FaHeart className="text-white text-sm" />
                                    </div>
                                </div>
                                <h3 className="text-xl font-bold text-gray-800 mb-1">{member.name}</h3>
                                <p className="text-pink-600 font-semibold mb-2">{member.role}</p>
                                <p className="text-gray-600 text-sm mb-3 leading-relaxed">{member.bio}</p>
                                <div className="inline-block px-3 py-1 bg-gradient-to-r from-pink-100 to-purple-100 rounded-full">
                                    <span className="text-sm font-medium text-pink-700">{member.specialty}</span>
                                </div>
                            </motion.div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Call to Action */}
            <section className="py-16 bg-gradient-to-r from-purple-600 via-pink-600 to-amber-600">
                <div className="container mx-auto px-4 text-center">
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.6 }}
                        viewport={{ once: true }}
                        className="max-w-3xl mx-auto text-white"
                    >
                        <div className="text-6xl mb-6">🌟</div>
                        <h2 className="text-4xl font-bold mb-4">Join Our Mission</h2>
                        <p className="text-xl mb-8 leading-relaxed">
                            Whether you're looking to adopt, volunteer, or support our cause, there are many ways 
                            to help us create a world where every pet has a loving home.
                        </p>
                        <div className="flex flex-col sm:flex-row gap-4 justify-center">
                            <motion.a
                                href="/adopt"
                                whileHover={{ scale: 1.05 }}
                                whileTap={{ scale: 0.95 }}
                                className="bg-white text-purple-600 px-8 py-4 rounded-full font-bold text-lg shadow-xl hover:shadow-2xl transition-all duration-300"
                            >
                                🐾 Adopt a Pet
                            </motion.a>
                            <motion.a
                                href="/donate"
                                whileHover={{ scale: 1.05 }}
                                whileTap={{ scale: 0.95 }}
                                className="bg-white/20 backdrop-blur-lg text-white border-2 border-white px-8 py-4 rounded-full font-bold text-lg hover:bg-white/30 transition-all duration-300"
                            >
                                💖 Donate Now
                            </motion.a>
                        </div>
                    </motion.div>
                </div>
            </section>
        </div>
    );
};

export default AboutPage;