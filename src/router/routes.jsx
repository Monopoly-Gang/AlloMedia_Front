import { lazy } from 'react';

const Home = lazy(() => import('../pages/Home'));
const Login = lazy(() => import('../pages/auth/Login'));
const Register = lazy(() => import('../pages/auth/Register'));
const VerifyOtp = lazy(() => import('../pages/auth/VerifyOtp'));
const RoleSelection = lazy(() => import('../pages/auth/RoleSelection'));
const ResetPassword = lazy(() => import('../pages/auth/ResetPassword'));
const ForgotPassword = lazy(() => import('../pages/auth/ForgotPassword'));
const VerifyEmail = lazy(() => import('../pages/auth/VerifyEmail'));
const NotFound = lazy(() => import('../pages/404'));
const SuperAdminDashboard = lazy(() => import('../pages/restaurantManager/Dashboard'));

export const routes = [
  { path: '/', element: <Home />, layout: 'default' },
  { path: '/auth/login', element: <Login />, layout: 'blank' },
  { path: '/auth/register', element: <Register />, layout: 'blank' },
  { path: '/auth/verify-otp', element: <VerifyOtp />, layout: 'blank' },
  { path: '/auth/role-selection', element: <RoleSelection />, layout: 'blank' },
  { path: '/auth/reset-password', element: <ResetPassword />, layout: 'blank' },
  { path: '/auth/forgot-password', element: <ForgotPassword />, layout: 'blank' },
  { path: '/auth/verify-email', element: <VerifyEmail />, layout: 'blank' },
  { path: '*', element: <NotFound />, layout: 'blank' },
  { path: '/restaurant-manager/dashboard', element: <SuperAdminDashboard />, layout: 'default' },
];