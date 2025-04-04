import React, { useState } from "react";
import { getTournamentByStartDate } from "../services/api";

const TournamentSearch = () => {
  const [searchType, setSearchType] = useState("");
  const [startDate, setStartDate] = useState("");
  const [tournament, setTournament] = useState(null);
  const [tournaments, setTournaments] = useState([]);
  const [error, setError] = useState("");
  const [searchCompleted, setSearchCompleted] = useState(false);

  const handleSearchTypeChange = (e) => {
    setSearchType(e.target.value);
    setStartDate("");
    setTournament(null);
    setTournaments([]);
    setError("");
    setSearchCompleted(false);
  };

  const handleSearch = async () => {
    if (!startDate) {
      setError("Please enter a start date.");
      return;
    }

    setError("");
    const result = await getTournamentByStartDate(startDate);

    if (result) {
      if (Array.isArray(result) && result.length > 1) {
        setTournaments(result);
        setTournament(null);
      } else {
        setTournament(result);
        setTournaments([]);
      }
      setSearchCompleted(true);
    } else {
      setError("No tournaments found for this start date.");
      setSearchCompleted(true);
    }
  };

  // 👉 Third view: show only tournament results if search is completed
  if (searchCompleted) {
    return (
      <div className="tournament-results">
        {error && <p className="error-message">{error}</p>}

        {tournament && (
          <div className="tournament-card">
            <h2>Tournament Details</h2>
            <p><strong>Name:</strong> {tournament.name}</p>
            <p><strong>Start Date:</strong> {tournament.startDate}</p>
            <p><strong>End Date:</strong> {tournament.endDate}</p>
            <p><strong>Location:</strong> {tournament.location}</p>
            <p><strong>Entry Fee:</strong> ${tournament.entryFee}</p>
            <p><strong>Cash Prize:</strong> ${tournament.cashPrize}</p>
          </div>
        )}

        {tournaments.length > 0 && (
          <div className="tournament-list">
            <h2>Tournaments Found</h2>
            {tournaments.map((t, idx) => (
              <div key={idx} className="tournament-card">
                <p><strong>Name:</strong> {t.name}</p>
                <p><strong>Start Date:</strong> {t.startDate}</p>
                <p><strong>End Date:</strong> {t.endDate}</p>
                <p><strong>Location:</strong> {t.location}</p>
                <p><strong>Entry Fee:</strong> ${t.entryFee}</p>
                <p><strong>Cash Prize:</strong> ${t.cashPrize}</p>
                <hr />
              </div>
            ))}
          </div>
        )}
      </div>
    );
  }

  // 👉 First + Second View
  return (
    <div className="tournament-search-container">
      {/* Intro Box always visible */}
      <div className="intro-box">
        <h2>Welcome to the Tournament Search!</h2>
        <p>Here you can search for tournaments based on various criteria.</p>
        <p>Select an option from the dropdown below to begin your search.</p>
      </div>

      {/* Dropdown */}
      <div className="search-type-dropdown-box">
        <div className="search-type-dropdown">
          <label htmlFor="searchType">Choose Search Type:</label>
          <select
            id="searchType"
            value={searchType}
            onChange={handleSearchTypeChange}
          >
            <option value="">Select a search type</option>
            <option value="startDate">Search by Start Date</option>
          </select>
        </div>

        {/* If startDate selected, show input and button below */}
        {searchType === "startDate" && (
          <div className="selected-option">
            <input
              type="date"
              value={startDate}
              onChange={(e) => setStartDate(e.target.value)}
              className="input-field"
            />
            <button onClick={handleSearch} className="tournament-search-button">
              Search
            </button>
            {error && <p className="error-message">{error}</p>}
          </div>
        )}
      </div>
    </div>
  );
};

export default TournamentSearch;
