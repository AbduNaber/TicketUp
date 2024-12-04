import React, { useEffect, useState } from "react";
import { ToastContainer, toast } from "react-toastify";
import { jwtDecode } from "jwt-decode";
import axios from "axios";
import "./AdminPanel.css";


const AdminPanel = () => {
    const [events, setEvents] = useState([]);
    const [popupVisible, setPopupVisible] = useState(false); 
    const [selectedEvent, setSelectedEvent] = useState(null);
    const [isDropdownVisible, setIsDropdownVisible] = useState(false);
    const token = sessionStorage.getItem('token');
    const parsedToken = token ? jwtDecode(token) : null;

    const handleView = (event) => {
        setSelectedEvent(event); // Set the selected event details
        setPopupVisible(true); // Show the popup
    };

    const closePopup = () => {
        setPopupVisible(false); // Hide the popup
        setSelectedEvent(null); // Clear selected event details
    };

    const toggleDropdown = () => {
        setIsDropdownVisible(!isDropdownVisible);
      };
    useEffect(() => {
        if(!token) {
            console.error('No token found. Redirecting to login.');
            window.location.href = '/login';
            return;
        }

        const fetchOrganizers = async () => {
            try {
                const response = await axios.get(`http://localhost:8080/ticketup/events/list-organizer-events/${parsedToken.id}`, {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                });
                setEvents(response.data);
                console.log('Events fetched')
            } catch(error) {
                console.error('Error fetching events:', error.response?.data || error.message);
                if(error.response?.status === 401) {
                    window.location.href = '/login';
                }
            }
        };

        fetchOrganizers();
    }, [token]);


    const [activeItem, setActiveItem] = useState(1);

    const menuItems = [
        { id: 1, label: "KATILIMCILAR", icon: "/assets/icons/statistic-icon.svg" },
        { id: 2, label: "ETKİNLİKLER", icon: "/assets/icons/participant-icon.svg" },
        { id: 3, label: "İSTATİSTİK", icon: "/assets/icons/participant-icon.svg" },

    ];

      
    const handleToggle = (clickedEvent) => {
      setEvents(events.map(event =>
        event === clickedEvent ? { ...event, isselected: !event.isselected } : event
      ));
    };

    const [isAllSelected, setIsAllSelected] = useState(false);
    const handleToggleAll = () => {
      if(isAllSelected){
      setEvents(events.map(event =>
        event.isselected === true ? { ...event, isselected: false } : event
      ));
    }
    else{
      setEvents(events.map(event =>
        event.isselected === false ? { ...event, isselected: true } : event
      ));
    }
    setIsAllSelected(!isAllSelected);
    }

    const handleDelete = async (eventId) => {
        const confirmDelete = window.confirm("Are you sure you want to delete this event ?");
        if(!confirmDelete) return;

        try{
            const response = await axios.delete(`http://localhost:8080/ticketup/events/delete/${eventId}` , {
                headers: {
                    Authorization: `Bearer ${token}` ,
                },
            });
            console.log(response.data);
            setEvents(events.filter(event => event.id !== eventId));
        } catch(error) {
            console.log("Error deleting event:", error.response?.data || error.message);
            if(error.response?.status === 401) {
                window.location.href = '/login';
            }
        }
    };

    
    
    const handleLogout = () => {
        
        sessionStorage.removeItem('token');
        window.location.href = '/login?loggedOut=true';
    }

    const formatDate = (dateString) => {
        const date = new Date(dateString);
        const day = date.getDate().toString().padStart(2, '0');
        const month = (date.getMonth() + 1).toString().padStart(2, '0'); 
        const year = date.getFullYear();
        return `${day}/${month}/${year}`;
    };
   

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
                                <img
                                    src={item.icon}
                                    alt={item.label}
                                    className="menu-item-img"
                                />
                            </span>
                            <span className="menu-item-label">{item.label}</span>
                            {item.id === activeItem && (
                                <span className="active-icon">
                                    <img
                                        src="/assets/icons/dashicons_arrow-right.svg"
                                        alt="Active"
                                        className="active-icon-img"
                                    />
                                </span>
                            )}
                        </li>
                    ))}
                </ul>
            </div>

            
            <div className="main-content">
               
                <div className="admin-top-bar">
                <div className="dropdown-container">
            <button onClick={toggleDropdown} className="dropdown-toggle">
              Organizator
            </button>
            {isDropdownVisible && (
              <div className="dropdown-menu column">
                
                <button>View Profile</button>
                <button onClick={handleLogout} >Logout</button>
              </div>
            )}
          </div>
        
                </div>

                {/* Event List */}
                <div className="event-list-container">
                    <h2>Event List</h2>
                    <div className="event-list-header">
                      <img 
                      onClick={() => handleToggleAll()}
                      src={isAllSelected ? '/src/assets/icons/selected-checkbox.svg' : '/src/assets/icons/checkbox.svg'} 
                      alt="Checkbox" 
                      style={{
                        display: 'inline-block',
                        width: '24px', 
                        height: '24px',
                        cursor: 'pointer',
                      }}
                        />

                        <span className="event-name-header">Event Name</span>
                        <span className="event-type-header">Event Type</span>
                        <span className="event-date-header">Date</span>
                        <span className="event-status-header">Status</span>
                        <span className="event-created-date-header"> Created Date</span>
                        <span className="event-actions-header">Actions</span>
                    </div>
                    <div className="event-list">
                    {events.map((event, index) => (
                        <div key={index} className="event-item">
                            <img 
                      onClick={() => handleToggle(event)}
                      src={event.isselected ? '/src/assets/icons/selected-checkbox.svg' : '/src/assets/icons/checkbox.svg'} 
                      alt="Checkbox" 
                      style={{
                        display: 'inline-block',
                        width: '24px', 
                        height: '24px',
                        cursor: 'pointer',
                      }}
                        />
                            <span className="event-name">{event.name}</span>
                            <span className="event-type">{event.type}</span>
                            <span className="event-date">{formatDate(event.eventDate)}</span>
                            <span className="event-status">{event.status}</span>
                            <span className="event-created-date">{formatDate(event.createdDate)}</span>
                            <span className="event-actions">
                                <button onClick={() => handleView(event)}>View</button>
                                <button>Edit</button>
                                <button onClick={() => handleDelete(event.id)}>Delete</button>
                            </span>
                        </div>
                    ))}
                    </div>
                </div>

                {popupVisible && selectedEvent && (
                    <div className="popup-overlay">
                        <div className="popup-content">
                            <h3>Event Details</h3>
                            {selectedEvent ? (
                                <>
                                    <p><strong>Name:</strong> {selectedEvent.name}</p>
                                    <p><strong>Type:</strong> {selectedEvent.type}</p>
                                    <p><strong>Date:</strong> {formatDate(selectedEvent.eventDate)}</p>
                                    <p><strong>Status:</strong> {selectedEvent.status}</p>
                                    <p><strong>Created Date:</strong> {formatDate(selectedEvent.createdDate)}</p>
                                </>
                                ) : (
                                <p>Loading event details...</p>
                            )}
                            <button onClick={closePopup}>Close</button>
                        </div>
                    </div>
                )}
            </div>
            <ToastContainer />
        </div>
    );
};

export default AdminPanel;
