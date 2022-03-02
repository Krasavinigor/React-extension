import React from "react";
import { Box } from "@material-ui/core";
import { Ripple } from "react-spinners-css";
import "./loader.css";

function Loader(): JSX.Element {
  return (
    <Box className="box-row-space-around">
      <Ripple color="var(--primary-button-color)" />
    </Box>
  );
}

export default Loader;
