import React from 'react';
import { useNavigate } from 'react-router-dom';

const LoginPage = () => {
   const navigate = useNavigate();
   const handleLogin = () => {
      navigate('/home');
   };
   return (
      <div className="flex flex-col items-center justify-center h-screen bg-gray-700">
         <h1 className="text-4xl font-bold text-white mb-4">Login Page</h1>
         <button
            onClick={handleLogin}
            className="bg-gray-600 hover:bg-gray-900 text-white font-bold py-2 px-4 rounded-full mt-6 mb-4"
         >
            {' '}
            Login{' '}
         </button>
      </div>
   );
};

export default LoginPage;
