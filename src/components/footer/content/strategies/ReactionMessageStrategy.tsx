import React from "react";
import ReactionMessage from "@/components/reactionMessage/ReactionMessage";
import { EFooterState } from "@/components/common/EFooterState";
import { Strategy } from "../content";

class ReactionMessageStrategy implements Strategy {
  public getComponent(state: EFooterState): JSX.Element {
    return <ReactionMessage state={state} />;
  }
}

export default ReactionMessageStrategy;
