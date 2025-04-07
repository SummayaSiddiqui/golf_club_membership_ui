import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { getTournaments } from "../services/api";

const TournamentsPage = () => {
  const [tournaments, setTournaments] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showForm, setShowForm] = useState(false);
  const [allMembers, setAllMembers] = useState([]);
  const [selectedMembers, setSelectedMembers] = useState([]);

  const [newTournament, setNewTournament] = useState({
    startDate: "",
    endDate: "",
    location: "",
    entryFee: "",
    cashPrizeAmount: ""
  });

  useEffect(() => {
    const fetchTournaments = async () => {
      setLoading(true); // Set loading before fetching
      try {
        const data = await getTournaments();
        setTournaments(data);
      } catch (error) {
        console.error("Error fetching tournaments:", error);
      } finally {
        setLoading(false); // Set loading false after fetch
      }
    };

    fetchTournaments();
  }, []); // Empty dependency array to fetch tournaments once when the component mounts

  useEffect(() => {
    const fetchMembers = async () => {
      setLoading(true); // Set loading before fetching
      try {
        const response = await fetch("http://localhost:8080/api/members/allMembers");
        const data = await response.json();

        console.log("Fetched Members:", data); // Ensure all required fields are present
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
    setNewTournament({ ...newTournament, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

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

  return (
    <div className="participants-container">
      <h1>Tournaments</h1>

      <button className="toggle-form-btn" onClick={() => setShowForm(!showForm)}>
        {showForm ? "Hide Form" : "Add New Tournament"}
      </button>

      {showForm && (
        <form className="tournament-form" onSubmit={handleSubmit}>
          <input
            type="date"
            name="startDate"
            value={newTournament.startDate}
            onChange={handleInputChange}
            placeholder="Start Date"
            required
          />
          <input
            type="date"
            name="endDate"
            value={newTournament.endDate}
            onChange={handleInputChange}
            placeholder="End Date"
            required
          />
          <input
            type="text"
            name="location"
            value={newTournament.location}
            onChange={handleInputChange}
            placeholder="Location"
            required
          />
          <input
            type="number"
            name="entryFee"
            value={newTournament.entryFee}
            onChange={handleInputChange}
            placeholder="Entry Fee"
            required
          />
          <input
            type="number"
            name="cashPrizeAmount"
            value={newTournament.cashPrizeAmount}
            onChange={handleInputChange}
            placeholder="Cash Prize"
            required
          />

          {/* Add Members Dropdown */}
          <div className="member-select">
            <label>Add Members (max 5):</label>
            <select
              onChange={(e) => {
                const selectedId = Number(e.target.value); // Convert to number
                if (
                  selectedId &&
                  !selectedMembers.find((member) => member.id === selectedId) &&
                  selectedMembers.length < 5
                ) {
                  const selected = allMembers.find((member) => member.id === selectedId);
                  if (selected) {
                    console.log("Adding Member:", selected);
                    setSelectedMembers((prevMembers) => [...prevMembers, selected]);
                  }
                }
                e.target.value = ""; // Reset dropdown
              }}
            >
              <option value="">-- Select Member --</option>
              {allMembers.map((member) => (
                <option key={member.id} value={member.id}>
                  {member.memberName}
                </option>
              ))}
            </select>
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
