   import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import GetMemberByNameSearch from "../../components/GetMemberByNameSearch";

jest.mock("../../services/api");

describe("GetMemberByNameSearch Component", () => {
  test("displays member details when a single member is found", async () => {
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

  test("displays list of members when multiple members are found", async () => {
    const members = [
      {
        memberName: "John Doe",
        memberAddress: "123 Maple Street, Toronto",
        memberEmailAddress: "johndoe1@email.com",
        memberPhoneNumber: "647-555-1234",
        memberStartDate: "2024-01-10",
        duration: "1 year",
      },
      {
        memberName: "John Doe",
        memberAddress: "213 Wing Street, Toronto",
        memberEmailAddress: "doe1@email.com",
        memberPhoneNumber: "647-555-5678",
        memberStartDate: "2024-02-20",
        duration: "2 years",
      },
    ];

    render(
      <GetMemberByNameSearch
        member={null}
        members={members}
        error={null}
        onBack={jest.fn()}
      />
    );

    expect(screen.getByText("Members Found")).toBeInTheDocument();
    const johnDoes = screen.getAllByText("John Doe");
    expect(johnDoes).toHaveLength(2);
  });

  test("displays error message when error is passed", async () => {
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
});

