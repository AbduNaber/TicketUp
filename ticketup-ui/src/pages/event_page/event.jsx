import "./event.css";
import GradientButton from "../../components/gradientButton/gradientButton";
import Footer from "../../components/footer/footer";
import "../../components/event_top_bar/event_top_bar.css";
import { GoogleMap, LoadScript, MarkerF } from '@react-google-maps/api';
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";
import { useEffect, useState } from "react";

const apiKey = import.meta.env.VITE_GOOGLE_API_KEY;

if (!apiKey) {
  throw new Error('REACT_APP_GOOGLE_API_KEY is not defined in .env file');
}

const containerStyle = {
  width: '100%',
  height: '300px',
};


const Event = () => {
  const {id} = useParams();
  const [event, setEvent] = useState(null);
  const navigate = useNavigate();

  const handleGoToForm = () => {
    
    navigate('/form', {state: {eventID: id, imageLink: event?.imgUrl}});
  }


  useEffect(() => {
    const fetchEvent = async () => {
      try {
        const response = await axios.get(`http://localhost:8080/ticketup/events/list/${id}`);
        setEvent(response.data);
        console.log('Event Fetched');
      } catch(error) {
        console.error('Error fetching event:', error.response?.data || error.message);
        alert('Event Bilgileri Yüklenemedi');
        
      }
    };

    fetchEvent();
  }, [id]);

  const formatDate = (dateString) => {
    if (!dateString) return "Geçersiz Tarih";
  
    const date = new Date(dateString);
  
    const months = [
      "Ocak", "Şubat", "Mart", "Nisan", "Mayıs", "Haziran",
      "Temmuz", "Ağustos", "Eylül", "Ekim", "Kasım", "Aralık"
    ];
  
    const day = date.getDate(); 
    const month = months[date.getMonth()]; 
    const year = date.getFullYear(); 
  
    return `${day} ${month} ${year}`;
  };

  

  const center = {
    lat: event?.latitude || 37.7749,
    lng: event?.longitude || 29.0875
  };
  const url = `https://www.google.com/maps?q=${center.lat},${center.lng}`;


  return (
    <div className="event-wrapper">
      <div className="event-top-bar">
        <div className="event-top-bar-left">
          <a href="https://www.example.com">
            <img src="/src/assets/icons/ticketup_icon_full.png" alt="Logo" className="event-logo-image" />
          </a>
        </div>
        <div className="event-top-bar-center">
          <a href="#" className="clickable-text">Ana Sayfa</a>
          <a href="#" className="clickable-text">Neden Biz</a>
          <a href="#" className="clickable-text">Bizimle İletişime Geçin</a>
        </div>
        <div className="event-top-bar-right">
          <GradientButton text="Biletini Sorgula" onClick={() => { }} />
          <a href="https://www.example.com">
            <img src="/src/assets/icons/account.png" alt="Logo" className="logo-profile-events" />
          </a>
        </div>
      </div>
      <div className="content-container">
        <div className="image-container">
          <img className="event-image" src={event?.imgUrl} alt="Event" />
        </div>
        <div className="event-header">
          <h2 className="event-title">{event?.name || "Etkinlik Adı Yükleniyor..."}</h2>
          <GradientButton text="Katılım Formu" onClick={handleGoToForm} />
        </div>
        <div className="event-details-container">
          <h1 className="event-subtitle">Etkinlik Açıklaması</h1>
          <p className="event-description">
            {event?.description || "Etkinlik Açıklaması Yükleniyor..."}
          </p>
         
        </div>
        <div className="properties-container">
          <div className="properties-left">
            <div className="property-section">
              <h3 className="property-title">Tarih ve Saat</h3>
              <p>{event?.eventDate ? formatDate(event.eventDate) : "Tarih Yükleniyor..."}</p>
              <p>{event?.startTime || "Saat Yükleniyor..."} - {event?.endTime || "Saat Yükleniyor..."}</p>
              <a href="#" className="add-to-calendar">+ Takvime Ekle</a>
            </div>

            <div className="property-section">
              <h3 className="property-title">Organizatör</h3>
              <div className="organizer-info">
                <img src="/src/assets/icons/tsoft-icon.png" alt="Organizer Icon" className="organizer-image" />
                <div className="organizer-details">
                  <p>{event?.organizatorName || "Organizatör Bilgisi Yükleniyor..."}</p>
                  <p>{event?.organizatorCompany || "Organizatör Bilgisi Yükleniyor..."}</p>
                  <a href="#" className="button-white-border">İletişime Geç</a>
                </div>
              </div>
            </div>
            <div className="property-section">
              <div className="upista-container">
                <img src="/src/assets/icons/upista_icon.png" className="upista-icon" />
                <p className="upista-subtitle">Upista Gururla Sunar</p>
              </div>
            </div>
          </div>
          <div className="properties-right">
            <div className="property-section">
              <h3 className="property-title">Konum</h3>
              <p className="location-description">{event?.location || "Konum Yükleniyor..."}</p>
              <div className="location-image-container">
              
              
                
                <LoadScript googleMapsApiKey= {apiKey}>
                  <GoogleMap mapContainerStyle={containerStyle} center={center} zoom={15}>
                    <MarkerF position={center}  onClick={() => window.open(url, '_blank')}>   </MarkerF>
                  </GoogleMap>
                </LoadScript>
              </div>
            </div>
          </div>
        </div>
      </div>
      <Footer></Footer>
    </div>
  );
};

export default Event;
