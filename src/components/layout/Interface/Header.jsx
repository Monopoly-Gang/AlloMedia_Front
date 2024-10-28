import React, { useState, useEffect, useCallback, useRef } from 'react';
import {
  Menu,
  X,
  Moon,
  Sun,
  Laptop,
  Bell,
  ShoppingBasket,
  Trash2,
  Check
} from "lucide-react";
import logoLight from "../../../assets/img/logo-light.svg";
import logoDark from "../../../assets/img/logo-dark.svg";
import { useSelector, useDispatch } from "react-redux";
import { toggleTheme } from "../../../store/themeConfigSlice";
import Dropdown from "../Dashboard/Dropdown";
import { useTranslation } from "react-i18next";
import { useNavigate } from "react-router-dom";
import ConfirmationNotification from '../../ConfirmationNotification';
import { removeFromCart } from "../../../store/cartSlice";

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


  const themeConfig = useSelector((state) => state.themeConfig);
  const dispatch = useDispatch();
  const { t } = useTranslation();
  const navigate = useNavigate();
  const basketMenuRef =useRef(null);
  const basketItems = useSelector((state)=>state.cart.items);
  const totalAmount = useSelector((state)=>state.cart.totalAmount);



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



  useEffect(() => {
    const handleOutsideClick = (event) => {
      if (basketMenuRef.current && !basketMenuRef.current.contains(event.target)) {
        setBasketOpen(prev => !prev); 
      }
    };
  
    document.addEventListener("mousedown", handleOutsideClick);
    return () => {
      document.removeEventListener("mousedown", handleOutsideClick);
    };
  }, []);


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

  const toggleBasket = () => {
    setBasketOpen(!basketOpen);
  };

  



  const removeNotification = (id) => {
    setNotifications(notifications.filter((notif) => notif.id !== id));
  };
  const toggleNavbar = () => setMobileDrawerOpen(!mobileDrawerOpen);
 

  const handleRemoveFromCart = (id) => {
    dispatch(removeFromCart(id));
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

  const calculateTotaPrice = (quantity,price) =>{
    return (quantity*price).toFixed(2);
  }

  const handleViewCart = () => {
    setBasketOpen(prev => !prev); 
    navigate("/cart");
  }

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
                {basketItems.length}
              </span>
              <button
                onClick={toggleBasket}
                className="flex items-center justify-center p-2 rounded-full bg-white-light/40 dark:bg-slate-800 text-gray-700 bg-white"
              >
                <ShoppingBasket size="20" className="text-slate-900 dark:text-slate-50" />
              </button>
              {basketOpen && (
                <div ref={basketMenuRef} className="absolute right-0 mt-2 w-64 bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-md shadow-lg">
                  <ul className="py-2">
                    {basketItems.map((item) => (
                      <li key={item.id} className="flex items-center px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-700">
                        <img src={item.image} alt={item.name} className="w-10 h-10 rounded-full mr-3" />
                        <div className="flex-1 space-y-2">
                          <h4 className="text-base font-semibold text-slate-900 dark:text-slate-50">
                            {item.name}
                          </h4>
                          <p className="text-sm font-medium text-primary">
                            ${calculateTotaPrice(item.quantity,item.price)}
                           
                          </p>
                        </div>
                        <button
                          onClick={() => handleRemoveFromCart(item.id)}
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
                        ${totalAmount}
                      </span>
                    </div>
                    <button
                      onClick={handleViewCart} 
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