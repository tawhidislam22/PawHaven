import React, { useState, useEffect } from 'react';
import { useAuth } from '../Providers/AuthProvider';

const UserDebugPage = () => {
    const { user } = useAuth();
    const [localStorageUser, setLocalStorageUser] = useState(null);

    useEffect(() => {
        const storedUser = localStorage.getItem('pawhaven_user');
        if (storedUser) {
            try {
                setLocalStorageUser(JSON.parse(storedUser));
            } catch (error) {
                console.error('Error parsing user:', error);
            }
        }
    }, []);

    return (
        <div className="min-h-screen bg-gray-100 py-12 px-4">
            <div className="max-w-4xl mx-auto">
                <h1 className="text-3xl font-bold mb-8 text-gray-900">User Data Debug Page 🔍</h1>

                {/* AuthContext User */}
                <div className="bg-white rounded-lg shadow-md p-6 mb-6">
                    <h2 className="text-xl font-semibold mb-4 text-blue-600">
                        User from AuthContext (useAuth)
                    </h2>
                    {user ? (
                        <div className="space-y-2">
                            <div className="grid grid-cols-2 gap-4">
                                <div>
                                    <span className="font-medium">ID:</span>
                                    <span className={`ml-2 ${typeof user.id === 'number' ? 'text-green-600' : 'text-red-600'}`}>
                                        {user.id} ({typeof user.id})
                                        {typeof user.id === 'number' ? ' ✅' : ' ❌ Should be number!'}
                                    </span>
                                </div>
                                <div>
                                    <span className="font-medium">Name:</span>
                                    <span className="ml-2">{user.name || user.displayName || 'N/A'}</span>
                                </div>
                                <div>
                                    <span className="font-medium">Email:</span>
                                    <span className="ml-2">{user.email}</span>
                                </div>
                                <div>
                                    <span className="font-medium">Role:</span>
                                    <span className="ml-2">{user.role || 'N/A'}</span>
                                </div>
                            </div>
                            <div className="mt-4">
                                <span className="font-medium">Full Object:</span>
                                <pre className="mt-2 p-4 bg-gray-50 rounded border overflow-x-auto text-xs">
                                    {JSON.stringify(user, null, 2)}
                                </pre>
                            </div>
                        </div>
                    ) : (
                        <p className="text-red-600">❌ No user in AuthContext</p>
                    )}
                </div>

                {/* localStorage User */}
                <div className="bg-white rounded-lg shadow-md p-6 mb-6">
                    <h2 className="text-xl font-semibold mb-4 text-purple-600">
                        User from localStorage
                    </h2>
                    {localStorageUser ? (
                        <div className="space-y-2">
                            <div className="grid grid-cols-2 gap-4">
                                <div>
                                    <span className="font-medium">ID:</span>
                                    <span className={`ml-2 ${typeof localStorageUser.id === 'number' ? 'text-green-600' : 'text-red-600'}`}>
                                        {localStorageUser.id} ({typeof localStorageUser.id})
                                        {typeof localStorageUser.id === 'number' ? ' ✅' : ' ❌ Should be number!'}
                                    </span>
                                </div>
                                <div>
                                    <span className="font-medium">Name:</span>
                                    <span className="ml-2">{localStorageUser.name || 'N/A'}</span>
                                </div>
                                <div>
                                    <span className="font-medium">Email:</span>
                                    <span className="ml-2">{localStorageUser.email}</span>
                                </div>
                                <div>
                                    <span className="font-medium">Role:</span>
                                    <span className="ml-2">{localStorageUser.role || 'N/A'}</span>
                                </div>
                            </div>
                            <div className="mt-4">
                                <span className="font-medium">Full Object:</span>
                                <pre className="mt-2 p-4 bg-gray-50 rounded border overflow-x-auto text-xs">
                                    {JSON.stringify(localStorageUser, null, 2)}
                                </pre>
                            </div>
                        </div>
                    ) : (
                        <p className="text-red-600">❌ No user in localStorage</p>
                    )}
                </div>

                {/* Validation Status */}
                <div className="bg-white rounded-lg shadow-md p-6">
                    <h2 className="text-xl font-semibold mb-4 text-green-600">
                        Validation Status
                    </h2>
                    <div className="space-y-3">
                        <div className="flex items-center">
                            <span className={`text-2xl mr-3 ${user ? '✅' : '❌'}`}>
                                {user ? '✅' : '❌'}
                            </span>
                            <span>User exists in AuthContext</span>
                        </div>
                        <div className="flex items-center">
                            <span className={`text-2xl mr-3 ${localStorageUser ? '✅' : '❌'}`}>
                                {localStorageUser ? '✅' : '❌'}
                            </span>
                            <span>User exists in localStorage</span>
                        </div>
                        <div className="flex items-center">
                            <span className={`text-2xl mr-3 ${(user?.id && typeof user.id === 'number') || (localStorageUser?.id && typeof localStorageUser.id === 'number') ? '✅' : '❌'}`}>
                                {(user?.id && typeof user.id === 'number') || (localStorageUser?.id && typeof localStorageUser.id === 'number') ? '✅' : '❌'}
                            </span>
                            <span>User has numeric ID (required for donations/adoptions)</span>
                        </div>
                        <div className="flex items-center">
                            <span className={`text-2xl mr-3 ${user?.email || localStorageUser?.email ? '✅' : '❌'}`}>
                                {user?.email || localStorageUser?.email ? '✅' : '❌'}
                            </span>
                            <span>User has email</span>
                        </div>
                    </div>
                </div>

                {/* Instructions */}
                <div className="bg-blue-50 border border-blue-200 rounded-lg p-6 mt-6">
                    <h3 className="text-lg font-semibold text-blue-800 mb-3">
                        🔧 Troubleshooting
                    </h3>
                    <div className="space-y-2 text-sm text-blue-900">
                        <p><strong>If you see ❌ "Should be number!":</strong></p>
                        <ol className="list-decimal ml-6 space-y-1">
                            <li>You're logged in with Firebase/Google (string UID)</li>
                            <li>Please logout and login with your PawHaven email/password</li>
                            <li>This will give you a numeric database ID</li>
                        </ol>
                        
                        <p className="mt-4"><strong>If localStorage is empty but AuthContext has user:</strong></p>
                        <ol className="list-decimal ml-6 space-y-1">
                            <li>Logout and login again</li>
                            <li>This will sync both sources</li>
                        </ol>

                        <p className="mt-4"><strong>To test donations after fixing:</strong></p>
                        <ol className="list-decimal ml-6 space-y-1">
                            <li>Make sure you see ✅ for all checks above</li>
                            <li>Go to /donate page</li>
                            <li>Enter amount and submit</li>
                            <li>Should work without errors!</li>
                        </ol>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default UserDebugPage;
