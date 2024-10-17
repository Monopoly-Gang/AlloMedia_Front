import React, { Suspense } from 'react';
import { Routes, Route } from 'react-router-dom';
import { routes } from './routes';
import Loader from '../components/Loader';

const AppRoutes = () => {
  const renderRoutes = (routesArray) => {
    return routesArray.map((route, index) => {
      const Element = route.element;
      
      return (
        <Route
          key={index}
          element={
            <Suspense fallback={<Loader />}>
              <Element />
            </Suspense>
          }
        >
          {route.children?.map((childRoute, childIndex) => (
            <Route
              key={childIndex}
              path={childRoute.path}
              element={
                <Suspense fallback={<Loader />}>
                  <childRoute.element />
                </Suspense>
              }
            />
          ))}
        </Route>
      );
    });
  };

  return <Routes>{renderRoutes(routes)}</Routes>;
};

export default AppRoutes;