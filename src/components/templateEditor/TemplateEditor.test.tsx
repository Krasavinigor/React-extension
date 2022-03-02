import React from "react";
import { fireEvent, render, screen } from "@testing-library/react";
import ITemplate from "@/interfaces/ITemplate";
import TemplateEditor from "./TemplateEditor";
import { generateListOfTemplates } from "@/utils/utils";
import constants from "@/resources/constants";

const candidatesName = constants.candidateName;

Object.assign(navigator, {
  clipboard: {
    writeText: async () => jest.fn(),
  },
});

test("Render the TemplateEditor with non default", () => {
  // Arrange
  const testTemplate: ITemplate[] = generateListOfTemplates(candidatesName);

  // Act
  const { container } = render(<TemplateEditor
    templateList={testTemplate}
    selectedItem={testTemplate[3].id}
  />);

  // Assert
  expect(container.firstChild).not.toBeNull();
  expect(screen.getByText("Hi, CandidateName!",
    { collapseWhitespace: true, trim: true, exact: false }));
});

test("Copying to clipboard is called by copy button", () => {
  // Arrange
  jest.spyOn(navigator.clipboard, "writeText");
  const testTemplate: ITemplate[] = generateListOfTemplates(candidatesName);

  // Act
  render(<TemplateEditor
    templateList={testTemplate}
    selectedItem={testTemplate[3].id}
  />);
  fireEvent.click(screen.getByText(constants.editorButtons.copyButton));

  // Assert
  expect(navigator.clipboard.writeText).toBeCalledTimes(1);
  expect(navigator.clipboard.writeText).toBeCalledWith(testTemplate[3].content);
});
