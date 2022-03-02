import { Button, withStyles } from "@material-ui/core";

const TemplateButton = withStyles(() => ({
  root: {
    backgroundColor: "var(--background-color)",
    borderColor: "var(--border-color)",
    boxShadow: "none",
    textTransform: "none",
    fontSize: ".7rem",
    padding: ".4rem .4rem",
    border: "1px solid",
    lineHeight: 1,
    borderRadius: "4px",
    height: "1.7rem",
    flex: "1 1 auto",
    fontFamily: "Roboto",
    fontStyle: "normal",
    fontWeight: "normal",
    textAlign: "center",
  },
}))(Button);

export default TemplateButton;
