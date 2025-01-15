import GradientButton from "../../components/GradientButton";
import Footer from "../../components/Footer";
import { GoogleMap, LoadScript, MarkerF } from "@react-google-maps/api";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";
import { useEffect, useState } from "react";
import TopBar from "../../components/TopBar";
import { ToastContainer, toast } from "react-toastify";
const apiKey = import.meta.env.VITE_GOOGLE_API_KEY;

if (!apiKey) {
  throw new Error("REACT_APP_GOOGLE_API_KEY is not defined in .env file");
}

const containerStyle = {
  width: "100%",
  height: "300px",
};

const Event = () => {


  const { id } = useParams();
  const [event, setEvent] = useState(null);
 
  const [organizator, setOrganizator] = useState(null);
  const [message, setMessage] = useState("");
  const [name, setName] = useState('');
const [surname, setSurname] = useState('');
const [email, setEmail] = useState('');

  const navigate = useNavigate();

  const [isPopupOpen, setIsPopupOpen] = useState(false);


  const handlePopupOpen = () => {
    setIsPopupOpen(true);
  };

  const handlePopupClose = () => {
    setIsPopupOpen(false);
  };

  const handleGoToForm = () => {
    console.log("res");
    navigate("/form", { state: { eventID: id, imageLink: event?.imgUrl, eventName: event?.name } });
  };

  const formatDateForGoogle = (date, time) => {
    if (!date || !time) {
      console.error("Eksik tarih veya saat:", { date, time });
      throw new Error("Tarih veya saat eksik");
    }

    // Date ve Time birleştiriliyor
    const fullDate = new Date(`${date.split("T")[0]}T${time}`);
    if (isNaN(fullDate.getTime())) {
      console.error("Geçersiz tarih oluşturuluyor:", { date, time });
      throw new Error("Geçersiz tarih");
    }

    return fullDate.toISOString().replace(/-|:|\.\d+/g, ""); // YYYYMMDDTHHMMSSZ
  };


  const handleAddToCalendar = () => {
    if (!event) {
      alert("Etkinlik bilgileri yüklenemedi.");
      return;
    }

    // Tarih ve saat kontrolü
    if (!event.startDate || !event.startTime || !event.endDate || !event.endTime) {
      alert("Başlangıç veya bitiş tarih/saat bilgisi eksik.");
      return;
    }

    const start = formatDateForGoogle(event.startDate, event.startTime);
    const end = formatDateForGoogle(event.endDate, event.endTime);

    const calendarUrl = `https://www.google.com/calendar/render?action=TEMPLATE&text=${encodeURIComponent(
        event.name || "Etkinlik Adı"
    )}&dates=${start}/${end}&details=${encodeURIComponent(
        event.description || "Etkinlik Detayları"
    )}&location=${encodeURIComponent(event.location || "Konum Bilgisi Yok")}`;

    window.open(calendarUrl, "_blank", "noopener,noreferrer");
  };

  useEffect(() => {
    const fetchEvent = async () => {
      try {
        const response = await axios.get(
            `http://localhost:8080/ticketup/events/list/${id}`
        );
        setEvent(response.data);
        
      } catch (error) {
        console.error("Error fetching event:", error.response?.data || error.message);
        alert("Event Bigleri yüklenemedi.");
      }
    };

    fetchEvent();
  }, [id]);

  useEffect(() => {
    const fetchOrganizator = async () => {
      try{
        const organizatorResonse = await axios.get(
          `http://localhost:8080/ticketup/organizators/list/${event?.organizatorId}`
        );
        setOrganizator(organizatorResonse.data);
        console.log(organizator);
      }catch(error){
        console.error("Error fetching organizator: ", error.response?.data || error.message);
        alert("Organizatör Bilgileri Yüklenemedi.");
      }
    };

    if(event?.organizatorId){
      fetchOrganizator();
    }
  }, [event])

  const formatDate = (dateString) => {
    if (!dateString) return "Geçersiz Tarih";

    const date = new Date(dateString);

    const months = [
      "Ocak", "Şubat", "Mart", "Nisan", "Mayıs", "Haziran", "Temmuz",
      "Ağustos", "Eylül", "Ekim", "Kasım", "Aralık",
    ];

    const day = date.getDate();
    const month = months[date.getMonth()];
    const year = date.getFullYear();

    return `${day} ${month} ${year}`;
  };

  const formatTime = (timeString) => {
    if (!timeString) return "Saat Bilgisi Yükleniyor...";

    const time = new Date(`1970-01-01T${timeString}`);
    return time.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" });
  };

  const center = {
    lat: event?.latitude || 37.7749,
    lng: event?.longitude || 29.0875,
  };
  const url = `https://www.google.com/maps/search/?api=1&query=${center.lat},${center.lng}`;



  const handleSubmit = async (formEvent) => {
    formEvent.preventDefault(); // Prevent default form submission behavior
  
    const payload = {
      name, // Assuming state or props handle this
      surname,
      email,
      massage: message,
      organizatorId: event?.organizatorId,
    };
  
    console.log('Payload:', payload);
  
    try {
      const response = await fetch('http://localhost:8080/ticketup/organizator-messages', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(payload),
      });
  
      if (response.ok) {
        const result = await response.json();
        console.log('Message successfully sent:', result);
        toast.success('Mesaj başarıyla gönderildi!');
        handlePopupClose(); // Close popup if applicable
      } else {
        if (response.status === 500) {
          console.error('Server error:', response.statusText);
          toast.error('Aynı mesajı tekrar gönderemezsiniz. Lütfen farklı mesaj yazınız.');
        }
      }
    } catch (error) {
      console.error('Network error:', error);
      toast.error('Bir ağ hatası oluştu. Lütfen tekrar deneyin.');
    }
  };
  
  
  return (
      <div className="flex flex-col min-h-screen bg-white overflow-y-auto">
        {/* Top Bar */}
        <TopBar></TopBar>

       
          <div className="flex-grow mx-[6vw] mt-[7.5vh] mb-[30vh] flex flex-col items-center">
            <div className="w-full h-[50vh] mb-4 overflow-hidden">
              <img src={event?.imgUrl} alt="Event" className="w-full h-full object-cover" />
            </div>
            <div className="flex justify-between items-center w-full">
              <h2 className="text-2xl font-bold">{event?.name || "Etkinlik Adı Yükleniyor..."}</h2>
              
              {event?.eventStatus === "PASİF" ? (
                <div>
            <p className="text-red-600 font-bold">Bu etkinlik kapanmıştır</p>
            <p className="text-red-600 font-bold">Hata olduğunu düşünüyorsanız lütfen Organizator ile iletişime geçin</p>
                </div>
              ) : (
                <GradientButton text="Katılım Formu" onClick={handleGoToForm}></GradientButton>
              )}
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
                  onClick={handleAddToCalendar}
                  className="text-blue-600 hover:underline self-start mt-2"
              >
                + Takvime Ekle
              </a>


              <h3 className="text-lg font-bold text-gray-800 mt-6">Organizatör</h3>
              <div className="flex items-center gap-6 p-4 border border-gray-300 rounded-lg shadow-sm w-fit">
                <img
                    src={organizator?.profilePicture || "/src/assets/icons/profile_icon.svg"}
                    alt="Organizer Icon"
                    className="w-16 h-16 rounded-full border border-gray-300 shadow-sm"
                />
                <div className="flex flex-col">
                  <p className="font-bold text-gray-800">
                  {organizator
                    ? `${organizator.name.toLocaleUpperCase('tr-TR')} ${organizator.surname.toLocaleUpperCase('tr-TR')}`
                    : "Organizatör Bilgisi Yükleniyor..."}
                  </p>
                  <p className="text-gray-600">
                    {organizator?.organizationName || "Organizatör Bilgisi Yükleniyor..."}
                  </p>
                  <button
                      //href="#"
                      onClick={handlePopupOpen}
                      className="bg-gradient-to-r from-pink-500 to-orange-400 text-white text-sm font-bold rounded-full px-5 py-2 shadow-md hover:scale-105 hover:shadow-lg active:scale-95 transition-transform"
                  >
                    İletişime Geç
                  </button>
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
        </div>

        {isPopupOpen && (
  <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
    <div className="bg-white p-6 rounded-lg shadow-lg w-full max-w-md relative">
      <button
        className="absolute top-3 right-3 text-gray-500 hover:text-gray-700 focus:outline-none"
        aria-label="Close"
        onClick={handlePopupClose}
      >
        ✖
      </button>

      <h2 className="text-xl font-semibold text-gray-900 mb-4 text-center">
        Organizatör İletişim
      </h2>

      <div className="mb-6">
        <p className="text-gray-700 text-center break-words">
          Organizatör'e email göndermek için:
        </p>
        <p className="text-gray-700 text-center break-words">
  {organizator?.email ? (
    <a
      href={`mailto:${organizator.email}`}
      className="text-blue-600 underline hover:text-blue-800"
    >
      {organizator.email}
    </a>
  ) : (
    "Email bilgisi mevcut değil."
  )}
</p>
      </div>

      <p className="text-gray-700 text-center break-words">
        Ya da direkt mesaj iletmek için:
      </p>

      <form className="space-y-4" onSubmit={handleSubmit}>
  <div className="space-y-3">
    <input
      type="text"
      value={name}
      onChange={(e) => setName(e.target.value)}
      className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-600 focus:outline-none"
      placeholder="Adınız"
      required
    />
    <input
      type="text"
      value={surname}
      onChange={(e) => setSurname(e.target.value)}
      className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-600 focus:outline-none"
      placeholder="Soyadınız"
      required
    />
    <input
      type="email"
      value={email}
      onChange={(e) => setEmail(e.target.value)}
      className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-600 focus:outline-none"
      placeholder="E-posta Adresiniz"
      required
    />
  </div>

  <textarea
    value={message}
    onChange={(e) => setMessage(e.target.value)}
    className="w-full p-3 border border-gray-300 rounded-lg resize-none focus:ring-2 focus:ring-blue-600 focus:outline-none"
    rows="4"
    placeholder="Mesajınızı buraya yazın..."
    required
  />

  <div className="flex justify-between items-center">
    <button
      type="button"
      className="px-4 py-2 bg-gray-300 text-gray-800 rounded-lg hover:bg-gray-400 focus:ring-2 focus:ring-gray-400 focus:outline-none"
      onClick={handlePopupClose}
    >
      Kapat
    </button>
    <button
      type="submit"
      className="bg-gradient-to-r from-pink-500 to-orange-400 text-white text-sm font-bold rounded-full px-5 py-2 shadow-md hover:scale-105 hover:shadow-lg active:scale-95 transition-transform"
    >
      Gönder
    </button>
  </div>
</form>
    </div>
  </div>
)} 

        <Footer />
        <ToastContainer position="bottom-right" autoClose={3000} hideProgressBar closeOnClick pauseOnHover draggable pauseOnFocusLoss />
      </div>
      
  );
};

export default Event;
