import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import {jwtDecode} from 'jwt-decode';
import './login.css'; // Import the CSS
import axios from 'axios'; 

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
        alert('Invalid email address!');
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
      
      const decodedToken = jwtDecode(token);
      alert('Login successful!' + decodedToken);
      console.log(decodedToken);
      navigate(`/organizator`);
    } catch (error) {
      console.error('Error during login:', error);
      alert('Login failed.');
    }


  };

  const validateEmail = (email) => {
    // Basic regex for email validation
    const emailRegex = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,6}$/;
    return emailRegex.test(email);
  };

  const togglePasswordVisibility = () => {
    setPasswordVisible(!passwordVisible);
  };

  return (
    <div className="background">
      <div className="login-container">
        <h2 className="header-text">TicketUp! Boost Your Event</h2>
        <p className="organizer-text">Sadece Organizatör Girişine açıktır.</p>
        <form onSubmit={handleLogin}>
          <label htmlFor="username" className="signin"></label>
          <input
            type="text"
            id="username"
            name="username"
            value={username}
            onChange={handleUsernameChange}
            required
            placeholder="E-posta"
          />
          <label htmlFor="password" className="signin"></label>
          <div className="password-container">
            <input
              type={passwordVisible ? 'text' : 'password'}
              id="password"
              name="password"
              value={password}
              onChange={handlePasswordChange}
              required
              placeholder="Şifre"
            />
            <img
              id="toggle-password"
              className="eye-icon"
              src={
                passwordVisible
                  ? '/src/assets/icons/eye_closed.png'
                  : '/src/assets/icons/eye_opened.png'
              }
              alt="Show Password"
              onClick={togglePasswordVisibility}
            />
          </div>
          <a className="forgot-pw-text">Şifremi unuttum</a>
          <Link to="/signup" className="login-text">
            <span className="text-normal">Hesabın yok mu?</span>
            <span className="text-highlight"> Kayıt ol</span>
          </Link>
          <button type="submit" className="login-button">
            Giriş Yap
          </button>
        </form>
      </div>
      <div className="copyright-text">© 2024 TicketUp. All rights reserved.</div>
    </div>
  );
}

export default Login;
