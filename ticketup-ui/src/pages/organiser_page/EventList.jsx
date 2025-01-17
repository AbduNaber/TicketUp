import React from "react";
import { useState, useEffect } from "react";
import axios from "axios";
import { toast } from "react-toastify";

const EventList = ({ events, token, setEvents, fetchEvents ,isActive, selectedEvent , setSelectedEvent, setActiveItem}) => {
    
    const filteredEvents = isActive === 2 
    ? events.filter((event) => event.eventStatus === "AKTİF") 
    : events.filter((event) => event.eventStatus === "PASİF");
    

    const [popupVisible, setPopupVisible] = useState(false);
    


    const [isAllSelected, setIsAllSelected] = useState(false);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [eventToDelete, setEventToDelete] = useState(null);
    const handleView = (event) => {
      setSelectedEvent(event);
      
      setPopupVisible(true);
    };
  const closePopup = () => {
      setPopupVisible(false);
      
    };
  
    const goToEventPage = () => {
      if (selectedEvent) {
        window.location.href = `/event/${selectedEvent.id}`;
      }
    };
  
    const goToParticipantList = () => {
      if (selectedEvent) {
       
        setActiveItem(8);
      }
    };
  
    const handleToggle = (clickedEvent) => {
        setEvents((prevEvents) =>
          prevEvents.map((event) =>
            event === clickedEvent
              ? { ...event, isselected: !event.isselected }
              : event
          )
        );
      };
    
      const handleToggleAll = () => {
        setIsAllSelected((prev) => {
          const newSelectedState = !prev;
          setEvents((prevEvents) =>
            prevEvents.map((event) => ({
              ...event,
              isselected: newSelectedState,
            }))
          );
          return newSelectedState;
        });
      };
    
      const handleDelete = async (eventId) => {
        
    
        try {
          await axios.delete(`http://46.101.166.170:8080/ticketup/events/delete/${eventId}`, {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          });
          
          setIsModalOpen(false);
          toast.success("Event deleted successfully.");
            fetchEvents();
          
        } catch (error) {
          console.error("Error deleting event:", error.response?.data || error.message);
          if (error.response?.status === 401) {
            window.location.href = "/login";
          }
        }
      };

      const formatDate = (dateString) => {
        const date = new Date(dateString);
        const day = date.getDate().toString().padStart(2, "0");
        const month = (date.getMonth() + 1).toString().padStart(2, "0");
        const year = date.getFullYear();
        return `${day}/${month}/${year}`;
      };
     


      const openDeleteModal = (eventId) => {
        setEventToDelete(eventId);
        setIsModalOpen(true);
      };
    
      const closeModal = () => {
        setIsModalOpen(false);
        setEventToDelete(null);
      };

      const activateEvent = async (eventId) => {
        try {
          await axios.post(
            `http://46.101.166.170:8080/ticketup/events/activate/${eventId}`,
            {},
            {
              headers: {
                Authorization: `Bearer ${token}`,
              },
            }
          );
          fetchEvents();
          toast.success("Etkinlik başarıyla aktive edildi.");
        } catch (error) {
          console.error("Error activating event:", error.response?.data || error.message);
          if (error.response?.status === 401) {
            window.location.href = "/login";
          }
        }
      };
      
  return (
    <div className="p-5 flex-1 flex flex-col overflow-hidden">
      <h2 className="mb-4 text-lg font-medium">Etkinlikler</h2>
      <div className="grid grid-cols-[40px_2fr_1fr_1fr_1fr_1fr_1fr] gap-2 items-center font-bold border-b-2 border-gray-300 bg-gray-50 py-2">
        <span className="flex justify-center items-center ml-2">
          <img
            onClick={handleToggleAll}
            src={
              isAllSelected
                ? "/src/assets/icons/selected-checkbox.svg"
                : "/src/assets/icons/checkbox.svg"
            }
            alt="Checkbox"
            className="w-5 h-4 cursor-pointer"
          />
        </span>

        <span>Ekinlik Adı </span>
        <span>Tipi</span>
        <span>Tarihi</span>
        <span>Durumu</span>
        <span>Ne Zaman Oluşturuldu</span>
        <span>Hızlı Aksiyonlar</span>
      </div>

      <div className="flex-1 overflow-y-auto bg-white border border-gray-300 rounded">
        {filteredEvents.map((event, index) => (
          <div
            key={index}
            className="grid grid-cols-[40px_2fr_1fr_1fr_1fr_1fr_1fr] gap-2 items-center py-3 border-b border-gray-200 text-sm hover:bg-gray-50 transition"
          >
            <span className="flex justify-center items-center ml-2">
              <img
                onClick={handleToggleAll}
                src={
                  isAllSelected
                    ? "/src/assets/icons/selected-checkbox.svg"
                    : "/src/assets/icons/checkbox.svg"
                }
                alt="Checkbox"
                className="w-5 h-4 cursor-pointer"
              />
            </span>
            <span className="truncate">{event.name}</span>
            <span className="truncate">{event.eventType}</span>
            <span>{formatDate(event.startDate)}</span>
            <span>{event.eventStatus}</span>
            <span>{formatDate(event.createdDate)}</span>
            <div className="flex gap-1">
            {event.eventStatus === "AKTİF" ? (
  <>
    <button
      className="bg-gray-50 border border-blue-700 text-blue-700 rounded text-xs px-3 py-1 hover:bg-blue-700 hover:text-white"
      onClick={() => handleView(event)}
    >
      Görüntüle
    </button>
    
  </>
) : (
  <button
    className="bg-gray-50 border border-green-600 text-green-600 rounded text-xs px-3 py-1 hover:bg-green-600 hover:text-white"
    onClick={() => activateEvent(event.id)}
  >
    Aktif Et
  </button>
)}
<button
  className="bg-gray-50 border border-red-600 text-red-600 rounded text-xs px-3 py-1 hover:bg-red-600 hover:text-white"
  onClick={() => openDeleteModal(event.id)}
>
  {event.eventStatus === "AKTİF" ? "Kapat" : "Sil"}
</button>

      {isModalOpen && (
        <div className="fixed inset-0 flex items-center justify-center bg-gray-800 bg-opacity-50">
          <div className="bg-white rounded-lg p-6 w-1/3">
            <h2 className="text-lg font-bold mb-4">Silmek İstiyor musun ?</h2>
            <p className="">Etkinliği {event.eventStatus === "AKTİF" ? "kapatmak" : "silmek"} gerçekten istiyor musun? </p>
            {event.eventStatus === "AKTİF" ? <p className="mb-6">(Silinmiş Etkinlikler Kapanmış Etkinliklere düşer)</p> : null}
            <div className="flex justify-end">
              <button
                className="bg-gray-200 text-gray-800 px-4 py-2 rounded mr-2"
                onClick={closeModal}
              >
                İptal Et
              </button>
              <button
                className="bg-red-600 text-white px-4 py-2 rounded"
                onClick={() => handleDelete(eventToDelete)}
              >
              {event.eventStatus === "AKTİF" ? "Kapat" : "Sil"}
              </button>
            </div>
          </div>
        </div>
      )}
            </div>
          </div>
        ))}
      </div>

      {popupVisible && selectedEvent && (
          <div className="fixed top-0 left-0 w-full h-full bg-black bg-opacity-60 flex justify-center items-center z-50">
            <div className="bg-white p-5 rounded-lg max-w-md w-11/12 relative">
              <button className="absolute top-2 right-2 bg-none border-none text-2xl cursor-pointer leading-none" onClick={closePopup}>
                &times;
              </button>
              <h3 className="mt-0 text-xl text-center">Etkinlik Detayları</h3>
              {selectedEvent ? (
                <>
                  <p><strong>Adı: </strong> {selectedEvent.name}</p>
                  <p><strong>Tipi: </strong> {selectedEvent.eventType}</p>
                  <p><strong>Tarihi: </strong> {formatDate(selectedEvent.startDate)}</p>
                  <p><strong>Durumu: </strong> {selectedEvent.eventStatus}</p>
                  <p><strong>Oluşturulma Tarihi: </strong> {formatDate(selectedEvent.createdDate)}</p>
                  <p>
                    <strong>Etkinlik Linki: </strong>
                    <a
                      href={`http://46.101.166.170:5173/event/${selectedEvent.id}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      style={{ textDecoration: "none", color: "#6c5ce7", fontWeight: "bold" }}
                    >
                      {`http://46.101.166.170:5173/event/${selectedEvent.id}`}
                    </a>      
                  </p>
                </>
              ) : (
                <p>Etkinlik Detayları Yükleniyor...</p>
              )}
              <div className="flex justify-between mt-5">
                <button className="px-3 py-2 rounded bg-blue-600 text-white hover:bg-blue-700" onClick={goToEventPage}>
                  Etkinlik Sayfası
                </button>
                <button className="px-3 py-2 rounded bg-gray-200 text-gray-700 hover:bg-gray-300" onClick={goToParticipantList}>
                 Katılımcıları Göster
                </button>
              </div>
            </div>
          </div>
        )}
    </div>

    
  );
};

export default EventList;
