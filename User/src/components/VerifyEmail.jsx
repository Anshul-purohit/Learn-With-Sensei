import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import axios from 'axios';

const VerifyEmail = () => {
  const { token } = useParams();
  const navigate = useNavigate();
  const [message, setMessage] = useState('');

  useEffect(() => {
    const verifyEmail = async () => {
      try {
        const response = await axios.post(`http://localhost:8000/api/v1/users/verify-token/${token}`);
        setMessage(response.data.data);
        console.log(response.data.data);
        setTimeout(() => {
          navigate('/Login');
        }, 8000);
      } catch (error) {
        setMessage(error.response.data.message);
      }
    };

    verifyEmail();
  }, [token, navigate]);

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100 p-6">
      <div className="bg-white p-8 rounded-lg shadow-lg max-w-md w-full text-center">
        <h1 className="text-2xl font-semibold text-gray-800 mb-4">
          Email Verification
        </h1>
        <p className={`text-${message === 'User Verified Successfully' ? 'green' : 'red'}-600 text-lg`}>
          {message}
        </p>
        {message === 'User Verified Successfully' && (
          <p className="text-gray-500 text-sm mt-4">
            {/* // add timer also */}
            Redirecting to login page in 8 seconds
          </p>
        )}
      </div>
    </div>
  );
};

export default VerifyEmail;
