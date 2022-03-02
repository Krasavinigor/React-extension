import React from "react";
import { render } from "@testing-library/react";
import Copyright from "./Copyright";

test("renders the Copyright", () => {
  // Act
  const { container } = render(<Copyright />);

  // Assert
  expect(container.firstChild).not.toBeNull();
});
