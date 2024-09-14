import axios from 'axios';
import { useState } from 'react'
import { useShared } from '../SharedContext';

const ForgotPassword = () => {

  const [mail, setMail] = useState("");
  const { apiBaseUrl } = useShared();

  const handleResetPassword = () => {
    console.log("mail : ",mail);

    axios.post(`${apiBaseUrl}/users/forgot-password`, {
      email: mail
    }, {
        withCredentials: true
    })
    .then(function (response) {
      console.log(response.data)
    })
    .catch(function (error) {
      console.log(error)
    });
  }

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <div className="bg-white p-6 rounded-lg shadow-lg w-full max-w-md">
        <h2 className="text-2xl font-semibold text-gray-800 mb-4">Forgot Password</h2>
        <p className="text-gray-600 mb-6">Enter your registered email to reset your password.</p>
        
        <input 
          type="email" 
          className="w-full p-3 mb-4 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500" 
          placeholder="Email" 
          onChange={(e) => setMail(e.target.value)} 
        />
        
        <button 
          onClick={handleResetPassword} 
          className="w-full bg-blue-500 text-white py-2 rounded-lg hover:bg-blue-600 transition duration-300 ease-in-out">
          Reset Password
        </button>
      </div>
    </div>
  )
}

export default ForgotPassword;
