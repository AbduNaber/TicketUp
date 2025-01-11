import React, { useEffect, useState } from "react";
import { ToastContainer } from "react-toastify";
import { jwtDecode } from "jwt-decode";
import EventList from "./EventList";
import CreateEvent from '../event_create/CreateEvent';
import ConfirmationModal from "./ConfirmationModal";
import ParticipantList from "./ParticipantList";
import EditOrganizator from "./EditOrganizator";
import OrganizerMessage from "./OrganiserMessage";
import SecurityPage from "./SecurityPage";
import { CalendarX, Calendar , Users, PlusCircle, FileText, Settings, MessageCircle, LogOut, ChevronDown, Menu , Mail} from "lucide-react";
import axios from "axios";
import EventPreview from "../event_create/EventPreview";

const OrganizerPage = () => {
  const [events, setEvents] = useState([]);
  const [selectedEvent, setSelectedEvent] = useState(null);
  const [forceUpdate, setForceUpdate] = useState(false);
  const [isDropdownVisible, setIsDropdownVisible] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const token = sessionStorage.getItem("token");
  const parsedToken = token ? jwtDecode(token) : null;
  const [isLocked, setIsLocked] = useState(false);
  const [showConfirmation, setShowConfirmation] = useState(false);
  const [activeItem, setActiveItem] = useState(2);
  const [nextMenuItem, setNextMenuItem] = useState(null);

  const menuItems = [
    { id: 2, label: "Aktif Etkinlikler", icon: <Calendar className="w-5 h-5" /> },
    { id: 3, label: "Kapanmış Etkinlikler", icon: <CalendarX className="w-5 h-5" /> },
    { id: 4, label: "Etkinlik Oluştur", icon: <PlusCircle className="w-5 h-5" /> },
    { id: 5, label: "Organizator Mesajları", icon: <Mail className="w-5 h-5" />},
    { id: 6, label: "Güvenlik İşlemleri", icon: <Settings className="w-5 h-5" /> },
    { id: 7, label: "TicketUp'a Ulaş", icon: <MessageCircle className="w-5 h-5" /> }
  ];

  const handleEventCreated = () => {
    setActiveItem(2);
    fetchEvents();
  };

  const toggleDropdown = () => {
    setIsDropdownVisible(!isDropdownVisible);
  };

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  useEffect(() => {
    if (!token) {
      window.location.href = "/login";
      return;
    }

    if (!parsedToken || !parsedToken.id) {
      window.location.href = "/login";
      return;
    }

    fetchEvents();
  }, [token]);

  const handleMenuClick = (item) => {
    if (isLocked && item.id !== 4) {
      setNextMenuItem(item.id);
      setShowConfirmation(true);
      return;
    }

    if (item.id === 4) {
      setIsLocked(true);
    }

    setActiveItem(item.id);
    setForceUpdate((prev) => !prev);
    setIsMobileMenuOpen(false);
  };

  const handleConfirmLeave = () => {
    setShowConfirmation(false);
    setIsLocked(false);
    setActiveItem(nextMenuItem);
    setForceUpdate((prev) => !prev);
  };

  const handleCancelLeave = () => {
    setShowConfirmation(false);
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
      console.log(response.data);
    } catch (error) {
      console.error("Error fetching events:", error.response?.data || error.message);
      if (error.response?.status === 401) {
        window.location.href = "/login";
      }
    }
  };

  const pageComponents = {
    2: <EventList events={events} token={token} setEvents={setEvents} fetchEvents={fetchEvents} isActive={2} selectedEvent={selectedEvent} setSelectedEvent={setSelectedEvent} setActiveItem={setActiveItem} />,
    3: <EventList events={events} token={token} setEvents={setEvents} fetchEvents={fetchEvents} isActive={3} />,
    4: <CreateEvent onEventCreated={handleEventCreated}  setActiveItem={setActiveItem} />,
    5: <OrganizerMessage token={token} />,
    8: <ParticipantList token={token} selectedEvent={selectedEvent} />,
    9: <EditOrganizator setActiveItem={setActiveItem} />,
    10: <EventPreview event1={selectedEvent}  setActiveItem={setActiveItem}/>  ,
    6: <SecurityPage />,
  
  };

  return (
    <div className="flex h-screen bg-gray-50">
      {/* Mobile Menu Button */}
      <button
        className="lg:hidden fixed top-4 left-4 z-50 p-2 bg-white rounded-lg shadow-md"
        onClick={toggleMobileMenu}
      >
        <Menu className="w-6 h-6 text-gray-600" />
      </button>

      {/* Sidebar */}
      <div className={`fixed lg:static inset-y-0 left-0 transform ${isMobileMenuOpen ? 'translate-x-0' : '-translate-x-full'} lg:translate-x-0 transition-transform duration-200 ease-in-out w-64 bg-white shadow-lg lg:shadow-none z-40`}>
        <div className="flex flex-col h-full">
          <div className="p-6">
            <img
              src="/src/assets/icons/ticketUp-logo.svg"
              alt="TicketUp Logo"
              className="w-32 h-auto mx-auto"
            />
          </div>

          <nav className="flex-1 px-4 pb-4">
            {menuItems.map((item) => (
              <button
                key={item.id}
                onClick={() => handleMenuClick(item)}
                className={`w-full flex items-center space-x-3 px-4 py-3 mb-2 rounded-lg transition-colors ${
                  activeItem === item.id
                    ? 'bg-blue-50 text-blue-600'
                    : 'text-gray-600 hover:bg-gray-50'
                }`}
              >
                {item.icon}
                <span className="text-sm font-medium">{item.label}</span>
              </button>
            ))}
          </nav>

          <div className="p-4 border-t">
            <button
              onClick={handleLogout}
              className="w-full flex items-center space-x-3 px-4 py-3 text-red-600 hover:bg-red-50 rounded-lg transition-colors"
            >
              <LogOut className="w-5 h-5" />
              <span className="text-sm font-medium">Çıkış Yap</span>
            </button>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="flex-1 flex flex-col min-h-screen overflow-hidden">
        {/* Top Navigation Bar */}
        <header className="bg-white shadow-sm">
          <div className="h-16 px-4 flex items-center justify-between">
            <h1 className="text-xl font-semibold text-gray-800">
              {menuItems.find(item => item.id === activeItem)?.label}
            </h1>

            <div className="relative">
              <button
                onClick={toggleDropdown}
                className="flex items-center space-x-2 text-gray-700 hover:text-gray-900"
              >
                <div className="w-8 h-8 rounded-full bg-blue-100 flex items-center justify-center">
                  <span className="text-sm font-medium text-blue-600">
                    {parsedToken?.name?.[0] || 'O'}
                  </span>
                </div>
                <span className="text-sm font-medium hidden sm:block">Organizatör</span>
                <ChevronDown className="w-4 h-4" />
              </button>

              {isDropdownVisible && (
                <div className="absolute right-0 mt-2 w-48 bg-white rounded-lg shadow-lg py-1 z-50">
                  <button
                    onClick={() => {
                      setActiveItem(9);
                      setIsDropdownVisible(false);
                    }}
                    className="w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-50"
                  >
                    Profili Görüntüle
                  </button>
                  <button
                    onClick={handleLogout}
                    className="w-full text-left px-4 py-2 text-sm text-red-600 hover:bg-red-50"
                  >
                    Çıkış Yap!
                  </button>
                </div>
              )}
            </div>
          </div>
        </header>

        {/* Main Content Area */}
        <main className="flex-1 overflow-auto bg-gray-50 p-6">
          {activeItem && (
            <div key={`${activeItem}-${forceUpdate}`} className="h-full">
              {pageComponents[activeItem]}
            </div>
          )}
        </main>
      </div>

      <ToastContainer />
      <ConfirmationModal
        isOpen={showConfirmation}
        onConfirm={handleConfirmLeave}
        onCancel={handleCancelLeave}
        message="Etkinliği oluşturmadın. Çıkmak istediğine emin misin?"
      />
    </div>
  );
};

export default OrganizerPage;