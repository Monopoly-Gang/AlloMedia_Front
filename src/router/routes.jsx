import { lazy } from 'react';

const Home = lazy(() => import('../pages/Home'));
const Login = lazy(() => import('../pages/auth/Login'));
const Register = lazy(() => import('../pages/auth/Register'));
const VerifyOtp = lazy(() => import('../pages/auth/VerifyOtp'));
const ResetPassword = lazy(() => import('../pages/auth/ResetPassword'));
const ForgotPassword = lazy(() => import('../pages/auth/ForgotPassword'));
const VerifyEmail = lazy(() => import('../pages/auth/VerifyEmail'));
const NotFound = lazy(() => import('../pages/404'));


export const routes = [
  { path: '/', element: <Home /> },
  { path: '/auth/login', element: <Login /> },
  { path: '/auth/register', element: <Register /> },
  { path: '/auth/verify-otp', element: <VerifyOtp /> },
  { path: '/auth/reset-password', element: <ResetPassword /> },
  { path: '/auth/forgot-password', element: <ForgotPassword /> },
  { path: '/auth/verify-email', element: <VerifyEmail /> },
  { path: '*', element: <NotFound /> },
];
