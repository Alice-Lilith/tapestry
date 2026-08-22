import { render, screen } from "@testing-library/react";
import { MemoryRouter } from "react-router";
import { AppHeader } from "./AppHeader";

it("renders title, children, and controls", () => {
  render(
    <MemoryRouter>
      <AppHeader
        icon="🍲"
        title="Recipes"
        theme="light"
        onToggleTheme={() => {}}
        bgStyle="grid"
        onCycleBg={() => {}}
      >
        <a href="/new">+ New</a>
      </AppHeader>
    </MemoryRouter>,
  );
  expect(screen.getByText("Recipes")).toBeInTheDocument();
  expect(screen.getByText("+ New")).toBeInTheDocument();
  expect(screen.getByText("Grid")).toBeInTheDocument();
  expect(screen.getByLabelText("Switch to dark mode")).toBeInTheDocument();
  expect(screen.getByLabelText("Settings")).toHaveAttribute("href", "/settings");
});
