import "./ticket_edit.css";
import "../ticket_page/ticket.css";
import GradientButton from "../../components/gradientButton/gradientButton";
import Footer from "../../components/footer/footer";
import Form from "../../components/form/form"; // Form componentini import ettik
import "../../components/event_top_bar/event_top_bar.css";

const TicketEdit = () => {
  return (
    <div className="ticket-wrapper">
      <div className="event-top-bar">
        <div className="event-top-bar-left">
          <a href="https://www.example.com">
            <img
              src="/src/assets/icons/ticketup_icon_full.png"
              alt="Logo"
              className="event-logo-image"
            />
          </a>
        </div>
        <div className="event-top-bar-center">
          <a href="#" className="clickable-text">
            Ana Sayfa
          </a>
          <a href="#" className="clickable-text">
            Neden Biz
          </a>
          <a href="#" className="clickable-text">
            Bizimle İletişime Geçin
          </a>
        </div>
        <div className="event-top-bar-right">
          <GradientButton text="Biletini Sorgula" onClick={() => { }} />
          <a href="https://www.example.com">
            <img
              src="/src/assets/icons/account.png"
              alt="Logo"
              className="logo-profile-events"
            />
          </a>
        </div>
      </div>
      <h2 className="ticket-title">Anadolu'dan Dünyaya (Denizli)</h2>
      <div className="t-form-container">
        <Form />
      </div>
      <Footer />
    </div>
  );
};

export default TicketEdit;
