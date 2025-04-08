import React from "react";
import homePic from "../golfFavicon.png";

const Home = () => {
  return (
    <div className="home-container">
      <img src={homePic} alt="Golf icon" className="homeImgGolf-icon" />
      <p
        style={{
          fontSize: "20px",
          color: "#333",
          textAlign: "center",
          lineHeight: "1.6",
          margin: "20px auto",
          maxWidth: "800px",
          fontFamily: "'Roboto', sans-serif",
        }}
      >
        <span
          style={{
            fontWeight: "bold",
            fontSize: "24px",
            display: "block",
            marginBottom: "10px",
            color: "#2c6e4f",
          }}
        >
          Unlock Your Golfing Potential
        </span>
        <span
          style={{
            display: "block",
            marginBottom: "15px",
          }}
        >
          Join our premier golf club and enjoy exclusive access to top-tier
          tournaments, world-class courses, and a dynamic community of
          passionate golf enthusiasts.
        </span>
        <span
          style={{
            display: "block",
            fontStyle: "italic",
            color: "#555",
          }}
        >
          Ready to take your game to the next level? Your journey to the perfect
          swing starts here.
        </span>
      </p>
    </div>
  );
};

export default Home;
