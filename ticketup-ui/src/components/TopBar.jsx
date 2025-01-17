import GradientButton from "../components/GradientButton"; // GradientButton'u import etmeyi unutmayın.
import { Link, useNavigate } from "react-router-dom";

const TopBar = () => {

  const navigate = useNavigate();
  const token = sessionStorage.getItem("token");

  const goToTicketQuery = () => {
    navigate("/query-ticket");
  }

  const handleGoToAccount = () => {
    console.log("Go To Profile");
    if(token){
      navigate("/organizer");
    }else {
      navigate("/login");
    }
  }
  return (
    <div className="w-full bg-gray-800 top-0 left-0 z-50 shadow">
      <div className="flex justify-between items-center px-5 py-2 h-[10vh] text-white">
        {/* Logo */}
        <div className="flex-1">
        <img
              src="/src/assets/icons/ticketup_logo_wh.png"
              alt="Logo"
              className="w-[200px]"
              onClick={() => navigate("/home")}
            />
        </div>
        {/* Navigation Links */}
        <div className="flex justify-center items-center">
          <Link to="/home" className="text-white text-sm mx-6 hover:underline">
            Ana Sayfa
          </Link>
          <Link to="/why-us" className="text-white text-sm mx-6 hover:underline">
            Neden Biz
          </Link>
          <Link to="/contact-ticketup" className="text-white text-sm mx-6 hover:underline">
            Bizimle İletişime Geçin
          </Link>
        </div>
        {/* Profile and Button */}
        <div className="flex items-center gap-4 flex-1 justify-end">
          <GradientButton text="Biletini Sorgula" onClick={goToTicketQuery} />
          <a onClick={handleGoToAccount}>
            <img
              src="/src/assets/icons/profile_wh_icon.svg"
              alt="Logo"
              className="w-10 h-10 rounded-full"
            />
          </a>
        </div>
      </div>
    </div>
  );
};

export default TopBar;
