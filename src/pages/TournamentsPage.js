import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { getTournaments } from "../services/api";

const TournamentsPage = () => {
  const [tournaments, setTournaments] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showForm, setShowForm] = useState(false);
  const [allMembers, setAllMembers] = useState([]);
  const [selectedMembers, setSelectedMembers] = useState([]);
  const [errors, setErrors] = useState({});
  const [touchedFields, setTouchedFields] = useState({});

  const [newTournament, setNewTournament] = useState({
    startDate: "",
    endDate: "",
    location: "",
    entryFee: "",
    cashPrizeAmount: ""
  });

  useEffect(() => {
    const fetchTournaments = async () => {
      setLoading(true);
      try {
        const data = await getTournaments();
        setTournaments(data);
      } catch (error) {
        console.error("Error fetching tournaments:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchTournaments();
  }, []);

  useEffect(() => {
    const fetchMembers = async () => {
      setLoading(true);
      try {
        const response = await fetch("http://localhost:8080/api/members/allMembers");
        const data = await response.json();

        console.log("Fetched Members:", data);
        setAllMembers(data);
      } catch (error) {
        console.error("Error fetching members:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchMembers();
  }, []);

  const handleInputChange = (e) => {
    const { name, value } = e.target;

    setNewTournament((prev) => ({
      ...prev,
      [name]: value,
    }));

    // When the start date is updated, validate it against today's date
    if (name === "startDate") {
      const todayStr = new Date().toISOString().split("T")[0];
      if (new Date(value) < new Date(todayStr)) {
        setErrors((prevErrors) => ({
          ...prevErrors,
          startDate: "Start date cannot be in the past.",
        }));
      } else {
        setErrors((prevErrors) => ({
          ...prevErrors,
          startDate: "",  // Clear the error
        }));
      }
    }

    // Check end date only if it's available, and compare with start date
    if (name === "endDate" && newTournament.startDate) {
      const startDateObj = new Date(newTournament.startDate);
      const endDateObj = new Date(value);
      if (startDateObj > endDateObj) {
        setErrors((prevErrors) => ({
          ...prevErrors,
          endDate: "End date must not be earlier than the start date.",
        }));
      } else {
        setErrors((prevErrors) => ({
          ...prevErrors,
          endDate: "",  // Clear the error
        }));
      }
    }
  };

  const handleBlur = (e) => {
    const { name, value } = e.target;
    const { startDate, endDate } = newTournament;
    const newErrors = { ...errors };
    setTouchedFields((prevTouched) => ({
        ...prevTouched,
        [name]: true,
      }));

    if (name === "startDate") {
      if (!value) {
        newErrors.startDate = "Start date is required.";
      } else {
        const todayStr = new Date().toISOString().split("T")[0];
        const selectedStartStr = new Date(value).toISOString().split("T")[0];
        if (selectedStartStr < todayStr) {
          newErrors.startDate = "Start date cannot be in the past.";
        } else {
          delete newErrors.startDate;
        }
      }

      if (endDate && new Date(value) > new Date(endDate)) {
        newErrors.endDate = "End date must not be earlier than the start date.";
      } else {
        delete newErrors.endDate;
      }
    }

    if (name === "endDate") {
      if (!value) {
        newErrors.endDate = "End date is required.";
      } else if (startDate && new Date(startDate) > new Date(value)) {
        newErrors.endDate = "End date must not be earlier than the start date.";
      } else {
        delete newErrors.endDate;
      }
    }

    if (name === "location" && !value.trim()) {
      newErrors.location = "Location is required.";
    }

    if ((name === "entryFee" || name === "cashPrizeAmount") && (!value || value < 0)) {
      newErrors[name] = "Please enter a valid amount.";
    }

    setErrors(newErrors);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const newErrors = {};

    // Other validation logic (startDate, endDate, etc.)
    const { startDate, endDate, location, entryFee, cashPrizeAmount } = newTournament;

    if (!startDate) {
      newErrors.startDate = "Start date is required.";
    } else {
      const todayStr = new Date().toISOString().split("T")[0];
      const selectedStartStr = new Date(startDate).toISOString().split("T")[0];
      if (selectedStartStr < todayStr) {
        newErrors.startDate = "Start date cannot be in the past.";
      }
    }
    if (!endDate) newErrors.endDate = "End date is required.";
    else if (new Date(startDate) > new Date(endDate)) newErrors.endDate = "End date must not be earlier than the start date.";

    if (!location.trim()) newErrors.location = "Location is required.";

    if (entryFee === "" || Number(entryFee) < 0) newErrors.entryFee = "Entry fee must be zero or more.";
    if (cashPrizeAmount === "" || Number(cashPrizeAmount) < 0) newErrors.cashPrizeAmount = "Cash prize must be zero or more.";

    // Validation for member selection
    if (selectedMembers.length === 0) {
      newErrors.selectedMembers = "Select at least one member.";
    } else if (selectedMembers.length > 5) {
      newErrors.selectedMembers = "You can select up to 5 members.";
    }

    // Set errors
    setErrors(newErrors);

    // If there are any errors, prevent form submission
    if (Object.keys(newErrors).length > 0) {
      return;
    }

    // Prepare tournament data for submission
    console.log("Selected Members Before Submission:", selectedMembers);

    const tournamentData = {
      ...newTournament,
      participatingMembers: selectedMembers.map((member) => ({
        id: member.id,
        memberName: member.memberName,
        memberAddress: member.memberAddress,
        memberEmailAddress: member.memberEmailAddress,
        memberPhoneNumber: member.memberPhoneNumber,
        memberStartDate: member.memberStartDate,
      })),
    };

    console.log("Tournament Data Sent to Backend:", tournamentData);

    try {
      const response = await fetch("http://localhost:8080/api/tournaments", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(tournamentData),
      });

      if (response.ok) {
        const data = await response.json();
        console.log("Tournament successfully added:", data);

        setTournaments((prevTournaments) => [...prevTournaments, data]);
        setNewTournament({
          startDate: "",
          endDate: "",
          location: "",
          entryFee: "",
          cashPrizeAmount: "",
        });
        setSelectedMembers([]);
        setShowForm(false);
      } else {
        console.error("Error adding tournament:", response.statusText);
      }
    } catch (error) {
      console.error("Error submitting tournament:", error);
    }
  };

  // Handle member selection and clearing errors when a member is selected
  const handleMemberSelect = (e) => {
    const selectedId = Number(e.target.value);

    if (
      selectedId &&
      !selectedMembers.find((member) => member.id === selectedId) &&
      selectedMembers.length < 5
    ) {
      const selected = allMembers.find((member) => member.id === selectedId);
      if (selected) {
        console.log("Adding Member:", selected);
        setSelectedMembers((prevMembers) => [...prevMembers, selected]);

        // Clear the selected members error once a member is selected
        setErrors((prevErrors) => {
          const updatedErrors = { ...prevErrors };
          delete updatedErrors.selectedMembers;
          return updatedErrors;
        });
      }
    }

    // Reset the dropdown selection
    e.target.value = "";
  };
  return (
    <div className="participants-container">
      <h1>Tournaments</h1>

      <button className="toggle-form-btn" onClick={() => setShowForm(!showForm)}>
        {showForm ? "Hide Form" : "Add New Tournament"}
      </button>

      {showForm && (
        <form className="tournament-form" onSubmit={handleSubmit}>
          <label htmlFor="tournamentStartDate">Tournament Start Date</label>
          <input
            type="date"
            name="startDate"
            value={newTournament.startDate}
            onChange={handleInputChange}
            onBlur={handleBlur}
            placeholder="Start Date"
            min={new Date().toISOString().split("T")[0]}
            required
          />
          {touchedFields.startDate && errors.startDate && (
            <p className="error">{errors.startDate}</p>
          )}
          <label htmlFor="tournamentEndDate">Tournament End Date</label>
          <input
            type="date"
            name="endDate"
            value={newTournament.endDate}
            onChange={handleInputChange}
            onBlur={handleBlur}
            placeholder="End Date"
            min={
              newTournament.startDate
                ? new Date(new Date(newTournament.startDate).getTime() + 86400000)
                    .toISOString()
                    .split("T")[0]
                : ""
            }
            required
          />
          {touchedFields.endDate && errors.endDate && (
            <p className="error">{errors.endDate}</p>
          )}
          <input
            type="text"
            name="location"
            value={newTournament.location}
            onChange={handleInputChange}
            placeholder="Location"
            required
          />
          {errors.location && <p className="error">{errors.location}</p>}
          <input
            type="number"
            name="entryFee"
            value={newTournament.entryFee}
            onChange={handleInputChange}
            placeholder="Entry Fee"
            required
          />
          {errors.entryFee && <p className="error">{errors.entryFee}</p>}
          <input
            type="number"
            name="cashPrizeAmount"
            value={newTournament.cashPrizeAmount}
            onChange={handleInputChange}
            placeholder="Cash Prize"
            required
          />
          {errors.cashPrizeAmount&& <p className="error">{errors.cashPrizeAmount}</p>}

          {/* Add Members Dropdown */}
          <div className="member-select">
                <label>Add Members (max 5):</label>
                <select onChange={handleMemberSelect}>
                  <option value="">-- Select Member --</option>
                  {allMembers.map((member) => (
                    <option key={member.id} value={member.id}>
                      {member.memberName}
                    </option>
                  ))}
                </select>
                {errors.selectedMembers && (
                  <div className="error-message">{errors.selectedMembers}</div>
                )}
              </div>
          {/* Display Selected Members */}
          <div className="selected-members-display">
            <h3>Selected Members:</h3>
            <ul>
              {selectedMembers.length > 0 ? (
                selectedMembers.map((member, index) => (
                  <li key={member.id}>
                    {index + 1}. {member.memberName}
                  </li>
                ))
              ) : (
                <p>No members selected.</p>
              )}
            </ul>
          </div>

          {/* Submit Button */}
          <button type="submit">Submit</button>
        </form>
      )}

      {loading ? (
        <p className="loading-message">
          Hang on for a minute, we are working on getting the tournament info for you !!
        </p>
      ) : tournaments.length > 0 ? (
        <table className="tournament-table">
          <thead>
            <tr>
              <th>ID</th>
              <th>Start Date</th>
              <th>End Date</th>
              <th>Location</th>
              <th>Entry Fee</th>
              <th>Cash Prize</th>
              <th>Participants</th>
            </tr>
          </thead>
          <tbody>
            {tournaments.map((tournament) => (
              <tr key={tournament.id}>
                <td>{tournament.id}</td>
                <td>{tournament.startDate}</td>
                <td>{tournament.endDate}</td>
                <td>{tournament.location}</td>
                <td>${tournament.entryFee}</td>
                <td>${tournament.cashPrizeAmount}</td>
                <td>
                  <Link
                    to={`/tournaments/${tournament.id}/participants`}
                    className="view-link"
                  >
                    View Participants
                  </Link>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      ) : (
        <p>No tournaments available.</p>
      )}
    </div>
  );
};

export default TournamentsPage;
