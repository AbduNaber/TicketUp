import React from "react";
import Footer from "../../components/Footer";
import { GoogleMap, LoadScript, MarkerF } from "@react-google-maps/api";

const CreatePreview = () => {
  const apiKey = "YOUR_GOOGLE_MAPS_API_KEY";
  const containerStyle = { width: "100%", height: "275px" };
  const center = { lat: -3.745, lng: -38.523 };
  const url = "https://www.google.com/maps";

  const event = {
    imgUrl: "https://via.placeholder.com/600x400",
    name: "Etkinlik Adı",
    description: "Etkinlik açıklaması burada yer alacak.",
    startDate: "2024-12-25",
    startTime: "18:00",
    endDate: "2024-12-26",
    endTime: "23:00",
    organizatorName: "Organizatör İsmi",
    organizatorCompany: "Organizatör Şirketi",
    location: "Etkinlik Konumu"
  };

  const formatDate = (date) => new Date(date).toLocaleDateString();
  const formatTime = (time) => time;

  const save = () => {
    console.log("Kaydet");
  };

  const saveAndPublish = () => {
    console.log("Kaydet ve Yayınla");
  };

  return (
    <div className="flex flex-col min-h-screen bg-gray-100">
      {/* Top Bar */}
      <div className="flex items-center h-16 px-5 bg-transparent">
        <div className="flex items-center justify-center w-36 h-12">
          <img
            src="/src/assets/icons/ticketUp-logo.svg"
            alt="Left Logo"
            className="w-full h-full object-contain"
          />
        </div>
        <div className="ml-5 text-lg font-bold text-blue-600">ORGANİZATOR PANELİ</div>
      </div>

      {/* Main Container */}
      <div className="m-10 p-6 bg-white rounded-lg shadow-md">
        {/* Header */}
        <div className="text-4xl font-bold text-black mb-5">Önizleme</div>

        {/* Progress Bar */}
        <div className="flex items-center justify-around mb-10">
          <div className="w-full h-0.5 bg-black"></div>
          <div className="flex items-center justify-center w-6 h-6 rounded-full bg-black text-white"></div>
          <div className="w-full h-0.5 bg-black"></div>
          <div className="flex items-center justify-center w-6 h-6 rounded-full bg-black text-white"></div>
          <div className="w-full h-0.5 bg-gray-300"></div>
        </div>

        {/* Content */}
        <div className="flex-grow mx-[6vw] mt-[7.5vh] mb-[30vh] flex flex-col items-center">
          <div className="w-full h-[50vh] mb-4 overflow-hidden">
            <img src={event?.imgUrl} alt="Event" className="w-full h-full object-cover" />
          </div>
          <div className="flex justify-between items-center w-full">
            <h2 className="text-2xl font-bold">{event?.name || "Etkinlik Adı Yükleniyor..."}</h2>
          </div>
          <div className="w-full mt-4">
            <h1 className="text-xl text-gray-700 mb-3">Etkinlik Açıklaması</h1>
            <p className="text-gray-600 mb-3">
              {event?.description || "Etkinlik Açıklaması Yükleniyor..."}
            </p>
          </div>

          {/* Properties */}
          <div className="flex w-full justify-between mt-6">
            {/* Left Section */}
            <div className="w-[48%] flex flex-col gap-4">
              <div>
                <h3 className="text-lg font-bold text-gray-800">Başlama Tarihi</h3>
                <p>
                  {event?.startDate ? formatDate(event.startDate) : "Tarih yükleniyor..."} - {event?.startTime ? formatTime(event.startTime) : "Saat Yükleniyor"}
                </p>
                <h3 className="text-lg font-bold text-gray-800">Bitiş Tarihi</h3>
                <p>
                  {event?.endDate ? formatDate(event.endDate) : "Tarih yükleniyor..."} - {event?.endTime ? formatTime(event.endTime) : "Saat Yükleniyor"}
                </p>
                <a href="#" className="text-blue-600 hover:underline">+ Takvime Ekle</a>
              </div>
              <div className="flex items-center gap-4">
                <img src="/src/assets/icons/tsoft-icon.png" alt="Organizer Icon" className="w-12 h-12 rounded-full" />
                <div>
                  <p className="font-bold">{event?.organizatorName || "Organizatör Bilgisi Yükleniyor..."}</p>
                  <p className="font-bold">{event?.organizatorCompany || "Organizatör Bilgisi Yükleniyor..."}</p>
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
              <p className="text-gray-600">{event?.location || "Konum Yükleniyor..."}</p>
              <div className="mt-6 w-full h-[275px] bg-gray-300 flex justify-center items-center rounded">
                <LoadScript googleMapsApiKey={apiKey}>
                  <GoogleMap mapContainerStyle={containerStyle} center={center} zoom={15}>
                    <MarkerF position={center} onClick={() => window.open(url, "_blank")} />
                  </GoogleMap>
                </LoadScript>
              </div>
            </div>
          </div>

          {/* Additional Images */}
          <div className="w-full mt-8">
            <div className="w-full h-[50vh] mb-4 overflow-hidden">
              <img src="https://via.placeholder.com/600x400" alt="Placeholder 1" className="w-full h-full object-cover" />
            </div>
            <div className="w-full h-[50vh] mb-4 overflow-hidden">
              <img src="https://via.placeholder.com/600x400" alt="Placeholder 2" className="w-full h-full object-cover" />
            </div>
          </div>

          <div className="flex justify-end w-full mt-8">
            <button
              className="px-4 py-2 text-sm font-bold text-white bg-gradient-to-r from-pink-500 to-orange-400 rounded-lg"
              onClick={save}
            >
              Kaydet
            </button>

            <button
              className="px-4 py-2 text-sm font-bold text-white bg-gradient-to-r from-pink-500 to-orange-400 rounded-lg ml-4"
              onClick={saveAndPublish}
            >
              Kaydet ve Yayınla
            </button>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default CreatePreview;
