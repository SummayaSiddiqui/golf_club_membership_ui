import React, { useState } from "react";
import { getTournamentByStartDate, getTournamentByEndDate } from "../services/api";
import GetTournamentByStartDateSearch from "../components/GetTournamentByStartDateSearch";
import GetTournamentByEndDateSearch from "../components/GetTournamentByEndDateSearch";

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
      setError("Please enter a date.");
      return;
    }

    setError("");
    let result;

    if (searchType === "startDate") {
      result = await getTournamentByStartDate(startDate);
    } else if (searchType === "endDate") {
      result = await getTournamentByEndDate(startDate);
    }

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
      setError("No tournaments found for this date.");
      setSearchCompleted(true);
    }
  };

  // 👉 Third view: show only tournament results if search is completed
  if (searchCompleted) {
    switch (searchType) {
      case "startDate":
        return (
          <GetTournamentByStartDateSearch
            tournament={tournament}
            tournaments={tournaments}
            error={error}
            onBack={() => {
              setSearchCompleted(false);
              setStartDate("");
              setTournament(null);
              setTournaments([]);
              setError("");
            }}
          />
        );
      case "endDate":
        return (
          <GetTournamentByEndDateSearch
            tournament={tournament}
            tournaments={tournaments}
            error={error}
            onBack={() => {
              setSearchCompleted(false);
              setStartDate("");
              setTournament(null);
              setTournaments([]);
              setError("");
            }}
          />
        );
      default:
        return <p>No view implemented for this search type.</p>;
    }
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
            <option value="endDate">Search by End Date</option>
          </select>
        </div>

        {/* If startDate selected, show input and button below */}
        {(searchType === "startDate" || searchType === "endDate") && (
          <div className="tournament-card">
            <h1>
              Search Tournaments by{" "}
              {searchType === "startDate" ? "Start Date" : "End Date"}
            </h1>

            <div className="tournament-group">
              <input
                type="date"
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
          </div>
        )}
      </div>
    </div>
  );
};

export default TournamentSearch;
