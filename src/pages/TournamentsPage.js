import { useEffect, useState } from "react";
import { getTournaments } from "../services/api";

const TournamentsPage = () => {
  const [tournaments, setTournaments] = useState([]);

  useEffect(() => {
    const fetchTournaments = async () => {
      try {
        const data = await getTournaments();
        console.log("Fetched tournaments:", data);
        setTournaments(data);
      } catch (error) {
        console.error("Error fetching tournaments:", error);
      }
    };

    fetchTournaments();
  }, []);

  return (
    <div style={{ padding: "20px" }}>
      <h1>Tournaments</h1>
      {tournaments.length > 0 ? (
        <table className="tournament-table">
          <thead>
            <tr>
              <th>ID</th>
              <th>Start Date</th>
              <th>End Date</th>
              <th>Location</th>
              <th>Entry Fee</th>
              <th>Cash Prize</th>
              {/* <th>Participating Members</th> */}
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
                {/* <td>
                  <ul style={{ paddingLeft: "20px", margin: 0 }}>
                    {tournament.participatingMembers?.length > 0 ? (
                      tournament.participatingMembers.map((member, index) => (
                        <li key={index}>{member.memberName}</li>
                      ))
                    ) : (
                      <li>No members</li>
                    )}
                  </ul>
                </td> */}
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
