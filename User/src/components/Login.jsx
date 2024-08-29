import React, { useState } from 'react';
import { Link } from "react-router-dom";
import axios from 'axios';
import loginImg from "../assets/login-img.png";
import googleImg from "../assets/google.png";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useShared } from '../SharedContext';
import { useNavigate } from 'react-router-dom';
import { useTheme } from '../ThemeContext';
import Cookies from 'js-cookie';

const Login = () => {
    const { handleToggleOpen, login, apiBaseUrl } = useShared();
    const navigate = useNavigate();
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [email, setEmail] = useState('');
    const { isDarkMode } = useTheme();

    const handleLogin = (e) => {
        e.preventDefault();
        console.log("Login button clicked");
        console.log("Username:", username);
        console.log("Email :", email);
        console.log("Password:", password);

        axios.post(`${apiBaseUrl}/users/login`, {
            username: username,
            email: email,
            password: password,
        }, {
            withCredentials: true
        })
        .then(function (response) {
            toast.success("Logged in successfully!");
            const fullname = response.data.message.fullName;
            const id = response.data.message._id;
            Cookies.set('username', username, { expires: 1 });
            Cookies.set('fullname', fullname, { expires: 1 });
            Cookies.set('email', email, { expires: 1 });
            Cookies.set('userid', id, { expires: 1 });
            login(username, fullname, email, id);
            handleToggleOpen();
            navigate('/');
        })
        .catch(function (error) {
            toast.error(error.response.data.message);
        });
    };

    const handleGoogleLogin = () => {
        window.location.href = `${apiBaseUrl}/users/auth/google`;
    };

    return (
        <>
            <ToastContainer />
            <div className={`flex items-center justify-center ${isDarkMode ? 'bg-gray-900' : 'bg-gray-100'} min-h-screen`}>
                <div className={`flex flex-row ${isDarkMode ? 'bg-gray-800' : 'bg-red-200'} w-full max-w-screen-lg shadow-xl`}>
                    <div className={`flex flex-1 p-10 ${isDarkMode ? 'bg-gray-800' : 'bg-white'} w-2/5 lg:w-full`}>
                        <div className={`flex-1 px-4 py-10 ${isDarkMode ? 'bg-gray-800' : 'bg-white'} border ${isDarkMode ? 'border-gray-700' : 'border-gray-100'} shadow-xl`}>
                            <h1 className={`font-bold text-3xl text-center ${isDarkMode ? 'text-gray-200' : 'text-gray-700'}`}>Login</h1>
                            <div className="flex flex-col space-y-4 px-10 py-6">
                                <input
                                    className={`p-2 border rounded ${isDarkMode ? 'bg-gray-600 border-gray-500 text-gray-200' : 'bg-white border-gray-300 text-gray-700'}`}
                                    placeholder="Username"
                                    type="text"
                                    value={username}
                                    onChange={(e) => setUsername(e.target.value)}
                                />
                                <input
                                    className={`p-2 border rounded ${isDarkMode ? 'bg-gray-600 border-gray-500 text-gray-200' : 'bg-white border-gray-300 text-gray-700'}`}
                                    placeholder="Email"
                                    value={email}
                                    onChange={(e) => setEmail(e.target.value)}
                                />
                                <input
                                    className={`p-2 border rounded ${isDarkMode ? 'bg-gray-600 border-gray-500 text-gray-200' : 'bg-white border-gray-300 text-gray-700'}`}
                                    placeholder="Password"
                                    type="password"
                                    value={password}
                                    onChange={(e) => setPassword(e.target.value)}
                                />
                                <Link to="" className='text-blue-700'>Forgot Password ? </Link>
                                <button
                                    className="p-2 border rounded bg-teal-600 hover:bg-teal-500 text-xl font-bold text-gray-100"
                                    onClick={handleLogin}
                                >
                                    Login
                                </button>
                                <hr />
                                <h1 className={`text-center font-semibold text-md ${isDarkMode ? 'text-gray-400' : 'text-gray-500'}`}>Login with Google</h1>
                                <button className={`border rounded-lg ${isDarkMode ? 'border-orange-700 hover:border-orange-500' : 'border-orange-500 hover:border-orange-400'} border-2 w-28 m-auto flex items-center p-1`} onClick={handleGoogleLogin}>
                                    <img src={googleImg} alt="img" className="w-4 h-4 m-auto" />
                                    <p className={`m-auto font-semibold ${isDarkMode ? 'text-gray-200' : 'text-gray-500'}`}>Google</p>
                                </button>
                            </div>
                            <h5 className={`text-center mb-4 ${isDarkMode ? 'text-gray-400 bg-gray-800' : 'text-bg-300 bg-white'}`} style={{ fontSize: "15px" }}>
                                Don’t Have an account? <button className={`text-${isDarkMode ? 'teal-400' : 'teal-600'} hover:text-teal-600`}><Link to="/Signup">Sign up</Link></button>
                            </h5>
                        </div>
                        <div className={`flex-1 p-4 ${isDarkMode ? 'bg-teal-500' : 'bg-teal-300'} hidden md:flex items-center justify-center shadow-xl`}>
                            <img src={loginImg} alt="img" className="w-full h-auto object-cover" />
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
};

export default Login;
