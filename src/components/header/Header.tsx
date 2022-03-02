import React from "react";
import { IconButton, Box, Divider } from "@material-ui/core";
import profile from "@/assets/profile.svg";
import "./header.css";
import constants from "@/resources/constants";
import { log } from "@/utils/utils";

function Header(): JSX.Element {
  const { primary, secondary } = constants.header;
  return (
    <Box className="box-column">
      <Box className="box-row box-space-between">
        <div className="title">
          <b>{primary}</b>
          {" "}
          {secondary}
        </div>

        <Box className="box-row box-flex-end">
          {/* TODO: Return back
          <IconButton onClick={() => log("Clean up clicked")}>
            <img src={cleanUp} alt="Clean up" />
          </IconButton> */}
          <IconButton onClick={() => log("Profile clicked")}>
            <img src={profile} alt="Profile" />
          </IconButton>
        </Box>
      </Box>

      <Divider />
    </Box>
  );
}

export default Header;
