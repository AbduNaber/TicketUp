import React from 'react';
import './footer.css';
import '@fortawesome/fontawesome-free/css/all.min.css';


const Footer = () => {
  return (
    <footer className="footer">
        <div className='footer-left'>
        <p className="footer-left">© 2024 All Rights Reserved by TicketUp!</p>
        </div>
      <div className="footer-center">
        <img src="/src/assets/icons/ticketup_icon.png" alt="Logo" className="footer-logo" />
      </div>
      <ul className="footer-right">
        <li><a href="#"><i className="fab fa-facebook-f"></i></a></li>
        <li><a href="#"><i className="fab fa-twitter"></i></a></li>
        <li><a href="#"><i className="fab fa-instagram"></i></a></li>
        <li><a href="#"><i className="fab fa-linkedin-in"></i></a></li>
      </ul>
    </footer>
  );
};

export default Footer;
