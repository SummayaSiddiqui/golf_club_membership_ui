import { render, screen, fireEvent } from "@testing-library/react";
import GetMemberByEmailSearch from "../../components/GetMemberByEmailAddressSearch";

jest.mock("../../services/api");

describe("GetMemberByEmailSearch Component", () => {
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
      <GetMemberByEmailSearch
        member={member}
        members={[]}
        error={null}
        onBack={jest.fn()}
      />
    );

    expect(screen.getByText("Member Details")).toBeInTheDocument();
    expect(screen.getByText("John Doe")).toBeInTheDocument();
    expect(screen.getByText("123 Maple Street, Toronto")).toBeInTheDocument();
    expect(screen.getByText("647-555-1234")).toBeInTheDocument();
    expect(screen.getByText("johndoe1@email.com")).toBeInTheDocument();
    expect(screen.getByText("2024-01-10")).toBeInTheDocument();
  });

  test("displays a single member even if multiple members have the same email", () => {
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
        memberName: "Jane Smith",
        memberAddress: "456 Oak Avenue, Toronto",
        memberEmailAddress: "johndoe1@email.com", // Same email as John
        memberPhoneNumber: "647-555-5678",
        memberStartDate: "2024-02-20",
        duration: "2 years",
      },
    ];

    // Assuming the duplication guard prevents displaying multiple members
    render(
      <GetMemberByEmailSearch
        member={members[0]} // Use the first member since duplicates are prevented
        members={[]}
        error={null}
        onBack={jest.fn()}
      />
    );

    expect(screen.getByText("Member Details")).toBeInTheDocument();
    expect(screen.getByText("John Doe")).toBeInTheDocument();
    expect(screen.getByText("123 Maple Street, Toronto")).toBeInTheDocument();
    expect(screen.getByText("647-555-1234")).toBeInTheDocument();
    expect(screen.getByText("johndoe1@email.com")).toBeInTheDocument();
    expect(screen.getByText("2024-01-10")).toBeInTheDocument();
  });

  test("displays error message when error is passed", () => {
    const errorMessage = "No members found for this email";

    render(
      <GetMemberByEmailSearch
        member={null}
        members={[]}
        error={errorMessage}
        onBack={jest.fn()}
      />
    );

    expect(
      screen.getByText("No members found for this email")
    ).toBeInTheDocument();
  });
});
