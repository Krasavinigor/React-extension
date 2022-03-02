import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import EditorButtons from "./EditorButtons";
import constants from "@/resources/constants";

test("Render the EditorButtons", () => {
  // Arrange
  const copyToClipBoardMock = jest.fn();

  // Act
  const { container } = render(<EditorButtons copyToClipBoard={copyToClipBoardMock} />);

  // Assert
  expect(container.firstChild).not.toBeNull();
  expect(screen.getByText(constants.editorButtons.copyButton)).toBeInTheDocument();
  // expect(screen.getByText(constants.editorButtons.addToFriendWorkButton)).toBeInTheDocument();
});

test("Copy to clipBoard is clickable", () => {
  // Arrange
  const copyToClipBoardMock = jest.fn();

  // Act
  render(<EditorButtons copyToClipBoard={copyToClipBoardMock} />);
  fireEvent.click(screen.getByText(constants.editorButtons.copyButton));

  // Assert
  expect(copyToClipBoardMock).toHaveBeenCalledTimes(1);
});
