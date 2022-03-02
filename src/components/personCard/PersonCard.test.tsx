import React from "react";
import { render, screen } from "@testing-library/react";
import IPerson from "@/interfaces/IPerson";
import PersonCard from "./PersonCard";

test("renders the PersonCard", () => {
  // Arrange
  const testPerson: IPerson = {
    name: "Shiva Gökçe",
    status: "HR Ivanovo Akvelon",
    imageUrl: "",
  };

  // Act
  const { container } = render(<PersonCard person={testPerson} />);

  // Assert
  expect(container.firstChild).not.toBeNull();
  expect(screen.getByText(/Shiva Gökçe/i)).toBeInTheDocument();
});
