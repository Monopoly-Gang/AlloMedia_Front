import { lazy } from 'react';

const Home = lazy(() => import('../pages/Home'));
const Register = lazy(() => import('../pages/auth/Register'));
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
      { path: '/dashboard/restaurant-manager/restaurant-details/:id', element: RestaurantManagerDetails },
      { path: '/dashboard/restaurant-manager/add-menu-item/:id', element: AddMenuItemRestaurantManager },
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
      { path: '/auth/login', element: Login },
      { path: '/auth/register', element: Register },
    ],
  },
];