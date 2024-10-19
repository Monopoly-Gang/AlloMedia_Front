import { Menu, X, Moon, Sun, Laptop } from "lucide-react";
import { useState, useEffect } from "react";
import logoLight from "../../../assets/img/logo-light.svg";
import logoDark from "../../../assets/img/logo-dark.svg";
import { useSelector, useDispatch } from "react-redux";
import { toggleTheme } from "../../../store/themeConfigSlice";

const Navbar = () => {
  const [mobileDrawerOpen, setMobileDrawerOpen] = useState(false);
  const themeConfig = useSelector((state) => state.themeConfig);
  const dispatch = useDispatch();
  const [isScrolled, setIsScrolled] = useState(false);

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
      document.body.style.overflow = "auto"; // Reset on component unmount
    };
  }, [mobileDrawerOpen]);

  const toggleNavbar = () => {
    console.log("Toggling Navbar, current state:", mobileDrawerOpen);
    setMobileDrawerOpen(!mobileDrawerOpen);
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
            {themeConfig.theme === "light" ? (
              <button
                className="flex items-center p-2 mr-8 rounded-full bg-white-light/40 dark:bg-dark/40 hover:text-primary hover:bg-white-light/90 dark:hover:bg-dark/60"
                onClick={() => {
                  dispatch(toggleTheme("dark"));
                }}
              >
                <Moon color="#64748b" size="20" />
              </button>
            ) : null}
            {themeConfig.theme === "dark" && (
              <button
                className="flex items-center p-2 mr-8 rounded-full bg-white-light/40 dark:bg-slate-800 hover:text-primary hover:bg-white-light/90 dark:hover:bg-dark/60"
                onClick={() => {
                  dispatch(toggleTheme("system"));
                }}
              >
                <Sun color="#94a3b8" size="20" />
              </button>
            )}
            {themeConfig.theme === "system" && (
              <button
                className="flex items-center p-2 mr-8 rounded-full bg-white-light/40 dark:bg-slate-800 hover:text-primary hover:bg-white-light/90 dark:hover:bg-dark/60"
                onClick={() => {
                  dispatch(toggleTheme("light"));
                }}
              >
                <Laptop color="#94a3b8" size="20" />
              </button>
            )}
            {renderAuthButtons()}
          </div>
          <div className="lg:hidden flex items-center">
            <div>
              {themeConfig.theme === "light" ? (
                <button
                  className="flex items-center p-2 mr-8 rounded-full bg-white-light/40 dark:bg-dark/40 hover:text-primary hover:bg-white-light/90 dark:hover:bg-dark/60"
                  onClick={() => {
                    dispatch(toggleTheme("dark"));
                  }}
                >
                  <Sun color="#64748b" size="20" />
                </button>
              ) : null}
              {themeConfig.theme === "dark" && (
                <button
                  className="flex items-center p-2 mr-8 rounded-full bg-white-light/40 dark:bg-slate-800 hover:text-primary hover:bg-white-light/90 dark:hover:bg-dark/60"
                  onClick={() => {
                    dispatch(toggleTheme("system"));
                  }}
                >
                  <Moon color="#94a3b8" size="20" />
                </button>
              )}
              {themeConfig.theme === "system" && (
                <button
                  className="flex items-center p-2 mr-8 rounded-full bg-white-light/40 dark:bg-slate-800 hover:text-primary hover:bg-white-light/90 dark:hover:bg-dark/60"
                  onClick={() => {
                    dispatch(toggleTheme("light"));
                  }}
                >
                  <Laptop color="#94a3b8" size="20" />
                </button>
              )}
            </div>

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