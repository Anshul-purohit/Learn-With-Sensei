import { useState } from 'react';
import { Link, useNavigate } from "react-router-dom";
import axios from 'axios';
import loginImg from "../assets/login-img.png";
import {ToastContainer,toast} from "react-toastify"
import "react-toastify/dist/ReactToastify.css"
import { useTheme } from './ThemeContext';


const Signup = () => {
    const { isDarkMode, toggleTheme } = useTheme();
    const [fullname, setFullname] = useState('');
    const [username, setUsername] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [image,setImage] = useState(null);
    const navigate = useNavigate();

    const handleSignup = (e) => {
        e.preventDefault();
    
        const formData = new FormData();
        formData.append('fullName', fullname);
        formData.append('username', username);
        formData.append('email', email);
        formData.append('password', password);
        formData.append('avatar', image);
    
        axios.post('http://localhost:8000/api/v1/users/register', formData, {
            headers: {
                'Content-Type': 'multipart/form-data',
            },
        })
        .then(function (response) {
            toast.success("Registered Successfully!")
            console.log('data ', response.data);
            navigate('/Verify');
        })
        .catch(function (error) {
            // const parser = new DOMParser();
            // const doc = parser.parseFromString(error.response.data, 'text/html');
            // const pre = doc.querySelector('pre');
            // let errorMessage = "An unknown error occurred"
            // if (pre) {
            //     errorMessage = pre.textContent.split('at /')[0].trim();
            // } 
            toast.error(error.response.data.message);
        });
    };
    

    
  return (
    <>
      <ToastContainer />
      <div className={`flex items-center justify-center ${isDarkMode ? 'bg-gray-900' : 'bg-gray-100'} min-h-screen`}>
        <div className={`flex flex-row ${isDarkMode ? 'bg-gray-800' : 'bg-red-200'} w-full max-w-screen-lg shadow-xl`}>
          <div className={`flex flex-1 p-10 ${isDarkMode ? 'bg-gray-800' : 'bg-white'} w-2/5 lg:w-full`}>
            <div className={`flex-1 px-4 py-10 border ${isDarkMode ? 'border-gray-700' : 'border-gray-100'} shadow-xl ${isDarkMode ? 'bg-gray-800' : 'bg-white'}`}>
              <h1 className={`font-bold text-3xl text-center ${isDarkMode ? 'text-gray-300' : 'text-gray-700'}`}>Sign up</h1>
              <div className="flex flex-col space-y-4 px-10 py-6">
                <input
                  className={`p-2 border rounded ${isDarkMode ? 'bg-gray-700 border-gray-600 text-gray-300' : 'border-gray-300 text-gray-700'}`}
                  placeholder="Fullname"
                  type="text"
                  value={fullname}
                  onChange={(e) => setFullname(e.target.value)}
                />
                <input
                  className={`p-2 border rounded ${isDarkMode ? 'bg-gray-700 border-gray-600 text-gray-300' : 'border-gray-300 text-gray-700'}`}
                  placeholder="Username"
                  type="text"
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                />
                <input
                  className={`p-2 border rounded ${isDarkMode ? 'bg-gray-700 border-gray-600 text-gray-300' : 'border-gray-300 text-gray-700'}`}
                  placeholder="Email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />
                <input
                  className={`p-2 border rounded ${isDarkMode ? 'bg-gray-700 border-gray-600 text-gray-300' : 'border-gray-300 text-gray-700'}`}
                  placeholder="Password"
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                />
                <div className="flex flex-col items-center space-y-4">
                  <input
                    type="file"
                    id="file-upload"
                    onChange={(e) => setImage(e.target.files[0])}
                  />
                </div>

                <button
                  className={`p-2 border rounded ${isDarkMode ? 'bg-teal-600 text-gray-100 hover:bg-teal-500' : 'bg-teal-600 text-gray-100 hover:bg-teal-500'} text-xl font-semibold`}
                  onClick={handleSignup}
                >
                  Sign up
                </button>

                <hr />
              </div>
              <h5 className={`bg-${isDarkMode ? 'gray-800' : 'white'} text-center mb-4 ${isDarkMode ? 'text-gray-400' : 'text-gray-600'}`} style={{ fontSize: "15px" }}>
                Already Have an account? <button className={`text-${isDarkMode ? 'teal-400' : 'teal-600'} hover:text-teal-600`}><Link to="/Login">Login Here</Link></button>
              </h5>
            </div>
            <div className={`flex-1 p-4 hidden md:flex items-center justify-center ${isDarkMode ? 'bg-teal-500' : 'bg-teal-300'} shadow-xl`}>
              <img src={loginImg} alt="img" className="w-full h-auto object-cover" />
            </div>
          </div>
        </div>
      </div>
    </>
  );
};



export default Signup;