import React from 'react';
import Navbar from './Navbar';

const Header = () => {
  return (
    <header
      style={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        padding: '20px', // Added padding to prevent content from touching the edges
      }}
    >
      <h1
        style={{
          fontSize: '2rem',
          fontWeight: 'bold',
          color: 'black',
          textShadow: '0 0 5px white, 0 0 10px white, 0 0 15px white',
          letterSpacing: '2px',
          padding: '10px',
        }}
      >
        Golf Club Membership
      </h1>
      <Navbar />
    </header>
  );
};

export default Header;
