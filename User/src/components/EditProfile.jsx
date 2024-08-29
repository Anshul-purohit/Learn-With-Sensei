// import React, { useState, useEffect } from "react";
// import axios from "axios";
// import { toast, ToastContainer } from 'react-toastify';
// import 'react-toastify/dist/ReactToastify.css';  // Import the CSS for styling
// import { useShared } from "../SharedContext";
// import { useTheme } from './ThemeContext'; 
// import EditProfileShimmer from "./Shimmer/EditProfileShimmer";

// const EditProfile = () => {
//     const [loading, setLoading] = useState(true);
//     const { isDarkMode } = useTheme();
//     const { username, fullname, email } = useShared();
//     const [newUsername, setNewUsername] = useState("");
//     const [newFullname, setNewFullname] = useState("");
//     const [oldPass, setOldPass] = useState("");
//     const [newPass, setNewPass] = useState("");
//     const [newImage, setNewImage] = useState(null);

//     useEffect(() => {
//         // Set the initial values for username and fullname
//         setNewUsername(username);
//         setNewFullname(fullname);
//     }, [username, fullname]);

//     const handleEditButton = () => {
//         axios.patch('http://localhost:8000/api/v1/users/update-account', {
//             fullName: newFullname || fullname,
//             username: newUsername || username,
//             email: email,
//         }, {
//             withCredentials: true
//         })
//         .then(response => {
//             toast.success("Changes done successfully!");
//         })
//         .catch(error => {
//             toast.error("Failed to update account details.");
//         });
//     };

//     const handlePasswordChange = () => {
//         axios.post('http://localhost:8000/api/v1/users/change-password', {
//             oldPassword: oldPass,
//             newPassword: newPass
//         }, {
//             withCredentials: true
//         })
//         .then(response => {
//             toast.success("Password changed successfully!");
//         })
//         .catch(error => {
//             toast.error("Failed to change password.");
//         });
//     };

//     const handleAvatarChange = async () => {
//         if (!newImage) {
//             toast.error("Please select an image to upload.");
//             return;
//         }

//         const formData = new FormData();
//         formData.append('avatar', newImage);

//         await axios.patch('http://localhost:8000/api/v1/users/avatar', formData, {
//             withCredentials: true,
//             headers: {
//                 'Content-Type': 'multipart/form-data'
//             }
//         })
//         .then(response => {
//             toast.success("Avatar changed successfully!");
//         })
//         .catch(error => {
//             toast.error("Failed to change avatar.");
//         });
//     };

//     useEffect(() => {
//         const timer = setTimeout(() => {
//             setLoading(false);
//         }, 500);

//         return () => clearTimeout(timer);
//     }, []);

//     if (loading) {
//         return (<EditProfileShimmer />);
//     }

//     return (
//         <div className={`w-full ${isDarkMode ? 'bg-gray-900 text-gray-300' : 'bg-gray-100 text-gray-800'}`}>
//             <div className={`w-full min-h-screen ${isDarkMode ? 'bg-gray-900 text-gray-300' : 'bg-gray-100 text-gray-800'} flex items-center justify-center`}>
//                 <div className={`grid grid-rows-3 gap-10 shadow-xl border rounded-lg mt-10 mb-10 p-6 sm:p-10 ${isDarkMode ? 'bg-gray-800 border-gray-800' : 'bg-white border-gray-300'} w-full max-w-4xl`}>
                    
