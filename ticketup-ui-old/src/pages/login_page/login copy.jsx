import { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { ToastContainer, toast } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';
import axios from 'axios'; 
import '../../index.css';

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
      toast.error("Incorrect password. Please try again.");
      console.log(error.message)
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
      toast.info("You have been logged out successfully.");
    }
  }, [location.search]);

  return (
    <div className="flex items-center justify-center min-h-screen bg-cover bg-center bg-no-repeat" style={{ backgroundImage: "url('/src/assets/images/login_bg.png')" }}>
      <div className="flex flex-col items-center justify-center w-2/5 h-3/4 bg-white bg-opacity-70 rounded-2xl shadow-lg">
        <h2 className="text-4xl font-bold text-black mb-3">TicketUp! Boost Your Event</h2>
        <p className="text-lg text-black mb-6">Sadece Organizatör Girişine açıktır.</p>
        <form onSubmit={handleLogin} className="w-4/5 flex flex-col gap-4">
          <input
            type="text"
            id="username"
            name="username"
            value={username}
            onChange={handleUsernameChange}
            required
            placeholder="E-posta"
            className="p-4 text-lg border rounded-lg w-full"
          />
          <div className="relative">
            <input
              type={passwordVisible ? 'text' : 'password'}
              id="password"
              name="password"
              value={password}
              onChange={handlePasswordChange}
              required
              placeholder="Şifre"
              className="p-4 text-lg border rounded-lg w-full"
            />
            <img
              id="toggle-password"
              className="absolute right-3 top-3 w-6 h-6 cursor-pointer"
              src={
                passwordVisible
                  ? '/src/assets/icons/eye_closed.png'
                  : '/src/assets/icons/eye_opened.png'
              }
              alt="Show Password"
              onClick={togglePasswordVisibility}
            />
          </div>
          <a href="#" className="self-end text-red-500 text-sm cursor-pointer mb-3">Şifremi unuttum</a>
          <Link to="/signup" className="self-end text-black text-sm">
            <span className="text-normal">Hesabın yok mu?</span>
            <span className="text-green-500"> Kayıt ol</span>
          </Link>
          <button type="submit" className="bg-gradient-to-r from-pink-500 to-orange-500 text-black py-2 rounded-lg text-lg font-semibold hover:bg-green-600">
            Giriş Yap
          </button>
        </form>
      </div>
      <div className="absolute bottom-3 right-3 text-xs text-white">© 2024 TicketUp. All rights reserved.</div>
      <ToastContainer />
    </div>
  );
}

export default Login;
