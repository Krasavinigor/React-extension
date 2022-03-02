import React from "react";
import { render, screen } from "@testing-library/react";
import ReactionMessage from "./ReactionMessage";
import { EFooterState } from "../common/EFooterState";
import constants from "@/resources/constants";

test("renders the ReactionMessage", () => {
  // Act
  const { container } = render(<ReactionMessage state={EFooterState.Error} />);

  // Assert
  expect(container.firstChild).not.toBeNull();
  expect(screen.getByText(`${constants.reactionMessage.error}`)).toBeInTheDocument();
  expect(screen.getByAltText("reaction")).toBeInTheDocument();
  expect(container.firstChild).toBeVisible();
});
