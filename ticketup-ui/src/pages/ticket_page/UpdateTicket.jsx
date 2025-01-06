import React, { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import axios from "axios";
import Footer from "../../components/Footer";
import TopBar from "../../components/TopBar"
import { ToastContainer, toast } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';

const UpdateTicket = () => {
  const location = useLocation();
  const ticketID = location.state?.ticketID;
  const [ticket, setTicket] = useState(null);
  const [participant, setParticipant] = useState(null);
  const [event, setEvent] = useState(null);
  
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    name: "",
    surname: "",
    mailAddress: "",
    phoneNumber: "",
    description: "",
    terms: false,
  });

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: type === "checkbox" ? checked : value,
    }));
  };
  
  useEffect(() => {
    const fetchTicket = async () => {
      try{
        const ticketResponse = await axios.get(
          `http://localhost:8080/ticketup/tickets/list/${ticketID}`
        );
        setTicket(ticketResponse.data);
      }catch(error){
        console.error("Error fetching ticket:", error);
      }
    };

    fetchTicket();
  }, [ticketID]);

  useEffect(() => {
    if(ticket) {
      const fetchParticipantAndEvent = async () => {
        try{
          const participantResponse = await axios.get(
            `http://localhost:8080/ticketup/participants/list/${ticket.participantId}`
          );
          setParticipant(participantResponse.data);

          const eventResponse = await axios.get(
            `http://localhost:8080/ticketup/events/list/${ticket.eventId}`
          );
          setEvent(eventResponse.data);
        }catch(error){
          console.error("Error fetching participant or event:",error);
        }
      };

      fetchParticipantAndEvent();
    }
  }, [ticket]);

  useEffect(() => {
    if(participant){
      setFormData({
        name: participant.name || "",
        surname: participant.surname || "",
        mailAddress: participant.email || "",
        phoneNumber: participant.phone || "",
        description: participant.description || "",
        terms: participant.isFirstTime || false,
      });
    }
  }, [participant])

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!formData.terms) {
      toast.error("Lütfen KVKK onayını kabul ediniz!");
      return;
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!emailRegex.test(formData.mailAddress)) {
        toast.error("Geçerli bir e-posta adresi giriniz!");
      return;
    } 

    if (formData.phoneNumber.length !== 10 || isNaN(formData.phoneNumber)) {
      toast.error("Telefon numarası 10 haneli olmalı ve sadece rakam içermelidir!");
      return;
    }

    try {
      
      await axios.put(
        `http://localhost:8080/ticketup/participants/update/${participant.id}`, {
          eventId: event.id,
          name: formData.name,
          surname: formData.surname,
          email: formData.mailAddress,
          phone: formData.phoneNumber,
          description: formData.description,
          firstTime: formData.terms,
        },
        {
          headers: {
            "Content-Type": "application/json",
          }
        }
      )
    

      navigate(`/ticket/${ticketID}`);
    } catch (error) {
      if(error.response){
              toast.error(error.response.data || "Bir hata oluştu");
              console.error(error);
            }else{
              toast.error("Beklenmedik Bir hata oluştu");
              console.error(error);
            }    
    }
  };

  const handleReset = () => {
    const userConfirmed = window.confirm("Tüm Bilgileri Temizlemek İstediğinize Emin Misiniz");
    if(userConfirmed){
      setFormData({
        name: "",
        surname: "",
        mailAddress: "",
        phoneNumber: "",
        description: "",
        terms: false,
      });
    }
  };

  return (
    <div className="flex flex-col items-center bg-gray-100 min-h-screen">
      <TopBar></TopBar>
      
      <div className="mt-[5vh] flex flex-col items-center w-[50vw] bg-white shadow-md p-6 mb-[5vh] rounded-md">
      <h3 className="text-2xl font-bold">{event?.name || "Loading..."}</h3>
      <img className="my-5 h-[35vh] w-auto mb-[5vh] rounded-md" src={event?.imgUrl || "Loading..."} alt="Event" />
        <form className="flex flex-col w-[40vw]" onSubmit={handleSubmit}>
          <div className="grid grid-cols-2 gap-4 mb-6">
            <div>
              <label htmlFor="name" className="block font-medium mb-2">
                İsim:
              </label>
              <input
                type="text"
                id="name"
                name="name"
                required
                placeholder="İsim Giriniz"
                value={formData.name}
                onChange={handleChange}
                className="w-full p-2 border border-gray-300 rounded"
              />
            </div>
            <div>
              <label htmlFor="surname" className="block font-medium mb-2">
                Soyisim:
              </label>
              <input
                type="text"
                id="surname"
                name="surname"
                required
                placeholder="Soyisim Giriniz"
                value={formData.surname}
                onChange={handleChange}
                className="w-full p-2 border border-gray-300 rounded"
              />
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4 mb-6">
            <div>
              <label htmlFor="mail-address" className="block font-medium mb-2">
                E-Posta:
              </label>
              <input
                type="email"
                id="mail-address"
                name="mailAddress"
                required
                placeholder="örnekmail@ticketup.net"
                value={formData.mailAddress}
                onChange={handleChange}
                className="w-full p-2 border border-gray-300 rounded"
              />
            </div>
            <div>
              <label htmlFor="phone-number" className="block font-medium mb-2">
                Telefon No:
              </label>
              <input
                type="tel"
                id="phone-number"
                name="phoneNumber"
                required
                placeholder="(5 - - ) - - -  - -  - -"
                maxLength={10}
                value={formData.phoneNumber}
                onChange={handleChange}
                className="w-full p-2 border border-gray-300 rounded"
              />
            </div>
          </div>
          <div className="mb-6">
            <p className="font-medium mb-2">
              Eklemek istedikleriniz:
            </p>
            <input
                
                id="description"
                name="description"
                placeholder="buraya yazınız."
                value={formData.description}
                onChange={handleChange}
                className="w-full p-2 border border-gray-300 rounded"
              />
          </div>

          <div className="flex items-center gap-4 mb-6">
            <input
              type="checkbox"
              name="terms"
              checked={formData.terms}
              onChange={handleChange}
              className="form-checkbox"
            />
            <span>
              6698 Sayılı KVKK uyarınca, gerçekleşecek olan etkinlikte bilgilerimin
              paylaşılmasını kabul ediyorum.
            </span>
          </div>

          <div className="flex justify-between">
            <button
              type="button"
              onClick={handleReset}
              className="px-4 py-2 bg-gray-300 rounded hover:bg-gray-400"
            >
              TERCİHLERİ TEMİZLE
            </button>
            <button
              type="submit"
              className="px-4 py-2 bg-green-500 text-white rounded hover:bg-green-600"
            >
              GÖNDER
            </button>
          </div>
        </form>
      </div>
      <Footer></Footer>
      <ToastContainer></ToastContainer>
    </div>
  );
};

export default UpdateTicket;
