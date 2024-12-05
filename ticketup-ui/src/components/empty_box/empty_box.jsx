import React from "react";
import PropTypes from "prop-types";

const EmptyBox = ({ width, height }) => {
  const style = {
    width: width || "100px", // Varsayılan genişlik
    height: height || "100px", // Varsayılan yükseklik
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
  };

  return <div style={style}></div>;
};

// Tip Kontrolü
EmptyBox.propTypes = {
  width: PropTypes.string,
  height: PropTypes.string,
};

export default EmptyBox;
