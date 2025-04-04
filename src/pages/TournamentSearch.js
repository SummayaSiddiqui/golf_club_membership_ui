import React, { useState } from "react";

const TournamentSearch = ({ searchCriterion, onSearchChange, onCriterionChange }) => {
  const [searchTerm, setSearchTerm] = useState("");
  // Update the search term when the user types
  const handleSearchChange = (e) => {
    setSearchTerm(e.target.value);
    onSearchChange(e.target.value);
  };

  return (
    <div className="search-box">
      <div className="search-dropdown-container">
        <select
          value={searchCriterion}
          onChange={(e) => onCriterionChange(e.target.value)}
          className="search-dropdown"
        >
          <option value="search">Search</option>
          <option value="location">Location</option>
          <option value="startDate">Start Date</option>
          <option value="endDate">End Date</option>
        </select>

        <input
          type="text"
          placeholder="Enter search term"
          value={searchTerm}
          onChange={handleSearchChange}
          className="search-input"
        />
      </div>
    </div>
  );
};

export default TournamentSearch;
