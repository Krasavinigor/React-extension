import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import { v4 as uuid } from "uuid";
import Template from "./Template";

test("Renders the Template", () => {
  // Arrange
  const mockFunction = jest.fn();
  const templateId = uuid();

  // Act
  const { container } = render(<Template id={templateId} title="Test template" updateSelectedItem={mockFunction} />);

  // Assert
  expect(container.firstChild).not.toBeNull();
  expect(screen.getByText(/Test template/i)).toBeInTheDocument();
});

test("Template button could be clicked with correct id", () => {
  // Arrange
  const mockFunction = jest.fn();
  const templateId = uuid();

  // Act
  render(<Template id={templateId} title="Test template" updateSelectedItem={mockFunction} />);
  fireEvent.click(screen.getByText("Test template"));

  // Assert
  expect(mockFunction).toHaveBeenCalledTimes(1);
  expect(mockFunction).toHaveBeenCalledWith(templateId);
});
