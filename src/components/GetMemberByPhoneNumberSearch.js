import React, { useState } from "react";
import { getMemberByPhoneNumber } from "../services/api"; // Adjust import path as needed

const GetMemberByPhoneNumberSearch = () => {
  const [phoneNumber, setPhoneNumber] = useState("");
  const [members, setMembers] = useState([]); // Store multiple members
  const [member, setMember] = useState(null); // Store single member
  const [error, setError] = useState("");

  const handleSearch = async () => {
    if (!phoneNumber) {
      setError("Please enter a phone number to search.");
      return;
    }

    setError("");
    const result = await getMemberByPhoneNumber(phoneNumber);

    if (result) {
      if (Array.isArray(result) && result.length > 1) {
        // If result is an array with more than one member
        setMembers(result);
        setMember(null); // Clear single member if multiple results
      } else {
        // If result is a single member
        setMember(result);
        setMembers([]); // Clear multiple members if single result
      }
    } else {
      setError("No members found with this phone number.");
      setMembers([]); // Clear members in case of no result
      setMember(null); // Clear single member in case of no result
    }
  };

  return (
    <div>
      <div className="card">
        <h1 className="heading">Search Members by Phone Number</h1>

        <div className="input-group">
          <input
            type="text"
            placeholder="Enter member phone number"
            value={phoneNumber}
            onChange={(e) => setPhoneNumber(e.target.value)}
            className="input-field"
          />
        </div>
        <div className="button-group">
          <button onClick={handleSearch} className="button">
            Search
          </button>
        </div>

        {error && <p className="error-message">{error}</p>}

        {/* Render single member details if there's only one result */}
        {member && !Array.isArray(member) && (
          <div className="member-details">
            <h2>Member Details</h2>
            <p>
              <strong>Name:</strong> {member.memberName}
            </p>
            <p>
              <strong>Email:</strong> {member.memberEmailAddress}
            </p>
            <p>
              <strong>Phone:</strong> {member.memberPhoneNumber}
            </p>
            <p>
              <strong>Address:</strong> {member.memberAddress}
            </p>
            <p>
              <strong>Start Date:</strong> {member.memberStartDate}
            </p>
            <p>
              <strong>Duration:</strong> {member.duration}
            </p>
          </div>
        )}

        {/* Render multiple members if more than one result */}
        {members.length > 0 && (
          <div className="member-details">
            <h2>Members Found</h2>
            {members.map((member, index) => (
              <div key={index} className="member-card">
                <p>
                  <strong>Name:</strong> {member.memberName}
                </p>
                <p>
                  <strong>Email:</strong> {member.memberEmailAddress}
                </p>
                <p>
                  <strong>Phone:</strong> {member.memberPhoneNumber}
                </p>
                <p>
                  <strong>Address:</strong> {member.memberAddress}
                </p>
                <p>
                  <strong>Start Date:</strong> {member.memberStartDate}
                </p>
                <p>
                  <strong>Duration:</strong> {member.duration}
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

export default GetMemberByPhoneNumberSearch;
