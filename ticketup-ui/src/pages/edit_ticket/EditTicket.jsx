import GradientButton from "../../components/GradientButton"; 
import Footer from "../../components/Footer";
import Form from "../../components/Form";

const TicketEdit = () => {
  return (
    <div className="flex flex-col min-h-screen bg-white overflow-y-auto">
      {/* Top Bar */}
      <div className="flex justify-between items-center px-5 py-2 bg-gray-800 text-white h-[10vh]">
        <div className="flex-1">
          <a href="https://www.example.com">
            <img src="/src/assets/icons/ticketup_icon_full.png" alt="Logo" className="w-52" />
          </a>
        </div>
        <div className="flex justify-center items-center gap-12">
          <a href="#" className="text-sm hover:underline">Ana Sayfa</a>
          <a href="#" className="text-sm hover:underline">Neden Biz</a>
          <a href="#" className="text-sm hover:underline">Bizimle İletişime Geçin</a>
        </div>
        <div className="flex items-center gap-4 flex-1 justify-end">
          <GradientButton text="Biletini Sorgula" onClick={() => {}} />
          <a href="https://www.example.com">
            <img src="/src/assets/icons/account.png" alt="Profile" className="w-10 h-10 rounded-full" />
          </a>
        </div>
      </div>

      {/* Title */}
      <h2 className="text-4xl text-black font-bold text-center mt-8">
        Anadolu'dan Dünyaya (Denizli)
      </h2>

      {/* Form Container */}
      <div className="flex justify-center items-center w-full max-w-3xl p-5 mx-auto">
        <Form />
      </div>

      <Footer />
    </div>
  );
};

export default TicketEdit;
