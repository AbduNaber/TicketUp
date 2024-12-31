import GradientButton from "../../components/GradientButton";
import Footer from "../../components/Footer";
import TopBar from "@/components/TopBar";

const TicketQuery = () => {
  return (

    <div className="flex flex-col min-h-screen bg-white overflow-y-auto">
      {/* Top Bar */}
      <TopBar></TopBar>

      {/* Content Section */}
      <div className="flex flex-col px-5 py-10 mt-28 mb-28 justify-center items-center flex-grow">
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