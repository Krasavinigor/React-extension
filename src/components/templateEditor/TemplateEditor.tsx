import React, { useRef, useEffect } from "react";
import { TextField, Box } from "@material-ui/core";
import ITemplate from "@/interfaces/ITemplate";
import EditorButtons from "../editorButtons/EditorButtons";
import { log } from "@/utils/utils";
import "./templateEditor.css";

interface ITemplateCardList {
  templateList: ITemplate[];
  selectedItem: string | null;
}

function TemplateEditor({ templateList, selectedItem }: ITemplateCardList): JSX.Element {
  const textAreaRef = useRef<HTMLTextAreaElement>(null);

  const copyToClipBoard = (text?: string) => {
    let templateText = text || "";

    if (!text && textAreaRef && textAreaRef.current) {
      templateText = textAreaRef.current.value;
    }

    if (templateText) {
      const cb = navigator.clipboard;
      cb.writeText(templateText).then(() => log("Text copied"));
    }
  };

  const getSelectedTemplate = (index: number): string => templateList[index].content;

  const selectedItemIndex = templateList.findIndex(
    (item) => item.id === selectedItem,
  );

  const itemTemplateContent = selectedItemIndex === -1
    ? "" // case when we have no templates or template not found
    : getSelectedTemplate(selectedItemIndex);

  useEffect(() => {
    // We should use this workaround because
    // after chrome upgrade we can't immediately focus on document.
    setTimeout(() => copyToClipBoard(itemTemplateContent), 300);
  });

  return (
    <>
      <TextField
        inputRef={textAreaRef}
        id="outlined-multiline-static"
        className="inputRounded"
        multiline
        rows={6}
        inputProps={{ style: { fontSize: ".8rem", fontFamily: "Roboto" } }}
        defaultValue={itemTemplateContent}
        variant="outlined"
      />
      <Box className="editor-buttons-root">
        <EditorButtons copyToClipBoard={copyToClipBoard} />
      </Box>
    </>
  );
}

export default TemplateEditor;
