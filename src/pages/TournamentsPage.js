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
    <div>
      <h1>Tournaments</h1>
      <ul>
        {tournaments.length > 0 ? (
          tournaments.map((tournament, index) => (
            <li key={index}>
                Tournament {tournament.id || "No id available"}
            </li>
          ))
        ) : (
          <p>No tournaments available.</p>
        )}
      </ul>
    </div>
  );
};

export default TournamentsPage;
