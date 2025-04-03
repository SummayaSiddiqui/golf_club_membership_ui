import { useEffect, useState } from "react";
import { getTournaments } from "../services/api";

const TournamentsPage = () => {
  const [tournaments, setTournaments] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchTournaments = async () => {
      try {
        const data = await getTournaments();
        console.log("Fetched tournaments:", data);
        setTournaments(data);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching tournaments:", error);
        setLoading(false);
      }
    };

    fetchTournaments();
  }, []);

  return (
    <div style={{ padding: "20px" }}>
      <h1>Tournaments</h1>
      {loading ? (
        <p className="loading-message">
          Hang on for a minute, we are working on getting the tournament info
          for you !!
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
