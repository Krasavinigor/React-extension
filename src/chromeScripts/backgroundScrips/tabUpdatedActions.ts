import CookieHelper from "../helpers/cookieHelper";
import URLHelper from "../helpers/urlHelper";
import constants from "@/resources/constants";

export default class TabUpdatedActions {
  private regExpPattern: RegExp;

  private urlHelper: URLHelper;

  private cookieHelper: CookieHelper;

  constructor() {
    this.regExpPattern = new RegExp(".linkedin\\.com\\/in");
    this.urlHelper = URLHelper.getInstance();
    this.cookieHelper = CookieHelper.getInstance();
  }

  public async tabUpdated(
    tabChangeInfo: chrome.tabs.TabChangeInfo,
    url: string | undefined,
  ): Promise<void> {
    if (tabChangeInfo.status === constants.command.complete && url) {
      await this.cookieHelper.setCookies();
      await this.urlHelper.updateState({ url, isLinkedin: this.regExpPattern.test(url) });
    }
  }
}
