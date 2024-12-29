import React from "react";
import Footer from "../../components/Footer";
import GradientButton from "../../components/GradientButton";

const WhyUs = () => {
  return (
    <div className="flex flex-col min-h-screen bg-white">
      {/* Top Bar */}
      <div className="flex justify-between items-center px-5 py-2 h-[10vh] text-white bg-white">
        <div className="flex-1">
          <a href="https://www.example.com">
            <img
              src="/src/assets/icons/ticketup_icon_full.png"
              alt="Logo"
              className="w-[200px]"
            />
          </a>
        </div>
        <div className="flex justify-center items-center ">
          <a href="#" className="text-black text-sm mx-6 hover:underline">
            Ana Sayfa
          </a>
          <a href="#" className="text-black text-sm mx-6 hover:underline">
            Neden Biz
          </a>
          <a href="#" className="text-black text-sm mx-6 hover:underline">
            Bizimle İletişime Geçin
          </a>
        </div>
        <div className="flex items-center gap-4 flex-1 justify-end">
          <GradientButton text="Biletini Sorgula" onClick={() => { }} />
          <a href="https://www.example.com">
            <img
              src="/src/assets/icons/account.png"
              alt="Logo"
              className="w-10 h-10 rounded-full"
            />
          </a>
        </div>
      </div>

      {/* Main Heading */}
      <div className="text-center mt-20 mb-10">
        <h1 className="text-4xl font-bold text-gray-800">Neden Biz</h1>
      </div>

      {/* Large Container */}
      <div className="container mx-auto mb-20 p-6">
        <div className="flex flex-wrap">
          {/* Left Side */}
          <div className="w-full md:w-1/2 p-4">
            <img
              src="https://via.placeholder.com/600x400"
              alt="Placeholder"
              className="w-full h-auto object-cover"
            />
          </div>

          {/* Right Side */}
          <div className="w-full md:w-1/2 p-4 flex flex-col justify-center">
            <h2 className="text-2xl font-bold text-gray-800 mb-4">
              Bizim Hakkımızda
            </h2>
            <p className="text-gray-700 leading-relaxed">
              Kullanıcı odaklı tasarımımız sayesinde hem katılımcılar hem de
              organizatörler için optimize edilmiş bir deneyim sunuyoruz.
              Kullanıcı hikayelerimiz ve senaryolarımız, ihtiyaçlarınızı
              anlayarak en iyi çözümleri sunmak için geliştirildi. QR kod
              tabanlı gelişmiş teknolojimiz, hızlı ve güvenli giriş işlemleri
              sağlarken, katılımcı ve etkinlik verileri tamamen şifrelenmiş bir
              şekilde korunur. Etkinlik yönetim panelimiz, katılımcı bilgilerini
              düzenlemekten bildirim göndermeye kadar geniş bir yelpazede esnek
              ve kapsamlı araçlar sunar. Ayrıca, özel ihtiyaçlarınızı
              karşılamak için kişiselleştirilmiş çözümler de sunuyoruz. Güvenlik
              ve gizlilik bizim için önceliklidir; iki aşamalı doğrulama,
              CAPTCHA koruması ve veri şifreleme gibi güvenlik önlemleriyle hem
              organizatörlerin hem de katılımcıların bilgilerinin güvende
              kalmasını sağlıyoruz. Etkinlik sonrası geri bildirim araçlarımız,
              gelecekteki etkinliklerinizi sürekli iyileştirmenize olanak tanır.
              Ayrıca, katılımcıların birbiriyle kolayca bağlantı kurabileceği ve
              etkileşimde bulunabileceği networking imkanlarıyla etkinliklerinize
              değer katıyoruz.
            </p>
            <div className="flex justify-end mt-6">
              <GradientButton text="Keşfet" onClick={() => alert("Gerekli Sayfaya İlet")} />
            </div>
          </div>
        </div>
      </div>

      <Footer />
    </div>
  );
};

export default WhyUs;
