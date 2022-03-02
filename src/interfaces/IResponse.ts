import IPerson from "./IPerson";

export interface IResponse {
  pagePointer: number;
  mutualRecruits: IPerson[];
}
