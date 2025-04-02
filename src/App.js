import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Navbar from './components/Navbar';
import Header from './components/Header';
import Footer from './components/Footer';
import TournamentsPage from "./pages/TournamentsPage";
import MembersPage from './pages/MembersPage';

const App = () => {
  return (
    <Router>
      <div
         style={{
           backgroundImage: 'url(/golfBg.jpeg)',
           backgroundSize: 'cover',
           backgroundPosition: 'center',
           minHeight: '100vh',
           margin: 0,
           padding: 0,
           display: 'flex',
           flexDirection: 'column',
           backgroundOpacity:"0.5"
         }}
      >
        <Header />
        <main>
          <Routes>
            <Route path="/" element={<h2>Welcome to the Golf Club</h2>} />
            <Route path="/tournaments" element={<TournamentsPage />} />
            <Route path="/members" element={<MembersPage />} />
            <Route path="/contact" element={<h2>Contact Page (Coming Soon)</h2>} />
          </Routes>
        </main>
        <Footer />
      </div>
    </Router>
  );
};

export default App;
