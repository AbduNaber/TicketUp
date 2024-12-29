import GradientButton from "../components/GradientButton"; // GradientButton'u import etmeyi unutmayın.
import { Link, useNavigate } from "react-router-dom";

const TopBar = () => {

  const navigate = useNavigate();

  const goToTicketQuery = () => {
    navigate("/query-ticket");
  }
  return (
    <div className="w-full bg-white top-0 left-0 z-50 shadow">
      <div className="flex justify-between items-center px-5 py-2 h-[10vh] text-white bg-white">
        {/* Logo */}
        <div className="flex-1">
          <a href="https://www.example.com">
            <img
              src="/src/assets/icons/ticketup_icon_full.png"
              alt="Logo"
              className="w-[200px]"
            />
          </a>
        </div>
        {/* Navigation Links */}
        <div className="flex justify-center items-center">
          <Link to="#" className="text-black text-sm mx-6 hover:underline">
            Ana Sayfa
          </Link>
          <Link to="/why-us" className="text-black text-sm mx-6 hover:underline">
            Neden Biz
          </Link>
          <Link to="/contact-ticketup" className="text-black text-sm mx-6 hover:underline">
            Bizimle İletişime Geçin
          </Link>
        </div>
        {/* Profile and Button */}
        <div className="flex items-center gap-4 flex-1 justify-end">
          <GradientButton text="Biletini Sorgula" onClick={goToTicketQuery} />
          <a href="https://www.example.com">
            <img
              src="/src/assets/icons/account.png"
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
