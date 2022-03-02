import React from "react";
import { render, waitFor } from "@testing-library/react";
import chrome from "sinon-chrome/extensions";
import App from "./App";
import { mockMediator } from "@/utils/testUtils";

describe("app component", () => {
  beforeAll(() => {
    global.chrome = chrome;
  });

  afterAll(() => {
    chrome.flush();
  });

  // TODO: Revert test skip
  test.skip("should render the app component", async () => {
    // Arrange
    mockMediator();

    // Act
    const { container } = render(<App />);

    // Assert
    await waitFor(() => {
      expect(container.firstChild).not.toBeNull();
    });
  });
});
