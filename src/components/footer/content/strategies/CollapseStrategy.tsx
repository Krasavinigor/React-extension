import React from "react";
import { Collapse } from "@material-ui/core";
import IPerson from "@/interfaces/IPerson";
import PersonCard from "@/components/personCard/PersonCard";
import { EFooterState } from "@/components/common/EFooterState";
import { Strategy } from "../content";

class CollapseStrategy implements Strategy {
  public getComponent(_state: EFooterState, personList: IPerson[]): JSX.Element {
    return (
      <>
        <Collapse in>
          {personList.map((person, index) => (
            // eslint-disable-next-line react/no-array-index-key
            <PersonCard key={index} person={person} />
          ))}
        </Collapse>
      </>
    );
  }
}

export default CollapseStrategy;
