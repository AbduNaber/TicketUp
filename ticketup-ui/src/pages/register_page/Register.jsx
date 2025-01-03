import { useState } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { ToastContainer, toast } from "react-toastify";
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
  
    let formErrors = { ...errors }; // Preserve existing errors
  
    // Validate each field
    if (name === 'name' && !/^[A-Za-z\s]+$/.test(value)) {
      formErrors.name = 'İsim geçerli olmalı (sadece harf ve boşluk)';
    } else {
      delete formErrors.name;
    }
  
    if (name === 'surname' && !/^[A-Za-z\s]+$/.test(value)) {
      formErrors.surname = 'Soyisim geçerli olmalı (sadece harf ve boşluk)';
    } else {
      delete formErrors.surname;
    }
  
    if (name === 'mailAddress' && !/^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/.test(value)) {
      formErrors.mailAddress = 'Geçerli bir e-posta adresi giriniz';
    } else {
      delete formErrors.mailAddress;
    }
  
    if (name === 'organizationName' && !/^[A-Za-z0-9\s]+$/.test(value)) {
      formErrors.organizationName = 'Geçerli bir organizasyon adı giriniz';
    } else {
      delete formErrors.organizationName;
    }
  
    if (name === 'password') {
      if (!/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[A-Za-z\d]{8,}$/.test(value)) {
        formErrors.password = 'Şifre en az 8 karakter olmalı, 1 büyük harf, 1 küçük harf, 1 rakam içermelidir';
      } else {
        delete formErrors.password;
      }
  
      
      if (formData.confirmPassword && formData.confirmPassword !== value) {
        formErrors.confirmPassword = 'Şifreler uyuşmuyor';
      } else if (formData.confirmPassword) {
        delete formErrors.confirmPassword;
      }
    }
  
    if (name === 'confirmPassword') {
      if (value !== formData.password) {
        formErrors.confirmPassword = 'Şifreler uyuşmuyor';
      } else if (!/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[A-Za-z\d]{8,}$/.test(formData.password)) {
        formErrors.confirmPassword = 'Şifre geçersiz olduğu için şifreler doğrulanamaz';
      } else {
        delete formErrors.confirmPassword;
      }
    }
  
    setErrors(formErrors);
  };

  const togglePasswordVisibility = () => {
    setPasswordVisible(!passwordVisible);
  };
  const navigate = useNavigate();

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
      await axios.post('http://46.101.166.170:8080/ticketup/organizators/register', requestBody);
      toast.success('Kayıt başarılı. Giriş yapabilirsiniz.');
      navigate('/login?registered=true');
    } catch (error) {
      if (error.response?.status === 409) {
        const errorMessage = error.response.data?.error ;
        toast.error(errorMessage);
        return;
      }
      

  
      const errorMessage =
        error.response?.data?.error || 
        'Kayıt sırasında bir hata oluştu. Lütfen tekrar deneyin.';
  
      toast.error(errorMessage);
    }
  };

  const isFormValid = () => {
    return (
      formData.name &&
      formData.surname &&
      formData.mailAddress &&
      formData.organizationName &&
      formData.password &&
      formData.confirmPassword &&
      Object.keys(errors).length === 0
    );
  };

  return (
    <div className="bg-cover bg-center h-screen flex items-center justify-center text-white" style={{ backgroundImage: "url('/src/assets/images/login_bg.png')" }}>
      <div className="w-[40vw] h-[75vh] bg-white/90 shadow-lg rounded-2xl flex flex-col items-center justify-center">
        <h2 className="text-3xl font-semibold text-black my-2 -mt-4 mb-10">TicketUp'a Organizatör Olarak Kayıt Olun</h2>
        <form onSubmit={handleRegister} className="flex flex-col w-[28vw]">
          <div className="flex space-x-4 mb-4">
            <div className="flex-1">
              <input
                type="text"
                name="name"
                value={formData.name}
                onChange={handleInputChange}
                placeholder="İsim"
                className="text-black p-3 text-base border border-gray-300 rounded-lg w-full"
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
                className="text-black p-3 text-base border border-gray-300 rounded-lg w-full"
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
            className="text-black p-3 text-base border border-gray-300 rounded-lg mb-4"
          />
          {errors.mailAddress && <span className="text-red-500 text-sm">{errors.mailAddress}</span>}

          <input
            type="text"
            name="organizationName"
            value={formData.organizationName}
            onChange={handleInputChange}
            placeholder="Organizasyon Adı"
            className="text-black p-3 text-base border border-gray-300 rounded-lg mb-4"
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
                className="text-black p-3 text-base border border-gray-300 rounded-lg w-full"
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
                className="text-black p-3 text-base border border-gray-300 rounded-lg w-full"
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
            disabled={!isFormValid()}
            className={`bg-gradient-to-r from-pink-500 to-orange-500 text-black font-bold py-3 px-4 rounded-full hover:bg-green-500 transition ${
              !isFormValid() ? 'opacity-50 cursor-not-allowed' : ''
            }`}
          >
            Kayıt Ol
          </button>
        </form>
      </div>
      <ToastContainer />
    </div>
  );
};

export default Register;
