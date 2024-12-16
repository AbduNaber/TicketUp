import React, { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import axios from "axios";

const EventForm = () => {
  const location = useLocation();
  const eventID = location.state?.eventID;
  const imageLink = location.state?.imageLink;
  const navigate = useNavigate();

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

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const requestBody = {
        eventId: eventID,
        name: formData.name,
        surname: formData.surname,
        email: formData.mailAddress,
        phone: formData.phoneNumber,
        companyName: formData.organization,
        title: formData.title,
        companyUrl: formData.website,
        city: formData.city,
        isFirstTime: formData.terms,
      };

      await axios.post("http://46.101.166.170:8080/ticketup/participants/create", requestBody, {
        headers: {
          "Content-Type": "application/json",
        },
      });

      navigate("/ticket");
    } catch (error) {
      console.error(error);
    }
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
    <div className="flex flex-col items-center bg-gray-100 min-h-screen">
      <img className="my-5 h-[40vh] w-auto" src={imageLink} alt="Event" />
      <div className="flex flex-col items-center w-[50vw] bg-white shadow-md p-6 mb-[50vh]">
        <form className="flex flex-col w-[40vw]" onSubmit={handleSubmit}>
          <div className="grid grid-cols-2 gap-4 mb-6">
            <div>
              <label htmlFor="name" className="block font-medium mb-2">
                İsim:
              </label>
              <input
                type="text"
                id="name"
                name="name"
                required
                placeholder="İsim Giriniz"
                value={formData.name}
                onChange={handleChange}
                className="w-full p-2 border border-gray-300 rounded"
              />
            </div>
            <div>
              <label htmlFor="surname" className="block font-medium mb-2">
                Soyisim:
              </label>
              <input
                type="text"
                id="surname"
                name="surname"
                required
                placeholder="Soyisim Giriniz"
                value={formData.surname}
                onChange={handleChange}
                className="w-full p-2 border border-gray-300 rounded"
              />
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4 mb-6">
            <div>
              <label htmlFor="mail-address" className="block font-medium mb-2">
                E-Posta:
              </label>
              <input
                type="email"
                id="mail-address"
                name="mailAddress"
                required
                placeholder="örnekmail@ticketup.net"
                value={formData.mailAddress}
                onChange={handleChange}
                className="w-full p-2 border border-gray-300 rounded"
              />
            </div>
            <div>
              <label htmlFor="phone-number" className="block font-medium mb-2">
                Telefon No:
              </label>
              <input
                type="tel"
                id="phone-number"
                name="phoneNumber"
                required
                placeholder="05XXXXXXXX"
                value={formData.phoneNumber}
                onChange={handleChange}
                className="w-full p-2 border border-gray-300 rounded"
              />
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4 mb-6">
            <div>
              <label htmlFor="organization" className="block font-medium mb-2">
                Firma:
              </label>
              <input
                type="text"
                id="organization"
                name="organization"
                required
                placeholder="X Firması"
                value={formData.organization}
                onChange={handleChange}
                className="w-full p-2 border border-gray-300 rounded"
              />
            </div>
            <div>
              <label htmlFor="title" className="block font-medium mb-2">
                Ünvan:
              </label>
              <input
                type="text"
                id="title"
                name="title"
                required
                placeholder="Ünvan Giriniz"
                value={formData.title}
                onChange={handleChange}
                className="w-full p-2 border border-gray-300 rounded"
              />
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4 mb-6">
            <div>
              <label htmlFor="website" className="block font-medium mb-2">
                Firma Websitesi:
              </label>
              <input
                type="url"
                id="website"
                name="website"
                required
                placeholder="www.örneksite.com"
                value={formData.website}
                onChange={handleChange}
                className="w-full p-2 border border-gray-300 rounded"
              />
            </div>
            <div>
              <label htmlFor="city" className="block font-medium mb-2">
                Hangi İlden Katılıyorsunuz:
              </label>
              <input
                type="text"
                id="city"
                name="city"
                required
                placeholder="Şehir Giriniz"
                value={formData.city}
                onChange={handleChange}
                className="w-full p-2 border border-gray-300 rounded"
              />
            </div>
          </div>

          <div className="mb-6">
            <p className="font-medium mb-2">
              Daha önce e-ticaret & e-ihracat odaklı bir etkinliğe katıldınız mı?
            </p>
            <div className="flex gap-4">
              <label className="flex items-center gap-2">
                <input
                  type="radio"
                  name="answer"
                  value="yes"
                  checked={formData.answer === "yes"}
                  onChange={handleChange}
                  className="form-radio"
                />
                Evet
              </label>
              <label className="flex items-center gap-2">
                <input
                  type="radio"
                  name="answer"
                  value="no"
                  checked={formData.answer === "no"}
                  onChange={handleChange}
                  className="form-radio"
                />
                Hayır
              </label>
            </div>
          </div>

          <div className="flex items-center gap-4 mb-6">
            <input
              type="checkbox"
              name="terms"
              checked={formData.terms}
              onChange={handleChange}
              className="form-checkbox"
            />
            <span>
              6698 Sayılı KVKK uyarınca, gerçekleşecek olan etkinlikte bilgilerimin
              paylaşılmasını kabul ediyorum.
            </span>
          </div>

          <div className="flex justify-between">
            <button
              type="button"
              onClick={handleReset}
              className="px-4 py-2 bg-gray-300 rounded hover:bg-gray-400"
            >
              TERCİHLERİ TEMİZLE
            </button>
            <button
              type="submit"
              className="px-4 py-2 bg-green-500 text-white rounded hover:bg-green-600"
            >
              GÖNDER
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default EventForm;
