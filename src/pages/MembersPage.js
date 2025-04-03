import React, { useEffect, useState } from "react";
import { getMembers } from "../services/api";
import { FaUserCircle } from "react-icons/fa";
import CreateMember from "../components/CreateMember";

const MembersPage = () => {
  const [members, setMembers] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchMembers = async () => {
      try {
        const data = await getMembers();
        setMembers(data);
      } catch (error) {
        console.error("Error fetching members:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchMembers();
  }, []);

  return (
    <div className="members-container">
      <h1>Members</h1>
      {loading ? (
        <p className="loading-message">
          Hang on for a minute, we are working on getting the members info for
          you !!
        </p>
      ) : (
        <div>
          {" "}
          <CreateMember />
          <ul className="members-list">
            {members.length > 0 ? (
              members.map((member, index) => (
                <div className="memberInfo-box">
                  <FaUserCircle className="member-icon" />
                  <li key={index} className="memberName-bar">
                    <br />
                    <strong>Name:</strong> {member.memberName}
                    <br />
                    <strong>Address:</strong> {member.memberAddress}, <br />
                    <strong>Email:</strong> {member.memberEmailAddress} <br />{" "}
                    <strong>Phone:</strong> {member.memberPhoneNumber} <br />{" "}
                    <strong>Member since:</strong> {member.memberStartDate}
                    <br />
                    <strong>Mambership duration:</strong> {member.duration}
                  </li>
                </div>
              ))
            ) : (
              <p>No members available.</p>
            )}
          </ul>
        </div>
      )}
    </div>
  );
};

export default MembersPage;
