import { render, screen, fireEvent } from "@testing-library/react";
import GetTournamentByLocationSearch from "../../components/GetTournamentByLocationSearch";

jest.mock("../../services/api");

describe("GetTournamentByLocationSearch Component", () => {
  test("displays tournament details when a single tournament is found", () => {
    const tournament = {
      startDate: "2024-06-01",
      endDate: "2024-06-10",
      location: "Toronto, Canada",
      entryFee: 50,
      cashPrizeAmount: 1000,
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
    expect(screen.getByText("2024-06-01")).toBeInTheDocument();
    expect(screen.getByText("2024-06-10")).toBeInTheDocument();
    expect(screen.getByText("Toronto, Canada")).toBeInTheDocument();
    expect(screen.getByText("$50")).toBeInTheDocument();
    expect(screen.getByText("$1000")).toBeInTheDocument();
  });

  test("displays error message when error is passed", () => {
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

  test("calls onBack function when 'Go Back' button is clicked", () => {
    const onBackMock = jest.fn();

    render(
      <GetTournamentByLocationSearch
        tournament={null}
        tournaments={[]}
        error={null}
        onBack={onBackMock}
      />
    );

    fireEvent.click(screen.getByText("Go Back"));
    expect(onBackMock).toHaveBeenCalledTimes(1);
  });
});
