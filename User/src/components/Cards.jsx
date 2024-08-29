// import React from 'react';
import image from '../assets/image.png';
import { Link } from "react-router-dom";
import { useTheme } from './ThemeContext';


const courses = [
  {
    title: 'Web Development Bootcamp',
    description: 'Learn to build modern web applications with HTML, CSS, and JavaScript.',
    imageUrl: image,
    lessons: 40,
     price: '$199'
  },
  {
    title: 'Data Structures & Algorithms',
    description: 'Master the fundamental data structures and algorithms for coding interviews.',
    imageUrl: image,
    lessons: 30,
     price: '$199'
  },
  {
    title: 'Machine Learning A-Z',
    description: 'Understand the basics of machine learning and build your first models.',
    imageUrl: image,
    lessons: 50,
     price: '$199'
  },
  {
    title: 'Web Development Bootcamp',
    description: 'Learn to build modern web applications with HTML, CSS, and JavaScript.',
    imageUrl: image,
    lessons: 40,
     price: '$199'
  },
  {
    title: 'Data Structures & Algorithms',
    description: 'Master the fundamental data structures and algorithms for coding interviews.',
    imageUrl: image,
    lessons: 30,
     price: '$199'
  },
  {
    title: 'Machine Learning A-Z',
    description: 'Understand the basics of machine learning and build your first models.',
    imageUrl: image,
    lessons: 50,
     price: '$199'
  },
  // Add more courses as needed
];

const Cards = () => {
  const { isDarkMode, toggleTheme } = useTheme();

  return (
    <div className={`w-full flex items-center justify-center content-center ${isDarkMode ? 'bg-gray-900' : 'bg-gray-100'} py-8`}>
      <div className="max-w-screen-lg w-full px-4">
        <div className='w-full p-4 mb-8 flex justify-between items-center'>
          <div>
            <h1 className={`text-2xl font-bold ${isDarkMode ? 'text-gray-200' : 'text-zinc-600'}`}>Top Courses</h1>
            <h4 className={`${isDarkMode ? 'text-gray-400' : 'text-gray-400'}`}>Explore our popular courses</h4>
          </div>
          <button className={`border ${isDarkMode ? 'border-gray-200 text-gray-200' : 'border-gray-900 text-gray-900'} font-semibold px-4 py-2 rounded-xl hover:text-gray-500 hover:border-gray-500 transition-colors duration-300`}>
            <Link to="/Course/allcourses">
              All Courses
            </Link>
          </button>
        </div>

        <div className="grid gap-8 grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-3">
          {courses.map((course, index) => (
            <div key={index} className={`border ${isDarkMode ? 'bg-gray-800 border-gray-700' : 'bg-white border-gray-200'} object-cover rounded-lg p-4 shadow-lg hover:shadow-2xl hover:-translate-y-1 transition ease-in-out duration-300 transform`}>
              <img src={course.imageUrl} alt={course.title} className="w-full h-40 object-cover rounded-t-lg mb-4" />
              <h4 className={`text-lg font-bold ${isDarkMode ? 'text-gray-200' : 'text-zinc-600'} mb-2`}>{course.title}</h4>
              <p className={`text-gray-500 mb-4 text-sm lg:text-md ${isDarkMode ? 'text-gray-100' : 'text-zinc-600'}`} style={{ height: '60px' }}>{course.description}</p>
              <p className="text-teal-500 font-semibold mb-4">{course.lessons} Lessons</p>
              <hr className={`${isDarkMode ? 'border-gray-500' : 'border-gray-300'}`}/>
              <div className="px-4 py-4" style={{ height: '50px' }}>
                <p className={`text-xl font-bold ${isDarkMode ? 'text-gray-200' : 'text-zinc-600'}`}>{course.price}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Cards;
