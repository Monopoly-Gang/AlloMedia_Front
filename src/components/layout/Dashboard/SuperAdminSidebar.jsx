import React, { useState, useEffect } from 'react';
import PerfectScrollbar from 'react-perfect-scrollbar';
import { useTranslation } from 'react-i18next';
import { useDispatch, useSelector } from 'react-redux';
import { NavLink, useLocation } from 'react-router-dom';
import { toggleSidebar } from '../../../store/themeConfigSlice';
import AnimateHeight from 'react-animate-height';
import { ChevronDown, ChevronsLeft, Truck, LayoutDashboard } from 'lucide-react';
import { Restaurant } from '../../../components/icons/Restaurant';

const SuperAdminSidebar = () => {
    const [currentMenu, setCurrentMenu] = useState('');
    const themeConfig = useSelector((state) => state.themeConfig);
    const semidark = useSelector((state) => state.themeConfig.semidark);
    const location = useLocation();
    const dispatch = useDispatch();
    const { t } = useTranslation();

    const toggleMenu = (value) => {
        setCurrentMenu((oldValue) => {
            return oldValue === value ? '' : value;
        });
    };

    useEffect(() => {
        const selector = document.querySelector('.sidebar ul a[href="' + window.location.pathname + '"]');
        if (selector) {
            selector.classList.add('active');
            const ul = selector.closest('ul.sub-menu');
            if (ul) {
                let ele = ul.closest('li.menu').querySelectorAll('.nav-link') || [];
                if (ele.length) {
                    ele = ele[0];
                    setTimeout(() => {
                        ele.click();
                    });
                }
            }
        }
    }, []);

<<<<<<< HEAD
  return (
    <div className={semidark ? "dark" : ""}>
      <nav
        className={`sidebar fixed min-h-screen h-full top-0 bottom-0 w-[270px] shadow-[5px_0_25px_0_rgba(94,92,154,0.1)] z-50 transition-all duration-300 ${
          semidark ? "text-white-dark" : ""
        }`}
      >
        <div className="bg-white dark:bg-black h-full">
          <div className="flex justify-between items-center px-4 py-3">
            <NavLink to="/" className="main-logo flex items-center shrink-0">
              <img
                className="w-8 ml-[5px] flex-none"
                src="/assets/images/logo.svg"
                alt="logo"
              />
              <span className="text-2xl ltr:ml-1.5 rtl:mr-1.5 font-semibold align-middle lg:inline dark:text-white-light">
                {t("VRISTO")}
              </span>
            </NavLink>
            <button
              type="button"
              className="collapse-icon w-8 h-8 rounded-full flex items-center hover:bg-gray-500/10 dark:hover:bg-dark-light/10 dark:text-white-light transition duration-300 rtl:rotate-180"
              onClick={() => dispatch(toggleSidebar())}
            >
              <ChevronsLeft color="#64748b" size="20" />
            </button>
          </div>
          <div className="h-[calc(100vh-80px)] relative overflow-y-auto scroll-container">
            <ul className="relative font-semibold space-y-0.5 p-4 py-0">
              <li className="menu nav-item">
                <button
                  type="button"
                  className={`${
                    currentMenu === "dashboard" ? "active" : ""
                  } nav-link group w-full`}
                  onClick={() => toggleMenu("dashboard")}
                >
                  <div className="flex items-center">
                    <MaterialSymbolsDashboardCustomizeRounded className="group-hover:!text-primary shrink-0" />
                    <span className="ltr:pl-3 rtl:pr-3 text-black dark:text-[#506690] dark:group-hover:text-white-dark">
                      {t("Dashboard")}
                    </span>
                  </div>
                  <div
                    className={
                      currentMenu === "dashboard"
                        ? "rotate-90"
                        : "rtl:rotate-180"
                    }
                  >
                    <svg
                      width="16"
                      height="16"
                      viewBox="0 0 24 24"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        d="M9 5L15 12L9 19"
                        stroke="currentColor"
                        strokeWidth="1.5"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                    </svg>
                  </div>
                </button>
                <AnimateHeight
                  duration={300}
                  height={currentMenu === "dashboard" ? "auto" : 0}
                >
                  <ul className="sub-menu text-gray-500 m-0">
                    <li>
                      <NavLink to="/analytics">{t("Analytics")}</NavLink>
                    </li>
                  </ul>
                </AnimateHeight>
              </li>
              <h2 className="py-3 px-7 flex items-center uppercase font-extrabold bg-white-light/30 dark:bg-dark dark:bg-opacity-[0.08] -mx-4 mb-1">
                <svg
                  className="w-4 h-5 flex-none hidden"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  strokeWidth="1.5"
                  fill="none"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <line x1="5" y1="12" x2="19" y2="12"></line>
                </svg>
                <span className="text-[0.85rem]">
                  {t("Restaurant Management")}
                </span>
              </h2>
              <li className="menu nav-item">
                <button
                  type="button"
                  className={`${
                    currentMenu === "restaurant" ? "active" : ""
                  } nav-link group w-full`}
                  onClick={() => toggleMenu("restaurant")}
                >
                  <div className="flex items-center">
                    <Restaurant className="group-hover:!text-primary shrink-0" />
                    <span className="ltr:pl-3 rtl:pr-3 text-black dark:text-[#506690] dark:group-hover:text-white-dark">
                      {t("restaurant")}
                    </span>
                  </div>
=======
    useEffect(() => {
        if (window.innerWidth < 1024 && themeConfig.sidebar) {
            dispatch(toggleSidebar());
        }
    }, [dispatch, themeConfig.sidebar, location]);
>>>>>>> 41f2107955a0e43af82b9f07fb0fa37b6c5617c3

    return (
        <div className={semidark ? 'dark' : ''}>
            <nav className={`sidebar fixed min-h-screen h-full top-0 bottom-0 w-[260px] shadow-[5px_0_25px_0_rgba(94,92,154,0.1)] z-50 transition-all duration-300 ${semidark ? 'text-white-dark' : ''}`}>
                <div className="bg-white dark:bg-black h-full">
                    <div className="flex justify-between items-center px-4 py-3">
                        <NavLink to="/" className="main-logo flex items-center shrink-0">
                            <img className="w-8 ml-[5px] flex-none" src="/assets/images/logo.svg" alt="logo" />
                            <span className="text-2xl ltr:ml-1.5 rtl:mr-1.5 font-semibold align-middle lg:inline dark:text-white-light">{t('VRISTO')}</span>
                        </NavLink>
                        <button
                            type="button"
                            className="collapse-icon w-8 h-8 rounded-full flex items-center hover:bg-gray-500/10 dark:hover:bg-dark-light/10 dark:text-white-light transition duration-300 rtl:rotate-180"
                            onClick={() => dispatch(toggleSidebar())}
                        >
                            <ChevronsLeft className="m-auto" size={18} />
                        </button>
                    </div>
                    <PerfectScrollbar className="h-[calc(100vh-80px)] relative">
                        <ul className="relative font-semibold space-y-0.5 p-4 py-0">
                            <li className="menu nav-item">
                                <button type="button" className={`${currentMenu === 'dashboard' ? 'active' : ''} nav-link group w-full`} onClick={() => toggleMenu('dashboard')}>
                                    <div className="flex items-center">
                                        <LayoutDashboard className="group-hover:!text-primary shrink-0" />
                                        <span className="ltr:pl-3 rtl:pr-3 text-black dark:text-[#506690] dark:group-hover:text-white-dark">{t('Dashboard')}</span>
                                    </div>
                                    <div className={currentMenu !== 'dashboard' ? 'rtl:rotate-90 -rotate-90' : ''}>
                                        <ChevronDown size={16} />
                                    </div>
                                </button>
                                <AnimateHeight duration={300} height={currentMenu === 'dashboard' ? 'auto' : 0}>
                                    <ul className="sub-menu text-gray-500">
                                        <li>
                                            <NavLink to="/dashboard/super-admin">{t('Overview')}</NavLink>
                                        </li>
                                    </ul>
                                </AnimateHeight>
                            </li>

<<<<<<< HEAD
                <AnimateHeight
                  duration={300}
                  height={currentMenu === "restaurant" ? "auto" : 0}
                >
                  <ul className="sub-menu text-gray-500 m-0">
                    <li>
                      <NavLink className="text-[0.85rem] font-semibold" to="/dashboard/super-admin/manage-restaurants"> {t("List Restaurant")}</NavLink>
                    </li>
                    <li>
                      <NavLink className="text-[0.85rem] font-semibold" to="/dashboard/super-admin/approve-restaurant"> {t("Approve Restaurant")}</NavLink>
                    </li>
                  </ul>
                </AnimateHeight>
              </li>
            </ul>
          </div>
=======
                            <h2 className="py-3 px-7 text-xs flex items-center uppercase font-extrabold bg-white-light/30 dark:bg-dark dark:bg-opacity-[0.08] -mx-4 mb-1">
                                <span>{t('Restaurant Management')}</span>
                            </h2>

                            <li className="menu nav-item">
                                <button type="button" className={`${currentMenu === 'restaurant' ? 'active' : ''} nav-link group w-full`} onClick={() => toggleMenu('restaurant')}>
                                    <div className="flex items-center">
                                        <Restaurant className="group-hover:!text-primary shrink-0" />
                                        <span className="ltr:pl-3 rtl:pr-3 text-black dark:text-[#506690] dark:group-hover:text-white-dark">{t('Restaurants')}</span>
                                    </div>
                                    <div className={currentMenu !== 'restaurant' ? 'rtl:rotate-90 -rotate-90' : ''}>
                                        <ChevronDown size={16} />
                                    </div>
                                </button>
                                <AnimateHeight duration={300} height={currentMenu === 'restaurant' ? 'auto' : 0}>
                                    <ul className="sub-menu text-gray-500 m-0">
                                        <li>
                                            <NavLink to="/dashboard/super-admin/manage-restaurants">{t('List Restaurant')}</NavLink>
                                        </li>
                                        <li>
                                            <NavLink to="/dashboard/super-admin/approve-restaurant">{t('Approve Restaurant')}</NavLink>
                                        </li>
                                    </ul>
                                </AnimateHeight>
                            </li>

                            <h2 className="py-3 px-7 text-sm flex items-center uppercase font-extrabold bg-white-light/30 dark:bg-dark dark:bg-opacity-[0.08] -mx-4 mb-1">
                                <span>{t('Delivery Management')}</span>
                            </h2>

                            <li className="menu nav-item">
                                <button type="button" className={`${currentMenu === 'delivery' ? 'active' : ''} nav-link group w-full`} onClick={() => toggleMenu('delivery')}>
                                    <div className="flex items-center">
                                        <Truck className="group-hover:!text-primary shrink-0" />
                                        <span className="ltr:pl-3 rtl:pr-3 text-black dark:text-[#506690] dark:group-hover:text-white-dark">{t('Restaurants')}</span>
                                    </div>
                                    <div className={currentMenu !== 'delivery' ? 'rtl:rotate-90 -rotate-90' : ''}>
                                        <ChevronDown size={16} />
                                    </div>
                                </button>
                                <AnimateHeight duration={300} height={currentMenu === 'delivery' ? 'auto' : 0}>
                                    <ul className="sub-menu text-gray-500 m-0">
                                        <li>
                                            <NavLink to="/dashboard/super-admin/delivery-drivers">{t('List Delivery Drivers')}</NavLink>
                                        </li>
                                    </ul>
                                </AnimateHeight>
                            </li>
                        </ul>
                    </PerfectScrollbar>
                </div>
            </nav>
>>>>>>> 41f2107955a0e43af82b9f07fb0fa37b6c5617c3
        </div>
    );
};

export default SuperAdminSidebar;