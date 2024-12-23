import GradientButton from "../../components/GradientButton";
import Footer from "../../components/Footer";
import EmptyBox from "../../components/empty_box";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
import React, { useState } from "react";
import { GoogleMap, LoadScript, MarkerF } from "@react-google-maps/api";
import { useEffect } from "react";
import { jwtDecode } from "jwt-decode";
import axios from "axios";
import { useNavigate } from "react-router-dom";



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
  const navigate = useNavigate();


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




  const handleDescriptionChange = (value) => {
    setDescription(value);
  };



  const validateForm = () => {
    console.log(description);
    return eventTitle && startDate && endDate && startTime && endTime && eventType && eventLocation && description && coordinates && uploadedImageUrl;
  };

  useEffect(() => {
    setIsFormValid(validateForm());
  }, [eventTitle, startDate, endDate, startTime, endTime, eventType, eventLocation, description, coordinates, uploadedImageUrl]);

  const handleChange = (setter) => (e) => {
    setter(e.target.value);
    validateForm();
  };

  const handleFileUpload = async (e) => {
    const file = e.target.files[0];
    if (!file) return;

    const formData = new FormData();
    formData.append("file", file);

    const token = sessionStorage.getItem("token");

    try {
      const response = await fetch("http://46.101.166.170:8080/ticketup/files/upload", {
        method: "POST",
        body: formData,
        headers: {
          "Authorization": `Bearer ${token}`,
        },
      });

      if (!response.ok) throw new Error("Dosya Yüklenemedi");

      const data = await response.json();
      setUploadedImageURl(data.url);
      console.log("Yüklenen dosya URL si: ", data.url);
    } catch (error) {
      console.error("Dosya Yükleme Hatası: ", error);
    }
  };

  const handleSubmit = async (e) => {
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

    try {

      const organizer = await axios.get(
        `http://46.101.166.170:8080/ticketup/organizators/list/${parsedToken.id}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );


      const requestBody = {
        name: eventTitle,
        organizatorId: parsedToken.id,
        organizatorName: organizer.data.name,
        organizatorCompany: organizer.data.organizationName,
        location: eventLocation,
        description: description,
        startDate: startDate,
        endDate: endDate,
        latitude: coordinates.lat,
        longitude: coordinates.lng,
        startTime: startTime,
        endTime: endTime,
        imgUrl: uploadedImageUrl,
        eventType: eventType,
      };

      await axios.post("http://46.101.166.170:8080/ticketup/events/create", requestBody, {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      });

      navigate("/organizer");
    } catch (error) {
      console.error(error);
    }
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

        </div>
        <div className="grid grid-cols-1 gap-4 mb-0">
          <div className="flex flex-col gap-2">
            <label className="text-lg font-medium text-black whitespace-nowrap">
              Etkinlik Başlığı <span className="text-red-600">*</span>
            </label>
            <input
              type="text"
              className="h-12 w-full p-3 text-base border border-gray-300 rounded-md"
              placeholder="Etkinliğin adını giriniz (maksimum 100 karakter)"
              maxLength={100}
              onChange={handleChange(setEventTitle)}
            />
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div className="flex flex-col gap-2">
              <label className="text-lg font-medium text-black">
                Başlangıç Tarihi <span className="text-red-600">*</span>
              </label>
              <input
                type="date"
                className="w-80 h-12 p-3 mt-2 text-base border border-gray-300 rounded-md"
                min={(() => {
                  const today = new Date();
                  today.setMinutes(today.getMinutes() - today.getTimezoneOffset());
                  return today.toISOString().split('T')[0];
                })()} // Adjust for local timezone to prevent selecting previous dates
                onChange={handleChange(setStartDate)}
              />
            </div>
            <div className="flex flex-col gap-2">
              <label className="text-lg font-medium text-black">
                Bitiş Tarihi <span className="text-red-600">*</span>
              </label>
              <input
                type="date"
                className="w-80 h-12 p-3 mt-2 text-base border border-gray-300 rounded-md"
                min={(() => {
                  const today = new Date();
                  today.setMinutes(today.getMinutes() - today.getTimezoneOffset());
                  return today.toISOString().split('T')[0];
                })()} // Adjust for local timezone to prevent selecting previous dates
                onChange={handleChange(setEndDate)}
              />
            </div>

          </div>
          <div className="grid grid-cols-2 gap-4">
            <div className="flex flex-col gap-2">
              <label className="text-lg font-medium text-black">
                Başlangıç Saati <span className="text-red-600">*</span>
              </label>
              <input
                type="time"
                className="w-80 h-12 p-3 mt-2 text-base border border-gray-300 rounded-md"
                onChange={handleChange(setStartTime)}
              />
            </div>
            <div className="flex flex-col gap-2">
              <label className="text-lg font-medium text-black">
                Bitiş Saati <span className="text-red-600">*</span>
              </label>
              <input
                type="time"
                className="w-80 h-12 p-3 mt-2 text-base border border-gray-300 rounded-md"
                onChange={handleChange(setEndTime)}
              />
            </div>
          </div>
        </div>


        {/* Event Location Section */}
        <div className="grid grid-cols-2 gap-4 mb-6 mr-50">
          {/* First column for Etkinlik Nerede Olacak and Etkinlik Tipi */}
          <div className="flex flex-col gap-4">

            <div className="flex flex-col gap-2">
              <label className="text-lg font-medium text-black mt-2">
                Etkinlik Tipi <span className="text-red-600">*</span>
              </label>
              <select
                className="w-full h-12 p-3 mt-2 text-base border border-gray-300 rounded-md"
                defaultValue=""
                onChange={handleChange(setEventType)}
              >
                <option value="" disabled>Etkinlik tipini seçiniz</option>
                <option value="konferans">Konferans</option>
                <option value="seminer">Seminer</option>
                <option value="panel">Panel</option>
                <option value="fuar">Fuar</option>
                <option value="çalıştay">Çalıştay</option>
                <option value="zirve">Zirve</option>
              </select>
            </div>
            <div className="flex flex-col gap-2">
              <label className="text-lg font-medium text-black ">
                Etkinlik Nerede Olacak? <span className="text-red-600">*</span>
              </label>
              <input
                type="text"
                placeholder="Etkinliğin yapılacağı yeri yazınız. (Örn: İstanbul Fuar Merkezi, İstanbul)"
                className="w-full h-12 p-3 text-base border border-gray-300 rounded-md" onChange={handleChange(setEventLocation)} />

            </div>
          </div>

          {/* Second column for Map Selection */}
          <div className="flex flex-col gap-2">
            <label className="text-lg font-medium text-black mt-2">
              Haritadan seçiniz: <span className="text-red-600">*</span>
            </label>
            <input
              type="text"
              className="w-full h-12 p-3 mt-2 text-base border border-gray-300 rounded-md"
              placeholder="Koordinat Giriniz veya Yer Adı Yazınız"
              value={inputValue}
              onChange={async (e) => {
                handleInputChange(e);
                const address = e.target.value;
                if (address) {
                  try {
                    const geocoder = new window.google.maps.Geocoder();
                    geocoder.geocode({ address }, (results, status) => {
                      if (status === "OK" && results[0]) {
                        const location = results[0].geometry.location;
                        setCoordinates({ lat: location.lat(), lng: location.lng() });
                      } else {
                        console.error("Geocode was not successful for the following reason:", status);
                      }
                    });
                  } catch (error) {
                    console.error("Error during geocoding:", error);
                  }
                }
              }}

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
            <input type="file" className="hidden" id="file-upload" onChange={handleFileUpload} />
            <label
              htmlFor="file-upload"
              className="px-4 py-2 text-sm font-bold text-white bg-blue-500 rounded cursor-pointer hover:bg-blue-600"
            >
              Dosya Seç
            </label>
            <span className="ml-3 text-sm text-gray-600">
              Görüntü yüklemek için bir dosya seçin
            </span>
            {uploadedImageUrl && (
              <img
                src={uploadedImageUrl}
                alt="Yüklenen Görsel"
                className="w-32 h-32 mt-4"
              />
            )}
          </div>
        </div>

        {/* Buttons */}
        <div className="flex justify-end mt-8">
          <button
            onClick={handleSubmit}
            type="submit"
            disabled={!validateForm()}
            className={`bg-gradient-to-r from-pink-500 to-orange-500 text-black font-bold py-3 px-4 rounded-full hover:bg-green-500 transition ${!isFormValid ? 'opacity-50 cursor-not-allowed' : ''
              }`}
          >
            Etkinlik Oluştur
          </button>
        </div>
      </div>

      <Footer />
    </div>
  );
};

export default CreateEvent;
