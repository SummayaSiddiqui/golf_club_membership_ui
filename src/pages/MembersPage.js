import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { getMembers } from "../services/api";

const MembersPage = () => {
  const [members, setMembers] = useState([]);
  const [showForm, setShowForm] = useState(false);
  const [newMember, setNewMember] = useState({
    memberName: "",
    memberEmailAddress: "",
    memberPhoneNumber: "",
    memberAddress: "",
    memberStartDate: "",
    duration: "",
  });

  useEffect(() => {
    const fetchMembers = async () => {
      try {
        const data = await getMembers(); // Fetch members from the backend
        setMembers(data);
      } catch (error) {
        console.error("Error fetching members:", error);
      }
    };

    fetchMembers();
  }, []);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setNewMember({ ...newMember, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log("New Member Before Submission:", newMember);

    try {
      const response = await fetch("http://localhost:8080/api/members", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(newMember),
      });

      if (response.ok) {
        const data = await response.json();
        console.log("Member successfully added:", data);

        setMembers((prevMembers) => [...prevMembers, data]);
        setNewMember({
          memberName: "",
          memberAddress: "",
          memberEmailAddress: "",
          memberPhoneNumber: "",
          memberStartDate: "",
          duration: "",
        });
        setShowForm(false);
      } else {
        console.error("Error adding member:", response.statusText);
      }
    } catch (error) {
      console.error("Error submitting member:", error);
    }
  };

  return (
    <div className="participants-container">
      <h1>Members</h1>

      <button className="member-toggle-form-btn" onClick={() => setShowForm(!showForm)}>
        {showForm ? "Hide Form" : "Add New Member"}
      </button>

      {showForm && (
        <form className="member-tournament-form" onSubmit={handleSubmit}>
          <input
            type="text"
            name="memberName"
            placeholder="Member Name"
            value={newMember.memberName}
            onChange={handleInputChange}
            required
          />
          <input
            type="text"
            name="memberAddress"
            placeholder="Address"
            value={newMember.memberAddress}
            onChange={handleInputChange}
          />
          <input
            type="email"
            name="memberEmailAddress"
            placeholder="Email"
            value={newMember.memberEmailAddress}
            onChange={handleInputChange}
          />
          <input
            type="text"
            name="memberPhoneNumber"
            placeholder="Phone"
            value={newMember.memberPhoneNumber}
            onChange={handleInputChange}
          />
          <input
            type="date"
            name="memberStartDate"
            placeholder="Start Date"
            value={newMember.memberStartDate}
            onChange={handleInputChange}
          />
          <input
            type="text"
            name="duration"
            placeholder="Duration"
            value={newMember.duration}
            onChange={handleInputChange}
          />
          <button type="submit">Add Member</button>
        </form>
      )}

      <div className="member-list">
        {members.length > 0 ? (
          <table className="member-table">
            <thead>
              <tr>
                <th>Name</th>
                <th>Details</th>
              </tr>
            </thead>
            <tbody>
              {members.map((member) => (
                <tr key={member.id}>
                  <td>{member.memberName}</td>
                  <td>
                    <Link to={`/member/${member.id}`} className="view-link">
                      View Details
                    </Link>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        ) : (
          <p>No members found.</p>
        )}
      </div>
    </div>
  );
};

export default MembersPage;
