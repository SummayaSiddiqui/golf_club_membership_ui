import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { getMembersInTournament } from "../services/api";
import { FaUserCircle } from "react-icons/fa";

const ParticipantsPage = () => {
  const { id } = useParams();
  const [members, setMembers] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchMembers = async () => {
      try {
        const data = await getMembersInTournament(id);
        console.log("Fetched members:", data);
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
  <div className="page-container">
    <h1>Participants for Tournament {id}</h1>
    {loading ? (
      <p>Loading participants...</p>
    ) : members.length > 0 ? (
      <div className="participants-container">
        <div className="participants-row first-row">
          {members.slice(0, 3).map((member, index) => (
            <div key={index} className="participantInfo-box">
              <FaUserCircle className="member-icon" />
              <div className="separator"></div>
              <div className="member-details">
                <p><strong>Name:</strong> {member.memberName}</p>
                <button className="view-details-btn" onClick={() => window.location.href = `/member/${member.id}`}>
                  View Details
                </button>
              </div>
            </div>
          ))}
        </div>

        <div className="participants-row second-row">
          {members.slice(3, 5).map((member, index) => (
            <div key={index} className="participantInfo-box">
              <FaUserCircle className="member-icon" />
              <div className="separator"></div>
              <div className="member-details">
                <p><strong>Name:</strong> {member.memberName}</p>
                <button className="view-details-btn" onClick={() => window.location.href = `/member/${member.id}`}>
                  View Details
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    ) : (
      <p>No participants found.</p>
    )}
  </div>
);
};

export default ParticipantsPage;
