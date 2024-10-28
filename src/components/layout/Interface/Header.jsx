import { Menu, X, Moon, Sun, Laptop, Bell } from "lucide-react";
import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import logoLight from "../../../assets/img/logo-light.svg";
import logoDark from "../../../assets/img/logo-dark.svg";
import { useSelector, useDispatch } from "react-redux";
import { toggleTheme } from "../../../store/themeConfigSlice";
import Dropdown from "../Dashboard/Dropdown";
import { useTranslation } from "react-i18next";
import AuthService from "../../../services/AuthService";

const Navbar = () => {
  const [mobileDrawerOpen, setMobileDrawerOpen] = useState(false);
  const [isDriver, setIsDriver] = useState(false);
  const [basketOpen, setBasketOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [showConfirmation, setShowConfirmation] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [confirmationMessage, setConfirmationMessage] = useState({
    orderId: '',
    customerName: '',
    restaurantName: '',
    address: '',
    items: []
  });

  const [basketItems, setBasketItems] = useState([
    { id: 1, image: "https://via.placeholder.com/40", name: "Item 1", price: 10.0 },
    { id: 2, image: "https://via.placeholder.com/40", name: "Item 2", price: 15.0 },
    { id: 3, image: "https://via.placeholder.com/40", name: "Item 3", price: 20.0 },
  ]);

  const themeConfig = useSelector((state) => state.themeConfig);
  const dispatch = useDispatch();
  const { t } = useTranslation();
  const [flag, setFlag] = useState("ae");
  const Auth = AuthService();

  useEffect(() => {
    setIsDriver(true); // This should be based on actual authentication
  }, []);

  const handleScroll = useCallback(() => {
    setIsScrolled(window.scrollY > 0);
    if (mobileDrawerOpen) {
      setMobileDrawerOpen(false);
    }
    // Ne ferme pas la modal lors du défilement
  }, [mobileDrawerOpen]);

  useEffect(() => {
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, [handleScroll]);

  useEffect(() => {
    document.body.style.overflow = mobileDrawerOpen ? "hidden" : "auto";
    return () => {
      document.body.style.overflow = "auto";
    };
  }, [mobileDrawerOpen]);

  // Mock data for testing confirmation
  useEffect(() => {
    const timer = setTimeout(() => {
      setConfirmationMessage({
        orderId: '12345',
        customerName: 'John Doe',
        restaurantName: 'Burger Palace',
        address: '123 Main St, Anytown, AN 12345',
        items: [
          { name: 'Cheeseburger', quantity: 2 },
          { name: 'Fries', quantity: 1 },
          { name: 'Soda', quantity: 2 }
        ]
      });
      setShowConfirmation(true);
    }, 5000);

    return () => clearTimeout(timer);
  }, []);

  const toggleNavbar = () => setMobileDrawerOpen(!mobileDrawerOpen);
  const toggleBasket = () => setBasketOpen(!basketOpen);

  const removeItemFromBasket = (id) => {
    setBasketItems(basketItems.filter((item) => item.id !== id));
  };

  const handleConfirmOrder = () => {
    setShowConfirmation(false);
    setIsModalOpen(false);
    // Add logic to handle order confirmation
  };

  const handleDismissConfirmation = () => {
    setShowConfirmation(false);
    setIsModalOpen(false);
    // Add logic to handle order dismissal
  };

  const handleClick = () => {
    setIsModalOpen(true);
  };

  const renderNavLinks = () => (
    <>
      <li>
        <a href="/" className="hover:text-orange-500 transition-colors duration-300 text-slate-900 dark:text-slate-50 font-medium">
          Home
        </a>
      </li>
      <li>
        <a href="/restaurants" className="hover:text-orange-500 transition-colors duration-300 text-slate-900 dark:text-slate-50 font-medium">
          Restaurants
        </a>
      </li>
      <li>
        <a href="/#about" className="hover:text-orange-500 transition-colors duration-300 text-slate-900 dark:text-slate-50 font-medium">
          About Us
        </a>
      </li>
      <li>
        <a href="/#services" className="hover:text-orange-500 transition-colors duration-300 text-slate-900 dark:text-slate-50 font-medium">
          Services
        </a>
      </li>
      
      <li>
        <a href="/#contact" className="hover:text-orange-500 transition-colors duration-300 text-slate-900 dark:text-slate-50 font-medium">
          Contact Us
        </a>
      </li>
    </>
  );

  const renderAuthButtons = () => Auth.isAuthenticated() ? 
  <div className="dropdown shrink-0 flex">
              <Dropdown
                offset={[0, 8]}
                placement={`${isRtl ? "bottom-start" : "bottom-end"}`}
                btnClassName="relative group block"
                button={
                  <img
                    className="w-9 h-9 rounded-full object-cover saturate-50 group-hover:saturate-100"
                    src="/assets/images/user-profile.jpeg"
                    alt="userProfile"
                  />
                }
              >
                <ul className="text-dark dark:text-white-dark !py-0 w-[230px] font-semibold dark:text-white-light/90">
                  <li>
                    <div className="flex items-center px-4 py-4">
                      <img
                        className="rounded-md w-10 h-10 object-cover"
                        src="/assets/images/user-profile.jpeg"
                        alt="userProfile"
                      />
                      <div className="ltr:pl-4 rtl:pr-4 truncate">
                        <h4 className="text-base">
                          {Auth.getUser().fullName}
                        </h4>
                        <button
                          type="button"
                          className="text-black/60 hover:text-primary dark:text-dark-light/60 dark:hover:text-white"
                        >
                          {Auth.getUser().email}
                        </button>
                      </div>
                    </div>
                  </li>
                  <li>
                    <Link to="/users/profile" className="dark:hover:text-white">
                      <svg
                        className="ltr:mr-2 rtl:ml-2 shrink-0"
                        width="18"
                        height="18"
                        viewBox="0 0 24 24"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <circle
                          cx="12"
                          cy="6"
                          r="4"
                          stroke="currentColor"
                          strokeWidth="1.5"
                        />
                        <path
                          opacity="0.5"
                          d="M20 17.5C20 19.9853 20 22 12 22C4 22 4 19.9853 4 17.5C4 15.0147 7.58172 13 12 13C16.4183 13 20 15.0147 20 17.5Z"
                          stroke="currentColor"
                          strokeWidth="1.5"
                        />
                      </svg>
                      Profile
                    </Link>
                  </li>
                  <li>
                    <Link to="/apps/mailbox" className="dark:hover:text-white">
                      <svg
                        className="ltr:mr-2 rtl:ml-2 shrink-0"
                        width="18"
                        height="18"
                        viewBox="0 0 24 24"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path
                          opacity="0.5"
                          d="M2 12C2 8.22876 2 6.34315 3.17157 5.17157C4.34315 4 6.22876 4 10 4H14C17.7712 4 19.6569 4 20.8284 5.17157C22 6.34315 22 8.22876 22 12C22 15.7712 22 17.6569 20.8284 18.8284C19.6569 20 17.7712 20 14 20H10C6.22876 20 4.34315 20 3.17157 18.8284C2 17.6569 2 15.7712 2 12Z"
                          stroke="currentColor"
                          strokeWidth="1.5"
                        />
                        <path
                          d="M6 8L8.1589 9.79908C9.99553 11.3296 10.9139 12.0949 12 12.0949C13.0861 12.0949 14.0045 11.3296 15.8411 9.79908L18 8"
                          stroke="currentColor"
                          strokeWidth="1.5"
                          strokeLinecap="round"
                        />
                      </svg>
                      Inbox
                    </Link>
                  </li>
                  <li>
                    <Link
                      to="/auth/boxed-lockscreen"
                      className="dark:hover:text-white"
                    >
                      <svg
                        className="ltr:mr-2 rtl:ml-2 shrink-0"
                        width="18"
                        height="18"
                        viewBox="0 0 24 24"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path
                          d="M2 16C2 13.1716 2 11.7574 2.87868 10.8787C3.75736 10 5.17157 10 8 10H16C18.8284 10 20.2426 10 21.1213 10.8787C22 11.7574 22 13.1716 22 16C22 18.8284 22 20.2426 21.1213 21.1213C20.2426 22 18.8284 22 16 22H8C5.17157 22 3.75736 22 2.87868 21.1213C2 20.2426 2 18.8284 2 16Z"
                          stroke="currentColor"
                          strokeWidth="1.5"
                        />
                        <path
                          opacity="0.5"
                          d="M6 10V8C6 4.68629 8.68629 2 12 2C15.3137 2 18 4.68629 18 8V10"
                          stroke="currentColor"
                          strokeWidth="1.5"
                          strokeLinecap="round"
                        />
                        <g opacity="0.5">
                          <path
                            d="M9 16C9 16.5523 8.55228 17 8 17C7.44772 17 7 16.5523 7 16C7 15.4477 7.44772 15 8 15C8.55228 15 9 15.4477 9 16Z"
                            fill="currentColor"
                          />
                          <path
                            d="M13 16C13 16.5523 12.5523 17 12 17C11.4477 17 11 16.5523 11 16C11 15.4477 11.4477 15 12 15C12.5523 15 13 15.4477 13 16Z"
                            fill="currentColor"
                          />
                          <path
                            d="M17 16C17 16.5523 16.5523 17 16 17C15.4477 17 15 16.5523 15 16C15 15.4477 15.4477 15 16 15C16.5523 15 17 15.4477 17 16Z"
                            fill="currentColor"
                          />
                        </g>
                      </svg>
                      Lock Screen
                    </Link>
                  </li>
                  <li className="border-t border-white-light dark:border-white-light/10">
                    <Link to="/logout" className="text-danger !py-3">
                      <svg
                        className="ltr:mr-2 rtl:ml-2 rotate-90 shrink-0"
                        width="18"
                        height="18"
                        viewBox="0 0 24 24"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path
                          opacity="0.5"
                          d="M17 9.00195C19.175 9.01406 20.3529 9.11051 21.1213 9.8789C22 10.7576 22 12.1718 22 15.0002V16.0002C22 18.8286 22 20.2429 21.1213 21.1215C20.2426 22.0002 18.8284 22.0002 16 22.0002H8C5.17157 22.0002 3.75736 22.0002 2.87868 21.1215C2 20.2429 2 18.8286 2 16.0002L2 15.0002C2 12.1718 2 10.7576 2.87868 9.87889C3.64706 9.11051 4.82497 9.01406 7 9.00195"
                          stroke="currentColor"
                          strokeWidth="1.5"
                          strokeLinecap="round"
                        />
                        <path
                          d="M12 15L12 2M12 2L15 5.5M12 2L9 5.5"
                          stroke="currentColor"
                          strokeWidth="1.5"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        />
                      </svg>
                      Sign Out
                    </Link>
                  </li>
                </ul>
              </Dropdown>
            </div>
  : (
    <div className="flex space-x-4">
      <a
        href="/login"
        className="py-1.5 px-2 border rounded-md text-slate-900 dark:text-slate-50 hover:text-slate-50 hover:bg-gradient-to-r hover:from-orange-500 hover:to-orange-600 transition-colors duration-300"
      >
        Sign In
      </a>
      <a
        href="/register"
        className="py-1.5 px-2 text-white rounded-md bg-orange-500 hover:bg-gradient-to-r hover:from-orange-500 hover:to-orange-600 transition-colors duration-300"
      >
        Create an account
      </a>
    </div>
  );

  return (
    <nav className={`sticky top-0 z-50 py-3 px-7 ${
      isScrolled ? "backdrop-blur-md" : "bg-slate-50 dark:bg-slate-900"
    } border-b border-slate-200 dark:border-slate-700 transition-all duration-300`}>
      <div className="container px-4 mx-auto relative lg:text-sm">
        <div className="flex justify-between items-center">
          <div className="flex items-center flex-shrink-0">
            <img
              className="h-12 w-24 mr-2"
              src={themeConfig.isDarkMode ? logoDark : logoLight}
              alt="logo"
            />
          </div>
          <div className="hidden lg:flex lg:items-center lg:w-auto">
            <ul className="flex space-x-8">{renderNavLinks()}</ul>
          </div>
          <div className="hidden lg:flex lg:items-center lg:w-auto">
            <div className="flex items-center">
              {themeConfig.theme === "light" && (
                <button
                  className="flex items-center p-2 mr-8 rounded-full bg-white-light/40 dark:bg-slate-800 hover:text-primary hover:bg-white-light/90 dark:hover:bg-dark/60"
                  onClick={() => dispatch(toggleTheme("dark"))}
                >
                  <Sun className="text-slate-900 dark:text-slate-50" size="20" />
                </button>
              )}
              {themeConfig.theme === "dark" && (
                <button
                  className="flex items-center p-2 mr-8 rounded-full bg-white-light/40 dark:bg-slate-800 hover:text-primary hover:bg-white-light/90 dark:hover:bg-dark/60"
                  onClick={() => dispatch(toggleTheme("system"))}
                >
                  <Moon className="text-slate-900 dark:text-slate-50" size="20" />
                </button>
              )}
              {themeConfig.theme === "system" && (
                <button
                  className="flex items-center p-2 mr-8 rounded-full bg-white-light/40 dark:bg-slate-800 hover:text-primary hover:bg-white-light/90 dark:hover:bg-dark/60"
                  onClick={() => dispatch(toggleTheme("light"))}
                >
                  <Laptop className="text-slate-900 dark:text-slate-50" size="20" />
                </button>
              )}
            </div>
            {isDriver && (
              <div className="dropdown shrink-0 mr-8">
                <Dropdown
                  offset={[0, 8]}
                  placement="bottom-end"
                  btnClassName="relative block p-2 rounded-full bg-white-light/40 dark:bg-slate-800 hover:text-primary hover:bg-white-light/90 dark:hover:bg-dark/60"
                  button={
                    <span>
                      <Bell className="text-slate-900 dark:text-slate-50" size="20" />
                      {showConfirmation && (
                        <span className="flex absolute w-3 h-3 right-0 top-0">
                          <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-success/50 opacity-75"></span>
                          <span className="relative inline-flex rounded-full w-[6px] h-[6px] bg-success"></span>
                        </span>
                      )}
                    </span>
                  }
                >
                  <ul className="!py-0 text-dark dark:text-white-dark w-[300px] sm:w-[350px] divide-y dark:divide-white/10">
                    <li className="dark:text-white-light/90">
                      <div className="flex items-center px-4 py-2 justify-between font-semibold">
                        <h4 className="text-lg">Notifications</h4>
                        <span className="badge bg-primary/80">
                          {showConfirmation ? 1 : 0} New
                        </span>
                      </div>
                    </li>
                    {showConfirmation && (
                      <li className="dark:text-white-light/90">
                        <div onClick={handleClick} className="cursor-pointer bg-white dark:bg-slate-800 border-b border-slate-200 dark:border-slate-700 p-4">
                          <div className="flex items-start">
                            <div className="flex-shrink-0">
                              <Check className="h-6 w-6 text-green-400" aria-hidden="true" />
                            </div>
                            <div className="ml-3 w-full">
                              <p className="text-sm font-medium text-slate-900 dark:text-slate-100">
                                Nouvelle commande disponible pour livraison :
                              </p>
                              <p className="mt-1 text-sm text-slate-500 dark:text-slate-400">
                                Commande #{confirmationMessage.orderId} - Cliquez pour plus de détails
                              </p>
                            </div>
                          </div>
                        </div>
                      </li>
                    )}
                    {!showConfirmation && (
                      <li className="dark:text-white-light/90">
                        <div className="p-4 text-center">Aucune nouvelle notification</div>
                      </li>
                    )}
                  </ul>
                </Dropdown>
              </div>
            )}
            <div className="relative inline-block mr-8">
              <span className="absolute top-[-10px] right-[-10px] inline-flex items-center justify-center p-1 px-2 text-xs font-semibold text-white bg-primary rounded-full">
                {basketItems.reduce((total, item) => total + (item.quantity || 1), 0)}
              </span>
              <button
                onClick={toggleBasket}
                className="flex items-center justify-center p-2 rounded-full bg-white-light/40 dark:bg-slate-800 text-gray-700 bg-white"
              >
                <ShoppingBasket size="20" className="text-slate-900 dark:text-slate-50" />
              </button>
              {basketOpen && (
                <div className="absolute right-0 mt-2 w-64 bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-md shadow-lg">
                  <ul className="py-2">
                    {basketItems.map((item) => (
                      <li key={item.id} className="flex items-center px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-700">
                        <img src={item.image} alt={item.name} className="w-10 h-10 rounded-full mr-3" />
                        <div className="flex-1 space-y-2">
                          <h4 className="text-base font-semibold text-slate-900 dark:text-slate-50">
                            {item.name}
                          </h4>
                          <p className="text-sm font-medium text-primary">${item.price.toFixed(2)}</p>
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
                        ${basketItems.reduce((total, item) => total + item.price, 0).toFixed(2)}
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
              <Menu color={themeConfig.isDarkMode ? "#f1f5f9" : "#64748b"} size="24" />
            </button>
          </div>
        </div>
        {mobileDrawerOpen && (
          <div className="fixed inset-0 h-screen z-20 text-white backdrop-blur-md flex flex-col items-center justify-center lg:hidden">
            <div className="p-8 bg-slate-50 dark:bg-slate-900 rounded-lg border border-slate-200 dark:border-slate-700">
              <button className="absolute top-4 right-4 z-30" onClick={toggleNavbar}>
                <X color={themeConfig.isDarkMode ? "#f1f5f9" : "#64748b"} size="24" />
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
      {showConfirmation && (
        <ConfirmationNotification
          isOpen={isModalOpen}
          onClose={() => setIsModalOpen(false)}
          message="Nouvelle commande disponible pour livraison :"
          orderDetails={confirmationMessage}
          onConfirm={handleConfirmOrder}
          onDismiss={handleDismissConfirmation}
        />
      )}
    </nav>
  );
};

export default Navbar;