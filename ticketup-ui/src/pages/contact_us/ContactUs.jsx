import Footer from "../../components/Footer";
import GradientButton from "../../components/GradientButton";
import TopBar from "../../components/TopBar";

const ContactUs = () => {
  return (
    <div className="flex flex-col min-h-screen bg-white">
      {/* Top Bar */}
      <TopBar></TopBar>
      {/* Placeholder Image with Text */}
      <div className="relative w-full h-[400px]">
        <img
          src="/src/assets/images/contact_us.png"
          alt="Placeholder"
          className="w-full h-full object-cover"
        />
        <div className="absolute bottom-4 left-4 text-black text-4xl font-bold">
          Bizimle İletişime Geçin
        </div>
      </div>

      {/* Form Container */}
      <div className="container mx-auto mt-8 mb-20 p-6">
        <div className="flex flex-wrap">
          {/* Left Side */}
          <div className="w-full md:w-1/2 p-4">
            <input
              type="text"
              placeholder="İsim"
              className="w-full mb-9 p-3 border border-gray-300 rounded-md"
            />
            <input
              type="email"
              placeholder="Soyisim"
              className="w-full mb-9 p-3 border border-gray-300 rounded-md"
            />
            <input
              type="tel"
              placeholder="E-posta veya Telefon Numarası"
              className="w-full mb-4 p-3 border border-gray-300 rounded-md"
            />
          </div>

          {/* Right Side */}
          <div className="w-full md:w-1/2 p-4">
            <textarea
              placeholder="Mesajınız"
              className="w-full h-[220px] p-3 border border-gray-300 rounded-md resize-none"
            ></textarea>
          </div>
        </div>
        <div className="flex justify-end mt-6">
          <GradientButton text="Gönder" onClick={() => alert("Mesajınız gönderildi!")} />
        </div>
      </div>

      {/* New Container */}
      <div className="container mx-auto p-6 mb-20">
        <div className="flex flex-wrap">
          {/* Left Side */}
          <div className="w-full md:w-1/2 p-4 flex flex-col items-center justify-center text-center">
            <h2 className="text-xl font-bold mb-2">ADRESİMİZ</h2>
            <p className="text-gray-600">ESENTEPE MAH. ECZA SOK.</p>
            <p className="text-gray-600">NO:4/1 ŞİŞLİ, İSTANBUL</p>
            <div className="my-4"></div>
            <h2 className="text-xl font-bold mb-2">TELEFON</h2>
            <p className="text-gray-600">+90 850 307 1245</p>
          </div>

          {/* Right Side */}
          <div className="w-full md:w-1/2 p-4 flex items-center justify-center">
            <img
              src="https://via.placeholder.com/400x300"
              alt="Placeholder"
              className="w-full max-w-md rounded-md"
            />
          </div>
        </div>
      </div>

      <Footer />
    </div>
  );
};

export default ContactUs;