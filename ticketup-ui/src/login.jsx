import React, { useState } from 'react';
import './login.css'; // Import the CSS

function Login() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [passwordVisible, setPasswordVisible] = useState(false);

  const handleUsernameChange = (event) => setUsername(event.target.value);
  const handlePasswordChange = (event) => setPassword(event.target.value);

  const handleLogin = () => {
    console.log('Username:', username);
    console.log('Password:', password);
  };

  const togglePasswordVisibility = () => {
    setPasswordVisible(!passwordVisible);
  };

  return (
    <div className="background">
      <div className="login-container">
        <h2 className="header-text">TicketUp! Boost Your Event</h2>
        <p className="organizer-text">Sadece Organizatör Girişine açıktır.</p>
        <form>
          <label htmlFor="username"></label>
          <input
            type="text"
            id="username"
            name="username"
            value={username}
            onChange={handleUsernameChange}
            required
            placeholder="E-posta"
          />
          <label htmlFor="password"></label>
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
              alt="Toggle Password Visibility"
              onClick={togglePasswordVisibility}
            />
          </div>
          <a className="forgot-pw-text">Şifremi unuttum</a>
          <a className="register-text">Hesabın yok mu? Kayıt ol</a>
          <button type="button" className="login-button" onClick={handleLogin}>
            Giriş Yap
          </button>
        </form>
      </div>
    </div>
  );
}

export default Login;
