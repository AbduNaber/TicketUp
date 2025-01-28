import React, { useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { verifyEmail } from "@/service/authService";



const VerifyEmail = () => {
  const navigate = useNavigate(); // useNavigate'i dışarı alın

  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const token = params.get("token");

    if (token) {
      verifyEmail(token)
        .then((message) => {
          alert(message);
          navigate("/login");
        })
        .catch((error) => {
          alert(error.message || "Beklenmeyen bir hata oluştu");
        });
    }
  }, [navigate]); // Navigate bağımlılık listesine eklenir

  return <div>Email verification in progress...</div>;
};

export default VerifyEmail;