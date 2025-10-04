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
<<<<<<< HEAD
import PetDetailPage from '../pages/PetDetailPage';
import AdoptionApplicationPage from '../pages/AdoptionApplicationPage';
import PrivateRoute from './PrivateRoute';
import ContactPage from '../pages/ContactPage';
import Register from '../pages/Register/Register';
import Login from '../pages/Login/Login';
import AboutPage from '../pages/AboutPage';
// Dashboard Pages - Admin
=======
import PrivateRoute from './PrivateRoute';

import Register from '../pages/Register/Register';
import Login from '../pages/Login/Login';

// Dashboard Pages
>>>>>>> c295e9782fa9018f294df1c9d8162d82614294c4
import PetManagement from '../pages/dashboard/PetManagement';
import UserManagement from '../pages/dashboard/UserManagement';
import AdoptionApplications from '../pages/dashboard/AdoptionApplications';
import ShelterManagement from '../pages/dashboard/ShelterManagement';
import PaymentManagement from '../pages/dashboard/PaymentManagement';
import NotificationManagement from '../pages/dashboard/NotificationManagement';
import BabysittingManagement from '../pages/dashboard/BabysittingManagement';
import FeedbackManagement from '../pages/dashboard/FeedbackManagement';
import ReportsManagement from '../pages/dashboard/ReportsManagement';

<<<<<<< HEAD
// Dashboard Pages - User
import MyAdoptions from '../pages/dashboard/MyAdoptions';
import MyPayments from '../pages/dashboard/MyPayments';
import MyNotifications from '../pages/dashboard/MyNotifications';
import MyBabysitting from '../pages/dashboard/MyBabysitting';
import Payment from '../pages/dashboard/Payment';
import PaymentHistory from '../pages/dashboard/PaymentHistory';

=======
>>>>>>> c295e9782fa9018f294df1c9d8162d82614294c4

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
<<<<<<< HEAD
                path: '/adopt/:id/apply',
                element: <AdoptionApplicationPage />
            },
            {
=======
>>>>>>> c295e9782fa9018f294df1c9d8162d82614294c4
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
<<<<<<< HEAD
            },
            {
                path: '/pet/:id',
                element: <PetDetailPage />
            },
            {
                path: '/about',
                element: <AboutPage />
            },
            {
                path: '/contact',
                element: <ContactPage />
=======
>>>>>>> c295e9782fa9018f294df1c9d8162d82614294c4
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
<<<<<<< HEAD
            // User Dashboard Routes
            {
                path: 'my-adoptions',
                element: <MyAdoptions />
            },
            {
                path: 'my-payments',
                element: <MyPayments />
            },
            {
                path: 'my-notifications',
                element: <MyNotifications />
            },
            {
                path: 'my-babysitting',
                element: <MyBabysitting />
            },
            {
                path: 'payment',
                element: <Payment />
            },
            {
                path: 'payment-history',
                element: <PaymentHistory />
            },
            // Admin Entity Management Routes
=======
            // Entity Management Routes
>>>>>>> c295e9782fa9018f294df1c9d8162d82614294c4
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

