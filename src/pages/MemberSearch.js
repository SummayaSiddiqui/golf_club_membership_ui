import React, { useState } from "react";
import { getMemberByName, getMemberByAddress, getMemberByPhoneNumber, getMemberByEmailAddress, getMemberByStartDate } from "../services/api";

import GetMemberByNameSearch from "../components/GetMemberByNameSearch";
import GetMemberByAddressSearch from "../components/GetMemberByAddressSearch";
import GetMemberByPhoneNumberSearch from "../components/GetMemberByPhoneNumberSearch";
import GetMemberByEmailAddressSearch from "../components/GetMemberByEmailAddressSearch";
import GetMemberByStartDateSearch from "../components/GetMemberByStartDateSearch";
import homePic from "../golfMember.png";

const MemberSearch = () => {
  const [searchType, setSearchType] = useState("");
  const [name, setName] = useState("");
  const [address, setAddress] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [email, setEmail] = useState("");
  const [startDate, setStartDate] = useState("");
  const [member, setMember] = useState(null);
  const [members, setMembers] = useState([]);
  const [error, setError] = useState("");
  const [searchCompleted, setSearchCompleted] = useState(false);

  const handleSearchTypeChange = (e) => {
    setSearchType(e.target.value);
    setName("");
    setAddress("");
    setPhoneNumber("");
    setEmail("");
    setStartDate("");
    setMembers([]);
    setMember(null);
    setError("");
    setSearchCompleted(false);
  };

  const handleSearch = async () => {
    // Validation: if no search type selected or input is empty, show error
    if (searchType === "name" && !name) {
      setError("Please enter a name.");
      return;
    }
    if (searchType === "address" && !address) {
      setError("Please enter an address.");
      return;
    }
    if (searchType === "phoneNumber" && !phoneNumber) {
      setError("Please enter a phone number.");
      return;
    }
    if (searchType === "email" && !email) {
      setError("Please enter an email address.");
      return;
    }
    if (searchType === "startDate" && !startDate) {
      setError("Please enter a start date.");
      return;
    }

    setError("");
    let result;

    // Perform search based on selected search type
    if (searchType === "name") {
      result = await getMemberByName(name);
    } else if (searchType === "address") {
      result = await getMemberByAddress(address);
    } else if (searchType === "phoneNumber") {
      result = await getMemberByPhoneNumber(phoneNumber);
    } else if (searchType === "email") {
      result = await getMemberByEmailAddress(email);
    } else if (searchType === "startDate") {
      result = await getMemberByStartDate(startDate);
    }

    // Handle search results
    if (result) {
      if (Array.isArray(result) && result.length >= 1) {
        setMembers(result);
        setMember(null);
      } else {
        setMember(result);
        setMembers([]);
      }
      setSearchCompleted(true);
    } else {
      setError("No members found.");
      setSearchCompleted(true);
    }
  };

  // Show input fields based on search type
  if (searchCompleted) {
    switch (searchType) {
      case "name":
        return (
          <GetMemberByNameSearch
            member={member}
            members={members}
            error={error}
            onBack={() => {
              setSearchCompleted(false);
              setName("");
              setAddress("");
              setPhoneNumber("");
              setEmail("");
              setStartDate("");
              setMember(null);
              setMembers([]);
              setError("");
            }}
          />
        );
      case "address":
        return (
          <GetMemberByAddressSearch
            member={member}
            members={members}
            error={error}
            onBack={() => {
              setSearchCompleted(false);
              setName("");
              setAddress("");
              setPhoneNumber("");
              setEmail("");
              setStartDate("");
              setMember(null);
              setMembers([]);
              setError("");
            }}
          />
        );
      case "phoneNumber":
        return (
          <GetMemberByPhoneNumberSearch
            member={member}
            members={members}
            error={error}
            onBack={() => {
              setSearchCompleted(false);
              setName("");
              setAddress("");
              setPhoneNumber("");
              setEmail("");
              setStartDate("");
              setMember(null);
              setMembers([]);
              setError("");
            }}
          />
        );
      case "email":
        return (
          <GetMemberByEmailAddressSearch
            member={member}
            members={members}
            error={error}
            onBack={() => {
              setSearchCompleted(false);
              setName("");
              setAddress("");
              setPhoneNumber("");
              setEmail("");
              setStartDate("");
              setMember(null);
              setMembers([]);
              setError("");
            }}
          />
        );
      case "startDate":
        return (
          <GetMemberByStartDateSearch
            member={member}
            members={members}
            error={error}
            onBack={() => {
              setSearchCompleted(false);
              setName("");
              setAddress("");
              setPhoneNumber("");
              setEmail("");
              setStartDate("");
              setMember(null);
              setMembers([]);
              setError("");
            }}
          />
        );
      default:
        return <p>No view implemented for this search type.</p>;
    }
  }

  return (
    <div className="tournament-search-container">
      <div className="intro-box">
        <h2>Welcome to the Member Directory!</h2>
        <p>Here you can search for members based on various criteria.</p>
        <p>Select an option from the dropdown below to begin your search.</p>
        <img
                        src={homePic}
                        alt="Golf member"
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
            <option value="name">Search by Name</option>
            <option value="address">Search by Address</option>
            <option value="phoneNumber">Search by Phone Number</option>
            <option value="email">Search by Email Address</option>
            <option value="startDate">Search by Start Date</option>
          </select>
        </div>

        {/* Show input fields based on search type */}
        {(searchType === "name" || searchType === "address" || searchType === "phoneNumber" || searchType === "email" || searchType === "startDate") && (
          <div className="tournament-card">
            <h1>
              Search Members by{" "}
              {searchType === "name"
                ? "Name"
                : searchType === "address"
                ? "Address"
                : searchType === "phoneNumber"
                ? "Phone Number"
                : searchType === "email"
                ? "Email Address"
                : "Start Date"}
            </h1>

            <div className="tournament-group">
              {searchType === "name" && (
                <input
                  type="text"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className="input-field"
                  placeholder="Enter name"
                />
              )}
              {searchType === "address" && (
                <input
                  type="text"
                  value={address}
                  onChange={(e) => setAddress(e.target.value)}
                  className="input-field"
                  placeholder="Enter address"
                />
              )}
              {searchType === "phoneNumber" && (
                <input
                  type="text"
                  value={phoneNumber}
                  onChange={(e) => setPhoneNumber(e.target.value)}
                  className="input-field"
                  placeholder="Enter phone number"
                />
              )}
              {searchType === "email" && (
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="input-field"
                  placeholder="Enter email address"
                />
              )}
              {searchType === "startDate" && (
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

export default MemberSearch;