//                     {/* Change Avatar Section */}
//                     <div className={`hover:shadow-2xl p-6 border rounded-lg flex flex-col ${isDarkMode ? 'bg-gray-800 border-gray-700' : 'bg-white border-gray-300'}`}>
//                         <h1 className={`text-xl font-semibold mb-4 ${isDarkMode ? 'text-gray-200' : 'text-gray-800'}`}>Change Avatar</h1>
//                         <div className="flex items-center space-x-4 mb-4">
//                             <input 
//                                 type="file" 
//                                 className={`p-2 border rounded flex-1 ${isDarkMode ? 'bg-gray-800 border-gray-500 text-gray-200' : 'bg-white border-gray-300 text-gray-800'}`}
//                                 onChange={(e) => setNewImage(e.target.files[0])} 
//                             />
//                         </div>
//                         <div className="flex justify-end">
//                             <button 
//                                 onClick={handleAvatarChange}
//                                 className={`px-6 py-2 rounded ${isDarkMode ? 'bg-teal-600 hover:bg-teal-700 text-white' : 'bg-teal-500 hover:bg-teal-600 text-white'}`}
//                             >
//                                 Change Avatar
//                             </button>
//                         </div>
//                     </div>

//                     {/* Edit Personal Details Section */}
//                     <div className={`hover:shadow-2xl p-6 border rounded-lg flex flex-col ${isDarkMode ? 'bg-gray-800 border-gray-700' : 'bg-white border-gray-300'}`}>
//                         <h1 className={`text-xl font-semibold mb-4 ${isDarkMode ? 'text-gray-200' : 'text-gray-800'}`}>Edit Personal Details</h1>
//                         <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 mb-4">
//                             <p>Username</p>
//                             <input 
//                                 type="text" 
//                                 placeholder="Enter new username"
//                                 value={newUsername}
//                                 onChange={(e) => setNewUsername(e.target.value)}
//                                 className={`p-2 border rounded flex-1 ${isDarkMode ? 'bg-gray-800 border-gray-500 text-gray-200' : 'bg-white border-gray-300 text-gray-800'}`} 
//                             />
//                             <p>Fullname</p>
//                             <input 
//                                 type="text" 
//                                 placeholder="Enter new fullname"
//                                 value={newFullname}
//                                 onChange={(e) => setNewFullname(e.target.value)}
//                                 className={`p-2 border rounded flex-1 ${isDarkMode ? 'bg-gray-800 border-gray-500 text-gray-200' : 'bg-white border-gray-300 text-gray-800'}`} 
//                             />
//                         </div>
//                         <div className="flex justify-end">
//                             <button 
//                                 className={`px-6 py-2 rounded ${isDarkMode ? 'bg-teal-600 hover:bg-teal-700 text-white' : 'bg-teal-500 hover:bg-teal-600 text-white'}`}
//                                 onClick={handleEditButton}
//                             >
//                                 Save Changes
//                             </button>
//                         </div>
//                     </div>

//                     {/* Change Password Section */}
//                     <div className={`hover:shadow-2xl p-6 border rounded-lg flex flex-col ${isDarkMode ? 'bg-gray-800 border-gray-700' : 'bg-white border-gray-300'}`}>
//                         <h1 className={`text-xl font-semibold mb-4 ${isDarkMode ? 'text-gray-200' : 'text-gray-800'}`}>Change Password</h1>
//                         <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 mb-4">
//                             <input 
//                                 type="password" 
//                                 placeholder="Current Password" 
//                                 onChange={(e) => setOldPass(e.target.value)}
//                                 className={`p-2 border rounded flex-1 ${isDarkMode ? 'bg-gray-800 border-gray-500 text-gray-200' : 'bg-white border-gray-300 text-gray-800'}`} 
//                             />
//                             <input 
//                                 type="password" 
//                                 placeholder="New Password" 
//                                 onChange={(e) => setNewPass(e.target.value)}
//                                 className={`p-2 border rounded flex-1 ${isDarkMode ? 'bg-gray-800 border-gray-500 text-gray-200' : 'bg-white border-gray-300 text-gray-800'}`} 
//                             />
//                         </div>
//                         <div className="flex justify-end">
//                             <button 
//                                 className={`px-6 py-2 rounded ${isDarkMode ? 'bg-teal-600 hover:bg-teal-700 text-white' : 'bg-teal-500 hover:bg-teal-600 text-white'}`}
//                                 onClick={handlePasswordChange}
//                             >
//                                 Change Password
//                             </button>
//                         </div>
//                     </div>

