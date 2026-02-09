import { render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";

import Page from "./page";

describe("IndexPage Accessibility", () => {
  it("should render the page title", () => {
    render(<Page />);
    const titleElement = screen.getByRole("heading", {
      level: 1,
      name: "Yet another SWAPI App",
    });
    expect(titleElement).toBeInTheDocument();
  });
});
