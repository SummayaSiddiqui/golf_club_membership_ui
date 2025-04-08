import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { getMembers } from "../services/api";

const MembersPage = () => {
  const [members, setMembers] = useState([]);
  const [showForm, setShowForm] = useState(false);
  const [newMember, setNewMember] = useState({
    memberName: "",
    address: "",
    email: "",
    phone: "",
    startDate: "",
  });

  useEffect(() => {
    const fetchMembers = async () => {
      try {
        const data = await getMembers();
        setMembers(data);
      } catch (error) {
        console.error("Error fetching members:", error);
      }
    };

    fetchMembers();
  }, []);

  const handleAddMember = (e) => {
    e.preventDefault();
    // You can later POST to your API here
    console.log("New Member Data:", newMember);
    setNewMember({
      memberName: "",
      address: "",
      email: "",
      phone: "",
      startDate: "",
    });
    setShowForm(false);
  };

  const handleChange = (e) => {
    setNewMember({ ...newMember, [e.target.name]: e.target.value });
  };

  return (
    <div className="participants-container">
      <h1>Members</h1>

      <button className="toggle-form-btn" onClick={() => setShowForm(!showForm)}>
        {showForm ? "Hide Form" : "Add New Member"}
      </button>

      {showForm && (
        <form className="tournament-form" onSubmit={handleAddMember}>
          <input
            type="text"
            name="memberName"
            placeholder="Member Name"
            value={newMember.memberName}
            onChange={handleChange}
            required
          />
          <input
            type="text"
            name="address"
            placeholder="Address"
            value={newMember.address}
            onChange={handleChange}
          />
          <input
            type="email"
            name="email"
            placeholder="Email"
            value={newMember.email}
            onChange={handleChange}
          />
          <input
            type="text"
            name="phone"
            placeholder="Phone"
            value={newMember.phone}
            onChange={handleChange}
          />
          <input
            type="date"
            name="startDate"
            placeholder="Start Date"
            value={newMember.startDate}
            onChange={handleChange}
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