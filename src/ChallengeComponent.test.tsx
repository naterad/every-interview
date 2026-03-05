import { render, screen, within } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { describe, it, expect } from "vitest";
import { ChallengeComponent } from "./ChallengeComponent";

describe("ChallengeComponent", () => {
  it("renders all three column headings", () => {
    render(<ChallengeComponent />);
    expect(screen.getByText("Todo")).toBeInTheDocument();
    expect(screen.getByText("In Progress")).toBeInTheDocument();
    expect(screen.getByText("Done")).toBeInTheDocument();
  });

  it("adds a new todo to the Todo column", async () => {
    const user = userEvent.setup();
    render(<ChallengeComponent />);

    await user.type(screen.getByPlaceholderText("Add Task"), "My new task");
    await user.click(screen.getByRole("button", { name: /add task/i }));

    const todoColumn = screen.getByText("Todo").closest("div")!;
    expect(within(todoColumn).getByText("My new task")).toBeInTheDocument();
  });

  it("moves a todo to the next column when the right arrow is clicked", async () => {
    const user = userEvent.setup();
    render(<ChallengeComponent />);

    await user.type(screen.getByPlaceholderText("Add Task"), "My task");
    await user.click(screen.getByRole("button", { name: /add task/i }));

    await user.click(screen.getByRole("button", { name: "Move right" }));

    const inProgressColumn = screen.getByText("In Progress").closest("div")!;
    expect(within(inProgressColumn).getByText("My task")).toBeInTheDocument();
  });

  it("does not add a todo when the input is empty", async () => {
    const user = userEvent.setup();
    render(<ChallengeComponent />);

    await user.click(screen.getByRole("button", { name: /add task/i }));

    const todoColumn = screen.getByText("Todo").closest("div")!;
    expect(within(todoColumn).queryAllByRole("listitem")).toHaveLength(0);
  });

  it("disables the left button when a todo is in the first column", async () => {
    const user = userEvent.setup();
    render(<ChallengeComponent />);

    await user.type(screen.getByPlaceholderText("Add Task"), "My task");
    await user.click(screen.getByRole("button", { name: /add task/i }));

    expect(screen.getByRole("button", { name: "Move left" })).toBeDisabled();
  });

  it("disables the right button when a todo is in the last column", async () => {
    const user = userEvent.setup();
    render(<ChallengeComponent />);

    await user.type(screen.getByPlaceholderText("Add Task"), "My task");
    await user.click(screen.getByRole("button", { name: /add task/i }));

    await user.click(screen.getByRole("button", { name: "Move right" }));
    await user.click(screen.getByRole("button", { name: "Move right" }));

    expect(screen.getByRole("button", { name: "Move right" })).toBeDisabled();
  });
});
