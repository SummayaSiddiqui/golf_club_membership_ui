import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { getMemberById } from "../services/api";

const MemberDetails = () => {
  const { id } = useParams();
  const [member, setMember] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchMemberDetails = async () => {
      try {
        const data = await getMemberById(id);
        console.log("Fetched member:", data);
        setMember(data);
      } catch (error) {
        console.error("Error fetching member details:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchMemberDetails();
  }, [id]);

  if (loading) return <p>Loading member details...</p>;
  if (!member) return <p>Member not found.</p>;

  return (
    <div className="member-details-container">
      <h1>{member.memberName}</h1>
      <p><strong>Email:</strong> {member.memberEmailAddress}</p>
      <p><strong>Phone:</strong> {member.memberPhoneNumber}</p>
      <p><strong>Address:</strong> {member.memberAddress}</p>
      <p><strong>Member Since:</strong> {member.memberStartDate}</p>
      <p><strong>Membership Duration:</strong> {member.duration}</p>
      <button onClick={() => window.history.back()} className="back-btn">
        Go Back
      </button>
    </div>
  );
};

export default MemberDetails;
