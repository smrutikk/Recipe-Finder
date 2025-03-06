import React from "react";
import backgroundImage from './Img/bg_img.jpeg';

const LandingPage = ({ onGetStarted }) => {
  return (
    <div
      className="container-fluid d-flex flex-column align-items-center justify-content-center min-vh-100 position-relative"
      style={{
        backgroundImage: `url(${backgroundImage})`, // Replace with your image URL
        backgroundSize: "cover",
        backgroundPosition: "center",
        color: "white",
        textAlign: "center",
      }}
    >
      {/* Overlay for opacity effect */}
      <div
        className="position-absolute top-0 start-0 w-100 h-100"
        style={{
          backgroundColor: "rgba(0, 0, 0, 0.6)", // Adjust opacity (0.6 = 60% dark overlay)
          zIndex: 1,
        }}
      ></div>

      {/* Content with higher z-index */}
      <div className="position-relative text-center" style={{ zIndex: 2 }}>
        <h1 className="fw-bold">🍽️ Welcome to Recipe Finder</h1>
        <p className="lead">Discover delicious recipes based on your ingredients!</p>
        <button
          className="btn btn-light btn-lg rounded-pill shadow mt-3"
          onClick={onGetStarted}
        >
          Get Started 🚀
        </button>
      </div>
    </div>
  );
};

export default LandingPage;
