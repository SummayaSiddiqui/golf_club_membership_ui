import React, { useState } from "react";
import { getTournamentByStartDate } from "../services/api";

const GetTournamentByStartDateSearch = () => {
  const [startDate, setStartDate] = useState("");
  const [tournaments, setTournaments] = useState([]);
  const [tournament, setTournament] = useState(null);
  const [error, setError] = useState("");

  const handleSearch = async () => {
    if (!startDate) {
      setError("Please enter a start date to search.");
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
    } else {
      setError("No tournaments found for this start date.");
      setTournaments([]);
      setTournament(null);
    }
  };

  return (
    <div>
      <div className="tournament-card">
        <h1 >Search Tournaments by Start Date</h1>

        <div className="tournament-group">
          <input
            type="date"
            placeholder="Enter tournament start date"
            value={startDate}
            onChange={(e) => setStartDate(e.target.value)}
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
          <div className="tournament-details">
            <h2>Tournament Details</h2>
            <p>
              <strong>Name:</strong> {tournament.name}
            </p>
            <p>
              <strong>Start Date:</strong> {tournament.startDate}
            </p>
            <p>
              <strong>End Date:</strong> {tournament.endDate}
            </p>
            <p>
              <strong>Location:</strong> {tournament.location}
            </p>
            <p>
              <strong>Entry Fee:</strong> ${tournament.entryFee}
            </p>
            <p>
              <strong>Cash Prize:</strong> ${tournament.cashPrize}
            </p>
          </div>
        )}

        {tournaments.length > 0 && (
          <div className="tournament-details">
            <h2>Tournaments Found</h2>
            {tournaments.map((tournament, index) => (
              <div key={index} className="tournament-card">
                <p>
                  <strong>Name:</strong> {tournament.name}
                </p>
                <p>
                  <strong>Start Date:</strong> {tournament.startDate}
                </p>
                <p>
                  <strong>End Date:</strong> {tournament.endDate}
                </p>
                <p>
                  <strong>Location:</strong> {tournament.location}
                </p>
                <p>
                  <strong>Entry Fee:</strong> ${tournament.entryFee}
                </p>
                <p>
                  <strong>Cash Prize:</strong> ${tournament.cashPrize}
                </p>
                <hr />
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default GetTournamentByStartDateSearch;
