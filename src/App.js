import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Navbar from './components/Navbar';
import Header from './components/Header';
import Footer from './components/Footer';

const App = () => {
  return (
    <Router>
      <div>
        <Header />
        <Navbar />
        <main>
          <Routes>
            <Route path="/" element={<h2>Welcome to the Golf Club</h2>} />
            <Route path="/tournaments" element={<h2>Tournaments Page (Coming Soon)</h2>} />
            <Route path="/members" element={<h2>Members Page (Coming Soon)</h2>} />
            <Route path="/contact" element={<h2>Contact Page (Coming Soon)</h2>} />
          </Routes>
        </main>
        <Footer />
      </div>
    </Router>
  );
};

export default App;
