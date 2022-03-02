import React from "react";
import { render, screen } from "@testing-library/react";
import Header from "./Header";

test("renders the Header", () => {
  // Act
  const { container } = render(<Header />);

  // Assert
  expect(container.firstChild).not.toBeNull();
  expect(screen.getByText(/Recruiter/i)).toBeInTheDocument();
});
