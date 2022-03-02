import React from "react";
import { render } from "@testing-library/react";
import chrome from "sinon-chrome/extensions";
import Main from "./Main";
import { generateListOfTemplates } from "@/utils/utils";

beforeAll(() => {
  global.chrome = chrome;
});

afterAll(() => {
  chrome.flush();
});

test("Render the Main with default state", () => {
  // Arrange
  const templates = generateListOfTemplates("Test name");

  // Act
  const { container } = render(<Main templates={templates} />);

  // Assert
  expect(container.firstChild).not.toBeNull();
});
