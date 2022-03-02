import EMainContent from "@/components/mainContent/EMainContent";
import { Strategy } from "../content";
import ErrorStrategy from "./ErrorStrategy";
import GoogleAuthStrategy from "./GoogleAuthStrategy";
import MainStrategy from "./MainStrategy";
import NoTemplatesStrategy from "./NoTemplatesStrategy";

const googleAuthStrategy = new GoogleAuthStrategy();
const mainWrapperStrategy = new MainStrategy();
const noTemplatesStrategy = new NoTemplatesStrategy();
const errorStrategy = new ErrorStrategy();

const strategies: Map<EMainContent, Strategy> = new Map([
  [EMainContent.GoogleAuth, googleAuthStrategy],
  [EMainContent.MainWrapper, mainWrapperStrategy],
  [EMainContent.NoTemplates, noTemplatesStrategy],
  [EMainContent.ErrorContent, errorStrategy],
]);

export default function getStrategy(state: EMainContent): Strategy {
  return strategies.get(state) || noTemplatesStrategy;
}
