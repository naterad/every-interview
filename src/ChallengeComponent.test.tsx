import { render, screen, within } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { describe, it, expect } from "vitest";
import { ChallengeComponent, COLUMNS } from "./ChallengeComponent";

const firstColumn = COLUMNS[0];
const middleColumn = COLUMNS[1];
const lastColumn = COLUMNS[COLUMNS.length - 1];

describe("ChallengeComponent", () => {
  it("renders all column headings", () => {
    render(<ChallengeComponent />);
    COLUMNS.forEach((col) => {
      expect(screen.getByText(col.title)).toBeInTheDocument();
    });
  });

  it("adds a new todo to the first column", async () => {
    const user = userEvent.setup();
    render(<ChallengeComponent />);

    await user.type(screen.getByPlaceholderText("Add Task"), "My new task");
    await user.click(screen.getByRole("button", { name: /add task/i }));

    const column = screen.getByText(firstColumn.title).closest("div")!;
    expect(within(column).getByText("My new task")).toBeInTheDocument();
  });

  it("moves a todo to the next column when the right arrow is clicked", async () => {
    const user = userEvent.setup();
    render(<ChallengeComponent />);

    await user.type(screen.getByPlaceholderText("Add Task"), "My task");
    await user.click(screen.getByRole("button", { name: /add task/i }));

    await user.click(screen.getByRole("button", { name: "Move right" }));

    const column = screen.getByText(middleColumn.title).closest("div")!;
    expect(within(column).getByText("My task")).toBeInTheDocument();
  });

  it("does not add a todo when the input is empty", async () => {
    const user = userEvent.setup();
    render(<ChallengeComponent />);

    await user.click(screen.getByRole("button", { name: /add task/i }));

    const column = screen.getByText(firstColumn.title).closest("div")!;
    expect(within(column).queryAllByRole("listitem")).toHaveLength(0);
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

    // Move to the last column
    for (let i = 0; i < COLUMNS.length - 1; i++) {
      await user.click(screen.getByRole("button", { name: "Move right" }));
    }

    expect(screen.getByRole("button", { name: "Move right" })).toBeDisabled();
  });
});
