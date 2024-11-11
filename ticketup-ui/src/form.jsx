import React, { useState } from "react";
import "./form.css";


const EventForm = () => {
  const [formData, setFormData] = useState({
    name: "",
    surname: "",
    mailAddress: "",
    phoneNumber: "",
    organization: "",
    title: "",
    website: "",
    city: "",
    answer: "",
    terms: false,
  });

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Form Data Submitted:", formData);
  };

  const handleReset = () => {
    setFormData({
      name: "",
      surname: "",
      mailAddress: "",
      phoneNumber: "",
      organization: "",
      title: "",
      website: "",
      city: "",
      answer: "",
      terms: false,
    });
    console.log("Form reset");
  };

  return (
    <div  className="form-wrapper">
      <img className="event-icon" src="/src/assets/images/form_bg.png" alt="Event" />
      <div className="form-container">
        <form className="form" onSubmit={handleSubmit}>
          <div className="form-input-container-row">
            <div className="form-input-container">
              <label htmlFor="name" className="form">
                İsim:
              </label>
              <input
                type="text"
                className="form"
                id="name"
                name="name"
                required
                placeholder="İsim Giriniz"
                value={formData.name}
                onChange={handleChange}
              />
            </div>
            <div className="form-input-container">
              <label htmlFor="surname" className="form">
                Soyisim:
              </label>
              <input
                type="text"
                className="form"
                id="surname"
                name="surname"
                required
                placeholder="Soyisim Giriniz"
                value={formData.surname}
                onChange={handleChange}
              />
            </div>
          </div>
          <div className="form-input-container-row">
            <div className="form-input-container">
              <label htmlFor="mail-address" className="form">
                E-Posta:
              </label>
              <input
                type="text"
                className="form"
                id="mail-address"
                name="mailAddress"
                required
                placeholder="örnekmail@ticketup.net"
                value={formData.mailAddress}
                onChange={handleChange}
              />
            </div>
            <div className="form-input-container">
              <label htmlFor="phone-number" className="form">
                Telefon No:
              </label>
              <input
                type="text"
                className="form"
                id="phone-number"
                name="phoneNumber"
                required
                placeholder="05XXXXXXXX"
                value={formData.phoneNumber}
                onChange={handleChange}
              />
            </div>
          </div>
          <div className="form-input-container-row">
            <div className="form-input-container">
              <label htmlFor="organization" className="form">
                Firma:
              </label>
              <input
                type="text"
                className="form"
                id="organization"
                name="organization"
                required
                placeholder="X Firması"
                value={formData.organization}
                onChange={handleChange}
              />
            </div>
            <div className="form-input-container">
              <label htmlFor="title" className="form">
                Ünvan:
              </label>
              <input
                type="text"
                className="form"
                id="title"
                name="title"
                required
                placeholder="Ünvan Giriniz"
                value={formData.title}
                onChange={handleChange}
              />
            </div>
          </div>
          <div className="form-input-container-row">
            <div className="form-input-container">
              <label htmlFor="website" className="form">
                Firma Websitesi:
              </label>
              <input
                type="text"
                className="form"
                id="website"
                name="website"
                required
                placeholder="www.örneksite.com"
                value={formData.website}
                onChange={handleChange}
              />
            </div>
            <div className="form-input-container">
              <label htmlFor="city" className="form">
                Hangi İlden Katılıyorsunuz:
              </label>
              <input
                type="text"
                className="form"
                id="city"
                name="city"
                required
                placeholder="Şehir Giriniz"
                value={formData.city}
                onChange={handleChange}
              />
            </div>
          </div>
          <div className="question-container">
            <p className="question">
              Daha önce e-ticaret & e-ihracat odaklı bir etkinliğe katıldınız mı?
            </p>
            <div className="answer-options">
              <label>
                <input
                  type="radio"
                  name="answer"
                  value="yes"
                  checked={formData.answer === "yes"}
                  onChange={handleChange}
                />
                <span className="checkbox-text">Evet</span>
              </label>
              <label>
                <input
                  type="radio"
                  name="answer"
                  value="no"
                  checked={formData.answer === "no"}
                  onChange={handleChange}
                />
                <span className="checkbox-text">Hayır</span>
              </label>
            </div>
          </div>
          <div className="checkbox-container">
            <input
              type="checkbox"
              name="terms"
              value="accepted"
              checked={formData.terms}
              onChange={handleChange}
            />
            <label className="custom-checkbox-label">
              6698 Sayılı KVKK uyarınca, gerçekleşecek olan etkinlikte, OTT / Canlı kayıt - yayın yapılmasına, katılımcı
              bilgilerimin ticari bilgi kapsamında Tekrom Teknoloji A.Ş. ve paydaşları ile paylaşılmasını kabul / beyan
              ederim. *
            </label>
          </div>
          <div className="submit-buttons">
            <button type="button" className="clear-button" onClick={handleReset}>
              TERCİHLERİ TEMİZLE
            </button>
            <button type="submit" className="submit-button">
              GÖNDER
            </button>
          </div>
        </form>
      </div>
      <div className="bottom-bar">
        <div className="copyright-text-form">© 2024 TicketUp. All rights reserved.</div>
        <img className="ticketup-icon" src="/src/assets/icons/ticketup_icon.png" alt="TicketUp Icon" />
        <div className="bottom-bar-icons">
          <img className="social-media-icon" src="/src/assets/icons/facebook_icon.png" alt="Facebook" />
          <img className="social-media-icon" src="/src/assets/icons/twitter_icon.png" alt="Twitter" />
          <img className="social-media-icon" src="/src/assets/icons/figma_icon.png" alt="Figma" />
          <img className="social-media-icon" src="/src/assets/icons/linkedin_icon.png" alt="LinkedIn" />
        </div>
      </div>
    </div>
  );
};

export default EventForm;
