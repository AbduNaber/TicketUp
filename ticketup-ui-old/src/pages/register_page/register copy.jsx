import { useState } from 'react';
import '../login_page/login.css'
import './register.css';
import { Link } from 'react-router-dom';
import axios from 'axios';

const SignupForm = () => {
  const [formData, setFormData] = useState({
    name: '',
    surname: '',
    mailAddress: '',
    organizationName: '',
    password: '',
    confirmPassword: '',
  });

  const [passwordVisible, setPasswordVisible] = useState(false);
  const [errors, setErrors] = useState({});  // To hold error messages

  // Regex patterns for validation
  const nameRegex = /^[A-Za-z\s]+$/;  // Only letters and spaces for name
  const surnameRegex = /^[A-Za-z\s]+$/;  // Only letters and spaces for surname
  const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;  // Valid email pattern
  const organizationNameRegex = /^[A-Za-z0-9\s]+$/;  // Alphanumeric characters and spaces for organization name
  const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[A-Za-z\d]{8,}$/;


  const handleInputChange = (e) => {
    const { name, value } = e.target;
    const updatedFormData = {
      ...formData,
      [name]: value,
    };
    setFormData(updatedFormData);

    // Real-time validation
    let formErrors = {};

    // Validate name
    if (name === 'name' && !nameRegex.test(value)) {
      formErrors.name = 'İsim geçerli olmalı (sadece harf ve boşluk)';
    }

    // Validate surname
    if (name === 'surname' && !surnameRegex.test(value)) {
      formErrors.surname = 'Soyisim geçerli olmalı (sadece harf ve boşluk)';
    }

    // Validate email
    if (name === 'mailAddress' && !emailRegex.test(value)) {
      formErrors.mailAddress = 'Geçerli bir e-posta adresi giriniz';
    }

    // Validate organization name
    if (name === 'organizationName' && !organizationNameRegex.test(value)) {
      formErrors.organizationName = 'Geçerli bir organizasyon adı giriniz (sadece harf, rakam ve boşluk)';
    }

    // Validate password
    if (name === 'password' && !passwordRegex.test(value)) {
      formErrors.password = 'Şifre en az 8 karakter olmalı, 1 büyük harf, 1 küçük harf, 1 rakam içermelidir';
    }

    // Validate confirm password
    if (name === 'confirmPassword' && value !== formData.password) {
      formErrors.confirmPassword = 'Şifreler uyuşmuyor';
    }

    setErrors(formErrors);
  };

  const togglePasswordVisibility = () => {
    setPasswordVisible(!passwordVisible);
  };

  const handleRegister = async (e) => {
    e.preventDefault();

    if (Object.keys(errors).length > 0) {
      return; // Prevent submission if there are validation errors
    }

    try {
      const requestBody = {
        name: formData.name,
        surname: formData.surname,
        email: formData.mailAddress,
        organizationName: formData.organizationName,
        passwordHash: formData.password,
      };

      await axios.post('http://localhost:8080/ticketup/organizators/register', requestBody, {
        headers: {
          'Content-Type': 'application/json',
        },
      });

      alert('Kayıt başarılı!');
    } catch (error) {
      console.error('Kayıt sırasında hata:', error);
      alert('Kayıt başarısız.');
    }
  };

  return (
    <div className="background">
      <div className="signup-container">
        <h2 className="header-text-signup">TicketUp'a Organizatör Olarak Kayıt Olun</h2>
        <form>
          <label htmlFor="name" className="signup"></label>
          <div className="name-container-row">
            <div className="name-container">
              <input
                type="text"
                id="name"
                name="name"
                value={formData.name}
                onChange={handleInputChange}
                required
                placeholder="İsim"
              />
              {errors.name && <span className="error">{errors.name}</span>}
            </div>
            <div className="name-container">
              <input
                type="text"
                id="surname"
                name="surname"
                value={formData.surname}
                onChange={handleInputChange}
                required
                placeholder="Soyisim"
              />
              {errors.surname && <span className="error">{errors.surname}</span>}
            </div>
          </div>

          <label htmlFor="mail-address" className="signup"></label>
          <input
            type="text"
            id="mail-address"
            name="mailAddress"
            value={formData.mailAddress}
            onChange={handleInputChange}
            required
            placeholder="E-posta"
          />
          {errors.mailAddress && <span className="error">{errors.mailAddress}</span>}

          <label htmlFor="organization-name" className="signup"></label>
          <input
            type="text"
            id="organization-name"
            name="organizationName"
            value={formData.organizationName}
            onChange={handleInputChange}
            required
            placeholder="Organizasyon Adı"
          />
          {errors.organizationName && <span className="error">{errors.organizationName}</span>}

          <label htmlFor="password" className="signup"></label>
          <div className="password-container-row">
            <div className="password-container">
              <input
                type={passwordVisible ? 'text' : 'password'}
                id="password"
                name="password"
                value={formData.password}
                onChange={handleInputChange}
                required
                placeholder="Şifre"
              />
              <img
                id="toggle-password"
                className="eye-icon"
                src={passwordVisible ? '/src/assets/icons/eye_closed.png' : '/src/assets/icons/eye_opened.png'}
                alt="Show Password"
                onClick={togglePasswordVisibility}
              />
              {errors.password && <span className="error">{errors.password}</span>}
            </div>

            <div className="password-container">
              <input
                type={passwordVisible ? 'text' : 'password'}
                id="confirm-password"
                name="confirmPassword"
                value={formData.confirmPassword}
                onChange={handleInputChange}
                required
                placeholder="Şifreyi Doğrula"
              />
              <img
                id="toggle-password"
                className="eye-icon"
                src={passwordVisible ? '/src/assets/icons/eye_closed.png' : '/src/assets/icons/eye_opened.png'}
                alt="Show Password"
                onClick={togglePasswordVisibility}
              />
              {errors.confirmPassword && <span className="error">{errors.confirmPassword}</span>}
            </div>
          </div>

          <Link to="/login" className="login-text">
            <span className="text-normal">Hesabın var mı?</span>
            <span className="text-highlight"> Giriş yap</span>
          </Link>

          <button
            type="button"
            className="login-button"
            onClick={handleRegister}>
            Kayıt Ol
          </button>
        </form>
      </div>
      <div className="copyright-text">© 2024 TicketUp. All rights reserved.</div>
    </div>
  );
};

export default SignupForm;
