import { FaLaptopCode, FaDatabase, FaPalette, FaCogs } from 'react-icons/fa';
import { useShared } from '../SharedContext';
import { useNavigate } from 'react-router-dom';
import { useEffect, useState } from 'react';
import axios from 'axios';



// const categories = [
//   { name: 'Web Development', courses: 34, icon: <FaLaptopCode /> },
//   { name: 'Data Structures', courses: 34, icon: <FaDatabase /> },
//   { name: 'Algorithms', courses: 34, icon: <FaCogs /> },
//   { name: 'Database', courses: 34, icon: <FaProjectDiagram /> },
//   { name: 'Machine Learning', courses: 34, icon: <FaBrain /> },
//   { name: 'Artificial Intelligence', courses: 34, icon: <FaRobot /> },
//   { name: 'Android Development', courses: 34, icon: <FaMobileAlt /> },
//   { name: 'UX/UI Design', courses: 34, icon: <FaPalette /> },
// ];

const CategoryCard = () => {
  const { isDarkMode,apiBaseUrl } = useShared();
  const navigate = useNavigate()
  const [cat,setCat] = useState()

  useEffect(() => {
    axios.get(`${apiBaseUrl}/dashboard`, {
      withCredentials: true
    })
      .then(function (response) {
        // console.log("f : ",response.data.data)
        setCat(response.data.data.countEachCategory);
      })
      .catch(function (error) {
        console.log(error);
    });

  },[apiBaseUrl])

  return (
    <div className={`w-full relative flex items-center justify-center content-center ${isDarkMode ? 'bg-gray-900' : 'bg-gray-100'}`}>
      
      {/* Main content with cards */}
      <div className="max-w-screen-lg w-full px-4 py-8 relative z-10">
        <div className='w-full p-4 mb-8 flex justify-between items-center'>
          <div>
            <h1 className={`text-2xl font-bold ${isDarkMode ? 'text-zinc-200' : 'text-zinc-600'}`}>Top Categories</h1>
            <h4 className={`${isDarkMode ? 'text-gray-400' : 'text-gray-400'}`}>Explore our popular Categories</h4>
          </div>
          <button 
            className={`border ${isDarkMode ? 'border-gray-200 text-gray-200' : 'border-gray-900 text-gray-900'} font-semibold px-4 py-2 rounded-xl hover:text-gray-500 hover:border-gray-500 transition-colors duration-300`} 
            onClick={() => navigate('/course/allcourses')}
          >
            All Categories
          </button>
        </div>
        <div className="grid gap-8 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-4">
        {cat && cat.map((category, index) => (
          <div key={index} className={`size-56 border ${isDarkMode ? 'bg-gray-800 border-gray-700' : 'bg-white border-gray-300'} rounded-lg flex flex-col items-center justify-center hover:-translate-y-1 border hover:border-teal-500 hover:shadow-2xl transition ease-in-out duration-300 transform`}>
            <div className={`text-4xl flex items-center justify-center ${isDarkMode ? 'text-teal-300' : 'text-teal-500'} mb-2`}>
              {category._id === "Web Development" && <FaLaptopCode />}
              {category._id === "Data Structure & Algorithm" && <FaDatabase />}
              {category._id === "UI/UX Design" && <FaPalette />}
              {category._id === "System Design" && <FaCogs />}
            </div>
            <h4 className={`text-lg font-bold text-center ${isDarkMode ? 'text-zinc-200' : 'text-zinc-600'}`}>
              {category._id}
            </h4>
            <h6 className={`text-center ${isDarkMode ? 'text-gray-400' : 'text-gray-400'}`}>
              {category.count} Courses
            </h6>
          </div>
        ))}
        </div>
      </div>
    </div>

  );
};

export default CategoryCard;
