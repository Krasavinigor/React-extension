import { EFooterState } from "@/components/common/EFooterState";
import { Strategy } from "../content";
import ReactionMessageStrategy from "./ReactionMessageStrategy";
import LoaderStrategy from "./LoaderStrategy";
import CollapseStrategy from "./CollapseStrategy";

const reactionMessageStrategy = new ReactionMessageStrategy();
const collapseStrategy = new CollapseStrategy();
const loaderStrategy = new LoaderStrategy();

const strategies: Map<EFooterState, Strategy> = new Map([
  [EFooterState.HasMutualRecruiters, collapseStrategy],
  [EFooterState.NoMutualRecruiters, reactionMessageStrategy],
  [EFooterState.WrongPage, reactionMessageStrategy],
  [EFooterState.Loading, loaderStrategy],
  [EFooterState.Error, reactionMessageStrategy],
]);

export default function getStrategy(state: EFooterState): Strategy {
  return strategies.get(state) || loaderStrategy;
}
