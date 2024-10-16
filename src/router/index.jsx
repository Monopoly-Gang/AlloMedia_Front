import { createBrowserRouter } from 'react-router-dom';
import BlankLayout from '../components/layout/Dashboard/BlankLayout';
import DefaultLayout from '../components/layout/Dashboard/DefaultLayout';
import { routes } from './routes';

const finalRoutes = routes.map((route) => {
    const Layout = route.layout === 'blank' ? BlankLayout : DefaultLayout;
    return {
        ...route,
        element: <Layout>{route.element}</Layout>,
    };
});

const router = createBrowserRouter(finalRoutes);

export default router;