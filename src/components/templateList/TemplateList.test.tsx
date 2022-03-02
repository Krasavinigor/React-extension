import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import ITemplate from "@/interfaces/ITemplate";
import TemplateList from "./TemplateList";
import { generateListOfTemplates } from "@/utils/utils";
import constants from "@/resources/constants";

const candidatesName = constants.candidateName;

test("renders the TemplateList correctly", () => {
  // Arrange
  const testTemplates: ITemplate[] = generateListOfTemplates(candidatesName);
  const updateSelectedItemsMock = jest.fn();

  // Act
  const { container } = render(<TemplateList
    templates={testTemplates}
    updateSelectedItem={updateSelectedItemsMock}
  />);

  // Assert
  expect(container.firstChild).not.toBeNull();
  expect(screen.getAllByRole("button")).toHaveLength(6);
  testTemplates.forEach((template) => {
    expect(screen.getByText(template.title)).toBeInTheDocument();
  });
});

test("Buttons on TemplateList could be clicked", () => {
  // Arrange
  const testTemplates: ITemplate[] = generateListOfTemplates(candidatesName);
  const updateSelectedItemsMock = jest.fn();

  // Act
  render(<TemplateList
    templates={testTemplates}
    updateSelectedItem={updateSelectedItemsMock}
  />);

  // Assert
  let numberOfCalls = 1;
  testTemplates.forEach((template) => {
    fireEvent.click(screen.getByText(template.title));
    expect(updateSelectedItemsMock).toHaveBeenCalledTimes(numberOfCalls);
    expect(updateSelectedItemsMock).toHaveBeenCalledWith(template.id);
    numberOfCalls += 1;
  });
});
