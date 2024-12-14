import { QRCodeCanvas } from "qrcode.react";
import GradientButton from "../../components/GradientButton"; 
import Footer from "../../components/Footer";
import EmptyBox from "../../components/empty_box";

const Ticket = () => {
  return (
    <div className="flex flex-col min-h-screen bg-white overflow-y-auto">
      {/* Top Bar */}
      <div className="flex justify-between items-center px-5 py-2 bg-gray-800 text-white">
        <div>
          <a href="https://www.example.com">
            <img src="/src/assets/icons/ticketup_icon_full.png" alt="Logo" className="w-52" />
          </a>
        </div>
        <div className="flex gap-6">
          <a href="#" className="text-sm hover:underline">Ana Sayfa</a>
          <a href="#" className="text-sm hover:underline">Neden Biz</a>
          <a href="#" className="text-sm hover:underline">Bizimle İletişime Geçin</a>
        </div>
        <div className="flex items-center gap-4">
          <GradientButton text="Biletini Sorgula" onClick={() => { }} />
          <a href="https://www.example.com">
            <img src="/src/assets/icons/account.png" alt="Profile" className="w-10 h-10 rounded-full" />
          </a>
        </div>
      </div>

      {/* Title */}
      <h2 className="text-4xl text-black font-bold text-center mt-8">
        Anadolu'dan Dünyaya (Denizli)
      </h2>

      {/* QR Code Section */}
      <div className="flex justify-between items-center mt-8 mx-auto w-4/5">
        <div className="flex flex-col gap-4">
          <EmptyBox width="180px" height="40px" />
          <EmptyBox width="180px" height="40px" />
        </div>
        <QRCodeCanvas
          value="https://www.youtube.com/watch?v=dQw4w9WgXcQ"
          size={200}
          bgColor="#ffffff"
          fgColor="#000000"
        />
        <div className="flex flex-col gap-4">
          <GradientButton text="Bileti Düzenle" onClick={() => { }} />
          <GradientButton text="Bileti Sil" onClick={() => { }} />
        </div>
      </div>

      {/* Ticket Details */}
      <div className="flex flex-col items-center mt-10 mb-20">
        <p className="text-xl font-light text-black mt-6">Etkinlik Bilgileri</p>
        <p className="text-2xl font-extrabold text-black mt-2">T-Soft ile Anadolu'dan Dünya'ya</p>

        <div className="flex justify-between mt-4 w-2/5">
          <div className="flex flex-col items-center p-2 text-center">
            <p className="text-sm font-medium text-black">TARİH</p>
            <p className="text-sm font-bold text-black">4.11.2024</p>
          </div>
          <div className="flex flex-col items-center p-2 text-center">
            <p className="text-sm font-medium text-black">SAAT</p>
            <p className="text-sm font-bold text-black">17.00</p>
          </div>
          <div className="flex flex-col items-center p-2 text-center">
            <p className="text-sm font-medium text-black">KONUM</p>
            <p className="text-sm font-bold text-black">
              Tüyap Etkinlik Fuarı İstanbul
            </p>
          </div>
        </div>

        {/* Participant Details */}
        <p className="text-xl font-light text-black mt-8">Katılımcı Bilgileri</p>
        <div className="flex justify-between mt-4 w-2/5">
          <div className="flex flex-col items-center p-2 text-center">
            <p className="text-sm font-medium text-black">Ad-Soyad</p>
            <p className="text-sm font-bold text-black">Sinan Eryiğit</p>
          </div>
          <div className="flex flex-col items-center p-2 text-center">
            <p className="text-sm font-medium text-black">Ünvan</p>
            <p className="text-sm font-bold text-black">Organizatör</p>
          </div>
          <div className="flex flex-col items-center p-2 text-center">
            <p className="text-sm font-medium text-black">Katılınılan İl</p>
            <p className="text-sm font-bold text-black">İstanbul</p>
          </div>
        </div>

        {/* Additional Information */}
        <p className="text-sm font-medium text-black mt-7">KATILIMCI ID</p>
        <p className="text-sm font-bold text-black mb-4">
          1f479181-d0ce-43d8-9742-48c26530c865
        </p>
        <p className="text-xl font-light text-black">Bilmeniz Gerekenler</p>
        <p className="text-sm font-light text-center text-black mt-2 w-1/5 leading-6">
          Etkinlik girişinde <strong>karekodunuzu</strong> gösterek giriş yapabilirsiniz.
          Etkinlik biletiniz ayrıca mail adresinize ve SMS olarak gönderilecektir.
          Organizator ile iletişim için: info@upista.com
        </p>
      </div>

      <Footer />
    </div>
  );
};

export default Ticket;
