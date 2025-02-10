import React from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button"; 

const NotFoundPage = () => {
    const navigate = useNavigate();


    const goToHome = () => {
        navigate("/home");
    };

    return (
        <div className="flex flex-col items-center justify-center min-h-screen bg-gray-50">
        <h1 className="text-6xl font-bold text-blue-600">404!</h1>
        <p className="text-gray-700 text-lg mt-4">Üzgünüz, aradığınız sayfa bulunamadı.</p>
        <Button 
          onClick={goToHome} 
          className="mt-6 px-6 py-2 text-white bg-blue-600 hover:bg-blue-700 rounded-lg"
        >
          Ana Sayfaya Dön
        </Button>
      </div>
    );
};

export default NotFoundPage;