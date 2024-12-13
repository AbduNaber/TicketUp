import { useState } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';

const Register = () => {
  const [formData, setFormData] = useState({
    name: '',
    surname: '',
    mailAddress: '',
    organizationName: '',
    password: '',
    confirmPassword: '',
  });

  const [passwordVisible, setPasswordVisible] = useState(false);
  const [errors, setErrors] = useState({});

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });

    let formErrors = {};
    if (name === 'name' && !/^[A-Za-z\s]+$/.test(value)) {
      formErrors.name = 'İsim geçerli olmalı (sadece harf ve boşluk)';
    }
    if (name === 'surname' && !/^[A-Za-z\s]+$/.test(value)) {
      formErrors.surname = 'Soyisim geçerli olmalı (sadece harf ve boşluk)';
    }
    if (name === 'mailAddress' && !/^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/.test(value)) {
      formErrors.mailAddress = 'Geçerli bir e-posta adresi giriniz';
    }
    if (name === 'organizationName' && !/^[A-Za-z0-9\s]+$/.test(value)) {
      formErrors.organizationName = 'Geçerli bir organizasyon adı giriniz';
    }
    if (name === 'password' && !/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[A-Za-z\d]{8,}$/.test(value)) {
      formErrors.password = 'Şifre en az 8 karakter olmalı, 1 büyük harf, 1 küçük harf, 1 rakam içermelidir';
    }
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
    if (Object.keys(errors).length > 0) return;

    try {
      const requestBody = {
        name: formData.name,
        surname: formData.surname,
        email: formData.mailAddress,
        organizationName: formData.organizationName,
        passwordHash: formData.password,
      };
      await axios.post('http://localhost:8080/ticketup/organizators/register', requestBody);
      alert('Kayıt başarılı!');
    } catch (error) {
      console.error('Kayıt sırasında hata:', error);
      alert('Kayıt başarısız.');
    }
  };

  return (
    <div className="bg-cover bg-center h-screen flex items-center justify-center text-white" style={{ backgroundImage: "url('/src/assets/images/login_bg.png')" }}>
      <div className="w-[40vw] h-[80vh] bg-white/70 shadow-lg rounded-2xl flex flex-col items-center justify-center">
        <h2 className="text-3xl font-semibold text-black my-2">TicketUp'a Organizatör Olarak Kayıt Olun</h2>
        <form className="flex flex-col w-[28vw]">
          <div className="flex space-x-4 mb-4">
            <div className="flex-1">
              <input
                type="text"
                name="name"
                value={formData.name}
                onChange={handleInputChange}
                placeholder="İsim"
                className="p-3 text-base border border-gray-300 rounded-lg w-full"
              />
              {errors.name && <span className="text-red-500 text-sm">{errors.name}</span>}
            </div>
            <div className="flex-1">
              <input
                type="text"
                name="surname"
                value={formData.surname}
                onChange={handleInputChange}
                placeholder="Soyisim"
                className="p-3 text-base border border-gray-300 rounded-lg w-full"
              />
              {errors.surname && <span className="text-red-500 text-sm">{errors.surname}</span>}
            </div>
          </div>
          <input
            type="text"
            name="mailAddress"
            value={formData.mailAddress}
            onChange={handleInputChange}
            placeholder="E-posta"
            className="p-3 text-base border border-gray-300 rounded-lg mb-4"
          />
          {errors.mailAddress && <span className="text-red-500 text-sm">{errors.mailAddress}</span>}

          <input
            type="text"
            name="organizationName"
            value={formData.organizationName}
            onChange={handleInputChange}
            placeholder="Organizasyon Adı"
            className="p-3 text-base border border-gray-300 rounded-lg mb-4"
          />
          {errors.organizationName && <span className="text-red-500 text-sm">{errors.organizationName}</span>}

          <div className="flex space-x-4 mb-4">
            <div className="relative w-full">
              <input
                type={passwordVisible ? 'text' : 'password'}
                name="password"
                value={formData.password}
                onChange={handleInputChange}
                placeholder="Şifre"
                className="p-3 text-base border border-gray-300 rounded-lg w-full"
              />
              <img
                src={passwordVisible ? '/src/assets/icons/eye_closed.png' : '/src/assets/icons/eye_opened.png'}
                alt="Toggle Password"
                className="absolute top-3 right-3 w-6 h-6 cursor-pointer"
                onClick={togglePasswordVisibility}
              />
              {errors.password && <span className="text-red-500 text-sm">{errors.password}</span>}
            </div>
            <div className="relative w-full">
              <input
                type={passwordVisible ? 'text' : 'password'}
                name="confirmPassword"
                value={formData.confirmPassword}
                onChange={handleInputChange}
                placeholder="Şifreyi Doğrula"
                className="p-3 text-base border border-gray-300 rounded-lg w-full"
              />
              {errors.confirmPassword && <span className="text-red-500 text-sm">{errors.confirmPassword}</span>}
            </div>
          </div>
          <Link to="/login" className="text-sm text-black mb-4">
            <span className="text-black">Hesabın var mı?</span>
            <span className="text-green-500"> Giriş yap</span>
          </Link>
          <button
            type="submit"
            onClick={handleRegister}
            className="bg-gradient-to-r from-pink-500 to-orange-500 text-black font-bold py-3 px-4 rounded-full hover:bg-green-500 transition"
          >
            Kayıt Ol
          </button>
        </form>
      </div>
    </div>
  );
};

export default Register;
