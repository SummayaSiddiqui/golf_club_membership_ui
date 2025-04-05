import React from "react"

const GetTournamentByStartDateSearch = ({ tournament, tournaments, error, onBack }) => {
  return (
    <div className="tournament-results">
      {error && <p className="error-message">{error}</p>}

      {tournament && !Array.isArray(tournament) && (
        <div className="tournament-details">
          <h2>Tournament Details</h2>
          <p><strong>Start Date:</strong> {tournament.startDate}</p>
          <p><strong>End Date:</strong> {tournament.endDate}</p>
          <p><strong>Location:</strong> {tournament.location}</p>
          <p><strong>Entry Fee:</strong> ${tournament.entryFee}</p>
          <p><strong>Cash Prize:</strong> ${tournament.cashPrizeAmount}</p>
        </div>
      )}

      {tournaments.length > 0 && (
        <div className="tournament-details">
          <h2>Tournaments Found</h2>
          {tournaments.map((t, index) => (
            <div key={index}>
              <p><strong>Start Date:</strong> {t.startDate}</p>
              <p><strong>End Date:</strong> {t.endDate}</p>
              <p><strong>Location:</strong> {t.location}</p>
              <p><strong>Entry Fee:</strong> ${t.entryFee}</p>
              <p><strong>Cash Prize:</strong> ${t.cashPrizeAmount}</p>
            </div>
          ))}
        </div>
      )}

      <button className="go-back-button" onClick={onBack}>
        Go Back
      </button>
    </div>
  );
};

export default GetTournamentByStartDateSearch;