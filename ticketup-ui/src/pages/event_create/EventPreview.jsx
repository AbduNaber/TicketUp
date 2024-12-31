import React from "react";
import Footer from "../../components/Footer";
import { GoogleMap, LoadScript, MarkerF } from "@react-google-maps/api";
import GradientButton from "../../components/GradientButton";

const EventPreview = ({event1 , setActiveItem} ) => {
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
     

      {/* Main Container */}
      <div className="m-10 p-6 bg-white rounded-lg shadow-md">
        {/* Header */}
        <div className="text-4xl font-bold text-black mb-5">Önizleme</div>

        {/* Progress Bar */}
       

        {/* Content */}
        <div className="flex-grow mx-[6vw] mt-[7.5vh] mb-[30vh] flex flex-col items-center">
        
          <div className="w-full h-[50vh] mb-4 overflow-hidden">
            <img src={event?.imgUrl} alt="Event" className="w-full h-full object-cover" />
          </div>
          <div className="flex justify-between items-center w-full">
            <h2 className="text-2xl font-bold">{event?.name || "Etkinlik Adı Yükleniyor..."}</h2>
            <GradientButton text="Katılım Formu"  />
          </div>
          <div className="w-full mt-4">
            <h1 className="text-xl text-gray-700 mb-3">Etkinlik Açıklaması</h1>
            <p className="text-gray-600 mb-3">
              {event?.description || "Etkinlik Açıklaması Yükleniyor..."}
            </p>
          </div>


          <div className="flex w-full justify-between mt-6">
            {/* Left Section */}
            <div className="w-[48%] flex flex-col ">
              {/* Start Date*/}
              <div className="flex gap-8">
                <div className="flex flex-col items-start gap-2">
                  <h3 className="text-lg font-bold text-gray-800">Başlangıç Tarihi</h3>
                  <div className="flex items-center gap-2">
                    <img src="/src/assets/icons/calendar_icon.svg" alt="Calendar Icon" className="w-5 h-5" />
                    <p className="font-medium text-gray-600">
                      {event?.startDate ? formatDate(event.startDate) : "Yükleniyor..."}
                    </p>
                  </div>
                  <div className="flex items-center gap-2">
                    <img src="/src/assets/icons/clock_icon.svg" alt="Clock Icon" className="w-5 h-5" />
                    <p className="font-medium text-gray-600">
                      {event?.startTime ? formatTime(event.startTime) : "Yükleniyor..."}
                    </p>
                  </div>
                </div>
                {/* Finish Date*/}
                <div className="flex flex-col items-start gap-2">
                  <h3 className="text-lg font-bold text-gray-800">Bitiş Tarihi</h3>
                  <div className="flex items-center gap-2">
                    <img src="/src/assets/icons/calendar_icon.svg" alt="Calendar Icon" className="w-5 h-5" />
                    <p className="font-medium text-gray-600">
                      {event?.endDate ? formatDate(event.endDate) : "Yükleniyor..."}
                    </p>
                  </div>
                  <div className="flex items-center gap-2">
                    <img src="/src/assets/icons/clock_icon.svg" alt="Clock Icon" className="w-5 h-5" />
                    <p className="font-medium text-gray-600">
                      {event?.endTime ? formatTime(event.endTime) : "Yükleniyor..."}
                    </p>
                  </div>
                </div>
              </div>
              <a
                  href="#"
                  
                  className="text-blue-600 hover:underline self-start mt-2"
              >
                + Takvime Ekle
              </a>


              <h3 className="text-lg font-bold text-gray-800 mt-6">Organizatör</h3>
              <div className="flex items-center gap-6 p-4 border border-gray-300 rounded-lg shadow-sm w-fit">
                <img
                    src={event?.organizator_pp || "/src/assets/icons/profile_icon.svg"}
                    alt="Organizer Icon"
                    className="w-16 h-16 rounded-full border border-gray-300 shadow-sm"
                />
                <div className="flex flex-col">
                  <p className="font-bold text-gray-800">
                    {event?.organizatorName || "Organizatör Bilgisi Yükleniyor..."}
                  </p>
                  <p className="text-gray-600">
                    {event?.organizatorCompany || "Organizatör Bilgisi Yükleniyor..."}
                  </p>
                  <a
                      href="#"
                      className="inline-block px-4 py-2 mt-2 text-sm text-white bg-blue-600 rounded-full hover:bg-blue-700"
                  >
                    İletişime Geç
                  </a>
                </div>
              </div>
            </div>

            {/* Right Section */}
            <div className="w-[48%]">
              <h3 className="text-lg font-bold text-gray-800">Konum</h3>
              <div className="flex items-center gap-2">
                <img src="/src/assets/icons/location_icon.svg" alt="Calendar Icon" className="w-5 h-5" />
                <p className="text-gray-600">
                  {event?.location || "Yükleniyor..."}
                </p>
              </div>
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
         

          <div className="flex justify-end w-full mt-8">
            <button
              className="px-4 py-2 text-sm font-bold text-white bg-gradient-to-r from-pink-500 to-orange-400 rounded-lg"
              onClick={save}
            >
              Geri Dön
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

export default EventPreview;