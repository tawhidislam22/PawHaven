import React from 'react';
import { motion } from 'framer-motion';
import { FaCreditCard, FaCalendar, FaUser, FaClock, FaCheck, FaHourglass, FaTimes } from 'react-icons/fa';

const Payment = () => {
    const paymentMethods = [
        {
            id: 1,
            type: 'Credit Card',
            last4: '4532',
            brand: 'Visa',
            expiry: '12/26',
            isDefault: true
        },
        {
            id: 2,
            type: 'PayPal',
            email: 'user@example.com',
            isDefault: false
        }
    ];

    const pendingPayments = [
        {
            id: 1,
            type: 'Adoption Fee',
            petName: 'Max',
            amount: 250,
            dueDate: '2024-02-20',
            status: 'Pending'
        },
        {
            id: 2,
            type: 'Pet Sitting',
            sitterName: 'Sarah Johnson',
            amount: 120,
            dueDate: '2024-02-18',
            status: 'Overdue'
        }
    ];

    const getStatusColor = (status) => {
        switch (status) {
            case 'Completed': return 'bg-green-100 text-green-800';
            case 'Pending': return 'bg-yellow-100 text-yellow-800';
            case 'Overdue': return 'bg-red-100 text-red-800';
            case 'Failed': return 'bg-red-100 text-red-800';
            default: return 'bg-gray-100 text-gray-800';
        }
    };

    const getStatusIcon = (status) => {
        switch (status) {
            case 'Completed': return <FaCheck className="text-green-500" />;
            case 'Pending': return <FaHourglass className="text-yellow-500" />;
            case 'Overdue': return <FaTimes className="text-red-500" />;
            case 'Failed': return <FaTimes className="text-red-500" />;
            default: return <FaClock className="text-gray-500" />;
        }
    };

    return (
        <div className="min-h-screen bg-gradient-to-br from-purple-50 via-pink-50 to-amber-50 p-6">
            <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
            >
                <div className="mb-8">
                    <h1 className="text-4xl font-bold bg-gradient-to-r from-purple-600 via-pink-600 to-amber-600 bg-clip-text text-transparent mb-2">
                        💳 Payment Center
                    </h1>
                    <p className="text-gray-600">Manage your payment methods and process payments</p>
                </div>

                {/* Quick Stats */}
                <div className="grid md:grid-cols-3 gap-6 mb-8">
                    <motion.div
                        initial={{ opacity: 0, scale: 0.9 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ duration: 0.5, delay: 0.1 }}
                        className="bg-gradient-to-r from-green-500 to-emerald-500 rounded-2xl p-6 shadow-xl text-white"
                    >
                        <div className="flex items-center justify-between">
                            <div>
                                <h3 className="text-lg opacity-90 mb-1">Available Balance</h3>
                                <p className="text-3xl font-bold">$125.50</p>
                            </div>
                            <FaCreditCard className="text-3xl opacity-75" />
                        </div>
                    </motion.div>

                    <motion.div
                        initial={{ opacity: 0, scale: 0.9 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ duration: 0.5, delay: 0.2 }}
                        className="bg-gradient-to-r from-yellow-500 to-amber-500 rounded-2xl p-6 shadow-xl text-white"
                    >
                        <div className="flex items-center justify-between">
                            <div>
                                <h3 className="text-lg opacity-90 mb-1">Pending Payments</h3>
                                <p className="text-3xl font-bold">{pendingPayments.length}</p>
                            </div>
                            <FaHourglass className="text-3xl opacity-75" />
                        </div>
                    </motion.div>

                    <motion.div
                        initial={{ opacity: 0, scale: 0.9 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ duration: 0.5, delay: 0.3 }}
                        className="bg-gradient-to-r from-purple-500 to-pink-500 rounded-2xl p-6 shadow-xl text-white"
                    >
                        <div className="flex items-center justify-between">
                            <div>
                                <h3 className="text-lg opacity-90 mb-1">Payment Methods</h3>
                                <p className="text-3xl font-bold">{paymentMethods.length}</p>
                            </div>
                            <FaUser className="text-3xl opacity-75" />
                        </div>
                    </motion.div>
                </div>

                <div className="grid lg:grid-cols-2 gap-8">
                    {/* Payment Methods */}
                    <motion.div
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.5, delay: 0.4 }}
                        className="bg-white/80 backdrop-blur-lg rounded-xl p-6 shadow-lg border border-pink-100"
                    >
                        <div className="flex items-center justify-between mb-6">
                            <h2 className="text-2xl font-bold text-gray-800">💳 Payment Methods</h2>
                            <button className="px-4 py-2 bg-gradient-to-r from-purple-500 to-pink-500 text-white rounded-lg hover:from-purple-600 hover:to-pink-600 transition-all duration-300">
                                Add New
                            </button>
                        </div>

                        <div className="space-y-4">
                            {paymentMethods.map((method, index) => (
                                <motion.div
                                    key={method.id}
                                    initial={{ opacity: 0, y: 10 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    transition={{ duration: 0.3, delay: index * 0.1 }}
                                    className="bg-gradient-to-r from-purple-50 to-pink-50 rounded-lg p-4 border border-purple-200"
                                >
                                    <div className="flex items-center justify-between">
                                        <div className="flex items-center">
                                            <div className="w-12 h-12 bg-gradient-to-r from-purple-400 to-pink-400 rounded-lg flex items-center justify-center mr-4">
                                                <FaCreditCard className="text-white" />
                                            </div>
                                            <div>
                                                <h3 className="font-bold text-gray-800">
                                                    {method.type}
                                                    {method.isDefault && (
                                                        <span className="ml-2 px-2 py-1 bg-green-100 text-green-800 text-xs rounded-full">
                                                            Default
                                                        </span>
                                                    )}
                                                </h3>
                                                <p className="text-sm text-gray-600">
                                                    {method.last4 ? `**** **** **** ${method.last4} • ${method.brand} • ${method.expiry}` : method.email}
                                                </p>
                                            </div>
                                        </div>
                                        <div className="flex space-x-2">
                                            <button className="px-3 py-1 text-blue-600 border border-blue-300 rounded hover:bg-blue-50 transition-colors duration-300 text-sm">
                                                Edit
                                            </button>
                                            <button className="px-3 py-1 text-red-600 border border-red-300 rounded hover:bg-red-50 transition-colors duration-300 text-sm">
                                                Remove
                                            </button>
                                        </div>
                                    </div>
                                </motion.div>
                            ))}
                        </div>
                    </motion.div>

                    {/* Pending Payments */}
                    <motion.div
                        initial={{ opacity: 0, x: 20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.5, delay: 0.5 }}
                        className="bg-white/80 backdrop-blur-lg rounded-xl p-6 shadow-lg border border-pink-100"
                    >
                        <h2 className="text-2xl font-bold text-gray-800 mb-6">⏳ Pending Payments</h2>

                        <div className="space-y-4">
                            {pendingPayments.map((payment, index) => (
                                <motion.div
                                    key={payment.id}
                                    initial={{ opacity: 0, y: 10 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    transition={{ duration: 0.3, delay: index * 0.1 }}
                                    className="bg-gradient-to-r from-amber-50 to-yellow-50 rounded-lg p-4 border border-amber-200"
                                >
                                    <div className="flex items-center justify-between mb-3">
                                        <div className="flex items-center">
                                            <div className="w-10 h-10 bg-gradient-to-r from-amber-400 to-yellow-400 rounded-full flex items-center justify-center mr-3">
                                                {getStatusIcon(payment.status)}
                                            </div>
                                            <div>
                                                <h3 className="font-bold text-gray-800">{payment.type}</h3>
                                                <p className="text-sm text-gray-600">
                                                    {payment.petName ? `Pet: ${payment.petName}` : `Sitter: ${payment.sitterName}`}
                                                </p>
                                            </div>
                                        </div>
                                        <span className={`inline-block px-3 py-1 rounded-full text-sm font-medium ${getStatusColor(payment.status)}`}>
                                            {payment.status}
                                        </span>
                                    </div>

                                    <div className="flex items-center justify-between">
                                        <div className="flex items-center text-gray-600">
                                            <FaCalendar className="mr-2 text-purple-500" />
                                            <span className="text-sm">Due: {new Date(payment.dueDate).toLocaleDateString()}</span>
                                        </div>
                                        <div className="flex items-center space-x-3">
                                            <span className="text-xl font-bold text-gray-800">${payment.amount}</span>
                                            <button className="px-4 py-2 bg-gradient-to-r from-green-500 to-emerald-500 text-white rounded-lg hover:from-green-600 hover:to-emerald-600 transition-all duration-300 text-sm">
                                                Pay Now
                                            </button>
                                        </div>
                                    </div>
                                </motion.div>
                            ))}
                        </div>

                        {pendingPayments.length === 0 && (
                            <div className="text-center py-8">
                                <div className="text-4xl mb-4">✅</div>
                                <h3 className="text-lg font-bold text-gray-800 mb-2">All Caught Up!</h3>
                                <p className="text-gray-600">You have no pending payments</p>
                            </div>
                        )}
                    </motion.div>
                </div>

                {/* Quick Actions */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, delay: 0.6 }}
                    className="mt-8 bg-gradient-to-r from-purple-100 to-pink-100 rounded-xl p-6 shadow-lg border-2 border-dashed border-purple-300"
                >
                    <div className="text-center">
                        <div className="w-16 h-16 bg-gradient-to-r from-purple-400 to-pink-400 rounded-full flex items-center justify-center mx-auto mb-4">
                            <FaCreditCard className="text-white text-2xl" />
                        </div>
                        <h3 className="text-xl font-bold text-gray-800 mb-2">Need Help with Payments?</h3>
                        <p className="text-gray-600 mb-4">Our support team is here to assist you with any payment-related questions</p>
                        <div className="flex flex-col sm:flex-row gap-3 justify-center">
                            <button className="px-6 py-3 bg-gradient-to-r from-blue-500 to-cyan-500 text-white rounded-lg hover:from-blue-600 hover:to-cyan-600 transition-all duration-300">
                                Contact Support
                            </button>
                            <button className="px-6 py-3 bg-gradient-to-r from-green-500 to-emerald-500 text-white rounded-lg hover:from-green-600 hover:to-emerald-600 transition-all duration-300">
                                View Payment History
                            </button>
                        </div>
                    </div>
                </motion.div>
            </motion.div>
        </div>
    );
};

export default Payment;