
import { useState, useEffect } from 'react';
import {Type, Image as ImageIcon, Info } from 'lucide-react';
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
import { GoogleMap, MarkerF } from "@react-google-maps/api";
import { jwtDecode } from "jwt-decode";
import axios from "axios";
import sanitizeHtml from "sanitize-html";
import { toast } from "react-toastify";
import { useNavigate } from 'react-router-dom';


const CreateEvent = () => {

  const apiKey = import.meta.env.VITE_GOOGLE_API_KEY;
  const [coordinates, setCoordinates] = useState({ lat: 37.7749, lng: -122.4194 }); // Default coordinates
  const [inputValue, setInputValue] = useState(`${coordinates.lat}, ${coordinates.lng}`);
  const [description, setDescription] = useState("");
  const [eventTitle, setEventTitle] = useState("");
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");
  const [startTime, setStartTime] = useState("");
  const [endTime, setEndTime] = useState("");
  const [eventType, setEventType] = useState("");
  const [eventLocation, setEventLocation] = useState("");
  const [isFormValid, setIsFormValid] = useState(false);
  const [uploadedImageUrl, setUploadedImageURl] = useState("");
  const token = sessionStorage.getItem("token");
  const parsedToken = token ? jwtDecode(token) : null;
  const [apiLoaded, setApiLoaded] = useState(false);
  const navigate = useNavigate();
    
    
  const handleMapClick = (event) => {
  const lat = event.latLng.lat();
  const lng = event.latLng.lng();
  setCoordinates({ lat, lng });
  setInputValue(`${lat}, ${lng}`);
  };




  const handleDescriptionChange = (value) => {
    setDescription(value);
  };


  const validateForm = () => {
    
    return eventTitle && startDate && endDate && startTime && endTime && eventType && eventLocation && description && coordinates && uploadedImageUrl;
  };
  
  useEffect(() => {
    setIsFormValid(validateForm());
  }, [eventTitle, startDate, endDate, startTime, endTime, eventType, eventLocation, description, coordinates, uploadedImageUrl]);
  
  const handleChange = (setter) => (e) => {
    setter(e.target.value);
    validateForm();
  };

  const handleFileUpload = async(e) => {
    const file = e.target.files[0];
    if(!file) return;

    const formData = new FormData();
    formData.append("file", file);

    const token = sessionStorage.getItem("token");

    try{
      const response = await fetch("http://localhost:8080/ticketup/files/upload", {
        method: "POST", 
        body: formData,
        headers: {
          "Authorization": `Bearer ${token}`,
        },
      });

      if(!response.ok) throw new Error("Dosya Yüklenemedi");

      const data = await response.json();
      setUploadedImageURl(data.url);
      console.log("Yüklenen dosya URL si: ", data.url);
    } catch(error){
      console.error("Dosya Yükleme Hatası: ", error);
    }
  };

  const handleSubmit = async(e) => {
    e.preventDefault();

    if (!token) {
      console.error("No token found. Redirecting to login.");
      window.location.href = "/login";
      return;
    }

    if (!parsedToken || !parsedToken.id) {
      console.error("Invalid token. No user ID found.");
      window.location.href = "/login";
      return;
    }

    try{
      const organizer =  await axios.get(
        `http://localhost:8080/ticketup/organizators/list/${parsedToken.id}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      const sanitizedDescription = sanitizeHtml(description, {
        allowedTags: [],
        allowedAttributes: {}, 
      });

      const requestBody = {
        name: eventTitle,
        organizatorId: parsedToken.id,
        organizatorName: organizer.data.name,
        organizatorCompany: organizer.data.organizationName,
        organizatorPicture: organizer.data.profilePicture,
        location: eventLocation,
        description: sanitizedDescription,
        startDate: startDate,
        endDate: endDate,
        latitude: coordinates.lat,
        longitude: coordinates.lng,
        startTime: startTime,
        endTime: endTime,
        imgUrl: uploadedImageUrl,
        eventType: eventType,
      };

      navigate("/event-preview", {state: {event: requestBody}});
    }catch(error){
      console.error(error);
    }
  };

  useEffect(() => {
    if (!window.google) {
      const script = document.createElement("script");
      script.src = `https://maps.googleapis.com/maps/api/js?key=${apiKey}`;
      script.async = true;
      script.onload = () => setApiLoaded(true);
      document.body.appendChild(script);
    } else {
      setApiLoaded(true);
    }
  }, []);

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-5xl mx-auto py-8 px-4 sm:px-6 lg:px-8">
        <div className="bg-white rounded-2xl shadow-lg p-8">
          {/* Header */}
          <div className="mb-8">
            <h1 className="text-3xl font-bold text-gray-900">Yeni Etkinlik Oluştur</h1>
            <p className="mt-2 text-gray-600">Yeni etkinlik oluşturabilmek için lütfen gerekli alanları doldurunuz!</p>
          </div>

         
          <form onSubmit={handleSubmit} className="space-y-8">
            {/* Basic Details Section */}
            <div className="bg-gray-50 p-6 rounded-xl space-y-6">
              <h2 className="text-xl font-semibold text-gray-900 flex items-center gap-2">
                <Info className="w-5 h-5" />
                Bilgiler
              </h2>
              
              <div className="space-y-2">
      <label className="block text-sm font-medium text-gray-700">
        {"Etkinlik Başlığı"} {1 && <span className="text-red-500">*</span>}
      </label>
      <input
    type="text"
    className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-blue-500 focus:border-transparent transition"
    placeholder="Etkinlik Adını giriniz ( maksimum 100 harf)"
    maxLength={100}
    onChange={handleChange(setEventTitle)}
  />
    </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                
                  <div className="space-y-2">
      <label className="block text-sm font-medium text-gray-700">
        {"Event Type"} {1 && <span className="text-red-500">*</span>}
      </label>
      <select
                    className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-blue-500 focus:border-transparent transition"
                    onChange={handleChange(setEventType)}
                    defaultValue=""
                  >
                    <option value="" disabled>Etkinlik Türünü Seçiniz</option>
                    <option value="conference">Konferans</option>
                    <option value="seminar">Seminer</option>
                    <option value="panel">Panel</option>
                    <option value="fair">Fuar</option>
                    <option value="workshop">Atolye Çalışması</option>
                    <option value="summit">Summit</option>
                    <option value="diger">Diğer</option>
                  </select>
    </div> 
               
<div className="space-y-2">
      <label className="block text-sm font-medium text-gray-700">
        {"Konum Tarifi"} {1 && <span className="text-red-500">*</span>}
      </label>
      <div className="relative">
                    <input
                      type="text"
                      className="w-full px-4 py-3 pl-10 rounded-lg border border-gray-300 focus:ring-2 focus:ring-blue-500 focus:border-transparent transition"
                      placeholder="Konumun Tarifini girin (örneğin Galata Kulesi)"
                      onChange={handleChange(setEventLocation)}
                    />
                    
                  </div>
    </div>

              </div>

              {/* Date and Time Section */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-6">
                <div className="space-y-2">
  <label className="block text-sm font-medium text-gray-700">
    {"Başlangıç Tarihi ve Saati"} {1 && <span className="text-red-500">*</span>}
  </label>
  <div className="flex gap-4">
                      <div className="relative flex-1">
                        <input
                          type="date"
                          className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-blue-500 focus:border-transparent transition"
                          onChange={handleChange(setStartDate)}
                          min={new Date().toISOString().split('T')[0]}
                        />
                        
                      </div>
                      <div className="relative flex-1">
                        <input
                          type="time"
                          className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-blue-500 focus:border-transparent transition"
                          onChange={handleChange(setStartTime)}
                        />
                        
                      </div>
                    </div>
</div>



                  
  <div className="space-y-2">
      <label className="block text-sm font-medium text-gray-700">
        {"Bitiş Tarihi ve Saati"} {1 && <span className="text-red-500">*</span>}
      </label>
      <div className="flex gap-4">
                      <div className="relative flex-1">
                        <input
                          type="date"
                          className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-blue-500 focus:border-transparent transition"
                          onChange={handleChange(setEndDate)}
                          min={new Date().toISOString().split('T')[0]}
                        />
                        
                      </div>
                      <div className="relative flex-1">
                        <input
                          type="time"
                          className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-blue-500 focus:border-transparent transition"
                          onChange={handleChange(setEndTime)}
                        />
                        
                      </div>
                    </div>
    </div>
                </div>

                <div className="space-y-4">
                <div className="space-y-2">
      <label className="block text-sm font-medium text-gray-700">
        {"Mapteki Konumu Seçiniz. (Haritada tam konumu belirleyip tıklayın)"} {1 && <span className="text-red-500">*</span>}
      </label>
      <div className="h-64 rounded-lg overflow-hidden border border-gray-300">
                      {apiLoaded ? (
                        <GoogleMap
                          mapContainerStyle={{ width: "100%", height: "100%" }}
                          center={coordinates}
                          zoom={12}
                          onClick={handleMapClick}
                        >
                          <MarkerF position={coordinates} />
                        </GoogleMap>
                      ) : (
                        <div className="w-full h-full flex items-center justify-center bg-gray-100">
                          <p className="text-gray-500">harita yükleniyor...</p>
                        </div>
                      )}
                    </div>
    </div>

                </div>
              </div>
            </div>

            {/* Description Section */}
            <div className="bg-gray-50 p-6 rounded-xl space-y-6">
              <h2 className="text-xl font-semibold text-gray-900 flex items-center gap-2">
                <Type className="w-5 h-5" />
               Etkinlik Açıklaması 
              </h2>
              
              <div className="prose max-w-none">
                <ReactQuill
                  value={description}
                  onChange={handleDescriptionChange}
                  placeholder="Etkinlik hakkında detaylı bilgileri girin..."
                  className="bg-white rounded-lg"
                  theme="snow"
                  modules={{
                    toolbar: [
                      [{ header: [1, 2, 3, false] }],
                      ['bold', 'italic', 'underline'],
                      [{ list: 'ordered' }, { list: 'bullet' }],
                      ['link'],
                      ['clean']
                    ]
                  }}
                />
              </div>
            </div>

            {/* Image Upload Section */}
            <div className="bg-gray-50 p-6 rounded-xl space-y-6">
              <h2 className="text-xl font-semibold text-gray-900 flex items-center gap-2">
                <ImageIcon className="w-5 h-5" />
                Etkinlik Resmi
              </h2>
              
              <div className="flex items-center justify-center w-full">
                <label className="flex flex-col items-center justify-center w-full h-64 border-2 border-gray-300 border-dashed rounded-lg cursor-pointer bg-white hover:bg-gray-50 transition">
                  <div className="flex flex-col items-center justify-center pt-5 pb-6">
                    <ImageIcon className="w-12 h-12 text-gray-400 mb-4" />
                    <p className="mb-2 text-sm text-gray-500">
                      <span className="font-semibold">Fotoğraf yüklemek için Tıklayınız </span> ya da sürükleyip bırakın.
                    </p>
                    <p className="text-xs text-gray-500">PNG, JPG ya da GIF (MAX. 800x400px)</p>
                  </div>
                  <input
                    type="file"
                    className="hidden"
                    onChange={handleFileUpload}
                    accept="image/*"
                  />
                </label>
              </div>
              
              {uploadedImageUrl && (
                <div className="mt-4">
                  <img
                    src={uploadedImageUrl}
                    alt="Uploaded event image"
                    className="w-full max-w-md mx-auto rounded-lg shadow-md"
                  />
                </div>
              )}
            </div>

            {/* Submit Button */}
            <div className="flex justify-end">
              <button
                type="submit"
                disabled={!isFormValid}
                className={`
                  px-8 py-3 rounded-full font-medium text-white
                  ${isFormValid
                    ? 'bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800'
                    : 'bg-gray-300 cursor-not-allowed'}
                  transform transition-all duration-200 hover:scale-105
                `}
              >
                Etkinlik Önizleme
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default CreateEvent;