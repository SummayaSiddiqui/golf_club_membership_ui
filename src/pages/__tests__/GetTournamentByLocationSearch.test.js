import { render, screen } from "@testing-library/react";
import GetTournamentByLocationSearch from "../../components/GetTournamentByLocationSearch";

jest.mock("../../services/api");

describe("GetTournamentByLocationSearch Component", () => {
  test("displays tournament details when a single tournament is found", async () => {
    const tournament = {
      startDate: "2024-05-01",
      endDate: "2024-05-10",
      location: "New York, USA",
      entryFee: 100,
      cashPrizeAmount: 2000,
    };

    render(
      <GetTournamentByLocationSearch
        tournament={tournament}
        tournaments={[]}
        error={null}
        onBack={jest.fn()}
      />
    );

    expect(screen.getByText("Tournament Details")).toBeInTheDocument();
    expect(screen.getByText("2024-05-01")).toBeInTheDocument();
    expect(screen.getByText("2024-05-10")).toBeInTheDocument();
    expect(screen.getByText("New York, USA")).toBeInTheDocument();
    expect(screen.getByText("$100")).toBeInTheDocument();
    expect(screen.getByText("$2000")).toBeInTheDocument();
  }); // <-- This was missing!

  test("displays list of tournaments when multiple tournaments are found", async () => {
    const tournaments = [
      {
        startDate: "2024-05-01",
        endDate: "2024-05-10",
        location: "New York, USA",
        entryFee: 100,
        cashPrizeAmount: 2000,
      },
      {
        startDate: "2024-06-01",
        endDate: "2024-06-10",
        location: "New York, USA",
        entryFee: 120,
        cashPrizeAmount: 1000,
      },
    ];

    render(
      <GetTournamentByLocationSearch
        tournament={null}
        tournaments={tournaments}
        error={null}
        onBack={jest.fn()}
      />
    );

    expect(screen.getByText("Tournaments Found")).toBeInTheDocument();
    const locations = screen.getAllByText("New York, USA");
    expect(locations).toHaveLength(2);
  });

  test("displays error message when error is passed", async () => {
    const errorMessage = "No tournaments found for this location";

    render(
      <GetTournamentByLocationSearch
        tournament={null}
        tournaments={[]}
        error={errorMessage}
        onBack={jest.fn()}
      />
    );

    expect(
      screen.getByText("No tournaments found for this location")
    ).toBeInTheDocument();
  });
});
