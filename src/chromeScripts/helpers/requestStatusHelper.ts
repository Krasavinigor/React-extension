import { log } from "@/utils/utils";
import StorageHelper from "./storageHelper";

export enum RequestStatus {
    Pending,
    Ready
}

export class RequestStatusHelper extends StorageHelper<RequestStatus> {
  private static instance: RequestStatusHelper;

  // eslint-disable-next-line
  private constructor() {
    super();
  }

  public static getInstance(): RequestStatusHelper {
    if (!RequestStatusHelper.instance) {
      RequestStatusHelper.instance = new RequestStatusHelper();
    }

    return RequestStatusHelper.instance;
  }

  public updateState(requestStatus: RequestStatus): Promise<void> {
    log(`Request status is ${requestStatus}`);
    return new Promise((resolve) => this.storage.sync
      .set({ status: requestStatus }, () => resolve()));
  }

  public getStatus(): Promise<number> {
    return new Promise(
      (resolve) => this.storage.sync.get(["status"], ({ status }) => resolve(status as number)),
    );
  }
}
