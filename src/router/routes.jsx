import Home from '../pages/Home';
import Login from '../pages/auth/Login';
import Register from '../pages/auth/Register';
import RestaurantManagerDashboard from '../pages/restaurantManager/Dashboard';
import SuperAdminDashboard from '../pages/superAdmin/Dashboard';
import MainLayout from '../components/layout/Interface/MainLayout';
import DefaultLayout from '../components/layout/Dashboard/DefaultLayout';
import BlankLayout from '../components/layout/Dashboard/BlankLayout';

export const routes = [
  { path: '/', element: <Home />, layout: MainLayout },
  { path: '/auth/login', element: <Login />, layout: BlankLayout },
  { path: '/auth/register', element: <Register />, layout: BlankLayout },
  { path: '/dashboard/restaurant-manager', element: <RestaurantManagerDashboard />, layout: DefaultLayout },
  { path: '/dashboard/super-admin', element: <SuperAdminDashboard />, layout: DefaultLayout },
];