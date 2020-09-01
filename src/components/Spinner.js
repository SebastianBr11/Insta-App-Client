import React from "react";
import "./Spinner.css";

const Spinner = ({ size }) => {
  return <div data-size={size} className="spinner"></div>;
};

export default Spinner;
