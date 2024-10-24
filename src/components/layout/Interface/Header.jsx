import {
  Menu,
  X,
  Moon,
  Sun,
  Laptop,
  Bell,
  ShoppingBasket,
  Trash2,
} from "lucide-react";
import { useState, useEffect } from "react";
import logoLight from "../../../assets/img/logo-light.svg";
import logoDark from "../../../assets/img/logo-dark.svg";
import { useSelector, useDispatch } from "react-redux";
import { toggleTheme } from "../../../store/themeConfigSlice";
import Dropdown from "../Dashboard/Dropdown";
import { useTranslation } from "react-i18next";
import { useNavigate } from "react-router-dom";

const Navbar = () => {
  const [mobileDrawerOpen, setMobileDrawerOpen] = useState(false);
  const [notifications, setNotifications] = useState([]);
  const [basketOpen, setBasketOpen] = useState(false);
  const themeConfig = useSelector((state) => state.themeConfig);
  const dispatch = useDispatch();
  const [isScrolled, setIsScrolled] = useState(false);
  const isRtl = themeConfig.rtlClass === "rtl";
  const { t } = useTranslation();
  const navigate = useNavigate();

  const [basketItems, setBasketItems] = useState([
    {
      id: 1,
      image: "https://via.placeholder.com/40",
      name: "Item 1",
      price: 10.0,
    },
    {
      id: 2,
      image: "https://via.placeholder.com/40",
      name: "Item 2",
      price: 15.0,
    },
    {
      id: 3,
      image: "https://via.placeholder.com/40",
      name: "Item 3",
      price: 20.0,
    },
  ]);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 0);
      if (mobileDrawerOpen) {
        setMobileDrawerOpen(false);
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, [mobileDrawerOpen]);

  useEffect(() => {
    if (mobileDrawerOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "auto";
    }

    return () => {
      document.body.style.overflow = "auto";
    };
  }, [mobileDrawerOpen]);

  const toggleNavbar = () => {
    setMobileDrawerOpen(!mobileDrawerOpen);
  };

  const toggleBasket = () => {
    setBasketOpen(!basketOpen);
  };

  const removeNotification = (id) => {
    setNotifications(notifications.filter((notif) => notif.id !== id));
  };

  const removeItemFromBasket = (id) => {
    setBasketItems(basketItems.filter((item) => item.id !== id));
  };

  const renderNavLinks = () => (
    <>
      {["Home", "Services", "About Us", "Contact Us", "FAQ"].map((link) => (
        <li key={link}>
          <a
            href="#"
            className="hover:text-orange-500 transition-colors duration-300"
          >
            {link}
          </a>
        </li>
      ))}
    </>
  );

  const renderAuthButtons = () => (
    <div className="flex space-x-4">
      <a
        href="/auth/login"
        className="py-1.5 px-2 border rounded-md text-slate-900 dark:text-slate-50 hover:text-slate-50 hover:bg-gradient-to-r hover:from-orange-500 hover:to-orange-600 transition-colors duration-300"
      >
        Sign In
      </a>
      <a
        href="/auth/role-selection"
        className="py-1.5 px-2 text-white rounded-md bg-orange-500 hover:bg-gradient-to-r hover:from-orange-500 hover:to-orange-600 transition-colors duration-300"
      >
        Create an account
      </a>
    </div>
  );

  return (
    <nav
      className={`sticky top-0 z-50 py-3 px-7 ${
        isScrolled ? "backdrop-blur-md" : "bg-slate-50 dark:bg-slate-900"
      } border-b border-slate-200 dark:border-slate-700 transition-all duration-300`}
    >
      <div className="container px-4 mx-auto relative lg:text-sm">
        <div className="flex justify-between items-center">
          <div className="flex items-center flex-shrink-0">
            <img
              className="h-12 w-24 mr-2"
              src={themeConfig.isDarkMode ? logoDark : logoLight}
              alt="logo"
            />
          </div>
          <ul className="hidden text-slate-900 font-medium dark:text-slate-50 lg:flex ml-14 space-x-12">
            {renderNavLinks()}
          </ul>
          <div className="hidden lg:flex">
            <div>
              {themeConfig.theme === "light" ? (
                <button
                  className="flex items-center p-2 mr-8 rounded-full bg-white-light/40 dark:bg-dark/40 hover:text-primary hover:bg-white-light/90 dark:hover:bg-dark/60"
                  onClick={() => {
                    dispatch(toggleTheme("dark"));
                  }}
                >
                  <Sun
                    className="text-slate-900 dark:text-slate-50"
                    size="20"
                  />
                </button>
              ) : null}
              {themeConfig.theme === "dark" && (
                <button
                  className="flex items-center p-2 mr-8 rounded-full bg-white-light/40 dark:bg-slate-800 hover:text-primary hover:bg-white-light/90 dark:hover:bg-dark/60"
                  onClick={() => {
                    dispatch(toggleTheme("system"));
                  }}
                >
                  <Moon
                    className="text-slate-900 dark:text-slate-50"
                    size="20"
                  />
                </button>
              )}
              {themeConfig.theme === "system" && (
                <button
                  className="flex items-center p-2 mr-8 rounded-full bg-white-light/40 dark:bg-slate-800 hover:text-primary hover:bg-white-light/90 dark:hover:bg-dark/60"
                  onClick={() => {
                    dispatch(toggleTheme("light"));
                  }}
                >
                  <Laptop
                    className="text-slate-900 dark:text-slate-50"
                    size="20"
                  />
                </button>
              )}
            </div>
            <div>
              <div className="dropdown shrink-0 mr-8">
                <Dropdown
                  offset={[0, 8]}
                  placement={`${isRtl ? "bottom-start" : "bottom-end"}`}
                  btnClassName="relative block p-2 rounded-full bg-white-light/40 dark:bg-slate-800 hover:text-primary hover:bg-white-light/90 dark:hover:bg-dark/60"
                  button={
                    <span>
                      <Bell
                        className="text-slate-900 dark:text-slate-50"
                        size="20"
                      />
                      <span className="flex absolute w-3 h-3 ltr:right-0 rtl:left-0 top-0">
                        <span className="animate-ping absolute ltr:-left-[3px] rtl:-right-[3px] -top-[3px] inline-flex h-full w-full rounded-full bg-success/50 opacity-75"></span>
                        <span className="relative inline-flex rounded-full w-[6px] h-[6px] bg-success"></span>
                      </span>
                    </span>
                  }
                >
                  <ul className="!py-0 text-dark dark:text-white-dark w-[300px] sm:w-[350px] divide-y dark:divide-white/10">
                    <li onClick={(e) => e.stopPropagation()}>
                      <div className="flex items-center px-4 py-2 justify-between font-semibold">
                        <h4 className="text-lg">Notification</h4>
                        {notifications.length ? (
                          <span className="badge bg-primary/80">
                            {notifications.length}New
                          </span>
                        ) : (
                          ""
                        )}
                      </div>
                    </li>
                    {notifications.length > 0 ? (
                      <>
                        {notifications.map((notification) => {
                          return (
                            <li
                              key={notification.id}
                              className="dark:text-white-light/90"
                              onClick={(e) => e.stopPropagation()}
                            >
                              <div className="group flex items-center px-4 py-2">
                                <div className="grid place-content-center rounded">
                                  <div className="w-12 h-12 relative">
                                    <img
                                      className="w-12 h-12 rounded-full object-cover"
                                      alt="profile"
                                      src={`/assets/images/${notification.profile}`}
                                    />
                                    <span className="bg-success w-2 h-2 rounded-full block absolute right-[6px] bottom-0"></span>
                                  </div>
                                </div>
                                <div className="ltr:pl-3 rtl:pr-3 flex flex-auto">
                                  <div className="ltr:pr-3 rtl:pl-3">
                                    <h6
                                      dangerouslySetInnerHTML={{
                                        __html: notification.message,
                                      }}
                                    ></h6>
                                    <span className="text-xs block font-normal dark:text-gray-500">
                                      {notification.time}
                                    </span>
                                  </div>
                                  <button
                                    type="button"
                                    className="ltr:ml-auto rtl:mr-auto text-neutral-300 hover:text-danger opacity-0 group-hover:opacity-100"
                                    onClick={() =>
                                      removeNotification(notification.id)
                                    }
                                  >
                                    <svg
                                      width="20"
                                      height="20"
                                      viewBox="0 0 24 24"
                                      fill="none"
                                      xmlns="http://www.w3.org/2000/svg"
                                    >
                                      <circle
                                        opacity="0.5"
                                        cx="12"
                                        cy="12"
                                        r="10"
                                        stroke="currentColor"
                                        strokeWidth="1.5"
                                      />
                                      <path
                                        d="M14.5 9.50002L9.5 14.5M9.49998 9.5L14.5 14.5"
                                        stroke="currentColor"
                                        strokeWidth="1.5"
                                        strokeLinecap="round"
                                      />
                                    </svg>
                                  </button>
                                </div>
                              </div>
                            </li>
                          );
                        })}
                        <li>
                          <div className="p-4">
                            <button className="btn btn-primary block w-full btn-small">
                              Read All Notifications
                            </button>
                          </div>
                        </li>
                      </>
                    ) : (
                      <li onClick={(e) => e.stopPropagation()}>
                        <button
                          type="button"
                          className="!grid place-content-center hover:!bg-transparent text-lg min-h-[200px]"
                        >
                          <div className="mx-auto ring-4 ring-primary/30 rounded-full mb-4">
                            <svg
                              xmlns="http://www.w3.org/2000/svg"
                              width="40"
                              height="40"
                              viewBox="0 0 24 24"
                              fill="#a9abb6"
                              stroke="#ffffff"
                              strokeWidth="1.5"
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              className="feather feather-info bg-primary rounded-full"
                            >
                              <line x1="12" y1="16" x2="12" y2="12"></line>
                              <line x1="12" y1="8" x2="12.01" y2="8"></line>
                            </svg>
                          </div>
                          No data available.
                        </button>
                      </li>
                    )}
                  </ul>
                </Dropdown>
              </div>
            </div>
            <div className="relative inline-block mr-8">
              <span className="absolute top-[-10px] right-[-10px] inline-flex items-center justify-center p-1 px-2 text-xs font-semibold text-white bg-primary rounded-full">
                {basketItems.reduce(
                  (total, item) => total + (item.quantity || 1),
                  0
                )}
              </span>
              <button
                onClick={toggleBasket}
                className="flex items-center justify-center p-2 rounded-full bg-white-light/40 dark:bg-slate-800 text-gray-700 bg-white"
              >
                <ShoppingBasket
                  size="20"
                  className="text-slate-900 dark:text-slate-50"
                />
              </button>
              {basketOpen && (
                <div className="absolute right-0 mt-2 w-64 bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-md shadow-lg">
                  <ul className="py-2">
                    {basketItems.map((item) => (
                      <li
                        key={item.id}
                        className="flex items-center px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-700"
                      >
                        <img
                          src={item.image}
                          alt={item.name}
                          className="w-10 h-10 rounded-full mr-3"
                        />
                        <div className="flex-1 space-y-2">
                          <h4 className="text-base font-semibold text-slate-900 dark:text-slate-50">
                            {item.name}
                          </h4>
                          <p className="text-sm font-medium text-primary">
                            ${item.price.toFixed(2)}
                          </p>
                        </div>
                        <button
                          onClick={() => removeItemFromBasket(item.id)}
                          className="text-red-500 hover:text-red-700"
                        >
                          <Trash2 size="18" />
                        </button>
                      </li>
                    ))}
                  </ul>
                  <div className="px-4 py-2 border-t border-slate-200 dark:border-slate-700">
                    <div className="flex justify-between items-center">
                      <span className="text-base font-semibold text-slate-900 dark:text-slate-50">
                        Total:
                      </span>
                      <span className="text-base font-semibold text-primary">
                        $
                        {basketItems
                          .reduce((total, item) => total + item.price, 0)
                          .toFixed(2)}
                      </span>
                    </div>
                    <button
                      onClick={() => navigate("/cart")} 
                      className="mt-2 w-full bg-primary text-white text-base font-semibold px-4 py-2 rounded-md hover:bg-primary/80 transition duration-300"
                    >
                      View Cart
                    </button>
                  </div>
                </div>
              )}
            </div>
            <div>{renderAuthButtons()}</div>
          </div>

          <div className="lg:hidden flex items-center">
            <button onClick={toggleNavbar}>
              <Menu
                color={themeConfig.isDarkMode ? "#f1f5f9" : "#64748b"}
                size="24"
              />
            </button>
          </div>
        </div>
        {mobileDrawerOpen && (
          <div className="fixed inset-0 h-screen z-20 text-white backdrop-blur-md flex flex-col items-center justify-center lg:hidden">
            <div className="p-8 bg-slate-50 dark:bg-slate-900 rounded-lg border border-slate-200 dark:border-slate-700">
              <button
                className="absolute top-4 right-4 z-30"
                onClick={toggleNavbar}
              >
                <X
                  color={themeConfig.isDarkMode ? "#f1f5f9" : "#64748b"}
                  size="24"
                />
              </button>
              <ul className="space-y-4 text-slate-900 dark:text-slate-50">
                {renderNavLinks()}
              </ul>
              <div className="flex flex-col space-y-4 mt-8">
                {renderAuthButtons()}
              </div>
            </div>
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
