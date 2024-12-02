import React, { useState } from "react";
import "./AdminPanel.css";


const AdminPanel = () => {
    const [activeItem, setActiveItem] = useState(1);

    const menuItems = [
        { id: 1, label: "KATILIMCILAR", icon: "/assets/icons/statistic-icon.svg" },
        { id: 2, label: "ETKİNLİKLER", icon: "/assets/icons/participant-icon.svg" },
        { id: 3, label: "İSTATİSTİK", icon: "/assets/icons/participant-icon.svg" },

    ];


    const [events, setEvents] = useState([

      { name: "Event 2", date: "2024-12-05",  type: "Seminar" , status: "Active" , createdDate: "2024-11-01" ,isselected: false},
      { name: "Event 1", date: "2024-11-30",   type: "Seminar" , status: "Active" , createdDate: "2024-11-01" ,isselected: false},
        { name: "Event 3", date: "2024-12-15",  type: "Seminar" , status: "Active" , createdDate: "2024-11-01"  ,isselected: false},
        { name: "Event 3", date: "2024-12-15",  type: "Seminar" , status: "Active" , createdDate: "2024-11-01",isselected: false},
        { name: "Event 3", date: "2024-12-15",  type: "Seminar" , status: "Active" , createdDate: "2024-11-01",isselected: false},
        { name: "Event 3", date: "2024-12-15",  type: "Seminar" , status: "Active" , createdDate: "2024-11-01",isselected: false},
        { name: "Event 3", date: "2024-12-15",  type: "Seminar" , status: "Active" , createdDate: "2024-11-01",isselected: false},
        { name: "Event 3", date: "2024-12-15",  type: "Seminar" , status: "Active" , createdDate: "2024-11-01",isselected: false},
        { name: "Event 3", date: "2024-12-15",  type: "Seminar" , status: "Active" , createdDate: "2024-11-01",isselected: false},
        { name: "Event 3", date: "2024-12-15",  type: "Seminar" , status: "Active" , createdDate: "2024-11-01",isselected: false},
        { name: "Event 3", date: "2024-12-15",  type: "Seminar" , status: "Active" , createdDate: "2024-11-01",isselected: false},
        { name: "Event 3", date: "2024-12-15",  type: "Seminar" , status: "Active" , createdDate: "2024-11-01",isselected: false},
        { name: "Event 3", date: "2024-12-15",  type: "Seminar" , status: "Active" , createdDate: "2024-11-01",isselected: false},
        { name: "Event 3", date: "2024-12-15",  type: "Seminar" , status: "Active" , createdDate: "2024-11-01",isselected: false},
        { name: "Event 3", date: "2024-12-15",  type: "Seminar" , status: "Active" , createdDate: "2024-11-01",isselected: false},
        { name: "Event 3", date: "2024-12-15",  type: "Seminar" , status: "pasive" , createdDate: "2024-11-01",isselected: false},
        { name: "Event 3", date: "2024-12-15",  type: "Seminar" , status: "Active" , createdDate: "2024-11-01",isselected: false},
        { name: "Event 3", date: "2024-12-15",  type: "Seminar" , status: "Active" , createdDate: "2024-11-01",isselected: false},
        { name: "Event 3", date: "2024-12-15",  type: "Seminar" , status: "Active" , createdDate: "2024-11-01",isselected: false},
        { name: "Event 1", date: "2024-11-30",   type: "Seminar" , status: "Active" , createdDate: "2024-11-01",isselected: false},
        { name: "Event 2", date: "2024-12-05",  type: "Seminar" , status: "Active" , createdDate: "2024-11-01",isselected: false},
        { name: "Event 3", date: "2024-12-15",  type: "Seminar" , status: "Active" , createdDate: "2024-11-01",isselected: false},
        { name: "Event 3", date: "2024-12-15",  type: "Seminar" , status: "Active" , createdDate: "2024-11-01",isselected: false},
        { name: "Event 3", date: "2024-12-15",  type: "Seminar" , status: "Active" , createdDate: "2024-11-01",isselected: false},
        { name: "Event 3", date: "2024-12-15",  type: "Seminar" , status: "Active" , createdDate: "2024-11-01",isselected: false},
 
    ]);
    

   
      
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

            {/* Main Content */}
            <div className="main-content">
                {/* Top Bar */}
                <div className="top-bar">
                    <button>Logout</button>
                    <button>Profile</button>
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
                            <span className="event-date">{event.date}</span>
                            <span className="event-status">{event.status}</span>
                            <span className="event-created-date">{event.createdDate}</span>
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
        </div>
    );
};

export default AdminPanel;
