import React, { Suspense, useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { AppProvider } from './contexts/AppContext';
import { AuthProvider } from './context/AuthContext';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import HomePage from './pages/HomePage';
import AdoptPage from './pages/AdoptPage';
import PetDetailPage from './pages/PetDetailPage';
import DonatePage from './pages/DonatePage';
import AuthPage from './pages/AuthPage';
import ProfilePage from './pages/ProfilePage';
import ProtectedRoute from './components/ProtectedRoute';
import TestPage from './components/TestPage';
import SimpleHomePage from './components/SimpleHomePage';
import ToastProvider from './components/ToastProvider';
import { PageSkeleton } from './components/LoadingSkeletons';
import './App.css';

// Create a client for React Query
const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      refetchOnWindowFocus: false,
      retry: 1,
      staleTime: 5 * 60 * 1000, // 5 minutes
    },
  },
});

// Loading component with enhanced animation
const LoadingSpinner = () => (
  <div className="flex items-center justify-center min-h-screen bg-gradient-to-br from-pink-50 via-purple-50 to-cyan-50">
    <div className="text-center animate-fadeInUp">
      <div className="relative mb-6">
        <div className="spinner mx-auto"></div>
        <div className="absolute inset-0 flex items-center justify-center">
          <span className="text-2xl animate-bounce">🐾</span>
        </div>
      </div>
      <h2 className="text-2xl font-bold text-gradient-primary mb-2">Loading PawHaven</h2>
      <p className="text-lg text-gray-600">Fetching adorable pets...</p>
      <div className="mt-4 flex justify-center space-x-1">
        <div className="w-2 h-2 bg-pink-400 rounded-full animate-bounce"></div>
        <div className="w-2 h-2 bg-purple-400 rounded-full animate-bounce" style={{ animationDelay: '0.1s' }}></div>
        <div className="w-2 h-2 bg-cyan-400 rounded-full animate-bounce" style={{ animationDelay: '0.2s' }}></div>
      </div>
    </div>
  </div>
);

// Coming Soon component with enhanced styling
const ComingSoon = ({ title, description, icon }) => (
  <div className="min-h-screen bg-gradient-to-br from-pink-50 via-purple-50 to-cyan-50 flex items-center justify-center p-8">
    <div className="text-center max-w-md animate-fadeInUp">
      <div className="w-24 h-24 mx-auto mb-6 gradient-primary rounded-full flex items-center justify-center text-white text-4xl animate-float">
        {icon || '🚀'}
      </div>
      <h1 className="text-4xl font-bold text-gradient-primary mb-4">{title}</h1>
      <p className="text-gray-600 mb-8">{description || 'We\'re working hard to bring you this amazing feature. Stay tuned!'}</p>
      <div className="bg-white/60 glass-effect rounded-lg p-6 mb-6">
        <p className="text-sm text-gray-500">Expected Launch: Coming Soon</p>
      </div>
      <button className="btn btn-primary gradient-primary text-white border-0 hover:scale-105 transition-transform duration-200">
        Notify Me When Ready
      </button>
    </div>
  </div>
);

// Enhanced 404 Page
const NotFound = () => (
  <div className="min-h-screen bg-gradient-to-br from-pink-50 via-purple-50 to-cyan-50 flex items-center justify-center p-8">
    <div className="text-center max-w-md animate-fadeInUp">
      <div className="text-9xl mb-4 animate-float">🐾</div>
      <h1 className="text-6xl font-bold text-gradient-primary mb-4">404</h1>
      <h2 className="text-2xl font-semibold text-gray-800 mb-4">Oops! Page Not Found</h2>
      <p className="text-gray-600 mb-8">Looks like this page went on a walk and didn't come back!</p>
      <button 
        onClick={() => window.history.back()} 
        className="btn btn-primary gradient-primary text-white border-0 hover:scale-105 transition-transform duration-200"
      >
        Go Back Home
      </button>
    </div>
  </div>
);

// Route transition wrapper
const RouteWrapper = ({ children }) => {
  const location = useLocation();
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    setIsLoading(true);
    const timer = setTimeout(() => setIsLoading(false), 300);
    return () => clearTimeout(timer);
  }, [location.pathname]);

  if (isLoading) {
    return (
      <div className="animate-fadeInScale">
        <div className="opacity-0 animate-fadeInUp delay-100">
          {children}
        </div>
      </div>
    );
  }

  return <div className="animate-fadeInUp">{children}</div>;
};

function App() {
  const [isAppLoaded, setIsAppLoaded] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => setIsAppLoaded(true), 1000);
    return () => clearTimeout(timer);
  }, []);

  if (!isAppLoaded) {
    return <LoadingSpinner />;
  }

  return (
    <QueryClientProvider client={queryClient}>
      <AuthProvider>
        <AppProvider>
          <Router>
          <div className="App min-h-screen flex flex-col bg-gradient-to-br from-gray-50 to-gray-100">
            <Navbar />
            <main className="flex-grow relative overflow-hidden">
              <Suspense fallback={<PageSkeleton />}>
                <Routes>
                            <Route path="/" element={
                <RouteWrapper>
                  <HomePage />
                </RouteWrapper>
              } />
              <Route path="/adopt" element={<RouteWrapper><AdoptPage /></RouteWrapper>} />
              <Route path="/pet/:id" element={<RouteWrapper><PetDetailPage /></RouteWrapper>} />
              <Route path="/donate" element={<RouteWrapper><DonatePage /></RouteWrapper>} />
              <Route path="/about" element={
                <RouteWrapper>
                  <ComingSoon 
                    title="About Us" 
                    description="Learn more about our mission to connect pets with loving families."
                    icon="ℹ️"
                  />
                </RouteWrapper>
              } />
              <Route path="/contact" element={
                <RouteWrapper>
                  <ComingSoon 
                    title="Contact Us" 
                    description="Get in touch with our team for any questions or support."
                    icon="📞"
                  />
                </RouteWrapper>
              } />
              <Route path="/auth" element={
                <RouteWrapper>
                  <AuthPage />
                </RouteWrapper>
              } />
              <Route path="/login" element={
                <RouteWrapper>
                  <AuthPage />
                </RouteWrapper>
              } />
              <Route path="/signup" element={
                <RouteWrapper>
                  <AuthPage />
                </RouteWrapper>
              } />
              <Route path="/watchlist" element={
                <RouteWrapper>
                  <ComingSoon 
                    title="My Watchlist" 
                    description="Keep track of your favorite pets and get notified about updates."
                    icon="❤️"
                  />
                </RouteWrapper>
              } />
              <Route path="/profile" element={
                <RouteWrapper>
                  <ProfilePage />
                </RouteWrapper>
              } />
              <Route path="/applications" element={
                <RouteWrapper>
                  <ComingSoon 
                    title="My Applications" 
                    description="Track the status of your adoption applications."
                    icon="📋"
                  />
                </RouteWrapper>
              } />
              <Route path="*" element={<RouteWrapper><NotFound /></RouteWrapper>} />
            </Routes>
          </Suspense>
        </main>
        <Footer />
        <ToastProvider />
      </div>
    </Router>
        </AppProvider>
      </AuthProvider>
    </QueryClientProvider>
  );
}

export default App;
