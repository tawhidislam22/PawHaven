import { createContext, useEffect, useState, useContext } from 'react';
import {
  GoogleAuthProvider,
  createUserWithEmailAndPassword,
  onAuthStateChanged,
  signInWithEmailAndPassword,
  signInWithPopup,
  signOut,
  updateProfile,
  sendPasswordResetEmail
} from 'firebase/auth';
import { auth } from '../firebase/firebase.config';

import useAxiosPublic from "../hooks/useAxiosPublic";

export const AuthContext = createContext(null);
const googleProvider = new GoogleAuthProvider();

const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const axiosPublic = useAxiosPublic();

  const createUser = (email, password) => {
    setLoading(true);
    return createUserWithEmailAndPassword(auth, email, password);
  };

  const signIn = (email, password) => {
    setLoading(true);
    return signInWithEmailAndPassword(auth, email, password);
  };

  const signInWithGoogle = () => {
    setLoading(true);
    return signInWithPopup(auth, googleProvider);
  };

  const updateUserProfile = (name, photo) => {
    return updateProfile(auth.currentUser, {
      displayName: name,
      photoURL: photo
    });
  };

  const resetPassword = async (email) => {
    setLoading(true);
    try {
      await sendPasswordResetEmail(auth, email);
      console.log('Password reset email sent successfully');
    } catch (error) {
      console.error('Password reset error:', error);
      throw error;
    } finally {
      setLoading(false);
    }
  };

  // Refresh user data from localStorage (useful after login/registration)
  const refreshUser = () => {
    const storedUser = localStorage.getItem('pawhaven_user');
    if (storedUser) {
      try {
        const backendUser = JSON.parse(storedUser);
        setUser(backendUser);
        console.log('User data refreshed:', backendUser);
      } catch (error) {
        console.error('Error parsing stored user:', error);
      }
    }
  };

  const logout = async () => {
    setLoading(true);
    try {
      // Clear backend user data from localStorage
      localStorage.removeItem('pawhaven_user');
      localStorage.removeItem('pawhaven_token');
      
      // Sign out from Firebase
      await signOut(auth);
      setUser(null);
      console.log('User logged out successfully');
    } catch (error) {
      console.error('Logout error:', error);
      throw error;
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    // Check for backend user in localStorage first
    const storedUser = localStorage.getItem('pawhaven_user');
    if (storedUser) {
      try {
        const backendUser = JSON.parse(storedUser);
        setUser(backendUser);
        setLoading(false);
      } catch (error) {
        console.error('Error parsing stored user:', error);
      }
    }

    const unsubscribe = onAuthStateChanged(auth, async (currentUser) => {
      // If there's no backend user stored, use Firebase user
      if (!storedUser && currentUser) {
        setUser(currentUser);
      } else if (!storedUser && !currentUser) {
        setUser(null);
      }
      
    //   if (currentUser) {
    //     try {
    //       // Send user email to get JWT token stored in cookie
    //       await axiosPublic.post('/jwt', {
    //         email: currentUser.email
    //       });
    //     } catch (error) {
    //       console.error('Token generation error:', error);
    //     }
    //   } else {
    //     // Clear token cookie when user logs out
    //     try {
    //       await axiosPublic.post('/logout');
    //     } catch (error) {
    //       console.error('Logout error:', error);
    //     }
    //   }

      setLoading(false);
    });

    return () => unsubscribe();
  }, [axiosPublic]);

  const authInfo = {
    user,
    loading,
    createUser,
    signIn,
    signInWithGoogle,
    updateUserProfile,
    resetPassword,
    logout,
    refreshUser,
    setUser
  };

  return (
    <AuthContext.Provider value={authInfo}>
      {children}
    </AuthContext.Provider>
  );
};

export default AuthProvider;

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};


