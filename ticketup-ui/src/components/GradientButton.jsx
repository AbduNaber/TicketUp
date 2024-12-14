import React from "react";

const GradientButton = ({ text, onClick }) => {
  return (
    <button
      className="bg-gradient-to-r from-pink-500 to-orange-400 text-white text-sm font-bold rounded-full px-5 py-2 shadow-md hover:scale-105 hover:shadow-lg active:scale-95 transition-transform"
      onClick={onClick}
    >
      {text}
    </button>
  );
};

export default GradientButton;
