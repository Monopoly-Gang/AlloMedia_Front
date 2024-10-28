import { path } from 'framer-motion/client';
import { lazy } from 'react';

const Home = lazy(() => import('../pages/Home'));
const Register = lazy(() => import('../pages/auth/Register'));
const RegisterClient = lazy(() => import('../pages/auth/RegisterClient'));
const RegisterRestaurant = lazy(() => import('../pages/auth/RegisterRestaurant'));
const VerifyEmail = lazy(() => import('../pages/auth/VerifyEmail'));
const VerifyOtp = lazy(() => import('../pages/auth/VerifyOtp'));
const Logout = lazy(() => import('../pages/auth/Logout'));
const RestaurantManagerDashboard = lazy(() => import('../pages/restaurantManager/Dashboard'));
const SuperAdminDashboard = lazy(() => import('../pages/superAdmin/Dashboard'));
const MainLayout = lazy(() => import('../components/layout/Interface/MainLayout'));
const DefaultLayout = lazy(() => import('../components/layout/Dashboard/DefaultLayout'));
const BlankLayout = lazy(() => import('../components/layout/Dashboard/BlankLayout'));
const Login = lazy(() => import('../pages/auth/Login'));
const ManageRestaurants = lazy(() => import('../pages/superAdmin/RestaurantManagement/ManageRestaurants'));
const RestaurantDetails = lazy(() => import('../pages/superAdmin/RestaurantManagement/RestaurantDetails'));
const AddRestaurant = lazy(() => import('../pages/superAdmin/RestaurantManagement/AddRestaurant'));
const ApproveRestaurants = lazy(() => import('../pages/superAdmin/RestaurantManagement/ApproveRestaurants'));
const AddMenuItem = lazy(() => import('../pages/superAdmin/RestaurantManagement/AddMenuItem'));
const RestaurantManagerDetails = lazy(() => import('../pages/restaurantManager/RestaurantManagement/RestaurantDetails'));
const AddMenuItemRestaurantManager = lazy(() => import('../pages/restaurantManager/MenuManagement/AddMenuItem'));
const ViewOrders = lazy(() => import('../pages/restaurantManager/OrderManagement/ViewOrders'));

export const routes = [
  {
    element: MainLayout,
    children: [
      { path: '/', element: Home },
    ],
  },
  {
    element: (props) => <DefaultLayout {...props} userRole="restaurantManager" />,
    children: [
      { path: '/dashboard/restaurant-manager', element: RestaurantManagerDashboard },
      { path: '/dashboard/restaurant-manager/restaurant-details', element: RestaurantManagerDetails },
      { path: '/dashboard/restaurant-manager/add-menu-item', element: AddMenuItemRestaurantManager },
      { path: '/dashboard/restaurant-manager/view-orders', element: ViewOrders },
    ],
  },
  {
    element: (props) => <DefaultLayout {...props} userRole="superAdmin" />,
    children: [
      { path: '/dashboard/super-admin', element: SuperAdminDashboard },
      { path: '/dashboard/super-admin/manage-restaurants', element: ManageRestaurants },
      { path: '/dashboard/super-admin/restaurant-details/:id', element: RestaurantDetails },
      { path: '/dashboard/super-admin/add-restaurant', element: AddRestaurant },
      { path: '/dashboard/super-admin/approve-restaurant', element: ApproveRestaurants },
      { path: '/dashboard/super-admin/add-menu-item', element: AddMenuItem },
    ],
  },
  {
    element: BlankLayout,
    children: [
      { path: '/login', element: Login },
      { path: '/register', element: Register },
      { path: '/register-client', element: RegisterClient },
      { path: '/register-restaurant', element: RegisterRestaurant },
      { path: '/verify-email', element: VerifyEmail },
      { path: '/verify-otp', element: VerifyOtp },
      { path: '/logout', element: Logout },
    ],
  },
];