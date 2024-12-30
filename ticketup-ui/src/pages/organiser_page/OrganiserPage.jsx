import React, { useEffect, useState } from "react";
import { ToastContainer } from "react-toastify";
import { jwtDecode } from "jwt-decode";
import EventList from "./EventList";
import CreateEvent from '../event_create/CreateEvent';
import ConfirmationModal from "./ConfirmationModal";
import axios from "axios";
import ParticipantList from "../participant_page/ParticipantList";


const OrganizerPage = () => {
 
  const [events, setEvents] = useState([]);
  const [forceUpdate, setForceUpdate] = useState(false);
  const [isDropdownVisible, setIsDropdownVisible] = useState(false);

  const token = sessionStorage.getItem("token");
  const parsedToken = token ? jwtDecode(token) : null;
  const [isLocked, setIsLocked] = useState(false);

  const [showConfirmation, setShowConfirmation] = useState(false); // For modal visibility
  const [activeItem, setActiveItem] = useState(2);
  const [nextMenuItem, setNextMenuItem] = useState(null);

  const menuItems = [
    { id: 2, label: "AKTİF ETKİNLİKLER", icon: "/src/assets/icons/participant-icon.svg" },
    { id: 3, label: "KAPANMIŞ ETKİNLİKLER", icon: "/src/assets/icons/participant-icon.svg" },
    { id: 4, label: "ETKİNLİK OLUŞTUR", icon: "/src/assets/icons/participant-icon.svg" },
    { id: 5, label: "LOG KAYITLARI", icon: "/src/assets/icons/participant-icon.svg" },
    { id: 6, label: "ORGANIZATOR İŞLEMLERİ", icon: "/src/assets/icons/participant-icon.svg" },
    { id: 7, label: "TicketUp'a Ulaş", icon: "/src/assets/icons/participant-icon.svg" }
  ];

  

  const handleEventCreated = () => {
   
    setActiveItem(2); 
    fetchEvents();
  };


  
  const toggleDropdown = () => {
    setIsDropdownVisible(!isDropdownVisible);
  };

  useEffect(() => {
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

    

    fetchEvents();
  }, [token]);

  const handleMenuClick = (item) => {
    if (isLocked && item.id !== 4) {
      setNextMenuItem(item.id); // Store the next menu item
      setShowConfirmation(true); // Show confirmation modal
      return;
    }

    if (item.id === 4) {
      setIsLocked(true); // Lock navigation when entering "ETKİNLİK OLUŞTUR"
    }

    setActiveItem(item.id); // Navigate to the selected menu item
    setForceUpdate((prev) => !prev);
  };

  const handleConfirmLeave = () => {
    setShowConfirmation(false); // Close the modal
    setIsLocked(false); // Unlock navigation
    setActiveItem(nextMenuItem); // Navigate to the stored menu item
    setForceUpdate((prev) => !prev);
  };

  const handleCancelLeave = () => {
    setShowConfirmation(false); // Close the modal without navigation
  };

  const handleLogout = () => {
    sessionStorage.removeItem("token");
    window.location.href = "/login?loggedOut=true";
  };

  const fetchEvents = async () => {
    try {
      const response = await axios.get(
        `http://localhost:8080/ticketup/events/list-organizer-events/${parsedToken.id}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      setEvents(response.data);
     
    } catch (error) {
      console.error("Error fetching events:", error.response?.data || error.message);
      if (error.response?.status === 401) {
        console.error("Unauthorized. Redirecting to login.");
        window.location.href = "/login";
      }
    }
  };


  const pageComponents = {
    2: 
    <EventList events={events} token={token} setEvents={setEvents} fetchEvents={fetchEvents} isActive={2} />
    ,
    3: <EventList events={events} token={token} setEvents={setEvents} fetchEvents={fetchEvents} isActive={3} />,
    4: <CreateEvent onEventCreated={handleEventCreated} />,
  };
  
  return (
    <div className="flex h-screen bg-gray-100 font-sans">
      {/* Sidebar */}
      <div className="w-60 bg-white border-r border-gray-300 p-5 flex flex-col">
        <div className="mb-10 text-center">
          <img
            src="/src/assets/icons/ticketUp-logo.svg"
            alt="TicketUp Logo"
            className="w-4/5 h-auto mx-auto"
          />
        </div>
        <ul className="list-none p-0 m-0">
          {menuItems.map((item) => (
            <li
              key={item.id}
              className={`flex items-center gap-2 p-3 rounded-md cursor-pointer text-sm text-gray-800 transition-colors 
              ${item.id === activeItem ? "bg-gray-200 font-bold" : "hover:bg-gray-100"}`}
              onClick={() => {
                handleMenuClick(item)
                
              }}
              
            >
              <span className="w-5 h-5 flex-shrink-0">
                <img src={item.icon} alt={item.label} />
              </span>
              <span>{item.label}</span>
              {item.id === activeItem && (
                <span className="ml-auto">
                  <img src="/src/assets/icons/dashicons_arrow-right.svg" alt="Active" />
                </span>
              )}
            </li>
          ))}
        </ul>
      </div>

      {/* Main Content */}
      <div className="flex-1 flex flex-col overflow-hidden">
          {/* Top Navigation Bar */}
          <div className="flex justify-end items-center bg-white px-5 py-2 border-b border-gray-300 gap-1">
          
          <div className="justify-end user-menu flex items-center gap-1 relative">
        <button
        onClick={toggleDropdown}
        className="bg-none border-none text-sm cursor-pointer p-2 rounded hover:bg-gray-100"
        >
        Organizator
        </button>
        {isDropdownVisible && (
        <div className="absolute top-10 right-0 bg-white border border-gray-300 shadow-lg flex flex-col p-0 w-36 z-50">
        <button className="text-left p-3 text-sm text-gray-800 hover:bg-gray-100">
          View Profile
        </button>
        <button
          onClick={handleLogout}
          className="text-left p-3 text-sm text-gray-800 hover:bg-gray-100"
        >
          Logout
        </button>
        </div>
        )}
      </div>
        </div>

        {/* Event List */}
        <div className="p-5 flex-1 flex flex-col overflow-hidden">
          <h2 className="mb-4 text-lg font-medium">EVENTLER</h2>
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
            
            <span>Event Name</span>
            <span>Event Type</span>
            <span>Date</span>
            <span>Status</span>
            <span>Created Date</span>
            <span>Quick Actions</span>
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
                <span className="truncate">{event.type}</span>
                <span>{formatDate(event.eventDate)}</span>
                <span>{event.status}</span>
                <span>{formatDate(event.createdDate)}</span>
                <div className="flex gap-1">
                  <button
                    className="bg-gray-50 border border-blue-700 text-blue-700 rounded text-xs px-2 py-1 hover:bg-blue-700 hover:text-white"
                    onClick={() => handleView(event)}
                  >
                    View
                  </button>
                  <button className="bg-gray-50 border border-cyan-600 text-cyan-600 rounded text-xs px-2 py-1 hover:bg-cyan-600 hover:text-white">
                    Edit
                  </button>
                  <button
                    className="bg-gray-50 border border-red-600 text-red-600 rounded text-xs px-2 py-1 hover:bg-red-600 hover:text-white"
                    onClick={() => handleDelete(event.id)}
                  >
                    Delete
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>

        {popupVisible && selectedEvent && (
          <div className="fixed top-0 left-0 w-full h-full bg-black bg-opacity-60 flex justify-center items-center z-50">
            <div className="bg-white p-5 rounded-lg max-w-md w-11/12 relative">
              <button className="absolute top-2 right-2 bg-none border-none text-2xl cursor-pointer leading-none" onClick={closePopup}>
                &times;
              </button>
              <h3 className="mt-0 text-xl text-center">Event Details</h3>
              {selectedEvent ? (
                <>
                  <p><strong>Name: </strong> {selectedEvent.name}</p>
                  <p><strong>Type: </strong> {selectedEvent.type}</p>
                  <p><strong>Date: </strong> {formatDate(selectedEvent.eventDate)}</p>
                  <p><strong>Status: </strong> {selectedEvent.status}</p>
                  <p><strong>Created Date: </strong> {formatDate(selectedEvent.createdDate)}</p>
                </>
              ) : (
                <p>Loading event details...</p>
              )}
              <div className="flex justify-between mt-5">
                <button className="px-3 py-2 rounded bg-blue-600 text-white hover:bg-blue-700" onClick={goToEventPage}>
                  Event Page
                </button>
                <button className="px-3 py-2 rounded bg-gray-200 text-gray-700 hover:bg-gray-300" onClick={goToParticipantList}>
                  Participants
                </button>
              </div>
            </div>
          </div>
        )}
        
        

        
      </div>
      <ToastContainer />
      <ConfirmationModal
        isOpen={showConfirmation}
        onConfirm={handleConfirmLeave}
        onCancel={handleCancelLeave}
        message="ETKİNLİK DAHA OLUŞTURMADIN EMİN MİSİN?"
      />
    </div>
  );
};

export default OrganizerPage;
