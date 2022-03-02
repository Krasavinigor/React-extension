import React from "react";
import { render, screen, waitFor } from "@testing-library/react";
import chrome from "sinon-chrome/extensions";
import Footer from "./Footer";
import constants from "@/resources/constants";
import { mockMediator, mockMediatorWithEmptyList } from "@/utils/testUtils";

describe("should render Footer", () => {
  beforeAll(() => {
    global.chrome = chrome;
  });

  afterAll(() => {
    chrome.flush();
  });

  test("renders the Footer with not empty mutual connection list", async () => {
    // Arrange
    mockMediator();
    const expectedMessage: string = constants.footer.title;

    // Act
    const { container } = render(<Footer />);

    // Assert
    await waitFor(() => {
      expect(container.firstChild).not.toBeNull();
      expect(screen.getByText(`${expectedMessage}`)).toBeInTheDocument();
    });
  });

  test("renders the Footer with empty mutual recruiters list", async () => {
    // Arrange
    mockMediatorWithEmptyList();
    const expectedMessage: string = constants.reactionMessage.happy;

    // Act
    const { container } = render(<Footer />);

    // Assert
    await waitFor(() => {
      expect(container.firstChild).not.toBeNull();
      expect(screen.getByText(`${expectedMessage}`)).toBeInTheDocument();
      expect(screen.getByAltText("reaction")).toBeInTheDocument();
    });
  });
});
