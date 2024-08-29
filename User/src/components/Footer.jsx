import React from 'react';
import { FaFacebook, FaTwitter, FaInstagram } from 'react-icons/fa';
import { Link } from 'react-router-dom';
import { FaArrowUp } from "react-icons/fa"
import { useShared } from '../SharedContext';

const Footer = () => {
  const { isDarkMode } = useShared();

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth',
    });
  };

  return (
    <footer className={`py-4 ${isDarkMode ? 'bg-gray-900 text-teal-400' : 'bg-teal-800 text-gray-100'} border-t border-gray-200`}>
      <div className=" w-full mx-auto px-4 flex justify-between items-center">
        <p className={`text-sm ${isDarkMode ? 'text-teal-400' : 'text-teal-100'}`}>
          &copy; {new Date().getFullYear()} Learn With Sensei | Designed with ❤️
        </p>
        <div className="flex items-center space-x-4">
          <p className="text-sm">
            <a href="mailto:learnwithsensei1@gmail.com" className={`hover:text-teal-200 transition-colors text-lg ${isDarkMode ? 'text-teal-400' : 'text-teal-100'}`}>
              learnwithsensei1@gmail.com
            </a>
          </p>
          <button 
            onClick={scrollToTop} 
            className={`p-2 rounded-full ${isDarkMode ? 'bg-teal-600 hover:bg-teal-500' : 'bg-gray-300 hover:bg-gray-400'} transition-colors`}
            aria-label="Scroll to top"
          >
            <FaArrowUp className={`${isDarkMode ? 'text-teal-100' : 'text-teal-900'}`} />
          </button>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
