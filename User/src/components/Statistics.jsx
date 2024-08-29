// import React from 'react';
import { useEffect, useState } from 'react';
import GirlImg from '../assets/girl-image.jpg';
import axios from 'axios';
import { useShared } from '../SharedContext';

const Statistics = () => {

  const [students,setStudents] = useState(0);
  const [courses,setCourses] = useState(0);
  const [instructors,setInstructors] = useState(0);
  const [category,setCategory] = useState(0);
  const {apiBaseUrl} = useShared()

  const statisticsData = [
    { id: 1, label: 'Students Joined', value: students },
    { id: 2, label: 'Courses Available', value: courses },
    { id: 3, label: 'Instructors', value: '30' },
    { id: 4, label: 'Category', value: category },
  ];

  useEffect(() => {
    axios.get(`${apiBaseUrl}/dashboard`, {
        withCredentials: true
    })
    .then(function (response) {
        console.log(response.data.data);
        setStudents(response.data.data.totalUsers)
        setCourses(response.data.data.totalCourses)
        setCategory(response.data.data.totalVideoCategory.length)
    })
    .catch(function (error) {
        console.log(error);
    });
  },[])

  const { isDarkMode } = useShared();
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
    </>
  );
};

export default Statistics;





