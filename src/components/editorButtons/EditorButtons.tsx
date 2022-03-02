import React from "react";
import { createStyles, makeStyles } from "@material-ui/core";
import copy from "@/assets/copy.svg";
import constants from "@/resources/constants";
import "./editorButtons.css";
import EditorButton from "./EditorButtonsStyle";

type EditorButtonsProps = {
  copyToClipBoard: () => void;
};

const useStyles = makeStyles(() => createStyles({
  margin: {
    margin: ".3rem .3rem",
  },
}));

function EditorButtons({ copyToClipBoard }: EditorButtonsProps): JSX.Element {
  const classes = useStyles();

  return (
    <>
      <EditorButton
        className={classes.margin}
        size="small"
        onClick={() => copyToClipBoard()}
      >
        <img className="editor-button" src={copy} alt="Copy" />
        {constants.editorButtons.copyButton}
      </EditorButton>
      {/* TODO: Return back
      <EditorButton
        className={classes.margin}
        size="small"
        onClick={() => log("Add to FriendWork button clicked")}
      >
        <img className="editor-button" src={addUser} alt="Add user" />
        {constants.editorButtons.addToFriendWorkButton}
      </EditorButton> */}
    </>
  );
}

export default EditorButtons;
