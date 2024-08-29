// import React from 'react';
// import { Link } from 'react-router-dom';
import { FaLaptopCode, FaDatabase, FaCogs, FaProjectDiagram, FaBrain, FaRobot, FaMobileAlt, FaPalette } from 'react-icons/fa';
import { useShared } from '../SharedContext';



const categories = [
  { name: 'Web Development', courses: 34, icon: <FaLaptopCode /> },
  { name: 'Data Structures', courses: 34, icon: <FaDatabase /> },
  { name: 'Algorithms', courses: 34, icon: <FaCogs /> },
  { name: 'Database', courses: 34, icon: <FaProjectDiagram /> },
  { name: 'Machine Learning', courses: 34, icon: <FaBrain /> },
  { name: 'Artificial Intelligence', courses: 34, icon: <FaRobot /> },
  { name: 'Android Development', courses: 34, icon: <FaMobileAlt /> },
  { name: 'UX/UI Design', courses: 34, icon: <FaPalette /> },
];

const CategoryCard = () => {
  const { isDarkMode, toggleTheme } = useShared();

  return (
    <div className={`w-full relative flex items-center justify-center content-center ${isDarkMode ? 'bg-gray-900' : 'bg-gray-100'}`}>
      
      {/* Main content with cards */}
      <div className="max-w-screen-lg w-full px-4 py-8 relative z-10">
        <div className='w-full p-4 mb-8 flex justify-between items-center'>
          <div>
            <h1 className={`text-2xl font-bold ${isDarkMode ? 'text-zinc-200' : 'text-zinc-600'}`}>Top Categories</h1>
            <h4 className={`${isDarkMode ? 'text-gray-400' : 'text-gray-400'}`}>Explore our popular Categories</h4>
          </div>
          <button className={`border ${isDarkMode ? 'border-gray-200 text-gray-200' : 'border-gray-900 text-gray-900'} font-semibold px-4 py-2 rounded-xl hover:text-gray-500 hover:border-gray-500 transition-colors duration-300`} onClick={toggleTheme}>
            All Categories
          </button>
        </div>
        <div className="grid gap-8 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
          {categories.map((category, index) => (
            <div key={index} className={`size-56 border ${isDarkMode ? 'bg-gray-800 border border-gray-700' : 'bg-white border border-gray-300'} rounded-lg flex flex-col items-center justify-center hover:-translate-y-1 border hover:border-teal-500 hover:shadow-2xl transition ease-in-out duration-300 transform`}>
              <div className={`text-4xl ${isDarkMode ? 'text-teal-300' : 'text-teal-500'} mb-2`}>
                {category.icon}
              </div>
              <h4 className={`text-lg font-bold ${isDarkMode ? 'text-zinc-200' : 'text-zinc-600'}`}>{category.name}</h4>
              <h6 className={`${isDarkMode ? 'text-gray-400' : 'text-gray-400'}`}>{category.courses} Courses</h6>
            </div>
          ))}
        </div>
      </div>
    </div>

  );
};

export default CategoryCard;
