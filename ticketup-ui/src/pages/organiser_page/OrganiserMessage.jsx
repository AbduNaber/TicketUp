import React, { useState, useEffect } from "react";
import axios from "axios";
import { toast } from "react-toastify";
import { jwtDecode } from "jwt-decode";

const OrganiserMessage = ({ token, selectedEvent }) => {
  const [messages, setMessages] = useState([]);
  const [popupVisible, setPopupVisible] = useState(false);
  const [selectedMessage, setSelectedMessage] = useState(null);
  const [isAllSelected, setIsAllSelected] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [messageToDelete, setMessageToDelete] = useState(null);

  useEffect(() => {
   
      fetchMessages();
    
  }, []);

  const handleView = async (message) => {
    setSelectedMessage(message);
    setPopupVisible(true);
  
    if (!message.isRead) {
      try {
        await axios.put(
          `http://46.101.166.170:8080/ticketup/organizator-messages/mark-read/${message.id}`,
          {},
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );
  
        // Update the message in the local state
        setMessages((prevMessages) =>
          prevMessages.map((msg) =>
            msg.id === message.id ? { ...msg, isRead: true } : msg
          )
        );
      } catch (error) {
        console.error("Error marking message as read:", error.response?.data || error.message);
      }
    }
  };
  

  const closePopup = () => {
    setPopupVisible(false);
    setSelectedMessage(null);
  };

  const handleToggle = (clickedMessage) => {
    setMessages((prevMessages) =>
      prevMessages.map((message) =>
        message === clickedMessage
          ? { ...message, isSelected: !message.isSelected }
          : message
      )
    );
  };

  const handleToggleAll = () => {
    setIsAllSelected((prev) => {
      const newSelectedState = !prev;
      setMessages((prevMessages) =>
        prevMessages.map((message) => ({
          ...message,
          isSelected: newSelectedState,
        }))
      );
      return newSelectedState;
    });
  };

  const fetchMessages = async () => {
    const token = sessionStorage.getItem("token");
    const parsedToken = jwtDecode(token);
    try {
      const response = await axios.get(
        `http://46.101.166.170:8080/ticketup/organizator-messages/list/${parsedToken.id}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      const fetchedMessages = response.data;
      const hasUnreadMessages = fetchedMessages .some((message) => !message.read);

    if (hasUnreadMessages) {
      toast.info("Okunmamış Mesajların Mecvut.");
      console.log(fetchedMessages );
    }
      setMessages(fetchedMessages);
    } catch (error) {
      console.error("Error fetching messages:", error.response?.data || error.message);
      if (error.response?.status === 401) {
        window.location.href = "/login";
      }
    }
  };

  const handleDelete = async (messageId) => {
    try {
      await axios.delete(`http://46.101.166.170:8080/ticketup/organizator-messages/delete/${messageId}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      setIsModalOpen(false);
      toast.success("Message deleted successfully.");
      fetchMessages();
    } catch (error) {
      console.error("Error deleting message:", error.response?.data || error.message);
      if (error.response?.status === 401) {
        window.location.href = "/login";
      }
    }
  };



  const openDeleteModal = (messageId) => {
    setMessageToDelete(messageId);
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setMessageToDelete(null);
  };

  return (
    <div className="p-5 flex-1 flex flex-col overflow-hidden">
      <h2 className="mb-4 text-lg font-medium">
        Organizatör Mesajları
      </h2>
      <div className="grid grid-cols-[40px_2fr_2fr_1fr] gap-2 items-center font-bold border-b-2 border-gray-300 bg-gray-50 py-2">
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
        <span>Name</span>
        <span>Email</span>
        <span>Hızlı Aksiyonlar</span>
      </div>
      <div className="flex-1 overflow-y-auto bg-white border border-gray-300 rounded">
        {messages.map((message, index) => (
          <div
          key={index}
          className={`grid grid-cols-[40px_2fr_2fr_1fr] gap-2 items-center py-3 border-b border-gray-200 text-sm hover:bg-gray-50 transition ${
            !message.read ? "font-bold bg-gray-100" : ""
          }`}
        >
          <span className="flex justify-center items-center ml-2">
            <img
              onClick={() => handleToggle(message)}
              src={
                message.isSelected
                  ? "/src/assets/icons/selected-checkbox.svg"
                  : "/src/assets/icons/checkbox.svg"
              }
              alt="Checkbox"
              className="w-5 h-4 cursor-pointer"
            />
          </span>
          <span className="truncate">{message.name} {message.surname}</span>
          <span className="truncate">{message.email}</span>
          <div className="flex gap-1">
            <button
              className="bg-gray-50 border border-blue-700 text-blue-700 rounded text-xs px-2 py-1 hover:bg-blue-700 hover:text-white"
              onClick={() => handleView(message)}
            >
              Görüntüle
            </button>
            <button
              className="bg-gray-50 border border-red-600 text-red-600 rounded text-xs px-2 py-1 hover:bg-red-600 hover:text-white"
              onClick={() => openDeleteModal(message.id)}
            >
              Sil
            </button>
              {isModalOpen && (
                <div className="fixed inset-0 flex items-center justify-center bg-gray-800 bg-opacity-50">
                  <div className="bg-white rounded-lg p-6 w-1/3">
                    <h2 className="text-lg font-bold mb-4">Onaylama Ekranı</h2>
                    <p className="mb-6">Mesajı silmek istediğine emin misin? ( Geri alınamaz )</p>
                    <div className="flex justify-end">
                      <button
                        className="bg-gray-200 text-gray-800 px-4 py-2 rounded mr-2"
                        onClick={closeModal}
                      >
                        İptal et
                      </button>
                      <button
                        className="bg-red-600 text-white px-4 py-2 rounded"
                        onClick={() => handleDelete(messageToDelete)}
                      >
                        Sil
                      </button>
                    </div>
                  </div>
                </div>
              )}
            </div>
          </div>
        ))}
      </div>
      {popupVisible && selectedMessage && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-60 z-50">
          <div className="bg-white p-6 rounded-lg shadow-xl w-11/12 max-w-lg relative">
            <button
              className="absolute top-3 right-3 text-gray-600 hover:text-gray-900 text-2xl font-bold focus:outline-none"
              onClick={closePopup}
              aria-label="Close"
            >
              &times;
            </button>
            <h3 className="text-2xl font-semibold text-center mb-4">
              Mesaj Detayı
            </h3>
            {selectedMessage ? (
              <div className="space-y-3 text-sm">
                <div>
                  <span className="font-medium text-gray-700">Adı Soyadı:</span>
                  <span className="ml-2 text-gray-800">
                    {selectedMessage.name} {selectedMessage.surname}
                  </span>
                </div>
                <div>
                  <span className="font-medium text-gray-700">Eposta :</span>
                  <span className="ml-2 text-gray-800">{selectedMessage.email}</span>
                </div>
                <div>
                  <span className="font-medium text-gray-700">Mesaj:</span>
                  <span className="ml-2 text-gray-800">{selectedMessage.massage}</span>
                </div>
              </div>
            ) : (
              <p className="text-gray-600 text-center">Mesaj detayları Yükleniyor...</p>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default OrganiserMessage;
