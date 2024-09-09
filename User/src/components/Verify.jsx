// import React from 'react';
// import { useNavigate } from 'react-router-dom';

const Verify = () => {
    // const navigate = useNavigate();
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <div className="bg-white p-8 rounded-lg shadow-lg max-w-md w-full text-center">
        <h1 className="text-4xl font-semibold text-gray-800 mb-4">
          Please Verify Your Email
        </h1>
        <p className="text-xl text-gray-600 mb-6">
          We have sent a verification email to your registered email address. Please click the link in the email to verify your account.
        </p>
        {/* <button 
            className="px-6 py-2 bg-blue-500 text-white rounded-full hover:bg-blue-600 transition duration-300"
            onClick={() => navigate(`/verify-token/${1}`)}
        >
          Resend Verification Email
        </button> */}
      </div>
    </div>
  );
};

export default Verify;
