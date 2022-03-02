import EMainContent from "@/components/mainContent/EMainContent";
import ITemplate from "./ITemplate";

export interface MainContentPayload {
  componentState: EMainContent;
  templates: ITemplate[];
}
