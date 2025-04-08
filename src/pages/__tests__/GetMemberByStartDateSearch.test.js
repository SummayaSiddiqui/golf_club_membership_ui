import { render, screen, fireEvent } from "@testing-library/react";
import GetMemberByStartDateSearch from "../../components/GetMemberByStartDateSearch";

jest.mock("../../services/api");

describe("GetMemberByStartDateSearch Component", () => {
  test("displays member details when a single member is found", () => {
    const member = {
      memberName: "John Doe",
      memberAddress: "123 Maple Street, Toronto",
      memberEmailAddress: "johndoe1@email.com",
      memberPhoneNumber: "647-555-1234",
      memberStartDate: "2024-01-10",
      duration: "1 year",
    };

    render(
      <GetMemberByStartDateSearch
        member={member}
        members={[]}
        error={null}
        onBack={jest.fn()}
      />
    );

    expect(screen.getByText("Member Details")).toBeInTheDocument();
    expect(screen.getByText("John Doe")).toBeInTheDocument();
    expect(
      screen.getByText("123 Maple Street, Toronto")
    ).toBeInTheDocument();
    expect(screen.getByText("647-555-1234")).toBeInTheDocument();
    expect(
      screen.getByText("johndoe1@email.com")
    ).toBeInTheDocument();
    expect(screen.getByText("2024-01-10")).toBeInTheDocument();
  });

  test("displays error message when error is passed", () => {
    const errorMessage = "No members found for this start date";

    render(
      <GetMemberByStartDateSearch
        member={null}
        members={[]}
        error={errorMessage}
        onBack={jest.fn()}
      />
    );

    expect(
      screen.getByText("No members found for this start date")
    ).toBeInTheDocument();
  });

  test("calls onBack function when 'Go Back' button is clicked", () => {
    const onBackMock = jest.fn();

    render(
      <GetMemberByStartDateSearch
        member={null}
        members={[]}
        error={null}
        onBack={onBackMock}
      />
    );

    fireEvent.click(screen.getByText("Go Back"));
    expect(onBackMock).toHaveBeenCalledTimes(1);
  });
});
