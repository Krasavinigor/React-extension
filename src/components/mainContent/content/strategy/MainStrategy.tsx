import React from "react";
import { Strategy } from "../content";
import Main from "@/components/main/Main";
import ITemplate from "@/interfaces/ITemplate";

class MainStrategy implements Strategy {
  public getComponent(templates: ITemplate[]): JSX.Element {
    return (
      <>
        <Main templates={templates} />
      </>
    );
  }
}

export default MainStrategy;
