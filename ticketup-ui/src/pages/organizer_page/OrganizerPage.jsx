import React, { useEffect, useState } from "react";
import { ToastContainer } from "react-toastify";
import { jwtDecode } from "jwt-decode";
import axios from "axios";
import "./OrganizerPage.css";
import GradientButton from "../../components/gradientButton/gradientButton";
import { useNavigate } from "react-router-dom";

const OrganizerPage = () => {
  const [events, setEvents] = useState([]);
  const [filteredEvents, setFilteredEvents] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [popupVisible, setPopupVisible] = useState(false);
  const [selectedEvent, setSelectedEvent] = useState(null);
  const [isDropdownVisible, setIsDropdownVisible] = useState(false);
  const navigate = useNavigate();

  const token = sessionStorage.getItem("token");
  const parsedToken = token ? jwtDecode(token) : null;

  const [activeItem, setActiveItem] = useState(2); // Default to "ETKİNLİKLER"
  const [isAllSelected, setIsAllSelected] = useState(false);

  const menuItems = [
    { id: 1, label: "KATILIMCILAR", icon: "/assets/icons/statistic-icon.svg" },
    { id: 2, label: "AKTİF ETKİNLİKLER", icon: "/assets/icons/participant-icon.svg" },
    { id: 3, label: "KAPANMIŞ ETKİNLİKLER", icon: "/assets/icons/participant-icon.svg" },
    { id: 4, label: "ETKİNLİK OLUŞTUR", icon: "/assets/icons/participant-icon.svg" },
    { id: 5, label: "LOG KAYITLARI", icon: "/assets/icons/participant-icon.svg" },
    { id: 6, label: "ORGANIZATOR İŞLEMLERİ", icon: "/assets/icons/participant-icon.svg" },
    { id: 7, label: "TicketUp'a Ulaş", icon: "/assets/icons/participant-icon.svg" }

  ];

  const handleView = (event) => {
    setSelectedEvent(event);
    setPopupVisible(true);
  };

  const closePopup = () => {
    setPopupVisible(false);
    setSelectedEvent(null);
  };

  const goToEventPage = () => {
    if (selectedEvent) {
      window.location.href = `/event/${selectedEvent.id}`;
    }
  };

  const goToParticipantList = () => {
    if (selectedEvent) {
      window.location.href = `/event/${selectedEvent.id}/participants`;
    }
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
   
    const fetchOrganizers = async () => {
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
        setFilteredEvents(response.data);
      } catch (error) {
        console.error(
          "Error fetching events:",
          error.response?.data || error.message
        );
        if (error.response?.status === 401) {
          console.error("Unauthorized. Redirecting to login.");
          window.location.href = "/login";
        }
      }
    };

    fetchOrganizers();
  }, [token]); // Only run when `token` changes

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
    const confirmDelete = window.confirm(
      "Are you sure you want to delete this event?"
    );
    if (!confirmDelete) return;

    try {
      await axios.delete(
        `http://localhost:8080/ticketup/events/delete/${eventId}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      setEvents((prev) => prev.filter((event) => event.id !== eventId));
      setFilteredEvents((prev) => prev.filter((event) => event.id !== eventId));
    } catch (error) {
      console.error("Error deleting event:", error.response?.data || error.message);
      if (error.response?.status === 401) {
        window.location.href = "/login";
      }
    }
  };

  const handleLogout = () => {
    sessionStorage.removeItem("token");
    window.location.href = "/login?loggedOut=true";
  };

  const handleCreateEvent = () => {
    navigate("/event/create");
  }

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    const day = date.getDate().toString().padStart(2, "0");
    const month = (date.getMonth() + 1).toString().padStart(2, "0");
    const year = date.getFullYear();
    return `${day}/${month}/${year}`;
  };

  useEffect(() => {
    const filtered = events.filter((event) =>
      event.name.toLowerCase().includes(searchTerm.toLowerCase())
    );
    setFilteredEvents(filtered);
  }, [searchTerm, events]);

  return (
    <div className="AdminPanel">
      {/* Sidebar */}
      <div className="sidebar">
        <div className="logo-container">
          <img
            src="/assets/icons/ticketUp-logo.svg"
            alt="TicketUp Logo"
            className="logo"
          />
        </div>
        <ul className="menu">
          {menuItems.map((item) => (
            <li
              key={item.id}
              className={`menu-item ${item.id === activeItem ? "active" : ""}`}
              onClick={() => setActiveItem(item.id)}
            >
              <span className="menu-item-icon">
                <img src={item.icon} alt={item.label} />
              </span>
              <span className="menu-item-label">{item.label}</span>
              {item.id === activeItem && (
                <span className="active-icon">
                  <img
                    src="/assets/icons/dashicons_arrow-right.svg"
                    alt="Active"
                  />
                </span>
              )}
            </li>
          ))}
        </ul>
      </div>

      <div className="main-content">
        {/* Top Navigation Bar */}
        <div className="top-bar">
          <input
            type="text"
            placeholder="Search events..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="search-input"
          />
          <div className="user-menu">
            <button onClick={toggleDropdown} className="user-button">
              Organizator
            </button>
            {isDropdownVisible && (
              <div className="dropdown-menu column">
                <button>View Profile</button>
                <button onClick={handleLogout}>Logout</button>
              </div>
            )}
          </div>
        </div>

        {/* Event List */}
        <div className="event-list-container">
          <h2>Event List</h2>
          <div className="event-list-header">
            <img
              onClick={handleToggleAll}
              src={
                isAllSelected
                  ? "/src/assets/icons/selected-checkbox.svg"
                  : "/src/assets/icons/checkbox.svg"
              }
              alt="Checkbox"
              className="checkbox-icon"
            />
            <span>Event Name</span>
            <span>Event Type</span>
            <span>Date</span>
            <span>Status</span>
            <span>Created Date</span>
            <span>Quick Actions</span>
          </div>

          <div className="event-list">
            {filteredEvents.map((event, index) => (
              <div key={index} className="event-item">
                <img
                  onClick={() => handleToggle(event)}
                  src={
                    event.isselected
                      ? "/src/assets/icons/selected-checkbox.svg"
                      : "/src/assets/icons/checkbox.svg"
                  }
                  alt="Checkbox"
                  className="checkbox-icon"
                />
                <span className="truncate">{event.name}</span>
                <span className="truncate">{event.type}</span>
                <span>{formatDate(event.eventDate)}</span>
                <span>{event.status}</span>
                <span>{formatDate(event.createdDate)}</span>
                <div className="event-actions">
                  <button className="view-btn" onClick={() => handleView(event)}>
                    View
                  </button>
                  <button className="edit-btn">Edit</button>
                  <button className="delete-btn" onClick={() => handleDelete(event.id)}>
                    Delete
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>

        {popupVisible && selectedEvent && (
          <div className="popup-overlay">
            <div className="popup-content">
              <button className="close-button" onClick={closePopup}>
                &times;
              </button>
              <h3>Event Details</h3>
              {selectedEvent ? (
                <>
                  <p>
                    <strong>Name: </strong> {selectedEvent.name}
                  </p>
                  <p>
                    <strong>Type: </strong> {selectedEvent.type}
                  </p>
                  <p>
                    <strong>Date: </strong> {formatDate(selectedEvent.eventDate)}
                  </p>
                  <p>
                    <strong>Status: </strong> {selectedEvent.status}
                  </p>
                  <p>
                    <strong>Created Date: </strong>{" "}
                    {formatDate(selectedEvent.createdDate)}
                  </p>
                  <p>
                    <strong>Event Link: </strong> 
                    <a 
                      href={`http://localhost:3000/event/${selectedEvent.id}`}
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      http://localhost:3000/event/{selectedEvent.id}
                    </a>
                  </p>
                </>
              ) : (
                <p>Loading event details...</p>
              )}
              <div className="button-container">
                <button className="primary-button" onClick={goToEventPage}>
                  Event Page
                </button>
                <button className="secondary-button" onClick={goToParticipantList}>
                  Participants
                </button>
              </div>
            </div>
          </div>
        )}
        <GradientButton text="Create" onClick={handleCreateEvent}></GradientButton>
      </div>
      <ToastContainer />
    </div>
  );
};

export default OrganizerPage;