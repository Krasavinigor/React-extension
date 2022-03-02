import ITemplate from "@/interfaces/ITemplate";

export interface Strategy {
  getComponent: (templates: ITemplate[]) => JSX.Element;
}

export default class Content {
  private strategy: Strategy;

  constructor(strategy: Strategy) {
    this.strategy = strategy;
  }

  public setStrategy(strategy: Strategy): void {
    this.strategy = strategy;
  }

  public getComponent(templates: ITemplate[]): JSX.Element {
    return this.strategy.getComponent(templates);
  }
}
