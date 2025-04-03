import React, { useState } from "react";
import { getMemberByStartDate } from "../services/api";

const GetMemberByStartDateSearch = () => {
  const [startDate, setStartDate] = useState("");
  const [members, setMembers] = useState([]);
  const [member, setMember] = useState(null);
  const [error, setError] = useState("");

  const handleSearch = async () => {
    if (!startDate) {
      setError("Please enter a start date to search.");
      return;
    }

    setError("");
    const result = await getMemberByStartDate(startDate);

    if (result && result.length > 0) {
      if (result.length === 1) {
        setMember(result[0]);
        setMembers([]);
      } else {
        setMembers(result);
        setMember(null);
      }
    } else {
      setError("No members found with this start date.");
      setMembers([]);
      setMember(null);
    }
  };

  return (
    <div>
      <div className="card">
        <h1 className="heading">Search Members by Start Date</h1>

        <div className="input-group">
          <input
            type="date"
            value={startDate}
            onChange={(e) => setStartDate(e.target.value)}
            className="input-field"
          />
        </div>
        <div className="button-group">
          <button onClick={handleSearch} className="button">
            Search
          </button>
        </div>

        {error && <p className="error-message">{error}</p>}

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

export default GetMemberByStartDateSearch;
