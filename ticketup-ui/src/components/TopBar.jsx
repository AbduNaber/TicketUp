import React from "react";
import GradientButton from "../components/GradientButton"; // GradientButton'u import etmeyi unutmayın.

const TopBar = () => {
  return (
    <div className="w-full bg-white top-0 left-0 z-50 shadow">
        <div className="flex justify-between items-center px-5 py-2 h-[10vh] text-white bg-white">
      {/* Logo */}
      <div className="flex-1">
        <a href="https://www.example.com">
          <img
            src="/src/assets/icons/ticketup_icon_full.png"
            alt="Logo"
            className="w-[200px]"
          />
        </a>
      </div>
      {/* Navigation Links */}
      <div className="flex justify-center items-center">
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
      {/* Profile and Button */}
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
    </div>
  );
};

export default TopBar;
