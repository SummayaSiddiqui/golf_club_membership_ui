import React, { useState } from "react";
import { getTournamentByStartDate, getTournamentByEndDate, getTournamentByLocation } from "../services/api";
import GetTournamentByStartDateSearch from "../components/GetTournamentByStartDateSearch";
import GetTournamentByEndDateSearch from "../components/GetTournamentByEndDateSearch";
import GetTournamentByLocationSearch from "../components/GetTournamentByLocationSearch";
import homePic from "../golfFavicon.png";

const TournamentSearch = () => {
  const [searchType, setSearchType] = useState("");
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");  // Added endDate state
  const [location, setLocation] = useState("");
  const [tournament, setTournament] = useState(null);
  const [tournaments, setTournaments] = useState([]);
  const [error, setError] = useState("");
  const [searchCompleted, setSearchCompleted] = useState(false);

  const handleSearchTypeChange = (e) => {
    setSearchType(e.target.value);
    setStartDate("");
    setEndDate("");  // Reset endDate when changing search type
    setLocation("");
    setTournaments([]);
    setTournament(null);
    setError("");
    setSearchCompleted(false);
  };

  const handleSearch = async () => {
    // Validation: if no search type selected or input is empty, show error
    if ((searchType === "startDate" || searchType === "endDate") && !startDate && !endDate) {
      setError("Please enter a date.");
      return;
    }

    if (searchType === "location" && !location) {
      setError("Please enter a location.");
      return;
    }

    setError("");
    let result;

    // Perform search based on selected search type
    if (searchType === "startDate") {
      result = await getTournamentByStartDate(startDate);
    } else if (searchType === "endDate") {
      result = await getTournamentByEndDate(endDate);  // Use endDate for endDate search
    } else if (searchType === "location") {
      result = await getTournamentByLocation(location);
    }
    // Handle search results
    if (result) {
      if (Array.isArray(result) && result.length >= 1) {
        setTournaments(result);
        setTournament(null);
      } else {
        setTournament(result);
        setTournaments([]);
      }
      setSearchCompleted(true);
    } else {
      setError("No tournaments found.");
      setSearchCompleted(true);
    }
  };

  // Render results based on search type
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
              setEndDate("");
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
              setEndDate("");
              setTournament(null);
              setTournaments([]);
              setError("");
            }}
          />
        );
      case "location":
        return (
          <GetTournamentByLocationSearch
            tournament={tournament}
            tournaments={tournaments}
            error={error}
            onBack={() => {
              setSearchCompleted(false);
              setStartDate("");
              setEndDate("");
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

  // First and Second View (dropdown + search form)
  return (
    <div className="tournament-search-container">
      {/* Intro Box always visible */}
      <div className="intro-box">
        <h2>Welcome to the Tournament Search!</h2>
        <p>Here you can search for tournaments based on various criteria.</p>
        <p>Select an option from the dropdown below to begin your search.</p>
        <img
                src={homePic}
                alt="Golf icon"
                className="homeImgGolf-icon"
              />
      </div>

      {/* Dropdown for search type */}
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
            <option value="location">Search by Location</option>
          </select>
        </div>

        {/* If startDate, endDate, or location is selected, show input and button */}
        {(searchType === "startDate" || searchType === "endDate" || searchType === "location") && (
          <div className="tournament-card">
            <h1>
              Search Tournaments by{" "}
              {searchType === "startDate"
                ? "Start Date"
                : searchType === "endDate"
                ? "End Date"
                : "Location"}
            </h1>

            <div className="tournament-group">
              {searchType === "location" ? (
                <input
                  type="text"
                  value={location}
                  onChange={(e) => setLocation(e.target.value)}
                  className="input-field"
                  placeholder="Enter location"
                />
              ) : searchType === "endDate" ? (
                <input
                  type="date"
                  value={endDate}
                  onChange={(e) => setEndDate(e.target.value)}
                  className="input-field"
                />
              ) : (
                <input
                  type="date"
                  value={startDate}
                  onChange={(e) => setStartDate(e.target.value)}
                  className="input-field"
                />
              )}
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