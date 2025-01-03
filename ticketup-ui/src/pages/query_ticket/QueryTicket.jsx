import Footer from "../../components/Footer";
import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import TopBar from "@/components/TopBar";

const TicketQuery = () => {
  const [ticketId, setTicketId] = useState("");
  const [contactInfo, setContactInfo] = useState(""); // E-posta veya telefon numarası
  const navigate = useNavigate();

  const handleQuery = async () => {
    try {
      // Giriş türünü belirle (e-posta mı telefon mu)
      const isEmail = contactInfo.includes("@");

      // Kullanıcıdan alınan değerler
      const payload = {
        ticketId,
        participantEmail: isEmail ? contactInfo : null, // E-posta adresi varsa gönder
        participantPhone: !isEmail ? contactInfo : null, // Telefon numarası varsa gönder
      };

      // API isteği
      const response = await axios.post("http://localhost:8080/ticketup/tickets/query", payload);

      // Başarılı, bilet sayfasına yönlendir
      navigate(`/ticket/${response.data.id}`);
    } catch (error) {
      // Hata durumunda kullanıcıya mesaj göster
      alert(error.response?.data || "Bilet bulunamadı veya bilgiler eşleşmiyor.");
    }
  };

  return (

    <div className="flex flex-col min-h-screen bg-white overflow-y-auto">
      {/* Top Bar */}
      <TopBar></TopBar>

      {/* Content Section */}
      <div className="flex flex-col px-5 py-10 mt-28 mb-28 justify-center items-center flex-grow">
        <h1 className="text-5xl font-bold text-gray-800 mb-10">Biletini Sorgula</h1>
        <div className="flex justify-between gap-6 mt-12 w-2/3">

          {/* Kutucuk 1 */}
          <div className="flex flex-col flex-1">
            <label className="text-lg font-medium text-gray-700 mb-2">Lütfen bilet ID'si giriniz</label>
            <input
                type="text"
                value={ticketId}
                onChange={(e) => setTicketId(e.target.value)}
                placeholder="Lütfen bir sayı girin"
                className="border border-gray-300 rounded-lg p-3 text-gray-600"
            />
          </div>

          {/* Kutucuk 2 */}
          <div className="flex flex-col flex-1">
            <label className="text-lg font-medium text-gray-700 mb-2">Cep telefonu veya e-posta giriniz</label>
            <input
                type="text"
                value={contactInfo}
                onChange={(e) => setContactInfo(e.target.value)}
                placeholder="+90.. veya ticketup@gmail.com"
                className="border border-gray-300 rounded-lg p-3 text-gray-600"
            />
          </div>
        </div>

        <div className="flex mt-20">
          <button
              onClick={handleQuery}
              className="px-6 py-3 bg-gradient-to-r from-pink-500 to-orange-500 text-white font-bold rounded-lg"
          >
            Biletini Sorgula
          </button>
        </div>

      </div>

      <Footer/>
    </div>
  );
};

export default TicketQuery;