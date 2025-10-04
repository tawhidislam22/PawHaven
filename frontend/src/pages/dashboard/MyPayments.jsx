import React from 'react';
import { motion } from 'framer-motion';
import { FaCreditCard, FaCalendar, FaCheck, FaHourglass } from 'react-icons/fa';

const MyPayments = () => {
    const payments = [
        {
            id: 1,
            type: 'Adoption Fee',
            petName: 'Max',
            amount: 150,
            date: '2024-01-15',
            status: 'Completed',
            transactionId: 'TXN-001'
        },
        {
            id: 2,
            type: 'Donation',
            amount: 50,
            date: '2024-02-01',
            status: 'Completed',
            transactionId: 'TXN-002'
        },
        {
            id: 3,
            type: 'Pet Supplies',
            amount: 75,
            date: '2024-02-15',
            status: 'Pending',
            transactionId: 'TXN-003'
        }
    ];

    const getStatusColor = (status) => {
        switch (status) {
            case 'Completed': return 'bg-green-100 text-green-800';
            case 'Pending': return 'bg-yellow-100 text-yellow-800';
            case 'Failed': return 'bg-red-100 text-red-800';
            default: return 'bg-gray-100 text-gray-800';
        }
    };

    const getStatusIcon = (status) => {
        switch (status) {
            case 'Completed': return <FaCheck className="text-green-500" />;
            case 'Pending': return <FaHourglass className="text-yellow-500" />;
            default: return <FaCreditCard className="text-gray-500" />;
        }
    };

    const totalPaid = payments.filter(p => p.status === 'Completed').reduce((sum, p) => sum + p.amount, 0);

    return (
        <div className="min-h-screen bg-gradient-to-br from-purple-50 via-pink-50 to-amber-50 p-6">
            <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
            >
                <div className="mb-8">
                    <h1 className="text-4xl font-bold bg-gradient-to-r from-purple-600 via-pink-600 to-amber-600 bg-clip-text text-transparent mb-2">
                        💳 My Payments
                    </h1>
                    <p className="text-gray-600">Track your payments and contributions</p>
                </div>

                {/* Summary Card */}
                <motion.div
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 0.5, delay: 0.1 }}
                    className="bg-gradient-to-r from-purple-500 to-pink-500 rounded-2xl p-6 shadow-xl text-white mb-8"
                >
                    <div className="flex items-center justify-between">
                        <div>
                            <h2 className="text-lg opacity-90 mb-1">Total Contributions</h2>
                            <p className="text-3xl font-bold">${totalPaid}</p>
                        </div>
                        <div className="w-16 h-16 bg-white/20 rounded-full flex items-center justify-center">
                            <FaCreditCard className="text-2xl" />
                        </div>
                    </div>
                </motion.div>

                {/* Payments List */}
                <div className="space-y-4">
                    {payments.map((payment, index) => (
                        <motion.div
                            key={payment.id}
                            initial={{ opacity: 0, x: -20 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ duration: 0.5, delay: index * 0.1 }}
                            whileHover={{ scale: 1.02, y: -2 }}
                            className="bg-white/80 backdrop-blur-lg rounded-xl p-6 shadow-lg border border-pink-100"
                        >
                            <div className="flex items-center justify-between">
                                <div className="flex items-center space-x-4">
                                    <div className="w-12 h-12 bg-gradient-to-r from-purple-100 to-pink-100 rounded-full flex items-center justify-center">
                                        {getStatusIcon(payment.status)}
                                    </div>
                                    <div>
                                        <h3 className="font-bold text-gray-800">
                                            {payment.type}
                                            {payment.petName && <span className="text-pink-600"> - {payment.petName}</span>}
                                        </h3>
                                        <p className="text-sm text-gray-600 flex items-center">
                                            <FaCalendar className="mr-1" />
                                            {new Date(payment.date).toLocaleDateString()}
                                        </p>
                                        <p className="text-xs text-gray-500">ID: {payment.transactionId}</p>
                                    </div>
                                </div>
                                <div className="text-right">
                                    <p className="text-2xl font-bold text-gray-800">${payment.amount}</p>
                                    <span className={`inline-block px-3 py-1 rounded-full text-sm font-medium ${getStatusColor(payment.status)}`}>
                                        {payment.status}
                                    </span>
                                </div>
                            </div>
                        </motion.div>
                    ))}
                </div>

                {payments.length === 0 && (
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        className="text-center py-16"
                    >
                        <div className="text-6xl mb-4">💳</div>
                        <h2 className="text-2xl font-bold text-gray-800 mb-2">No Payments Yet</h2>
                        <p className="text-gray-600 mb-6">Your payment history will appear here</p>
                        <button className="px-6 py-3 bg-gradient-to-r from-purple-500 to-pink-500 text-white rounded-lg hover:from-purple-600 hover:to-pink-600 transition-all duration-300">
                            Make a Donation
                        </button>
                    </motion.div>
                )}
            </motion.div>
        </div>
    );
};

export default MyPayments;