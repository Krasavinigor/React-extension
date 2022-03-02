import IPerson from "@/interfaces/IPerson";
import { EFooterState } from "@/components/common/EFooterState";

export interface FooterPayload {
  componentState: EFooterState;
  persons: IPerson[];
}
