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
const Restaurants = lazy(() => import('../pages/Restaurants'));
const RestaurantMenuDetails = lazy(() => import('../pages/RestaurantDetails'));
const EditMenuItem = lazy(() => import('../pages/restaurantManager/MenuManagement/EditMenuItem'));
const MenuDetails = lazy(() => import('../pages/MenuDetails'));

export const routes = [
  {
    element: MainLayout,
    children: [
      { path: '/', element: Home },
      { path: '/restaurants', element: Restaurants },
      { path: '/restaurant-details/:id', element: RestaurantMenuDetails },
      { path: '/menu-details/:id', element: MenuDetails },
    ],
  },
  {
    element: (props) => <DefaultLayout {...props} userRole="restaurantManager" />,
    children: [
      { path: '/dashboard/restaurant-manager', element: RestaurantManagerDashboard },
      { path: '/dashboard/restaurant-manager/restaurant-details', element: RestaurantManagerDetails },
      { path: '/dashboard/restaurant-manager/add-menu-item', element: AddMenuItemRestaurantManager },
      { path: '/dashboard/restaurant-manager/view-orders', element: ViewOrders },
      { path: '/dashboard/restaurant-manager/edit-menu-item/:id', element: EditMenuItem },
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