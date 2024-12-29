import GradientButton from "../../components/GradientButton";
import Footer from "../../components/Footer";

const TicketQuery = () => {
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
          <GradientButton text="Biletini Sorgula" onClick={() => { }} />
          <a href="https://www.example.com">
            <img src="/src/assets/icons/account.png" alt="Profile" className="w-10 h-10 rounded-full" />
          </a>
        </div>
      </div>

      {/* Content Section */}
      <div className="flex flex-col px-5 py-10 mt-28 mb-28 justify-center items-center">
        <h1 className="text-5xl font-bold text-gray-800 mb-10">Biletini Sorgula</h1>
        <div className="flex justify-between gap-6 mt-12 w-2/3">

          {/* Kutucuk 1 */}
          <div className="flex flex-col flex-1">
            <label className="text-lg font-medium text-gray-700 mb-2">Lütfen bilet ID'si giriniz</label>
            <input
              type="number"
              placeholder="Lütfen bir sayı girin"
              className="border border-gray-300 rounded-lg p-3 text-gray-600"
            />
          </div>

          {/* Kutucuk 2 */}
          <div className="flex flex-col flex-1">
            <label className="text-lg font-medium text-gray-700 mb-2">Cep telefonu veya e-posta giriniz</label>
            <input
              type="text"
              placeholder="+90.. veya ticketup@gmail.com"
              className="border border-gray-300 rounded-lg p-3 text-gray-600"
            />
          </div>
        </div>

        <div className="flex mt-20">
          <GradientButton text="Biletini Sorgula" onClick={() => alert("Sorgula")} />
        </div>

      </div>

      <Footer />
    </div>
  );
};

export default TicketQuery;
