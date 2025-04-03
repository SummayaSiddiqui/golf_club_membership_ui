import React, { useState } from "react";
import { getMemberByAddress } from "../services/api"; 

const GetMemberByAddressSearch = () => {
  const [address, setAddress] = useState("");
  const [members, setMembers] = useState([]); 
  const [member, setMember] = useState(null); 
  const [error, setError] = useState("");

  const handleSearch = async () => {
    if (!address) {
      setError("Please enter an address to search.");
      return;
    }

    setError("");
    const result = await getMemberByAddress(address);

    if (result) {
      if (Array.isArray(result) && result.length > 1) {
       
        setMembers(result);
        setMember(null); 
      } else {
       
        setMember(result);
        setMembers([]);
      }
    } else {
      setError("No members found at this address.");
      setMembers([]); 
      setMember(null);
    }
  };

  return (
    <div>
      <div className="card">
        <h1 className="heading">Search Members by Address</h1>

        <div className="input-group">
          <input
            type="text"
            placeholder="Enter member address"
            value={address}
            onChange={(e) => setAddress(e.target.value)}
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

export default GetMemberByAddressSearch;
