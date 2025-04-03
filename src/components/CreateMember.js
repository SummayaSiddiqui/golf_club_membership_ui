import React, { useState } from "react";
import { createMember } from "../services/api";
import { getMembers } from "../services/api";
import { useNavigate } from "react-router-dom";

const CreateMember = () => {
  const [member, setMember] = useState({
    memberName: "",
    memberEmailAddress: "",
    memberPhoneNumber: "",
    memberAddress: "",
    memberStartDate: "",
    duration: "",
  });
  const [error, setError] = useState("");
  const [message, setMessage] = useState("");
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setMember((prevMember) => ({
      ...prevMember,
      [name]: value,
    }));
  };

  const validateSubmission = async () => {
    const emptyFields =
      member.memberName.trim() === "" ||
      member.memberAddress.trim() === "" ||
      member.memberEmailAddress.trim() === "" ||
      member.memberPhoneNumber.trim() === "" ||
      member.memberStartDate.trim() === "" ||
      member.duration.trim() === "";
      if (emptyFields){
        setError("All input fields are required!")
      }
      else{
    setError(""); // Reset error before validation
    const members = await getMembers();

    if (!members) {
      setError("Error fetching members.");
      return false;
    }

    const duplicate = members.find(
      (m) =>
        m.memberName.toLowerCase() === member.memberName.toLowerCase() ||
        m.memberEmailAddress.toLowerCase() ===
          member.memberEmailAddress.toLowerCase() ||
        m.memberPhoneNumber === member.memberPhoneNumber
    );

    if (duplicate) {
      if (
        duplicate.memberName.toLowerCase() === member.memberName.toLowerCase()
      ) {
        setError("Name already exists.");
      } else if (
        duplicate.memberEmailAddress.toLowerCase() ===
        member.memberEmailAddress.toLowerCase()
      ) {
        setError("Email already exists.");
      } else {
        setError("Phone already exists.");
      }
      return false;
    }

    return true;}
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    setError("");
    setMessage("");

    const isValid = await validateSubmission();
    if (!isValid) return;
    if (isValid) {
      const result = await createMember(member);
      console.log(result);

      if (result) {
        setMessage("Member created successfully!");
        setMember({
          memberName: "",
          memberEmailAddress: "",
          memberPhoneNumber: "",
          memberAddress: "",
          memberStartDate: "",
          duration: "",
        });

        navigate("/members");
      }
    }
    return;
  };

  return (
    <div>
      <div className="card">
        <h2 className="heading">Add Member</h2>

        <form onSubmit={handleSubmit}>
          <div className="input-group">
            <input
              type="text"
              name="memberName"
              value={member.memberName}
              onChange={handleChange}
              placeholder="Name"
              className="input-field"
            />
          </div>

          <div className="input-group">
            <input
              type="email"
              name="memberEmailAddress"
              value={member.memberEmailAddress}
              onChange={handleChange}
              placeholder="Email Address"
              className="input-field"
            />
          </div>

          <div className="input-group">
            <input
              type="text"
              name="memberPhoneNumber"
              value={member.memberPhoneNumber}
              onChange={handleChange}
              placeholder="Phone Number"
              className="input-field"
            />
          </div>

          <div className="input-group">
            <input
              type="text"
              name="memberAddress"
              value={member.memberAddress}
              onChange={handleChange}
              placeholder="Address"
              className="input-field"
            />
          </div>

          <div className="input-group">
            <input
              type="date"
              name="memberStartDate"
              value={member.memberStartDate}
              onChange={handleChange}
              className="input-field"
            />
          </div>

          <div className="input-group">
            <input
              type="text"
              name="duration"
              value={member.duration}
              onChange={handleChange}
              placeholder="Duration"
              className="input-field"
            />
          </div>

          <div className="button-group">
            <button type="submit" className="button">
              Create Member
            </button>
          </div>
        </form>

        {error && <p className="error-message">{error}</p>}
        {message && <p className="success-message">{message}</p>}
      </div>
    </div>
  );
};
export default CreateMember;
