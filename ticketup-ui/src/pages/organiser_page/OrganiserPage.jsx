import React, { useEffect, useState } from "react";
import { ToastContainer } from "react-toastify";
import { jwtDecode } from "jwt-decode";
import EventList from "./EventList";
import CreateEvent from '../event_create/CreateEvent';
import ConfirmationModal from "./ConfirmationModal";
import ParticipantList from "./ParticipantList";
import axios from "axios";
import EditOrganizator from "./EditOrganizator";


const OrganizerPage = () => {
 
  const [events, setEvents] = useState([]);
  
 
  const [selectedEvent, setSelectedEvent] = useState(null);
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
    <EventList events={events} token={token} setEvents={setEvents} fetchEvents={fetchEvents} isActive={2} selectedEvent={selectedEvent} setSelectedEvent={setSelectedEvent} setActiveItem={setActiveItem}  />
    ,
    3: <EventList events={events} token={token} setEvents={setEvents} fetchEvents={fetchEvents} isActive={3} />,
    4: <CreateEvent onEventCreated={handleEventCreated} />,
    8: <ParticipantList token={token} selectedEvent={ selectedEvent} />,
    9: <EditOrganizator />
  };
  console.log(selectedEvent);
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
        <button className="text-left p-3 text-sm text-gray-800 hover:bg-gray-100" onClick={() => setActiveItem(9) }>
        
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
        {activeItem && (
        <div key={`${activeItem}-${forceUpdate}`} className="flex-1 flex flex-col overflow-auto">
          {pageComponents[activeItem]}
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
