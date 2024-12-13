import React from 'react';

const Footer = () => {
  return (
    <footer className="flex justify-between items-center bg-gray-900 text-white px-5 py-2 h-[4vw] fixed bottom-0 w-full z-50">
      {/* Left Section */}
      <div className="flex items-center">
        <p className="text-sm">© 2024 All Rights Reserved by TicketUp!</p>
      </div>
      
      {/* Center Section */}
      <div className="text-center">
        <img
          src="/src/assets/icons/ticketup_icon.png"
          alt="Logo"
          className="h-11"
        />
      </div>
      
      {/* Right Section */}
      <ul className="flex gap-4 text-lg">
        <li>
          <a href="#" className="hover:text-yellow-400">
            <i className="fab fa-facebook-f"></i>
          </a>
        </li>
        <li>
          <a href="#" className="hover:text-yellow-400">
            <i className="fab fa-twitter"></i>
          </a>
        </li>
        <li>
          <a href="#" className="hover:text-yellow-400">
            <i className="fab fa-instagram"></i>
          </a>
        </li>
        <li>
          <a href="#" className="hover:text-yellow-400">
            <i className="fab fa-linkedin-in"></i>
          </a>
        </li>
      </ul>
    </footer>
  );
};

export default Footer;
