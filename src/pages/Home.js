import React from "react";
import homePic from "../golfFavicon.png";

const Home = () => {
  return (
    <div className="home-container">
      <p
        style={{
          fontSize: "30px",
          color: "black",
          textAlign: "center",
          fontWeight: "bold",
        }}
      >
        Welcome To Golf Tournament
      </p>
      <img
        src={homePic}
        alt="Golf icon photo"
        className="homeImgGolf-icon"
      />
      <p
        style={{
          fontSize: "20px",
          color: "black",
          textAlign: "center",
        }}
      >
        Join our premier golf club and unlock exclusive tournaments, world-class
        courses, and a vibrant community of golf enthusiasts. Your journey to
        the perfect swing starts here.{" "}
      </p>
    </div>
  );
};

export default Home;
