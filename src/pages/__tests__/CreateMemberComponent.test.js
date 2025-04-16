import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import CreateMember from "../../components/CreateMember";
import * as api from "../../services/api";

jest.mock("../../services/api");

describe("CreateMember Component", () => {
  test("renders the form and shows the 'Add Member' button", () => {
    render(<CreateMember />);
    expect(screen.getByText("Add Member")).toBeInTheDocument();
  });

  test("shows error if required fields are empty", async () => {
    render(<CreateMember />);

    fireEvent.click(screen.getByText("Add Member"));

    fireEvent.change(screen.getByPlaceholderText("Name"), {
      target: { value: "" },
    });
    fireEvent.change(screen.getByPlaceholderText("Email Address"), {
      target: { value: "" },
    });
    fireEvent.change(screen.getByPlaceholderText("Phone Number"), {
      target: { value: "" },
    });
    fireEvent.change(screen.getByPlaceholderText("Address"), {
      target: { value: "" },
    });
    fireEvent.change(screen.getByLabelText("Start Date"), {
      target: { value: "" },
    });
    fireEvent.change(screen.getByPlaceholderText("Duration"), {
      target: { value: "" },
    });

    fireEvent.click(screen.getByText("Create Member"));

    await waitFor(() =>
      expect(
        screen.getByText("All input fields are required!")
      ).toBeInTheDocument()
    );
  });

  test("shows error if email or phone already exists", async () => {
    api.getMembers.mockResolvedValue([
      {
        memberName: "John Doe",
        memberAddress: "123 Maple Street, Toronto",
        memberEmailAddress: "johndoe1@email.com",
        memberPhoneNumber: "647-555-1234",
        memberStartDate: "2024-01-10",
        duration: "1 year",
      },
    ]);

    render(<CreateMember />);

    fireEvent.click(screen.getByText("Add Member"));

    fireEvent.change(screen.getByPlaceholderText("Name"), {
      target: { value: "John Doe" },
    });
    fireEvent.change(screen.getByPlaceholderText("Email Address"), {
      target: { value: "johndoe1@email.com" },
    });
    fireEvent.change(screen.getByPlaceholderText("Phone Number"), {
      target: { value: "647-555-1234" },
    });
    fireEvent.change(screen.getByPlaceholderText("Address"), {
      target: { value: "123 Maple Street, Toronto" },
    });
    fireEvent.change(screen.getByLabelText("Start Date"), {
      target: { value: "2024-01-10" },
    });
    fireEvent.change(screen.getByPlaceholderText("Duration"), {
      target: { value: "1 year" },
    });

    fireEvent.click(screen.getByText("Create Member"));

    await waitFor(() =>
      expect(
        screen.getByText("Email already exists.")
      ).toBeInTheDocument()
    );
  });
});
