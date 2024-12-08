import "./event.css";
import GradientButton from "../../components/gradientButton/gradientButton";
import Footer from "../../components/footer/footer";
import "../../components/event_top_bar/event_top_bar.css";

const Event = () => {
  return (
    <div className="event-wrapper">
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
      <div className="content-container">
        <div className="image-container">
          <img className="event-image" src="/src/assets/images/event_page_event.jpg" alt="Event" />
        </div>
        <div className="event-header">
          <h2 className="event-title">Anadolu'dan Dünyaya</h2>
          <GradientButton text="Katılım Formu" onClick={() => { }} />
        </div>
        <div className="event-details-container">
          <h1 className="event-subtitle">Etkinlik Açıklaması</h1>
          <p className="event-description">
            İlkini Bursa'da gerçekleştirdiğimiz, ikincisini ise 19 Aralık Perşembe günü DENİZLİ
            Ticaret Odası'nda gerçekleştireceğimiz ve Denizli'nin üretici & toptancı & e-ticaret
            profesyonelleri ile e-ihracat'ın olmazsa olmaz sektörlerinden firmaları bir araya getireceğimiz
            etkinliğe kayıt ve etkinlik günü giriş bilgilerini e-posta ve telefonunuza SMS olarak almak için
            lütfen bu formu eksiksiz doldurun
          </p>
          <p className="event-description">
            KATILIMCILAR VE FİRMALAR ETKİNLİK AÇIKLAMASI KISMINDA VERİLECEK. ZATEN ETKİNLİKLERE
            100DEN FAZLA KATILIMCI GELİYOR ONLARI GÖSTEREMEYİZ BAHSEDEBİLECEĞİMİZ TEK KATILIMCI
            FİRMALARIN KONUŞMACI OLARAK GÖNDERDİKLERİ OLMALI. BU YÜZDEN KATILIMCILAR VE FİRMALARO
            BURADA GÖSTERMELİYİZ.
          </p>
        </div>
        <div className="properties-container">
          <div className="properties-left">
            <div className="property-section">
              <h3 className="property-title">Tarih ve Saat</h3>
              <p>19 Aralık 2024</p>
              <p>19:00</p>
              <a href="#" className="add-to-calendar">+ Takvime Ekle</a>
            </div>

            <div className="property-section">
              <h3 className="property-title">Organizatör</h3>
              <div className="organizer-info">
                <img src="/src/assets/icons/tsoft-icon.png" alt="Organizer Icon" className="organizer-image" />
                <div className="organizer-details">
                  <p>T-Soft</p>
                  <a href="#" className="button-white-border">İletişime Geç</a>
                </div>
              </div>
            </div>
            <div className="property-section">
              <div className="upista-container">
                <img src="/src/assets/icons/upista_icon.png" className="upista-icon" />
                <p className="upista-subtitle">Upista Gururla Sunar</p>
              </div>
            </div>
          </div>
          <div className="properties-right">
            <div className="property-section">
              <h3 className="property-title">Konum</h3>
              <p className="location-description">Denizli Ticaret Odası</p>
              <div className="location-image-container">
              </div>
            </div>
          </div>
        </div>
      </div>
      <Footer></Footer>
    </div>
  );
};

export default Event;
