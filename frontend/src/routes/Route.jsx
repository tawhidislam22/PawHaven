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
import UserDebugPage from '../pages/UserDebugPage';
import ProductDetailPage from '../pages/ProductDetailPage';
import PetDetailPage from '../pages/PetDetailPage';
import AdoptionApplicationPage from '../pages/AdoptionApplicationPage';
import PrivateRoute from './PrivateRoute';
import ContactPage from '../pages/ContactPage';
import Register from '../pages/Register/Register';
import Login from '../pages/Login/Login';
import AboutPage from '../pages/AboutPage';

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

// Dashboard Pages - User
import MyAdoptions from '../pages/dashboard/MyAdoptions';
import MyPayments from '../pages/dashboard/MyPayments';
import MyNotifications from '../pages/dashboard/MyNotifications';
import MyBabysitting from '../pages/dashboard/MyBabysitting';
import Payment from '../pages/dashboard/Payment';
import PaymentHistory from '../pages/dashboard/PaymentHistory';

// Dashboard Pages - Admin
import AdminPayments from '../pages/dashboard/AdminPayments';
import AdminApplications from '../pages/dashboard/AdminApplications';


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
                path: '/adopt/:id/apply',
                element: <AdoptionApplicationPage />
            },
            {
                path:'/donate',
                element: <DonatePage />
            },
            {
                path: '/debug',
                element: <UserDebugPage />
            },
            {
                path: '/accessories',
                element: <AccessoriesPage />
            },
            {
                path: '/accessories/:id',
                element: <ProductDetailPage />
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
            },
            // Admin Panel Routes
            {
                path: 'admin-payments',
                element: <AdminPayments />
            },
            {
                path: 'admin-applications',
                element: <AdminApplications />
            }
        ]
    }
], {
    future: {
        v7_startTransition: true,
        v7_relativeSplatPath: true,
        v7_fetcherPersist: true,
        v7_normalizeFormMethod: true,
        v7_partialHydration: true,
        v7_skipActionErrorRevalidation: true,
    }
});

export default router;

