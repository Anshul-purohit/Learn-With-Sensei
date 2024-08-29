import React from 'react';
import { FaFacebook, FaTwitter, FaInstagram } from 'react-icons/fa';
import { useTheme } from './ThemeContext';
import { Link } from 'react-router-dom';

const Footer = () => {
  const { isDarkMode } = useTheme();

  return (
    <footer className={`no-scrollbar ${isDarkMode ? 'bg-gray-800 text-gray-400' : 'bg-teal-800 text-gray-200'}`}>
      <div className="max-w-7xl mx-auto px-4 py-6 flex flex-wrap justify-between no-scrollbar">
        {/* About Us */}
        <div className="w-full md:w-1/4 mb-4 no-scrollbar">
          <h2 className="text-lg font-bold mb-2">About Us</h2>
          <p className="text-sm">We are a team of passionate developers making web development easier and more fun.</p>
        </div>

        {/* Quick Links */}
        <div className="w-full md:w-1/4 mb-4 no-scrollbar">
          <h2 className="text-lg font-bold mb-2">Quick Links</h2>
          <ul className="space-y-1">
            <li>
              <Link to="/" className="text-sm hover:text-gray-400">Home</Link>
            </li>
            <li><a href="#services" className="text-sm hover:text-gray-400">Services</a></li>
            <li><a href="#about" className="text-sm hover:text-gray-400">About</a></li>
            <li><a href="#contact" className="text-sm hover:text-gray-400">Contact</a></li>
          </ul>
        </div>

        {/* Contact Us */}
        <div className="w-full md:w-1/4 mb-4 no-scrollbar">
          <h2 className="text-lg font-bold mb-2">Contact Us</h2>
          <p className="text-sm">Email: learnwithsensei1@gmail.com</p>
        </div>
      </div>

      {/* Divider */}
      <hr className={`border-t ${isDarkMode ? 'border-gray-700' : 'border-gray-400'} mx-4`} />

      {/* Bottom Section */}
      <div className="max-w-7xl mx-auto px-4 py-2 flex justify-between items-center no-scrollbar">
        <p className={`text-sm ${isDarkMode ? 'text-gray-400' : 'text-gray-300'}`}>&copy; {new Date().getFullYear()} Learn With Sensei | Designed with ❤️</p>
      </div>
    </footer>
  );
};

export default Footer;
