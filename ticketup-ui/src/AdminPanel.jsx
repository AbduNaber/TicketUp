
import React, { useState } from 'react';
import './AdminPanel.css';

const events = [
  { name: 'Event 1', date: '2024-11-30', organizer: 'Organizer A' },
  { name: 'Event 2', date: '2024-12-05', organizer: 'Organizer B' },
  { name: 'Event 3', date: '2024-12-15', organizer: 'Organizer C' },
];




const menuItems = [
    { id: 1, label: "KATILIMCILAR", icon: "../assets/icons/statistic-icon.svg"},
    { id: 2, label: "ETKİNLİKLER", icon: "../assets/icons/participant-icon.svg" },
    { id: 3, label: "İSTATİSTİK", icon: "../assets/icons/participant-icon.svg" },
];

const AdminPanel = () => {
    const [activeItem, setActiveItem] = useState(1);  
  return (
    <div className="AdminPanel">
      {/* Sidebar */}
      <div className="sidebar">
            <div className="logo-container">
                <img src="../assets/icons/ticketUp-logo.svg" alt="TicketUp Logo" className="logo" />
            </div>
            <ul className="menu">
            {menuItems.map((item) => (
                <li
                    key={item.id}
                    className={`menu-item ${item.id === activeItem ? "active" : ""}`}
                    onClick={() => setActiveItem(item.id)} // Set active on click
                >
                    <span className="menu-item-icon">
                        <img src={item.icon} alt={item.label} style={{ width: "20px", height: "20px" }} />
                    </span>
                    <span className="menu-item-label">{item.label}</span>
                    {item.id === activeItem && (
                        <span className="active-icon">
                            <img
                                src="../assets/icons/dashicons_arrow-right.svg"
                                alt="Active"
                                className="active-icon"
                            />
                        </span>
                    )}
                </li>
            ))}
            </ul>
           
        </div>
        
        <div className="top-bar">
          <button>Logout</button>
          <button>Profile</button>
        </div>     

      
      <div className="main-content">
        {/* Top Bar */}
       

        {/* Event List */}
        <div className="event-list">
          <h2>Event List</h2>
          <div className="event-list-header">
            <span className="event-name-header">Event Name</span>
            <span className="event-date-header">Date</span>
            <span className="event-organizer-header">Organizer</span>
            <span className="event-actions-header">Actions</span>
          </div>
          {events.map((event, index) => (
            <div key={index} className="event-item">
              <span className="event-name">{event.name}</span>
              <span className="event-date">{event.date}</span>
              <span className="event-organizer">{event.organizer}</span>
              <span className="event-actions">
                <button>View</button>
                <button>Edit</button>
                <button>Delete</button>
              </span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default AdminPanel;
