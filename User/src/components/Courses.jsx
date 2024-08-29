import React, { useEffect, useState } from 'react';
import { Link , useNavigate } from 'react-router-dom';
import { useTheme } from './ThemeContext';
import axios from 'axios';
import CoursesShimmer from './Shimmer/CoursesShimmer';
import { useShared } from '../SharedContext';

const Courses = () => {
    const {isDarkMode} = useTheme();
    const navigate = useNavigate();
    const [courses,setCourses] = useState([])
    const [loading , setLoading] = useState(true);
    const {apiBaseUrl}  = useShared()



    useEffect(() => {
        const fetchCourses = async () => {
          try {
            const response = await axios.get(`${apiBaseUrl}/courses`, { withCredentials: true });
            console.log("courses : ",response.data.data);
            setCourses(response.data.data)
          } catch (error) {
            console.log(error)
            navigate('/Login');
          }
        };
    
        fetchCourses();
      }, [navigate]);

    const handleCourseClick = (coursebyId) => {
        console.log("inside handle course click")
        navigate(`/Course/coursefirst/${coursebyId}`)
        // navigate(`/Course/${coursebyId}`);
    }




    useEffect(() => {
        const timer = setTimeout(() => {
          setLoading(false);
        }, 500);
    
        return () => clearTimeout(timer);
      }, []);

    if(loading){
        return (<CoursesShimmer/>);
    }


    return(
      <div>
      {courses ? (
        <div className={`w-full flex items-center justify-center content-center py-8 ${isDarkMode ? 'bg-gray-900' : 'bg-gray-100'}`}>
          <div className="max-w-screen-lg w-full px-4">
            <div className="w-full p-4 mb-8 flex justify-between items-center">
              <div>
                <h1 className={`text-2xl font-bold ${isDarkMode ? 'text-gray-100' : 'text-zinc-600'}`}>All Courses</h1>
                <h4 className={`text-gray-400 ${isDarkMode ? 'text-gray-300' : ''}`}>Explore our popular courses</h4>
              </div>
            </div>

            <div className="grid gap-8 grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-3">
              {courses.map((course, index) => (
                <div key={index} className={`border rounded-lg p-4 shadow-lg hover:shadow-2xl hover:-translate-y-1 transition ease-in-out duration-300 transform flex flex-col justify-between ${isDarkMode ? 'bg-gray-800 border-gray-700 text-gray-200' : 'bg-white border-gray-200 text-gray-900'}`}>
                  <div>
                    <img src={course.thumbnail} alt={course.name} className="w-full h-40 object-cover rounded-t-lg mb-4" />
                    <h4 className={`text-lg font-bold mb-2 ${isDarkMode ? 'text-gray-100' : 'text-zinc-600'}`}>{course.name}</h4>
                    <p style={{ textAlign: 'justify' }}  className={`mb-4 text-sm lg:text-md line-clamp-6 ${isDarkMode ? 'text-gray-300' : 'text-gray-500'}`}>{course.description}</p>
                    <p className={`font-semibold mb-4 ${isDarkMode ? 'text-teal-400' : 'text-teal-500'}`}>{course.videos.length} Lectures</p>
                  </div>
                  <button onClick={() => handleCourseClick(course._id,course.name,course.description,course.thumbnail)} className={`w-40 mt-auto border font-semibold px-4 py-2 rounded-xl transition-colors duration-300 ${isDarkMode ? 'border-gray-400 text-gray-400 hover:text-gray-200 hover:border-gray-200' : 'border-gray-900 text-gray-900 hover:text-gray-500 hover:border-gray-500'}`}>
                    Explore Course
                  </button>
                </div>
              ))}
            </div>
          </div>
        </div>
      ) : (
        <CoursesShimmer/>
      )}
    </div>
    )
}

export default Courses;


