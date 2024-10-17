import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Routes, Route } from 'react-router-dom';
import { I18nextProvider } from 'react-i18next';
import i18n from './i18n';
import { routes } from './router/routes';
import NotFound from './pages/404';
import { toggleRTL, toggleTheme, toggleLocale, toggleMenu, toggleLayout, toggleAnimation, toggleNavbar, toggleSemidark } from './store/themeConfigSlice';
import store from './store';

const App = () => {
    const themeConfig = useSelector((state) => state.themeConfig);
    const dispatch = useDispatch();

    useEffect(() => {
        const initApp = async () => {
            await i18n.init();
            dispatch(toggleTheme(localStorage.getItem('theme') || themeConfig.theme));
            dispatch(toggleMenu(localStorage.getItem('menu') || themeConfig.menu));
            dispatch(toggleLayout(localStorage.getItem('layout') || themeConfig.layout));
            dispatch(toggleRTL(localStorage.getItem('rtlClass') || themeConfig.rtlClass));
            dispatch(toggleAnimation(localStorage.getItem('animation') || themeConfig.animation));
            dispatch(toggleNavbar(localStorage.getItem('navbar') || themeConfig.navbar));
            dispatch(toggleLocale(localStorage.getItem('i18nextLng') || themeConfig.locale));
            dispatch(toggleSemidark(localStorage.getItem('semidark') || themeConfig.semidark));
        };

        initApp();
    }, [dispatch, themeConfig]);

    return (
      <I18nextProvider i18n={i18n}>
        <div
          className={`${(store.getState().themeConfig.sidebar && 'toggle-sidebar') || ''} ${themeConfig.menu} ${themeConfig.layout} ${
            themeConfig.rtlClass
          } main-section antialiased relative font-nunito text-sm font-normal`}
        >
          <Routes>
            {routes.map((route, index) => {
              const Layout = route.layout;
              return (
                <Route
                  key={index}
                  path={route.path}
                  element={
                    <Layout>
                      {route.element}
                    </Layout>
                  }
                />
              );
            })}
            <Route path="*" element={<NotFound />} />
          </Routes>
        </div>
      </I18nextProvider>
    );
}

export default App;