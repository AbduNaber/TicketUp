import React, { useState } from "react";

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
    <form className="text-gray-800 font-roboto p-4">
      {/* Name and Surname */}
      <div className="grid grid-cols-2 gap-4 mb-4">
        <div>
          <label htmlFor="name" className="block font-medium mb-1">
            İsim:
          </label>
          <input
            type="text"
            id="name"
            name="name"
            value={formData.name}
            onChange={handleChange}
            required
            placeholder="İsim Giriniz"
            className="w-full p-2 border border-gray-300 rounded"
          />
        </div>
        <div>
          <label htmlFor="surname" className="block font-medium mb-1">
            Soyisim:
          </label>
          <input
            type="text"
            id="surname"
            name="surname"
            value={formData.surname}
            onChange={handleChange}
            required
            placeholder="Soyisim Giriniz"
            className="w-full p-2 border border-gray-300 rounded"
          />
        </div>
      </div>

      {/* Email and Phone */}
      <div className="grid grid-cols-2 gap-4 mb-4">
        <div>
          <label htmlFor="mail-address" className="block font-medium mb-1">
            E-Posta:
          </label>
          <input
            type="email"
            id="mail-address"
            name="mail-address"
            value={formData["mail-address"]}
            onChange={handleChange}
            required
            placeholder="örnekmail@ticketup.net"
            className="w-full p-2 border border-gray-300 rounded"
          />
        </div>
        <div>
          <label htmlFor="phone-number" className="block font-medium mb-1">
            Telefon No:
          </label>
          <input
            type="tel"
            id="phone-number"
            name="phone-number"
            value={formData["phone-number"]}
            onChange={handleChange}
            required
            placeholder="05XXXXXXXX"
            className="w-full p-2 border border-gray-300 rounded"
          />
        </div>
      </div>

      {/* Organization and Title */}
      <div className="grid grid-cols-2 gap-4 mb-4">
        <div>
          <label htmlFor="organization" className="block font-medium mb-1">
            Firma:
          </label>
          <input
            type="text"
            id="organization"
            name="organization"
            value={formData.organization}
            onChange={handleChange}
            required
            placeholder="X Firması"
            className="w-full p-2 border border-gray-300 rounded"
          />
        </div>
        <div>
          <label htmlFor="title" className="block font-medium mb-1">
            Ünvan:
          </label>
          <input
            type="text"
            id="title"
            name="title"
            value={formData.title}
            onChange={handleChange}
            required
            placeholder="Ünvan Giriniz"
            className="w-full p-2 border border-gray-300 rounded"
          />
        </div>
      </div>

      {/* Website and City */}
      <div className="grid grid-cols-2 gap-4 mb-4">
        <div>
          <label htmlFor="website" className="block font-medium mb-1">
            Firma Websitesi:
          </label>
          <input
            type="url"
            id="website"
            name="website"
            value={formData.website}
            onChange={handleChange}
            required
            placeholder="www.örneksite.com"
            className="w-full p-2 border border-gray-300 rounded"
          />
        </div>
        <div>
          <label htmlFor="city" className="block font-medium mb-1">
            Hangi İlden Katılıyorsunuz:
          </label>
          <input
            type="text"
            id="city"
            name="city"
            value={formData.city}
            onChange={handleChange}
            required
            placeholder="Şehir Giriniz"
            className="w-full p-2 border border-gray-300 rounded"
          />
        </div>
      </div>

      {/* Question */}
      <div className="mb-4">
        <p className="font-medium mb-2">
          Daha önce e-ticaret & e-ihracat odaklı bir etkinliğe katıldınız mı?
        </p>
        <div className="space-x-4">
          <label className="inline-flex items-center">
            <input
              type="checkbox"
              name="answer"
              value="yes"
              checked={formData.answer.includes("yes")}
              onChange={handleChange}
              className="form-checkbox"
            />
            <span className="ml-2">Evet</span>
          </label>
          <label className="inline-flex items-center">
            <input
              type="checkbox"
              name="answer"
              value="no"
              checked={formData.answer.includes("no")}
              onChange={handleChange}
              className="form-checkbox"
            />
            <span className="ml-2">Hayır</span>
          </label>
        </div>
      </div>

      {/* Terms */}
      <div className="mb-4">
        <label className="inline-flex items-center">
          <input
            type="checkbox"
            name="terms"
            value="accepted"
            checked={formData.terms}
            onChange={handleChange}
            className="form-checkbox"
          />
          <span className="ml-2">
            6698 Sayılı KVKK uyarınca, gerçekleşecek olan etkinlikte, OTT / Canlı kayıt - yayın yapılmasına, katılımcı
            bilgilerimin ticari bilgi kapsamında Tekrom Teknoloji A.Ş. ve paydaşları ile paylaşılmasını kabul /
            beyan ederim. *
          </span>
        </label>
      </div>

      {/* Buttons */}
      <div className="flex justify-between">
        <button
          type="button"
          onClick={resetForm}
          className="bg-gray-500 text-white px-4 py-2 rounded hover:bg-gray-700"
        >
          TERCİHLERİ TEMİZLE
        </button>
        <button
          type="button"
          onClick={getFormValues}
          className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-700"
        >
          GÖNDER
        </button>
      </div>
    </form>
  );
};

export default Form;
