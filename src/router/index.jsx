// src/router/index.jsx
import { lazy, Suspense } from 'react';
import { createBrowserRouter } from 'react-router-dom';
import MainLayout from '../components/layout/Interface/MainLayout';
import DefaultLayout from '../components/layout/Dashboard/DefaultLayout';
import BlankLayout from '../components/layout/Dashboard/BlankLayout';
import Loader from '../components/Loader';

// Lazy load pages
const Home = lazy(() => import('../pages/Home'));
const Login = lazy(() => import('../pages/auth/Login'));
const Register = lazy(() => import('../pages/auth/Register'));
const RestaurantManagerDashboard = lazy(() => import('../pages/restaurantManager/Dashboard'));
const SuperAdminDashboard = lazy(() => import('../pages/superAdmin/RestaurantManagement/ManageRestaurants'));
const NotFound = lazy(() => import('../pages/404'));

const routes = [
  {
    path: '/',
    element: <MainLayout />,
    children: [
      { index: true, element: <Suspense fallback={<Loader />}><Home /></Suspense> },
      { path: 'login', element: <Suspense fallback={<Loader />}><Login /></Suspense> },
      { path: 'register', element: <Suspense fallback={<Loader />}><Register /></Suspense> },
      { path: '*', element: <Suspense fallback={<Loader />}><NotFound /></Suspense> },
    ],
  },
  {
    path: '/dashboard',
    element: <DefaultLayout />,
    children: [
      { 
        path: 'restaurant-manager', 
        element: <Suspense fallback={<Loader />}><RestaurantManagerDashboard /></Suspense> 
      },
      { 
        path: 'super-admin', 
        element: <Suspense fallback={<Loader />}><SuperAdminDashboard /></Suspense> 
      },
    ],
  },
  {
    path: '/auth',
    element: <BlankLayout />,
    children: [
      { path: 'forgot-password', element: <Suspense fallback={<Loader />}><ForgotPassword /></Suspense> },
      { path: 'reset-password', element: <Suspense fallback={<Loader />}><ResetPassword /></Suspense> },
    ],
  },
];

const router = createBrowserRouter(routes);

export default router;