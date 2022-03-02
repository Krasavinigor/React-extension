import React from "react";
import Template from "../template/Template";
import ITemplate from "@/interfaces/ITemplate";

interface ITemplateCards {
  templates: ITemplate[];
  updateSelectedItem: (id: string) => void;
}

function TemplateCards({ templates, updateSelectedItem }: ITemplateCards): JSX.Element {
  return (
    <>
      {/* TODO: Return back
      <AddIconButton>
        <AddIcon style={{ color: "var(--background-color)", width: "1rem" }} />
      </AddIconButton> */}
      {templates.map(({ id, title }) => (
        <Template
          key={id}
          id={id}
          title={title}
          updateSelectedItem={updateSelectedItem}
        />
      ))}
    </>
  );
}

export default TemplateCards;
