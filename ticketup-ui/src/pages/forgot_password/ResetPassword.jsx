import { useState, useEffect } from 'react';
import { Link, useNavigate, useParams, useSearchParams } from 'react-router-dom';
import { ToastContainer, toast } from "react-toastify";
import axios from 'axios';
import 'react-toastify/dist/ReactToastify.css';

function ResetPassword() {
  const [password, setPassword] = useState('');
  const [passwordAgain, setPasswordAgain] = useState('');
  const [passwordVisible, setPasswordVisible] = useState(false);
  const { token } = useParams();
  const navigate = useNavigate();
  

  const handlePasswordAgainChange = (event) => setPasswordAgain(event.target.value);
  const handlePasswordChange = (event) => setPassword(event.target.value);

  const handleLogin = async (e) => {
    e.preventDefault();

    if(password !== passwordAgain){
        toast.error("Şifreler Eşleşmiyor");
        return
    }

    try {
        const response = await axios.post(`http://localhost:8080/ticketup/auth/reset-password`, {
            token: token,
            newPassword: password,
          });

        toast.success(response.data);
        navigate("/login")
      
    } catch (error) {
      if (error.response) {
        toast.error(error.response.data); // Backend'den gelen hata mesajı
    } else {
        toast.error("An unexpected error occurred. Please try again.");
    }
    }
  };

  
  const togglePasswordVisibility = () => {
    setPasswordVisible(!passwordVisible);
  };

  

  return (
    <div className="bg-gray-100 h-screen flex items-center justify-center text-black  bg-[url('/src/assets/images/login_bg.png')]">
      <div className="w-[40vw] h-[75vh] bg-white/90 shadow-lg rounded-2xl flex flex-col items-center justify-center">
        <h2 className="text-4xl font-semibold text-black mt-3">Şifrenizi Sıfırlayın</h2>
        <p className="text-black font-normal text-lg mt-4 mb-2">Lütfen kullanmak istediğiniz şifrenizi girin.</p>
        <form onSubmit={handleLogin} className="flex flex-col w-[28vw] z-10">
        <div className="relative flex items-center mb-4">
            <input
              type={passwordVisible ? 'text' : 'password'}
              id="password"
              name="password"
              value={password}
              onChange={handlePasswordChange}
              required
              placeholder="Şifre"
              className="p-4 text-base border border-gray-300 rounded-lg w-full bg-white text-black"
            />
            <img
              id="toggle-password"
              className="absolute right-3 bottom-3 w-6 h-6 cursor-pointer"
              src={
                passwordVisible
                  ? '/src/assets/icons/eye_closed.png'
                  : '/src/assets/icons/eye_opened.png'
              }
              alt="Show Password"
              onClick={togglePasswordVisibility}
            />
          </div>
          <div className="relative flex items-center mb-4">
            <input
              type={passwordVisible ? 'text' : 'password'}
              id="password"
              name="password"
              value={passwordAgain}
              onChange={handlePasswordAgainChange}
              required
              placeholder="Şifre Tekrar"
              className="p-4 text-base border border-gray-300 rounded-lg w-full bg-white text-black"
            />
            <img
              id="toggle-password"
              className="absolute right-3 bottom-3 w-6 h-6 cursor-pointer"
              src={
                passwordVisible
                  ? '/src/assets/icons/eye_closed.png'
                  : '/src/assets/icons/eye_opened.png'
              }
              alt="Show Password"
              onClick={togglePasswordVisibility}
            />
          </div>
          <button type="submit" className="bg-gradient-to-r from-pink-500 to-orange-500 text-black font-bold py-2 px-4 rounded-full mt-4 hover:bg-green-500 transition">
            Kaydet
          </button>
        </form>
      </div>
      <ToastContainer />
    </div>
  );
}

export default ResetPassword;
