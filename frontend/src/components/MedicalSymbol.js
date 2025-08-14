import React from "react";
import "./MedicalSymbol.css";

const MedicalSymbol = () => {
  return (
    <div className="medical-symbol-container">
      <svg
        className="medical-symbol"
        viewBox="0 0 100 100"
        width="100"
        height="100"
        aria-label="Medical symbol plus"
      >
        <circle cx="50" cy="50" r="45" stroke="#004080" strokeWidth="4" fill="white" />
        <rect x="45" y="20" width="10" height="60" fill="#004080" />
        <rect x="20" y="45" width="60" height="10" fill="#004080" />
      </svg>

      <span className="ripple ripple-red"></span>
      <span className="ripple ripple-blue"></span>
    </div>
  );
};

export default MedicalSymbol;
