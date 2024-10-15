import React from "react";
import { useContext } from "react";
import { FaFacebook, FaInstagram, FaTwitter, FaYoutube } from "react-icons/fa";
import paymentMethodsImage from "../../assets/img/payment.png";
import logoLight from "../../assets/img/logo-light.svg";
import logoDark from "../../assets/img/logo-dark.svg";
import { ThemeContext } from "../../contexts/ThemeContext";

const Footer = () => {
  const { isDarkMode } = useContext(ThemeContext);
 

  return (
    <footer className="bg-slate-50 dark:bg-slate-900 text-slate-600 dark:text-slate-200 py-12 border-t border-slate-200 dark:border-slate-700">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center mb-8">
          <div className="flex items-center">
            <img
              className="h-12 w-24 mr-2"
              src={isDarkMode ? logoDark : logoLight}
              alt="logo AlloMedia"
            />
          </div>
          <div className="flex space-x-4">
            <a
              href="#"
              className="bg-slate-200 text-slate-900 hover:bg-orange-500 hover:text-white p-2 rounded-full"
            >
              <FaFacebook />
            </a>
            <a
              href="#"
              className="bg-slate-200 text-slate-900 hover:bg-orange-500 hover:text-white p-2 rounded-full"
            >
              <FaInstagram />
            </a>
            <a
              href="#"
              className="bg-slate-200 text-slate-900 hover:bg-orange-500 hover:text-white p-2 rounded-full"
            >
              <FaTwitter />
            </a>
            <a
              href="#"
              className="bg-slate-200 text-slate-900 hover:bg-orange-500 hover:text-white p-2 rounded-full"
            >
              <FaYoutube />
            </a>
          </div>
        </div>

        <div className="grid grid-cols-1 py-10 border-t border-slate-200 dark:border-slate-700 md:grid-cols-4 gap-8">
          <div>
            <h3 className="text-slate-900 dark:text-slate-50 text-lg font-semibold mb-4">
              Pagedone
            </h3>
            <ul className="space-y-2">
              <li>
                <a
                  href="#"
                  className="dark:text-slate-400 text-slate-700 hover:text-orange-500"
                >
                  Home
                </a>
              </li>
              <li>
                <a
                  href="#"
                  className="dark:text-slate-400 text-slate-700 hover:text-orange-500"
                >
                  About
                </a>
              </li>
              <li>
                <a
                  href="#"
                  className="dark:text-slate-400 text-slate-700 hover:text-orange-500"
                >
                  Pricing
                </a>
              </li>
              <li>
                <a
                  href="#"
                  className="dark:text-slate-400 text-slate-700 hover:text-orange-500"
                >
                  Pro Version
                </a>
              </li>
            </ul>
          </div>
          <div>
            <h3 className="text-slate-900 dark:text-slate-50 text-lg font-semibold mb-4">
              Products
            </h3>
            <ul className="space-y-2">
              <li>
                <a
                  href="#"
                  className=" text-slate-700 dark:text-slate-400 hover:text-orange-500"
                >
                  Figma UI System
                </a>
              </li>
              <li>
                <a
                  href="#"
                  className=" text-slate-700 dark:text-slate-400 hover:text-orange-500"
                >
                  Icons Assets
                </a>
              </li>
              <li>
                <a
                  href="#"
                  className=" text-slate-700 dark:text-slate-400 hover:text-orange-500"
                >
                  Responsive Blocks
                </a>
              </li>
              <li>
                <a
                  href="#"
                  className=" text-slate-700 dark:text-slate-400 hover:text-orange-500"
                >
                  Components Library
                </a>
              </li>
            </ul>
          </div>
          <div>
            <h3 className="text-slate-900 dark:text-slate-50 text-lg font-semibold mb-4">
              Resources
            </h3>
            <ul className="space-y-2">
              <li>
                <a
                  href="#"
                  className="text-slate-700 dark:text-slate-400 hover:text-orange-500"
                >
                  FAQs
                </a>
              </li>
              <li>
                <a
                  href="#"
                  className="text-slate-700 dark:text-slate-400 hover:text-orange-500"
                >
                  Quick Start
                </a>
              </li>
              <li>
                <a
                  href="#"
                  className="text-slate-700 dark:text-slate-400 hover:text-orange-500"
                >
                  Documentation
                </a>
              </li>
              <li>
                <a
                  href="#"
                  className="text-slate-700 dark:text-slate-400 hover:text-orange-500"
                >
                  User Guide
                </a>
              </li>
            </ul>
          </div>
          <div>
            <h3 className="text-slate-900 dark:text-slate-50 text-lg font-semibold mb-4">
              Newsletter
            </h3>
            <form className="space-y-4">
              <div className="relative">
                <input
                  type="email"
                  placeholder="mail@allomedia.com"
                  className="w-full bg-slate-50 dark:bg-slate-800 border text-sm border-slate-300 dark:border-slate-700 rounded-md px-4 py-2 pr-24 focus:outline-none focus:ring-1 focus:ring-orange-500"
                />
                <button
                  type="submit"
                  className="absolute rounded-e-md bottom-0 top-0 right-0 bg-orange-500 text-white px-4 py-1 hover:bg-orange-600 transition duration-300"
                >
                  Send
                </button>
              </div>
              <div className="flex items-start justify-start space-x-2">
                <input
                  type="checkbox"
                  id="terms"
                  className="rounded accent-orange-500 focus:ring-orange-500"
                />
                <label htmlFor="terms" className="text-sm align-top">
                  I agree with{" "}
                  <a href="#" className="text-orange-500">
                    Privacy Policy
                  </a>{" "}
                  and{" "}
                  <a href="#" className="text-orange-500">
                    Terms of Condition
                  </a>
                </label>
              </div>
            </form>
          </div>
        </div>

        <div className="flex flex-col md:flex-row justify-between items-center pt-8 border-t border-slate-200 dark:border-slate-700">
          <p className="text-center text-sm text-slate-900 dark:text-slate-200">
            Copyright © {new Date().getFullYear()}{" "}
            <a
              href="#"
              className="font-medium text-slate-700 dark:text-slate-200 hover:text-orange-500 transition-colors duration-300"
            >
              AlloMedia
            </a>{" "}
            - All rights reserved
          </p>
          <div className="flex items-center space-x-4">
            <img
              src={paymentMethodsImage}
              alt="Payment methods"
              className="h-8 object-contain"
            />
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
