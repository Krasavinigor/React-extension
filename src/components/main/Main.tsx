import React, { useEffect, useState } from "react";
import { Box } from "@material-ui/core";
import "./main.css";
import TemplateCards from "../templateList/TemplateList";
import ITemplate from "@/interfaces/ITemplate";
import TemplateEditor from "../templateEditor/TemplateEditor";

interface IMain {
  templates: ITemplate[];
}

function Main({ templates }: IMain): JSX.Element {
  const [selectedItem, setSelectedItem] = useState<string | null>(null);

  useEffect(() => {
    if (templates.length) {
      setSelectedItem(templates[0].id);
    }
  }, [templates]);

  return (
    <Box className="box-column-main">
      <Box className="box-row-main box-template-list">
        <TemplateCards
          templates={templates}
          updateSelectedItem={setSelectedItem}
        />
      </Box>
      <Box className="box-row-main box-template-editor">
        <TemplateEditor
          key={selectedItem}
          templateList={templates}
          selectedItem={selectedItem}
        />
      </Box>
    </Box>
  );
}

export default Main;
