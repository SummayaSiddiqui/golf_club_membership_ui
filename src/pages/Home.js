import React from "react";
import homePic from "../homePic.jpeg";

const Home = () => {
  return (
    <div
      style={{
        backgroundColor: "white",
        borderRadius: "15px",
        padding: "20px",
        boxShadow: "0px 4px 6px rgba(0, 0, 0, 0.1)",
        // width: "85%",
        maxWidth: "1600px",
        minWidth: "300px",
        margin: "auto",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
      }}
    >
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
        alt="Home"
        style={{
          width: "200px",
          maxWidth: "500px",
          minWidth: "100px",
           width: "90%",
        }}
      />
      <p
        style={{
          fontSize: "20px",
          color: "black",
          textAlign: "center",
        }}
      >
        please use the menu on top to navigate the website
      </p>
    </div>
  );
};

export default Home;
