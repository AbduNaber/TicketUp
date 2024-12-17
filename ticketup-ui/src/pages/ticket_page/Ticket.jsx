import { QRCodeCanvas } from "qrcode.react";
import GradientButton from "../../components/GradientButton";
import Footer from "../../components/Footer";
import EmptyBox from "../../components/empty_box";
import html2canvas from "html2canvas";
import { jsPDF } from "jspdf";
import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import axios from "axios";

const Ticket = () => {
  const {id} = useParams();
  const [ticket, setTicket] = useState(null);
  const [participant, setParticipant] = useState(null);
  const [event, setEvent] = useState(null);

  useEffect(() => {
    const fetchTicket = async () => {
      try {
        const ticketResponse = await axios.get(
          `http://localhost:8080/ticketup/tickets/list/${id}`
        );
        setTicket(ticketResponse.data); // ticket state güncellenir
      } catch (error) {
        console.error("Error fetching ticket:", error);
      }
    };
  
    fetchTicket();
  }, [id]);
  
  useEffect(() => {
    if (ticket) {
      const fetchParticipantAndEvent = async () => {
        try {
          const participantResponse = await axios.get(
            `http://localhost:8080/ticketup/participants/list/${ticket.participantId}`
          );
          setParticipant(participantResponse.data);
  
          const eventResponse = await axios.get(
            `http://localhost:8080/ticketup/events/list/${ticket.eventId}`
          );
          setEvent(eventResponse.data);
        } catch (error) {
          console.error("Error fetching participant or event:", error);
        }
      };
  
      fetchParticipantAndEvent();
    }
  }, [ticket]); // ticket güncellenince çalışır




  const downloadTicket = () => {
    const input = document.getElementById("pdf-content");

    // Butonların görünürlüğünü kaldırma
    const buttons = input.querySelectorAll("button");
    buttons.forEach(button => (button.style.visibility = "hidden"));

    html2canvas(input, { scale: 2 }).then((canvas) => {
      const imgData = canvas.toDataURL("image/png");
      const pdf = new jsPDF("p", "mm", "a4");
      const imgWidth = 210;
      const imgHeight = (canvas.height * imgWidth) / canvas.width;

      pdf.addImage(imgData, "PNG", 0, 0, imgWidth, imgHeight);
      pdf.save("bilet.pdf");

      // Butonları geri görünür yapma
      buttons.forEach(button => (button.style.visibility = "visible"));
    });
  };

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


  return (
    <div className="flex flex-col min-h-screen bg-white overflow-y-auto">
      {/* Top Bar */}
      <div className="flex justify-between items-center px-5 py-2 bg-gray-800 text-white">
        <div>
          <a href="https://www.example.com">
            <img src="/src/assets/icons/ticketup_icon_full.png" alt="Logo" className="w-52" />
          </a>
        </div>
        <div className="flex gap-6">
          <a href="#" className="text-sm hover:underline">Ana Sayfa</a>
          <a href="#" className="text-sm hover:underline">Neden Biz</a>
          <a href="#" className="text-sm hover:underline">Bizimle İletişime Geçin</a>
        </div>
        <div className="flex items-center gap-4">
          <GradientButton text="Biletini Sorgula" onClick={() => { }} />
          <a href="https://www.example.com">
            <img src="/src/assets/icons/account.png" alt="Profile" className="w-10 h-10 rounded-full" />
          </a>
        </div>
      </div>
      {/* PDF İçeriği */}
      <div id="pdf-content" className="bg-white w-full flex flex-col items-center">
      {/* Title */}
      <h2 className="text-4xl text-black font-bold text-center mt-8">
        {event?.name || "Yükleniyor..."}
      </h2>

      {/* QR Code Section */}
      <div className="flex justify-between items-center mt-8 mx-auto w-4/5">
        <div className="flex flex-col gap-4">
          <EmptyBox width="180px" height="40px" />
          <EmptyBox width="180px" height="40px" />
        </div>
        <QRCodeCanvas
          value="https://www.youtube.com/watch?v=dQw4w9WgXcQ"
          size={200}
          bgColor="#ffffff"
          fgColor="#000000"
        />
        <div className="flex flex-col gap-4">
          <GradientButton text="Bileti Düzenle" onClick={() => { }} />
          <GradientButton text="Bileti Sil" onClick={() => { }} />
          <GradientButton text="Bileti İndir" onClick={downloadTicket} /> {/* Yeni Buton */}
        </div>
      </div>

      {/* Ticket Details */}
      <div id="ticket-area" className="flex flex-col items-center mt-10 mb-20">
        <p className="text-xl font-light text-black mt-6">Etkinlik Bilgileri</p>
        <p className="text-2xl font-extrabold text-black mt-2">{event?.name || "Bilet Bilgileri Yükleniyor..."}</p>

        <div className="flex justify-between mt-4 w-2/5">
          <div className="flex flex-col items-center p-2 text-center">
            <p className="text-sm font-medium text-black">TARİH</p>
            <p className="text-sm font-bold text-black">{event?.startDate ? formatDate(event.startDate) : "Tarih yükleniyor..."}</p>
          </div>
          <div className="flex flex-col items-center p-2 text-center">
            <p className="text-sm font-medium text-black">SAAT</p>
            <p className="text-sm font-bold text-black">{event?.startTime || "Saat Yükleniyor..."}</p>
          </div>
          <div className="flex flex-col items-center p-2 text-center">
            <p className="text-sm font-medium text-black">KONUM</p>
            <p className="text-sm font-bold text-black">
            {event?.location || "Konum Yükleniyor..."}
            </p>
          </div>
        </div>

        {/* Participant Details */}
        <p className="text-xl font-light text-black mt-8">Katılımcı Bilgileri</p>
        <div className="flex justify-between mt-4 w-2/5">
          <div className="flex flex-col items-center p-2 text-center">
            <p className="text-sm font-medium text-black">Ad-Soyad</p>
            <p className="text-sm font-bold text-black">{participant?.name || "Katılımcı Bilgileri Yükleniyor..."} {participant?.surname || "Katılımcı Bilgileri Yükleniyor..."} </p>
          </div>
          <div className="flex flex-col items-center p-2 text-center">
            <p className="text-sm font-medium text-black">Ünvan</p>
            <p className="text-sm font-bold text-black">{participant?.title}</p>
          </div>
          <div className="flex flex-col items-center p-2 text-center">
            <p className="text-sm font-medium text-black">Katılınılan İl</p>
            <p className="text-sm font-bold text-black">{participant?.city}</p>
          </div>
        </div>

        {/* Additional Information */}
        <p className="text-sm font-medium text-black mt-7">KATILIMCI ID</p>
        <p className="text-sm font-bold text-black mb-4">
          {ticket?.participantId}
        </p>
        <p className="text-xl font-light text-black">Bilmeniz Gerekenler</p>
        <p className="text-sm font-light text-center text-black mt-2 w-1/5 leading-6">
          Etkinlik girişinde <strong>karekodunuzu</strong> gösterek giriş yapabilirsiniz.
          Etkinlik biletiniz ayrıca mail adresinize ve SMS olarak gönderilecektir.
          Organizator ile iletişim için: info@upista.com
        </p>
      </div>
      </div>
      <Footer />
    </div>
  );
};

export default Ticket;
