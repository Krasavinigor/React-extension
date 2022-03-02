import React from "react";
import { render } from "@testing-library/react";
import Loader from "./Loader";

test("renders the Loader", () => {
  // Act
  const { container } = render(<Loader />);

  // Assert
  expect(container.firstChild).not.toBeNull();
});
