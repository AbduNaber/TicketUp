import Footer from "../../components/Footer";
import GradientButton from "../../components/GradientButton";
import TopBar from "../../components/TopBar";

const WhyUs = () => {
  return (
    <div className="flex flex-col min-h-screen bg-white">
      {/* Top Bar */}
      <TopBar></TopBar>

      {/* Main Heading */}
      <div className="text-center mt-20 mb-10">
        <h1 className="text-4xl font-bold text-gray-800">Neden Biz</h1>
      </div>

      {/* Large Container */}
      <div className="container mx-auto mb-20 p-6 flex-grow">
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
        <Footer></Footer>
    </div>
  );
};

export default WhyUs;