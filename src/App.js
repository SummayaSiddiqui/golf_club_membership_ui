import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Header from "./components/Header";
import Footer from "./components/Footer";
import TournamentsPage from "./pages/TournamentsPage";
import MembersPage from "./pages/MembersPage";
import Home from "./pages/Home";
import MemberSearch from "./pages/MemberSearch";
import ParticipantsPage from "./pages/ParticipantsPage";
import TournamentSearch from "./pages/TournamentSearch";
import MemberDetailsPage from "./pages/MemberDetailsPage";

const App = () => {
  return (
    <Router>
      <div
        style={{
          backgroundImage: "url(/golfBg.jpeg)",
          backgroundSize: "cover",
          backgroundPosition: "center",
          minHeight: "100vh",
          margin: 0,
          padding: 0,
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
        }}
      >
        <div className="app-container">
          <Header />
          <main
            style={{
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
            }}
          >
            <Routes>
              <Route
                path="/tournaments/:id/participants"
                element={<ParticipantsPage />}
              />
              <Route path="/" element={<Home />} />
              <Route path="/memberSearch" element={<MemberSearch />} />
              <Route path="/tournamentSearch" element={<TournamentSearch />} />
              <Route path="/tournaments" element={<TournamentsPage />} />
              <Route path="/members" element={<MembersPage />} />
              <Route path="/tournament/:id" element={<ParticipantsPage />} />
              <Route path="/member/:id" element={<MemberDetailsPage />} />
            </Routes>
          </main>
          <Footer />
        </div>
      </div>
    </Router>
  );
};

export default App;
