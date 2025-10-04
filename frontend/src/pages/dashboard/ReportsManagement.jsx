import { useState } from 'react';
import { FaChartLine, FaDownload, FaCalendarAlt, FaFilter, FaPaw, FaUsers, FaDollarSign, FaHeart } from 'react-icons/fa';

const ReportsManagement = () => {
  const [reportType, setReportType] = useState('adoption');
  const [dateRange, setDateRange] = useState('month');
  
  const reports = {
    adoption: {
      title: 'Adoption Reports',
      icon: <FaPaw className="text-pink-600" />,
      data: [
        { id: 1, type: 'Monthly Adoptions', location: 'All Shelters', status: 'Generated', date: '2024-01-15' },
        { id: 2, type: 'Breed Analysis', location: 'Happy Paws Shelter', status: 'Processing', date: '2024-01-14' },
        { id: 3, type: 'Success Rate Report', location: 'All Shelters', status: 'Generated', date: '2024-01-13' }
      ]
    },
    user: {
      title: 'User Reports',
      icon: <FaUsers className="text-blue-600" />,
      data: [
        { id: 1, type: 'User Registration', location: 'System Wide', status: 'Generated', date: '2024-01-15' },
        { id: 2, type: 'Activity Report', location: 'System Wide', status: 'Generated', date: '2024-01-14' },
        { id: 3, type: 'Demographics', location: 'System Wide', status: 'Processing', date: '2024-01-13' }
      ]
    },
    financial: {
      title: 'Financial Reports',
      icon: <FaDollarSign className="text-green-600" />,
      data: [
        { id: 1, type: 'Revenue Summary', location: 'All Sources', status: 'Generated', date: '2024-01-15' },
        { id: 2, type: 'Donation Analysis', location: 'All Sources', status: 'Generated', date: '2024-01-14' },
        { id: 3, type: 'Payment Trends', location: 'All Sources', status: 'Processing', date: '2024-01-13' }
      ]
    },
    feedback: {
      title: 'Feedback Reports',
      icon: <FaHeart className="text-purple-600" />,
      data: [
        { id: 1, type: 'User Satisfaction', location: 'All Users', status: 'Generated', date: '2024-01-15' },
        { id: 2, type: 'Service Quality', location: 'All Shelters', status: 'Processing', date: '2024-01-14' },
        { id: 3, type: 'Feedback Analysis', location: 'All Sources', status: 'Generated', date: '2024-01-13' }
      ]
    }
  };

  const currentReport = reports[reportType];
  
  const generateReport = (type, location) => {
    alert(`Generating ${type} report for ${location}...`);
  };

  const getStatusColor = (status) => {
    switch (status) {
      case 'Generated': return 'bg-green-100 text-green-800';
      case 'Processing': return 'bg-yellow-100 text-yellow-800';
      case 'Failed': return 'bg-red-100 text-red-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  return (
    <div className="p-6">
      {/* Header */}
      <div className="flex justify-between items-center mb-8">
        <div>
          <h1 className="text-3xl font-bold text-gray-800 flex items-center gap-3">
            <FaChartLine className="text-purple-600" />
            Reports & Analytics
          </h1>
          <p className="text-gray-600 mt-2">Generate and manage system reports</p>
        </div>
      </div>

      {/* Report Type Selector */}
      <div className="bg-white rounded-xl shadow-lg p-6 mb-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          {Object.entries(reports).map(([key, report]) => (
            <button
              key={key}
              onClick={() => setReportType(key)}
              className={`p-4 rounded-xl border-2 transition-all duration-300 flex items-center gap-3 ${
                reportType === key
                  ? 'border-purple-500 bg-purple-50 text-purple-700'
                  : 'border-gray-200 hover:border-purple-300 text-gray-600'
              }`}
            >
              {report.icon}
              <span className="font-semibold">{report.title}</span>
            </button>
          ))}
        </div>
      </div>

      {/* Quick Stats */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        <div className="bg-gradient-to-r from-purple-500 to-purple-600 text-white rounded-xl p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-purple-100">Total Reports</p>
              <p className="text-2xl font-bold">24</p>
            </div>
            <FaChartLine className="text-3xl text-purple-200" />
          </div>
        </div>
        
        <div className="bg-gradient-to-r from-green-500 to-green-600 text-white rounded-xl p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-green-100">Generated Today</p>
              <p className="text-2xl font-bold">8</p>
            </div>
            <FaDownload className="text-3xl text-green-200" />
          </div>
        </div>
        
        <div className="bg-gradient-to-r from-blue-500 to-blue-600 text-white rounded-xl p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-blue-100">Processing</p>
              <p className="text-2xl font-bold">3</p>
            </div>
            <FaCalendarAlt className="text-3xl text-blue-200" />
          </div>
        </div>
      </div>

      {/* Generate New Report */}
      <div className="bg-white rounded-xl shadow-lg p-6 mb-8">
        <h3 className="text-xl font-bold text-gray-800 mb-4">Generate New Report</h3>
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          <div className="relative">
            <FaFilter className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
            <select className="w-full pl-10 pr-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-purple-500 focus:border-transparent appearance-none">
              <option>All Locations</option>
              <option>Happy Paws Shelter</option>
              <option>Cat Haven Sanctuary</option>
              <option>Rescue Paradise</option>
            </select>
          </div>
          <div className="relative">
            <FaCalendarAlt className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
            <select 
              value={dateRange}
              onChange={(e) => setDateRange(e.target.value)}
              className="w-full pl-10 pr-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-purple-500 focus:border-transparent appearance-none"
            >
              <option value="week">Last Week</option>
              <option value="month">Last Month</option>
              <option value="quarter">Last Quarter</option>
              <option value="year">Last Year</option>
            </select>
          </div>
          <div className="relative">
            <select className="w-full p-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-purple-500 focus:border-transparent appearance-none">
              <option>PDF Format</option>
              <option>Excel Format</option>
              <option>CSV Format</option>
            </select>
          </div>
          <button 
            onClick={() => generateReport(currentReport.title, 'Selected Location')}
            className="bg-gradient-to-r from-purple-500 to-purple-600 text-white px-6 py-3 rounded-xl hover:shadow-lg transition-all duration-300"
          >
            Generate Report
          </button>
        </div>
      </div>

      {/* Reports List */}
      <div className="bg-white rounded-xl shadow-lg overflow-hidden">
        <div className="p-6 border-b border-gray-200">
          <h3 className="text-xl font-bold text-gray-800 flex items-center gap-3">
            {currentReport.icon}
            {currentReport.title}
          </h3>
        </div>
        
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-4 text-left text-sm font-semibold text-gray-600">Report Type</th>
                <th className="px-6 py-4 text-left text-sm font-semibold text-gray-600">Location</th>
                <th className="px-6 py-4 text-left text-sm font-semibold text-gray-600">Date</th>
                <th className="px-6 py-4 text-left text-sm font-semibold text-gray-600">Status</th>
                <th className="px-6 py-4 text-left text-sm font-semibold text-gray-600">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200">
              {currentReport.data.map((report) => (
                <tr key={report.id} className="hover:bg-gray-50 transition-colors">
                  <td className="px-6 py-4 font-semibold text-gray-800">{report.type}</td>
                  <td className="px-6 py-4 text-gray-600">{report.location}</td>
                  <td className="px-6 py-4 text-gray-600">{report.date}</td>
                  <td className="px-6 py-4">
                    <span className={`px-3 py-1 rounded-full text-sm font-semibold ${getStatusColor(report.status)}`}>
                      {report.status}
                    </span>
                  </td>
                  <td className="px-6 py-4">
                    <div className="flex space-x-2">
                      {report.status === 'Generated' && (
                        <button className="p-2 text-green-600 hover:bg-green-50 rounded-lg transition-colors">
                          <FaDownload />
                        </button>
                      )}
                      <button className="p-2 text-blue-600 hover:bg-blue-50 rounded-lg transition-colors">
                        View
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default ReportsManagement;