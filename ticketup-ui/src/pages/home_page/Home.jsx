import GradientButton from "../../components/GradientButton";
import Footer from "../../components/Footer";
import { GoogleMap, LoadScript, MarkerF } from "@react-google-maps/api";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";
import { useEffect, useState } from "react";

const Home = () => {
    return (
        <div className="flex flex-col min-h-screen bg-white overflow-y-auto">
            {/* Top Bar */}
            <div className="flex justify-between items-center px-5 py-2 h-[10vh] text-white bg-white">
                <div className="flex-1">
                    <a href="https://www.example.com">
                        <img src="/src/assets/icons/ticketup_icon_full.png" alt="Logo" className="w-[200px]" />
                    </a>
                </div>
                <div className="flex justify-center items-center">
                    <a href="#" className="text-black text-sm mx-6 hover:underline">Ana Sayfa</a>
                    <a href="#" className="text-black text-sm mx-6 hover:underline">Neden Biz</a>
                    <a href="#" className="text-black text-sm mx-6 hover:underline">Bizimle İletişime Geçin</a>
                </div>
                <div className="flex items-center gap-4 flex-1 justify-end">
                    <GradientButton text="Biletini Sorgula" onClick={() => { }} />
                    <a href="https://www.example.com">
                        <img src="/src/assets/icons/account.png" alt="Logo" className="w-10 h-10 rounded-full" />
                    </a>
                </div>
            </div>

            {/* Decorative Container */}
            <div className="w-full h-[50vh] bg-gradient-to-r from-purple-300 to-gray-300 flex flex-col items-center justify-center">
                <h1 className="text-5xl font-bold text-gray-800">BOOST YOUR EVENT!</h1>
                <p className="text-lg font-bold text-black mt-2">Etkinlik kaydı ve yönetimini en yeni teknolojiyle kolaylaştırıyoruz.</p>
                <div className="flex gap-4 mt-4">
                    <button className="bg-white text-gray-800 px-8 py-3 rounded-full shadow-md hover:bg-gray-100 transition font-bold">
                        Keşfet
                    </button>
                    <button className="bg-white text-gray-800 px-8 py-3 rounded-full shadow-md hover:bg-gray-100 transition font-bold">
                        Kayıt Ol
                    </button>
                </div>
            </div>
            <div className="flex w-full h-[50vh] p-8 mt-12">
                {/* Sol Parça */}
                <div className="w-1/2 bg-white flex flex-col justify-center p-8">
                    <h2 className="text-3xl font-bold text-gray-800 mb-4">Etkinlik Yönetiminin Kolay Yolu</h2>
                    <p className="text-lg text-gray-700 leading-relaxed">
                        Etkinliklerinizi düzenlemek, katılımcılarınızla güçlü bir bağ kurmak ve her adımı profesyonelce yönetmek artık çok daha kolay.
                        Platformumuz, kullanıcı dostu arayüzü ve gelişmiş özellikleri ile iş yükünüzü azaltırken katılımcılarınız için unutulmaz bir deneyim sunar.
                    </p>
                </div>

                {/* Sağ Parça */}
                <div className="w-1/2 flex items-center justify-center p-8">
                    <img src="/src/assets/images/home_page.png" alt="Etkinlik Görseli" className="w-auto h-auto object-cover rounded-lg shadow-lg" />
                </div>
            </div>

            <div className="flex w-full h-[50vh] p-8 mt-6 mb-12">
                {/* Sol Parça */}
                <div className="w-1/2 bg-white flex items-center justify-center p-8">
                    <div className="flex items-center gap-6">
                        <h2 className="text-2xl font-bold text-gray-800 w-1/2">
                            Hayalinizdeki etkinliği yönetmek için bizimle iletişime geçin
                        </h2>
                        <button className="bg-white text-black px-10 py-4 rounded-full text-lg font-bold shadow-md border border-gray-300 hover:bg-gray-100 transition">
                            İletişime Geç
                        </button>

                    </div>
                </div>

                {/* Sağ Parça */}
                <div className="w-1/2 "></div>
            </div>

            <Footer />
        </div>
    );
};

export default Home;