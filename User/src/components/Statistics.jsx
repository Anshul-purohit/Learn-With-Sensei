// import React from 'react';
import GirlImg from '../assets/girl-image.jpg';
import { useTheme } from './ThemeContext';

const statisticsData = [
  { id: 1, label: 'Students Joined', value: '1,200' },
  { id: 2, label: 'Courses Available', value: '150' },
  { id: 3, label: 'Instructors', value: '30' },
  { id: 4, label: 'Certifications', value: '500+' },
];

const Statistics = () => {
  const { isDarkMode } = useTheme();
  return (
    <>
      <div className={`w-full flex flex-col items-center justify-center text-left ${isDarkMode ? 'bg-gray-900' : 'bg-gray-100'} py-8`}>
        <div className="max-w-screen-lg w-full px-4 py-8">
          <div className={`relative w-full bg-gradient-to-r ${isDarkMode ? 'from-teal-600 to-rose-600' : 'from-teal-300 to-rose-300'} h-56 mb-32 rounded-xl flex flex-col justify-center items-start text-left p-6 overflow-hidden`}>
            {/* Animated Background Circles */}
            <div className="absolute inset-0 flex justify-center items-center">
              <div className={`absolute w-32 h-32 rounded-full ${isDarkMode ? 'bg-teal-700' : 'bg-teal-200'} opacity-40 animate-pulse`} style={{ top: '10%', left: '10%' }}></div>
              <div className={`absolute w-32 h-32 rounded-full ${isDarkMode ? 'bg-rose-700' : 'bg-rose-200'} opacity-40 animate-pulse`} style={{ bottom: '10%', right: '10%' }}></div>
            </div>
            <h2 className={`text-2xl lg:text-4xl font-bold ${isDarkMode ? 'text-gray-800' : 'text-gray-600'} mb-4 transform translate-y-4`}>
              Join Our Community of Learners!
            </h2>
            <p className={`${isDarkMode?'text-gray-300':'text-gray-500'} text-base lg:text-lg mb-6 font-semibold transform translate-y-4`}>
              Unlock exclusive content, gain access to expert-led courses, and take the next step in your career.
            </p>
            <a href="/signup" className={`w-40 ${isDarkMode ? 'bg-gray-800 text-teal-400 hover:bg-gray-700' : 'bg-gray-200 text-teal-800 hover:bg-gray-300'} font-semibold px-6 py-3 rounded-lg transition-colors duration-300 transform translate-y-4`}>
              Explore More
            </a>
          </div>
          {/* Statistics Cards */}
          <div className="grid gap-8 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-4 items-center justify-center mb-8">
            {statisticsData.map((stat) => (
              <div key={stat.id} className={`bg-gray-200 ${isDarkMode ? 'bg-gray-300' : ''} rounded-lg flex flex-col items-center justify-center p-4`} style={{ height: "150px" }}>
                <h2 className={`text-2xl font-bold ${isDarkMode ? 'text-red-500' : 'text-red-400'}`}>{stat.value}</h2>
                <h4 className={`text-md font-bold ${isDarkMode ? 'text-zinc-500' : 'text-zinc-500'}`}>{stat.label}</h4>
              </div>
            ))}
          </div>

          {/* Benefits Section */}
          <div className={`flex flex-col md:flex-row items-center justify-between ${isDarkMode ? 'bg-gray-900' : 'bg-gray-100'} overflow-hidden mt-32`}>
            {/* Image */}
            <div className="md:w-1/2">
              <img src={GirlImg} alt="Benefits" className="w-full  object-cover" style={{ height: "495px" }} />
            </div>
            {/* Text */}
            <div className={`md:w-1/2 p-6 ${isDarkMode ? 'bg-teal-700' : 'bg-teal-200'}`} style={{ height: "495px" }}>
              <h2 className={`text-2xl font-bold ${isDarkMode ? 'text-zinc-300' : 'text-zinc-600'} mb-4 transform translate-y-4`}>Why Join Us?</h2>
              <ul className={`list-disc list-inside ${isDarkMode ? 'text-gray-300' : 'text-gray-600'} transform translate-y-4`}>
                <li className="mb-2">Access to high-quality courses from experienced instructors.</li>
                <li className="mb-2">Earn recognized certifications to boost your career.</li>
                <li className="mb-2">Join a community of learners and grow your network.</li>
                <li className="mb-2">Flexible learning schedule to suit your pace.</li>
                <li className="mb-2">24/7 access to course materials and resources.</li>
              </ul>
            </div>
          </div>
        </div>
      </div>

      {/* Call to Action */}
      <div className={`w-full ${isDarkMode ? 'bg-gray-900 text-gray-300' : 'bg-gray-100 text-gray-700'} py-12 px-4 flex flex-col items-center`}>
        <div className="max-w-screen-lg text-center mb-8">
          <h2 className="text-3xl font-bold mb-4">Unlock Your Potential with Our Courses!</h2>
          <p className="text-lg mb-6">Join our platform to get access to world-class education and take your skills to the next level.</p>
          <a href="/signup" className={`bg-yellow-400 ${isDarkMode ? 'dark:bg-yellow-500 text-teal-800 dark:text-teal-800 hover:bg-yellow-300 dark:hover:bg-yellow-400' : 'text-teal-900 hover:bg-yellow-300'} font-semibold px-6 py-3 rounded-lg transition-colors duration-300`}>
            Get Started
          </a>
        </div>
        <div className="grid sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3 md:flex-row items-center justify-center gap-8">
          {/* Feature 1 */}
          <div className={` ${isDarkMode ? 'bg-gray-700' : 'bg-white'} text-teal-800 ${isDarkMode ? 'text-teal-400' : ''} p-6 rounded-lg shadow-lg flex flex-col items-center`}>
            <svg className="w-12 h-12 mb-4" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
              <path d="M10 2a8 8 0 11-8 8 8 8 0 018-8zM9 5.586V9a1 1 0 001 1h2.414l-2.707 2.707a1 1 0 001.414 1.414l4-4a1 1 0 000-1.414l-4-4a1 1 0 00-1.414 1.414L11.414 8H9a1 1 0 00-1 1z" />
            </svg>
            <h3 className="text-xl font-semibold mb-2">Flexible Learning</h3>
            <p className={`${isDarkMode ? 'text-gray-300' : 'text-gray-700'}`}>Learn at your own pace with 24/7 access to all course materials.</p>
          </div>
          {/* Feature 2 */}
          <div className={`${isDarkMode ? 'bg-gray-700' : 'bg-white '} text-teal-800 ${isDarkMode ? 'text-teal-400' : ''} p-6 rounded-lg shadow-lg flex flex-col items-center`}>
            <svg className="w-12 h-12 mb-4" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
              <path d="M10 4a6 6 0 00-6 6 6 6 0 006 6 6 6 0 006-6 6 6 0 00-6-6zM2 10a8 8 0 1116 0 8 8 0 01-16 0zm2.12-.12a1 1 0 00-1.41 1.41l1.58 1.58L6 10l-1.29-1.29a1 1 0 00-1.41 1.41L6 12l-1.88-1.88z" />
            </svg>
            <h3 className="text-xl font-semibold mb-2">Expert Instructors</h3>
            <p className={`${isDarkMode ? 'text-gray-300' : 'text-gray-700'}`}>Learn from industry experts with years of experience and practical knowledge.</p>
          </div>
          {/* Feature 3 */}
          <div className={` ${isDarkMode ? 'bg-gray-700' : 'bg-white '} text-teal-800 ${isDarkMode ? 'text-teal-400' : ''} p-6 rounded-lg shadow-lg flex flex-col items-center`}>
            <svg className="w-12 h-12 mb-4" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
              <path d="M12 5V3a1 1 0 00-1-1H9a1 1 0 00-1 1v2H6a1 1 0 00-1 1v8a1 1 0 001 1h2v1a1 1 0 001 1h2a1 1 0 001-1v-1h2a1 1 0 001-1V6a1 1 0 00-1-1h-2zM9 4h2v1H9V4zm1 8a2 2 0 110-4 2 2 0 010 4z" />
            </svg>
            <h3 className="text-xl font-semibold mb-2">Certified Courses</h3>
            <p className={`${isDarkMode ? 'text-gray-300' : 'text-gray-700'}`}>Receive industry-recognized certificates that enhance your resume and career prospects.</p>
          </div>
        </div>
      </div>
    </>
  );
};

export default Statistics;





