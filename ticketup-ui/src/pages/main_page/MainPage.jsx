import GradientButton from "../../components/GradientButton"; 
import Footer from "../../components/Footer";
import { GoogleMap, LoadScript, MarkerF } from "@react-google-maps/api";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";
import { useEffect, useState } from "react";

const MainPage = () => {
  return (
    <div className="flex flex-col min-h-screen bg-white overflow-y-auto">
      {/* Top Bar */}
      <div className="flex justify-between items-center px-5 py-2 h-[10vh] text-white bg-white">
        <div className="flex-1">
          <a href="https://www.example.com">
            <img src="/src/assets/icons/ticketup_icon_full.png" alt="Logo" className="w-[200px]" />
          </a>
        </div>
        <div className="flex justify-center items-center ">
          <a href="#" className="text-black text-sm mx-6 hover:underline">Ana Sayfa</a>
          <a href="#" className="text-black text-sm mx-6 hover:underline">Neden Biz</a>
          <a href="#" className="text-black text-sm mx-6 hover:underline">Bizimle İletişime Geçin</a>
        </div>
        <div className="flex items-center gap-4 flex-1 justify-end">
          <GradientButton text="Biletini Sorgula" onClick={() => {}} />
          <a href="https://www.example.com">
            <img src="/src/assets/icons/account.png" alt="Logo" className="w-10 h-10 rounded-full" />
          </a>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default MainPage;
