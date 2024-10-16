import { Menu, X } from "lucide-react";
import { useState, useEffect } from "react";
import logoLight from "../../../assets/img/logo-light.svg";
import logoDark from "../../../assets/img/logo-dark.svg";
import { IoMoon, IoSunny } from "react-icons/io5";
import { useSelector, useDispatch } from 'react-redux';
import { toggleDarkMode } from '../../../store/themeSlice';

const Navbar = () => {
  const [mobileDrawerOpen, setMobileDrawerOpen] = useState(false);
  const isDarkMode = useSelector((state) => state.theme.isDarkMode);
  const dispatch = useDispatch();
  const [isScrolled, setIsScrolled] = useState(false);

  const handleToggleDarkMode = () => {
    dispatch(toggleDarkMode());
  };

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

  const toggleNavbar = () => {
    setMobileDrawerOpen(!mobileDrawerOpen);
  };

  const renderNavLinks = () => (
    <>
      {['Home', 'Services', 'About Us', 'Contact Us', 'FAQ'].map((link) => (
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
    <>
      <a
        href="/auth/login"
        className="py-1 px-2 border rounded-md text-slate-900 dark:text-slate-50 hover:text-slate-50 hover:bg-gradient-to-r hover:from-orange-500 hover:to-orange-600 transition-colors duration-300"
      >
        Sign In
      </a>
      <a
        href="/auth/role-selection"
        className="py-1 px-2 text-white rounded-md bg-orange-500 hover:bg-gradient-to-r hover:from-orange-500 hover:to-orange-600 transition-colors duration-300"
      >
        Create an account
      </a>
    </>
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
              src={isDarkMode ? logoDark : logoLight}
              alt="logo"
            />
          </div>
          <ul className="hidden text-slate-900 font-medium dark:text-slate-50 lg:flex ml-14 space-x-12">
            {renderNavLinks()}
          </ul>
          <div className="hidden lg:flex justify-center space-x-12 items-center">
            <button
              onClick={handleToggleDarkMode}
              className="border border-slate-300 dark:border-slate-400 rounded-full p-2"
            >
              {isDarkMode ? (
                <IoMoon color="#f1f5f9" size="20" />
              ) : (
                <IoSunny color="#94a3b8" size="20" />
              )}
            </button>
            {renderAuthButtons()}
          </div>
          <div className="lg:hidden flex items-center">
            <button
              onClick={handleToggleDarkMode}
              className="border border-slate-300 dark:border-slate-400 rounded-full p-2 mr-4"
            >
              {isDarkMode ? <IoMoon color="#f1f5f9" size="20" /> : <IoSunny color="#94a3b8" size="20" />}
            </button>
            <button onClick={toggleNavbar}>
              {mobileDrawerOpen ? (
                <X size="24" />
              ) : (
                <Menu size="24" />
              )}
            </button>
          </div>
        </div>
        {mobileDrawerOpen && (
          <div className="fixed inset-0 z-20 text-white bg-slate-50 dark:bg-slate-900 p-12 flex flex-col justify-center items-center lg:hidden">
            <button
              onClick={toggleNavbar}
              className="absolute top-4 right-4 text-slate-900 dark:text-slate-50"
            >
              <X size="24" />
            </button>
            <ul className="space-y-4 mt-8 text-slate-900 dark:text-slate-50">
              {renderNavLinks()}
            </ul>
            <div className="flex space-x-6 mt-8">
              {renderAuthButtons()}
            </div>
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navbar;