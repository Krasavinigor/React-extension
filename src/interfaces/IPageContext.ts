import IPerson from "./IPerson";

export interface IPageContext {
    pageURL: string;
    pagePointer: number;
    persons: IPerson[];
}
