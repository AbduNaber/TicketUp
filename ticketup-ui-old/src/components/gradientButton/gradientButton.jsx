import React from "react";
import "./gradientButton.css"; // Stil dosyası

const GradientButton = ({ text, onClick }) => {
  return (
    <button className="gradient-button" onClick={onClick}>
      {text}
    </button>
  );
};

export default GradientButton;
