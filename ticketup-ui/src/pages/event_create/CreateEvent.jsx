import GradientButton from "../../components/GradientButton";
import Footer from "../../components/Footer";
import EmptyBox from "../../components/empty_box";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css"; 
import React, { useState } from "react";
import { GoogleMap, LoadScript, MarkerF } from "@react-google-maps/api";

const turkishCities = [
    "Adana", "Adıyaman", "Afyonkarahisar", "Ağrı", "Aksaray", "Amasya", "Ankara", "Antalya", 
    "Ardahan", "Artvin", "Aydın", "Balıkesir", "Bartın", "Batman", "Bayburt", "Bilecik", 
    "Bingöl", "Bitlis", "Bolu", "Burdur", "Bursa", "Çanakkale", "Çankırı", "Çorum", 
    "Denizli", "Diyarbakır", "Düzce", "Edirne", "Elazığ", "Erzincan", "Erzurum", "Eskişehir", 
    "Gaziantep", "Giresun", "Gümüşhane", "Hakkâri", "Hatay", "Iğdır", "Isparta", "İstanbul", 
    "İzmir", "Kahramanmaraş", "Karabük", "Karaman", "Kars", "Kastamonu", "Kayseri", 
    "Kilis", "Kırıkkale", "Kırklareli", "Kırşehir", "Kocaeli", "Konya", "Kütahya", 
    "Malatya", "Manisa", "Mardin", "Mersin", "Muğla", "Muş", "Nevşehir", "Niğde", 
    "Ordu", "Osmaniye", "Rize", "Sakarya", "Samsun", "Şanlıurfa", "Siirt", "Sinop", 
    "Şırnak", "Sivas", "Tekirdağ", "Tokat", "Trabzon", "Tunceli", "Uşak", "Van", 
    "Yalova", "Yozgat", "Zonguldak"
  ];


