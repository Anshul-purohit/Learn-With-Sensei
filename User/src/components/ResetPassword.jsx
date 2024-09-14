import axios from "axios";
import { useState } from "react";
import { useShared } from "../SharedContext";
import { useNavigate, useParams } from "react-router-dom";

const ResetPassword = () => {

    const [pass, setPass] = useState("");
    const [cpass, setCpass] = useState("");
    const { apiBaseUrl } = useShared();
    const { token } = useParams();
    const navigate = useNavigate();

    const handleChangePassword = () => {
        console.log("pass : ", pass);
        console.log("cpass: ", cpass);

        axios.post(`${apiBaseUrl}/users/reset-password/${token}`, {
            password: pass,
            confirmPassword: cpass
          }, {
              withCredentials: true
          })
          .then(function (response) {
            console.log(response.data)
            navigate("/profile")
          })
          .catch(function (error) {
            console.log(error)
          });
    }

    return (
        <div className="flex items-center justify-center min-h-screen bg-gray-100">
            <div className="bg-white p-6 rounded-lg shadow-lg w-full max-w-md">
                <h2 className="text-2xl font-semibold text-gray-800 mb-4">Reset Password</h2>
                <p className="text-gray-600 mb-6">Enter a new password and confirm it below.</p>

                <label className="block text-sm font-medium text-gray-700 mb-2">
                    New Password:
                </label>
                <input 
                    type="password" 
                    className="w-full p-3 mb-4 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                    placeholder="New Password"
                    onChange={(e) => setPass(e.target.value)} 
                />

                <label className="block text-sm font-medium text-gray-700 mb-2">
                    Confirm Password:
                </label>
                <input 
                    type="password" 
                    className="w-full p-3 mb-4 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                    placeholder="Confirm Password"
                    onChange={(e) => setCpass(e.target.value)} 
                />

                <button 
                    onClick={handleChangePassword} 
                    className="w-full bg-blue-500 text-white py-2 rounded-lg hover:bg-blue-600 transition duration-300 ease-in-out">
                    Submit
                </button>
            </div>
        </div>
    )
}

export default ResetPassword;
