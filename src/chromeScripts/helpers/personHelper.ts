import IPerson from "@/interfaces/IPerson";
import StorageHelper from "./storageHelper";
import { IPageContext } from "@/interfaces/IPageContext";

export default class PersonHelper extends StorageHelper<IPageContext> {
  private static instance: PersonHelper;

  // eslint-disable-next-line
  private constructor() {
    super();
  }

  public static getInstance(): PersonHelper {
    if (!PersonHelper.instance) {
      PersonHelper.instance = new PersonHelper();
    }

    return PersonHelper.instance;
  }

  public updateState({ persons, pagePointer, pageURL }: IPageContext): Promise<void> {
    return new Promise((resolve) => this.storage.sync.set({
      persons,
      pagePointer,
      pageURL,
    }, () => resolve()));
  }

  public async updatePersonsList(personsToAdd: IPerson[]): Promise<void> {
    const personsList = await this.getPersons();
    const newPersonsList = [...personsList, ...personsToAdd];

    return new Promise((resolve) => this.storage.sync
      .set({ persons: newPersonsList }, () => resolve()));
  }

  public setCandidateName(name: string): Promise<void> {
    return new Promise((resolve) => this.storage.sync.set({ name }, () => resolve()));
  }

  public getCandidateName(): Promise<string> {
    return new Promise((resolve) => this.storage.sync.get(["name"], ({ name }) => resolve(name)));
  }

  public getPersons(): Promise<IPerson[]> {
    return new Promise((resolve) => this.storage.sync.get(["persons"], ({ persons }) => resolve(persons as IPerson[])));
  }

  public getPageInfoForPersons(): Promise<string> {
    return new Promise((resolve) => this.storage.sync.get(["pageURL"], ({ pageURL }) => resolve(pageURL as string)));
  }

  public getPagePointer(): Promise<number> {
    return new Promise((resolve) => this.storage.sync.get(["pagePointer"], ({ pagePointer }) => resolve(pagePointer as number)));
  }
}
