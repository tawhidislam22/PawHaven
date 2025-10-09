import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { FaCreditCard, FaCalendar, FaCheck, FaHourglass, FaSpinner } from 'react-icons/fa';
import { paymentAPI } from '../../services/api';
import { useAuth } from '../../Providers/AuthProvider';
import toast from 'react-hot-toast';

const MyPayments = () => {
    const [payments, setPayments] = useState([]);
    const [loading, setLoading] = useState(true);
    const { user } = useAuth();
    const navigate = useNavigate();

    useEffect(() => {
        const fetchPayments = async () => {
            if (!user?.id) {
                setLoading(false);
                return;
            }

            try {
                setLoading(true);
                const response = await paymentAPI.getUserPayments(user.id);
                setPayments(response.data || []);
            } catch (error) {
                console.error('Error fetching payments:', error);
                toast.error('Failed to load payment history');
                setPayments([]);
            } finally {
                setLoading(false);
            }
        };

        fetchPayments();
    }, [user]);

    const getStatusColor = (status) => {
        const statusUpper = status?.toUpperCase();
        switch (statusUpper) {
            case 'COMPLETED':
            case 'SUCCESS':
                return 'bg-green-100 text-green-800';
            case 'PENDING':
                return 'bg-yellow-100 text-yellow-800';
            case 'FAILED':
            case 'REFUNDED':
                return 'bg-red-100 text-red-800';
            default:
                return 'bg-gray-100 text-gray-800';
        }
    };

    const getStatusIcon = (status) => {
        const statusUpper = status?.toUpperCase();
        switch (statusUpper) {
            case 'COMPLETED':
            case 'SUCCESS':
                return <FaCheck className="text-green-500" />;
            case 'PENDING':
                return <FaHourglass className="text-yellow-500" />;
            case 'FAILED':
            case 'REFUNDED':
                return <FaCreditCard className="text-red-500" />;
            default:
                return <FaCreditCard className="text-gray-500" />;
        }
    };

    const totalPaid = payments
        .filter(p => p.status?.toUpperCase() === 'COMPLETED' || p.status?.toUpperCase() === 'SUCCESS')
        .reduce((sum, p) => sum + (p.amount || 0), 0);

    if (loading) {
        return (
            <div className="min-h-screen bg-gradient-to-br from-purple-50 via-pink-50 to-amber-50 p-6 flex items-center justify-center">
                <div className="text-center">
                    <FaSpinner className="animate-spin text-4xl text-pink-600 mx-auto mb-4" />
                    <p className="text-gray-600">Loading payments...</p>
                </div>
            </div>
        );
    }

    if (!user) {
        return (
            <div className="min-h-screen bg-gradient-to-br from-purple-50 via-pink-50 to-amber-50 p-6 flex items-center justify-center">
                <div className="text-center">
                    <p className="text-gray-600">Please log in to view your payments.</p>
                </div>
            </div>
        );
    }

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
                                            {payment.purpose || payment.paymentType || payment.type || 'Payment'}
                                        </h3>
                                        <p className="text-sm text-gray-600 flex items-center">
                                            <FaCalendar className="mr-1" />
                                            {payment.date ? new Date(payment.date).toLocaleDateString('en-US', {
                                                year: 'numeric',
                                                month: 'long',
                                                day: 'numeric'
                                            }) : new Date().toLocaleDateString('en-US', {
                                                year: 'numeric',
                                                month: 'long',
                                                day: 'numeric'
                                            })}
                                        </p>
                                        <p className="text-xs text-gray-500">
                                            Transaction ID: {payment.tranId || payment.transactionId || `PAY-${payment.id}`}
                                        </p>
                                        {payment.paymentMethod && (
                                            <p className="text-xs text-gray-500 mt-1">
                                                <span className="font-medium">Method:</span> {payment.paymentMethod}
                                            </p>
                                        )}
                                        {payment.currency && (
                                            <p className="text-xs text-gray-500">
                                                <span className="font-medium">Currency:</span> {payment.currency}
                                            </p>
                                        )}
                                        {payment.notes && (
                                            <p className="text-xs text-gray-500 italic mt-1">
                                                "{payment.notes}"
                                            </p>
                                        )}
                                    </div>
                                </div>
                                <div className="text-right">
                                    <p className="text-2xl font-bold text-gray-800">
                                        ${payment.amount?.toFixed(2) || '0.00'}
                                    </p>
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
                        <button 
                            onClick={() => navigate('/donate')}
                            className="px-6 py-3 bg-gradient-to-r from-purple-500 to-pink-500 text-white rounded-lg hover:from-purple-600 hover:to-pink-600 transition-all duration-300 shadow-lg hover:shadow-xl"
                        >
                            Make a Donation
                        </button>
                    </motion.div>
                )}
            </motion.div>
        </div>
    );
};

export default MyPayments;