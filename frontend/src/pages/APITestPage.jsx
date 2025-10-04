import React, { useState, useEffect } from 'react';
import { userAPI } from '../services/api';
import toast from 'react-hot-toast';

const APITestPage = () => {
  const [users, setUsers] = useState([]);
  const [testResults, setTestResults] = useState([]);
  const [loading, setLoading] = useState(false);

  const addTestResult = (operation, success, message, data = null) => {
    const result = {
      id: Date.now(),
      operation,
      success,
      message,
      data,
      timestamp: new Date().toLocaleTimeString()
    };
    setTestResults(prev => [result, ...prev]);
  };

  // Test 1: Register a new user (CREATE)
  const testCreateUser = async () => {
    setLoading(true);
    try {
      const testUser = {
        username: `testuser_${Date.now()}`,
        email: `test${Date.now()}@example.com`,
        password: 'password123',
        firstName: 'Test',
        lastName: 'User',
        phoneNumber: '1234567890',
        address: '123 Test Street',
        role: 'USER'
      };

      const response = await userAPI.register(testUser);
      
      if (response.data.success) {
        addTestResult('CREATE USER', true, 'User created successfully', response.data.user);
        toast.success('✅ CREATE: User registered successfully!');
        testGetAllUsers(); // Refresh user list
      }
    } catch (error) {
      addTestResult('CREATE USER', false, error.response?.data?.message || error.message);
      toast.error('❌ CREATE failed: ' + (error.response?.data?.message || error.message));
    } finally {
      setLoading(false);
    }
  };

  // Test 2: Get all users (READ)
  const testGetAllUsers = async () => {
    setLoading(true);
    try {
      const response = await userAPI.getAllUsers();
      
      if (response.data.success) {
        setUsers(response.data.users || []);
        addTestResult('GET ALL USERS', true, `Retrieved ${response.data.count} users`, response.data.users);
        toast.success(`✅ READ: Retrieved ${response.data.count} users`);
      }
    } catch (error) {
      addTestResult('GET ALL USERS', false, error.response?.data?.message || error.message);
      toast.error('❌ READ failed: ' + (error.response?.data?.message || error.message));
    } finally {
      setLoading(false);
    }
  };

  // Test 3: Get user by ID (READ)
  const testGetUserById = async (userId) => {
    setLoading(true);
    try {
      const response = await userAPI.getUserById(userId);
      
      if (response.data.success) {
        addTestResult('GET USER BY ID', true, `Retrieved user: ${response.data.user.username}`, response.data.user);
        toast.success(`✅ READ BY ID: Retrieved user ${response.data.user.username}`);
      }
    } catch (error) {
      addTestResult('GET USER BY ID', false, error.response?.data?.message || error.message);
      toast.error('❌ READ BY ID failed: ' + (error.response?.data?.message || error.message));
    } finally {
      setLoading(false);
    }
  };

  // Test 4: Search users (READ)
  const testSearchUsers = async () => {
    setLoading(true);
    try {
      const response = await userAPI.searchUsers('Test');
      
      if (response.data.success) {
        addTestResult('SEARCH USERS', true, `Found ${response.data.count} users matching "Test"`, response.data.users);
        toast.success(`✅ SEARCH: Found ${response.data.count} users`);
      }
    } catch (error) {
      addTestResult('SEARCH USERS', false, error.response?.data?.message || error.message);
      toast.error('❌ SEARCH failed: ' + (error.response?.data?.message || error.message));
    } finally {
      setLoading(false);
    }
  };

  // Test 5: Get users by role (READ)
  const testGetUsersByRole = async () => {
    setLoading(true);
    try {
      const response = await userAPI.getUsersByRole('USER');
      
      if (response.data.success) {
        addTestResult('GET USERS BY ROLE', true, `Found ${response.data.count} USER role users`, response.data.users);
        toast.success(`✅ FILTER BY ROLE: Found ${response.data.count} users`);
      }
    } catch (error) {
      addTestResult('GET USERS BY ROLE', false, error.response?.data?.message || error.message);
      toast.error('❌ FILTER BY ROLE failed: ' + (error.response?.data?.message || error.message));
    } finally {
      setLoading(false);
    }
  };

  // Test 6: Update user (UPDATE)
  const testUpdateUser = async (userId) => {
    setLoading(true);
    try {
      const updateData = {
        firstName: 'Updated',
        lastName: 'User',
        phoneNumber: '9876543210',
        address: '456 Updated Street'
      };

      const response = await userAPI.updateUser(userId, updateData);
      
      if (response.data.success) {
        addTestResult('UPDATE USER', true, `Updated user: ${response.data.user.username}`, response.data.user);
        toast.success(`✅ UPDATE: User ${response.data.user.username} updated successfully!`);
        testGetAllUsers(); // Refresh user list
      }
    } catch (error) {
      addTestResult('UPDATE USER', false, error.response?.data?.message || error.message);
      toast.error('❌ UPDATE failed: ' + (error.response?.data?.message || error.message));
    } finally {
      setLoading(false);
    }
  };

  // Test 7: Login user (AUTHENTICATION)
  const testLogin = async () => {
    setLoading(true);
    try {
      const loginData = {
        username: 'admin@pawhaven.com', // Use email as username
        password: 'password123'
      };

      const response = await userAPI.login(loginData);
      
      if (response.data.success) {
        addTestResult('LOGIN USER', true, `Logged in as: ${response.data.user.username}`, response.data.user);
        toast.success(`✅ LOGIN: Welcome ${response.data.user.firstName}!`);
      }
    } catch (error) {
      addTestResult('LOGIN USER', false, error.response?.data?.message || error.message);
      toast.error('❌ LOGIN failed: ' + (error.response?.data?.message || error.message));
    } finally {
      setLoading(false);
    }
  };

  // Test 8: Delete user (DELETE)
  const testDeleteUser = async (userId, username) => {
    if (window.confirm(`Are you sure you want to delete user "${username}"?`)) {
      setLoading(true);
      try {
        const response = await userAPI.deleteUser(userId);
        
        if (response.data.success) {
          addTestResult('DELETE USER', true, `Deleted user: ${username}`);
          toast.success(`✅ DELETE: User ${username} deleted successfully!`);
          testGetAllUsers(); // Refresh user list
        }
      } catch (error) {
        addTestResult('DELETE USER', false, error.response?.data?.message || error.message);
        toast.error('❌ DELETE failed: ' + (error.response?.data?.message || error.message));
      } finally {
        setLoading(false);
      }
    }
  };

  // Load users on component mount
  useEffect(() => {
    testGetAllUsers();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="bg-white rounded-lg shadow-sm p-6 mb-6">
          <h1 className="text-3xl font-bold text-gray-900 mb-4">
            🧪 PawHaven API Test Suite - User CRUD Operations
          </h1>
          <p className="text-gray-600 mb-6">
            Test all user management API endpoints: CREATE, READ, UPDATE, DELETE, and AUTHENTICATION
          </p>

          {/* Test Buttons */}
          <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-8 gap-4">
            <button
              onClick={testCreateUser}
              disabled={loading}
              className="bg-green-600 hover:bg-green-700 disabled:bg-gray-400 text-white px-4 py-2 rounded-lg text-sm font-medium transition-colors"
            >
              1. CREATE User
            </button>
            
            <button
              onClick={testGetAllUsers}
              disabled={loading}
              className="bg-blue-600 hover:bg-blue-700 disabled:bg-gray-400 text-white px-4 py-2 rounded-lg text-sm font-medium transition-colors"
            >
              2. GET All Users
            </button>
            
            <button
              onClick={() => users.length > 0 && testGetUserById(users[0].id)}
              disabled={loading || users.length === 0}
              className="bg-blue-500 hover:bg-blue-600 disabled:bg-gray-400 text-white px-4 py-2 rounded-lg text-sm font-medium transition-colors"
            >
              3. GET By ID
            </button>
            
            <button
              onClick={testSearchUsers}
              disabled={loading}
              className="bg-purple-600 hover:bg-purple-700 disabled:bg-gray-400 text-white px-4 py-2 rounded-lg text-sm font-medium transition-colors"
            >
              4. SEARCH Users
            </button>
            
            <button
              onClick={testGetUsersByRole}
              disabled={loading}
              className="bg-indigo-600 hover:bg-indigo-700 disabled:bg-gray-400 text-white px-4 py-2 rounded-lg text-sm font-medium transition-colors"
            >
              5. FILTER By Role
            </button>
            
            <button
              onClick={() => users.length > 0 && testUpdateUser(users[0].id)}
              disabled={loading || users.length === 0}
              className="bg-yellow-600 hover:bg-yellow-700 disabled:bg-gray-400 text-white px-4 py-2 rounded-lg text-sm font-medium transition-colors"
            >
              6. UPDATE User
            </button>
            
            <button
              onClick={testLogin}
              disabled={loading}
              className="bg-teal-600 hover:bg-teal-700 disabled:bg-gray-400 text-white px-4 py-2 rounded-lg text-sm font-medium transition-colors"
            >
              7. LOGIN User
            </button>
            
            <button
              onClick={() => users.length > 0 && testDeleteUser(users[users.length-1].id, users[users.length-1].username)}
              disabled={loading || users.length === 0}
              className="bg-red-600 hover:bg-red-700 disabled:bg-gray-400 text-white px-4 py-2 rounded-lg text-sm font-medium transition-colors"
            >
              8. DELETE User
            </button>
          </div>
        </div>

        {/* Current Users */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <div className="bg-white rounded-lg shadow-sm p-6">
            <h2 className="text-xl font-semibold text-gray-900 mb-4">
              Current Users ({users.length})
            </h2>
            
            {loading && (
              <div className="flex justify-center items-center h-32">
                <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600"></div>
              </div>
            )}
            
            <div className="space-y-3 max-h-96 overflow-y-auto">
              {users.map((user) => (
                <div key={user.id} className="border border-gray-200 rounded-lg p-4">
                  <div className="flex justify-between items-start">
                    <div>
                      <h3 className="font-medium text-gray-900">
                        {user.firstName} {user.lastName}
                      </h3>
                      <p className="text-sm text-gray-600">@{user.username}</p>
                      <p className="text-sm text-gray-600">{user.email}</p>
                      <span className={`inline-block px-2 py-1 text-xs rounded-full mt-2 ${
                        user.role === 'ADMIN' ? 'bg-red-100 text-red-800' :
                        user.role === 'MODERATOR' ? 'bg-yellow-100 text-yellow-800' :
                        'bg-green-100 text-green-800'
                      }`}>
                        {user.role}
                      </span>
                    </div>
                    <div className="text-right">
                      <p className="text-xs text-gray-500">ID: {user.id}</p>
                      <div className="mt-2 space-x-2">
                        <button
                          onClick={() => testGetUserById(user.id)}
                          className="text-xs bg-blue-100 text-blue-800 px-2 py-1 rounded"
                        >
                          GET
                        </button>
                        <button
                          onClick={() => testUpdateUser(user.id)}
                          className="text-xs bg-yellow-100 text-yellow-800 px-2 py-1 rounded"
                        >
                          UPDATE
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
              
              {users.length === 0 && !loading && (
                <p className="text-gray-500 text-center py-8">
                  No users found. Create a user to get started!
                </p>
              )}
            </div>
          </div>

          {/* Test Results */}
          <div className="bg-white rounded-lg shadow-sm p-6">
            <h2 className="text-xl font-semibold text-gray-900 mb-4">
              Test Results ({testResults.length})
            </h2>
            
            <div className="space-y-3 max-h-96 overflow-y-auto">
              {testResults.map((result) => (
                <div 
                  key={result.id} 
                  className={`border rounded-lg p-4 ${
                    result.success ? 'border-green-200 bg-green-50' : 'border-red-200 bg-red-50'
                  }`}
                >
                  <div className="flex justify-between items-start mb-2">
                    <span className={`font-medium text-sm ${
                      result.success ? 'text-green-800' : 'text-red-800'
                    }`}>
                      {result.success ? '✅' : '❌'} {result.operation}
                    </span>
                    <span className="text-xs text-gray-500">{result.timestamp}</span>
                  </div>
                  
                  <p className={`text-sm ${
                    result.success ? 'text-green-700' : 'text-red-700'
                  }`}>
                    {result.message}
                  </p>
                  
                  {result.data && (
                    <details className="mt-2">
                      <summary className="text-xs text-gray-600 cursor-pointer">
                        Show Data
                      </summary>
                      <pre className="text-xs bg-gray-100 p-2 rounded mt-1 overflow-x-auto">
                        {JSON.stringify(result.data, null, 2)}
                      </pre>
                    </details>
                  )}
                </div>
              ))}
              
              {testResults.length === 0 && (
                <p className="text-gray-500 text-center py-8">
                  No test results yet. Run some tests to see results here!
                </p>
              )}
            </div>
          </div>
        </div>

        {/* API Endpoints Documentation */}
        <div className="bg-white rounded-lg shadow-sm p-6 mt-6">
          <h2 className="text-xl font-semibold text-gray-900 mb-4">
            📚 Available API Endpoints
          </h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <h3 className="font-medium text-gray-900 mb-3">User Management:</h3>
              <ul className="space-y-2 text-sm">
                <li><code className="bg-green-100 text-green-800 px-2 py-1 rounded">POST /api/users/register</code> - Create user</li>
                <li><code className="bg-blue-100 text-blue-800 px-2 py-1 rounded">GET /api/users</code> - Get all users</li>
                <li><code className="bg-blue-100 text-blue-800 px-2 py-1 rounded">GET /api/users/&#123;id&#125;</code> - Get user by ID</li>
                <li><code className="bg-blue-100 text-blue-800 px-2 py-1 rounded">GET /api/users/username/&#123;username&#125;</code> - Get by username</li>
                <li><code className="bg-yellow-100 text-yellow-800 px-2 py-1 rounded">PUT /api/users/&#123;id&#125;</code> - Update user</li>
                <li><code className="bg-red-100 text-red-800 px-2 py-1 rounded">DELETE /api/users/&#123;id&#125;</code> - Delete user</li>
              </ul>
            </div>
            
            <div>
              <h3 className="font-medium text-gray-900 mb-3">Search & Filter:</h3>
              <ul className="space-y-2 text-sm">
                <li><code className="bg-purple-100 text-purple-800 px-2 py-1 rounded">GET /api/users/search?name=&#123;name&#125;</code> - Search users</li>
                <li><code className="bg-purple-100 text-purple-800 px-2 py-1 rounded">GET /api/users/role/&#123;role&#125;</code> - Filter by role</li>
                <li><code className="bg-teal-100 text-teal-800 px-2 py-1 rounded">POST /api/users/login</code> - User authentication</li>
              </ul>
              
              <h3 className="font-medium text-gray-900 mt-4 mb-3">Roles Available:</h3>
              <ul className="space-y-1 text-sm">
                <li><span className="bg-green-100 text-green-800 px-2 py-1 rounded">USER</span> - Regular user</li>
                <li><span className="bg-yellow-100 text-yellow-800 px-2 py-1 rounded">MODERATOR</span> - Content moderator</li>
                <li><span className="bg-red-100 text-red-800 px-2 py-1 rounded">ADMIN</span> - System administrator</li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default APITestPage;