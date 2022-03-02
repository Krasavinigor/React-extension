import React from "react";
import { render, screen } from "@testing-library/react";
import IPerson from "@/interfaces/IPerson";
import Person from "./Person";

test("renders the Person", () => {
  // Arrange
  const testPerson: IPerson = {
    name: "Shiva Gökçe",
    status: "HR Ivanovo Akvelon",
    imageUrl: "",
  };

  // Act
  const { container } = render(<Person {...testPerson} />);

  // Assert
  expect(container.firstChild).not.toBeNull();
  expect(screen.getByText(/Shiva Gökçe/i)).toBeInTheDocument();
  expect(screen.getByText(/HR Ivanovo Akvelon/i)).toBeInTheDocument();
});
