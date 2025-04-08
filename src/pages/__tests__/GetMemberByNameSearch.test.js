import { render, screen, fireEvent } from "@testing-library/react";
import GetMemberByNameSearch from "../../components/GetMemberByNameSearch";

jest.mock("../../services/api");

describe("GetMemberByNameSearch Component", () => {
  test("displays member details when a member is found", () => {
    const member = {
      memberName: "John Doe",
      memberAddress: "123 Maple Street, Toronto",
      memberEmailAddress: "johndoe1@email.com",
      memberPhoneNumber: "647-555-1234",
      memberStartDate: "2024-01-10",
      duration: "1 year",
    };

    render(
      <GetMemberByNameSearch
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
    const errorMessage = "No members found for this name";

    render(
      <GetMemberByNameSearch
        member={null}
        members={[]}
        error={errorMessage}
        onBack={jest.fn()}
      />
    );

    expect(
      screen.getByText("No members found for this name")
    ).toBeInTheDocument();
  });

  test("calls onBack function when 'Go Back' button is clicked", () => {
    const onBackMock = jest.fn();

    render(
      <GetMemberByNameSearch
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
