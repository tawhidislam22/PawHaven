import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { FaCreditCard, FaCalendar, FaSearch, FaFilter, FaDownload, FaCheck, FaTimes, FaHourglass } from 'react-icons/fa';

const PaymentHistory = () => {
    const [searchTerm, setSearchTerm] = useState('');
    const [filterStatus, setFilterStatus] = useState('All');
    const [filterType, setFilterType] = useState('All');

    const payments = [
        {
            id: 'TXN001',
            date: '2024-02-15',
            type: 'Adoption Fee',
            description: 'Adoption fee for Max (Golden Retriever)',
            amount: 250,
            status: 'Completed',
            method: 'Credit Card (*4532)',
            reference: 'ADO-2024-001'
        },
        {
            id: 'TXN002',
            date: '2024-02-10',
            type: 'Donation',
            description: 'Monthly donation to PawHaven',
            amount: 50,
            status: 'Completed',
            method: 'PayPal',
            reference: 'DON-2024-015'
        },
        {
            id: 'TXN003',
            date: '2024-02-08',
            type: 'Pet Sitting',
            description: 'Pet sitting service by Sarah Johnson',
            amount: 120,
            status: 'Completed',
            method: 'Credit Card (*4532)',
            reference: 'SIT-2024-023'
        },
        {
            id: 'TXN004',
            date: '2024-02-05',
            type: 'Veterinary',
            description: 'Emergency vet consultation for Luna',
            amount: 185,
            status: 'Pending',
            method: 'Credit Card (*4532)',
            reference: 'VET-2024-089'
        },
        {
            id: 'TXN005',
            date: '2024-01-28',
            type: 'Pet Supplies',
            description: 'Premium dog food and toys',
            amount: 75,
            status: 'Failed',
            method: 'Credit Card (*4532)',
            reference: 'SUP-2024-156'
        },
        {
            id: 'TXN006',
            date: '2024-01-25',
            type: 'Donation',
            description: 'One-time donation for shelter renovation',
            amount: 200,
            status: 'Completed',
            method: 'Bank Transfer',
            reference: 'DON-2024-008'
        }
    ];

    const getStatusColor = (status) => {
        switch (status) {
            case 'Completed': return 'bg-green-100 text-green-800';
            case 'Pending': return 'bg-yellow-100 text-yellow-800';
            case 'Failed': return 'bg-red-100 text-red-800';
            case 'Refunded': return 'bg-blue-100 text-blue-800';
            default: return 'bg-gray-100 text-gray-800';
        }
    };

    const getStatusIcon = (status) => {
        switch (status) {
            case 'Completed': return <FaCheck className="text-green-500" />;
            case 'Pending': return <FaHourglass className="text-yellow-500" />;
            case 'Failed': return <FaTimes className="text-red-500" />;
            case 'Refunded': return <FaCheck className="text-blue-500" />;
            default: return <FaHourglass className="text-gray-500" />;
        }
    };

    const getTypeIcon = (type) => {
        switch (type) {
            case 'Adoption Fee': return '🏠';
            case 'Donation': return '❤️';
            case 'Pet Sitting': return '👶';
            case 'Veterinary': return '🏥';
            case 'Pet Supplies': return '🛍️';
            default: return '💳';
        }
    };

    const filteredPayments = payments.filter(payment => {
        const matchesSearch = payment.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
                            payment.reference.toLowerCase().includes(searchTerm.toLowerCase());
        const matchesStatus = filterStatus === 'All' || payment.status === filterStatus;
        const matchesType = filterType === 'All' || payment.type === filterType;
        
        return matchesSearch && matchesStatus && matchesType;
    });

    const totalAmount = filteredPayments.reduce((sum, payment) => sum + payment.amount, 0);
    const completedPayments = filteredPayments.filter(p => p.status === 'Completed');
    const completedAmount = completedPayments.reduce((sum, payment) => sum + payment.amount, 0);

    return (
        <div className="min-h-screen bg-gradient-to-br from-purple-50 via-pink-50 to-amber-50 p-6">
            <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
            >
                <div className="mb-8">
                    <h1 className="text-4xl font-bold bg-gradient-to-r from-purple-600 via-pink-600 to-amber-600 bg-clip-text text-transparent mb-2">
                        📊 Payment History
                    </h1>
                    <p className="text-gray-600">Track all your transactions and payment activities</p>
                </div>

                {/* Summary Stats */}
                <div className="grid md:grid-cols-4 gap-6 mb-8">
                    <motion.div
                        initial={{ opacity: 0, scale: 0.9 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ duration: 0.5, delay: 0.1 }}
                        className="bg-gradient-to-r from-green-500 to-emerald-500 rounded-2xl p-6 shadow-xl text-white"
                    >
                        <div className="text-center">
                            <h3 className="text-lg opacity-90 mb-1">Total Completed</h3>
                            <p className="text-3xl font-bold">${completedAmount}</p>
                            <p className="text-sm opacity-75">{completedPayments.length} transactions</p>
                        </div>
                    </motion.div>

                    <motion.div
                        initial={{ opacity: 0, scale: 0.9 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ duration: 0.5, delay: 0.2 }}
                        className="bg-gradient-to-r from-blue-500 to-cyan-500 rounded-2xl p-6 shadow-xl text-white"
                    >
                        <div className="text-center">
                            <h3 className="text-lg opacity-90 mb-1">Total Filtered</h3>
                            <p className="text-3xl font-bold">${totalAmount}</p>
                            <p className="text-sm opacity-75">{filteredPayments.length} transactions</p>
                        </div>
                    </motion.div>

                    <motion.div
                        initial={{ opacity: 0, scale: 0.9 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ duration: 0.5, delay: 0.3 }}
                        className="bg-gradient-to-r from-yellow-500 to-amber-500 rounded-2xl p-6 shadow-xl text-white"
                    >
                        <div className="text-center">
                            <h3 className="text-lg opacity-90 mb-1">Pending</h3>
                            <p className="text-3xl font-bold">{filteredPayments.filter(p => p.status === 'Pending').length}</p>
                            <p className="text-sm opacity-75">transactions</p>
                        </div>
                    </motion.div>

                    <motion.div
                        initial={{ opacity: 0, scale: 0.9 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ duration: 0.5, delay: 0.4 }}
                        className="bg-gradient-to-r from-purple-500 to-pink-500 rounded-2xl p-6 shadow-xl text-white"
                    >
                        <div className="text-center">
                            <h3 className="text-lg opacity-90 mb-1">This Month</h3>
                            <p className="text-3xl font-bold">{filteredPayments.filter(p => new Date(p.date).getMonth() === new Date().getMonth()).length}</p>
                            <p className="text-sm opacity-75">transactions</p>
                        </div>
                    </motion.div>
                </div>

                {/* Search and Filters */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, delay: 0.5 }}
                    className="bg-white/80 backdrop-blur-lg rounded-xl p-6 shadow-lg border border-pink-100 mb-8"
                >
                    <div className="flex flex-col lg:flex-row gap-4 items-center justify-between">
                        <div className="relative flex-1 max-w-md">
                            <FaSearch className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                            <input
                                type="text"
                                placeholder="Search transactions..."
                                value={searchTerm}
                                onChange={(e) => setSearchTerm(e.target.value)}
                                className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                            />
                        </div>
                        
                        <div className="flex gap-4">
                            <div className="flex items-center gap-2">
                                <FaFilter className="text-gray-500" />
                                <select
                                    value={filterStatus}
                                    onChange={(e) => setFilterStatus(e.target.value)}
                                    className="px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                                >
                                    <option value="All">All Status</option>
                                    <option value="Completed">Completed</option>
                                    <option value="Pending">Pending</option>
                                    <option value="Failed">Failed</option>
                                    <option value="Refunded">Refunded</option>
                                </select>
                            </div>
                            
                            <select
                                value={filterType}
                                onChange={(e) => setFilterType(e.target.value)}
                                className="px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                            >
                                <option value="All">All Types</option>
                                <option value="Adoption Fee">Adoption Fee</option>
                                <option value="Donation">Donation</option>
                                <option value="Pet Sitting">Pet Sitting</option>
                                <option value="Veterinary">Veterinary</option>
                                <option value="Pet Supplies">Pet Supplies</option>
                            </select>
                            
                            <button className="px-4 py-2 bg-gradient-to-r from-purple-500 to-pink-500 text-white rounded-lg hover:from-purple-600 hover:to-pink-600 transition-all duration-300 flex items-center gap-2">
                                <FaDownload />
                                Export
                            </button>
                        </div>
                    </div>
                </motion.div>

                {/* Payment History Table */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, delay: 0.6 }}
                    className="bg-white/80 backdrop-blur-lg rounded-xl shadow-lg border border-pink-100 overflow-hidden"
                >
                    <div className="overflow-x-auto">
                        <table className="w-full">
                            <thead className="bg-gradient-to-r from-purple-100 to-pink-100">
                                <tr>
                                    <th className="px-6 py-4 text-left text-sm font-medium text-gray-700">Transaction</th>
                                    <th className="px-6 py-4 text-left text-sm font-medium text-gray-700">Date</th>
                                    <th className="px-6 py-4 text-left text-sm font-medium text-gray-700">Description</th>
                                    <th className="px-6 py-4 text-left text-sm font-medium text-gray-700">Amount</th>
                                    <th className="px-6 py-4 text-left text-sm font-medium text-gray-700">Status</th>
                                    <th className="px-6 py-4 text-left text-sm font-medium text-gray-700">Method</th>
                                    <th className="px-6 py-4 text-left text-sm font-medium text-gray-700">Actions</th>
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-gray-200">
                                {filteredPayments.map((payment, index) => (
                                    <motion.tr
                                        key={payment.id}
                                        initial={{ opacity: 0, x: -20 }}
                                        animate={{ opacity: 1, x: 0 }}
                                        transition={{ duration: 0.3, delay: index * 0.05 }}
                                        className="hover:bg-purple-50 transition-colors duration-200"
                                    >
                                        <td className="px-6 py-4">
                                            <div className="flex items-center">
                                                <div className="w-10 h-10 bg-gradient-to-r from-purple-100 to-pink-100 rounded-full flex items-center justify-center mr-3">
                                                    <span className="text-lg">{getTypeIcon(payment.type)}</span>
                                                </div>
                                                <div>
                                                    <div className="font-medium text-gray-800">{payment.type}</div>
                                                    <div className="text-sm text-gray-500">{payment.reference}</div>
                                                </div>
                                            </div>
                                        </td>
                                        <td className="px-6 py-4 text-sm text-gray-600">
                                            <div className="flex items-center">
                                                <FaCalendar className="mr-2 text-purple-500" />
                                                {new Date(payment.date).toLocaleDateString()}
                                            </div>
                                        </td>
                                        <td className="px-6 py-4 text-sm text-gray-800">
                                            {payment.description}
                                        </td>
                                        <td className="px-6 py-4">
                                            <span className="text-lg font-bold text-gray-800">${payment.amount}</span>
                                        </td>
                                        <td className="px-6 py-4">
                                            <div className="flex items-center">
                                                {getStatusIcon(payment.status)}
                                                <span className={`ml-2 inline-block px-3 py-1 rounded-full text-sm font-medium ${getStatusColor(payment.status)}`}>
                                                    {payment.status}
                                                </span>
                                            </div>
                                        </td>
                                        <td className="px-6 py-4 text-sm text-gray-600">
                                            <div className="flex items-center">
                                                <FaCreditCard className="mr-2 text-blue-500" />
                                                {payment.method}
                                            </div>
                                        </td>
                                        <td className="px-6 py-4">
                                            <div className="flex space-x-2">
                                                <button className="px-3 py-1 bg-blue-100 text-blue-800 rounded hover:bg-blue-200 transition-colors duration-300 text-sm">
                                                    View
                                                </button>
                                                {payment.status === 'Completed' && (
                                                    <button className="px-3 py-1 bg-green-100 text-green-800 rounded hover:bg-green-200 transition-colors duration-300 text-sm">
                                                        Receipt
                                                    </button>
                                                )}
                                                {payment.status === 'Failed' && (
                                                    <button className="px-3 py-1 bg-red-100 text-red-800 rounded hover:bg-red-200 transition-colors duration-300 text-sm">
                                                        Retry
                                                    </button>
                                                )}
                                            </div>
                                        </td>
                                    </motion.tr>
                                ))}
                            </tbody>
                        </table>
                    </div>

                    {filteredPayments.length === 0 && (
                        <div className="text-center py-16">
                            <div className="text-6xl mb-4">📋</div>
                            <h2 className="text-2xl font-bold text-gray-800 mb-2">No Transactions Found</h2>
                            <p className="text-gray-600 mb-6">Try adjusting your search criteria or filters</p>
                            <button 
                                onClick={() => {
                                    setSearchTerm('');
                                    setFilterStatus('All');
                                    setFilterType('All');
                                }}
                                className="px-6 py-3 bg-gradient-to-r from-purple-500 to-pink-500 text-white rounded-lg hover:from-purple-600 hover:to-pink-600 transition-all duration-300"
                            >
                                Clear Filters
                            </button>
                        </div>
                    )}
                </motion.div>
            </motion.div>
        </div>
    );
};

export default PaymentHistory;