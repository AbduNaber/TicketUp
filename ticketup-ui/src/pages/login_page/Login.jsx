import { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { ToastContainer, toast } from "react-toastify";
import axios from 'axios';
import 'react-toastify/dist/ReactToastify.css';

function Login() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [passwordVisible, setPasswordVisible] = useState(false);
  const navigate = useNavigate();

  const handleUsernameChange = (event) => setUsername(event.target.value);
  const handlePasswordChange = (event) => setPassword(event.target.value);

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      if (!validateEmail(username)) {
        toast.error('Invalid email address!');
        return;
      }
      const response = await axios.post('http://localhost:8080/ticketup/organizators/login', {
        email: username,
        password: password
      }, {
        headers: {
          'Content-Type': 'application/json'
        }
      });

      const token = response.data;
      sessionStorage.setItem('token', token); 
       
      navigate(`/organizer`);
    } catch (error) {
      if (error.response) {
        toast.error(error.response.data); // Backend'den gelen hata mesajı
    } else {
        toast.error("An unexpected error occurred. Please try again.");
    }
    }
  };

  const validateEmail = (email) => {
    const emailRegex = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,6}$/;
    return emailRegex.test(email);
  };

  const togglePasswordVisibility = () => {
    setPasswordVisible(!passwordVisible);
  };

  useEffect(() => {
    const params = new URLSearchParams(location.search);

    if (params.get("loggedOut") === "true") {
      toast.info("Başarıyla çıkış yaptınız.");
    }
    if (params.get("registered") === "true") {
      toast.success("Başarıyla kayıt oldunuz. Giriş yapabilirsiniz.");
    }
  }, [location.search]);

  return (
    <div className="bg-gray-100 h-screen flex items-center justify-center text-black  bg-[url('/src/assets/images/login_bg.png')]">
      <div className="w-[40vw] h-[75vh] bg-white/90 shadow-lg rounded-2xl flex flex-col items-center justify-center">
        <h2 className="text-4xl font-semibold text-black mt-3">TicketUp! Boost Your Event</h2>
        <p className="text-black font-normal text-lg mt-4 mb-2">Sadece Organizatör Girişine açıktır.</p>
        <form onSubmit={handleLogin} className="flex flex-col w-[28vw] z-10">
          <input
            type="text"
            id="username"
            name="username"
            value={username}
            onChange={handleUsernameChange}
            required
            placeholder="E-posta"
            className="p-4 text-base border border-gray-300 rounded-lg bg-white text-black mb-4"
          />
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
          <a className="text-red-500 text-sm cursor-pointer mt-2">Şifremi unuttum</a>
          <Link to="/register" className="text-black text-sm mt-2 mb-2">
            <span className="text-black">Hesabın yok mu?</span>
            <span className="text-green-500"> Kayıt ol</span>
          </Link>
          <button type="submit" className="bg-gradient-to-r from-pink-500 to-orange-500 text-black font-bold py-2 px-4 rounded-full mt-4 hover:bg-green-500 transition">
            Giriş Yap
          </button>
        </form>
      </div>
      <ToastContainer />
    </div>
  );
}

export default Login;
