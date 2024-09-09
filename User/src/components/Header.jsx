import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { FaBars, FaUserCircle } from "react-icons/fa";
import { useShared } from '../SharedContext';
import axios from "axios";
import { toast } from "react-toastify"
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSun, faMoon } from '@fortawesome/free-solid-svg-icons';
import '../style.css';
import logo from '../assets/logo2.png';

const Header = () => {
  const { isDarkMode, toggleTheme } = useShared();
  const { isToggleOpen, handleToggleOpen, isAuthenticated, logout } = useShared();
  const [showProfileMenu, setShowProfileMenu] = useState(false);
  const navigate = useNavigate();
  const {apiBaseUrl} = useShared()

  const handleProfileClick = () => {
    setShowProfileMenu(!showProfileMenu);
  };

  const handleLogout = () => {
    axios.get(`${apiBaseUrl}/users/logout`, {
        withCredentials: true
    })
    .then(function (response) {     
        toast.success("Logout successfully!");
        console.log(response.data);
        logout();
        setShowProfileMenu(false);
        navigate('/login');
        localStorage.removeItem('pageRefreshed');
    })
    .catch(function (error) {
        console.log(error);
    });
};

  return (
    <>
      <div  className = {`flex items-center justify-between flex-wrap bg-gradient-to-r from-teal-300 to-emerald-900 p-2 w-full z-10 top-0 font-semibold text-lg `}>
       
        <div className="flex items-center flex-shrink-0 text-white mr-6">
          <Link to={"/"} className="text-white no-underline hover:text-white hover:no-underline">
            <span className="text-2xl pl-2 flex items-center space-x-2">
              <i className="em em-grinning text-4xl animated-bounceIn"></i>
                <span className="font-bold text-gray-800 ">
                    {/* LearnWithSensei */}
                    <div className="flex flex-row items-center">
                      <img src={logo} alt='LOGO' className="w-16 h-16 transition-transform duration-300 transform hover:scale-110 hover:text-teal-600" />
                      <div className="flex-1 h-16 pt-3">
                        <p className="text-sm mb-0 leading-tight">Learn With</p>
                        <p className="font-bold leading-tight">SENSEI</p>
                      </div>
                    </div>
                </span>
            </span>          
          </Link>
        </div>

        <div className="block lg:hidden">
          <FaBars className="flex items-center" onClick={handleToggleOpen} />
        </div>

        <div  className={`text-xl w-full flex-grow lg:flex  lg:w-auto lg:block pt-6 lg:pt-0  ${isToggleOpen?'flex-row hidden':'flex-col'} `}>
          <ul className="list-reset lg:flex justify-end flex-1 items-center">
            <li className="mr-3 ">
              <Link to={"/"} className={`inline-block py-2 px-4 ${isDarkMode ? 'text-gray-800 ' : 'text-gray-200'} font-bold hover:bg-teal-500 no-underline w-full lg:w-32 rounded text-center`}>
                Home
              </Link>
            </li>
            {isAuthenticated && 
              <li className="mr-3">
                <Link to={"/course/usercourses"} className={`inline-block py-2 px-4 ${isDarkMode ? 'text-gray-800 ' : 'text-gray-200'} font-bold hover:bg-teal-500 no-underline w-full lg:w-36 rounded text-center`}>
                  My Courses
                </Link>
              </li>
            }
            <li className="mr-3">
              <Link to={"/course/allcourses"} className={`inline-block py-2 px-4 ${isDarkMode ? 'text-gray-800 ' : 'text-gray-200'} font-bold hover:bg-teal-500 no-underline w-full lg:w-36 rounded text-center`}>
                All Courses
              </Link>
            </li>
            <li className="mr-3">
              <Link to={"/about"} className={`inline-block py-2 px-4 ${isDarkMode ? 'text-gray-800 ' : 'text-gray-200'} font-bold hover:bg-teal-500 no-underline w-full lg:w-32 rounded text-center`}>
                About
              </Link>
            </li>
            {isAuthenticated  ? (
              <li className="relative group">
                <div className="flex items-center space-x-2 cursor-pointer">
                  <FaUserCircle 
                    className={`size-10 inline-block py-2 px-4 ${isDarkMode ? 'text-gray-800' : 'text-gray-200'} font-bold no-underline w-full lg:w-12 rounded-full text-center hover:bg-teal-500`}                      
                  />
                </div>
                <div className={`absolute right-0 mt-2 w-48 opacity-0 group-hover:opacity-100 transform scale-95 group-hover:scale-100 transition-all duration-200 ease-in-out ${isDarkMode ? 'bg-gray-700' : 'bg-white'} shadow-lg z-50`}>
                  <Link to="/profile" className={`block px-4 py-2 ${isDarkMode ? 'text-gray-200 hover:bg-gray-600' : 'text-gray-800 hover:bg-gray-100'}`}>My Profile</Link>
                  <Link to="/editprofile" className={`block px-4 py-2 ${isDarkMode ? 'text-gray-200 hover:bg-gray-600' : 'text-gray-800 hover:bg-gray-100'}`}>Edit Profile</Link>
                  <div className={`block px-4 py-2 ${isDarkMode ? 'text-gray-200 hover:bg-gray-600' : 'text-gray-800 hover:bg-gray-100'} cursor-pointer`} onClick={handleLogout}>Logout</div>
                </div>
              </li>            
            ) : (
              <li>
                <Link to={"/login"} className={`inline-block py-2 px-4 ${isDarkMode ? 'text-gray-800 ' : 'text-gray-200'} font-bold hover:bg-teal-500 no-underline w-full lg:w-32 rounded text-center`}>
                  Sign in
                </Link>
              </li>
            )}
            
            <li className="mr-3 px-4">
               <button
                    className={`inline-block py-2 px-4 ${isDarkMode ? 'text-gray-800 ' : 'text-gray-200'} font-bold  no-underline w-full lg:w-12 rounded-full text-center`}                      
                    onClick={toggleTheme}
                    >
                    <FontAwesomeIcon 
                            icon={isDarkMode ? faMoon : faSun} 
                            className="text-2xl m-auto "
                    />
               </button>
            </li>
          </ul>
        </div>

      </div>
    </>
  );
};

export default Header;
