import { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { ToastContainer, toast } from "react-toastify";
import axios from 'axios';
import 'react-toastify/dist/ReactToastify.css';

function ForgotPassword() {
  const [email, setEmail] = useState('');
  
  
  const navigate = useNavigate();

  const handleEmailChange = (event) => setEmail(event.target.value);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if(!validateEmail(email)){
        toast.error("Invalid email adress");
        return;
      }

      const response = await axios.post(
        `http://46.101.166.170:8080/ticketup/auth/forgot-password`,
        null,
        {
          params: {email}
        }
      );

      if(response.status === 200){
        
        navigate("/login?forget=true");
      }
      else{
        toast.error("Bir hata oluştu. Lütfen tekrar deneyin.");
      }
    } catch (error) {
      if (error.response) {
        toast.error(error.response.data); // Backend'den gelen hata mesajı
    } else {
        toast.error("Bir hata oluştu. Lütfen tekrar deneyin");
    }
    }
  };

  const validateEmail = (email) => {
    const emailRegex = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,6}$/;
    return emailRegex.test(email);
  };

  return (
    <div className="bg-cover bg-center h-screen flex items-center justify-center text-white" style={{ backgroundImage: "url('/src/assets/images/login_bg.png')" }}>
      <div className="w-[40vw] h-[75vh] bg-white/90 shadow-lg rounded-2xl flex flex-col items-center justify-center">
        <h2 className="text-4xl font-semibold text-black mt-3">Şifrenizi mi unuttunuz?</h2>
        <p className="text-black font-normal text-lg mt-4">E-postanızı girin, hesabınıza tekrar erişebilmeniz için</p>
        <p className="text-black font-normal text-lg mb-2">size bir bağlantı göndereceğiz.</p>
        <form onSubmit={handleSubmit} className="flex flex-col w-[28vw] z-10">
          <input
            type="text"
            id="username"
            name="username"
            value={email}
            onChange={handleEmailChange}
            required
            placeholder="E-posta"
            className="p-4 text-base border border-gray-300 rounded-lg bg-white text-black mb-4"
          />
          <button type="submit" className="bg-gradient-to-r from-pink-500 to-orange-500 text-black font-bold py-2 px-4 rounded-full mt-4 hover:bg-green-500 transition">
            Giriş Linki Gönder
          </button>
        </form>
        <Link to="/register" className='text-green-500 text-sm cursor-pointer mt-2'>
            <span>Veya Yeni Bir Hesap Oluştur</span>
        </Link>
      </div>
      <ToastContainer />
    </div>
  );
}

export default ForgotPassword;