//                 </div>
//             </div>
//             <ToastContainer />
//         </div>
//     );
// };

// export default EditProfile;


import React, { useState, useEffect } from "react";
import axios from "axios";
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';  // Import the CSS for styling
import { useShared } from "../SharedContext";
import { useTheme } from './ThemeContext'; 
import EditProfileShimmer from "./Shimmer/EditProfileShimmer";

// Simple spinner component
const Spinner = () => (
    <div className="flex justify-center items-center h-full">
        <div className="w-16 h-16 border-t-4 border-teal-500 border-solid rounded-full animate-spin"></div>
    </div>
);

const EditProfile = () => {
    const [loading, setLoading] = useState(true);
    const [avatarLoading, setAvatarLoading] = useState(false); // New state for avatar upload loading
    const { isDarkMode } = useTheme();
    const { username, fullname, email } = useShared();
    const [newUsername, setNewUsername] = useState("");
    const [newFullname, setNewFullname] = useState("");
    const [oldPass, setOldPass] = useState("");
    const [newPass, setNewPass] = useState("");
    const [newImage, setNewImage] = useState(null);

    useEffect(() => {
        // Set the initial values for username and fullname
        setNewUsername(username);
        setNewFullname(fullname);
    }, [username, fullname]);

    const handleEditButton = () => {
        axios.patch('http://localhost:8000/api/v1/users/update-account', {
            fullName: newFullname || fullname,
            username: newUsername || username,
            email: email,
        }, {
            withCredentials: true
        })
        .then(response => {
            toast.success("Changes done successfully!");
        })
        .catch(error => {
            toast.error("Failed to update account details.");
        });
    };

    const handlePasswordChange = () => {
        axios.post('http://localhost:8000/api/v1/users/change-password', {
            oldPassword: oldPass,
            newPassword: newPass
        }, {
            withCredentials: true
        })
        .then(response => {
            toast.success("Password changed successfully!");
        })
        .catch(error => {
            console.log(error)
            toast.error("Failed to change password.");
        });
    };

    const handleAvatarChange = async () => {
        if (!newImage) {
            toast.error("Please select an image to upload.");
            return;
        }

        setAvatarLoading(true); // Start loading spinner

        const formData = new FormData();
        formData.append('avatar', newImage);

        await axios.patch('http://localhost:8000/api/v1/users/avatar', formData, {
            withCredentials: true,
            headers: {
                'Content-Type': 'multipart/form-data'
            }
        })
        .then(response => {
            toast.success("Avatar changed successfully!");
        })
        .catch(error => {
            toast.error("Failed to change avatar.");
        })
        .finally(() => {
            setAvatarLoading(false); // Stop loading spinner
        });
    };

    useEffect(() => {
        const timer = setTimeout(() => {
            setLoading(false);
        }, 500);

        return () => clearTimeout(timer);
    }, []);

    if (loading) {
        return (<EditProfileShimmer />);
    }

    return (
        <div className={`w-full ${isDarkMode ? 'bg-gray-900 text-gray-300' : 'bg-gray-100 text-gray-800'}`}>
            <div className={`w-full min-h-screen ${isDarkMode ? 'bg-gray-900 text-gray-300' : 'bg-gray-100 text-gray-800'} flex items-center justify-center`}>
                <div className={`grid grid-rows-3 gap-10 shadow-xl border rounded-lg mt-10 mb-10 p-6 sm:p-10 ${isDarkMode ? 'bg-gray-800 border-gray-800' : 'bg-white border-gray-300'} w-full max-w-4xl`}>
                    
                    {/* Change Avatar Section */}
                    <div className={`hover:shadow-2xl p-6 border rounded-lg flex flex-col ${isDarkMode ? 'bg-gray-800 border-gray-700' : 'bg-white border-gray-300'}`}>
                        <h1 className={`text-xl font-semibold mb-4 ${isDarkMode ? 'text-gray-200' : 'text-gray-800'}`}>Change Avatar</h1>
                        <div className="flex items-center space-x-4 mb-4">
                            <input 
                                type="file" 
                                className={`p-2 border rounded flex-1 ${isDarkMode ? 'bg-gray-800 border-gray-500 text-gray-200' : 'bg-white border-gray-300 text-gray-800'}`}
                                onChange={(e) => setNewImage(e.target.files[0])} 
                            />
                        </div>
                        <div className="flex justify-end">
                            <button 
                                onClick={handleAvatarChange}
                                className={`px-6 py-2 rounded ${isDarkMode ? 'bg-teal-600 hover:bg-teal-700 text-white' : 'bg-teal-500 hover:bg-teal-600 text-white'}`}
                            >
                                Change Avatar
                            </button>
                        </div>
                        {avatarLoading && <Spinner />} {/* Display spinner while loading */}
                    </div>

                    {/* Edit Personal Details Section */}
                    <div className={`hover:shadow-2xl p-6 border rounded-lg flex flex-col ${isDarkMode ? 'bg-gray-800 border-gray-700' : 'bg-white border-gray-300'}`}>
                        <h1 className={`text-xl font-semibold mb-4 ${isDarkMode ? 'text-gray-200' : 'text-gray-800'}`}>Edit Personal Details</h1>
                        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 mb-4">
                            <p>Username</p>
                            <input 
                                type="text" 
                                placeholder="Enter new username"
                                value={newUsername}
                                onChange={(e) => setNewUsername(e.target.value)}
                                className={`p-2 border rounded flex-1 ${isDarkMode ? 'bg-gray-800 border-gray-500 text-gray-200' : 'bg-white border-gray-300 text-gray-800'}`} 
                            />
                            <p>Fullname</p>
                            <input 
                                type="text" 
                                placeholder="Enter new fullname"
                                value={newFullname}
                                onChange={(e) => setNewFullname(e.target.value)}
                                className={`p-2 border rounded flex-1 ${isDarkMode ? 'bg-gray-800 border-gray-500 text-gray-200' : 'bg-white border-gray-300 text-gray-800'}`} 
                            />
                        </div>
                        <div className="flex justify-end">
                            <button 
                                className={`px-6 py-2 rounded ${isDarkMode ? 'bg-teal-600 hover:bg-teal-700 text-white' : 'bg-teal-500 hover:bg-teal-600 text-white'}`}
                                onClick={handleEditButton}
                            >
                                Save Changes
                            </button>
                        </div>
                    </div>

                    {/* Change Password Section */}
                    <div className={`hover:shadow-2xl p-6 border rounded-lg flex flex-col ${isDarkMode ? 'bg-gray-800 border-gray-700' : 'bg-white border-gray-300'}`}>
                        <h1 className={`text-xl font-semibold mb-4 ${isDarkMode ? 'text-gray-200' : 'text-gray-800'}`}>Change Password</h1>
                        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 mb-4">
                            <input 
                                type="password" 
                                placeholder="Current Password" 
                                onChange={(e) => setOldPass(e.target.value)}
                                className={`p-2 border rounded flex-1 ${isDarkMode ? 'bg-gray-800 border-gray-500 text-gray-200' : 'bg-white border-gray-300 text-gray-800'}`} 
                            />
                            <input 
                                type="password" 
                                placeholder="New Password" 
                                onChange={(e) => setNewPass(e.target.value)}
                                className={`p-2 border rounded flex-1 ${isDarkMode ? 'bg-gray-800 border-gray-500 text-gray-200' : 'bg-white border-gray-300 text-gray-800'}`} 
                            />
                        </div>
                        <div className="flex justify-end">
                            <button 
                                className={`px-6 py-2 rounded ${isDarkMode ? 'bg-teal-600 hover:bg-teal-700 text-white' : 'bg-teal-500 hover:bg-teal-600 text-white'}`}
                                onClick={handlePasswordChange}
                            >
                                Change Password
                            </button>
                        </div>
                    </div>

                </div>
            </div>
            <ToastContainer />
        </div>
    );
};

export default EditProfile;