const CreateEvent = () => {
    const apiKey = import.meta.env.VITE_GOOGLE_API_KEY;
    

    const [coordinates, setCoordinates] = useState({ lat: 37.7749, lng: -122.4194 }); // Default coordinates
    const [inputValue, setInputValue] = useState(`${coordinates.lat}, ${coordinates.lng}`);

    const handleMapClick = (event) => {
    const lat = event.latLng.lat();
    const lng = event.latLng.lng();
    setCoordinates({ lat, lng });
    setInputValue(`${lat}, ${lng}`);
    };

    const handleInputChange = (e) => {
    setInputValue(e.target.value);
    const [lat, lng] = e.target.value.split(",").map(Number);
    if (!isNaN(lat) && !isNaN(lng)) {
    setCoordinates({ lat, lng });
    }
    };


    const [description, setDescription] = useState("");

  const handleDescriptionChange = (value) => {
    setDescription(value);
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

      <div className="m-10 p-6 bg-white rounded-lg shadow-md">
        {/* Header */}
        <div className="text-4xl font-bold text-black mb-5">Etkinlik Oluştur</div>

        {/* Progress Bar */}
        <div className="flex items-center justify-around mb-10">
          <div className="w-full h-0.5 bg-black"></div>
          <div className="flex items-center justify-center w-6 h-6 rounded-full bg-black text-white"></div>
          <div className="w-full h-0.5 bg-gray-300"></div>
          <div className="flex items-center justify-center w-6 h-6 rounded-full border-2 border-gray-300"></div>
          <div className="w-full h-0.5 bg-gray-300"></div>
        </div>

        {/* Event Details Section */}
        <div className="flex items-center mb-6">
          <EmptyBox width="175px" height="75px" />
          <div className="text-2xl font-normal text-black">Etkinlik Detayları</div>
        </div>
        <div className="grid grid-cols-3 gap-4 mb-6">
            <div className="flex flex-col gap-2">
                <label className="text-lg font-medium text-black whitespace-nowrap">
                Etkinlik Başlığı <span className="text-red-600">*</span>
                </label>
                <input
                type="text"
                className="h-12 w-80 p-3 text-base border border-gray-300 rounded-md"
                placeholder="Etkinliğin adını giriniz"
                />
            </div>
          <div className="flex flex-col gap-2">
            <label className="text-lg font-medium text-black">
              Başlangıç Tarihi <span className="text-red-600">*</span>
            </label>
            <input
              type="date"
              className="w-80 h-12 p-3 mt-2 text-base border border-gray-300 rounded-md"
            />
          </div>
          <div className="flex flex-col gap-2">
            <label className="text-lg font-medium text-black">
              Başlangıç Saati <span className="text-red-600">*</span>
            </label>
            <input
              type="time"
              className="w-80 h-12 p-3 mt-2 text-base border border-gray-300 rounded-md"
            />
          </div>
        </div>

        {/* Event Location Section */}
        <div className="grid grid-cols-2 gap-4 mb-6 mr-50">
          <div className="flex flex-col gap-2">
            <label className="text-lg font-medium text-black ">
              Etkinlik Nerede Olacak? <span className="text-red-600">*</span>
            </label>
            <select className="w-80 h-12 p-3 mt-2 text-base border border-gray-300 rounded-md">
            {turkishCities.map((city) => (
                <option key={city} value={city.toLowerCase()}>
                {city}
                </option>
            ))}
            </select>
          </div>
          <div>
      <label className="text-lg font-medium text-black">
        Haritadan seçiniz: <span className="text-red-600">*</span>
      </label>
      <input
        type="text"
        className="w-full h-12 p-3 mt-2 text-base border border-gray-300 rounded-md"
        placeholder="Koordinat Giriniz"
        value={inputValue}
        onChange={handleInputChange}
      />
      <div className="mt-4 h-80 border border-gray-300 rounded-md">
        <LoadScript googleMapsApiKey={apiKey}>
          <GoogleMap
            mapContainerStyle={{ width: "100%", height: "100%" }}
            center={coordinates}
            zoom={12}
            onClick={handleMapClick}
          >
            <MarkerF position={coordinates} />
          </GoogleMap>
        </LoadScript>
      </div>
    </div>
        </div>

        {/* Event Description Section */}
        <div className="mb-6">
            <label className="text-lg font-medium text-black">
            Etkinlik Hakkında <span className="text-red-600">*</span>
            </label>
            <ReactQuill
            value={description}
            onChange={handleDescriptionChange}
            placeholder="Etkinliğinizi tanıtın"
            className="mt-2 h-60 mb-2"
            theme="snow"
            modules={{
                toolbar: [
                [{ header: [1, 2, 3, false] }],
                ["bold", "italic", "underline", "strike"], // Text formatting
                [{ list: "ordered" }, { list: "bullet" }], // Lists
                ["link", "image"], // Link and image
                ["clean"], // Remove formatting
                ],
            }}
            formats={[
                "header",
                "bold",
                "italic",
                "underline",
                "strike",
                "list",
                "bullet",
                "link",
                "image",
            ]}
            />
        </div>

        {/* File Upload */}
        <div className="mb-6 ">
          <label className="text-lg font-medium text-black">Görüntü Yükle</label>
          <div className="flex items-center justify-center w-full max-w-md p-4 mt-2 border-2 border-dashed rounded-md bg-gray-50 border-gray-300">
            <input type="file" className="hidden" id="file-upload" />
            <label
              htmlFor="file-upload"
              className="px-4 py-2 text-sm font-bold text-white bg-blue-500 rounded cursor-pointer hover:bg-blue-600"
            >
              Dosya Seç
            </label>
            <span className="ml-3 text-sm text-gray-600">
              Görüntü yüklemek için bir dosya seçin
            </span>
          </div>
        </div>

        {/* Buttons */}
        <div className="flex justify-end mt-8">
          <GradientButton text="Etkinlik Önizleme" onClick={() => {}} />
        </div>
      </div>

      <Footer />
    </div>
  );
};

export default CreateEvent;
