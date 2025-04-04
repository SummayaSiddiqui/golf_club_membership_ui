import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { getTournaments } from "../services/api";
import TournamentSearch from "./TournamentSearch";

const TournamentsPage = () => {
  const [tournaments, setTournaments] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");
  const [searchCriterion, setSearchCriterion] = useState("location");

  useEffect(() => {
    const fetchTournaments = async () => {
      try {
        const data = await getTournaments();
        console.log("Fetched tournaments:", data);
        setTournaments(data);
      } catch (error) {
        console.error("Error fetching tournaments:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchTournaments();
  }, []);

  const handleSearchTermChange = (term) => {
    setSearchTerm(term);
  };

  const handleCriterionChange = (criterion) => {
    setSearchCriterion(criterion);
    setSearchTerm(""); // Reset search term when criterion changes
  };

  const filteredTournaments = tournaments.filter((tournament) => {
    switch (searchCriterion) {
      case "startDate":
        return tournament.startDate.includes(searchTerm);
      case "endDate":
        return tournament.endDate.includes(searchTerm);
      case "location":
        return tournament.location.toLowerCase().includes(searchTerm.toLowerCase());
      case "players":
        return tournament.players && tournament.players.length >= Number(searchTerm);
      default:
        return tournament;
    }
  });

  return (
    <div>
      {/* Tournament Search Component Below Navbar */}
      <TournamentSearch
        searchCriterion={searchCriterion}
        onSearchChange={handleSearchTermChange}
        onCriterionChange={handleCriterionChange}
      />

      <div className="participants-container">
        <h1>Tournaments</h1>
        {loading ? (
          <p className="loading-message">
            Hang on for a minute, we are working on getting the tournament info
            for you !!
          </p>
        ) : filteredTournaments.length > 0 ? (
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
              {filteredTournaments.map((tournament) => (
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
          <p>No tournaments match your search.</p>
        )}
      </div>
    </div>
  );
};

export default TournamentsPage;
