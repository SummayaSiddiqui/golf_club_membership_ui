import React from 'react';
import { Link } from 'react-router-dom';
import { FaHome, FaTrophy, FaUsers, FaEnvelope } from 'react-icons/fa';

const Navbar = () => {
  return (
    <nav
      style={{
        backgroundColor: 'white',
        borderRadius: '10px',
        padding: '10px 20px',
        boxShadow: '0px 4px 6px rgba(0, 0, 0, 0.1)',
        marginBottom: '20px',
        marginLeft: '10px',
        marginRight: '10px',
      }}
    >
      <ul
        style={{
          display: 'flex',
          listStyle: 'none',
          margin: 0,
          padding: 0,
          justifyContent: 'space-around',
          flexWrap: 'wrap', // This allows the navbar items to stack on smaller screens
        }}
      >
        <li>
          <Link
            to="/"
            style={{
              textDecoration: 'none',
              color: 'black',
              fontSize: '16px',
              padding: '8px 16px',
              borderRadius: '5px',
              display: 'flex',
              alignItems: 'center',
              transition: 'background-color 0.3s',
            }}
            onMouseEnter={(e) => (e.target.style.backgroundColor = '#f0f0f0')}
            onMouseLeave={(e) => (e.target.style.backgroundColor = 'transparent')}
          >
            <FaHome style={{ marginRight: '8px' }} />
            Home
          </Link>
        </li>
        <li>
          <Link
            to="/tournaments"
            style={{
              textDecoration: 'none',
              color: 'black',
              fontSize: '16px',
              padding: '8px 16px',
              borderRadius: '5px',
              display: 'flex',
              alignItems: 'center',
              transition: 'background-color 0.3s',
            }}
            onMouseEnter={(e) => (e.target.style.backgroundColor = '#f0f0f0')}
            onMouseLeave={(e) => (e.target.style.backgroundColor = 'transparent')}
          >
            <FaTrophy style={{ marginRight: '8px' }} />
            Tournaments
          </Link>
        </li>
        <li>
          <Link
            to="/members"
            style={{
              textDecoration: 'none',
              color: 'black',
              fontSize: '16px',
              padding: '8px 16px',
              borderRadius: '5px',
              display: 'flex',
              alignItems: 'center',
              transition: 'background-color 0.3s',
            }}
            onMouseEnter={(e) => (e.target.style.backgroundColor = '#f0f0f0')}
            onMouseLeave={(e) => (e.target.style.backgroundColor = 'transparent')}
          >
            <FaUsers style={{ marginRight: '8px' }} />
            Members
          </Link>
        </li>
        <li>
          <Link
            to="/contact"
            style={{
              textDecoration: 'none',
              color: 'black',
              fontSize: '16px',
              padding: '8px 16px',
              borderRadius: '5px',
              display: 'flex',
              alignItems: 'center',
              transition: 'background-color 0.3s',
            }}
            onMouseEnter={(e) => (e.target.style.backgroundColor = '#f0f0f0')}
            onMouseLeave={(e) => (e.target.style.backgroundColor = 'transparent')}
          >
            <FaEnvelope style={{ marginRight: '8px' }} />
            Contact
          </Link>
        </li>
      </ul>
    </nav>
  );
};

export default Navbar;
