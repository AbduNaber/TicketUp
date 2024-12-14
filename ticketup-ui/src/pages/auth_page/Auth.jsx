import React, { useState } from 'react';
import Login from '../login_page/Login';
import Register from '../register_page/Register';

const Auth = () => {
  const [isLogin, setIsLogin] = useState(true);

  const toggleForm = () => setIsLogin(!isLogin);

  return (
    <div className="auth-container relative w-[40vw] h-[75vh] bg-white shadow-lg rounded-2xl">
      <div
        className={`flip-box transition-transform duration-700 ${isLogin ? '' : 'flip'}`}
      >
        <div className="front absolute w-full h-full">
          <Login />
          <button
            onClick={toggleForm}
            className="absolute bottom-4 right-4 text-sm text-blue-500 underline"
          >
            Go to Register
          </button>
        </div>
        <div className="back absolute w-full h-full">
          <Register />
          <button
            onClick={toggleForm}
            className="absolute bottom-4 right-4 text-sm text-blue-500 underline"
          >
            Go to Login
          </button>
        </div>
      </div>
    </div>
  );
};

export default Auth;
