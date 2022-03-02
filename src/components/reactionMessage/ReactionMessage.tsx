import React from "react";
import "./reactionMessage.css";
import { EFooterState, EReactionMessage } from "../common/EFooterState";
import constants from "@/resources/constants";
import corgi from "@/assets/corgi.svg";
import sadCorgi from "@/assets/sad_corgi.svg";
import techCorgi from "@/assets/tech_corgi.svg";

interface IState {
  state: EFooterState | EReactionMessage
}

function ReactionMessage(props: IState): JSX.Element {
  let src: string;
  let message: string;
  const { state } = props;
  const { reactionMessage } = constants;

  switch (state) {
    case EFooterState.NoMutualRecruiters:
      src = corgi;
      message = reactionMessage.happy;
      break;
    case EFooterState.WrongPage:
      src = sadCorgi;
      message = reactionMessage.wrongPage;
      break;
    case EReactionMessage.Auth:
      src = techCorgi;
      message = reactionMessage.auth;
      break;
    case EReactionMessage.NoTemplates:
      src = sadCorgi;
      message = reactionMessage.noTemplates;
      break;
    case EReactionMessage.ErrorState:
      src = techCorgi;
      message = reactionMessage.errorTemplates;
      break;
    default:
      src = techCorgi;
      message = reactionMessage.error;
      break;
  }

  return (
    <div className="reaction-row">
      <img className="reaction-icon" src={src} alt="reaction" />
      <div className="message-content">{message}</div>
    </div>
  );
}

export default ReactionMessage;
