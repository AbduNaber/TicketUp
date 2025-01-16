import React from "react";
import Footer from "../../components/Footer";
import GradientButton from "../../components/GradientButton";

const ContactUs = () => {
  return (
    <div className="flex flex-col min-h-screen bg-white">
      {/* Top Bar */}
      <div className="flex justify-between items-center px-5 py-2 h-[10vh] text-white bg-white">
        <div className="flex-1">
          <a href="https://www.example.com">
            <img
              src="/src/assets/icons/ticketup_icon_full.png"
              alt="Logo"
              className="w-[200px]"
            />
          </a>
        </div>
        <div className="flex justify-center items-center ">
          <a href="#" className="text-black text-sm mx-6 hover:underline">
            Ana Sayfa
          </a>
          <a href="#" className="text-black text-sm mx-6 hover:underline">
            Neden Biz
          </a>
          <a href="#" className="text-black text-sm mx-6 hover:underline">
            Bizimle İletişime Geçin
          </a>
        </div>
        <div className="flex items-center gap-4 flex-1 justify-end">
          <GradientButton text="Biletini Sorgula" onClick={() => {}} />
          <a href="https://www.example.com">
            <img
              src="/src/assets/icons/account.png"
              alt="Logo"
              className="w-10 h-10 rounded-full"
            />
          </a>
        </div>
      </div>

      {/* Placeholder Image with Text */}
      <div className="relative w-full h-[400px]">
        <imgS
          src="/src/assets/images/contact_us.png"
          className="w-full h-full object-cover"
        />
        <div className="absolute bottom-4 left-4 text-black text-4xl font-bold">
          Bizimle İletişime Geçin
        </div>
      </div>

      {/* Form Container */}
      <div className="container mx-auto mt-8 mb-20 p-6">
        <div className="flex flex-wrap">
          {/* Left Side */}
          <div className="w-full md:w-1/2 p-4">
            <input
              type="text"
              placeholder="İsim"
              className="w-full mb-9 p-3 border border-gray-300 rounded-md"
            />
            <input
              type="email"
              placeholder="Soyisim"
              className="w-full mb-9 p-3 border border-gray-300 rounded-md"
            />
            <input
              type="tel"
              placeholder="E-posta veya Telefon Numarası"
              className="w-full mb-4 p-3 border border-gray-300 rounded-md"
            />
          </div>

          {/* Right Side */}
          <div className="w-full md:w-1/2 p-4">
            <textarea
              placeholder="Mesajınız"
              className="w-full h-[220px] p-3 border border-gray-300 rounded-md resize-none"
            ></textarea>
          </div>
        </div>
        <div className="flex justify-end mt-6">
          <GradientButton text="Gönder" onClick={() => alert("Mesajınız gönderildi!")} />
        </div>
      </div>

      {/* New Container */}
      <div className="container mx-auto p-6 mb-20">
        <div className="flex flex-wrap">
          {/* Left Side */}
          <div className="w-full md:w-1/2 p-4 flex flex-col items-center justify-center text-center">
            <h2 className="text-xl font-bold mb-2">ADRESİMİZ</h2>
            <p className="text-gray-600">ESENTEPE MAH. ECZA SOK.</p>
            <p className="text-gray-600">NO:4/1 ŞİŞLİ, İSTANBUL</p>
            <div className="my-4"></div>
            <h2 className="text-xl font-bold mb-2">TELEFON</h2>
            <p className="text-gray-600">+90 850 307 1245</p>
          </div>

          {/* Right Side */}
          <div className="w-full md:w-1/2 p-4 flex items-center justify-center">
            <img
              src="https://via.placeholder.com/400x300"
              alt="Placeholder"
              className="w-full max-w-md rounded-md"
            />
          </div>
        </div>
      </div>

      <Footer />
    </div>
  );
};

export default ContactUs;
