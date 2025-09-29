import { createBrowserRouter } from 'react-router-dom';
import MainLayout from '../layouts/MainLayout';
import ErrorPage from '../pages/ErrorPage';
import HomePage from '../pages/Home/HomePage';
import Dashboard from '../layouts/Dashboard';
import DashboardHome from '../pages/DashboardHome';
import AdoptPage from '../pages/AdoptPage';
import DonatePage from '../pages/DonatePage';
import ProfilePage from '../pages/ProfilePage';
import AccessoriesPage from '../pages/AccessoriesPage';
import ProductDetailPage from '../pages/ProductDetailPage';
import PrivateRoute from './PrivateRoute';

import Register from '../pages/Register/Register';
import Login from '../pages/Login/Login';

// Dashboard Pages
import PetManagement from '../pages/dashboard/PetManagement';
import UserManagement from '../pages/dashboard/UserManagement';
import AdoptionApplications from '../pages/dashboard/AdoptionApplications';
import ShelterManagement from '../pages/dashboard/ShelterManagement';
import PaymentManagement from '../pages/dashboard/PaymentManagement';
import NotificationManagement from '../pages/dashboard/NotificationManagement';
import BabysittingManagement from '../pages/dashboard/BabysittingManagement';
import FeedbackManagement from '../pages/dashboard/FeedbackManagement';
import ReportsManagement from '../pages/dashboard/ReportsManagement';


const router = createBrowserRouter([
    {
        path: '/',
        element: <MainLayout />,
        errorElement: <ErrorPage />,
        children: [
            {
                path: '/',
                element: <HomePage />
            },
            {
                path: 'login',
                element: <Login />
            },
            {
                path: 'register',
                element: <Register />
            },
            {
                path:'/adopt',
                element: <AdoptPage />
            },
            {
                path:'/donate',
                element: <DonatePage />
            },
            {
                path: '/accessories',
                element: <AccessoriesPage />
            },
            {
                path: '/accessories/:id',
                element: <ProductDetailPage />
            }
        ]
    },
    {
        path: '/dashboard',
        element: <Dashboard />, // <PrivateRoute><Dashboard /></PrivateRoute>
        children: [
            {
                path: '',
                element: <DashboardHome />
            },
            {
                path: 'profile',
                element: <ProfilePage />
            },
            // Entity Management Routes
            {
                path: 'pets',
                element: <PetManagement />
            },
            {
                path: 'users',
                element: <UserManagement />
            },
            {
                path: 'adoptions',
                element: <AdoptionApplications />
            },
            {
                path: 'shelters',
                element: <ShelterManagement />
            },
            {
                path: 'payments',
                element: <PaymentManagement />
            },
            {
                path: 'notifications',
                element: <NotificationManagement />
            },
            {
                path: 'babysitting',
                element: <BabysittingManagement />
            },
            {
                path: 'feedback',
                element: <FeedbackManagement />
            },
            {
                path: 'reports',
                element: <ReportsManagement />
            }
        ]
    }
]);

export default router;

