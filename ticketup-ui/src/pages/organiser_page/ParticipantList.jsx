import React, { useState , useEffect } from "react";
import axios from "axios";
import { toast } from "react-toastify";
const ParticipantList = ({  token, selectedEvent }) => {
  
    const [participants, setParticipants] = useState([]);
    const [popupVisible, setPopupVisible] = useState(false);
    const [selectedParticipant, setSelectedParticipant] = useState(null);
    const [isAllSelected, setIsAllSelected] = useState(false);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [participantToDelete, setParticipantToDelete] = useState(null);
    
    useEffect(() => {
        // Check if selectedEvent and selectedEvent.id are available before fetching participants
        if (selectedEvent && selectedEvent.id) {
            fetchParticipants();
        } else {
            console.warn("Selected event is not defined or missing an ID");
        }
    }, [selectedEvent]);
    const handleView = (participant) => {
        setSelectedParticipant(participant);
        setPopupVisible(true);
    };
    const closePopup = () => {
        setPopupVisible(false);
        setSelectedParticipant(null);
    };
    const handleToggle = (clickedParticipant) => {
        setParticipants((prevParticipants) =>
            prevParticipants.map((participant) =>
            participant === clickedParticipant
                ? { ...participant, isSelected: !participant.isSelected }
                : participant
            )
        );
    };
  const handleToggleAll = () => {
    setIsAllSelected((prev) => {
      const newSelectedState = !prev;
      setParticipants((prevParticipants) =>
        prevParticipants.map((participant) => ({
          ...participant,
          isSelected: newSelectedState,
        }))
      );
      return newSelectedState;
    });
  };
    const fetchParticipants = async () => {
        if (!selectedEvent || !selectedEvent.id) {
            console.error("selectedEvent is undefined or missing an id");
            return;
        }
    try {
        const response = await axios.get(
            `http://46.101.166.170:8080/ticketup/participants/event/${selectedEvent.id}`,
            {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            }
        );
        
        setParticipants(response.data);
        console.log(response.data);
    } catch (error) {
        console.error("Error fetching participants:", error.response?.data || error.message);
        if (error.response?.status === 401) {
            console.error("Unauthorized. Redirecting to login.");
            window.location.href = "/login";
        }
    }
};
  const handleDelete = async (participantId) => {
    try {
      await axios.delete(`http://46.101.166.170:8080/ticketup/participants/delete/${participantId}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      setIsModalOpen(false);
      toast.success("Participant deleted successfully.");
      fetchParticipants();
    } catch (error) {
      console.error("Error deleting participant:", error.response?.data || error.message);
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
  const openDeleteModal = (participantId) => {
    setParticipantToDelete(participantId);
    setIsModalOpen(true);
  };
  const closeModal = () => {
    setIsModalOpen(false);
    setParticipantToDelete(null);
  };
  
  return (
    <div className="p-5 flex-1 flex flex-col overflow-hidden">
      <h2 className="mb-4 text-lg font-medium"> {selectedEvent.name}'ın Katılımcıları</h2>
      <div className="grid grid-cols-[40px_2fr_1fr_1fr_1fr] gap-2 items-center font-bold border-b-2 border-gray-300 bg-gray-50 py-2">
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
        <span>Registered Date</span>
        <span>Hızlı Aksiyonlar</span>
      </div>
      <div className="flex-1 overflow-y-auto bg-white border border-gray-300 rounded">
        {participants.map((participant, index) => (
          <div
            key={index}
            className="grid grid-cols-[40px_2fr_1fr_1fr_1fr] gap-2 items-center py-3 border-b border-gray-200 text-sm hover:bg-gray-50 transition"
          >
            <span className="flex justify-center items-center ml-2">
              <img
                onClick={() => handleToggle(participant)}
                src={
                  participant.isSelected
                    ? "/src/assets/icons/selected-checkbox.svg"
                    : "/src/assets/icons/checkbox.svg"
                }
                alt="Checkbox"
                className="w-5 h-4 cursor-pointer"
              />
            </span>
            <span className="truncate">{participant.name} {participant.surname}</span>
            <span className="truncate">{participant.email}</span>
            <span>{formatDate(participant.createdAt)}</span>
            <div className="flex gap-1">
              <button
                className="bg-gray-50 border border-blue-700 text-blue-700 rounded text-xs px-2 py-1 hover:bg-blue-700 hover:text-white"
                onClick={() => handleView(participant)}
              >
                View
              </button>
              <button
                className="bg-gray-50 border border-red-600 text-red-600 rounded text-xs px-2 py-1 hover:bg-red-600 hover:text-white"
                onClick={() => openDeleteModal(participant.id)}
              >
                Delete
              </button>
              {isModalOpen && (
                <div className="fixed inset-0 flex items-center justify-center bg-gray-800 bg-opacity-50">
                  <div className="bg-white rounded-lg p-6 w-1/3">
                    <h2 className="text-lg font-bold mb-4">Confirm Delete</h2>
                    <p className="mb-6">Are you sure you want to delete this participant?</p>
                    <div className="flex justify-end">
                      <button
                        className="bg-gray-200 text-gray-800 px-4 py-2 rounded mr-2"
                        onClick={closeModal}
                      >
                        Cancel
                      </button>
                      <button
                        className="bg-red-600 text-white px-4 py-2 rounded"
                        onClick={() => handleDelete(participantToDelete)}
                      >
                        Delete
                      </button>
                    </div>
                  </div>
                </div>
              )}
            </div>
          </div>
        ))}
      </div>
      {popupVisible && selectedParticipant && (
  <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-60 z-50">
    <div className="bg-white p-6 rounded-lg shadow-xl w-11/12 max-w-lg relative">
      {/* Close Button */}
      <button
        className="absolute top-3 right-3 text-gray-600 hover:text-gray-900 text-2xl font-bold focus:outline-none"
        onClick={closePopup}
        aria-label="Close"
      >
        &times;
      </button>
      {/* Header */}
      <h3 className="text-2xl font-semibold text-center mb-4">Katılımcı Detayı</h3>
      {/* Participant Details */}
      {selectedParticipant ? (
        <div className="space-y-3 text-sm">
          <div>
            <span className="font-medium text-gray-700">Adı Soyadı:</span>
            <span className="ml-2 text-gray-800">
              {selectedParticipant.name} {selectedParticipant.surname}
            </span>
          </div>
          <div>
            <span className="font-medium text-gray-700">Eposta :</span>
            <span className="ml-2 text-gray-800">{selectedParticipant.email}</span>
          </div>
          <div>
            <span className="font-medium text-gray-700">Telefon:</span>
            <span className="ml-2 text-gray-800">{selectedParticipant.phone}</span>
          </div>
          <div>
            <span className="font-medium text-gray-700">katılım Tarihi:</span>
            <span className="ml-2 text-gray-800">{formatDate(selectedParticipant.createdAt)}</span>
          </div>
          <div>
            <span className="font-medium text-gray-700">Açıklaması:</span>
            <span className="ml-2 text-gray-800">{selectedParticipant.description || 'N/A'}</span>
          </div>
        </div>
      ) : (
        <p className="text-gray-600 text-center">Loading participant details...</p>
      )}
            </div>
        </div>
        )}
    </div>
  );
};
export default ParticipantList;