import { render, screen, fireEvent } from "@testing-library/react";
import GetTournamentByStartDateSearch from "../../components/GetTournamentByStartDateSearch";

jest.mock("../../services/api");

describe("GetTournamentByStartDateSearch Component", () => {
  test("displays tournament details when a single tournament is found", () => {
    const tournament = {
      startDate: "2024-05-01",
      endDate: "2024-05-10",
      location: "New York, USA",
      entryFee: 100,
      cashPrizeAmount: 2000,
    };

    render(
      <GetTournamentByStartDateSearch
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
  });

  test("displays error message when error is passed", () => {
    const errorMessage = "No tournaments found for this start date";

    render(
      <GetTournamentByStartDateSearch
        tournament={null}
        tournaments={[]}
        error={errorMessage}
        onBack={jest.fn()}
      />
    );

    expect(
      screen.getByText("No tournaments found for this start date")
    ).toBeInTheDocument();
  });

  test("calls onBack function when 'Go Back' button is clicked", () => {
    const onBackMock = jest.fn();

    render(
      <GetTournamentByStartDateSearch
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
