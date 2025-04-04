import React, { useState } from "react";
import { getTournamentByEndDate } from "../services/api";

const GetTournamentByEndDateSearch = () => {
  const [endDate, setEndDate] = useState("");
  const [tournaments, setTournaments] = useState([]);
  const [tournament, setTournament] = useState(null);
  const [error, setError] = useState("");
  const [collapsed, setCollapsed] = useState(false); // Track collapsed state
  const [dropdownValue, setDropdownValue] = useState(""); // Track dropdown selection

  const handleSearch = async () => {
    if (!endDate) {
      setError("Please enter an end date to search.");
      return;
    }

    setError("");
    const result = await getTournamentByEndDate(endDate);

    if (result) {
      if (Array.isArray(result) && result.length > 1) {
        setTournaments(result);
        setTournament(null);
      } else {
        setTournament(result);
        setTournaments([]);
      }
    } else {
      setError("No tournaments found for this end date.");
      setTournaments([]);
      setTournament(null);
    }
  };

  const handleToggleCollapse = () => {
    setCollapsed(!collapsed); // Toggle collapse state
  };

  // Dropdown Change Handler
  const handleDropdownChange = (e) => {
    setDropdownValue(e.target.value);
    // Trigger search logic based on dropdown value if needed
  };

  return (
    <div className="tournament-card">
      <h1>Search Tournaments by End Date</h1>

      <div className="tournament-group">
        <input
          type="date"
          placeholder="Enter tournament end date"
          value={endDate}
          onChange={(e) => setEndDate(e.target.value)}
          className="input-field"
        />
      </div>

      <div className="tournament-button-group">
        <button onClick={handleSearch} className="tournament-search-button">
          Search
        </button>
      </div>

      {error && <p className="error-message">{error}</p>}

      {tournament && !Array.isArray(tournament) && (
        <div className={`tournament-details ${collapsed ? "collapsed" : ""}`}>
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
        <div className={`tournament-details ${collapsed ? "collapsed" : ""}`}>
          <h2>Tournaments Found</h2>
          <div className="cards-container">
            {tournaments.map((tournament, index) => (
              <div key={index} className="tournament-card">
                <p><strong>Name:</strong> {tournament.name}</p>
                <p><strong>Start Date:</strong> {tournament.startDate}</p>
                <p><strong>End Date:</strong> {tournament.endDate}</p>
                <p><strong>Location:</strong> {tournament.location}</p>
                <p><strong>Entry Fee:</strong> ${tournament.entryFee}</p>
                <p><strong>Cash Prize:</strong> ${tournament.cashPrize}</p>

                {/* Dropdown for further filtering or options */}
                <div className="dropdown">
                  <select value={dropdownValue} onChange={handleDropdownChange}>
                    <option value="">Select an option</option>
                    <option value="option1">Option 1</option>
                    <option value="option2">Option 2</option>
                    <option value="option3">Option 3</option>
                  </select>
                </div>

                <hr />
              </div>
            ))}
          </div>
        </div>
      )}

      <button onClick={handleToggleCollapse} className="tournament-search-button">
        {collapsed ? "Show Results" : "Collapse Results"}
      </button>
    </div>
  );
};

export default GetTournamentByEndDateSearch;
