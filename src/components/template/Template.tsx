import React from "react";
import TemplateButton from "./TemplateStyle";

interface ITemplate {
  id: string;
  title: string;
  updateSelectedItem: (id: string) => void;
}

function Template({ id, title, updateSelectedItem }: ITemplate): JSX.Element {
  return (
    <>
      <TemplateButton
        size="small"
        onClick={() => updateSelectedItem(id)}
      >
        {title}
      </TemplateButton>
    </>
  );
}

export default Template;
