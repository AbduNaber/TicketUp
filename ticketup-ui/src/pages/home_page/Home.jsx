import GradientButton from "../../components/GradientButton";
import Footer from "../../components/Footer";
import { GoogleMap, LoadScript, MarkerF } from "@react-google-maps/api";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";
import { useEffect, useState } from "react";
import TopBar from "@/components/TopBar";

const Home = () => {
    const navigate = useNavigate();
    return (
        <div className="flex flex-col min-h-screen bg-white overflow-y-auto">
            {/* Top Bar */}
            <TopBar></TopBar>

            {/* Decorative Container */}
            <div className="w-full h-[50vh] bg-gradient-to-r from-purple-300 to-gray-300 flex flex-col items-center justify-center">
                <h1 className="text-5xl font-bold text-gray-800">BOOST YOUR EVENT!</h1>
                <p className="text-lg font-bold text-black mt-2">Etkinlik kaydı ve yönetimini en yeni teknolojiyle kolaylaştırıyoruz.</p>
                <div className="flex gap-4 mt-4">
                <GradientButton text={"Keşfet"} onClick={() => window.location.href = "http://46.101.166.170:5173/event/089289ec-b6fe-428d-a886-e1efd4da2356"}></GradientButton>
                    <GradientButton text={"Kayıt Ol"} onClick={() => navigate("/register")}></GradientButton>
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
                        <GradientButton text={"İletişime Geç"} onClick={() => navigate("/contact-ticketup")}></GradientButton>

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