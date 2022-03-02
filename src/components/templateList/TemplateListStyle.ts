import { withStyles, IconButton } from "@material-ui/core";

const StyledIconButton = withStyles(() => ({
  root: {
    backgroundColor: "var(--primary-button-color)",
    borderColor: "var(--primary-button-color)",
    fontSize: ".5rem",
    padding: ".4rem .4rem",
    border: "2px solid",
    lineHeight: 1,
    borderRadius: "4px",
    height: "1.7rem",
    width: "1.7rem",
    fontFamily: "Roboto",
    fontStyle: "normal",
    fontWeight: "normal",
    textAlign: "center",
  },
}))(IconButton);

const AddIconButton = withStyles(() => ({
  root: {
    "&:hover": {
      background: "var(--secondary-button-color)",
      border: "1px solid",
    },
  },
}))(StyledIconButton);

export default AddIconButton;
