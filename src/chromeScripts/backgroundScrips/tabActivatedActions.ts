import { RequestStatusHelper, RequestStatus } from "../helpers/requestStatusHelper";
import URLHelper from "../helpers/urlHelper";

export default class TabActivatedActions {
  private regExpPattern: RegExp;

  private urlHelper: URLHelper;

  private requestStatusHelper: RequestStatusHelper;

  constructor() {
    this.regExpPattern = new RegExp(".linkedin\\.com\\/in");
    this.urlHelper = URLHelper.getInstance();
    this.requestStatusHelper = RequestStatusHelper.getInstance();
  }

  public async tabActivated(url: string | undefined): Promise<void> {
    if (url) {
      await this.urlHelper.updateState({ url, isLinkedin: this.regExpPattern.test(url) });
      await this.requestStatusHelper.updateState(RequestStatus.Ready);
    }
  }
}
