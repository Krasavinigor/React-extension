export default abstract class StorageHelper<T> {
  protected storage: typeof chrome.storage;

  constructor() {
    this.storage = chrome.storage;
  }

  abstract updateState(newState: T): Promise<void>;
}
