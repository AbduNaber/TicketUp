import { QRCodeCanvas } from "qrcode.react";
import GradientButton from "../../components/GradientButton";
import Footer from "../../components/Footer";
import EmptyBox from "../../components/empty_box";
import html2canvas from "html2canvas";
import { jsPDF } from "jspdf";
import { useNavigate, useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import axios from "axios";
import TopBar from "../../components/TopBar";
import { toast } from "react-toastify";

const Ticket = () => {
  const {id} = useParams();
  const [ticket, setTicket] = useState(null);
  const [participant, setParticipant] = useState(null);
  const [event, setEvent] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchTicket = async () => {
      try {
        const ticketResponse = await axios.get(
          `http://46.101.166.170:8080/ticketup/tickets/list/${id}`
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
            `http://46.101.166.170:8080/ticketup/participants/list/${ticket.participantId}`
          );
          setParticipant(participantResponse.data);
  
          const eventResponse = await axios.get(
            `http://46.101.166.170:8080/ticketup/events/list/${ticket.eventId}`
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
      const imgData = canvas.toDataURL("image/jpeg", 0.8);
      const pdf = new jsPDF("p", "mm", "a4");
      const imgWidth = 210;
      const imgHeight = (canvas.height * imgWidth) / canvas.width;
      pdf.addImage(imgData, "JPEG", 0, 0, imgWidth, imgHeight);
      pdf.save("bilet.pdf");

      const pdfBlob = new Blob([pdf.output("blob")], {type: "application/pdf"});


      console.log("Participant Email is: ", participant.email);
      
       const formData = new FormData();
       formData.append("email", participant.email);
       formData.append("id" , id);
       formData.append("file", pdfBlob);

       axios.post("http://46.101.166.170:8080/ticketup/tickets/sendEmail", formData, {
         headers: {
           "Content-Type": "multipart/form-data",
         },
       })
       .then((response) => {
         console.log("Email Sent Succesfully:", response.data);
       })
       .catch((error => {
         console.error("Error Sending Email:", error.response?.data || error.message); 
      }));

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

  const formatTime = (timeString) => {
    if (!timeString) return "Saat Bilgisi Yükleniyor...";

    const time = new Date(`1970-01-01T${timeString}`);
    return time.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" });
  };

  const deleteTicket = async () => {
    const userConfirmed = window.confirm("Biletinizi silmek istediğinize emin misiniz.");
    if(userConfirmed){
      try{
        await axios.delete(`http://46.101.166.170:8080/ticketup/participants/delete/${participant.id}`);
        console.log("Participant deleted");

        await axios.delete(`http://46.101.166.170:8080/ticketup/tickets/delete/${id}`);
        console.log("Ticket deleted");

        toast.success("Bilet Silindi");
        navigate("/why-us");
      }catch(error){
        console.error("Hata oluştu:", error.response?.data || error.message);
        toast.error("Bilet Silinirken Bir Hata Oluştu");
      }
    }
  }

  const updateTicket = () => {
    navigate("/update-ticket", {state: {ticketID: id}});
  }


  return (
    <div className="flex flex-col min-h-screen bg-white overflow-y-auto">
      {/* Top Bar */}
      <TopBar></TopBar>


      {/* PDF İçeriği */}
      <div id="pdf-content" className="bg-white w-full flex flex-col items-center flex-grow">
      {/* Title */}
      <h2 className="text-4xl text-black font-bold text-center mt-8">
        {event?.name || "Yükleniyor..."}
      </h2>

      {/* QR Code Section */}
      <div className="relative flex justify-center items-center mt-8 mx-auto w-full">
        <QRCodeCanvas
          value={id}
          size={200}
          bgColor="#ffffff"
          fgColor="#000000"
        />
        <div className="absolute right-[10vh] flex flex-col gap-4">
          <GradientButton text="Bileti Düzenle" onClick={updateTicket} />
          <GradientButton text="Bileti Sil" onClick={deleteTicket} />
          <GradientButton text="Bileti İndir" onClick={downloadTicket} /> 
        </div>
      </div>

      {/* Ticket Details */}
      <div id="ticket-area" className="flex flex-col items-center mt-10 mb-20">
        <p className="text-xl font-light text-black mt-6">Etkinlik Bilgileri</p>
        <p className="text-2xl font-extrabold text-black mt-2">{event?.name || "Bilet Bilgileri Yükleniyor..."}</p>

        <div className="flex justify-between mt-4 w-2/3">
          <div className="flex flex-col items-center p-2 text-center">
            <p className="text-sm font-medium text-black">TARİH</p>
            <p className="text-sm font-bold text-black">{event?.startDate ? formatDate(event.startDate) : "Tarih yükleniyor..."}</p>
          </div>
          <div className="flex flex-col items-center p-2 text-center">
            <p className="text-sm font-medium text-black">SAAT</p>
            <p className="text-sm font-bold text-black">{event?.startTime ? formatTime(event.startTime): "Yükleniyor..."}</p>
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
            <p className="text-sm font-bold text-black" style={{textTransform: "uppercase"}}>
              {participant?.name || "Katılımcı Bilgileri Yükleniyor..."} {participant?.surname || "Katılımcı Bilgileri Yükleniyor..."} </p>
          </div>
          <div className="flex flex-col items-center p-2 text-center">
            <p className="text-sm font-medium text-black">E-mail</p>
            <p className="text-sm font-bold text-black">{participant?.email}</p>
          </div>
          <div className="flex flex-col items-center p-2 text-center">
            <p className="text-sm font-medium text-black">Telefon</p>
            <p className="text-sm font-bold text-black">{participant?.phone}</p>
          </div>
        </div>

        {/* Additional Information */}
        <p className="text-sm font-medium text-black mt-7">BİLET NO</p>
        <p className="text-sm font-bold text-black mb-4">
          {id}
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
