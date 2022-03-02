import React from "react";
import ReactionMessage from "@/components/reactionMessage/ReactionMessage";
import { Strategy } from "../content";
import { EReactionMessage } from "@/components/common/EFooterState";

class NoTemplatesStrategy implements Strategy {
  public getComponent(): JSX.Element {
    return (
      <ReactionMessage state={EReactionMessage.NoTemplates} />
    );
  }
}

export default NoTemplatesStrategy;
