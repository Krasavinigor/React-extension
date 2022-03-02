import React from "react";
import copyright from "@/assets/copyright.svg";
import "./copyright.css";

function Copyright(): JSX.Element {
  return (
    <img className="image" src={copyright} alt="copyright" />
  );
}

export default Copyright;
