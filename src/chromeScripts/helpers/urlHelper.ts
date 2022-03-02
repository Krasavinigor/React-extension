import { IUrlStoreState } from "@/interfaces/IUrlStoreState";
import StorageHelper from "./storageHelper";

export default class URLHelper extends StorageHelper<IUrlStoreState> {
  private static instance: URLHelper;

  public static getInstance(): URLHelper {
    if (!URLHelper.instance) {
      URLHelper.instance = new URLHelper();
    }

    return URLHelper.instance;
  }

  public async updateState(newState: IUrlStoreState): Promise<void> {
    if (newState) {
      this.storage.sync.get(["currentUrl"], async (items) => {
        const prevUrl = items.currentUrl || "";

        await this.setStoreValue(newState, prevUrl);
      });
    }
  }

  public async isLinkedinPage(): Promise<boolean> {
    return new Promise((resolve) => {
      this.storage.sync.get(["isLinkedin"], ({ isLinkedin }) => resolve(isLinkedin));
    });
  }

  public async getCurrentUrl(): Promise<string> {
    return new Promise((resolve) => {
      this.storage.sync.get(["currentUrl"], ({ currentUrl }) => resolve(currentUrl));
    });
  }

  private setStoreValue(newState: IUrlStoreState, prevUrl: string): Promise<void> {
    return new Promise((resolve) => this.storage.sync.set({
      isLinkedin: newState.isLinkedin,
      currentUrl: newState.url,
      prevUrl,
    }, () => resolve()));
  }
}
