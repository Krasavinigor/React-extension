import { Button, withStyles } from "@material-ui/core";

const EditorButton = withStyles(() => ({
  root: {
    background: "var(--primary-button-color)",
    borderColor: "var(--primary-button-color)",
    color: "var(--background-color)",
    boxShadow: "none",
    textTransform: "none",
    fontFamily: "Roboto",
    fontSize: ".6rem",
    padding: ".7rem .2rem",
    border: "1px solid",
    lineHeight: 1,
    borderRadius: "4px",
    height: "1.7rem",
    flex: 1,
    fontStyle: "normal",
    fontWeight: "normal",
    textAlign: "center",
    "&:hover": {
      background: "var(--secondary-button-color)",
    },
  },
}))(Button);

export default EditorButton;
