// src/components/Profile.js
import { useEffect, useState } from 'react';
import axios from 'axios';
import { Link,useNavigate } from 'react-router-dom';
// import Cards from './Cards';
import {ToastContainer,toast} from "react-toastify"
import { useShared } from '../SharedContext';
import { useTheme } from './ThemeContext';
import ProfileShimmer from './Shimmer/ProfileShimmer';
import Cookies from "js-cookie"

const Profile = () => {
  const {isDarkMode} = useTheme();
  const [user, setUser] = useState(null);
  const navigate = useNavigate();
  const { logout } = useShared();

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const response = await axios.get('http://localhost:8000/api/v1/users/profile', { withCredentials: true });
        console.log("yyyyyyyy : ",response.data.message);
        let x  = response.data.message
        Cookies.set('username', x.username, { expires: 1 });
        Cookies.set('fullname', x.fullName, { expires: 1 });
        Cookies.set('email', x.email, { expires: 1 });
        Cookies.set('userid', x._id, { expires: 1 });
        setUser(response.data.message);

        if (!localStorage.getItem('pageRefreshed')) {
          localStorage.setItem('pageRefreshed', 'true');
          navigate('/');
          window.location.reload();
        } 

      } catch (error) {
        console.error("Error fetching user:", error);
        navigate('/Login');
      }
    };

    fetchUser();
  }, [navigate]);


  const courses = [
    {
      id: 1,
      title: 'Introduction to Web Development',
      description: 'Learn the basics of HTML, CSS, and JavaScript.',
      image: 'https://via.placeholder.com/300',
    },
    {
      id: 2,
      title: 'React.js Crash Course',
      description: 'Build interactive user interfaces with React.js.',
      image: 'https://via.placeholder.com/300',
    },
    {
      id: 3,
      title: 'Node.js Fundamentals',
      description: 'Explore backend development with Node.js and Express.',
      image: 'https://via.placeholder.com/300',
    },
    {
      id: 4,
      title: 'Database Design and Management',
      description: 'Learn SQL and database management concepts.',
      image: 'https://via.placeholder.com/300',
    },
    {
      id: 5,
      title: 'Python for Data Science',
      description: 'Introduction to Python programming for data analysis.',
      image: 'https://via.placeholder.com/300',
    },
    {
      id: 6,
      title: 'UX/UI Design Principles',
      description: 'Fundamentals of user experience and interface design.',
      image: 'https://via.placeholder.com/300',
    },
  ];

  const handleLogout = () => {
    axios.get('http://localhost:8000/api/v1/users/logout', {
        withCredentials: true
    })
    .then(function (response) {     
        toast.success("Logout successfully!");
        console.log(response.data);
        logout();
        navigate('/Login');
        localStorage.removeItem('pageRefreshed');
    })
    .catch(function (error) {
        console.log(error);
    });
};
   
return (
  <div className={`min-h-screen ${isDarkMode ? 'bg-gray-900' : 'bg-gray-100'}`}>
    {user ? (
      <div className={`flex flex-col min-h-screen ${isDarkMode ? 'bg-gray-900 text-gray-100' : 'bg-gray-100 text-gray-900'}`}>

        <div className="container mx-auto px-4 mt-4">
          <h1 className={`text-3xl font-bold ${isDarkMode ? 'text-gray-100' : 'text-gray-900'}`}>User Profile</h1>
        </div>

        {/* Main Content */}
        <main className="flex-1">
          <div className="relative container mx-auto py-8 px-4">
            {/* Profile Card */}
            <div className={`relative ${isDarkMode ? 'bg-gray-800' : 'bg-white'} shadow-lg rounded-lg overflow-hidden`} style={{
              backgroundImage: `url(${user.avatar})`,
              backgroundSize: 'cover',
              backgroundPosition: 'center',
            }}>
              <div className="backdrop-blur-sm p-2">

                {/* User Information */}
                <div className={`px-6 py-4 rounded-lg m-auto w-96 z-10 ${isDarkMode ? 'bg-gray-700' : 'bg-white'}`}>
                  {/* Avatar */}
                  <div className='flex items-center justify-center mb-4'>
                    <div className={`w-40 h-40 overflow-hidden rounded-full border ${isDarkMode ? 'border-gray-700' : 'border-gray-300'}`}>
                      <img
                        src={user.avatar}
                        alt="User Avatar"
                        className="w-full h-full object-cover"
                      />
                    </div>
                  </div>
                  {/* User Information */}
                  <div className='text-center'>
                    <p className={`text-gray-400 mb-2 ${isDarkMode ? 'text-gray-400' : 'text-gray-600'}`}>@{user.username}</p>
                    <h2 className={`text-2xl font-bold mb-2 ${isDarkMode ? 'text-gray-100' : 'text-gray-900'}`}>{user.fullName}</h2>
                    <p className={`text-gray-400 ${isDarkMode ? 'text-gray-400' : 'text-gray-600'}`}>{user.email}</p>
                  </div>
                  {/* Action Buttons */}
                  <div className="flex justify-center pb-4">
                    <Link
                      to="/editprofile"
                      className={`bg-teal-600 hover:bg-teal-700 text-white px-4 py-2 rounded m-2 transition duration-200 ${isDarkMode ? 'hover:bg-teal-700' : 'hover:bg-teal-500'}`}
                    >
                      Edit Profile
                    </Link>
                    <button
                      className={`bg-rose-600 hover:bg-rose-700 text-white px-4 py-2 rounded m-2 transition duration-200 ${isDarkMode ? 'hover:bg-rose-700' : 'hover:bg-rose-500'}`}
                      onClick={handleLogout}
                    >
                      Logout
                    </button>
                  </div>
                </div>
              </div>
            </div>

            {/* Courses Section (Optional) */}
            <div className="mt-8">
              <h2 className={`text-2xl font-bold mb-4 ${isDarkMode ? 'text-gray-100' : 'text-gray-900'}`}>My Courses</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {courses.map(course => (
                  <div key={course.id} className={`border bg-gray-800 shadow-lg rounded-lg overflow-hidden ${isDarkMode ? 'bg-gray-800 border-gray-700' : 'bg-white'}`}>
                    <img src={course.image} alt={course.title} className="w-full h-40 object-cover" />
                    <div className="p-4">
                      <h3 className={`text-lg font-bold mb-2 ${isDarkMode ? 'text-gray-100' : 'text-gray-900'}`}>{course.title}</h3>
                      <p className={`text-gray-400 ${isDarkMode ? 'text-gray-400' : 'text-gray-600'}`}>{course.description}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </main>
      </div>
    ) : (
      // <p className={`text-center ${isDarkMode ? 'text-gray-100' : 'text-gray-900'}`}>Loading..</p>
      <ProfileShimmer/>
    )}
  </div>
);
};

export default Profile;
