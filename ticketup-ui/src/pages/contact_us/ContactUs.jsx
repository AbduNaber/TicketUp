import { useState } from "react";
import Footer from "../../components/Footer";
import GradientButton from "../../components/GradientButton";
import TopBar from "../../components/TopBar";
import axios from "axios";
import { GoogleMap,MarkerF, useJsApiLoader } from "@react-google-maps/api";

const ContactUs = () => {
  const apiKey = import.meta.env.VITE_GOOGLE_API_KEY;
  const containerStyle = { width: "100%", height: "275px" };
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");


  const center = {
    lat: 41.01245821746472, 
    lng: 28.964103678040175,
  }

  const { isLoaded } = useJsApiLoader({
    googleMapsApiKey: apiKey,
  });
  const url = `https://www.google.com/maps/search/?api=1&query=${center.lat},${center.lng}`;

  const handleSubmit = async (e) => {
    e.preventDefault();

    const contactData = {
      firstName,
      lastName,
      email,
      message,
    };

    try{
      const response = await axios.post(
        "http://localhost:8080/ticketup/contact/send-mail",
        contactData
      );

      alert(response.data);
    }catch(error){
      console.error("Error sending mail", error);
      alert("Mesaj Gönderilemedi");
    }
  };


  return (
    <div className="flex flex-col min-h-screen bg-white">
      {/* Top Bar */}
      <TopBar></TopBar>
      {/* Placeholder Image with Text */}
      <div className="relative w-full h-[400px]">
        <img
          src="/src/assets/images/contact_us.png"
          alt="Placeholder"
          className="w-full h-full object-cover"
        />
        <div className="absolute bottom-4 left-4 text-black text-4xl font-bold">
          Bizimle İletişime Geçin
        </div>
      </div>

      {/* Form Container */}
      <div className="container mx-auto mt-8 mb-20 p-6">
        <div className="flex flex-wrap">
          {/* Left Side */}
          <div className="w-full md:w-1/2 p-4">
            <input
              type="text"
              placeholder="İsim"
              value={firstName}
              onChange={(e) => setFirstName(e.target.value)}
              className="w-full mb-9 p-3 border border-gray-300 rounded-md"
            />
            <input
              type="text"
              placeholder="Soyisim"
              value={lastName}
              onChange={(e) => setLastName(e.target.value)}
              className="w-full mb-9 p-3 border border-gray-300 rounded-md"
            />
            <input
              type="text"
              placeholder="E-posta veya Telefon Numarası"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full mb-4 p-3 border border-gray-300 rounded-md"
            />
          </div>

          {/* Right Side */}
          <div className="w-full md:w-1/2 p-4">
            <textarea
              placeholder="Mesajınız"
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              className="w-full h-[220px] p-3 border border-gray-300 rounded-md resize-none"
            ></textarea>
          </div>
        </div>
        <div className="flex justify-end mt-6">
          <GradientButton text="Gönder" onClick={handleSubmit} />
        </div>
      </div>

      {/* New Container */}
      <div className="container mx-auto p-6 mb-20">
        <div className="flex flex-wrap">
          {/* Left Side */}
          <div className="w-full md:w-1/2 p-4 flex flex-col items-center justify-center text-center">
            <h2 className="text-xl font-bold mb-2">ADRESİMİZ</h2>
            <p className="text-gray-600">Çok Yakında...</p>
            <div className="my-4"></div>
            <h2 className="text-xl font-bold mb-2">MAİL</h2>
            <p className="text-gray-600">info.ticketup@gmail.com</p>
          </div>

          {/* Right Side */}
          <div className="w-full md:w-1/2 p-4 flex items-center justify-center">
          {!isLoaded ? (
                  <p className="text-gray-500">Harita yükleniyor...</p>
                ) : (
                  <GoogleMap mapContainerStyle={containerStyle} center={center} zoom={5}>
                    <MarkerF position={center} onClick={() => window.open(url, "_blank")}/>
                  </GoogleMap>
                )}
          </div>
        </div>
      </div>

      <Footer />
    </div>
  );
};

export default ContactUs;