import { EFooterState } from "@/components/common/EFooterState";
import IPerson from "@/interfaces/IPerson";

export interface Strategy {
  getComponent: (state: EFooterState, personList: IPerson[]) => JSX.Element;
}

export default class Content {
  private strategy: Strategy;

  constructor(strategy: Strategy) {
    this.strategy = strategy;
  }

  public setStrategy(strategy: Strategy): void {
    this.strategy = strategy;
  }

  public getComponent(state: EFooterState, personList: IPerson[]): JSX.Element {
    return this.strategy.getComponent(state, personList);
  }
}
