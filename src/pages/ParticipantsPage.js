import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { getMembersInTournament } from "../services/api";
import { FaUserCircle } from "react-icons/fa"; // Import the icon

const ParticipantsPage = () => {
  const { id } = useParams();
  const [members, setMembers] = useState([]);
  const [loading, setLoading] = useState(true);

useEffect(() => {
  const fetchMembers = async () => {
    try {
      const data = await getMembersInTournament(id);
      console.log("Fetched members:", data);

      // Log individual member details to ensure the correct field
      data.forEach((member, index) => {
        console.log(`Member ${index + 1}:`, member);  // Log the entire member object
      });

      setMembers(data);
    } catch (error) {
      console.error("Error fetching members:", error);
    } finally {
      setLoading(false);
    }
  };

  fetchMembers();
}, [id]);

  return (
    <div style={{ padding: "20px" }}>
      <h1>Participants for Tournament {id}</h1>
      {loading ? (
        <p>Loading participants...</p>
      ) : members.length > 0 ? (
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
                        <strong>Membership duration:</strong> {member.duration}
                      </li>
                    </div>
                  ))
                ) : (
                  <p>No members available.</p>
                )}
              </ul>
      ) : (
        <p>No participants found.</p>
      )}
    </div>
  );
};

export default ParticipantsPage;
