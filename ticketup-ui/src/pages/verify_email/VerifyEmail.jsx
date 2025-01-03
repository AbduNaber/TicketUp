import React, { useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const VerifyEmail = () => {
  const navigate = useNavigate(); // useNavigate'i dışarı alın

  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const token = params.get("token");

    console.log("Token is: ", token);

    if (token) {
      axios
        .get(`http://46.101.166.170:8080/ticketup/auth/verify-email`, {
          params: {
            token: token, // Token'i query parametre olarak gönderiyoruz
          },
        })
        .then((response) => {
          alert(response.data); // Başarılı mesajını göster
          navigate("/login"); // Login sayfasına yönlendir
        })
        .catch((error) => {
          alert(error.response?.data || "An error occurred");
        });
    }
  }, [navigate]); // Navigate bağımlılık listesine eklenir

  return <div>Email verification in progress...</div>;
};

export default VerifyEmail;