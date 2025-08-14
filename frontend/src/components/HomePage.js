import React from "react";
import { useNavigate } from "react-router-dom";
import "./HomePage.css";
import backgroundImage from "../assets/bg.jpg"; // Updated background image

const HomePage = () => {
  const navigate = useNavigate();

  return (
    <div
      className="homepage-container"
      style={{ backgroundImage: `url(${backgroundImage})` }}
    >
      <div className="button-container">
        <button
          className="homepage-button signup-button"
          onClick={() => navigate("/register")}
        >
          Signup
        </button>
        <p className="info-text">If you don't signup, then click me</p>

        <div className="spacer"></div>

        <button
          className="homepage-button login-button"
          onClick={() => navigate("/login")}
        >
          Login
        </button>
        <p className="info-text">If you are already signup, then click me</p>
      </div>
    </div>
  );
};

export default HomePage;
