import React, { useState } from "react";
import "./form.css";

const Form = () => {
  const [formData, setFormData] = useState({
    name: "",
    surname: "",
    "mail-address": "",
    "phone-number": "",
    organization: "",
    title: "",
    website: "",
    city: "",
    answer: [],
    terms: false,
  });

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    if (type === "checkbox") {
      setFormData((prevData) => ({
        ...prevData,
        [name]: checked,
      }));
    } else if (type === "radio" || type === "checkbox") {
      setFormData((prevData) => ({
        ...prevData,
        [name]: prevData[name].includes(value)
          ? prevData[name].filter((item) => item !== value)
          : [...prevData[name], value],
      }));
    } else {
      setFormData((prevData) => ({
        ...prevData,
        [name]: value,
      }));
    }
  };

  const resetForm = () => {
    setFormData({
      name: "",
      surname: "",
      "mail-address": "",
      "phone-number": "",
      organization: "",
      title: "",
      website: "",
      city: "",
      answer: [],
      terms: false,
    });
  };

  const getFormValues = () => {
    console.log(formData);
  };

  return (
    <form className="form">
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
            value={formData.name}
            onChange={handleChange}
            required
            placeholder="İsim Giriniz"
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
            value={formData.surname}
            onChange={handleChange}
            required
            placeholder="Soyisim Giriniz"
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
            name="mail-address"
            value={formData["mail-address"]}
            onChange={handleChange}
            required
            placeholder="örnekmail@ticketup.net"
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
            name="phone-number"
            value={formData["phone-number"]}
            onChange={handleChange}
            required
            placeholder="05XXXXXXXX"
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
            value={formData.organization}
            onChange={handleChange}
            required
            placeholder="X Firması"
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
            value={formData.title}
            onChange={handleChange}
            required
            placeholder="Ünvan Giriniz"
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
            value={formData.website}
            onChange={handleChange}
            required
            placeholder="www.örneksite.com"
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
            value={formData.city}
            onChange={handleChange}
            required
            placeholder="Şehir Giriniz"
          />
        </div>
      </div>
      <div className="question-container">
        <p className="question">Daha önce e-ticaret & e-ihracat odaklı bir etkinliğe katıldınız mı?</p>
        <div className="answer-options">
          <label>
            <input
              type="checkbox"
              name="answer"
              value="yes"
              checked={formData.answer.includes("yes")}
              onChange={handleChange}
            />
            <span className="checkbox-text">Evet</span>
          </label>
          <label>
            <input
              type="checkbox"
              name="answer"
              value="no"
              checked={formData.answer.includes("no")}
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
        <button type="button" className="clear-button" onClick={resetForm}>
          TERCİHLERİ TEMİZLE
        </button>
        <button type="button" className="submit-button" onClick={getFormValues}>
          GÖNDER
        </button>
      </div>
    </form>
  );
};

export default Form;
