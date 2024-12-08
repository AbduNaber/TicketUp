import React from "react";
import { QRCodeCanvas } from "qrcode.react"; // QR kod kütüphanesini ekledik
import "./ticket.css";
import GradientButton from "./components/gradientButton/gradientButton";
import Footer from "./components/footer/footer";
import "./components/event_top_bar/event_top_bar.css";
import EmptyBox from "./components/empty_box/empty_box";

const Ticket = () => {
  return (
    <div className="ticket-wrapper">
      <div className="event-top-bar">
        <div className="event-top-bar-left">
          <a href="https://www.example.com">
            <img src="/src/assets/icons/ticketup_icon_full.png" alt="Logo" className="event-logo-image" />
          </a>
        </div>
        <div className="event-top-bar-center">
          <a href="#" className="clickable-text">Ana Sayfa</a>
          <a href="#" className="clickable-text">Neden Biz</a>
          <a href="#" className="clickable-text">Bizimle İletişime Geçin</a>
        </div>
        <div className="event-top-bar-right">
          <GradientButton text="Biletini Sorgula" onClick={() => { }} />
          <a href="https://www.example.com">
            <img src="/src/assets/icons/account.png" alt="Logo" className="logo-profile-events" />
          </a>
        </div>
      </div>
      <h2 className="ticket-title">Anadolu'dan Dünyaya (Denizli)</h2>
      <div className="qr-container">
        <div className="buttons-container">
          <EmptyBox width="180px" height="40px" />
          <EmptyBox width="180px" height="40px" />
        </div>
        <QRCodeCanvas
          value="https://www.youtube.com" // QR kodun değeri
          size={200} // QR kod boyutu
          bgColor="#ffffff" // Arka plan rengi
          fgColor="#000000" // QR kodun rengi
        />
        <div className="buttons-container">
          <GradientButton text="Bileti Düzenle" onClick={() => { }} />
          <GradientButton text="Bileti Sil" onClick={() => { }} />
        </div>
      </div>
      <div className="ticket-container">
        <a class="header-text">Etkinlik Bilgileri</a>
        <a class="header-bold">T-Soft ile Anadolu'dan Dünya'ya</a>
        <div class="info-box">
          <div class="info-textbox">
            <a class="info-text-top">TARİH</a>
            <a class="info-text-bottom">4.11.2024</a>
          </div>
          <div class="info-textbox">
            <a class="info-text-top">SAAT</a>
            <a class="info-text-bottom">17.00</a>
          </div>
          <div class="info-textbox">
            <a class="info-text-top">KONUM</a>
            <a class="info-text-bottom">Tüyap Etkinlik Fuarı
              İstanbul</a>
          </div>
        </div>
        <a class="header-text">Katılımcı Bilgileri</a>
        <div class="info-box">
          <div class="info-textbox">
            <a class="info-text-top">Ad-Soyad</a>
            <a class="info-text-bottom">Sinan Eryiğit</a>
          </div>
          <div class="info-textbox">
            <a class="info-text-top">Ünvan</a>
            <a class="info-text-bottom">Organizatör</a>
          </div>
          <div class="info-textbox">
            <a class="info-text-top">Katılınılan İl</a>
            <a class="info-text-bottom">İstanbul</a>
          </div>
        </div>
        <a class="info-text-top-z" >KATILIMCI ID</a>
        <a class="info-text-bottom-z" >1f479181-d0ce-43d8-9742-48c26530c865</a>
        <a class="header-text">Bilmeniz Gerekenler</a>
        <a class="about">Etkinlik girişinde <strong>karekodunuzu</strong> gösterek giriş yapabilirsiniz.
          Etkinlik biletiniz ayrıca mail adresinize ve SMS olarak gönderilecektir.
          Organizator ile iletişim için : info@upista.com</a>
      </div>
      <Footer />
    </div>
  );
};

export default Ticket;
