import GradientButton from "../../components/GradientButton"; 
import Footer from "../../components/Footer";
import { GoogleMap, LoadScript, MarkerF } from "@react-google-maps/api";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";
import { useEffect, useState } from "react";

const apiKey = import.meta.env.VITE_GOOGLE_API_KEY;

if (!apiKey) {
  throw new Error("REACT_APP_GOOGLE_API_KEY is not defined in .env file");
}

const eventImage = "/db_images/Hero-1.jpg";
const containerStyle = {
  width: "100%",
  height: "300px",
};

const center = {
  lat: 37.7749, // Example latitude
  lng: 29.0875, // Example longitude
};
const url = `https://www.google.com/maps?q=${center.lat},${center.lng}`;

const Event = () => {
  const { id } = useParams();
  const [event, setEvent] = useState(null);
  const navigate = useNavigate();

  const handleGoToForm = () => {
    navigate("/form", { state: { eventID: id, imageLink: eventImage } });
  };

  useEffect(() => {
    const fetchEvent = async () => {
      try {
        const response = await axios.get(
          `http://localhost:8080/ticketup/events/list/${id}`
        );
        setEvent(response.data);
        console.log("Event Fetched");
      } catch (error) {
        console.error("Error fetching event:", error.response?.data || error.message);
        alert("Kayıt Başarısız.");
      }
    };

    fetchEvent();
  }, [id]);

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

      {/* Content */}
      <div className="flex-grow mx-[6vw] mt-[7.5vh] mb-[30vh] flex flex-col items-center">
        <div className="w-full h-[50vh] mb-4 overflow-hidden">
          <img src={eventImage} alt="Event" className="w-full h-full object-cover" />
        </div>
        <div className="flex justify-between items-center w-full">
          <h2 className="text-2xl font-bold">Anadolu'dan Dünyaya</h2>
          <GradientButton text="Katılım Formu" onClick={handleGoToForm} />
        </div>
        <div className="w-full mt-4">
          <h1 className="text-xl text-gray-700 mb-3">Etkinlik Açıklaması</h1>
          <p className="text-gray-600 mb-3">
            İlkini Bursa'da gerçekleştirdiğimiz, ikincisini ise 19 Aralık Perşembe günü DENİZLİ Ticaret
            Odası'nda gerçekleştireceğimiz ve Denizli'nin üretici & toptancı & e-ticaret profesyonelleri
            ile e-ihracat'ın olmazsa olmaz sektörlerinden firmaları bir araya getireceğimiz etkinliğe kayıt
            ve etkinlik günü giriş bilgilerini e-posta ve telefonunuza SMS olarak almak için lütfen bu formu
            eksiksiz doldurun.
          </p>
        </div>

        {/* Properties */}
        <div className="flex w-full justify-between mt-6">
          {/* Left Section */}
          <div className="w-[48%] flex flex-col gap-4">
            <div>
              <h3 className="text-lg font-bold text-gray-800">Tarih ve Saat</h3>
              <p>19 Aralık 2024</p>
              <p>19:00</p>
              <a href="#" className="text-blue-600 hover:underline">+ Takvime Ekle</a>
            </div>
            <div className="flex items-center gap-4">
              <img src="/src/assets/icons/tsoft-icon.png" alt="Organizer Icon" className="w-12 h-12 rounded-full" />
              <div>
                <p className="font-bold">T-Soft</p>
                <a href="#" className="inline-block px-4 py-2 text-sm bg-white border border-black rounded-full hover:shadow-lg">İletişime Geç</a>
              </div>
            </div>
            <div className="flex items-center gap-2">
              <img src="/src/assets/icons/upista_icon.png" className="w-7 h-7" alt="Upista Icon" />
              <p className="font-bold text-gray-800">Upista Gururla Sunar</p>
            </div>
          </div>

          {/* Right Section */}
          <div className="w-[48%]">
            <h3 className="text-lg font-bold text-gray-800">Konum</h3>
            <p className="text-gray-600">Denizli Ticaret Odası</p>
            <div className="mt-6 w-full h-[275px] bg-gray-300 flex justify-center items-center rounded">
              <LoadScript googleMapsApiKey={apiKey}>
                <GoogleMap mapContainerStyle={containerStyle} center={center} zoom={15}>
                  <MarkerF position={center} onClick={() => window.open(url, "_blank")} />
                </GoogleMap>
              </LoadScript>
            </div>
          </div>
        </div>
      </div>

      <Footer />
    </div>
  );
};

export default Event;
