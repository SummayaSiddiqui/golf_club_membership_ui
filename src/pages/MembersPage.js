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
  const [errors, setErrors] = useState({});

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

  const handleBlur = (e) => {
    const { name, value } = e.target;
    if (name === "memberPhoneNumber") {
      // Validate phone number format when user leaves the input
      const phoneRegex = /^\d{3}-\d{3}-\d{4}$/;
      if (value === "000000000" || value === "") {
        setErrors((prevErrors) => ({
          ...prevErrors,
          memberPhoneNumber: "Phone number is required and must be in the format 000-000-0000.",
        }));
      } else if (!phoneRegex.test(value)) {
        setErrors((prevErrors) => ({
          ...prevErrors,
          memberPhoneNumber: "Phone number must be in the format 000-000-0000.",
        }));
      } else {
        // Remove the error if phone number is in the correct format
        setErrors((prevErrors) => {
          const { memberPhoneNumber, ...rest } = prevErrors;
          return rest;
        });
      }
    }
  };

  const validateForm = () => {
    const newErrors = {};

    // Validate phone number (must be in 000-000-0000 format)
    const phoneRegex = /^\d{3}-\d{3}-\d{4}$/;
    if (!phoneRegex.test(newMember.memberPhoneNumber)) {
      newErrors.memberPhoneNumber = "Phone number must be in the format 000-000-0000.";
    }

    // Check for email uniqueness
    const emailExists = members.some((member) => member.memberEmailAddress === newMember.memberEmailAddress);
    if (emailExists) {
      newErrors.memberEmailAddress = "Email is already taken.";
    }

    // Check for phone number uniqueness
    const phoneExists = members.some((member) => member.memberPhoneNumber === newMember.memberPhoneNumber);
    if (phoneExists) {
      newErrors.memberPhoneNumber = "Phone number is already in use.";
    }

    // If there are any errors, set them and return false
    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return false;
    }

    return true;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Validate the form first
    const isValid = validateForm();
    if (!isValid) {
      return; // Stop submission if form is invalid
    }

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
            required
          />
          <input
            type="email"
            name="memberEmailAddress"
            placeholder="Email"
            value={newMember.memberEmailAddress}
            onChange={handleInputChange}
            required
          />
          {errors.memberEmailAddress && <span className="error">{errors.memberEmailAddress}</span>}
          <input
            type="text"
            name="memberPhoneNumber"
            placeholder="Phone"
            value={newMember.memberPhoneNumber}
            onChange={handleInputChange}
            onBlur={handleBlur}
            required
          />
          {errors.memberPhoneNumber && <span className="error">{errors.memberPhoneNumber}</span>}
          <input
            type="date"
            name="memberStartDate"
            placeholder="Start Date"
            value={newMember.memberStartDate}
            onChange={handleInputChange}
            required
          />
          <input
            type="text"
            name="duration"
            placeholder="Duration"
            value={newMember.duration}
            onChange={handleInputChange}
            required
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
